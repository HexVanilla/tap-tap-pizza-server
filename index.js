const { express, app, httpServer, io } = require('./serverSetup')
const path = require('path')
const { db, getSnapshot } = require('./config/adminSDK')
const {
  startNewRound,
  checkAnswer,
  updatePlayer,
  updateAllPlayers,
  getUpdatedPlayerList,
  addRound,
  getUpdatedRounds,
  persistPlayers,
  fetchPlayerData,
} = require('./resources/gameLogic')

app.use('/icons', express.static(path.join(__dirname, 'resources/icons')))
app.use('/toppings', express.static(path.join(__dirname, 'resources/toppings')))
app.use('/ads', express.static(path.join(__dirname, 'resources/ads')))
const { pizzaBase, ingredients, Round, Player } = require('./resources/data')

function getCurrentRound() {
  try {
    let rounds = getUpdatedRounds()
    return rounds[rounds.length - 1]
  } catch (error) {
    console.log('Error fetching current round, ' + error)
  }
}

function firstRound() {
  try {
    const firstRound = startNewRound(new Round(0, ['onions', 'beef', 'corn']))
    addRound(firstRound)
    io.emit('newRound', {
      roundNumber: firstRound.number,
      roundRecipe: firstRound.recipe,
    })
  } catch (error) {
    console.log('Error starting first round, ' + error)
  }
}

//Server Start
fetchPlayerData()
firstRound()

io.on('connection', async (socket) => {
  try {
    const sockets = await io.fetchSockets()
    console.log(`A user connected. Total connections: ${sockets.length}`)
  } catch (error) {
    console.log(`Error fetching sockets, ${error}`)
  }

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected due to:', reason)
    if (reason === 'io server disconnect') {
      socket.connect() // Try to reconnect if server caused the disconnect
    }
  })

  socket.on('onMyPlayer', async (data, ackCallback) => {
    try {
      console.log('onMyPlayer', data)
      let players = getUpdatedPlayerList()
      if (players[data.uid]) {
        ackCallback({
          points: players[data.uid].points,
          nickname: players[data.uid].name,
        })
      } else {
        const newPlayer = new Player(data.uid, data.email)
        updatePlayer(newPlayer)
        ackCallback({
          points: newPlayer.points,
          nickname: newPlayer.name,
        })
      }
    } catch (error) {
      console.log(`Error handling my player data, ${error}`)
    }
  })

  socket.on('setNickname', async (data, ackCallback) => {
    try {
      console.log('atSetNickname', data)

      let players = getUpdatedPlayerList()
      if (players[data.uid]) {
        players[data.uid].name = data.nickname
      }
      persistPlayers(players[data.uid])
      ackCallback({ nickname: players[data.uid].name })
    } catch (error) {
      console.log(`Error seting users nickname, ${error}`)
    }
  })

  socket.on('onGame', async (data, ackCallback) => {
    try {
      //Check if data is valid (not {}) and player isnt already created then ads new player
      if (Object.keys(data).length > 0) {
        let newPlayer = new Player(data.uid, '', data.email)
        let players = getUpdatedPlayerList()
        if (!players[newPlayer.id]) {
          players[newPlayer.id] = newPlayer
        }
        console.log('players list', players)
      }

      ackCallback({
        ingredients: ingredients,
        pizza: pizzaBase,
        roundNumber: getCurrentRound().number,
        roundRecipe: getCurrentRound().recipe,
      })
    } catch (error) {
      console.log(`Error handling hosting landing data, ${error}`)
    }
  })

  socket.on('playerAnswer', async (data, ackCallback) => {
    try {
      let currentRound = getCurrentRound()
      if (currentRound.status === 'running') {
        let players = getUpdatedPlayerList()
        if (players[data.uid]) {
          players[data.uid].answer = data.answer
          players[data.uid].recipeAckTimestamp = data.recipeAckTimestamp
          players[data.uid].answerTimestamp = data.answerTimestamp
          checkAnswer(currentRound, players[data.uid])
          ackCallback({
            res: 'answer received',
          })
        } else {
          console.log('Answer- Player doesnt exists')
        }
      } else {
        ackCallback({
          res: 'answer out of time!',
        })
        console.log('Round already finshed')
      }
    } catch (error) {
      console.log(`Error handling player answer, ${error}`)
    }
  })

  socket.on('onLeaderboard', async (data, ackCallback) => {
    try {
      let players = getUpdatedPlayerList()
      if (players[data.uid]) {
        ackCallback({
          players: players,
          playerNickname: players[data.uid].name,
        })
      } else {
        console.log('Leaderboard- Player doesnt exists')
        ackCallback({
          players: players,
          playerNickname: '',
        })
      }
    } catch (error) {
      console.log(`Error handling leaderboard data, ${error}`)
    }
  })
})

httpServer.listen(3000)
