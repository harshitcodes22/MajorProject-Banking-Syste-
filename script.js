'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
/////

///1. Exercise
const totalDeposit = accounts
  .map(x => x.movements)
  .flat()
  .filter(pos => pos > 0)
  .reduce((acc, curr) => acc + curr, 0);
const totalWithdrawl = accounts
  .map(x => x.movements)
  .flat()
  .filter(pos => pos < 0)
  .reduce((acc, curr) => acc + curr, 0);

console.log(totalDeposit);
/////

////2. excercise
const above_1000Deposit = accounts
  .map(x => x.movements)
  .flat()
  .reduce((acc, curr) => (curr >= 1000 ? acc + 1 : acc), 0);
console.log(above_1000Deposit);

////3. Exercise :-)
//create an object for sum of their deposits and of withdrawl;

const { deposit: ins, withdrwals: out } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      curr > 0 ? (sums.deposit += curr) : (sums.withdrwals += curr);
      return sums;
    },
    { deposit: 0, withdrwals: 0 }
  );
console.log(ins, out);

////4. Exercise :-)
// this is a nice title -> This Is a Nice Title

const str = 'This is a nice title'.split(' ').map(curr => {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  curr.toLocaleLowerCase();
  const newWord = exceptions.includes(curr)
    ? curr
    : curr[0].toUpperCase().concat(curr.slice(1));

  return newWord;
});
console.log(str);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// [200, 450, -400, 3000, -650, -130, 70, 1300],
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////f
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  //
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(deposit => deposit > 0)
    .map(int => (int * acc.interestRate) / 100)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest}€`;
};
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
// calcPrintBalance(account1.movements);

/// event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // prevents form from submitting ;
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 1;
    displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount);
    calcPrintBalance(currentAccount);

    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur();
  } else {
    containerApp.style.opacity = 0;
  }
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(recieverAcc);
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc.userName !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    displayMovements(currentAccount.movements);
    // displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount);
    calcPrintBalance(currentAccount);
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferTo.blur();
  // currentAccount.movements.push(amount);
});

///

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add the movement
    currentAccount.movements.push(amount);
    displayMovements(currentAccount.movements);
    // displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount);
    calcPrintBalance(currentAccount);
  }
  // inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

console.log([...document.querySelectorAll('.movements__row')]);

//Adding dates

const now = new Date();
const day = now.getDate();
const month = now.getMonth();
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();

labelDate.textContent = `${day}/${month}/${year},${hour}:${min} `;

setTimeout(() => console.log('Hey I am harshit'), 1000);

const startLogOutTimer = function () {
  //set time to 5 minutes
  let time = 10;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome = 'Log in to get started';
    }
    time = time - 1;
  };
  tick();
  //call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
  //when 0 seconds,stop timer and logout user
};
