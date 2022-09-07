function fibs(num) {
  if (num === 0) return "no input";
  if (num === 1) return [0];
  const arr = [0, 1];
  let twoNumsago = 0;
  let previousNum = 1;

  for (let i = 0; i < num - 2; i++) {
    const currentNum = twoNumsago + previousNum;
    arr.push(currentNum);
    twoNumsago = previousNum;
    previousNum = currentNum;
  }
  return arr;
}

console.log(fibs(8));
console.log(fibs(0));
console.log(fibs(1));
console.log(fibs(2));
console.log(fibs(3));
