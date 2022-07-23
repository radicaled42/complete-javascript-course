'use strict';

// 208. Constructor functions

//Constructor function start with capital
// Arrow functions doesn't work as contructor
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Don't do this. This way the calcAge function gets created on all the objects - Create the function outside (prototype)
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// Steps when you run the new Constructor function
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const daniel = new Person('Daniel', 1984);
console.log(daniel);

const guille = new Person('Guille', 1986);
console.log(guille);

const ari = new Person('Ari', 1988);
console.log(ari);

console.log(daniel instanceof Person);
// console.log(lalal instanceof Person);

// 209. Prototype
// We use this instead of putting the function in the construct.
// This way, the function is created only once
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

daniel.calcAge();
guille.calcAge();

console.log(daniel.__proto__);
console.log(daniel.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(daniel));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(daniel, guille);
console.log(daniel.species);

// Has the firstName property, because it was define with it
console.log(daniel.hasOwnProperty('firstName'));
// It doesn't have the property species, becuase it comes from the prototype
console.log(daniel.hasOwnProperty('species'));
