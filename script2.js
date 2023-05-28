'use strict';
// coding challenges javascript file

const checkDogs = function (dogsJulia, dogsKate) {
  //   console.log(dogsJulia);
  const copyJulia = dogsJulia.slice();
  copyJulia.splice(-2);
  copyJulia.splice(0, 1);
  //   console.log(copyJulia);
  const bothAges = [...copyJulia, ...dogsKate];
  bothAges.forEach(function (dogAges, i) {
    if (dogAges > 3)
      console.log(`Dog number ${i + 1} is adult and is ${dogAges} years old`);
    else console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];
checkDogs(julia, kate);

const calcAverageHumanAge = function (ages) {
  const dogToHumanAge = ages
    .map(function (dogAge) {
      if (dogAge <= 2) {
        return 2 * dogAge;
      } else {
        return 16 + dogAge * 4;
      }
    })
    .filter(function (curr) {
      if (curr >= 18) return curr;
    });
  const sumOfAges = dogToHumanAge.reduce(function (acc, current) {
    return acc + current;
  }, 0);
  const average = sumOfAges / dogToHumanAge.length;
  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
