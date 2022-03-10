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
let dealerWins = false
let blackJack = false
let playerStands = false
const btn = document.getElementById('start')
const bttn = document.getElementById('hit')
const buttn = document.getElementById('stay')
const btton = document.getElementById('replay')
let cardsHand = document.getElementById('pcard')
let dealerHand = document.getElementById('dcard')
let playerBank = document.getElementById('bank')
let cardsHandArr = []
let dealerHandArr = []
playerBank.innerHTML = 'Bank ~ $' + bank

//Functions below

//build deck and randomize cards to go into players/dealers hand
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

//deal cards into players and dealers hand
const dealCards = () => {
  for (let i = 0; i < 2; i++) {
    let cardP = deck.pop()
    let cardD = deck.pop()
    cardsHandArr.push(cardP)
    dealerHandArr.push(cardD)
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

//how to start game (ie deal cards) -- stop and return
const startGame = () => {
  buildDeck()
  shuffle()
  dealCards()
  playGame()
  btn.removeEventListener('click', startGame)
}

//render game(ie play hand) - how to add cards to screen and render messages based on sum of cards; if blackjack or higher than dealer + $100 once game reaches $1000
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
    dealerHandArr[0].Faces,
    ' of ' +
      dealerHandArr[0].Suit +
      ' & ' +
      dealerHandArr[1].Faces +
      ' of ' +
      dealerHandArr[1].Suit
  )
  updateSum()
  endGame()
}

//deal new card if requested
let dealCardNext = () => {
  if (gameOver === false && blackJack === false) {
    card = deck.pop(card)
    cardsHandArr.push(card)
    cardsHand.append(
      ' & ' + cardsHandArr[cardsHandArr.length - 1].Faces,
      ' of ' + cardsHandArr[cardsHandArr.length - 1].Suit
    )
    updateSum()
    endGame()
  }
}

//function for dealing of dealers hand
let dealerCardNext = () => {
  if (gameOver === false && blackJack === false) {
    card = deck.pop(card)
    dealerHandArr.push(card)
    dealerHand.append(
      ' & ' + dealerHandArr[dealerHandArr.length - 1].Faces,
      ' of ' + dealerHandArr[dealerHandArr.length - 1].Suit
    )
    updateSum()
    endGame()
  }
}

//Player elects to stay hand
const stayHand = () => {
  playerStands = true
  endGame()
}

// //check for end of game scenario
const endGame = () => {
  if (playerStands) {
    while (sumDealer < sumPlayer && sumPlayer <= 21 && sumDealer <= 21) {
      dealerCardNext()
      updateSum()
      endGame()
      return
    }
  }
  if (sumPlayer > 21) {
    playerWins = false
    dealerWins = true
    gameOver = true
  } else if (sumPlayer === 21) {
    playerWins = true
    blackJack = true
    gameOver = true
    // bank += 100
  } else if (sumDealer > 21) {
    playerWins = true
    gameOver = true
    // bank += 100
  } else if (playerStands) {
    if (sumPlayer > sumDealer) {
      playerWins = true
      // bank += 100
    } else {
      dealerWins = true
    }
  }
  messaging()
  banking()
}

//replay to play next hand
const newHand = () => {
  sumPlayer = 0
  sumDealer = 0
  gameOver = false
  playerWins = false
  blackJack = false
  cardsHandArr = []
  dealerHandArr = []
  message.innerText = 'Play on!'
  document.getElementById('pcard').innerHTML = []
  document.getElementById('dcard').innerHTML = []
  btn.addEventListener('click', startGame)
  bttn.addEventListener('click', dealCardNext)
}

//function to update sum of card arrays
let updateSum = () => {
  sumPlayer = getSum(cardsHandArr)
  sumDealer = getSumDealer(dealerHandArr)
}

//function to calculate sums player
let getSum = () => {
  let sum = 0
  // let ace = false
  for (let i = 0; i < cardsHandArr.length; i++) {
    let card = cardsHandArr[i]
    sum += getCardValue(card)
    // if (card.Faces === 'Ace') {
    //   ace = true
    // }
    // if (ace && sum + 10 <= 21) {
    //   return sum + 10
    // }
  }
  return sum
}

//function to calculate sums dealer
let getSumDealer = () => {
  let sum = 0
  // let ace = false
  for (let i = 0; i < dealerHandArr.length; i++) {
    let card = dealerHandArr[i]
    sum += getCardValue(card)
    // if (card.Faces === 'Ace') {
    //   ace = true
    // }
    // if (ace && sum + 10 <= 21) {
    //   return sum + 10
    // }
  }
  return sum
}

let messaging = () => {
  if (blackJack == true && playerWins == true) {
    message.innerText = 'Blackjack! You win!'
  } else if (playerWins == true) {
    message.innerText = 'You win!'
  } else if (dealerWins == true) {
    message.innerText = 'Dealer wins!'
  } else {
    message.innerText = 'Play on!'
  }
}

let banking = () => {
  if (blackJack == true && playerWins == true) {
    bank += 200
  } else if (playerWins == true) {
    bank += 100
  } else if (dealerWins == true) {
    bank -= 100
  }
}

//Event Listeners
btn.addEventListener('click', startGame)
bttn.addEventListener('click', dealCardNext)
buttn.addEventListener('click', stayHand)
btton.addEventListener('click', newHand)
