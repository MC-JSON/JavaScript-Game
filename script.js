//Global Variables
let deck = []
///sum variable to keep track of score in hand
let sumPlayer = 0
let sumDealer = 0
let bank = 300
let message = ''
let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
let faces = [
  'Ace',
  'King',
  'Queen',
  'Jack',
  'Ten',
  'Nine',
  'Eight',
  'Seven',
  'Six',
  'Five',
  'Four',
  'Three',
  'Two'
]
let blackJack = false
let stillPlaying = false
let playerWins = false
const btn = document.getElementById('start')
const bttn = document.getElementById('hit')
const button = document.getElementById('replay')
const cardsHand = document.getElementById('cards')
const dealerHand = document.getElementById('dealer')
const playerBank = document.getElementById('bank')
let cardsHandArr = []
let dealerHandArr = []
playerBank.innerHTML = 'Bank ~ $' + bank

//Functions below
///how to randomize cards to go into players/dealers hand
const buildDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < faces.length; x++) {
      let weight = parseInt(faces[x])
      if (faces[x] == 'J' || faces[x] == 'Q' || faces[x] == 'K') weight = 10
      if (faces[x] == 'A') weight = 11
      let card = { Suit: suits[i], Faces: faces[x], Weight: weight }
      deck.push(card)
    }
  }
}

const shuffle = () => {
  for (let i = 0; i < 100; i++) {
    let position1 = Math.floor(Math.random() * deck.length)
    let position2 = Math.floor(Math.random() * deck.length)
    let tmp = deck[position1]
    deck[position1] = deck[position2]
    deck[position2] = tmp
  }
}

const dealCards = () => {
  for (let i = 0; i < 4; i++) {
    let card = deck.pop()
    cardsHandArr.push(card)
    dealerHandArr.push(card)
  }
  // updateDeck()
}

///how to start game (ie deal cards)
const startGame = () => {
  console.log('test')
  stillPlaying = true
  buildDeck()
  shuffle()
  dealCards()
  playGame()
}

///render game(ie play hand) - how to add cards to screen and render messages based on sum of cards; if blackjack or higher than dealer + $100 once game reaches $1000 refer to winner.html
const playGame = () => {
  cardsHandArr.innerText = 'Cards ~ '
  dealerHandArr.innerText = 'Dealer ~ '
  for (let i = 0; i < cardsHandArr.length; i++) {
    cardsHandArr.textContent + cardsHandArr[i]
  }
  for (let i = 0; i < dealerHandArr.length; i++) {
    dealerHandArr.textContent + dealerHandArr[i]
    //update sum
    //check for win
  }
}

///deal new card if requested
const dealCard = () => {
  if (stillPlaying === true && blackJack === false) {
    let card = randomCard()
    sum += card
    cardsPlayer.push(card)
    playGame()
  }
}

///replay to play next hand
// const newHand = () => {
//   cardsPlayer = []
//   cardsDealer = []
//   sumPlayer = 0
//   sumDealer = 0
//   blackJack = false
//   startGame()
// }

//Event Listeners
btn.addEventListener('click', startGame)
bttn.addEventListener('click', dealCard)
// button.addEventListener('click', newHand)
