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

*/
