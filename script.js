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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => b - a) : movements;

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__value">${movement}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, ele) => acc + ele, 0);
  console.log(deposits);
  labelSumIn.textContent = `${deposits}€`;
  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, ele) => acc + ele, 0);
  console.log(withdrawals);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  console.log(interest);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (names) {
        return names[0];
      })
      .join('');
  });
};
createUsername(accounts);

const calculatebalance = function (acc) {
  acc.balance = acc.movements.reduce((accs, mov) => accs + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // display balance
  calculatebalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // this will stop form element from submitting
  e.preventDefault();
  console.log('Login');
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;
  }
  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur(); // removes the blinking pointer from the pin field
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
  console.log(amount, receiverAcc);
});
/////////////////////////////////////////////////////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov >= (amount * 10) / 100)
  );
  {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
/////////////////////////////////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    accounts.splice(index, 1);
    console.log(accounts);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
// Methods are simply functions which we can call on objects basically they are functions attached to objects
// as arrays also contains methods therefore they are also objects
// array mathods are functions attached to all arrays that we create in javascript

// SLICE method
// just like strings we can also extract some parts of array using slice method
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
// the end parameter is not included in the new array but the start parameter is included
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
// creating shallow copies by just passing the functions and not giving parameters
console.log(arr.slice());
// we can also make copy by expanding the original array in new array
console.log([...arr]);
// this doesn't mutate the original array instead it gives a new array

// SPLICE method

// splice method works as same as the slice method but the only fundamental difference is that it changes the original array
//console.log(arr.splice(2));
console.log(arr);
// here it changed the original array
// the extracted array is removed from the original array as splice deleted them from the original array
// mostly splice is used to delete the elements from the array and the most commom use case is simply deleting the last element of the array
//console.log(arr.splice(-1));
// the end parameter in splice doen't count as end parameter it is the number of elements taken with the start parameter
console.log(arr);
console.log(arr.splice(1, 3));

// REVERSE method
// simply reverses the order in which the elements are placed
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);
// reverse method changes the original array

// CONCAT method
console.log(arr.concat(arr2));
// used for merging the two arrays
console.log(arr);
// and this doesn't mutates/changes the original array
// we can also do this in this way
console.log([...arr, ...arr2]);

// JOIN method
console.log(arr.join(' - '));
console.log(arr.concat(arr2).join(' - '));

// AT method
// at method is the new method to javascript
const ar = [23, 11, 64];
// if we wanted to take any value out of the array for example the first one we will traditionally do this
console.log(ar[0]);
// we can do the exact same thing using the at method
console.log(ar.at(0));
console.log(ar.at(1));
// there is one particularity of the at method which makes it very useful to use instead of the [] notation
// supposing that we don't know the length of the array and we want to get the last element of the array
console.log(ar[ar.length - 1]);
console.log(ar.slice(-1)[0]);
// we can do this more easily using the at method as the negative numbers starts counting elements from the right side
console.log(ar.at(-1));
// at method also works on strings
console.log('HelloMoto'.at(2));
console.log('HelloMoto'.at(1));
console.log('HelloMoto'.at(-1));


//------------------------------------------------------------------------
/*
// Looping Arrays : for Each

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) console.log(`You deposited ${movement}`);
  else console.log(`You withdrew ${Math.abs(movement)}`);
}

console.log('-------'.repeat(10));
// using for each method

// for each method contains call back function as it is a higher order function which require a function, it is the for Each method here which will call the callback function
// for each method will loop over the array and in each iteration it will call this call back function
// also as it calls the call back function in each iteration it will also pass the current iterating element as the argument for the call back function
movements.forEach(function (movement) {
  if (movement > 0) console.log(`You deposited ${movement}`);
  else console.log(`You withdrew ${Math.abs(movement)}`);
});
console.log('-------'.repeat(10));
// behind the scenes at iteration 0 it will call the function with argument passed  as 200 and so on in next it will do function(450) and so on and so for

// for getting the current index we loop over array.enteries in for of loop
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`${i} You deposited ${movement}`);
  else console.log(`${i}  You withdrew ${Math.abs(movement)}`);
}
console.log('-------'.repeat(10));
// doing same in the for each method
// for each iteration the for each method doesn't only pass the current iterating element as argument it also passes the index and the entire array
// here the order of parameters matter the first parameter always needs to be the element then index and at last the complete entire array
movements.forEach(function (movement, index, array) {
  if (movement > 0) console.log(`${index} You deposited ${movement}  ${array}`);
  else console.log(`${index} You withdrew ${Math.abs(movement)}`);
});

// ** One fundamental difference between a for of and for each loop is that we can't break through the for each loop means we can't use the break and continue statements in for each loop
*/

