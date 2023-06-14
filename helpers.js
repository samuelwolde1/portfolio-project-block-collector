// HELPER FUNCTIONS

// DRAW START SCREEN
function startScreen() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    ctx.font = "48px Calibri";
    ctx.fillStyle = "white";
    ctx.fillText("Press SPACE to Begin!", 100, 300);
  }
  
  // GAME LOGIC
  function gameLogic() {
    movePlayer();
    moveBlocks();
    moveRedBlocks();
    checkCollision();
    updateRedBlocks();
    checkGameOver();
  }
  
  // MOVE PLAYER
  function movePlayer() {
    if (keyPressed["ArrowLeft"]) {
      player.x += -player.speed;
    } else if (keyPressed["ArrowRight"]) {
      player.x += player.speed;
    }
  
    if (keyPressed["ArrowUp"]) {
      player.y += -player.speed;
    } else if (keyPressed["ArrowDown"]) {
      player.y += player.speed;
    }
  }
  
  // CHECK GAME OVER
  function checkGameOver() {
    // Game over if player leaves canvas
    if (
      player.x < 0 ||
      player.x + player.w > cnv.width ||
      player.y < 0 ||
      player.y + player.h > cnv.height
    ) {
      state = "gameover";
    }
  }
  
  // DRAW GAME SCREEN
  function gameScreen() {
    // Background
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
  // Draw Blocks
  for (let i = 0; i < blocks.length; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
  }

  // Draw Red Blocks
  for (let i = 0; i < redBlocks.length; i++) {
    ctx.fillStyle = redBlocks[i].color;
    ctx.fillRect(redBlocks[i].x, redBlocks[i].y, redBlocks[i].w, redBlocks[i].h);
  }
}
  
  // GAME OVER SCREEN
  function gameOver() {
    // Background
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Game Over Text
    ctx.font = "48px Calibri";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER", 100, 300);
  
    ctx.font = "24px Calibri";
    ctx.fillText("Press SPACE to return to Start Screen.", 100, 350);
  }
  
  // RESET VARIABLES
  function reset() {
    state = "start";
    player = {
      x: 388,
      y: 288,
      w: 25,
      h: 25,
      color: "blue",
      speed: 5,
    };
    blocks = [];
    redBlocks = [];
    timer = 0;
    generateBlocks();
  }

  function checkCollision() {
    // Check for collision with red blocks
    for (let i = 0; i < redBlocks.length; i++) {
      if (rectCollide(player, redBlocks[i])) {
        state = "gameover";
      }
    }
    for (let i = 0; i < blocks.length; i++) {
      if (rectCollide(player, blocks[i])) {
        blocks.splice(i, 1);
        if (blocks.length === 0){
          state = "gamewon"
        }
      }
    }
  }

  // UPDATE RED BLOCKS
function updateRedBlocks() {
  timer++;
  if (timer === 60) {
    timer = 0;
    let redBlock = {
      x: randomInt(0, cnv.width),
      y: randomInt(0, cnv.height),
      w: 25,
      h: 25,
      color: "red",
      speedX: 2,
      speedY: 2,
    };
    redBlocks.push(redBlock);
  }
}

function generateBlocks() {
    for (let i = 0; i < 50; i++) {
      let block = {
        x: Math.random() * cnv.width,
        y: Math.random() * cnv.height,
        w: 20,
        h: 20,
        color: "black",
        speedX: 4,
        speedY: 4,
      };
      blocks.push(block);
    }
  }

  function gameWon() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = "#008000";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Game Won Text
    ctx.font = "48px Calibri";
    ctx.fillStyle = "white";
    ctx.fillText("YOU WON", 100, 300);
  
    ctx.font = "24px Calibri";
    ctx.fillText("Press SPACE to return to Start Screen.", 100, 350);
  }