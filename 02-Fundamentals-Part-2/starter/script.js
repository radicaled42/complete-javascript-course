// 32- Stict Mode

'use strict'; // Avoid introducing bugs

/*
// 33- Functions

function logger(){
    console.log('My name is Daniel');    
    console.log('My name is Daniel1');
    console.log('My name is Daniel2');
}

logger();
logger();

function foodProcessor(numApples, numOranges){
    // console.log(numApples, numOranges);
    const juice = `Juice with ${numApples} Apples and ${numOranges} Oranges`;
    return juice;
}

console.log(foodProcessor(3, 2));

const juiceProcessed = foodProcessor(1,4);
console.log(juiceProcessed);

// 34- Function Declaration cs Expression

// Function Declaration
function calcAge1(birthday){
    // const age = 2037 - birthday;
    // return age;
    return 2037 - birthday;
}

const age1 = calcAge1(1984);
console.log(age1);

// Funciton Expression (saves the function directly in a variables)
const calcAge2 = function(birthday){ //Anonymous function
    return 2037 - birthday;
}

const age2 = calcAge2(1984);
console.log(age2);

// 35- Arrow Function 

// Arrow (simplification of expression)
// assign to a variable = arguments => function
const calcAge3 = birthday => 2037 - birthday;

const age3 = calcAge3(1984);
console.log(age3);

const yearUntilRetirement = (birthday, firstName) => {
    const age = 2037 - birthday;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} return in ${retirement}`;
}

console.log(yearUntilRetirement(1984, 'Daniel'));

// 36- Functions calling other functions

function cutFruit(fruit){
    return fruit * 4;
}

function foodProcessor(numApples, numOranges){
    const applePieces = cutFruit(numApples);
    const orangePieces = cutFruit(numOranges);
    const juice = `Juice with ${applePieces} Apples and ${orangePieces} Oranges`;
    return juice;
}

const juiceProcessed = foodProcessor(1,4);
console.log(juiceProcessed);

// 37- Function Review

const yourAge = function(theAge){
    return 2037 - theAge;
}

const yearUntilRetirement = (birthday, firstName) => {
    const age = yourAge(birthday);
    const retirement = 65 - age;

    if (retirement > 0){
        console.log(`${firstName} return in ${retirement}`);
        return retirement;
    } else {
        console.log('You are already retired');
        return -1;
    }

}

console.log(yearUntilRetirement(1984, 'Daniel'));
console.log(yearUntilRetirement(1970, 'Pepe'));

// 39- Arrays 

// define de array with brackets
const friends = ['steven', 'peter', 'michael'];
console.log(friends);

// define array with function
const years = new Array(1991, 1992, 1992);
console.log(years)

// obtain element
console.log(friends[0], friends[2])

// functions applicable to array
console.log(friends.length);

// last element
console.log(friends[friends.length - 1]);

// change the array
friends[2] = 'pablito';
console.log(friends);

const daniel = ['daniel', 'bianco', 2037 - 1984, 'devops', friends];
console.log(daniel);
console.log(daniel.length);


const calcAge = birthday => 2037 - birthday;
const yearsNew = [1990, 1967, 2002, 2010];

console.log(calcAge(yearsNew[0]));
console.log(calcAge(yearsNew[1]));
console.log(calcAge(yearsNew[2]));

const ages = [calcAge(yearsNew[0]), calcAge(yearsNew[1]), calcAge(yearsNew[yearsNew.length - 1])];
console.log(ages);

// 40- Array Methods

const friends = ['steven', 'peter', 'michael'];

// Push add elements at the end
friends.push('pepe');
console.log(friends);

// Unshift add an element to the beginning
friends.unshift('Jay');
console.log(friends);

// Pop remove the last element
const removedElement = friends.pop();
console.log(removedElement);
console.log(friends);

// Shift remove an element to the beginning
const removedElement2 = friends.shift();
console.log(removedElement2);
console.log(friends);

// IndexOf find the position of an element
console.log(friends.indexOf('steven'));

// Includes check if the element is in the array - STRICT COERCION
console.log(friends.includes('steven'));
console.log(friends.includes('Steven'));
console.log(friends.includes('daniel'));

// 42- Objects - 43- Dot vs Brackets

const daniel = {
    firstName: 'Daniel',
    lastName: 'Bianco',
    age: 2037 - 1984,
    job: 'devops',
    friends: ['steven', 'peter', 'michael']
}

// Dot
console.log('DOT')
console.log(daniel);
console.log(daniel.firstName);
console.log(daniel.friends);
console.log(daniel.friends[0]);

// Brackets
console.log('BRACKET')
console.log(daniel['firstName']);
console.log(daniel['friends']);

const nameKey = 'Name';
console.log(daniel['first' + nameKey]);
console.log(daniel['last' + nameKey]);

const interestedIn = prompt('What do you want to know');
console.log(interestedIn);

console.log(daniel[interestedIn]);

if(daniel[interestedIn]){
    console.log(daniel[interestedIn]);
} else {
    console.log('Variable Undefined')
}

// Add Elements
daniel.location = 'Lanus';
daniel['twitter'] = 'radical42';
console.log(daniel);


// Challlenge
// Daniel has 3 friends, and his best friend is called steven

console.log(`${daniel.firstName} has ${daniel.friends.length} friends, and his best friend is called ${daniel.friends[0]}`);

// 44- Object Methods 

const daniel = {
    firstName: 'Daniel',
    lastName: 'Bianco',
    birthYear: 1984,
    job: 'devops',
    friends: ['steven', 'peter', 'michael'],
    hasDriversLicense: true,
    
    // Version 1
    // calcAge: (birthYear) => {
    //     return 2037 - birthYear
    // }

    // Version 2
    // calcAge: function () {
    //     // console.log(this);
    //     return 2037 - this.birthYear;
    // }

    // Version 3
    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    }
}

console.log(daniel);
// Version 1
// console.log(daniel.calcAge(1984));
// console.log(daniel['calcAge'](1984));

// Version 2
// console.log(daniel.calcAge());

// Version 3
console.log(daniel.calcAge());
console.log(daniel.age);
console.log(daniel.age);

// Challenge get summary
// "Daniel is a 48 year old DevOps, and he has a Drivers license"

const daniel = {
    firstName: 'Daniel',
    lastName: 'Bianco',
    birthYear: 1984,
    job: 'devops',
    friends: ['steven', 'peter', 'michael'],
    hasDriversLicense: false,
    
    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },
    getSummary: function(){
        if (this.hasDriversLicense){
            return `${this.firstName} is a ${this.calcAge()}, and he has a Drivers license`;
        } else{
            return `${this.firstName} is a ${this.calcAge()}, and he DOES NOT have a Drivers license`;      
        }
    }
}

console.log(daniel.getSummary());

// 46- Iterations For Loop

for(let index = 1; index <= 10; index++){
    console.log('Lift wheights ' + index);
}

// 47- Looping arrays, breaking and continuing

const daniel = [
    'daniel', 
    'bianco', 
    2037 - 1984, 
    'devops', 
    ['steven', 'peter', 'michael'],
    true
];

const types = [];

for (let i = 0; i < daniel.length; i++){
    // Reading from the array
    console.log(daniel[i], typeof(daniel[i]));

    // Writing the array
    //types[i] = typeof(daniel[i]);
    types.push(daniel[i]);
}

console.log(types);

const year = [1992, 1998, 2003, 1984];
const ages = []

for (let i = 0; i < year.length; i++){
    ages.push(2037 - year[i]);
}

console.log(ages);

// continue and break
console.log('---print only strings continue---')
for (let i = 0; i < daniel.length; i++){
    // Reading from the array
    if(typeof(daniel[i]) !== 'string') continue;
    console.log(daniel[i], typeof(daniel[i]));
}

console.log('---print only strings break---')
for (let i = 0; i < daniel.length; i++){
    // Reading from the array
    if(typeof(daniel[i]) === 'number') break;
    console.log(daniel[i], typeof(daniel[i]));
}

// 48- Loop backwards, loops in loops

const daniel = [
    'daniel', 
    'bianco', 
    2037 - 1984, 
    'devops', 
    ['steven', 'peter', 'michael'],
    true
];

for (let i = daniel.length - 1; i >= 0; i--){
    console.log(i, daniel[i]);
}

for (let i = 1; i < 4; i++){
    console.log(`--- Starting Exercise ${i} ---`);
    for (let x = 1; x < 6; x++){
        console.log(`--- Repetition ${x} ---`);
    }
}



// 49- While

// for(let index = 1; index <= 10; index++){
//     console.log('Lift wheights for: ' + index);
// }

let index = 1;
while (index <= 10){
    // console.log('Lift wheights while: ' + index);
    index++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(`You rolled a ${dice}`);

while (dice !== 6){
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('You rolled a 6 - GETTING OUT')
}

*/