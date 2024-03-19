function startGame() {
    var player1 = document.getElementById('player1').value
    var player2 = document.getElementById('player2').value
    var squareBoard = document.querySelectorAll(".squareBoard")
    var turnPlayer = document.getElementById('turnPlayer')
    var timePlayer1 = true;
    var movesCount = 0;

    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    updateTurnPlayer();
    

    function clickPlayer1(event) {
        event.target.style.backgroundColor = "lightblue";
        event.target.innerText = "X";
        checkWinner("X");
    }

    function clickPlayer2(event) {
        event.target.style.backgroundColor = "lightgreen";
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
        var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //colunas
            [0, 4, 8], [2, 4, 6]             //diagonais
        ];

        var winnerName = timePlayer1 ? player1 : player2;

        for (var i = 0; i < winningCombinations.length; i++) {
            var [a, b, c] = winningCombinations[i];
            if (squareBoard[a].innerText === player && squareBoard[b].innerText === player && squareBoard[c].innerText === player) {
                alert("O jogador " + winnerName + " ganhou!");
                resetGame();
                return;
            }
        }
    }

    function resetGame() {
        squareBoard.forEach(function(elemento) {
            elemento.innerText = "";
            elemento.style.backgroundColor = "gray";
        });
        updateTurnPlayer();
    }

    function updateTurnPlayer() {
        if (timePlayer1) {
            turnPlayer.textContent = "Vez de " + player1;
            turnPlayer.style.color = "lightblue";
        } else {
            turnPlayer.textContent = "Vez de " + player2;
            turnPlayer.style.color = "lightgreen";
        }
    }

    function checkDraw() {
        if (movesCount === 9) {
            alert("O jogo terminou em empate!");
            resetGame();
        }
    }

    clickPlayer();
    updateTurnPlayer();    
}