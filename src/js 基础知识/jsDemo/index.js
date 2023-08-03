class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const { length } = result;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
    this.selector = selector;
  }

  get(index) {
    return this[index];
  }

  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }

  on(type, fn) {
    return this.each((elem) => {
      elem.addEventListener(type, fn);
    });
  }
}

jQuery.prototype.dialog = function (info) {
  alert(info);
};

class myJquery extends jQuery {
  constructor(selector) {
    super(selector);
  }

  addClass(className) {
    this.each((item) => {
      item.classList.add(className);
    });
  }

  style(data) {}
}
