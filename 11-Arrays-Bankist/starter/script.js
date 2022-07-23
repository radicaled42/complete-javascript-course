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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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

// ###### FOR THE APPLICATION

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsername(accounts);
// console.log(accounts);

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  // account.balance = balance;
  labelBalance.textContent = `${account.balance} EUR`;
};

// calcPrintBalance(account1.movements);

// CALCULATE SUMMARY (channing)

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

// displayMovements(account1.movements);
// calcDisplaySummary(account1.movements);

// Update UI

const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcPrintBalance(account);
  // Display summary
  calcDisplaySummary(account);
};

// 158 - LOGIN FUNCTIONALITY

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log('LOGIN');

  // Current account use chaning to verify if the variable exist and check the pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcomen menssage
    // console.log('LOGIN');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear the login input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  } else {
    console.log('RETRY');
  }
  // console.log(currentAccount);
});

//159- Implementing Transfers
btnTransfer.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    // console.log('Valid Transfer');
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }

  // Clear the login input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  // console.log(amount, recieverAccount);
});

// LOAN

btnLoan.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // console.log('Approved');

    // Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);

    // Clear the close input fields
    inputLoanAmount.value = '';
  }
});

// 160- findIndex Method
btnClose.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // console.log('Delete');
    const index = accounts.findIndex(acc => acc === currentAccount);
    // console.log(index);
    // console.log(accounts);
    // Delete account
    accounts.splice(index, 1);

    // Clear the close input fields and Hide UI
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// 142- Simple Array Methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice creates a new array
console.log('--- SLICE ---');
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice()); // Shallow copy using slice

console.log([...arr]); // Shallow copy using spread

// Splice modify the existing array
console.log('--- SPLICE ---');
// console.log(arr.splice(2));
// console.log(arr.splice(3, 4));
// console.log(arr.splice(-1));

// console.log(arr);

// Reverse - Mutates the original array
console.log('--- REVERSE ---');
console.log(arr);
console.log(arr.reverse());
console.log(arr);

// Concat - Concatenates 2 arrays
console.log('--- CONCAT ---');
const arr2 = ['f', 'g', 'h', 'i', 'j'];
const letters = arr.concat(arr2);
console.log(letters);

console.log([...arr, ...arr2]);

// JOIN - converts an arry to a string
console.log('--- JOIN ---');
console.log(letters.join('-'));

// 143- At Method
const arr = [23, 11, 64];

console.log(arr[0]);
console.log(arr.at(0));

// Getting the last element of the array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('daniel'.at(-1));

// 144- Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${movement}`);
  }
}

// You will have to loop around the full array always
console.log('--- FOR EACH ---');
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${movement}`);
  }
});

// 145- forEach with Maps and Sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// For each on MAPS you have the value, key and map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// For each on SETS you have the value, key and map
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR', 'ARS']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀


// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];
const juliaData = [9, 16, 6, 8, 3];
const kateData = [10, 5, 6, 1, 4];

const checkDogs = function (juliaData, kateData) {
  const juliaDataCopy = [...juliaData];
  juliaDataCopy.shift();
  // juliaDataCopy.pop();
  // juliaDataCopy.pop();
  const juliaCorrected = juliaDataCopy.slice(0, juliaDataCopy.length - 2);

  // const juliaCorrected = [...juliaDataCopy];

  // console.log(juliaCorrected);
  const arrDogs = [...juliaCorrected, ...kateData];
  // Another option is const arrDogs = juliaCorrected.concat(kateData)
  // console.log(arrDogs);

  arrDogs.forEach(function (dogAge, index, array) {
    // adult >=3 puppy >= 0 < 3
    if (dogAge >= 3) {
      // "Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶"
      console.log(
        `Dog number ${index + 1} is an adult, and is ${dogAge} years old`
      );
    } else if (dogAge >= 0 && dogAge < 3) {
      console.log(`Dog number ${index + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs(juliaData, kateData);

// 147- Creating DOM Elements

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

//150- The Map method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;
// New method
// const movementsUDS = movements.map(function (mov) {
//   return Math.trunc(mov * euroToUsd);
// });
// New method using arrow functions
const movementsUDS = movements.map(mov => Math.trunc(mov * euroToUsd));

console.log(movements);
console.log(movementsUDS);

// Old Method
const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * mov);
}
console.log(movementsUsdFor);

const movementDescription = movements.map(
  (mov, index) =>
    `Movement ${index + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`
);

