let gameInstance = null;

class Game {
    constructor() {
        this.quadrado = document.querySelector(".quadrado");
        this.arena = document.querySelector(".container");
        this.olhador = 100;
        this.olhador2 = 100;
        this.p = 0;
        this.tempo;
        this.queda;
        this.play = document.querySelector("h1");
        this.score = document.querySelector("h2");
        this.record = 0;
        this.iniciarInimigos();
        this.adicionarEventos();
        this.atualizarPosicaoQuadrado();
    }

    iniciarInimigos() {
        this.arena.innerHTML = "";

        this.quadrado.style.backgroundImage = ""
        this.pai = document.createElement("div");
        this.pai.setAttribute("class", "container_inimigo");

        const inimigo1 = document.createElement("div");
        inimigo1.setAttribute("class", "inimigo");

        const inimigo2 = document.createElement("div");
        inimigo2.setAttribute("class", "inimigo2");

        this.pai.appendChild(inimigo1);
        this.pai.appendChild(inimigo2);

        this.pai2 = document.createElement("div");
        this.pai2.setAttribute("class", "container_inimigo2");

        const inimigo3 = document.createElement("div");
        inimigo3.setAttribute("class", "inimigo3");

        const inimigo4 = document.createElement("div");
        inimigo4.setAttribute("class", "inimigo4");

        this.pai2.appendChild(inimigo3);
        this.pai2.appendChild(inimigo4);

        this.arena.appendChild(this.pai);
        this.arena.appendChild(this.pai2);
        this.arena.appendChild(this.quadrado);
        this.arena.appendChild(this.play);
        this.arena.appendChild(this.score);

        this.record = 0;
        this.score.innerHTML = `Score: ${this.record}`;

        this.tempo = setInterval(() => this.criarInimigo(), 10);
    }

    criarInimigo() {
        this.pai.style.left = `${this.olhador}%`;

        if (this.olhador < -10) {
            this.olhador = 100;
            let contador = Math.floor(Math.random() * 90);
            contador = contador < 40 ? 40 : contador;

            this.pai.style.top = `${contador}%`;
            this.pai.style.transform = "translateY(-60%)";
            this.record++;
            this.score.innerHTML = `Score: ${this.record - 1}`;


        }

        this.pai2.style.left = `${this.olhador2}%`;

        if (this.olhador2 < -10) {
            this.olhador2 = 400 + this.olhador;
            let contador = Math.floor(Math.random() * 90);
            contador = contador < 40 ? 40 : contador;

            this.pai2.style.top = `${contador}%`;
            this.pai2.style.transform = "translateY(-60%)";
            this.record++;
            this.score.innerHTML = 
            `Score: ${this.record - 1}`;
            

        }

        if(this.olhador2 == 20 || this.olhador == 20){
            const m = new Audio("./somdemoeda.mp3").play();
        }


        this.olhador -= 0.5;
        this.olhador2 -= 0.5;

        this.colisao();
    }

    handleKeyDown(e) {
        if (e.key === "w" || e.key === " ") {
            if (this.p < 80) {
                this.p += 18;
                this.quadrado.style.bottom = `${this.p}%`;
            }
        }
    }

    handleClick() {
        if (this.p < 80) {
            this.p += 18;
            this.quadrado.style.bottom = `${this.p}%`;
        }
    }

    adicionarEventos() {
        this.keydownHandler = this.handleKeyDown.bind(this);
        this.clickHandler = this.handleClick.bind(this);
        document.addEventListener("keydown", this.keydownHandler);
        document.addEventListener("click", this.clickHandler);
    }

    atualizarPosicaoQuadrado() {
        this.queda = setInterval(() => {
            if (this.p > 0) {
                this.p -= 0.5;
                this.quadrado.style.bottom = `${this.p}%`;
            }
        }, 10);
    }

    colisao() {
        const a = this.quadrado.getBoundingClientRect();
        const b = this.pai.querySelector(".inimigo").getBoundingClientRect();
        const c = this.pai.querySelector(".inimigo2").getBoundingClientRect();
        const d = this.pai2.querySelector(".inimigo3").getBoundingClientRect();
        const e = this.pai2.querySelector(".inimigo4").getBoundingClientRect();

        const verificarColisao = (elemA, elemB) => {
            return (
                elemA.right > elemB.left &&
                elemA.left < elemB.right &&
                elemA.bottom > elemB.top &&
                elemA.top < elemB.bottom
            );
        };

        if (verificarColisao(a, b) || verificarColisao(a, c) || verificarColisao(a, d) || verificarColisao(a, e)) {
            this.finalizarJogo();
        }
    }

    finalizarJogo() {
        clearInterval(this.tempo);
        clearInterval(this.queda);
        document.removeEventListener("keydown", this.keydownHandler);
        document.removeEventListener("click", this.clickHandler);
        console.log("Jogo Finalizado!");
        this.play.innerHTML = "Play";
        const link = "https://media.tenor.com/5acZjLl1OTAAAAAi/explosion-deltarune.gif"
        const audio = new Audio("./explosao.mp3")
        audio.play()
        this.quadrado.style.backgroundImage = `url(${link})`
        setTimeout(()=>{
            this.quadrado.style.backgroundImage = "url()"
        },500)
        this.record = 0;
        gameInstance = null;
    }
}

const arena = document.querySelector(".container");
const h1 = document.createElement("h1");
h1.innerText = "Play";
arena.appendChild(h1);

h1.addEventListener("click", ()=>{
    if (!gameInstance) {
        gameInstance = new Game();
        h1.innerText = "";
    } else {
        console.log("Um jogo já está em execução.");
    }
});


