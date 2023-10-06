const pizzaBase = {
  img: 'http://localhost:3000/toppings/base-pizza.png',
}

const ingredients = {
  anchovies: {
    name: 'anchovies',
    toppings: 'http://localhost:3000/toppings/anchovies.png',
    icon: 'http://localhost:3000/icons/anchovies.png',
  },
  beef: {
    name: 'beef',
    toppings: 'http://localhost:3000/toppings/beef.png',
    icon: 'http://localhost:3000/icons/beef.png',
  },
  bacon: {
    name: 'bacon',
    toppings: 'http://localhost:3000/toppings/bacon.png',
    icon: 'http://localhost:3000/icons/bacon.png',
  },
  chicken: {
    name: 'chicken',
    toppings: 'http://localhost:3000/toppings/chicken.png',
    icon: 'http://localhost:3000/icons/chicken.png',
  },
  corn: {
    name: 'corn',
    toppings: 'http://localhost:3000/toppings/corn.png',
    icon: 'http://localhost:3000/icons/corn.png',
  },
  green_pepper: {
    name: 'green_pepper',
    toppings: 'http://localhost:3000/toppings/green_pepper.png',
    icon: 'http://localhost:3000/icons/green_pepper.png',
  },
  ham: {
    name: 'ham',
    toppings: 'http://localhost:3000/toppings/ham.png',
    icon: 'http://localhost:3000/icons/ham.png',
  },
  mushrooms: {
    name: 'mushrooms',
    toppings: 'http://localhost:3000/toppings/mushrooms.png',
    icon: 'http://localhost:3000/icons/mushrooms.png',
  },
  olives: {
    name: 'olives',
    toppings: 'http://localhost:3000/toppings/olives.png',
    icon: 'http://localhost:3000/icons/olives.png',
  },
  onions: {
    name: 'onions',
    toppings: 'http://localhost:3000/toppings/onions.png',
    icon: 'http://localhost:3000/icons/onions.png',
  },
  pepperoni: {
    name: 'pepperoni',
    toppings: 'http://localhost:3000/toppings/pepperoni.png',
    icon: 'http://localhost:3000/icons/pepperoni.png',
  },
  pineapple: {
    name: 'pineapple',
    toppings: 'http://localhost:3000/toppings/pineapple.png',
    icon: 'http://localhost:3000/icons/pineapple.png',
  },

  red_pepper: {
    name: 'red_pepper',
    toppings: 'http://localhost:3000/toppings/red_pepper.png',
    icon: 'http://localhost:3000/icons/red_pepper.png',
  },
  shrimp: {
    name: 'shrimp',
    toppings: 'http://localhost:3000/toppings/shrimp.png',
    icon: 'http://localhost:3000/icons/shrimp.png',
  },
  tomato: {
    name: 'tomato',
    toppings: 'http://localhost:3000/toppings/tomato.png',
    icon: 'http://localhost:3000/icons/tomato.png',
  },
  yellow_jalapeno: {
    name: 'yellow_jalapeno',
    toppings: 'http://localhost:3000/toppings/yellow_jalapeno.png',
    icon: 'http://localhost:3000/icons/yellow_jalapeno.png',
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
  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
    this.points = 0
    this.answer = ''
    this.recipeAckTimestamp = 0
    this.answerTimestamp = 0
  }
}

module.exports = { pizzaBase, ingredients, Round, Recipe, Player }
