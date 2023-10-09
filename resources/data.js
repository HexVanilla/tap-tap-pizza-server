const path = 'https://api.elconejo.info' //'https://api.elconejo.info' - http://localhost:3000

const pizzaBase = {
  img: `${path}/toppings/base-pizza.png`,
}
const ingredients = {
  anchovies: {
    name: `anchovies`,
    toppings: `${path}/toppings/anchovies.png`,
    icon: `${path}/icons/anchovies.png`,
  },
  beef: {
    name: `beef`,
    toppings: `${path}/toppings/beef.png`,
    icon: `${path}/icons/beef.png`,
  },
  bacon: {
    name: `bacon`,
    toppings: `${path}/toppings/bacon.png`,
    icon: `${path}/icons/bacon.png`,
  },
  chicken: {
    name: `chicken`,
    toppings: `${path}/toppings/chicken.png`,
    icon: `${path}/icons/chicken.png`,
  },
  corn: {
    name: `corn`,
    toppings: `${path}/toppings/corn.png`,
    icon: `${path}/icons/corn.png`,
  },
  green_pepper: {
    name: `green_pepper`,
    toppings: `${path}/toppings/green_pepper.png`,
    icon: `${path}/icons/green_pepper.png`,
  },
  ham: {
    name: `ham`,
    toppings: `${path}/toppings/ham.png`,
    icon: `${path}/icons/ham.png`,
  },
  mushrooms: {
    name: `mushrooms`,
    toppings: `${path}/toppings/mushrooms.png`,
    icon: `${path}/icons/mushrooms.png`,
  },
  olives: {
    name: `olives`,
    toppings: `${path}/toppings/olives.png`,
    icon: `${path}/icons/olives.png`,
  },
  onions: {
    name: `onions`,
    toppings: `${path}/toppings/onions.png`,
    icon: `${path}/icons/onions.png`,
  },
  pepperoni: {
    name: `pepperoni`,
    toppings: `${path}/toppings/pepperoni.png`,
    icon: `${path}/icons/pepperoni.png`,
  },
  pineapple: {
    name: `pineapple`,
    toppings: `${path}/toppings/pineapple.png`,
    icon: `${path}/icons/pineapple.png`,
  },

  red_pepper: {
    name: `red_pepper`,
    toppings: `${path}/toppings/red_pepper.png`,
    icon: `${path}/icons/red_pepper.png`,
  },
  shrimp: {
    name: `shrimp`,
    toppings: `${path}/toppings/shrimp.png`,
    icon: `${path}/icons/shrimp.png`,
  },
  tomato: {
    name: `tomato`,
    toppings: `${path}/toppings/tomato.png`,
    icon: `${path}/icons/tomato.png`,
  },
  yellow_jalapeno: {
    name: `yellow_jalapeno`,
    toppings: `${path}/toppings/yellow_jalapeno.png`,
    icon: `${path}/icons/yellow_jalapeno.png`,
  },
}

class Round {
  constructor(number, recipe) {
    this.number = number
    this.recipe = recipe
    this.status = 'idle'
    this.correct = []
    this.winner = ''
    this.hasFirstAnswer = false
  }
  getRoundNumber() {
    return this.number
  }
  getRecipe() {
    return this.recipe
  }
  startRound() {
    this.status = 'running'
  }
  finishRound() {
    this.status = 'finished'
  }
  addToCorrectAnswers(player) {
    this.correct.push(player)
  }
  setWinner(playerId) {
    this.winner = playerId
  }
  setHasFirstAnswer() {
    this.hasFirstAnswer = true
  }
}

class Recipe {
  constructor(id, ingredients) {
    this.id = id
    this.ingredients = ingredients
  }
  getRecipe() {
    return this.ingredients
  }
}

class Player {
  constructor(id, email) {
    this.id = id
    this.name = ''
    this.email = email
    this.points = 0
    this.answer = ''
    this.recipeAckTimestamp = 0
    this.answerTimestamp = 0
  }
}

module.exports = { pizzaBase, ingredients, Round, Recipe, Player }
