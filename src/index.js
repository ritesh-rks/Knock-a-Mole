const startGame = document.getElementById('startGame');
const pauseGame = document.getElementById('pauseGame');
const displayAll = document.querySelector('.displayAll');
const timeLefth3 = document.getElementById('timeLeft');
const quitGame = document.getElementById('quitGame')
const gridContainer = document.getElementById('gridContainer');
let grid = document.getElementsByClassName('grid')[0];
let squares = document.querySelectorAll('.square');
let yourScore =  document.getElementById('yourScore');
let highestScore = document.getElementById('highestScore');
let gameMusic = new Audio('../Assests/Assets_gameMusic.mp3');
let hitMusic = new Audio('../Assests/Assets_hitMusic.mp3');


// variable

let yScore = 0;
let hScore = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

window.addEventListener('load', () => {
    // Retrieve highest score from local storage
    hScore = localStorage.getItem('highestScore') || 0;
    highestScore.innerHTML = `Highest Score: ${hScore}`;
  });



// randomly place mole
const randomMole = () => {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random()*squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

// countdoen

const countDown =() =>{
    timeLeft--;
    timeLefth3.innerHTML = `Time Left: ${timeLeft}`;

    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';
        gameMusic.pause();
        gameMusic.currentTime = 0;
        timeLefth3.style.display = 'none';
        pauseGame.style.display = 'none';
        startGame.style.display = 'inline-block';
        startGame.innerHTML = 'Start New Game'
                  
    }
}

//  update high score in local storage
const updateHighestScore = (score) => {
    if (score > hScore) {
      hScore = score;
      highestScore.innerHTML = `Highest Score: ${hScore}`;
      localStorage.setItem('highestScore', hScore); // Save highest score in local storage
    }
  };


//   start game button

function startNewGameButton(){

    yScore = 0;
    timeLeft = 60;
    timeLefth3.style.display = 'block';
    pauseGame.style.display = 'block';
    yourScore.innerHTML = 'Your Score: 0';
    timeLefth3.innerHTML = 'Time Left: 60';
    grid.style.display = 'grid';
    displayAll.style.display = 'block';
    startGame.style.display = 'none';
    gameMusic.play();

    if(window.innerWidth < 500)
    {
        window.scrollTo(0, document.body.scrollHeight);
    }
    // callback function
    // setInterval call function at regular interval
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
}

// pause resume

function pauseResumeGame(){
    if(pauseGame.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGame.textContent = 'Resume';
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseGame.textContent = 'Pause';
    }
}

// quit
const quitGameButton = () => {
    location.reload();
}

// hitting postion
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(timerId !== null){
            if(square.id === hitPosition){
                hitMusic.play();
                setTimeout(() => {hitMusic.pause()}, 1000);
                yScore++;
                yourScore.innerHTML = `Your Score: ${yScore}`;
                hitPosition = null;
                updateHighestScore(yScore);
            }
        }
    })
})



startGame.addEventListener('click', startNewGameButton);
pauseGame.addEventListener('click', pauseResumeGame);
quitGame.addEventListener('click', quitGameButton);

