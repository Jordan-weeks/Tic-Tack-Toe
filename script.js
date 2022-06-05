
    
window.addEventListener("DOMContentLoaded", () =>{
    
    const tiles = Array.from(document.querySelectorAll(".tile"))
    

    const startButton = document.querySelector(".start")
startButton.addEventListener ("click", () => gameStart())



let board = ["", "", "", "", "", "", "", "", "", ]

let gameActive
let gameBoard = document.querySelector(".game-container")
let playerInfo = document.querySelector(".names")
let announcement = document.querySelector(".announcement")
let playerX 
let playerO 
let currentPlayer
let winningPlayer


let winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

class player {
    constructor(playerName, marker){
        this.playerName = playerName
        this.marker = marker
    }
}



const newPlayer = (playerName, marker)=>{
   return{ playerName, marker }
}
const gameStart = () => {
    gameActive = true
    playerX= new player(document.querySelector("#x-name").value, "X")
    playerO= new player(document.querySelector("#o-name").value, "O")
    currentPlayer = playerX
    gameBoard.classList.remove("hide")
    playerInfo.classList.add("hide")
    announcement.innerText = `${playerX.playerName}'s turn`
    
}    

const updateBoard= (index) =>{
    board[index]= currentPlayer.marker
}
const checkWinner= () => {
    let roundWon =false
    for( let i = 0; i <=7; i ++){
        const winCondition = winningConditions[i]
        const a = board[winCondition[0]]
        const b = board[winCondition[1]]
        const c = board[winCondition[2]]
        
        if (a === '' || b === '' || c === ''){
           continue
        }
        if (a===b && b===c){
        roundWon = true
        console.log(a)
        tiles[winCondition[0]].classList.add("winning")
        tiles[winCondition[1]].classList.add("winning")
        tiles[winCondition[2]].classList.add("winning")
        break
    }
    }
    if(roundWon === true) {
        gameActive = false
        winningPlayer = currentPlayer
        }
        if (!board.includes('')){
            gameActive = false
            announceWinner();
        }
        
}
const announceWinner = () =>{
    tiles.forEach(tile => tile.classList.remove("valid"))
    if(winningPlayer !== currentPlayer){
        announcement.innerText = "It's a draw..."
    }
    else{
       announcement.innerText = `${currentPlayer.playerName} wins!` 
    }    
    } 
    

const changePlayer = () =>{
    if(gameActive === false){
        announceWinner()
    }
    
    else{ 
        currentPlayer = currentPlayer === playerX ? playerO : playerX
        announcement.innerText = `${currentPlayer.playerName}'s turn`
        }
}
const isValidAction= (tile) =>{
    if (tile.innerText === "X" || tile.innerText ==="O"){
        return false
    }
    return true
}


const userAction= (tile,index) =>{
    if (isValidAction(tile) && gameActive ==true ) {
    tile.innerText = currentPlayer.marker;
    tile.classList.remove("valid")
    updateBoard(index)
    checkWinner()
    changePlayer()
    }
}



tiles.forEach((tile, index)=>{
    tile.addEventListener ("click", () => userAction(tile,index))
})



const resetButton = document.querySelector(".reset")
resetButton.addEventListener("click", () => resetBoard() )

const resetBoard = () =>{
    tiles.forEach (tile => tile.innerText = "")
    tiles.forEach(tile => tile.classList.remove("winning"))
    tiles.forEach(tile => tile.classList.add("valid"))    
    board = ["", "", "", "", "", "", "", "", "", ]
    gameActive = true
    currentPlayer= playerX
    winningPlayer = ""
    announcement.innerText = `${currentPlayer.playerName}'s turn`
    }
    




})
