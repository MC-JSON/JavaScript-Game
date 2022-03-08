//Global Variables
const cardsPlayer = []
const cardsDealer = []
///sum variable to keep track of score in hand
const sumPlayer = 0
const sumDealer = 0
const bank = 300
const message = ''
const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
const faces = [
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
const randomCard = () => {
  let randomize = Math.floor(Math.random() * 13)
  if (randomize > 10) {
    return 10
  } else if (randomize === 1) {
    return 11
  } else {
    return randomize
  }
}

///how to start game (ie deal cards)
const startGame = () => {
  console.log('test')
  stillPlaying = true
  const firstCard = randomCard()
  const secondCard = randomCard()
  const thirdCard = randomCard()
  const fourthCard = randomCard()
  cardsHandArr.push(firstCard)
  cardsHandArr.push(secondCard)
  dealerHandArr.push(firstCard)
  dealerHandArr.push(secondCard)
  sumPlayer = firstCard + secondCard
  sumDealer = thirdCard + fourthCard
  playGame()
}

///render game(ie play hand) - how to add cards to screen and render messages based on sum of cards; if blackjack or higher than dealer + $100 once game reaches $1000 refer to winner.html
const playGame = () => {
  cardsHand.innerText = 'Cards ~ '
  dealerHand.innerText = 'Dealer ~ '
  for (let i = 0; i < cardsHand.length; i++) {
    cardsHand.textContent + cardsHand[i]
  }
  for (let i = 0; i < dealerHand.length; i++) {
    dealerHand.textContent + dealerHand[i]
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
const newHand = () => {
  cardsPlayer = []
  cardsDealer = []
  sumPlayer = 0
  sumDealer = 0
  blackJack = false
  startGame()
}

//Event Listeners
btn.addEventListener('click', startGame)
bttn.addEventListener('click', dealCard)
button.addEventListener('click', newHand)
