//Global Variables
let deck = []
let card = ''
///sum variable to keep track of score in hand
let sumPlayer = 0
let sumDealer = 0
let amount = 0
let bank = 300
let message = document.getElementById('message')
let suits = ['♣', '♦', '♥', '♠']
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
let gameOver = false
let playerWins = false
let blackJack = false
const btn = document.getElementById('start')
const bttn = document.getElementById('hit')
const buttn = document.getElementById('stay')
const btton = document.getElementById('replay')
const cardsHand = document.getElementById('pcard')
const dealerHand = document.getElementById('dcard')
const playerBank = document.getElementById('bank')
let cardsHandArr = []
let dealerHandArr = []
playerBank.innerHTML = 'Bank ~ $' + bank

//Functions below

///how to randomize cards to go into players/dealers hand
const buildDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < faces.length; x++) {
      let card = { Suit: suits[i], Faces: faces[x] }
      deck.push(card)
    }
  }
  return deck
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
}

///how to start game (ie deal cards) -- stop and return
const startGame = () => {
  buildDeck()
  shuffle()
  dealCards()
  playGame()
}

///render game(ie play hand) - how to add cards to screen and render messages based on sum of cards; if blackjack or higher than dealer + $100 once game reaches $1000 refer to winner.html
const playGame = () => {
  cardsHand.append(
    cardsHandArr[0].Faces,
    ' of ' +
      cardsHandArr[0].Suit +
      ' & ' +
      cardsHandArr[1].Faces +
      ' of ' +
      cardsHandArr[1].Suit
  )
  dealerHand.append(
    cardsHandArr[2].Faces,
    ' of ' +
      cardsHandArr[2].Suit +
      ' & ' +
      cardsHandArr[3].Faces +
      ' of ' +
      cardsHandArr[3].Suit
  )
  updateSum()
  //endGame()
}

///deal new card if requested -- stop and return
let dealCard = () => {
  if (gameOver === false && blackJack === false) {
    card = deck.pop(card)
    cardsHandArr.push(card)
    cardsHand.append(
      ' & ' + cardsHandArr[4].Faces,
      ' of ' + cardsHandArr[4].Suit
    )
    updateSum()
    // //endGame()
  }
}

//Get card values
let getCardValue = (card) => {
  switch (card.Faces) {
    case 'Ace':
      return 1
    case 'Two':
      return 2
    case 'Three':
      return 3
    case 'Four':
      return 4
    case 'Five':
      return 5
    case 'Six':
      return 6
    case 'Seven':
      return 7
    case 'Eight':
      return 8
    case 'Nine':
      return 9
    default:
      return 10
  }
}

//check for end of game scenario
const endGame = () => {
  updateSum()
  if (gameOver) {
    while (sumDealer < sumPlayer && sumPlayer <= 21 && sumDealer <= 21) {
      dealerHand.dealCard()
      updateSum()
    }
  }
  if (sumPlayer > 21) {
    playerWins = false
    gameOver = true
  } else if ((sumPlayer = 21)) {
    playerWins = true
    blackJack = true
    gameOver = true
    bank += 100
  } else if (sumDealer > 21) {
    playerWins = true
    gameOver = true
    bank += 100
  } else if (gameOver) {
    if (sumPlayer > sumDealer) {
      playerWins = true
      bank += 100
    } else {
      playerWins = false
    }
  }
  if ((bank = 1000)) {
    gameOver = true
  }
}

const stayHand = () => {
  gameOver = true
  endGame()
  updateSum()
}

//replay to play next hand
const newHand = () => {
  //reset player and dealer cards
  sumPlayer = 0
  sumDealer = 0
  gameOver = false
  playerWins = false
  blackJack = false
  startGame()
}

let updateSum = () => {
  sumPlayer = getSum(cardsHandArr)
  sumDealer = getSum(dealerHandArr)
}

let getSum = (cardsHandArr) => {
  let sum = 0
  let ace = false
  for (let i = 0; i < cardsHandArr.length; i++) {
    let card = cardsHandArr[i]
    sum += card.value
    if (card.faces == 'Ace') {
      ace = true
    }
    if (ace && sum + 10 <= 21) {
      return sum + 10
    }
  }
  return sum
}

//Event Listeners
btn.addEventListener('click', startGame)
bttn.addEventListener('click', dealCard)
buttn.addEventListener('click', stayHand)
btton.addEventListener('click', newHand)
