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
    return (this.root = node);
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
  levelOrder(callback, queue = [this.root]) {
    if (callback === undefined) {
      callback = (node) => {
        console.log(node.data);
      };
    }
    if (queue[0] == null) return;
    if (queue[0].left !== null) {
      queue.push(queue[0].left);
    }
    if (queue[0].right !== null) {
      queue.push(queue[0].right);
    }
    callback(queue[0]);
    queue.shift();
    this.levelOrder(callback, queue);
  }
  // takes a function as an argument, performs that function to each node in said order. If no function declared, console.logs the data of each node
  inorder(callback, node = this.root) {
    if (callback === undefined) {
      callback = (node) => {
        console.log(node.data);
      };
    }
    if (node.left !== null) {
      this.inorder(callback, node.left);
    }
    callback(node);
    if (node.right !== null) {
      this.inorder(callback, node.right);
    }
  }
  // takes a function as an argument, performs that function to each node in said order. If no function declared, console.logs the data of each node
  preorder(callback, node = this.root) {
    if (callback === undefined) {
      callback = (node) => {
        console.log(node.data);
      };
    }
    callback(node);
    if (node.left !== null) {
      this.preorder(callback, node.left);
    }
    if (node.right !== null) {
      this.preorder(callback, node.right);
    }
  }
  // takes a function as an argument, performs that function to each node in said order. If no function declared, console.logs the data of each node
  postorder(callback, node = this.root) {
    if (callback === undefined) {
      callback = (node) => {
        console.log(node.data);
      };
    }
    if (node.left !== null) {
      this.postorder(callback, node.left);
    }
    if (node.right !== null) {
      this.postorder(callback, node.right);
    }
    callback(node);
  }

  // takes a node and tells how many levels to its lowest leaf returns a number
  height(node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(this.height(node.left) + 1, this.height(node.right) + 1);
    }
  }

  // takes a node and finds how far from the root node it is, returns the distance in a number
  depth(nodeToFind, comparisonNode = this.root) {
    if (comparisonNode === nodeToFind) return 0;
    if (nodeToFind.left !== null) {
      return this.depth(nodeToFind, comparisonNode.left) + 1;
    }
    if (nodeToFind.right !== null) {
      return this.depth(nodeToFind, comparisonNode.right) + 1;
    }
  }
  // takes no arguments, will tell if the whole tree is balanced or not.
  isBalanced(node = this.root) {
    if (node == null) {
      return true;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    const heightDifference = (leftHeight - rightHeight) * -1;
    if (
      heightDifference <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    } else {
      return false;
    }
  }
  // takes no arguments, will take an unbalanced tree and rebalance it.
  rebalance() {
    function getArr(node, arr = []) {
      inorderArray.push(node.data);
    }
    let inorderArray = [];
    this.inorder(getArr);
    this.root = this.buildTree(inorderArray);
  }
}

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

// merge sort function from earlier changed to remove doubles.
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

function randomArrayGenerator() {
  let randomLength = Math.floor(Math.random() * 7 * (Math.random() * 11));
  let randomArray = [];
  for (let i = 0; i < randomLength; i++) {
    let randomNum = Math.floor(Math.random() * 3 * (Math.random() * 11));
    randomArray.push(randomNum);
  }
  return randomArray;
}

let randoArray = mergeSortNoDoubles(randomArrayGenerator());
console.log(randoArray);
let tree = new Tree();

tree.buildTree(randoArray);
prettyPrint(tree.root);
console.log(tree.isBalanced());
for (let i = 0; i < 111; i++) {
  tree.insert(
    Math.floor(Math.random() * 3 * (Math.random() * 11) * (Math.random() * 7))
  );
}
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);
