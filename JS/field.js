    import * as Global from './game.js'

    export let maxBombs = null
    export let cols = null
    export let rows = null
    export const isBombField = new Set();

    let fontSize = null

    export function setGrid(){
        const grid = Global.game.selectGrid.value
        const isMobile = window.innerWidth <= 768;

        if (grid === "easy") {
            rows = 7;
            cols = 7;
            maxBombs = 7;
            fontSize = '200%'
        }

        if (grid === "normal") {
            rows = 11;
            cols = isMobile ? 9 : 11;
            maxBombs = isMobile ? 15 : 20;
            fontSize = '150%'
        }

        if (grid === "hard") {
            rows = 15;
            cols = isMobile ? 11 : 15;
            maxBombs = isMobile ? 25 : 40;
            fontSize = '110%'
        }
        Global.game.board.style.setProperty("--font-size", fontSize);
        Global.game.board.style.setProperty("--grid-size", cols);
    }

    export function createTable() {
        Global.game.board.innerHTML = "";
        for (let i = 0; i < rows * cols; i++) {
            const field = document.createElement("div");
            field.classList.add("field");
            field.dataset.index = i;
            Global.game.board.appendChild(field);
        }
        Global.game.fields = document.querySelectorAll(".field");
        Global.game.flagsCounter.textContent = maxBombs;

    }

    export function createBombs(firstIndex) {
        while (isBombField.size < maxBombs) {
            const randomIndex = Math.floor(Math.random() * Global.game.fields.length);

            if (randomIndex === firstIndex || isBombField.has(randomIndex)) continue;

            isBombField.add(randomIndex);
        }
    }

    export function revealAllBombs() {
        isBombField.forEach((bombIndex) => {
            const field = Global.game.fields[bombIndex];

            field.classList.add("field--is-bomb");

            if (field.classList.contains("field--flagged")) {
                field.classList.remove("field--flagged");
                Global.game.flagsCounter.textContent++;
            }

            const bombIcon = document.createElement("div");
            bombIcon.classList.add("bomb-icon");
            field.appendChild(bombIcon);
        });
    }

    export function getNeighbors(index) {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const neighbors = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                const newRow = row + i;
                const newCol = col + j;

                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    neighbors.push(newRow * cols + newCol);
                }
            }
        }

        return neighbors;
    }

    export function countBombs(index) {
        return getNeighbors(index).filter(n => isBombField.has(n)).length;
    }

    export function revealField(index) {
        const field = Global.game.fields[index];

        if (
            field.classList.contains("field--revealed") ||
            field.classList.contains("field--flagged")
        ) return;

        field.classList.add("field--revealed");

        const bombsAround = countBombs(index);

        if (bombsAround > 0) {
            field.textContent = bombsAround;
            field.dataset.number = bombsAround;
            return;
        }
        
        getNeighbors(index).forEach(n => revealField(n));
    }