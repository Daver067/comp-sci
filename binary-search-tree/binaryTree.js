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
  // will return a single node that should be the root. requires a sorted array.
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }
  // inserts new nodes into the tree, will not insert it in a balanced format, unless you're lucky.
  insert(data, root = this.root) {
    let newNode = new Node(data);
    if (root === null) {
      return (this.root = newNode);
    }
    if (newNode.data < root.data && root.left !== null) {
      return this.insert(data, root.left);
    }
    if (newNode.data > root.data && root.right !== null) {
      return this.insert(data, root.right);
    }
    if (newNode.data < root.data) {
      return (root.left = newNode);
    }
    if (newNode.data > root.data) {
      return (root.right = newNode);
    }
  }
  delete(
    data,
    thisNode = this.root,
    parentNode = null,
    directionFromParent = null
  ) {
    if (thisNode.data !== data) {
      if (thisNode.left !== null) {
        this.delete(data, thisNode.left, thisNode, "left");
      }
      if (thisNode.right !== null) {
        this.delete(data, thisNode.right, thisNode, "right");
      }
      return;
    }
    if (thisNode.data === data) {
      // if the node has no children
      if (thisNode.left === null && this.right === null) {
        return (parentNode[directionFromParent] = null);
      }
      // the next two are for if the node deleted has only 1 child
      if (thisNode.left === null) {
        return (parentNode[directionFromParent] = thisNode.right);
      }
      if (thisNode.right === null) {
        return (parentNode[directionFromParent] = thisNode.left);
      }
      // if this node has two children find the right substitute
      else {
        // go right one, then all the way left
        let nextCandidate = thisNode.right;
        let nextCandidateParent = thisNode;
        // if the first one right has no left children then this one replaces the deleted node
        if (nextCandidate.left === null) {
          nextCandidate.left = thisNode.left;
          nextCandidate.right = thisNode.right;
          parentNode[directionFromParent] = nextCandidate;
          return;
        }
        // keep looking as far left down the first right element
        while (nextCandidate.left !== null) {
          nextCandidateParent = nextCandidate;
          nextCandidate = nextCandidate.left;
        }
        // if the furthest left node has a right child, this will replace the node that is moving into the deleted nodes spot.
        if (nextCandidate.right !== null) {
          nextCandidateParent.left = nextCandidate.right;
          nextCandidate.left = thisNode.left;
          nextCandidate.right = thisNode.right;
          parentNode[directionFromParent] = nextCandidate;
          return;
        }
        // if the node replacing the deleted node has no children, change the parent of the node that is movingd left node to null
        else {
          nextCandidateParent.left = null;
          nextCandidate.left = thisNode.left;
          nextCandidate.right = thisNode.right;
          parentNode[directionFromParent] = nextCandidate;
        }
      }
    }

    return;
  }
  // enter a value and recieve the node as a return object
  find(value, node = this.root) {
    if (node.data === value) {
      return node;
    }
    if (node.left === null && node.right === null) {
      return null;
    } else if (node.left !== null) {
      let left = this.find(value, node.left);
      if (left !== null) {
        return left;
      }
    } else if (node.right !== null) {
      let right = this.find(value, node.right);

      if (right !== null) {
        return right;
      }
    }

    return null;
  }

  // takes a function as an argument, performs that function to each node in bredth level order. If no function declared, console.logs the data of each node
  levelOrder(
    func = (node) => {
      this.log(node);
    },
    queue = [this.root]
  ) {
    if (queue[0] == null) return;
    if (queue[0].left !== null) {
      queue.push(queue[0].left);
    }
    if (queue[0].right !== null) {
      queue.push(queue[0].right);
    }
    func(queue[0]);
    queue.shift();
    this.levelOrder(func, queue);
  }
  // takes a function as an argument, performs that function to each node in said order. If no function declared, console.logs the data of each node
  inorder(
    func = (node) => {
      this.log(node);
    },
    node = this.root
  ) {
    if (node.left !== null) {
      this.inorder(func, node.left);
    }
    func(node);
    if (node.right !== null) {
      this.inorder(func, node.right);
    }
  }
  // takes a function as an argument, performs that function to each node in said order. If no function declared, console.logs the data of each node
  preorder(
    func = (node) => {
      this.log(node);
    },
    node = this.root
  ) {
    func(node);
    if (node.left !== null) {
      this.preorder(func, node.left);
    }
    if (node.right !== null) {
      this.preorder(func, node.right);
    }
  }
  // takes a function as an argument, performs that function to each node in said order. If no function declared, console.logs the data of each node
  postorder(
    func = (node) => {
      this.log(node);
    },
    node = this.root
  ) {
    if (node.left !== null) {
      this.postorder(func, node.left);
    }
    if (node.right !== null) {
      this.postorder(func, node.right);
    }
    func(node);
  }
  // takes a node and tells how many levels to its lowest leaf
  height(node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(this.height(node.left) + 1, this.height(node.right) + 1);
    }
  }

  depth(node) {}
  isBalanced() {}
  rebalance() {}
  // helper function for inorder, preorder, postorder, and levelOrder
  log(value) {
    console.log(value.data);
  }
}

// array for testing tree
let testArray = [
  1, 7, 4, 23, 8, 9, 4, 9, 7, 3, 7, 7, 7, 7, 7, 5, 67, 6345, 324,
];
// for console logging the binary tree in a way to visualize.
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
    // if the left array is empty add one from right array
    if (arrLeftSorted.length === 0) {
      mergeBack[mergeBack.length] = arrRightSorted.shift();
    }
    // if the right array is empty add one from left array
    else if (arrRightSorted.length === 0) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
    }
    // if the left value and the right value are the same add the left to the new array and remove the right one
    else if (arrLeftSorted[0] === arrRightSorted[0]) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
      arrRightSorted.shift();
    }
    // if left if lower, add the left one
    else if (arrLeftSorted[0] < arrRightSorted[0]) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
    }
    // the right must be higher, add the right value
    else {
      mergeBack[mergeBack.length] = arrRightSorted.shift();
    }
  }
  return mergeBack;
}

const tree = new Tree();
testArray = mergeSortNoDoubles(testArray);
tree.root = tree.buildTree(testArray);
prettyPrint(tree.root);

const tree2 = new Tree();
tree2.insert(42);
tree2.insert(41);
tree2.insert(13);
tree2.insert(44);
tree2.insert(16);
tree2.insert(43);
tree2.insert(14);
tree2.insert(12);
tree2.insert(15);
tree2.delete(13); // this is the issue
//tree2.delete(14);
//tree2.delete(16);
console.log("inorder -->");
tree2.inorder();
console.log("pre -->");
tree2.preorder();
console.log("post -->");
tree2.postorder();
prettyPrint(tree2.root);
console.log("bredth -->");
tree2.levelOrder();
console.log(tree2.find(14));
console.log(tree2.height(tree2.find(14)));
