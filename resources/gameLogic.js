const { ingredients, Round, Recipe } = require('./data')
const { db, getSnapshot } = require('../config/adminSDK')
const { io } = require('../serverSetup')

const rounds = []
let players = {}

function addRound(round) {
  rounds.push(round)
}

function getUpdatedRounds() {
  return rounds
}

function updatePlayer(newPlayer) {
  console.log('newPlayer', newPlayer)
  players[newPlayer.id] = { ...newPlayer }
  console.log('newPlayers', players)
}

function updateAllPlayers(allPlayers) {
  console.log('oldPlayers', players)
  players = allPlayers
  console.log('newPlayers', players)
}

function getUpdatedPlayerList() {
  return players
}

function startNewRound(prevRound) {
  try {
    const roundNumber = prevRound.number + 1
    const recipe = makeRecipe()
    const newRound = new Round(roundNumber, recipe)
    newRound.startRound()
    rounds.push(newRound)
    return newRound
  } catch (error) {
    console.log('Error starting a new round, ' + error)
  }
}

function makeRecipe() {
  try {
    const ingredientsNumber = getRandomInt(3, 8) //3,13
    const ingredientsList = []
    const usedNumbers = []
    while (ingredientsList.length < ingredientsNumber) {
      let newRandomInt = getRandomInt(0, Object.values(ingredients).length)

      if (!usedNumbers.includes(newRandomInt)) {
        usedNumbers.push(newRandomInt)
        ingredientsList.push(newRandomInt)
      }
    }
    const ingredientsAsText = []
    ingredientsList.forEach((i) => {
      ingredientsAsText.push(Object.values(ingredients)[i].name)
    })
    return new Recipe('temporalId', ingredientsAsText)
  } catch (error) {
    console.log('Error making recipe, ' + error)
  }
}

function getRandomInt(a, b) {
  const min = Math.ceil(a)
  const max = Math.floor(b)
  return Math.floor(Math.random() * (max - min) + min)
}

function checkAnswer(currentRound, playerData) {
  try {
    console.log('Checking Answer')
    console.log(currentRound)
    console.log(playerData)
    if (
      playerData.answer.length === currentRound.getRecipe().ingredients.length
    ) {
      for (let i = 0; i < playerData.answer.length; i++) {
        if (
          !currentRound.getRecipe().ingredients.includes(playerData.answer[i])
        ) {
          console.log('Wrong, Round still running')
          return
        }
      }
      if (!currentRound.hasFirstAnswer) {
        currentRound.setHasFirstAnswer()
        currentRound.addToCorrectAnswers(playerData)
        console.log('First Correct Answer!, Next Round in 3...')
        setTimeout(() => {
          pickWinner(currentRound)
        }, 8000)
      } else {
        console.log('Another Correct answer')
        currentRound.addToCorrectAnswers(playerData)
      }
    }
  } catch (error) {
    console.log('Error checking answers, ' + error)
  }
}

function pickWinner(currentRound) {
  console.log('Pick Winner')
  //currentRound.setWinner(currentRound.correct[0].id)

  let playerToTime = {}
  console.log('correct Round', currentRound)
  console.log('correct list', currentRound.correct)

  currentRound.correct.forEach((player) => {
    playerToTime[player.id] = {
      id: player.id,
      name: player.name,
      time: player.answerTimestamp - player.recipeAckTimestamp,
    }
  })

  console.log('playerToTime', playerToTime)

  let ptt = Object.values(playerToTime)
  let fastestPlayer = ptt[0]
  const winner = () => {
    for (let i = 1; i < ptt.length; i++) {
      if (ptt[i].time < fastestPlayer.time) fastestPlayer = ptt[i]
    }
  }
  winner()

  console.log('winner', fastestPlayer)

  currentRound.setWinner(fastestPlayer)
  //Assign points go to next round
  if (players[currentRound.winner]) {
    players[currentRound.winner].points += 10
    io.emit('roundWinner', {
      roundWinner: currentRound.winner,
    })
    persistPlayers(players[currentRound.winner])
    finishRound(currentRound)
  } else {
    console.log('Winner- Player doesnt exists')
  }
}

function finishRound(currentRound) {
  try {
    currentRound.finishRound()
    const newRound = startNewRound(currentRound)
    io.emit('newRound', {
      roundNumber: newRound.number,
      roundRecipe: newRound.recipe,
    })
  } catch (error) {
    console.log('Error finishing round, ' + error)
  }
}

function persistPlayers(player) {
  db.ref(`players/${player.id}`).set(player, (error) => {
    if (error) {
      console.error(`Failed to persist player ${player.id} data:`, error)
    }
  })
}

module.exports = {
  startNewRound,
  checkAnswer,
  updatePlayer,
  updateAllPlayers,
  getUpdatedPlayerList,
  addRound,
  getUpdatedRounds,
  persistPlayers,
}
