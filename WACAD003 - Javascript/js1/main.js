const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText = 'A ranked começou bem, mas mudou quando :insertx: resolveu agir. Quando chegou :inserty:, todos os jogadores ficaram tensos e :insertz:. A partida estava perdida e Bob reclamou no chat.'

let insertX = [
  'uma Jett smurf inimiga',
  'uma Reyna tiltada',
  'um Kayo troll'
];

let insertY = [
  'no round decisivo',
  'na última rodada',
  'no overtime'
];

let insertZ = [
  'perdemos todas as trocações',
  'ninguém falava nada',
  'o time desistiu'
];

randomize.addEventListener('click', result);

function result() {

  let newStory = storyText;
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace ('Bob', name);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}