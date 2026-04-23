import * as Global from './game.js';

export let seconds = 0;
export let timerInterval = null;

export function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        seconds++;
        Global.game.displayTimer.textContent = formatTime(seconds);
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

export function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;

    if (Global.game.displayTimer) {
        Global.game.displayTimer.textContent = "00:00";
    }
}

export function formatTime(totalSeconds) {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function getScore(thisScore, difficulty){
    const key = `bestScore_${difficulty}`
    const currentRecord = localStorage.getItem(key);
    
    if (!currentRecord || thisScore < Number(currentRecord)) {
        localStorage.setItem(key, thisScore);
    }

}

export function loadRecord(difficulty){
    const key = `bestScore_${difficulty}`
    const record = localStorage.getItem(key)

    const el = document.querySelector('.best-score__text')

    if(!el) return;
    el.textContent = record ? `${record}s` : "—"
}