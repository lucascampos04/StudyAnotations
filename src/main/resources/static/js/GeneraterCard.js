let cardCount = 1;

function createNewinput() {
    let newInput = document.createElement('input');
    newInput.type = 'text'; // Correção aqui
    newInput.classList.add('form-control', 'note-input');
    newInput.placeholder = "Nova Anotação";

    var noteInputsContainer = this.parentElement.querySelector('.note-inputs');
    noteInputsContainer.appendChild(newInput);
}

function createNewCard() {
    var newCard = document.createElement('div');
    newCard.classList.add('card', 'my-2');

    newCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Título do Card ${cardCount}</h5>
      <!-- Botão de adição -->
      <button class="btn btn-success btn-add-inputs">
        <i class="fas fa-plus"></i>
      </button>
      <!-- Inputs de anotações -->
      <div class="note-inputs">
        <input type="text" class="form-control note-input" placeholder="Anotação 1">
      </div>
    </div>
  `;

    var mainContainer = document.querySelector('main');
    mainContainer.appendChild(newCard);

    newCard.querySelector('.btn-add-inputs').addEventListener('click', createNewinput);

    var currentCard = document.querySelector('.card:last-of-type');
    var currentNoteinputs = currentCard.querySelector(".note-inputs");
    var currentInputs = currentNoteinputs.querySelectorAll('.note-input');
    currentInputs.forEach((input) => {
        input.value = '';
    });
    cardCount++;
}

document.querySelector('#navbarNav .btn-primary').addEventListener('click', createNewCard);
