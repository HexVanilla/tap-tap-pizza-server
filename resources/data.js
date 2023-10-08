const pizzaBase = {
  img: '/toppings/base-pizza.png',
}

const ingredients = {
  anchovies: {
    name: 'anchovies',
    toppings: '/toppings/anchovies.png',
    icon: '/icons/anchovies.png',
  },
  beef: {
    name: 'beef',
    toppings: '/toppings/beef.png',
    icon: '/icons/beef.png',
  },
  bacon: {
    name: 'bacon',
    toppings: '/toppings/bacon.png',
    icon: '/icons/bacon.png',
  },
  chicken: {
    name: 'chicken',
    toppings: '/toppings/chicken.png',
    icon: '/icons/chicken.png',
  },
  corn: {
    name: 'corn',
    toppings: '/toppings/corn.png',
    icon: '/icons/corn.png',
  },
  green_pepper: {
    name: 'green_pepper',
    toppings: '/toppings/green_pepper.png',
    icon: '/icons/green_pepper.png',
  },
  ham: {
    name: 'ham',
    toppings: '/toppings/ham.png',
    icon: '/icons/ham.png',
  },
  mushrooms: {
    name: 'mushrooms',
    toppings: '/toppings/mushrooms.png',
    icon: '/icons/mushrooms.png',
  },
  olives: {
    name: 'olives',
    toppings: '/toppings/olives.png',
    icon: '/icons/olives.png',
  },
  onions: {
    name: 'onions',
    toppings: '/toppings/onions.png',
    icon: '/icons/onions.png',
  },
  pepperoni: {
    name: 'pepperoni',
    toppings: '/toppings/pepperoni.png',
    icon: '/icons/pepperoni.png',
  },
  pineapple: {
    name: 'pineapple',
    toppings: '/toppings/pineapple.png',
    icon: '/icons/pineapple.png',
  },

  red_pepper: {
    name: 'red_pepper',
    toppings: '/toppings/red_pepper.png',
    icon: '/icons/red_pepper.png',
  },
  shrimp: {
    name: 'shrimp',
    toppings: '/toppings/shrimp.png',
    icon: '/icons/shrimp.png',
  },
  tomato: {
    name: 'tomato',
    toppings: '/toppings/tomato.png',
    icon: '/icons/tomato.png',
  },
  yellow_jalapeno: {
    name: 'yellow_jalapeno',
    toppings: '/toppings/yellow_jalapeno.png',
    icon: '/icons/yellow_jalapeno.png',
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
