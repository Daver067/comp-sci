class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  append(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  prepend(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.length++;
  }
  size() {
    return this.length;
  }
  getHead() {
    return this.head;
  }
  getTail() {
    return this.tail;
  }
  at(index) {
    if (index >= this.length)
      return "there are not that many items in this list.";

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.nextNode;
    }
    return node;
  }
  pop() {
    let popped = this.tail;
    this.tail = null;
    this.length--;
    return popped;
  }
  contains(value) {
    let trueFalse = false;
    let node = this.head;
    for (let i = 0; i <= this.length - 1; i++) {
      if (node.value === value) {
        trueFalse = true;
      }
      node = node.nextNode;
    }
    return trueFalse;
  }
  find(value) {
    let index = 0;
    let node = this.head;
    let returnStatement = `${value} not found in list`;
    for (let i = 0; i < this.length; i++) {
      if (node.value == value) {
        returnStatement = `${value} was found at index ${index}`;
      }

      node = node.nextNode;
      index++;
    }
    return returnStatement;
  }
  toString() {
    let string = `${this.head.value} -> `;
    let node = this.head;
    for (let i = 0; i < this.length - 1; i++) {
      node = node.nextNode;
      let newString = `${node.value} -> `;
      string = string + newString;
    }
    string = string + `null`;
    return string;
  }
  insertAt(value, index) {
    if (index > this.length) return `no index there`;
    const newNode = new Node(value);
    let previousNode = null;
    let thisNode = this.head;
    let nextNode = this.head.nextNode;
    for (let i = 1; i <= index; i++) {
      previousNode = thisNode;
      thisNode = nextNode;
      nextNode = thisNode.nextNode;
    }
    if (index === 0) {
      newNode.nextNode = thisNode;
      this.head = newNode;
      this.length++;
    } else {
      previousNode.nextNode = newNode;
      newNode.nextNode = thisNode;
      this.length++;
    }
  }
  removeAt(index) {
    if (index > this.length) return `no index there`;
    let previousNode = null;
    let thisNode = this.head;
    let nextNode = this.head.nextNode;
    for (let i = 1; i <= index; i++) {
      previousNode = thisNode;
      thisNode = nextNode;
      nextNode = thisNode.nextNode;
    }
    previousNode.nextNode = nextNode;
    this.length--;
  }
}

class Node {
  constructor(value) {
    (this.value = value), (this.nextNode = null);
  }
  updateNextNode(newNode) {
    this.nextNode = newNode;
  }
}

const list = new LinkedList();
list.append(55);
list.append(51);
list.append(1);
list.append(5);
list.append(16);
console.log(list.toString());
list.prepend(69);
console.log(list.toString());
console.log(list.size());
console.log(list.getHead());
console.log(list.getTail());
console.log(list.toString());
console.log(list.at(3));
console.log(list.pop());
console.log(list.toString());
console.log(list.contains(1213123));
console.log(list.contains(5));
console.log(list.find(5));
console.log(list.find(1213123));
console.log(list.toString());
list.removeAt(2);
console.log(`removed index 2 ${list.toString()}`);
list.insertAt(234234, 1);
console.log(`insert at index 1 ${list.toString()}`);
console.log(list.size());
