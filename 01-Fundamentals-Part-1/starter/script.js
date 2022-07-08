/*
console.log("Dani");
let something='somethingelse';

console.log(something);

let PI = 3.1415;

// DATA TYPES

let someVariable = true;
console.log(someVariable);

console.log(typeof true);
console.log(typeof 'true');
console.log(typeof 42);

someVariable = 'something else';
console.log(someVariable);

let somethingElse;
console.log(typeof somethingElse);
console.log(somethingElse);

somethingElse = 1991;
console.log(typeof somethingElse);
console.log(somethingElse);

// let, const, var

let age = 30;
age = 31;

const birthday = 1991;
// birthday = 1990;

var job = 'programmer';
job = 'teacher';

somethingOther = 'lalala';
console.log(somethingOther);

// OPERATORS

const now = 2037
const ageDani = now - 1984;
const someoneElse = now - 1986;
console.log(ageDani, someoneElse);

console.log(ageDani * 2, ageDani / 10, 2 ** 3);
// 2 ** 3 = 2 al cubo

const firstName = 'Daniel';
const lastName = 'Bianco';

console.log(firstName + ' ' +lastName);

let x = 10 + 5;
x += 10; // x = x + 10
console.log(x);
x *= 4; // x = x * 4
console.log(x);
x ++; // x = x + 1
console.log(x);
x --; // x = x - 1
console.log(x);

// comparison operators
console.log(ageDani > someoneElse); // < > <= >=
console.log(someoneElse >= 51);

// 17 - Strings and Tempaltes

const firstName = 'Daniel';
const job = 'DevOps';
const birthYear = 1984;
const year = 2037;

const daniel = "I'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!';
console.log(daniel);

const danielNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(danielNew);

console.log(`Just a regular string`);
console.log('Multi Line string \n\ new line \n\ another');
console.log(`Another way
of making 
multiline`);

// 18 - Taking Decisions

const age = 13;
// const isOldEnough = age >= 18;

if(age >= 18){
    console.log('TRUE - You can drive');
} else {
    console.log('FALSE - You can not drive');
    const yearsLeft = 18 - age;
    console.log(`You are too young. You need to wait ${yearsLeft} to drive`);
}

const birthYear = 1984;
let century;

if(birthYear <= 2000){
    century = 20;
} else {
    century = 21;
}

console.log(century);

// 20 - Type Conversion and Coercion

// conversion 
const inputYear = '1991';
console.log(inputYear + 18);
console.log(Number(inputYear) + 18, inputYear);

console.log(Number('Daniel')); // NaN not a number - invalid number

console.log(String(23), 23);

// coersion
console.log('I am ' + 38 + ' years old');
console.log('23' - '3' - 10);
console.log('23' + '3' + 10);

let n = '1' + 1; // String '11'
n = n - 1; // 11 - 1 = 10
console.log(n);

// 21 - Thruthy and flasy

// Flasy = 0, '', undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('daniel'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 0;

if(money){
    console.log("Don't spend it all");
} else {
    console.log('Get a Job');
}

// How to check a variable is defined
let someVar;
if(someVar){
    console.log('someVar is defined');
} else {
    console.log('someVar is UNDEFINED');
}

// 22- Equality Operators

const age = 18;
if (age === 18) console.log('You are an adult - STRICT'); // stict equality operator
(age === '18') ? console.log('You are an adult - STRICT') : console.log('You are an NOT adult - STRICT');
if (age == '18') console.log('You are an adult - LOOSE'); // loose equality operator
(age == 18) ? console.log('You are an adult - LOOSE') : console.log('You are an NOT adult - LOOSE');

const fav = Number(prompt("Give me a number"));
console.log(fav);
console.log(typeof fav);

if (fav === 23){
    console.log('Your fav is 23');
} else if(fav === 7){
    console.log('Your fav is 7');
} else {
    console.log("Neither 23 or 7");
}

if (fav !== 23){
    console.log('Not 23')
}

// 24 Logical operators

const hasDriverLicense = true;
const hasGoodVision = true;

console.log(hasDriverLicense && hasGoodVision);
console.log(!hasDriverLicense && hasGoodVision);
console.log(!hasDriverLicense && !hasGoodVision);
console.log(hasDriverLicense || hasGoodVision);
console.log(!hasDriverLicense || hasGoodVision);
console.log(!hasDriverLicense || !hasGoodVision);

const shouldDrive = hasDriverLicense && hasGoodVision
if(shouldDrive){
    console.log('You can drive');
} else{
    console.log('Take a taxi');
}

const isTired = false;

if(hasDriverLicense && hasGoodVision && !isTired){
    console.log('You can drive');
} else{
    console.log('Take a taxi');
}

// 26- Switch

const day = 'thursday';

switch(day){
    case 'monday':
        console.log('something monday');
        break;
    case 'tuesday':
        console.log('something tuesday');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('something wednesday and thursday');
        console.log('something else')
        break;
    case 'friday':
        console.log('something friday');
        break;  
    case 'saturday':
        console.log('something saturday');
        break;
    case 'sunday':
        console.log('something sunday');
        break;  
    default:
        console.log('Error')
}

// 28- Conditional Operator

const age = 7;

age >= 18 ? console.log('igual o mayor de 18') : console.log('menor');

const drink = age >= 18 ? 'igual o mayor de 18' : 'menor';
console.log(drink);

console.log(`Quiero poner una expresion ${age >= 18 ? 'igual o mayor de 18' : 'menor'}`);

*/