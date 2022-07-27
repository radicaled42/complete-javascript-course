'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Helper function

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

/*
// 248.

const getCountryData = function (country) {
  console.log(country);

  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  //   console.log(this.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //   const renderCountry = function (data, className = '') {
    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
    //   };
  });
};

getCountryData('argentina');
getCountryData('usa');

// 250. Callback

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX Call Country
  //   console.log(country);

  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  //   console.log(this.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders[1];

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      //   console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('argentina');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
    }, 1000);
  }, 1000);
}, 1000);

// 251. Promises 252. Consuming Promises

// const request = fetch('https://restcountries.com/v2/name/argentina');
// console.log(request);

// version 1
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData('argentina');

// version 2 - with arrow functions
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('argentina');

// 253. Chaining promises - 254. Rejected Promises - 255. Throwing errors manually

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);

//         return response.json();
//       } // With response
//       // error => alert(error) // With errors
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       // const neighbour = 'lalaland';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//       // error => alert(error)
//     })
//     // return getJson(`https://restcountries.com/v2/alpha/${neighbour}`, 'Some error 2')
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(error => {
//       console.log(`There was an error: ${error}`);
//       renderError(`Something went wrong ${error.message}. Try again`);
//     }) // All errors can be handle with the catch method
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getJson = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(
    response => {
      // console.log(response);

      if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);

      return response.json();
    } // With response
    // error => alert(error) // With errors
  );
};

const getCountryData = function (country) {
  // Country 1
  getJson(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[1];
      // const neighbour = 'lalaland';

      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJson(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      console.log(`There was an error: ${error}`);
      renderError(`Something went wrong ${error.message}. Try again`);
    }) // All errors can be handle with the catch method
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

getCountryData('argentina');

*/

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });
// getCountryData('jkhkhjkh');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀

const getJson = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(
    response => {
      // console.log(response);

      if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);

      return response.json();
    } // With response
    // error => alert(error) // With errors
  );
};

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       // console.log(response);
//       if (!response.ok)
//         throw new Error(`There was an error (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       // console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(responseCountry => {
//       if (!responseCountry.ok)
//         throw new Error(
//           `There was an error with the country API (${responseCountry.status})`
//         );
//       return responseCountry.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(error => {
//       console.log(`There was an error: ${error.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const whereAmI = function (lat, lng) {
  getJson(
    `https://geocode.xyz/${lat},${lng}?geoit=json`,
    'Error with the GeoLocation API'
  )
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return getJson(
        `https://restcountries.com/v2/name/${data.country}`,
        'Error with the Country API'
      );
    })
    .then(data => renderCountry(data[0]))
    .catch(error => {
      console.log(`There was an error: ${error.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(19.037, 72.873);

// 258. Event Loop

console.log('Test Start'); // 1.
setTimeout(() => console.log('0 Sec Timer'), 0); // 4. Run at the end for being part fo the task queue
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 2. Part of the microtask queue
Promise.resolve('Resolved promise 2').then(res => {
  // 3. Runs for a long time and delay 4.
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
}); //

console.log('Test End'); // 1.

//259. Simple Promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   // The executor functions takes 2 arguments

//   console.log('Lottery Draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You Win');
//     } else {
//       reject(new Error('You Lose'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(result => console.log(result))
//   .catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('I waited for 1 seoncds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 2 seoncds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 second');
  });

Promise.resolve('First Microtask to complete').then(x => console.log(x));
Promise.reject(new Error('Second Microtask to complete')).then(x =>
  console.log(x)
);

//260. Promisifying Geolocation

// console.log('Getting location');
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); // Instead of creation a function with the success and reject, we pass the values
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀


const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

  */
