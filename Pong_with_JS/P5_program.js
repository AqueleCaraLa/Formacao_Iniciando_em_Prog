// variaveis da bolinha
let xBolinha = 300; //Coordenada central no eixo horizontal
let yBolinha = 200; //Coordenada central no eixo vertical
let diametro = 15;  //Diametro da bolinha
let raio = diametro / 2; //raio da bolinha
//velocidade da bolinha
let velocidadeXBolinha = 5; //velocidade da bolinha no eixo x
let velocidadeYBolinha = 5; //velocidade da bolinha no eixo y

//variaveis da raquete_jogador
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis da raquete_oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

let chanceDeErrar = 0;

// Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// Sons do jogo
let ponto;
let raquetada;
let trilha;

function preload()
{
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() // criação do Preview
{
  createCanvas(600, 400);
  trilha.loop();
  // cria uma area com horizontal de tamnho 600 e vertical com tamanho 400
}

function draw() // função no qual será feito as mudanças na area criada
{
  background(0); // muda a coloração da area criada
  mostraBolinha();
  movimentoBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoRaquete();
  movimentoRaqueteOponente();
  //colisaoRaquete();
  colisaoRaquetes(xRaquete, yRaquete);
  colisaoRaquetes(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

//funções definidas
function mostraBolinha() // função separada
{
  circle(xBolinha, yBolinha, diametro); //cria a figura de um circulo(x, y, d), d = diametro
}
function mostraRaquete(x,y)
{
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentoBolinha()
{
  xBolinha += velocidadeXBolinha; //faz com que a bolinha se mova a uma certa velocidade no eixo x
  yBolinha += velocidadeYBolinha; //faz com que a bolinha se mova a uma certa velocidade no eixo y
}
function colisaoBolinha()
{
  if(xBolinha + raio > width || xBolinha - raio < 0) //width largura maxima(eixo x), || = 'ou'
  { 
    velocidadeXBolinha *= -1; // muda a direção de movimento horizontal da bolinha
  } 
  if(yBolinha + raio > height || yBolinha - raio < 0) // height altura maxima(eixo y)
  {
     velocidadeYBolinha *= -1; // muda a direção de movimento vertical da bolinha
  }
  //adiciona e subtrai o raio para mudar a posição quando a borda da bolinha tocar a borda da tela
}

function movimentoRaquete()
{
  if(keyIsDown(UP_ARROW)){
      yRaquete -= 10;
    }
  if(keyIsDown(DOWN_ARROW)){
      yRaquete += 10;
    }
}

function movimentaRaqueteOponente()
{
  if(keyIsDown(87))
    {
      yRaqueteOponente -= 10;
    }
  if(keyIsDown(83))
    {
      yRaqueteOponente += 10;
    }
}
function movimentoRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function colisaoRaquete()
{
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete)
  {
    velocidadeXBolinha *= -1;
  }
}
function colisaoRaquetes(x, y)
{
  colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if(colidiu)
    {
      velocidadeXBolinha *= -1
      raquetada.play();
    }
}

function incluiPlacar()
{
  stroke(255);
  
  textAlign(CENTER);
  textSize(16);
  
  fill(color(255, 140, 0));
  rect(230, 10, 40, 20);
  fill(255);
  text(meusPontos, 250, 25);
  
  fill(color(255, 140, 0))
  rect(330, 10, 40, 20)
  fill(255);
  text(pontosOponente, 350, 25)
}
function marcaPonto()
{
  if(xBolinha > 590)
    {
      meusPontos += 1;
      ponto.play();
    }
  if(xBolinha < 10)
    {
      pontosOponente += 1;
      ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}