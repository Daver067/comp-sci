class Node {
  constructor(data) {
    (this.data = data), (this.left = null), (this.right = null);
  }
  setLeftChild(child) {
    this.left = child;
  }
  setRightChild(child) {
    this.right = child;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 9, 7, 3, 5, 67, 6345, 324];
const testArray2 = [1, 2, 3, 4, 6, 7, 8, 9];
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function mergeSortNoDoubles(arr) {
  if (arr.length === 1) return arr;

  let halfway = Math.floor(arr.length / 2);
  let arrLeft = arr.slice(0, halfway);
  let arrLeftSorted = mergeSortNoDoubles(arrLeft);
  let arrRight = arr.slice(halfway, arr.length);
  let arrRightSorted = mergeSortNoDoubles(arrRight);
  let mergeBack = [];

  while (arrLeftSorted.length !== 0 || arrRightSorted.length !== 0) {
    if (arrLeftSorted.length === 0) {
      mergeBack[mergeBack.length] = arrRightSorted.shift();
    } else if (arrRightSorted.length === 0) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
    } else if (arrLeftSorted[0] === arrRightSorted[0]) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
      arrRightSorted.shift();
    } else if (arrLeftSorted[0] < arrRightSorted[0]) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
    } else {
      mergeBack[mergeBack.length] = arrRightSorted.shift();
    }
  }
  return mergeBack;
}

const tree = new Tree();
testArray = mergeSortNoDoubles(testArray);
tree.root = tree.buildTree(testArray);
prettyPrint(tree.root);
