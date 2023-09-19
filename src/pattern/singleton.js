/* eslint-disable no-plusplus */
let counter = 0;
let instance;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("Counter instance already exists");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = new Counter();
export default Object.freeze(singletonCounter);

// console.log(counter1.getInstance() === counter2.getInstance()); // false
