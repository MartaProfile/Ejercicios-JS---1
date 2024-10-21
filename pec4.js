


export class Game {

    // Exercise 1

    constructor(counter, numbers, puzzleContainer, restartButton, swapCounterWrapper) {
        this.counter = 0;
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.puzzleContainer = document.getElementById("puzzleContainer");
        this.restartButton = document.getElementById("restartButton");

        this.swapCounterWrapper = document.createElement("div");
        this.swapCounterWrapper.id = 'swapCounter';

        const span = document.createElement('span');
        const nodoTexto = document.createTextNode(this.counter);

        span.appendChild(nodoTexto);
        this.swapCounterWrapper.appendChild(span);

        this.restartButton.insertAdjacentElement('afterend', this.swapCounterWrapper);
    }

    // Exercise 2

    createBox(number, container) {
  
        const div = document.createElement("div");
        div.className = "box";
        div.innerHTML = number;
        container.appendChild(div);
    }

    // Exercise 3.1

    updateSwapCounter() {

        const elementoSwapCounter = document.getElementById("swapCounter");
        const span = elementoSwapCounter.querySelector("span");
        span.innerHTML = this.counter;
    }

    // Exercise 3.2 

    swapWith(box1, box2) {

        const boxContent1 = box1.innerHTML;
        const boxContent2 = box2.innerHTML;

        box1.innerHTML = boxContent2;
        box2.innerHTML = boxContent1;

        this.counter += 1;
        this.updateSwapCounter();
    }

    // Exercise 4

    isPuzzleSolved() {

        const elementosDom = document.querySelectorAll(".box");

        for (let i = 0; i < elementosDom.length; i++) {
            
            const numero = parseInt(elementosDom[i].innerHTML, 10);

            if (numero !== i + 1) {
                return false;
            }
        }

        return true;
    }

    // Exercise 5.1

    restart() {

        this.counter = 0;
        this.updateSwapCounter();

        this.numbers.sort((a, b) => Math.random() - 0.5);

        while (this.puzzleContainer.firstChild) {
            this.puzzleContainer.removeChild(this.puzzleContainer.firstChild);
        }

        for (let i = 0; i < this.numbers.length; i++) {
            this.createBox(this.numbers[i], this.puzzleContainer);
        }

        const messageElemento = document.getElementById('message');

        if (messageElemento) {
            messageElemento.remove();
        }
    }

    // Exercise 5.2
    
    initialize() {

        this.restart();
        this.dynamize();
    }

    // Exercise 6
    
    dynamize() {

        const botonRestart = document.getElementById('restartButton');
        
        const eventoRestart = () => {
            this.initialize();
        };

        botonRestart.addEventListener('click', eventoRestart);


        const boxes = document.querySelectorAll('.box');
        let selectedBox = null;

        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            
            box.addEventListener('click', () => {

                if (!selectedBox) {
                    selectedBox = box;
                    box.classList.add('selected');

                } else {
                    const box1 = selectedBox;
                    const box2 = box;
                    this.swapWith(box1, box2);
                    selectedBox.classList.remove('selected');
                    selectedBox = null;

                    if (this.isPuzzleSolved()) {
                        const messageElement = document.createElement('div');
                        messageElement.id = 'message';
                        messageElement.innerText = `Congratulations! You solved the puzzle in ${this.counter} swaps!`;
                        this.puzzleContainer.insertAdjacentElement('afterend', messageElement);
                    }
                }
            });
        }
    }
}