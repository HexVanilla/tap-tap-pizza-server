const pizzaBase = {
  img: 'http://143.110.151.199/toppings/base-pizza.png',
}

const ingredients = {
  anchovies: {
    name: 'anchovies',
    toppings: 'http://143.110.151.199/toppings/anchovies.png',
    icon: 'http://143.110.151.199/icons/anchovies.png',
  },
  beef: {
    name: 'beef',
    toppings: 'http://143.110.151.199/toppings/beef.png',
    icon: 'http://143.110.151.199/icons/beef.png',
  },
  bacon: {
    name: 'bacon',
    toppings: 'http://143.110.151.199/toppings/bacon.png',
    icon: 'http://143.110.151.199/icons/bacon.png',
  },
  chicken: {
    name: 'chicken',
    toppings: 'http://143.110.151.199/toppings/chicken.png',
    icon: 'http://143.110.151.199/icons/chicken.png',
  },
  corn: {
    name: 'corn',
    toppings: 'http://143.110.151.199/toppings/corn.png',
    icon: 'http://143.110.151.199/icons/corn.png',
  },
  green_pepper: {
    name: 'green_pepper',
    toppings: 'http://143.110.151.199/toppings/green_pepper.png',
    icon: 'http://143.110.151.199/icons/green_pepper.png',
  },
  ham: {
    name: 'ham',
    toppings: 'http://143.110.151.199/toppings/ham.png',
    icon: 'http://143.110.151.199/icons/ham.png',
  },
  mushrooms: {
    name: 'mushrooms',
    toppings: 'http://143.110.151.199/toppings/mushrooms.png',
    icon: 'http://143.110.151.199/icons/mushrooms.png',
  },
  olives: {
    name: 'olives',
    toppings: 'http://143.110.151.199/toppings/olives.png',
    icon: 'http://143.110.151.199/icons/olives.png',
  },
  onions: {
    name: 'onions',
    toppings: 'http://143.110.151.199/toppings/onions.png',
    icon: 'http://143.110.151.199/icons/onions.png',
  },
  pepperoni: {
    name: 'pepperoni',
    toppings: 'http://143.110.151.199/toppings/pepperoni.png',
    icon: 'http://143.110.151.199/icons/pepperoni.png',
  },
  pineapple: {
    name: 'pineapple',
    toppings: 'http://143.110.151.199/toppings/pineapple.png',
    icon: 'http://143.110.151.199/icons/pineapple.png',
  },

  red_pepper: {
    name: 'red_pepper',
    toppings: 'http://143.110.151.199/toppings/red_pepper.png',
    icon: 'http://143.110.151.199/icons/red_pepper.png',
  },
  shrimp: {
    name: 'shrimp',
    toppings: 'http://143.110.151.199/toppings/shrimp.png',
    icon: 'http://143.110.151.199/icons/shrimp.png',
  },
  tomato: {
    name: 'tomato',
    toppings: 'http://143.110.151.199/toppings/tomato.png',
    icon: 'http://143.110.151.199/icons/tomato.png',
  },
  yellow_jalapeno: {
    name: 'yellow_jalapeno',
    toppings: 'http://143.110.151.199/toppings/yellow_jalapeno.png',
    icon: 'http://143.110.151.199/icons/yellow_jalapeno.png',
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