console.log(movementDescription);

//152- Filter Array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// 153- Reduce method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// accumulator is the sum
const balance = movements.reduce(function (accumulator, current, index, array) {
  console.log(
    `Iteration ${index} for a current value of ${current} and the accumulator is ${accumulator}`
  );
  return accumulator + current;
}, 0);

console.log(balance);

//Old Style
let balanceFor = 0;
for (const mov of movements) balanceFor += mov;
console.log(balanceFor);

// Reduce with arrow function
const balanceArrow = movements.reduce(
  (accumulator, current) => accumulator + current,
  0
);
console.log(balanceArrow);

// Maximum value
const maximumValue = movements.reduce(
  (accumulator, current) =>
    accumulator > current ? accumulator : (accumulator = current),
  movements[0]
);
console.log(maximumValue);

*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const dogAges1 = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (dogAges) {
  // const humanAge = [];
  // for (const age of dogAges) {
  //   if (age <= 2) {
  //     humanAge.push(2 * age);
  //   } else {
  //     humanAge.push(16 + age * 4);
  //   }
  // }
  const humanAge = dogAges.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  const adults = humanAge.filter(age => age >= 18);

  const humanAverage =
    adults.reduce((accumulator, current) => accumulator + current, 0) /
    adults.length;

  console.log(humanAge);
  console.log(adults);
  console.log(`The Human Average is: ${humanAverage}`);
};

calcAverageHumanAge(dogAges1);
calcAverageHumanAge(dogAges2);


// 155- Chaining

const euroToUSD = 1.1;
const totalBalanceInUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * euroToUSD;
  })
  // .map(mov => mov * euroToUSD)
  .reduce((acc, curr) => acc + curr, 0);

console.log(totalBalanceInUSD);

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const dogAges1 = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge2 = function (dogAges) {
  // const humanAge = dogAges.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = dogAges.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // .filter(age => age >= 18);

  const humanAverage = dogAges
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce(
      (accumulator, current, i, array) => accumulator + current / array.length,
      0
    );

  // console.log(humanAge);
  // console.log(adults);
  // console.log(`The Human Average is: ${humanAverage}`);
  return humanAverage;
};

const calcAverageHumanAge = dogAges =>
  dogAges
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce(
      (accumulator, current, i, array) => accumulator + current / array.length,
      0
    );

const avg1 = calcAverageHumanAge(dogAges1);
const avg2 = calcAverageHumanAge(dogAges2);

console.log(avg1, avg2);

// 157- find method

const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawl);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const accountFunction = function (accounts) {
  for (const account of accounts) {
    if (account.owner === 'Jessica Davis') {
      return account;
    }
  }
};

const account11 = accountFunction(accounts);
console.log(account11);

// 161- Some and every
console.log(movements);

// SOME
// CHECKS EQUALITY
console.log(movements.includes(-130));

// CHECKS CONDITION
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);

// EVERY
const everyDeposit = movements.every(mov => mov > 0);
console.log(everyDeposit);

const everyDeposit2 = account4.movements.every(mov => mov > 0);
console.log(everyDeposit2);

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// 162- flat and flatMap

// By default flat goes 1 level, you need to modify it.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
console.log(arrDeep.flat(2));

// Using different variables
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// Using channing
const overallBalanceChain = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceChain);

// flatMap - its a combination of flat and map and goes only one level
const overallBalanceMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceMap);

//163- Sorting arrays

const owners = ['Daniel', 'Pepe', 'Jose', 'Ari'];

// sort mutates the array
owners.sort();
console.log(owners);

// numbres
console.log(movements);
// Sort doesn't arrange a number array, only strings
console.log(movements.sort());

// To sort numbers you need to use the sort with variables and the function to compare
// Ascending
// Basic version
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// Arrow version
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// Basic version
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// Arrow version
movements.sort((a, b) => b - a);
console.log(movements);

*/

// 164- More ways

console.log([1, 2, 3, 4, 5, 6, 7]);

const x = new Array(7);
// console.log(x);
// console.log(x.map(() => 5));

// fills everything with 1
// x.fill(1);

// You can fill between specific indexes (number_you_want, index_1, index_2)
x.fill(1, 3, 5);
console.log(x);

// Array.from its the same as new Array + fill
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_curr, i) => i + 1);
console.log(z);

const randomValues = Array.from({ length: 100 }, (_curr, i) =>
  Math.floor(Math.random() * i)
);
console.log(randomValues);

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
