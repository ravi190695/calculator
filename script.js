let pressCount = 0;
let player1 = [];
let player2 = [];
let winningSequence = [];
let isGameOver = false;
const o = document.createElement("img");
o.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/heavy-check-mark_2714.png";
o.alt = "O";
o.classList.add("sym");
const x = document.createElement("img");
x.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/cross-mark_274c.png";
x.alt = "X";
x.classList.add("sym");

function press(id){
    const ele = document.getElementById(id);
    if(ele.innerHTML === ""){
        pressCount++;
        if(pressCount % 2 != 0){
            ele.appendChild(x.cloneNode(true));
            player1.push(parseInt(id));
            isWin(player1, "Player1");
        }
        else{
            ele.appendChild(o.cloneNode(true));
            player2.push(parseInt(id));
            isWin(player2, "Player2");
        }
        if(pressCount >= 9 && !isGameOver){
            setTimeout(() => {
                alert("Draw!");
                clearBoard();
            },
            10);
        }
    }
}

function clearBoard(){
    isGameOver = false;
    pressCount = 0;
    player1 = [];
    player2 = [];
    winningSequence = [];
    for(let id = 1; id <= 9; id++){
        document.getElementById(id).innerHTML = "";
        document.getElementById(id).classList.remove("winningSequence");
    }
}

function isWin(playerArray, player){
    const possibleSequence = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    let win = false;
    possibleSequence.forEach((arr) => {
        let assumeWin = true;
        arr.forEach((id) => {
            if(!playerArray.includes(id)){
                assumeWin = false;
            }
        });
        if(assumeWin === true){
            arr.forEach((id) => {
                winningSequence.push(id);
            });
            win = true;
        }
    });
    if(win){
        isGameOver = true;
        winningSequence.forEach((id) => {
            document.getElementById(id).classList.add("winningSequence");
        });
        setTimeout(() => {
            alertWin(player);
            clearBoard();
        },
        10);
    }
}

function alertWin(player){
    alert("Congratulations! " + player + " wins");
}