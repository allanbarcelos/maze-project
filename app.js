document.addEventListener('DOMContentLoaded', () => {

    const gameCodForm = document.getElementById('gameCodForm');
    const player1Form = document.getElementById('player1Form');
    const player2Form = document.getElementById('player2Form');

    let player;
    let player1StartIndex = 786;
    let player2StartIndex = 807;

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDb8l0BKZlqL7FCBAAL6PRoE32MXCBMJxw",
        authDomain: "maze-project-badf6.firebaseapp.com",
        projectId: "maze-project-badf6",
        storageBucket: "maze-project-badf6.appspot.com",
        messagingSenderId: "958361119052",
        appId: "1:958361119052:web:3b8574d5fe8270f24a47e9"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.database();
    let ref = db.ref();
    let sessionKey;

    function setPlayer(player, name, startIndex) {
        sessionKey = sessionKey ? sessionKey : ref.push().getKey();
        ref.child(sessionKey).child(player).child('currentPosition').set(startIndex);
        ref.child(sessionKey).child(player).child('name').set(name);
        return sessionKey;
    }

    function submitGameCodForm(e) {
        e.preventDefault();
        const cod = gameCodForm.elements['gameId'].value;
        sessionKey = cod;
        gameCodForm.remove();

        ref.on("value", function (snapshot) {
            if (snapshot.val()[sessionKey] && player1Form.parentNode !== null) {
                const nameElement = document.createElement('h4');
                nameElement.innerHTML = snapshot.val()[sessionKey]['player-1'].name;;
                player1Form.parentNode.appendChild(nameElement);
                player1Form.remove();
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    function submitPlayer1Form(e) {
        e.preventDefault();

        const name = player1Form.elements['player-1'].value;

        const nameElement = document.createElement('h4');
        nameElement.innerHTML = name;
        player1Form.parentNode.appendChild(nameElement);

        const gameCodElement = document.createElement('h4');
        gameCodElement.innerHTML = setPlayer('player-1', name, player1StartIndex);
        gameCodForm.parentNode.appendChild(gameCodElement);

        player1Form.remove();
        gameCodForm.remove();

        player = 'player-1';
        playerStartIndex = player1StartIndex;

    }

    function submitPlayer2Form(e) {
        e.preventDefault();
        const name = player2Form.elements['player-2'].value;
        setPlayer('player-2', name, player2StartIndex);
        player2Form.remove();
        player = 'player-2';
        playerStartIndex = player2StartIndex;
    }

    gameCodForm.addEventListener('submit', submitGameCodForm);
    player1Form.addEventListener('submit', submitPlayer1Form);
    player2Form.addEventListener('submit', submitPlayer2Form);

    const grid = document.querySelector('.grid');
    const width = 29 // 28 x 28 = 784;

    // layout of grid and what is 
    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1
    ];

    const squares = [];

    // draw the grid
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            // addlayout to the board
            if (layout[i] === 0) {
                squares[i].classList.add('empty');
            } else if (layout[i] === 1) {
                squares[i].classList.add('wall');
            } else if (layout[i] === 2) {
                squares[i].classList.add('player-1');
            } else if (layout[i] === 3) {
                squares[i].classList.add('player-2');
            }
        }
    }

    createBoard();

    squares[player1StartIndex].classList.add('player-1');
    squares[player2StartIndex].classList.add('player-2');


    // move player
    function movePlayer(e) {

        if (e.keyCode > 36 && e.keyCode < 41) {


            squares[playerStartIndex].classList.remove(player);

            switch (e.keyCode) {
                case 37:
                    if (
                        playerStartIndex % width !== 0 &&
                        !squares[playerStartIndex - 1].classList.contains('wall')
                    ) playerStartIndex -= 1

                    // check if pacman is in the left exit

                    if (playerStartIndex - 1 === 363) {
                        playerStartIndex = 391
                    }

                    break;
                case 38:
                    if (
                        playerStartIndex - width >= 0 &&
                        !squares[playerStartIndex - width].classList.contains('wall')
                    ) playerStartIndex -= width
                    break;
                case 39:
                    if (
                        playerStartIndex % width < width - 1 &&
                        !squares[playerStartIndex + 1].classList.contains('wall')
                    ) playerStartIndex += 1

                    if (playerStartIndex + 1 === 392) {
                        playerStartIndex = 364
                    }

                    break;
                case 40:
                    if (
                        playerStartIndex + width < width * width &&
                        !squares[playerStartIndex + width].classList.contains('wall')
                    ) playerStartIndex += width
                    break;
            }

            squares[playerStartIndex].classList.add(player);
            ref.child(sessionKey).child(player).child('currentPosition').set(playerStartIndex);

            // pacDotEaten();
            // powerPelletEaten()
            // checkForGameOver()
            // checkForWin()
        }
    }

    document.addEventListener('keyup', movePlayer);

    ref.on("value", function (snapshot) {
        if (snapshot.val()[sessionKey]) {

            if (player === 'player-1' && snapshot.val()[sessionKey]['player-2']) {
                squares[player2StartIndex].classList.remove('player-2');
                squares[snapshot.val()[sessionKey]['player-2'].currentPosition].classList.add('player-2');
                player2StartIndex = snapshot.val()[sessionKey]['player-2'].currentPosition;

                if (snapshot.val()[sessionKey]['player-2'].name && player2Form.parentNode !== null) {
                    const nameElement = document.createElement('h4');
                    nameElement.innerHTML = snapshot.val()[sessionKey]['player-2'].name;
                    player2Form.parentNode.appendChild(nameElement);
                    player2Form.remove();
                }

            }

            if (player === 'player-2' && snapshot.val()[sessionKey]['player-1']) {
                squares[player1StartIndex].classList.remove('player-1');
                squares[snapshot.val()[sessionKey]['player-1'].currentPosition].classList.add('player-1');
                player1StartIndex = snapshot.val()[sessionKey]['player-1'].currentPosition;
            }
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});