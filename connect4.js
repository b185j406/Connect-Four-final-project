let canvas;
let context; 
let t = 0; 
let i = 0; 
let model = { 
    board: "......./......./......./......./......./.......", 
    next: "O",
    winner: false,
    title: "Connect Four",
    resetColor: "white",
    Owins: 0,
    Xwins: 0,

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
    context.fillStyle = "red";
    context.fillText(JSON.stringify(model.title), 90, 55);

    context.font = "10pt Calibri"; 
    context.fillStyle = model.resetColor;
    context.fillText(JSON.stringify("reset"), 355, 388);

    context.font = "10pt Calibri"; 
    context.fillStyle = "black";
    context.fillText(JSON.stringify("reset score"), 0, 12);

    context.font = "12pt Calibri"; 
    context.fillStyle = "black";
    context.fillText(JSON.stringify("O wins:              X wins:    "), 15, 395);

    context.font = "12pt Calibri"; 
    context.fillStyle = "black";
    context.fillText(JSON.stringify(model.Owins), 75, 395);

    context.font = "12pt Calibri"; 
    context.fillStyle = "black";
    context.fillText(JSON.stringify(model.Xwins), 170, 395);

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
    let ix = (i + 39);
    if(j === 0)
    {
      model.Owins = 0;
      model.Xwins = 0;
    }
    else
    {
      for(let l=0; l<40; l++)
      {
        if(model.board.slice(ix, ix+1) === "O" || model.board.slice(ix, ix+1) === "X")
        {
          ix = (i - l + 31);
        }
        l=l+7;
      }
      if(model.board.slice(ix, ix+1) === "O" || model.board.slice(ix, ix+1) === "X")
      {
        console.log("Opps, this collum is already full");
      }
      else
      {
        model.board = model.board.slice(0, ix) + model.next + model.board.slice(ix+1, 47);
        if(model.next === "O") {
          model.next = "X";
        }
        else {
          model.next = "O";
        }
        if(model.winner === true)
        {
          reset();
        }
        isWinnerX(model.board);
        isWinnerO(model.board);
        if(model.winner === true)
        {
          console.log("Click reset button to reset");
          model.resetColor = "red";
        }
      }
    }
})

function isWinnerX(board) {
  let tempBoard = "XXXX";
  let slicedBoard = "";

  //across
  for(let i=0; i<47; i++) {
    for(let j=0; j<4; j++) {
      let insert = (j + i);
      if(tempBoard === board.slice(insert, insert+4))
      {
        console.log("Player 'X' wins!");
        model.title = "Player 'X' Wins!";
        model.Xwins = model.Xwins+1;
        model.winner = true;
      }
    }
    i=i+7;
  }

  //down
  for(let s=0; s<21; s++) {
    for(let i=0; i<7; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        slicedBoard = slicedBoard + board.slice(insert, insert+1);
        j=j+7;
      }
      if(tempBoard === slicedBoard)
      {
        console.log("Player 'X' wins!");
        model.title = "Player 'X' Wins!";
        model.Xwins = model.Xwins+1;
        model.winner = true;
      }
      slicedBoard = "";
    }
    s=s+7;
  }

  //diagonal right
  for(let s=0; s<21; s++) {
    for(let i=0; i<4; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        slicedBoard = slicedBoard + board.slice(insert, insert+1);
        j=j+8;
      }
      if(tempBoard === slicedBoard)
      {
        console.log("Player 'X' wins!");
        model.title = "Player 'X' Wins!";
        model.Xwins = model.Xwins+1;
        model.winner = true;
      }
      slicedBoard = "";
    }
    s=s+7;
  }

  //diagonal left
  for(let s=0; s<21; s++) {
    for(let i=4; i>0; i--) {
      for(let j=0; j<28; j++) {
        let insert = j+i+s+2;
        slicedBoard = slicedBoard + board.slice(insert, insert+1);
        j=j+6;
      }
      if(tempBoard === slicedBoard)
      {
        console.log("Player 'X' wins!");
        model.title = "Player 'X' Wins!";
        model.Xwins = model.Xwins+1;
        model.winner = true;
      }
      slicedBoard = "";
    }
    s=s+7;
  }
}

function isWinnerO(board) {
  let tempBoard = "OOOO";
  let slicedBoard = "";

  //across
  for(let i=0; i<47; i++) {
    for(let j=0; j<4; j++) {
      let insert = (j + i);
      if(tempBoard === board.slice(insert, insert+4))
      {
        console.log("Player 'O' wins!");
        model.title = "Player 'O' Wins!";
        model.Owins = model.Owins+1;
        model.winner = true;
      }
    }
    i=i+7;
  }

  //down
  for(let s=0; s<21; s++) {
    for(let i=0; i<7; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        slicedBoard = slicedBoard + board.slice(insert, insert+1);
        j=j+7;
      }
      if(tempBoard === slicedBoard)
      {
        console.log("Player 'O' wins!");
        model.title = "Player 'O' Wins!";
        model.Owins = model.Owins+1;
        model.winner = true;
      }
      slicedBoard = "";
    }
    s=s+7;
  }

  //diagonal right
  for(let s=0; s<21; s++) {
    for(let i=0; i<4; i++) {
      for(let j=0; j<31; j++) {
        let insert = j+i+s;
        slicedBoard = slicedBoard + board.slice(insert, insert+1);
        j=j+8;
      }
      if(tempBoard === slicedBoard)
      {
        console.log("Player 'O' wins!");
        model.title = "Player 'O' Wins!";
        model.Owins = model.Owins+1;
        model.winner = true;
      }
      slicedBoard = "";
    }
    s=s+7;
  }

  //diagonal left
  for(let s=0; s<21; s++) {
    for(let i=4; i>0; i--) {
      for(let j=0; j<28; j++) {
        let insert = j+i+s+2;
        slicedBoard = slicedBoard + board.slice(insert, insert+1);
        j=j+6;
      }
      if(tempBoard === slicedBoard)
      {
        console.log("Player 'O' wins!");
        model.title = "Player 'O' Wins!";
        model.Owins = model.Owins+1;
        model.winner = true;
      }
      slicedBoard = "";
    }
    s=s+7;
  }
}

function reset() {
  model.board = "......./......./......./......./......./.......";
  model.winner = false;
  model.title = "Connect Four";
  model.resetColor = "white";
}
