const mainEl = document.getElementById('main');
const timerEl = document.querySelector('.counter.timer');
const buttonEl = document.getElementById('submit');
const numMinEl = document.getElementById('number');
const counterMin = document.getElementById('min');
const counterPom = document.getElementById('pomodoro');
let initial_min = 0;
let sec = 0;
let min = initial_min;
let run = false;
counterMin.style.animationPlayState = 'paused';
counterPom.style.animationPlayState = 'paused';

buttonEl.addEventListener("click", ()=>{
    if(buttonEl.className == 'button start'){
        restart();
        buttonEl.className = 'button run';
        counterMin.style.animationPlayState = 'running';
        counterPom.style.animationPlayState = 'running';
        buttonEl.innerHTML = 'Stop';
        run = true;
    }
    else if(buttonEl.className == 'button stop'){
        buttonEl.className = 'button run';
        counterMin.style.animationPlayState = 'running';
        counterPom.style.animationPlayState = 'running';
        buttonEl.innerHTML = 'Stop';
        run = true;
    }
    else {
        buttonEl.className = 'button stop';
        counterMin.style.animationPlayState = 'paused';
        counterPom.style.animationPlayState = 'paused';
        buttonEl.innerHTML = 'Run';
        run = false;
    }
})

mainEl.addEventListener("click", ()=>{
    restart();
})

setInterval(()=>{
    if (run){
        counterPom.style.animation = 'girar ' + initial_min*60 + 's linear';
        counterMin.className = 'counter min';
        counterPom.className = 'counter pomodoro';
        sec = sec - 1;
        if (sec < 0){
            min = min -1;
            sec = 59;
        }
        if(min<0){
            document.getElementById('alarma').play();
            restart();
        }
        timerEl.innerHTML = min + '\' '  + sec + '\'\'';
    }
    
}, 1000)

setInterval(()=>{
    document.title = 'Pomodoro '+ numMinEl.value + '\' '  + sec + '\'\'';
    if(buttonEl.className == 'button start'){
	if(numMinEl.value == ''){
	    numMinEl.value = 0;
	    initial_min = 0;
	    timerEl.innerHTML = initial_min + '\' '  + sec + '\'\'';
	}
	else
	    initial_min = numMinEl.value;
	    timerEl.innerHTML = initial_min + '\' '  + sec + '\'\'';
        counterMin.className = 'counter min';
        counterPom.className = 'counter pomodoro';
        numMinEl.value = initial_min;
    }
    else
	numMinEl.value = min;

}, 10)

restart = ()=> {
    numMinEl.value = 25;
    run = false;
    sec = 0;
    min = initial_min;
    counterMin.className = 'counter';
    counterPom.className = 'counter';
    counterMin.style.animationPlayState = 'paused';
    counterPom.style.animation = '';
    counterPom.style.animationPlayState = 'paused';
    buttonEl.className = 'button start';
    timerEl.innerHTML = min + '\' '  + sec + '\'\'';
    buttonEl.innerHTML = 'Start';
}