'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // Destructuring an object when recieved at the funtion
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:30',
    address = 'ETC2',
  }) {
    console.log(
      `Order recieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delived to ${address} at ${time}`
    );
  },

  // Spread in functions
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...rest) {
    console.log(`Here is your pizza with ${mainIngredient} and ${rest}`);
  },
};

/*

// 103- Array Destructuring

const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(`X: ${x}, Y: ${y}, Z: ${z}`);

let [first, , second] = restaurant.categories; // you can scape the element in the middle
console.log(first, second);

// const temp = first;
// first = second;
// second = temp;
// console.log(first, second);

[first, second] = [second, first]; //switching variables
console.log(first, second);

// Recieve 2 return values from a function
const [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

// Nested destructuring
const nested = [2, 3, [5, 6]];
// const [i, , j, k] = nested;
// console.log(i, j);
// console.log(k);

const [i, , [j, k]] = nested;
console.log(i, j, k);

// Undefine values
const [p, q, r] = [8, 9];
console.log(p, q, r); // r is undefinded

// Give default values
const [s = 1, t = 1, u = 1] = [8, 9];
console.log(s, t, u);

// 104- Destructuring Objects

// Deconstructing an object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Rename variables
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Defaulting variables
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating Variables
let a = 111;
let b = 234;

const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

restaurant.orderDelivery({
  time: '22:30',
  address: 'etc',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  time: '22:30',
  address: 'etc',
  starterIndex: 2,
});

// 105- Spread Operator

const arr = [7, 8, 9];

const newArr = [1, 2, ...arr]; // takes all the elements from the array and put them in the new array

console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);
console.log(restaurant.mainMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 array
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterable: arrays, strings, maps, sets.
const str = 'Daniel';
const letters = [...str, ' ', 'B.'];
console.log(letters);
console.log(...str);

const ingredients = [
  // prompt('Ingredients 1: '),
  // prompt('Ingredients 2: '),
  // prompt('Ingredients 3: '),
];

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { ...restaurant, founder: 'Daniel Bianco' };
console.log(newRestaurant);

newRestaurant.name = 'Daniel Cafe';
console.log(restaurant.name);
console.log(newRestaurant.name);

// 106- Rest Pattern and Parameters
// Rest pack elements into an array

// Spread on the right
const arr = [1, 2, ...[3, 4]];

// Rest on the left - always at the end
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Functions
const add = function (...numbers) {
  const sum = numbers.reduce((partialSum, a) => partialSum + a, 0);
  console.log(sum);
};

add(2, 3);
add(2, 4, 6);
add(1, 3, 5, 7, 9);

const x = [25, 24];
add(...x);

restaurant.orderPizza('cheese', 'garlic', 'tomato', 'parsley');
restaurant.orderPizza('cheese');

//107- Short Circuiting
console.log('---OR---'); // Returns the last value or the first thruty value
console.log(3 || 'Daniel');
console.log(0 || 'Daniel');
console.log('' || 'Daniel');
console.log(true || 0);
console.log(undefined || null);
console.log(null || undefined);
console.log(undefined || 0 || '' || 'Daniel' || 23 || null);

// restaurant.numGuests = 12;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

const guest2 = restaurant.numGuests || 15;
console.log(guest2);

console.log('---AND---'); // Returns the last value or the first falsy
console.log(0 && 'Daniel'); // finalize the operation once it finds a false
console.log(7 && 'Daniel'); // returns the second value when the first its true

console.log('Daniel' && 38 && 0 && 'pepe'); // returns the value where the conditionals break or finish

// They are the same
if (restaurant.orderPizza) {
  restaurant.orderPizza('cheese');
}

restaurant.orderPizza && restaurant.orderPizza('cheese');

// 108- Nullish coalescing operator

restaurant.numGuests = 0;
const guest = restaurant.numGuests || 15;
console.log(guest);

// work with the priniciple of nullish values NOT 0 or ''
const guestCorrect = restaurant.numGuests ?? 15;
console.log(guestCorrect);

// 109- Logicl Assigments

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'Biancos',
  owner: 'Benedicto',
};

// Or assigment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;

console.log(rest1);
console.log(rest2);

// Nullish assigment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

console.log(rest1);
console.log(rest2);

// And operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

*/
