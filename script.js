const pesos = [
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -100, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -100, -100, -100, -100, +100]
];

const mundo = [
    ["junin", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "🍔"]
];
let looked = [
    [-1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];


let pos = [0, 0];
let tentativas = 0;
let pontos = 0; 


//ui
const  setMatriz = (valores, id)=> {
    const matrizDiv = document.getElementById(id);
    matrizDiv.innerHTML = ''; 
    
    for (let i = 0; i < valores.length; i++) {
        for (let j = 0; j < valores[i].length; j++) {
            const celula = document.createElement('div');
            celula.textContent = valores[i][j];
            celula.classList.add('celula');
            
            if (valores[i][j] === -100) {
                celula.classList.add('danger');
            } else if (valores[i][j] === -1) {
                celula.classList.add('explored');
            }else if (valores[i][j] === 100) {
                celula.classList.add('way');
            }
            
            matrizDiv.appendChild(celula);
        }
    }
}
const setDados = (pos, tentativas)=>{
    document.getElementById("pos").innerHTML= 'Posição: ' + pos;
    document.getElementById("tentativas").innerHTML= 'Tentativas: ' + tentativas;
    document.getElementById("pontos").innerHTML= 'Pontos: ' + pontos;
}
const update = () =>{
    setDados(pos, tentativas, pontos)
    setMatriz(mundo, 'mundo')
    setMatriz(looked, 'looked')
}

//sad

const enovo = (x,y)=>{
    if(looked[x][y] == 0) return true
    return false;
}
const eveio = (x,y)=>{
    if(looked[x][y] == -1) return true
    return false;
}

const ecilada = (x,y)=>{
    if(looked[x][y] == -100) return true
    return false;
}

const dentroMapa = (x, y) => {
    return x >= 0 && x < pesos.length && y >= 0 && y < pesos[0].length;
};

const imorreu = () =>{
    return pesos[pos[0]][pos[1]] == -100? true : false;
}

const getPos = () => {
    let direcoes = [[-1, 0], [1, 0], [0, -1], [0, 1]]; 
    let resto = []
    while (direcoes.length > 0) {
        const randomIndex = Math.floor(Math.random() * direcoes.length);
        const direcao = direcoes[randomIndex];
        if (dentroMapa(pos[0] + direcao[0], pos[1] + direcao[1])) {
            if(enovo(pos[0] + direcao[0], pos[1] + direcao[1])) return direcao;
            if(ecilada(pos[0] + direcao[0], pos[1] + direcao[1])) console.log("buraco")
            if(eveio(pos[0] + direcao[0], pos[1] + direcao[1])) resto.push(direcao)
        }
        direcoes.splice(randomIndex, 1);
    }
    return resto.length>=1 ? resto[0] : null;
};

var andar = () => {
    tentativas ++;

    const direcao = getPos();
    mundo[pos[0]][pos[1]] = ""
    const novoX = pos[0] + direcao[0];
    const novoY = pos[1] + direcao[1];

    pos = [novoX, novoY];
    looked[novoX][novoY] = pesos[novoX][novoY];
    pontos += pesos[novoX][novoY];

    if(imorreu()){
        pos= [0,0]
    }
    mundo[pos[0]][pos[1]] = "junin"

    update()
    if(pesos[pos[0]][pos[1]] == 100){
        alert("zamburgui") 
        return true;
    }
    else return false;
};
var auto = () => {
    if(andar()) return;
    setTimeout(auto, 1000); 
};

var precoce = () =>{
    while(!andar()){}
}
update()
// setMatriz(pesos, 'pesos')