<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Navroop, Will You Be My Valentine? 💝</title>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

<!-- Tailwind CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Confetti CDN -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

<style>
:root {
    --background-color-1: #ffafbd;
    --background-color-2: #ffc3a0;
    --button-color: #ff6b6b;
    --button-hover: #ff8787;
    --text-color: #ff4757;
    --float-duration: 15s;
    --float-distance: 50px;
    --bounce-speed: 0.5s;
    --heart-explosion-size: 1.5;
}

body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, var(--background-color-1), var(--background-color-2));
    font-family: Arial, sans-serif;
    overflow-x: hidden;
    position: relative;
}

.container {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 600px;
    margin: 20px;
    overflow: visible !important;
    position: relative;
    z-index: 10;
}

.floating-elements { position: fixed; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.heart, .bear { position: absolute; font-size: 2rem; animation: float var(--float-duration) linear infinite; }

@keyframes float { 0%{transform:translateY(100vh) translateX(0);}100%{transform:translateY(-100px) translateX(var(--float-distance));} }

.cute-btn {
    background: var(--button-color); border: none; padding: 10px 20px; margin: 10px; border-radius: 20px;
    color: white; font-size: 1.1rem; cursor: pointer; transition: transform 0.3s, background 0.3s; position: relative; z-index: 10;
}
.cute-btn:hover { transform: scale(1.1); background: var(--button-hover); }

.hidden { display: none; }
.secret-answer { position: fixed; bottom: 20px; right: 20px; opacity:0.2; transform:scale(0.7); z-index: 20; animation: subtle-hint 2s infinite alternate; animation-delay: 5s; }
.secret-answer .cute-btn { font-size: 0.8rem; padding: 5px 10px; }
.secret-answer:hover { opacity:1; animation:none; }

.love-meter { position: relative; width:100%; margin:20px auto; padding:10px 0; }
.love-meter p { font-size:1.2em; margin:15px 0; color: var(--text-color); display:flex; flex-direction:column; align-items:center; gap:8px; }
.slider { width:100%; height:25px; background:linear-gradient(to right,#ff6b6b,#ff8787,#ffb8b8); border-radius:15px; outline:none; }

#extraLove { color:#ff6b6b; font-weight:bold; animation:bounce 0.5s infinite alternate; margin-top:5px; }
#extraLove.super-love { background: rgba(255,107,107,0.2); font-size:1.2em; padding:8px 15px; }
#loveValue { font-weight:bold; color:#ff4757; font-size:1.3em; }
.love-value-container { display:inline-flex; align-items:center; gap:5px; }

@keyframes bounce { from{transform:scale(1);} to{transform:scale(1.2);} }
@keyframes subtle-hint {0%{opacity:0.2;}100%{opacity:0.3;}}

.celebration-text { font-size:3em; color:#ff4757; font-weight:bold; margin:30px 0; animation:bounce var(--bounce-speed) infinite alternate; text-shadow:2px 2px 4px rgba(255,71,87,0.3); }

.music-controls { position: fixed; top: 20px; right: 20px; z-index:1000; }
.music-btn { background: var(--button-color); color:white; border:none; padding:10px 20px; border-radius:20px; cursor:pointer; font-size:16px; box-shadow:0 2px 5px rgba(0,0,0,0.2); }
.music-btn:hover { transform:scale(1.05); background: var(--button-hover); }

h1 { font-family: 'Dancing Script', cursive; color: #ff6b6b; margin-bottom:2rem; }
h2 { font-family: 'Dancing Script', cursive; color: #ff8787; }
</style>
</head>
<body>

<div class="floating-elements" id="floating"></div>

<div class="container">
    <h1 id="valentineTitle">Navroop, will you be my Valentine? 💖</h1>

    <div class="music-controls">
        <button id="musicToggle" class="music-btn">🎵 Play/Pause Music</button>
        <audio id="bgMusic" loop>
            <source id="musicSource" src="./music/love.mp3" type="audio/mpeg">
        </audio>
    </div>

    <div class="question-section" id="question1">
        <h2 id="question1Text">Will you be mine? 🥹</h2>
        <button class="cute-btn" id="yesBtn1">Yes 💖</button>
        <button class="cute-btn" id="noBtn1">No 😢</button>
        <div class="secret-answer"><button class="cute-btn special" id="secretAnswerBtn">Secret 💌</button></div>
    </div>

    <div class="question-section hidden" id="question2">
        <h2 id="question2Text">How much do you love me? 💞</h2>
        <input type="range" min="0" max="10000" value="100" class="slider" id="loveMeter">
        <p><span class="love-value-container"><span id="loveValue">100</span>%</span> <span id="extraLove" class="hidden"></span></p>
        <button class="cute-btn" id="nextBtn">Next ➡️</button>
    </div>

    <div class="question-section hidden" id="question3">
        <h2 id="question3Text">Will you be my Valentine forever? 💘</h2>
        <button class="cute-btn final-yes" id="yesBtn3">Yes 💞</button>
        <button class="cute-btn" id="noBtn3">No 😭</button>
    </div>

    <div class="celebration hidden" id="celebration">
        <h2 id="celebrationTitle">Yayyy!! 🥰</h2>
        <p class="celebration-text" id="celebrationMessage">Navroop ❤️ Kunwarjot</p>
        <p class="celebration-text" id="celebrationEmojis">🎉💖🥹🌹</p>
    </div>
</div>

<script>
// Configuration
const VALENTINE_CONFIG = {
    valentineName: "Navroop",
    music: { enabled:true, autoplay:true, musicUrl:"./music/love.mp3", startText:"🎵 Play Music", stopText:"⏸️ Pause Music", volume:0.5 },
    floatingEmojis: { hearts:["💖","💗","💕"], bears:["🐻"] },
    loveMessages: { normal:"❤️", high:"💝", extreme:"💘" },
    celebration: { title:"Yayyy!! 🥰", message:"Navroop ❤️ Kunwarjot", emojis:"🎉💖🥹🌹" }
};

// Floating hearts
const floating = document.getElementById('floating');
setInterval(()=>{
    const heart = document.createElement('div');
    heart.className='heart';
    heart.style.left = Math.random()*window.innerWidth+'px';
    heart.style.fontSize=(20+Math.random()*20)+'px';
    heart.textContent = VALENTINE_CONFIG.floatingEmojis.hearts[Math.floor(Math.random()*VALENTINE_CONFIG.floatingEmojis.hearts.length)];
    floating.appendChild(heart);
    setTimeout(()=>heart.remove(),8000);
},500);

// Music toggle
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
music.volume = VALENTINE_CONFIG.music.volume;
if(VALENTINE_CONFIG.music.autoplay){music.play().catch(()=>{});}
musicToggle.addEventListener('click', ()=>{
    if(music.paused){music.play(); musicToggle.textContent=VALENTINE_CONFIG.music.stopText;}
    else{music.pause(); musicToggle.textContent=VALENTINE_CONFIG.music.startText;}
});

// Button elements
const yesBtn1=document.getElementById('yesBtn1');
const noBtn1=document.getElementById('noBtn1');
const yesBtn3=document.getElementById('yesBtn3');
const noBtn3=document.getElementById('noBtn3');
const question1=document.getElementById('question1');
const question2=document.getElementById('question2');
const question3=document.getElementById('question3');
const celebration=document.getElementById('celebration');
const loveMeter=document.getElementById('loveMeter');
const loveValue=document.getElementById('loveValue');
const extraLove=document.getElementById('extraLove');
const nextBtn=document.getElementById('nextBtn');

// NO button move
function moveButton(btn){
    const yesBtn = (btn.id.includes('1')?yesBtn1:yesBtn3);
    const rectYes = yesBtn.getBoundingClientRect();
    let x,y;
    do{
        x=Math.random()*(window.innerWidth-100);
        y=Math.random()*(window.innerHeight-50);
    }while(x>rectYes.left-50&&x<rectYes.right+50&&y>rectYes.top-50&&y<rectYes.bottom+50);
    btn.style.position='fixed';
    btn.style.left=x+'px';
    btn.style.top=y+'px';
}

// YES button actions
yesBtn1.addEventListener('click',()=>{question1.classList.add('hidden');question2.classList.remove('hidden');});
yesBtn3.addEventListener('click',()=>{
    question3.classList.add('hidden');
    celebration.classList.remove('hidden');
    confetti({particleCount:250,spread:90,origin:{y:0.6}});
});

// NO buttons move
noBtn1.addEventListener('mouseover',()=>moveButton(noBtn1));
noBtn3.addEventListener('mouseover',()=>moveButton(noBtn3));

// Love meter
loveMeter.addEventListener('input',()=>{
    const value=parseInt(loveMeter.value);
    loveValue.textContent=value;
    if(value>100){
        extraLove.classList.remove('hidden');
        if(value>=5000){extraLove.classList.add('super-love');extraLove.textContent=VALENTINE_CONFIG.loveMessages.extreme;}
        else if(value>1000){extraLove.classList.remove('super-love');extraLove.textContent=VALENTINE_CONFIG.loveMessages.high;}
        else{extraLove.classList.remove('super-love');extraLove.textContent=VALENTINE_CONFIG.loveMessages.normal;}
    }else{extraLove.classList.add('hidden');extraLove.classList.remove('super-love');}
});

// Next button
nextBtn.addEventListener('click',()=>{question2.classList.add('hidden');question3.classList.remove('hidden');});
</script>

</body>
</html>
