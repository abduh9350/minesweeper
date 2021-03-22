document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []
    let isGameOver = false
    let flags = 0
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

            square.addEventListener('click', function(e) {
                click(square)
                checkForWin()
            })

            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square)
            }
        }
        
        for(let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1)

            if(squares[i].classList.contains('valid')) {
                if(!isLeftEdge && squares[i - 1].classList.contains('bomb')) {
                    total++
                } 
                if(!isRightEdge && squares[i + 1].classList.contains('bomb')) {
                    total++
                }
                if(i >= width && squares[i - width].classList.contains('bomb')) {
                    total++
                }
                if(i >= width && !isLeftEdge && squares[i - (width + 1)].classList.contains('bomb')) {
                    total++
                }
                if(i >= width && !isRightEdge && squares[i - (width - 1)].classList.contains('bomb')) {
                    total++
                }
                if(i <= squares.length - (width + 1) && squares[i + width].classList.contains('bomb')) {
                    total++
                }
                if(i <= squares.length - (width + 1) && !isLeftEdge && squares[i + width - 1].classList.contains('bomb')) {
                    total++
                }
                if(i <= squares.length - (width + 1) && !isRightEdge && squares[i + width + 1].classList.contains('bomb')) {
                    total++
                }
                squares[i].setAttribute('data', total)
            }
        }
    }
    createBoard();


    function addFlag(square) {
        if(isGameOver) {
            return
        }
        if(!square.classList.contains('checked') && (flags < bombAmount) && !square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = 'F'
            flags++
        }
        else if(square.classList.contains('flag')) {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags --
        }
    }

    function click(square) {
        if(isGameOver) {
            return
        }
        if(square.classList.contains('checked') || square.classList.contains('flag')) {
            return
        }
        if(square.classList.contains('bomb')) {
            gameOver(square)
        }
        else {
            let total = square.getAttribute('data')
            if(total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
            }
            else {
                //square.classList.add('flag')
                checkSquare(square)
            }
            
            
        }
        square.classList.add('checked')
        
    }

    function checkSquare(square) {
        const currentID = parseInt(square.id)
        const isLeftEdge = (currentID % width === 0)
        const isRightEdge = (currentID % width === width - 1)

        setTimeout(() => {
            if(!isLeftEdge) {
                const newID = squares[currentID - 1].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
            if(!isRightEdge) {
                const newID = squares[currentID + 1].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
            if(currentID >= width) {
                const newID = squares[currentID - width].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
            if(currentID >= width && !isLeftEdge) {
                const newID = squares[currentID - (width + 1)].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
            if(currentID >= width && !isRightEdge) {
                const newID = squares[currentID - (width - 1)].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
            if(currentID <= squares.length - (width + 1)) {
                const newID = squares[currentID + width].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
            if(currentID <= squares.length - (width + 1) && !isLeftEdge) {
                const newID = squares[currentID + width - 1].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
            if(currentID <= squares.length - (width + 1) && !isRightEdge) {
                const newID = squares[currentID + width + 1].id
                const newSquare = document.getElementById(newID)
                click(newSquare)
            }
        }, 100)
    }

    function gameOver(square) {
        console.log('Boom Game Over')
        isGameOver = true

        squares.forEach(square => {
            if(square.classList.contains('bomb')) {
                square.innerHTML = 'B'
            }
        })
    }

    function checkForWin() {
        let matches = 0;
        for(let i = 0; i < squares.length; i++) {
            if(squares[i].classList.contains('checked') && squares[i].classList.contains('valid')) {
                matches++
            }
            if(matches === squares.length - bombAmount) {
                console.log('You Win')
                isGameOver = true
            }
        }
    }

})