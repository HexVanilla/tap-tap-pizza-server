const pizzaBase = {
  img: 'https://api.elconejo.info/toppings/base-pizza.png',
}

const ingredients = {
  anchovies: {
    name: 'anchovies',
    toppings: 'https://api.elconejo.info/toppings/anchovies.png',
    icon: 'https://api.elconejo.info/icons/anchovies.png',
  },
  beef: {
    name: 'beef',
    toppings: 'https://api.elconejo.info/toppings/beef.png',
    icon: 'https://api.elconejo.info/icons/beef.png',
  },
  bacon: {
    name: 'bacon',
    toppings: 'https://api.elconejo.info/toppings/bacon.png',
    icon: 'https://api.elconejo.info/icons/bacon.png',
  },
  chicken: {
    name: 'chicken',
    toppings: 'https://api.elconejo.info/toppings/chicken.png',
    icon: 'https://api.elconejo.info/icons/chicken.png',
  },
  corn: {
    name: 'corn',
    toppings: 'https://api.elconejo.info/toppings/corn.png',
    icon: 'https://api.elconejo.info/icons/corn.png',
  },
  green_pepper: {
    name: 'green_pepper',
    toppings: 'https://api.elconejo.info/toppings/green_pepper.png',
    icon: 'https://api.elconejo.info/icons/green_pepper.png',
  },
  ham: {
    name: 'ham',
    toppings: 'https://api.elconejo.info/toppings/ham.png',
    icon: 'https://api.elconejo.info/icons/ham.png',
  },
  mushrooms: {
    name: 'mushrooms',
    toppings: 'https://api.elconejo.info/toppings/mushrooms.png',
    icon: 'https://api.elconejo.info/icons/mushrooms.png',
  },
  olives: {
    name: 'olives',
    toppings: 'https://api.elconejo.info/toppings/olives.png',
    icon: 'https://api.elconejo.info/icons/olives.png',
  },
  onions: {
    name: 'onions',
    toppings: 'https://api.elconejo.info/toppings/onions.png',
    icon: 'https://api.elconejo.info/icons/onions.png',
  },
  pepperoni: {
    name: 'pepperoni',
    toppings: 'https://api.elconejo.info/toppings/pepperoni.png',
    icon: 'https://api.elconejo.info/icons/pepperoni.png',
  },
  pineapple: {
    name: 'pineapple',
    toppings: 'https://api.elconejo.info/toppings/pineapple.png',
    icon: 'https://api.elconejo.info/icons/pineapple.png',
  },

  red_pepper: {
    name: 'red_pepper',
    toppings: 'https://api.elconejo.info/toppings/red_pepper.png',
    icon: 'https://api.elconejo.info/icons/red_pepper.png',
  },
  shrimp: {
    name: 'shrimp',
    toppings: 'https://api.elconejo.info/toppings/shrimp.png',
    icon: 'https://api.elconejo.info/icons/shrimp.png',
  },
  tomato: {
    name: 'tomato',
    toppings: 'https://api.elconejo.info/toppings/tomato.png',
    icon: 'https://api.elconejo.info/icons/tomato.png',
  },
  yellow_jalapeno: {
    name: 'yellow_jalapeno',
    toppings: 'https://api.elconejo.info/toppings/yellow_jalapeno.png',
    icon: 'https://api.elconejo.info/icons/yellow_jalapeno.png',
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
