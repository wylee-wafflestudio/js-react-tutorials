// 1.08 반복문 퀴즈

// function biggerThanThree(numbers) {
//     const result = [];
//     for (let number of numbers) {
//         if (number > 3) {
//             result.push(number);
//         }
//     }
//     return result;
// }
const biggerThanThree = (numbers) => 
    numbers.filter(number => number > 3);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(biggerThanThree(numbers)); // [4, 5, 6, 7, 8, 9]


// 1.09 배열 내장함수 퀴즈
// function countBiggerThanTen(numbers) {
//     return numbers.filter(number => number > 10).length;
// }
const countBiggerThanTen = (numbers) =>
    numbers.reduce((acc, current) =>
        acc + (current > 10 ? 1 : 0), 0);

const count = countBiggerThanTen([1, 2, 3, 5, 10, 20, 30, 40, 50, 60]);
console.log(count); // 5