document.addEventListener('DOMContentLoaded', () => {

  const container = document.createElement("div");
  container.classList.add("container-sm");
  document.body.prepend(container);


  const numbers = [
    1, 1, 2, 2,
    3, 3, 4, 4,
    5, 5, 6, 6,
    7, 7, 8, 8,
  ];


  createMenu()
  function createMenu() {
    const heading = document.createElement("h1");
    heading.classList.add("mt-5");
    heading.textContent = `"Pairs" game`;
    container.prepend(heading);

    const description = document.createElement("h2");
    description.classList.add("fs-3", 'mb-4');
    description.textContent = `Try to find and match all the pairs`;
    container.append(description);

    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.classList.add("btn", "btn-primary", "mt-3");
    button.textContent = "Start game";
    container.append(button);

    button.addEventListener("click", (e) => {
      e.preventDefault;
      button.remove();
      gameStart();
    });
  }

  function gameStart() {
    shuffle(numbers)
    function shuffle(arr) {
      var j, temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }


    const card = (value) => {
      const card = document.createElement("button");
      card.classList.add('card-item', 'col');
      card.setAttribute('type', 'button')

      const cardFront = document.createElement('div')
      cardFront.classList.add('card__face', 'card__face--front')
      card.append(cardFront)

      const cardBack = document.createElement('div')
      cardBack.classList.add('card__face', 'card__face--back')

      card.append(cardBack)
      cardBack.textContent = value;
      return card;
    };


    const field = document.createElement("div");
    field.classList.add("d-flex", 'flex-column');
    field.setAttribute("id", "field");
    field.style.opacity = 0;
    container.append(field);

    fadeIn(field, 100)
    function fadeIn(el, speed) {
      let step = 1 / speed;
      let interval = setInterval(function() {
        if (+el.style.opacity >= 1)
          clearInterval(interval);

        el.style.opacity = +el.style.opacity + step;
      }, speed / 1000);
    }

    createCards()
    function createCards() {
      class Row {
        constructor() {
          this.elem = document.createElement('div');
          this.elem.classList.add('row', 'gx-0', 'scene');
        }
      }
      let row = new Row()

      const newLine = document.createElement('div')
      newLine.classList.add('w-100', 'justify-content-center')

      let count = 0;
      for (let i = numbers.length - 1; i >= -1; i--) {
        row.elem.append(card(numbers[i]))
        if (count < 3) {
          count++
        } else {
          field.append(row.elem)
          field.append(newLine)
          row = new Row()
          count = 0
        }
      }
    }

    for (const elem of document.getElementsByClassName('card-item')) {
      elem.addEventListener('click', flipCard)

      function flipCard() {
        elem.classList.toggle('is-flipped')
        compareCards(this)
      }
    }

    let card1;
    let card2;
    function compareCards(elem) {

      if (card1 === undefined ) {
        card1 = elem
        card1.value = elem.textContent

      } else if (card1 !== undefined && card2 === undefined) {
        card2 = elem
        card2.value = elem.textContent

        if (card2 === card1) {
          card1 = undefined
          card2 = undefined
          console.log('=');
          return
        }

        card1.value === card2.value ?
        matchSuccess() :
        closeCardTimer = setTimeout(noMatch, 400)

      } else {
        clearTimeout(closeCardTimer)
        noMatch()
        card1 = undefined
        card2 = undefined
        console.log('else');
      }
    }

    function matchSuccess() {
      card1.classList.add('is-flipped')
      card2.classList.add('is-flipped')
      card1.disabled = true
      card2.disabled = true
      card1 = undefined
      card2 = undefined

      gameScoreCounter()
    }

    let score = 0;
    function gameScoreCounter() {
      score++
      if (score < 8) {
        return
      } else {
        finish()
        score = 0
      }
    }

    function noMatch() {
      card1.classList.remove('is-flipped')
      card2.classList.remove('is-flipped')
      card1 = undefined
      card2 = undefined
    }
  }

  function finish() {
    for (const elem of document.getElementsByClassName('card__face--back')) {
      elem.style.backgroundColor = "#00a572";
    }

    const resetBtn = document.createElement('button')
    resetBtn.setAttribute('type', 'reset')
    resetBtn.classList.add('btn', 'btn-warning')
    resetBtn.textContent = "Restart"
    container.append(resetBtn)

    resetBtn.onclick = () => {
        resetBtn.remove()
        reset()
    }
  }

  function reset() {
    removeField()
    function removeField() {
      const field = document.getElementById('field')
      field.style.opacity = 1;

      let fieldFadeAway = setInterval(function() {
        if (field.style.opacity > 0) field.style.opacity -= .1;
        else {
        clearInterval(fieldFadeAway);
        field.remove();
        gameStart()
        }
      }, 30)
    }
  }
})
