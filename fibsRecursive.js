function fibs(num) {
  if (num <= 2) {
    return [0, 1];
  } else {
    const arr = fibs(num - 1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return arr;
  }
}
console.log(fibs(0));
console.log(fibs(2));
console.log(fibs(8));
console.log(fibs(10));
