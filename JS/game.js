import * as timerFile from './timer.js';
import * as fieldFile from './field.js';
import * as audioFile from './audio.js';

export const game = {
    board: document.getElementById("game-board"),
    modal: document.getElementById("game-modal"),
    modalTitle: document.getElementById("modal-title"),
    finalTime: document.getElementById("final-time"),
    displayTimer: document.getElementById("display-timer"),
    flagsCounter: document.getElementById("flags-counter"),
    selectGrid: document.getElementById("grid-select"),
    restartBtn: document.getElementById("btn-restart"),
    fields: [],
    bestTime: document.getElementById('bestTime')
};

export let gameStarted = false;
export let gameEnd = false;

function getDifficulty(){
    return game.selectGrid.value
}

function checkWin() {
    const revealed = game.board.querySelectorAll(".field--revealed").length;

    if (revealed === game.fields.length - fieldFile.maxBombs) {
        winGame();
    }
}

function winGame() {
    if (gameEnd) return;

    gameEnd = true;
    timerFile.stopTimer();

    game.modalTitle.textContent = "Vitória!!";
    game.modalTitle.style.color = "green";
    game.finalTime.textContent = timerFile.formatTime(timerFile.seconds);

    game.fields.forEach(f => f.style.pointerEvents = "none");

    requestAnimationFrame(() => {
        game.modal.showModal();
    });

    timerFile.getScore(timerFile.seconds, getDifficulty())
}

function loseGame(index) {
    if (gameEnd) return;

    gameEnd = true;
    timerFile.stopTimer()
    
    fieldFile.revealAllBombs(index);

    game.modalTitle.textContent = "BOOOM!!";
    game.modalTitle.style.color = "red";
    game.finalTime.textContent = timerFile.seconds;

    game.fields.forEach(f => f.style.pointerEvents = "none");

    requestAnimationFrame(() => {
        game.modal.showModal();
        audioFile.playAudio("lose")
    });
}

function toggleFlag(field) {
    if (field.classList.contains("field--revealed")) return;
    const isFlagged = field.classList.contains('field--flagged')
    
    if (
        !isFlagged &&
        Number(game.flagsCounter.textContent) === 0
    ) return;

    field.classList.toggle("field--flagged");

    game.flagsCounter.textContent =  isFlagged
        ? Number(game.flagsCounter.textContent) + 1
        : Number(game.flagsCounter.textContent) - 1;
    audioFile.playAudio("flag")
}

function initEvents() {
    game.fields.forEach((field, index) => {
        field.addEventListener("click", (event) => {
            
            if (gameEnd) return;

            if (event.ctrlKey) {
                toggleFlag(field);
                return;
            }

            if (field.classList.contains("field--flagged")) return;

            if (!gameStarted) {
                gameStarted = true;
                fieldFile.createBombs(index);
                timerFile.startTimer();
            }

            if (fieldFile.isBombField.has(index)) {
                loseGame(index);
                return;
            }
            
            fieldFile.revealField(index)
            checkWin();
        });
    });
    
    game.restartBtn.addEventListener("click", () => {
        location.reload();
    });
}

game.selectGrid.addEventListener("change", () => {

    if (gameStarted && !gameEnd) {
        if (!confirm("Reiniciar o jogo?")) return;
    }
    timerFile.loadRecord(getDifficulty())

    fieldFile.isBombField.clear();
    gameEnd = false;
    gameStarted = false;

    clearInterval(timerFile.timerInterval);
    timerFile.resetTimer()
    game.displayTimer.textContent = "00:00";

    fieldFile.setGrid();
    fieldFile.createTable();
    initEvents();
});

fieldFile.setGrid()
fieldFile.createTable()
initEvents();
timerFile.loadRecord(getDifficulty())