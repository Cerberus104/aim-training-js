const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);

    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function (){
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
}
if (isMobile.any()) {
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
}

const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const repeat = document.querySelector('#repeat')

let time = 0
let score = 0
const colors = ['red', 'blue', 'rgb(204, 255, 0)','rgb(0, 255, 242)','rgb(225, 0, 255)','rgb(13, 255, 0)','rgb(255, 255, 255)','rgb(255, 132, 0)','rgb(0, 72, 255)','rgb(6,160,255)','rgb(255,173,0)','rgb(234,255,0)','rgb(0,255,66)','rgb(0,131,255)']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})
timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn'))
    {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomeCircle()
    }
})
function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomeCircle()
    setTimeout(time)
}
function decreaseTime() {
    if (time === 0) {
        finishGame()
    }
    else {
        let current = --time 
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}
function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}
function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
    repeat.innerHTML = `<h1 class="repeat-title">Повторить</h1>`
}
function createRandomeCircle() {
    const circle = document.createElement('div')
    const size = getRandomeNumber(15, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomeNumber(0, width - size)
    const y = getRandomeNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width =`${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = setColor(circle)
    board.append(circle)
    
}
function setColor (e) {
    const color = getRandomColor()
    e.style.background = color


}
function getRandomColor (e) {
    const index = Math.floor(Math.random () * colors.length)
    return colors[index]
}

function getRandomeNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min)
} 
repeat.addEventListener('click', (event) => {
    event.preventDefault()

    
})