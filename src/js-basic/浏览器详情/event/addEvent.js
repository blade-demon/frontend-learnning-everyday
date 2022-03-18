class BomEvent {
  constructor(element) {
    this.element = element;
  }

  addEvent(type, handler) {
    if (this.element.addEvententListener) {
      this.element.addEvententListener();
    } else if (this.element.attachEvent) {
      this.element.attachEvent(`on${type}`, handler);
    } else {
      this.element[`on${type}`] = handler;
    }
  }

  removeEvent(type, handler) {
    if (this.element.removeEvententListener) {
      this.element.removeEvententListener();
    } else if (this.element.detachEvent) {
      this.element.detachEvent(`on${type}`, handler);
    } else {
      this.element[`on${type}`] = handler;
    }
  }
}

function stopPropagation(ev) {
  if (ev.stopPropagation) {
    ev.stopPropagation(); // 标准w3c浏览器
  } else {
    ev.cancelBubble = true; // IE
  }
}

function preventDefault(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}
