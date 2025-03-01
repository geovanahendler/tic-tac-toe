function startGame() {
    let player1 = document.getElementById('player1').value
    let player2 = document.getElementById('player2').value
    let squareBoard = document.querySelectorAll(".squareBoard")
    let turnPlayer = document.getElementById('turnPlayer')
    let timePlayer1 = true;
    let movesCount = 0;

    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    updateTurnPlayer();


    function clickPlayer1(event) {
        event.target.style.backgroundColor = "orange";
        event.target.innerText = "X";
        checkWinner("X");
    }

    function clickPlayer2(event) {
        event.target.style.backgroundColor = "purple";
        event.target.innerText = "O";
        checkWinner("O");
    }

    function clickPlayer() {
        squareBoard.forEach(function(elemento) {
            elemento.addEventListener("click", function(event) {
                if (event.target.innerText === "") {
                    if (timePlayer1) {
                        clickPlayer1(event);
                    } else {
                        clickPlayer2(event);
                    }
                    timePlayer1 = !timePlayer1;
                    movesCount++;
                    updateTurnPlayer();
                    checkDraw();
                }
            })
        })
    }

    function checkWinner(player) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //colunas
            [0, 4, 8], [2, 4, 6]             //diagonais
        ];

        let winnerName = timePlayer1 ? player1 : player2;

        for (let i = 0; i < winningCombinations.length; i++) {
            let [a, b, c] = winningCombinations[i];
            if (squareBoard[a].innerText === player && squareBoard[b].innerText === player && squareBoard[c].innerText === player) {
                document.getElementById('vencedor').textContent = "Vencedor: " + winnerName;
                document.getElementById('championContainer').style.display = 'block';
                return;
            }
        }
    }

    function updateTurnPlayer() {
        if (timePlayer1) {
            turnPlayer.textContent = "Vez de " + player1;
            turnPlayer.style.color = "orange";
        } else {
            turnPlayer.textContent = "Vez de " + player2;
            turnPlayer.style.color = "purple";
        }
    }

    function checkDraw() {
        if (movesCount === 9) {
            document.getElementById('drawContainer').style.display = 'block';
        }
    }

    window.resetGame = function resetGame() {
        squareBoard.forEach(function(elemento) {
            elemento.innerText = "";
            elemento.style.backgroundColor = "gray";
        })
        document.getElementById('drawContainer').style.display = 'none';
        document.getElementById('championContainer').style.display = 'none';
        updateTurnPlayer();
    }

    window.goBackIndex = function goBackIndex() {
        movesCount = 0;
        document.getElementById('formContainer').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none';
        resetGame();
    }
    
    clickPlayer();
    updateTurnPlayer();    
}