// -----------------------------------------------------------------

// For Each method also works on maps and sets
/*
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, entireMap) {
  console.log(`${key}: ${value} ${entireMap}`);
});

// Set
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value} ${map}`);
});
// the key here is exactly the same as values as sets doesn't have keys and it doesn't have indexes either
*/

// --------------------------------------------------------------------

// Data Transformations: map, filter, reduce

// there are three big array methods used for data transformation
// these are the methods we use to make new arrays based on the transfering data from other arrays
// These tools are map , filter and reduce

// Map method
// map method is very similar to the for each method but the difference is that map creates a brand new array based on the original array
// map method basically takes an array loops over it and in each iteration it applies a callback function specifying our code to the current array element
// for example lets consider an array of numbers for which the map method multiplies each element by 2 and returns a new array with every element being multiplied by the number 2
// it maps the value of original array to new array
// map returns a new array containing the result of applying an operation on all original array elements

// Filter method
// this method is used to filter the elments from an original array which satisfies some condition
// for example lets again consider an array of numbers and the filter element will return a new array with all the elements which are greater than 2
// filter returns a new array containing the array elements that passed a specified test condition

// Reduce method
// this method is used to boil down all array elements to one single value
// and an example of this can be to add all the elements of a given array but we can do many more interesting things

//---------------------------------------------------------------------

// // Map method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUSD = 1.1;
// // const movementUSD = movements.map(function (mov) {
// //   return mov * euroToUSD;
// // });
// const movementUSD = movements.map(
//   mov => /* this is exactly same as writing return */ mov * euroToUSD
// );

// console.log(movementUSD);
// // the original array doesn't changes by this

// // writing the above thing using the for of loop
// const movementToUSD = [];
// for (const mov of movements) {
//   const result = mov * euroToUSD;
//   movementToUSD.push(result);
// }
// console.log(movementToUSD);

// // just like for each method the map method also has access to all three parameters like element , index , and entire array
// const movementsDescription = movements.map((mov, i, arr) => {
//   if (mov > 0) {
//     return `Movement ${i + 1}: You deposited ${mov}`;
//   } else {
//     return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
//   }
// });

// console.log(movementsDescription);

//---------------------------------------------------------------------
/*
// Filter method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);
// all these three methods are nearly same contains call back functions

const seperateDeposits = [];
for (const mov of movements) {
  if (mov > 0) {
    seperateDeposits.push(mov);
  }
}
console.log(seperateDeposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

//---------------------------------------------------------------------
/*
// Reduce method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// in this case the value will be a single value and not an entire array
// also the parameters of call back function is different from other two methods
// the first parameter in this method is accumulator
const balance = movements.reduce(function (acc, mov, i, arr) {
  return acc + mov;
}, 0);
// here we set the initial value of accumulator to 0
console.log(balance);

// writing using arrow function
const balance2 = movements.reduce((acc, mov) => acc + mov, 0);
// here we set the initial value of accumulator to 0
console.log(balance2);

// doing same with the for loop
let sum = 0;
for (const mov of movements) {
  sum += mov;
}

console.log(sum);

// Max value
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/
//------------------------------------------------------------------------
/*
// Magic of chaining methods

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD = 1.1;

const totalDepositInUSD = movements
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (dol) {
    return dol * euroToUSD;
  })
  .reduce(function (acc, ele) {
    return acc + ele;
  }, 0);
console.log(totalDepositInUSD);

// using arrow functions
//pipeline

const totalDepositInUSD2 = movements
  .filter(mov => mov > 0)
  .map(dol => dol * euroToUSD)
  .reduce((acc, ele) => acc + ele, 0);

console.log(totalDepositInUSD);
*/

