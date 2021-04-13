'use strict';



let leftImageElement = document.getElementById('left-img');
let middleImageElement = document.getElementById('middle-img');
let rightImageElement = document.getElementById('right-img');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

//arrays we will use in the chart
let namesArr=[];
let votesArr=[];
let shownArr=[];

let reapetedImage=[];

let maxAttempts = 25;
let attemptsCounter = 0;

function Bus(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;
  
  Bus.allBuses.push(this);
  namesArr.push(this.name);
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
  
  while ((reapetedImage.includes(leftImgIndex)||leftImgIndex === middleImgIndex)|| (reapetedImage.includes(rightImgIndex) ||leftImgIndex === rightImgIndex)||  reapetedImage.includes(middleImgIndex)|| middleImgIndex === rightImgIndex ){
 
    leftImgIndex = generateRandomIndex();
    middleImgIndex = generateRandomIndex();
    rightImgIndex=generateRandomIndex();
  }
  //to show the img in the screan 
  leftImageElement.src = Bus.allBuses[leftImgIndex].source;
  middleImageElement.src = Bus.allBuses[middleImgIndex].source;
  rightImageElement.src = Bus.allBuses[rightImgIndex].source;



  reapetedImage=[];
  reapetedImage.push(leftImgIndex)
  reapetedImage.push(middleImgIndex)
  reapetedImage.push(rightImgIndex)

  console.log(reapetedImage);


 

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

    //add to the votesArray & shownArray
    for (let i = 0; i < Bus.allBuses.length; i++) {
      votesArr.push(Bus.allBuses[i].votes);
      shownArr.push(Bus.allBuses[i].shown);
    }
      console.log(votesArr);
      console.log(shownArr)


    // show the chart
    chart();


    function resultBtn(event) {
      let list = document.getElementById('result-list');
      let busResult;
      
      for (let i = 0; i < Bus.allBuses.length; i++) {
        busResult = document.createElement('li');
        list.appendChild(busResult);
        //banana had 3 votes, and was seen 5 times
        busResult.textContent = `${Bus.allBuses[i].name} had ${Bus.allBuses[i].votes} votes, and was seen ${Bus.allBuses[i].shown} times`;

      } button.removeEventListener('click',resultBtn);

    } imgContainerElement.removeEventListener('click', handleUserClick);


  }
}
function chart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  
  let chart= new Chart(ctx,{
    // what type is the chart
   type: 'bar',

  //  the data for showing
   data:{
    //  for the names
      labels: namesArr,
      
      datasets: [
        {
        label: 'Bus votes',
        data: votesArr,
        backgroundColor: [
          '#3a6351',
        ],
  
        borderWidth: 1
      },

      {
        label: 'Bus shown',
        data: shownArr,
        backgroundColor: [
          '#e48257',
        ],
  
        borderWidth: 1
      }
      
    ]
    },
    options: {}
  });
  
}

