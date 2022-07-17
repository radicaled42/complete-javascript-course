'use strict';

/*
// 128- Parameters

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 5); // Skip default parameter


//129- Pasing arguments

const flight = 'LH234';
const daniel = {
  name: 'Daniel Bianco',
  passport: 32454534453,
};

const checkIn = function (flighNum, passenger) {
  flighNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 32454534453) {
    console.log('Check In');
  } else {
    alert('Wrong Passport');
  }
};

checkIn(flight, daniel);
console.log(flight);
console.log(daniel);

// Its the same as doing this
const flighNum = flight;
const passenger = daniel;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(daniel);
checkIn(flight, daniel);
console.log(flight);
console.log(daniel);

// 131- Callbacks

const oneWord = function (str) {
  return str.toLowerCase().replaceAll(' ', '');
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(', ');
};

console.log(oneWord('Uno dos tres'));
console.log(upperFirstWord('Uno dos tres'));

// Higher other function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);

  console.log(`Transformed string: ${fn(str)}`);

  // Method applied to the funtion
  console.log(`Transformed string: ${fn.name}`);
};

transformer('something something somthing dark side', oneWord);
transformer('something something somthing dark side', upperFirstWord);

const high5 = function () {
  console.log('manito');
};

document.body.addEventListener('click', high5);

['1', '2', '3'].forEach(high5);

// 132- functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet('Hey');
console.log(greetHey);
greetHey('Daniel');
greetHey('Pepe');

greet('Hello')('Daniel');

const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('Hola')('Daniel');

// 133- call and apply methods

const american = {
  airline: 'American Airlines',
  iataCode: 'AA',
  bookings: [],
  book(flighNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flighNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flighNum}`, name });
  },
};

american.book('991', 'Daniel');
american.book('991', 'Pepe');
console.log(american.bookings);

const jetBlue = {
  airline: 'Jet Blue',
  iataCode: 'JB',
  bookings: [],
};

const book = american.book;

// book(23, 'Jose'); this keyword points to undefined

// Call method. You can assign the this keyword from an object
book.call(jetBlue, 23, 'Jose');
console.log(jetBlue);

book.call(american, 991, 'Pedro');
console.log(american.bookings);

const airNewZealand = {
  airline: 'Air New Zealand',
  iataCode: 'NZ',
  bookings: [],
};

book.call(airNewZealand, 223, 'Pedro');
console.log(airNewZealand.bookings);

// Apply method. Works similar to the call method, but you have to assign an array as the variables
const flightData = [583, 'George'];
book.apply(airNewZealand, flightData);
console.log(airNewZealand.bookings);

book.call(airNewZealand, ...flightData);

// 134- Bind Method
// Does not call a function but generate a new one with the this keyword inside
// book.call(american, 991, 'Pedro');

const bookJB = book.bind(jetBlue);
const bookAA = book.bind(american);
const bookANZ = book.bind(airNewZealand);

bookJB(23, 'Carl');

// Allow to set a default of a parameter (partial application)
const bookJB23 = book.bind(jetBlue, 23); // in this case the flightNum
bookJB23('Jose');

// With Event Listeners
american.planes = 300;
american.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

american.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', american.buyPlane.bind(american));

// Partial application
const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

const addTax23 = addTax.bind(null, 0.23);
// addTax23 = value + value * 0.23

console.log(addTax23(100));

const addTaxRate = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

const addTaxSub = addTaxRate(0.23);
console.log(addTaxSub);
addTaxSub(100);

// 136- IIFE
// Allows data encapsulation
const runOnce = function () {
  console.log('This will never run again');
};

runOnce();

// Put parentesis in the function to transfor it from a function to an expression
// to call it you have to add ();
(function () {
  console.log('This will never run again');
})();

(() => console.log('This will run once'))();

*/

// 137- Closures

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();

// 138- Closure examples

// f was defined outside the function
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

// Assign the f function inside the g function
g();
f();

// Reassing the f function
h();
f();

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
