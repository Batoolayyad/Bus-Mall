'use strict';

/*Instructions
As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

Create a constructor function that creates an object associated with each product, and has the following properties:
Name of the product
File path of image
Times the image has been shown
Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

For each of the three images, increment its property of times it has been shown by one.

Attach an event listener to the section of the HTML page where the images are going to be displayed.

Once the users ‘clicks’ a product, generate three new products for the user to pick from.
As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.
In the constructor function define a property to hold the number of times a product has been clicked.

After every selection by the viewer, update the newly added property to reflect if it was clicked.

As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
By default, the user should be presented with 25 rounds of voting before ending the session.
Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.
As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.

After voting rounds have been completed, remove the event listeners on the product.

Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.

NOTE: Displayed product names should match the file name for the product. Example: the product represented with dog-duck.jpg should be displayed to the user as exactly “dog-duck” when the results are shown.*/

let leftImageElement = document.getElementById('left-img');
let middleImageElement = document.getElementById('middle-img');
let rightImageElement = document.getElementById('right-img');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

let maxAttempts = 25;
let attemptsCounter = 0;

function Bus(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;

  Bus.allBuses.push(this);
}

Bus.allBuses = [];

new Bus('bag', 'img/bag.jpg');//0
new Bus('banana', 'img/banana.jpg');//1
new Bus('bathroom', 'img/bathroom.jpg');//2
new Bus('boots', 'img/boots.jpg');//3
new Bus('breakfast', 'img/breakfast.jpg');//4
new Bus('bubblegum', 'img/bubblegum.jpg');//5
new Bus('chair', 'img/chair.jpg');//6
new Bus('cthulhu', 'img/cthulhu.jpg');//7
new Bus('dog-duck', 'img/dog-duck.jpg');//8
new Bus('dragon', 'img/dragon.jpg');//9
new Bus('pen', 'img/pen.jpg');//10
new Bus('pet-sweep', 'img/pet-sweep.jpg');//11
new Bus('scissors', 'img/scissors.jpg');//12
new Bus('shark', 'img/shark.jpg');//13
new Bus('sweep', 'img/sweep.png');//14
new Bus('tauntaun', 'img/tauntaun.jpg');//15
new Bus('unicorn', 'img/unicorn.jpg');//16
new Bus('usb', 'img/usb.gif');//17
new Bus('water-can', 'img/water-can.jpg');//18
new Bus('wine-glass', 'img/wine-glass.jpg');//19


console.log(Bus.allBuses)


function generateRandomIndex() {
  // 0 => 19 
  return Math.floor(Math.random() * Bus.allBuses.length);
}

console.log(generateRandomIndex());


// to choose random number for the index
function renderImg() {

  leftImgIndex = generateRandomIndex();
  middleImgIndex = generateRandomIndex();
  rightImgIndex = generateRandomIndex();

  //to count how many times each img was shown
  Bus.allBuses[leftImgIndex].shown++;
  Bus.allBuses[rightImgIndex].shown++;
  Bus.allBuses[middleImgIndex].shown++;
  //to prevent the same img shown
  while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex) {

    leftImgIndex = generateRandomIndex();
    middleImgIndex = generateRandomIndex();
  }

  //to show the img in the screan 
  leftImageElement.src = Bus.allBuses[leftImgIndex].source;
  middleImageElement.src = Bus.allBuses[middleImgIndex].source;
  rightImageElement.src = Bus.allBuses[rightImgIndex].source;

}

renderImg();


//to choose the imgs by the click
let imgContainerElement = document.getElementById('img-div');

imgContainerElement.addEventListener('click', handleUserClick);

function handleUserClick(event) {
  console.log(event.target.id);


  attemptsCounter++;
  console.log(attemptsCounter);

  if (attemptsCounter <= maxAttempts) {

    if (event.target.id === 'left-img') {
      Bus.allBuses[leftImgIndex].votes++;
    } else if (event.target.id === 'right-img') {
      Bus.allBuses[rightImgIndex].votes++;
    } else if (event.target.id === 'middle-img') {
      Bus.allBuses[middleImgIndex].votes++
    } else {
      alert('please click on the images');
      attemptsCounter--;
    }

    console.log(Bus.allBuses);
    renderImg();
  } else {
    let button = document.getElementById('result-btn');
    button.addEventListener('click', resultBtn);
   //to show the button after the voting ends
    button.hidden=false;

    function resultBtn(event) {
      let list = document.getElementById('result-list');
      let busResult;
      console.log(`rrom btn ${event.target.id}`)
      for (let i = 0; i < Bus.allBuses.length; i++) {
        busResult = document.createElement('li');
        list.appendChild(busResult);
        //banana had 3 votes, and was seen 5 times
        busResult.textContent = `${Bus.allBuses[i].name} had ${Bus.allBuses[i].votes} votes, and was seen ${Bus.allBuses[i].shown} times`;

      } button.removeEventListener('click',resultBtn);

    } imgContainerElement.removeEventListener('click', handleUserClick);


  }
}