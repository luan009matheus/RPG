const storyElement = document.getElementById("story");
const optionsElement = document.getElementById("options");

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(node => node.id === textNodeIndex);
    storyElement.innerText = textNode.text;
    optionsElement.innerHTML = "";

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.addEventListener("click", () => selectOption(option));
            optionsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: "Você acorda em uma floresta misteriosa. À sua esquerda, um caminho de terra. À direita, uma caverna escura.",
        options: [
            { text: "Seguir pelo caminho", nextText: 2 },
            { text: "Entrar na caverna", nextText: 3 }
        ]
    },
    {
        id: 2,
        text: "Você encontra uma espada mágica cravada em uma pedra.",
        options: [
            { text: "Pegar a espada", setState: { espada: true }, nextText: 4 },
            { text: "Ignorar e seguir em frente", nextText: 4 }
        ]
    },
    {
        id: 3,
        text: "Um goblin aparece! Você está desarmado e é forçado a fugir.",
        options: [
            { text: "Voltar para o início", nextText: 1 }
        ]
    },
    {
        id: 4,
        text: "Você encontra um dragão bloqueando o caminho.",
        options: [
            {
                text: "Lutar com a espada",
                requiredState: (currentState) => currentState.espada,
                nextText: 5
            },
            {
                text: "Tentar fugir",
                nextText: 6
            }
        ]
    },
    {
        id: 5,
        text: "Com a espada mágica, você derrota o dragão e se torna um herói!",
        options: [
            { text: "Recomeçar", nextText: 1 }
        ]
    },
    {
        id: 6,
        text: "Você tenta fugir, mas o dragão é mais rápido. Fim da aventura.",
        options: [
            { text: "Recomeçar", nextText: 1 }
        ]
    }
];

startGame();
