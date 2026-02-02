let score = 0;
let timeLeft = 0;
let gameActive = false;
let gameTimer;
let countdownTimer;

// script.js の一番上をこれに変えてみて！
const hitSound = new Audio('sounds/hit.mp3');

// iPad用のおまじない：最初のクリックで音を「解禁」する
window.addEventListener('touchstart', function() {
    hitSound.play();
    hitSound.pause();
    hitSound.currentTime = 0;
}, { once: true });

function startGame() {
    const holeCount = document.getElementById('hole-count').value;
    timeLeft = document.getElementById('game-time').value;
    
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    
    const container = document.getElementById('container');
    container.innerHTML = '';
    for (let i = 0; i < holeCount; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');
        container.appendChild(hole);
    }

    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    gameActive = true;

    gameTimer = setInterval(() => {
        if (gameActive) showDino();
    }, 1500);

    countdownTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function showDino() {
    const holes = document.querySelectorAll('.hole');
    const hole = holes[Math.floor(Math.random() * holes.length)];
    
    if (hole.querySelector('.dino')) return;

    const dino = document.createElement('div');
    dino.classList.add('dino');
    hole.appendChild(dino);

    setTimeout(() => dino.classList.add('up'), 10);

    // ★【修正】タップした時の処理
    const hit = () => {
        // 音を鳴らす魔法
        hitSound.currentTime = 0; // 連続で叩いても最初から再生されるように
        hitSound.play(); 

        score += 10;
        document.getElementById('score').innerText = score;
        dino.remove();
    };

    dino.addEventListener('touchstart', (e) => { e.preventDefault(); hit(); });
    dino.addEventListener('mousedown', hit);

    setTimeout(() => {
        if (dino.parentNode) {
            dino.classList.remove('up');
            setTimeout(() => dino.remove(), 300);
        }
    }, 5000); 
}

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearInterval(countdownTimer);
    alert("タイムアップ！スコアは " + score + "点でした！");
}