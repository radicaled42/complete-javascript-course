'use strict';
/*
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

// Static method on constructor

Person.hey = function () {
  console.log('Hey There');
  // console.log(this); // This is the entire contructor
};

Person.hey();


// 209. Prototype
// We use this instead of putting the function in the construct.
// This way, the function is created only once
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

daniel.calcAge();
guille.calcAge();

console.log('Proto');
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

// 211. Prototype Inheritance

console.log(daniel.__proto__);
// top of the prototype chain
console.log('__proto__.__proto__');
console.log(daniel.__proto__.__proto__);
console.log(daniel.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

// Prototype of Array

const arr = [1, 2, 3, 4, 4, 4, 4, 44]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

// New method for an Array - Not a good idea to add a method to an existing Prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');

// console.dir(h1);

console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀


//1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

const Car = function (make, speed) {
  // Instance properties
  this.make = make;
  this.speed = speed;
};

// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(this.speed);
};

// 4.
const golf = new Car('VW', 220);
console.log(golf);
golf.accelerate();
console.log(golf);
golf.break();
golf.accelerate();
golf.accelerate();
golf.accelerate();
console.log(golf);
golf.break();

const bmw = new Car('BMW', 120);
console.log(bmw);
bmw.accelerate();
console.log(bmw);
bmw.break();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
console.log(bmw);
bmw.break();

// 213. ES6 Classes

// class expression
const PersonCl2 = class {};

//class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // Getters and Setters

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert('Not full name');
  }

  get fullName() {
    return this._fullName;
  }

  // Static Methods

  static hey() {
    console.log('Hello there');
  }
}

// // We get the alert because it has only one name.
// const pepe = new PersonCl('Pepe', 1984);

const daniel = new PersonCl('Daniel Bianco', 1984);
console.log(daniel);
console.log('--class method--');
daniel.calcAge();
console.log('--class getter--');
console.log(daniel.age);

console.log(daniel.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

daniel.greet();
console.log(daniel.__proto__);

// 1. Classes are not hoisted
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode


// 214. Getters and Setters

const account = {
  owner: 'jonas',
  movements: [200, 300, 150, -10],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    return this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 100;
console.log(account.movements);

PersonCl.hey(); // Not available on instances

// 216. Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'steven';
steven.birthYear = '1990';
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('sarah', 1992);
sarah.calcAge();


///////////////////////////////////////
// Coding Challenge #2


1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  break() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const golf = new CarCl('VW', 120);
console.log(golf.speedUS);
golf.accelerate();
golf.break();
golf.speedUS = 75;

// golf.speedUS(120);
console.log(golf);

// 218 - Class Inheritance

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // use call to call the Persons prototype to link them.
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduction = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('mire', 2020, 'Computer Science');
console.log(mike);
mike.introduction();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__);

console.log(mike instanceof Person);
console.log(mike instanceof Student);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀

const Car = function (make, speed) {
  // Instance properties
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Linking prototypes
EV.prototype = Object.create(Car.prototype);

// 2.
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// 3.
EV.prototype.accelerate = function () {
  this.speed += 10;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const prius = new EV('toyota', 100, 90);

// 2. Test
console.log(prius.charge);
prius.chargeBattery(100);
console.log(prius.charge);

//3. Test
prius.accelerate();
prius.break();
prius.accelerate();
prius.accelerate();

// 200. Inheritance between classes.

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // Getters and Setters
  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert('Not full name');
  }

  get fullName() {
    return this._fullName;
  }

  // Static Methods

  static hey() {
    console.log('Hello there');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // super needs to happen first always
    super(fullName, birthYear);
    this.course = course;
  }

  introduction() {
    console.log(
      `My name is ${this.fullName.split(' ')[0]} and I study ${this.course}`
    );
  }

  calcAge() {
    console.log(`I am ${2037 - this.birthYear} years old`);
  }
}

// const martha = new StudentCl('Martha Jones', 2012);
const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduction();
martha.calcAge();

// 221. Inheritance between classes object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduction = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2015, 'Computer Science');

jay.calcAge();
jay.introduction();

// 222. Another Class Example - 223. Encapsulation

// Public fields
// Private fields
// Public Methods
// Private Methods
// (you also have the static version)

class Account {
  // Public Field (instances)
  locale = navigator.language;

  // Private Fields
  #movements = [];
  #pin; // Define an empty variable

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // protected property - is just a convention
    // this._movements = []; // Create a variable with a default value
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public Methods
  getMovements() {
    return this.#movements;
  }

  deposit(mov) {
    this.#movements.push(mov);
    return this;
  }

  withdrwal(mov) {
    this.deposit(-mov);
    return this;
  }

  // This is a public method
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved');
    }
    return this;
  }

  // Private Methods
  // This is an internal method
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Daniel', 'EUR', 1111);

// You can do this, but its not recommended.
// Its recommended to make a method
// acc1.movements.push(250);
// acc1.movements.push(-100);

acc1.deposit(250);
acc1.withdrwal(100);
console.log(acc1);

console.log(acc1.pin);
console.log(acc1.getMovements());

// console.log(acc1.#movements); // you get an error, because its a private field
// We should not be able to call approveLoan
// acc1.approveLoan(120);

acc1.requestLoan(120);

// 225. Chaining
acc1.deposit(300).deposit(500).withdrwal(100).requestLoan(10000);
console.log(acc1.getMovements());

*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  break() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const golf = new CarCl('VW', 120);

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    // super needs to happen first always
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 10;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const prius = new EVCl('toyota', 100, 23);

console.log(prius.charge);
prius.chargeBattery(50);
console.log(prius.charge);

prius.accelerate();
prius.break();
prius.accelerate();
prius.accelerate().break().break().chargeBattery(60).accelerate();

console.log(prius.speedUS);
