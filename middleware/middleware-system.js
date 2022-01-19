class Middleware {
  constructor() {
    this.middlewares = [];
  }

  use(func) {
    this.middlewares.push(func);
  }

  start(req) {
    let index = -1;
    const next = (e) => {
      index++;
      const fn = this.middlewares[index];
      try {
        if (fn.length === 2) {
          if (e) {
            next(e);
          } else {
            fn(req, next);
          }
        }
        if (fn.length === 3) {
          fn(e, req, next);
        }
      } catch (err) {
        next(err);
      }
    };

    next();
  }
}

const middleware = new Middleware();

middleware.use((req, next) => {
  req.a = 1;
  next();
});

middleware.use((req, next) => {
  req.b = 2;
  throw new Error('Error at 2');
  next();
});

middleware.use((req, next) => {
  console.log(req);
});

middleware.use((err, req, next) => {
  console.log(err);
  console.log(req);
})

middleware.start({});
