// problem statement : throttle promises
// need to call bulk apis at once (eg. calling 100 apis at once)
// but due to low server specs we cannot call 100 apis at once 
// hence call apis in batches of some max count (eg. call api in batches of 5)
// to simplify, at at time call 5 apis, then in next itr call next 5, & so on.

const functions = [];

const apiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('api call');
    }, 5000);
  });
};

for (let i = 0; i < 10; i++) {
  functions.push(apiCall);
}

async function throttlePromises(funcs, max) {
  const promise = new Promise(async (resolve, reject) => {
    const data = [];
    let count = 0;
    let mul = 1;

    console.log('promise start');
    
    while (count < funcs.length) {
      console.log('while start');

      let arr = [];
      for (let i = count; i < max * mul; i++) {
        if (i === funcs.length) break;
        arr.push(funcs[i]());
      }

      try {
        response = await Promise.all(arr);
     } catch(err) {
       reject(err);
     }
      console.log('response', response);
      
      arr = [];
      data.push(...response);
      count += max;
      mul++;
    }

    console.log('while end');

    resolve(data);

  });

  return promise;
}

throttlePromises(functions, 3).then((data) => {
  console.log(data);
});
