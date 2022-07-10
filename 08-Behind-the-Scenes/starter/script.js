'use strict';

/*

// 93- Scope
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  //   console.log(firstName);
  function printAge() {
    const output = `${firstName} are the ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      //   const firstName = 'Pepe'; Creates a new variable with the same name
      const str = `You are a millenial, ${firstName}`;
      console.log(str);

      function addValues(a, b) {
        return a + b;
      }
      console.log(addValues(1, 2));
    }
    // addValues(1, 2); Outside the IF scope
    // console.log(str); Unable to get the variable outside the scope
  }
  printAge();
  return age;
}

const firstName = 'Daniel';
calcAge(1984);
// console.log(age); Not in the scope
// printAge(); Not in the base scope

// 95- Hoisting

// Var Hoisting
// console.log(me);
// console.log(job);
// console.log(year);

var me = 'daniel';
let job = 'devops';
const year = 1984;

console.log(addDecal(2, 3));
// console.log(addExpre(2, 3)); in the Temporal Dead Zone because is treated as const
// console.log(addArrow(2, 3)); in the Temporal Dead Zone because is treated as const

function addDecal(a, b) {
  return a + b;
}

const addExpre = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => {
  return a + b;
};

// Hosting Undefined
console.log(undefined);
console.log(numprod); // Becasue of hoisting var numprod is undefined at this point

if (!numprod) deleteAll();

var numprod = 10;
function deleteAll() {
  console.log('Deleted All');
}

// 97- this keyword

console.log(this);

const calcAge = function (year) {
  console.log(2037 - year);
  console.log(this);
};

calcAge(1984);

const calcAgeArrow = year => {
  console.log(2037 - year);
  console.log(this);
};

calcAgeArrow(1984);

const daniel = {
  year: 1984,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};

daniel.calcAge();

const matilda = {
  year: 1986,
};

matilda.calcAge = daniel.calcAge;
matilda.calcAge();

const daniel = {
  firstName: 'Daniel',
  year: 1984,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // solution 1 - need to generate a variable with the object to inherit the object
    // const self = this;
    // const millenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // solution 2 - use arrow functions to use the THIS object from parent block
    const millenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    millenial();
  },
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

daniel.greet();
daniel.calcAge();

// arguments keyword functions not necessarily need to have the same number of arguments as requested, they can have more.
const addExpre = function (a, b) {
  console.log(arguments); // this returns an array of all the argument
  return a + b;
};
addExpre(1, 2, 33);

const addArrow = (a, b) => {
  //   console.log(arguments); // arrow functions don't have arguments variables
  return a + b;
};
addArrow(1, 2);

// 100- Primitives and Objects

let lastName = 'Bianco';
let oldlastName = lastName;
lastName = 'Lalala';

console.log(lastName);
console.log(oldlastName);

const daniel = {
  firstName: 'daniel',
  lastName: 'bianco',
  age: 38,
};

const guille = daniel;
guille.age = 36;

console.log(daniel, guille); // guille its not a new object but a link to the original object

*/
