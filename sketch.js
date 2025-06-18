let cesto;
let frutas = [];
let score = 0;
let emojisFrutas = ["🍇","🍈","🍉","🍊","🍋","🍌","🥭","🍎","🍓","🍒","🫐","🥝","🍅","🥑","🌽","🌶️","🥒","🥬","🥦","🥜",]; // Emojis de frutas disponíveis

function setup() {
createCanvas(400, 400);
Cesto = new Cesto();
}

function draw() {
background(500);

// Desenha o cesto
Cesto.display();
Cesto.move();

// Cria frutas aleatoriamente
if (frameCount % 60 === 0) {
frutas.push(new Fruta());
}

// Atualiza e desenha as frutas
for (let i = frutas.length - 1; i >= 0; i--) {
frutas[i].fall();
frutas[i].display();

// Verifica se a fruta tocou o cesto
if (frutas[i].hits(cesto)) {
frutas.splice(i, 1); // Remove a fruta
score += 10; // Aumenta a pontuação
}

// Verifica se a fruta caiu no chão
if (frutas[i].y > height) {
frutas.splice(i, 1); // Remove a fruta
}
}

// Exibe a pontuação
textSize(24);
text('Pontuação: ' + score, 200, 20);
}

// Classe Cesto
class Cesto {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.width = 80;
    this.height = 10;
  }
move() {
if (keyIsDown(LEFT_ARROW)) {
this.x -= 5;
}
if (keyIsDown(RIGHT_ARROW)) {
this.x += 5;
}
// Impede que o cesto saia da tela
this.x = constrain(this.x, 0, width - this.width);
}

display() {
fill(255, 0, 0);
noStroke();
rect(this.x, this.y, this.width, this.height);
}
}

// Classe Fruta
class Fruta {
constructor() {
this.x = random(width);
this.y = 0;
this.size = random(40, 60); // Tamanho da fruta (emoji)
this.speed = random(2, 5);
this.emoji = random(emojisFrutas); // Escolhe um emoji aleatório de frutas
}

fall() {
this.y += this.speed;
}

display() {
// Desenha o emoji da fruta
textSize(this.size); // Ajusta o tamanho do emoji
textAlign(CENTER, CENTER);
text(this.emoji, this.x, this.y); // Desenha o emoji no local adequado
}

hits(cesto) {
let d = dist(this.x, this.y, Cesto.x + Cesto.width / 2, Cesto.y);
return d < this.size / 2 + Cesto.width / 2;
}
}