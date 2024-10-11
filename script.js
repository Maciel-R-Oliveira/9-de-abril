let gameInstance = null;

class Game {
    constructor() {
        this.aviao = document.querySelector(".aviao");
        this.arena = document.querySelector(".container");
        this.posicaoInimigo1 = 100;
        this.posicaoInimigo2 = 100;
        this.p = 25;
        this.tempo;
        this.queda;
        this.play = document.querySelector("h1");
        this.score = document.querySelector("h2");
        this.record = 0;
        this.iniciarInimigos();
        this.adicionarEventos();
        this.atualizarPosicaoaviao();
    }

    iniciarInimigos() {
        this.arena.innerHTML = "";

        this.aviao.style.backgroundImage = "url(./aviao.png)"
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
        this.arena.appendChild(this.aviao);
        this.arena.appendChild(this.score);
        this.record = 0;
        this.score.innerHTML = `Score: ${this.record}`;

        this.tempo = setInterval(() => this.criarInimigo(), 10);
    }

    criarInimigo() {
        this.pai.style.left = `${this.posicaoInimigo1}%`;

        if (this.posicaoInimigo1 < -10) {
            this.posicaoInimigo1 = 100;
            let contador = Math.floor(Math.random() * 90);
            contador = contador < 40 ? 40 : contador;

            this.pai.style.top = `${contador}%`;
            this.pai.style.transform = "translateY(-60%)";
        }

        this.pai2.style.left = `${this.posicaoInimigo2}%`;

        if (this.posicaoInimigo2 < -10) {
            this.posicaoInimigo2 = 400 + this.posicaoInimigo1;
            let contador = Math.floor(Math.random() * 90);
            contador = contador < 40 ? 40 : contador;

            this.pai2.style.top = `${contador}%`;
            this.pai2.style.transform = "translateY(-60%)";
        }

        if (this.posicaoInimigo2 == 20 || this.posicaoInimigo1 == 20) {
            this.record++;
            const m = new Audio("./somdemoeda.mp3").play();
            this.score.innerHTML = `Score: ${this.record}`;
        }

        this.posicaoInimigo1 -= 0.5;
        this.posicaoInimigo2 -= 0.5;

        this.colisao();
    }

    handleKeyDown(e) {
        if (e.key === "w" || e.key === " ") {
            if (this.p < 85) {
                this.p += 18;
                this.aviao.style.bottom = `${this.p}%`;
            }
        }
    }

    handleClick() {
        if (this.p < 85) {
            this.p += 18;
            this.aviao.style.bottom = `${this.p}%`;
        }
    }

    adicionarEventos() {
        this.keydownHandler = this.handleKeyDown.bind(this);
        this.clickHandler = this.handleClick.bind(this);
        document.addEventListener("keydown", this.keydownHandler);
        document.addEventListener("click", this.clickHandler);
    }

    atualizarPosicaoaviao() {
        this.queda = setInterval(() => {
            if (this.p >= -1) {
                this.p -= 0.5;
                this.aviao.style.bottom = `${this.p}%`;
            }
        }, 10);
    }

    colisao() {
        const a = this.aviao.getBoundingClientRect();
        const b = this.pai.querySelector(".inimigo").getBoundingClientRect();
        const c = this.pai.querySelector(".inimigo2").getBoundingClientRect();
        const d = this.pai2.querySelector(".inimigo3").getBoundingClientRect();
        const e = this.pai2.querySelector(".inimigo4").getBoundingClientRect();

        const arena = this.arena.getBoundingClientRect();

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

        const verificarColisaoArena = (elemA, elemB) => {
            return (
                elemA.top < elemB.top + 25 ||
                elemA.bottom > elemB.bottom
            );
        };

        if (verificarColisaoArena(a, arena)) {
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
        const audio = new Audio("./explosao.mp3");
        audio.play();
        this.aviao.style.backgroundImage = `url(${link})`;
        setTimeout(() => {
            this.aviao.style.backgroundImage = "url()";
        }, 200);
        setTimeout(() => { this.arena.appendChild(this.play); }, 500)
        this.record = 0;
        gameInstance = null;
    }
}

const arena = document.querySelector(".container");
const h1 = document.createElement("h1");
h1.innerText = "Play";
arena.appendChild(h1);

h1.addEventListener("click", (e) => {
    if (!gameInstance) {
        gameInstance = new Game();
        h1.innerText = "";
    } else {
        console.log("Um jogo já está em execução.");
    }
});
