function mergeSort(arr) {
  if (arr.length === 1) return arr;

  let halfway = Math.floor(arr.length / 2);
  let arrLeft = arr.slice(0, halfway);
  let arrLeftSorted = mergeSort(arrLeft);
  let arrRight = arr.slice(halfway, arr.length);
  let arrRightSorted = mergeSort(arrRight);
  let mergeBack = [];

  while (arrLeftSorted.length !== 0 || arrRightSorted.length !== 0) {
    if (arrLeftSorted.length === 0) {
      mergeBack[mergeBack.length] = arrRightSorted.shift();
    } else if (arrRightSorted.length === 0) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
    } else if (arrLeftSorted[0] < arrRightSorted[0]) {
      mergeBack[mergeBack.length] = arrLeftSorted.shift();
    } else {
      mergeBack[mergeBack.length] = arrRightSorted.shift();
    }
  }
  return mergeBack;
}
console.log(mergeSort([1]));
console.log(mergeSort([2, 1]));
console.log(mergeSort([5, 2, 3, 4]));
console.log(mergeSort([1, 6, 8, 7, 9, 5, 4, 3, 2, 10]));
