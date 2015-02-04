class Foo {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(val) {
    this._name = val;
  }
  sayHello() {
    console.log('Hello ' + this.name);
  }
}
class Bar extends Foo {
  sayHello() {
    console.log('Oops ' + this.name);
  }
}

var foo = new Bar('Jim');

var [first, second] = [1, 2];

function fn(opts = {}, ...args) {
  console.log(opts);
  console.log(args);
}

var lambda = (x) => {
  return x;
};

var str = `hello, ${name}!`;

export function six() {
  foo.sayHello();
  fn();
};