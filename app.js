document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []
    //create Board
    function createBoard() {
        //get game array with bombs
        const bombArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width * width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombArray)
        const shuffledArray =gameArray.sort(() => Math.random() - .6)
        console.log(shuffledArray)
        for(let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.setAttribute('class', shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard();
})