window.addEventListener('load', function() {

    let gameLife = true;

    let GAME_WIDTH = 640;
    let GAME_HEIGHT = 360;

    let enemies = [
        {
            x: 80,
            y: 100,
            speedY: 2,
            w: 30,
            h: 30
        },
        {
            x: 200,
            y: 100,
            speedY: 3,
            w: 30,
            h: 30
        },
        {
            x: 320,
            y: 100,
            speedY: 4,
            w: 30,
            h: 30
        },
        {
            x: 440,
            y: 100,
            speedY: 1,
            w: 30,
            h: 30
        },
        {
            x: 520,
            y: 100,
            speedY: 7,
            w: 30,
            h: 30
        }
        
    ];

    let player = {
        x: 10,
        y: 160,
        speedX: 3,
        w: 25,
        h:25,
        isMoving: false  
    }

    let finish = {
        x: 600,
        y: 160,
        w: 20,
        h: 40
    }

    let sprites = {};

    let movePlayer = function() {
        player.isMoving = true;
    }

    let stopPlayer =  function() {
        player.isMoving =false;
    }

    let canvas = document.getElementById("mycanvas");
    let ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", movePlayer);
    canvas.addEventListener("mouseup", stopPlayer);
    canvas.addEventListener('touchstart', movePlayer);
    canvas.addEventListener('touchend', stopPlayer);

    let load = function() {
        sprites.player = new Image();
        sprites.player.src = 'img/player.png';

        sprites.background = new Image();
        sprites.background.src = 'img/background.png';

        sprites.enemy = new Image();
        sprites.enemy.src = 'img/enemy.png';

        sprites.gold = new Image();
        sprites.gold.src = 'img/gold.png';
    }

    let update = function() {

        if (player.isMoving) {
            player.x = player.x + player.speedX;
        }

        let i = 0;
        let n = enemies.length;

        enemies.forEach(function(element, index) {

            if (chekCollision(player, element)) {
                gameLife = false;

                alert('GAME OVER');
                window.location = '';
            }            

            element.y += element.speedY;
             
            if (element.y <= 10) {
                element.y = 10;
                element.speedY *= -1;                
            }
            else if (element.y >= GAME_HEIGHT - 50) {
                element.y = GAME_HEIGHT - 50;
                element.speedY *= -1;
            }
        });

        if (chekCollision(player, finish)) {

            gameLife = false;

            alert('WIN');
        }
    };

    let draw = function() {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.drawImage(sprites.background, 0,0);
        
        
        ctx.drawImage(sprites.player, player.x, player.y);

        enemies.forEach(function(element, index) {
        ctx.drawImage(sprites.enemy, element.x, element.y);
        });
      
        ctx.drawImage(sprites.gold, finish.x, finish.y);
    };

    let step = function() {
        update();
        draw();

            if (gameLife) {
                window.requestAnimationFrame(step);
            }      
    };
    let  chekCollision = function(rect1, rect2) {
        let closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.abs(rect1.w, rect2.w);
        let closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.abs(rect1.h, rect2.h);
        return closeOnHeight && closeOnWidth;        
    }

    load();
    step();
})
     