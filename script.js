//Global Variables
const player = document.querySelector(input).value
const cards = []
///sum variable to keep track of score in hand
const sum = 0
const bank = 300
const message = ''
const blackJack = false
const stillPlaying = false
const btn = document.getElementById('start')
const bttn = document.getElementById('hit')
///const button for replay to be made here
const cardsHand = document.getElementById('cards')
const playerLayout = document.getElementById('player')
///printout playername and current bank below

//Functions below
///how to randomize cards to go into players hand
const randomCard = () => {}

///how to start game (ie deal cards)
const startGame = () => {
  stillPlaying = true
  const firstCard = randomCard()
  const secondCard = randomCard()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard
  playGame()
}

//render game(ie play hand)
const playGame = () => {
  cardsHand.innerText = 'Cards: '
}

//deal new card if requested
const dealCard = () => {}

//Event Listeners
btn.addEventListener('click', startGame)
bttn.addEventListener('click', dealCard)
//button.addEventListener('click', newHand)
