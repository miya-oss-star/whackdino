let score = 0;
let timeLeft = 0;
let gameActive = false;
let gameTimer;
let countdownTimer;

function startGame() {
    const holeCount = document.getElementById('hole-count').value;
    timeLeft = document.getElementById('game-time').value;
    
    // 画面の切り替え
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    
    // 穴を動的に作成
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

    // 恐竜を出すループ
    gameTimer = setInterval(() => {
        if (gameActive) showDino();
    }, 1500);

    // 制限時間のカウントダウン
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

    // 出現
    setTimeout(() => dino.classList.add('up'), 10);

    // タップ処理
    const hit = () => {
        score += 10;
        document.getElementById('score').innerText = score;
        dino.remove();
    };
    dino.addEventListener('touchstart', (e) => { e.preventDefault(); hit(); });
    dino.addEventListener('mousedown', hit);

    // 【リクエスト】5秒間（5000ms）そのまま、そのあとひっこむ
    setTimeout(() => {
        if (dino.parentNode) {
            dino.classList.remove('up');
            setTimeout(() => dino.remove(), 300); // ひっこむアニメーション後に削除
        }
    }, 5000); 
}

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearInterval(countdownTimer);
    alert("タイムアップ！スコアは " + score + "点でした！");
}