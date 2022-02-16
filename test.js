const iterate = async () => {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }

  return { data: "abc" };
};

iterate().then((res) => console.log(res));
