let canvas;
let context; 
let t = 0; 
let i = 0; 
let model = { 
    board: "......./......./......./......./......./.......", 
    next: "O",
} 

function tick() {       
    window.requestAnimationFrame(splat); 
} 

function splat(n) {
    let d = n-t; 
    t = n;
    context.clearRect(0,0, canvas.width,canvas.height); 

    for(let i=0; i<8; i++) {
      context.beginPath(); 
      context.moveTo(20, 20 + i * 50); 
      context.lineTo(370, 20 + i * 50);   
      context.strokeStyle = 'black'; 
      context.lineWidth = 5; 
      context.stroke(); 
        
      context.beginPath(); 
      context.moveTo(20 + i * 50, 70); 
      context.lineTo(20 + i * 50, 370);   
      context.strokeStyle = 'black'; 
      context.lineWidth = 5; 
      context.stroke(); 
    }

    context.font = "20pt Calibri"; 
    context.fillStyle = "blue";

    for(let i=0; i <= 6; i++) {
      for(let j=0; j <= 5; j++) {
        let me = model.board.charAt(i + j * 8);
        if(me !== '.') {
          context.fillText(me, 38 + i * 50, 105 + j * 50);
        }
      }
    }

    context.font = "25pt Calibri"; 
    context.fillStyle = "black";
    context.fillText(JSON.stringify('Connect Four'), 90, 55);
    tick(); 
} 

document.addEventListener("DOMContentLoaded",() => { 
    canvas = document.querySelector("#myCanvas"); 
    context = canvas.getContext("2d"); 
    splat(); 
})

function roundMe(x) {return Math.ceil((x-20)/50)}

document.addEventListener("click",e => { 
    const [i, j] = [e.x, e.y].map(roundMe);
    const ix = (i + j * 8)-17;
    console.log(i, j, ix);
    model.board = model.board.slice(0, ix) + model.next + model.board.slice(ix+1, 47);
    if(model.next === "O") {
      model.next = "X";
    }
    else {
      model.next = "O";
    }
    isWinnerX(model.board);
    isWinnerO(model.board);
})

function isWinnerX(board) {
  let tempBoard = "......./......./......./......./......./.......";

  //across
  for(let i=0; i<47; i++) {
    for(let j=0; j<4; j++) {
      let insert = (j + i);
      tempBoard = tempBoard.slice(0, insert) + "XXXX" + tempBoard.slice(insert+4, 47);
      if(tempBoard === board)
      {
        console.log("Player 'X' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    i=i+7;
  }

  //down
  for(let s=0; s<21; s++) {
    for(let i=0; i<7; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        tempBoard = tempBoard.slice(0, insert) + "X" + tempBoard.slice(insert+1, 47);
        j=j+7;
      }
      if(tempBoard === board)
      {
        console.log("Player 'X' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    s=s+7;
  }

  //diagonal right
  for(let s=0; s<21; s++) {
    for(let i=0; i<4; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        tempBoard = tempBoard.slice(0, insert) + "X" + tempBoard.slice(insert+1, 47);
        j=j+8;
      }
      if(tempBoard === board)
      {
        console.log("Player 'X' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    s=s+7;
  }

  //diagonal left
  for(let s=0; s<21; s++) {
    for(let i=4; i>0; i--) {
      for(let j=0; j<28; j++) {
        let insert = j+i+s+2;
        tempBoard = tempBoard.slice(0, insert) + "X" + tempBoard.slice(insert+1, 47);
        j=j+6;
      }
      if(tempBoard === board)
      {
        console.log("Player 'X' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    s=s+7;
  }
}

function isWinnerO(board) {
  let tempBoard = "......./......./......./......./......./.......";

  //across
  for(let i=0; i<47; i++) {
    for(let j=0; j<4; j++) {
      let insert = (j + i);
      tempBoard = tempBoard.slice(0, insert) + "OOOO" + tempBoard.slice(insert+4, 47);
      if(tempBoard === board)
      {
        console.log("Player 'O' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    i=i+7;
  }

  //down
  for(let s=0; s<21; s++) {
    for(let i=0; i<7; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        tempBoard = tempBoard.slice(0, insert) + "O" + tempBoard.slice(insert+1, 47);
        j=j+7;
      }
      if(tempBoard === board)
      {
        console.log("Player 'O' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    s=s+7;
  }

  //diagonal right
  for(let s=0; s<21; s++) {
    for(let i=0; i<4; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        tempBoard = tempBoard.slice(0, insert) + "O" + tempBoard.slice(insert+1, 47);
        j=j+8;
      }
      if(tempBoard === board)
      {
        console.log("Player 'O' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    s=s+7;
  }

  //diagonal left
  for(let s=0; s<21; s++) {
    for(let i=4; i>0; i--) {
      for(let j=0; j<28; j++) {
        let insert = j+i+s+2;
        tempBoard = tempBoard.slice(0, insert) + "O" + tempBoard.slice(insert+1, 47);
        j=j+6;
      }
      if(tempBoard === board)
      {
        console.log("Player 'O' wins!");
         reset();
      }
      tempBoard = "......./......./......./......./......./.......";
    }
    s=s+7;
  }
}

function reset() {
  model.board = "......./......./......./......./......./.......";
}