//------------------------------------------------------------------------
/*
// The find Method

// as the name suggests we can use find method to retrieve one value of an array based on a condition
// just like filter method the find method also requires a callback function which is a boolean
// this method will not return a new array but it will return the first element which satisfies the condition in the callback function

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

for (const ac of accounts) {
  if (ac.owner === 'Jessica Davis') {
    console.log(ac);
  }
}
*/
// --------------------------------------------------------------------
/*
// Some and Every Method

// SOME
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.includes(-130));
// so include here is true if any value in the array is exactly equal to the -130 it is essentially testing for equality
// but what if wanted to test for a condition instead and that's where the some method is used
console.log(movements.some(mov => mov === -130));
// checking if there is any value greater than 0 present in the movements array
// if there is any value in the array for which the given array is true then the some method will return true
console.log(
  movements.some(function (mov) {
    return mov > 0;
  })
);
// EVERY
// every method is also same as some method but it only returns true if every element in the array satisfies a condition
console.log(account4.movements.every(mov => mov > 0));

// Seperate Callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
// we can do this with other methods also whether filter reduce or map
*/
//----------------------------------------------------------------------
/*
// flat and flatMap

// lets consider we have an array with some arrays in it
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// now what if we want to put these values in a seperate array without nesting other arrays in it only the elements
console.log(arr.flat());

// if we have an array which is more deeply nested then what can we do
const arrDeep = [[[2, 1], 3], [[4], [5, 6]], 7, 8];
console.log(arrDeep.flat());
// this means the flat method only goes one level deep when flatening an array but we can fix this as it is set by default that the method will do flatening only one level deep but specifying the number in the bracket will be level of flatening of array
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const fullArr = accountMovements.flat();

console.log(fullArr.reduce((acc, mov) => acc + mov, 0));

// doing the above with  chaining
console.log(
  accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0)
);

// here in the above example we firt used the map method and then we used the flat method on it and to do this we can do it with findMap()

console.log(
  accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
);
// flat map is essentially a map method but at the end it flattens the array
// the flatMap only goes one level deep but if we want to go more levels deeper we still need to use the flat method
*/
//-------------------------------------------------------------------------
/*
// Sorting Arrays
// String
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
// this will sort the array alphabatically
// this will change the original array

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.sort());
// this will not give an ordered sequence of numbers although it will seperate the negative from the positive ones
// sort method does sorting on basis of string basically it will first convert all the numbers to strings and then sort the array
// we can fix this by passing a callback function in the sort method and this call back function will bw called by two arguments ,these two arguments a re basically the current value and the next value
// lets think a and b as two consecutive numbers in an array
// if we return < 0 then a will be before b (keep order)
// if we return > 0 then b will be before a (switch order)
console.log(
  movements.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
  })
);
// or
console.log(movements.sort((a, b) => a - b));
// doing it on descending order
console.log(
  movements.sort((a, b) => {
    if (a > b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
  })
);
// or
console.log(movements.sort((a, b) => b - a));
*/
// ----------------------------------------------------------------------
/*
// More Ways of Creating and Filling arrays

// uptil now we were creating arrays like this
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));
// in these cases we basically already have our data

// we can also generate arrays in other ways
// one way is by using the array constructor
const x = new Array(7);
console.log(x);
// this will not create an array with an element 7 in it instead it will create an empty array with 7 empty elements
// and this empty array is not useful with any method except one method and that is the fill method
// x.fill(5);
// this will mutate the original array
x.fill(5, 3, 6);
// the second parameter is index from which we want to start filling and the third is the index upto which we want to fill it
console.log(x);
// we can do this method on existing arrays too
arr.fill(-1, 2, 3);
console.log(arr);

// Array.from
console.log(Array.from({ length: 7 }, () => 1));

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const movementsUI = Array.from(
  document.querySelectorAll('.movements__value'),
  function (ele) {
    return Number(ele.textContent.replace('€', ''));
  }
);
console.log(movementsUI);
*/
// ----------------------------------------------------------------------

// Array Methods Practice

// 1.
const bankDepositSum = accounts
  .map(mov => mov.movements)
  .flat()
  //(or) .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);
// doing same thing using reduce method
const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);
console.log(numDeposit1000);
// we din't use the ++ operator bcs
let a = 10;
console.log(a++);
console.log(a);
// this happens as the ++ operator does increment the value but it returns the previous value
// to avoid these situations we use the prefix ++ operator
let b = 7;
console.log(++b);

// 3.
// an object with sum of deposits and withdrawals

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

// 4.
// creating a function which converts the string into title cased which some of the strings letters are capitalized
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = [
    'a',
    'an',
    'the',
    'but',
    'or',
    'on ',
    'in',
    'with',
    'and',
  ];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(cap =>
      exceptions.includes(cap)
        ? cap.toLowerCase()
        : cap[0].toUpperCase() + cap.slice(1)
    )
    .join(' ');
  return titleCase;
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another titLe with an EXAMPLE'));
