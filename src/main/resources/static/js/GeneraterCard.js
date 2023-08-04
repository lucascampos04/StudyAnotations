let cardCount = 1;

function createNewinput() {
    let newInput = document.createElement('input');
    newInput.type = 'text'; // Correção aqui
    newInput.classList.add('form-control', 'note-input');
    newInput.placeholder = "Nova Anotação";

    var noteInputsContainer = this.parentElement.querySelector('.note-inputs');
    noteInputsContainer.appendChild(newInput);
}

function deleteCard(cardElement) {
    cardElement.remove();
    saveCardsToLocalStorage();
}

function createNewCard(title = `Título do Card ${cardCount}`, notes = []) {
    let newCol = document.createElement('div');
    newCol.classList.add('col-md-4', 'my-2'); // Classes do Bootstrap para layout responsivo

    // Cria o card dentro da coluna
    let newCard = document.createElement('div');
    newCard.classList.add('card');

    // Estrutura do card
    newCard.innerHTML = `
        <div class="card-body">
            <input type="text" class="form-control note-input text-center font-weight-bold" placeholder="Ex: Título" style="width: 100%; border: none" value="${title}">
            <button class="btn btn-success btn-add-inputs">
                <i class="fas fa-plus"></i>
            </button>
            <br>
            <br>
            <div class="note-inputs">
                <input type="text" class="form-control note-input mb-2" placeholder="Anotação 1" value="${notes[0] || ''}">
            </div>
            <span>
                <div class="text-right mt-2">
                <button class="btn btn-primary">Salvar
                    <i class="bi bi-check-circle text-success"></i>
                </button>
            </div>
            <div class="text-right mt-2">
                <button class="btn btn-danger btn-remove-card">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            </span>
        </div>
    `;

    // Adiciona o novo card à "row" dentro do "main"
    const mainContainer = document.querySelector('main');
    const rowContainer = document.getElementById('cards-container');
    rowContainer.appendChild(newCol);
    newCol.appendChild(newCard);

    newCard.querySelector('.btn-add-inputs').addEventListener('click', createNewinput);
    newCard.querySelector('.btn-remove-card').addEventListener('click', () => deleteCard(newCol));

    var currentCard = document.querySelector('.card:last-of-type');
    var currentNoteinputs = currentCard.querySelector(".note-inputs");
    var currentInputs = currentNoteinputs.querySelectorAll('.note-input');
    currentInputs.forEach((input, index) => {
        input.value = notes[index] || '';
    });
    cardCount++;
}

function saveCardsToLocalStorage() {
    const cardsContainer = document.getElementById('cards-container');
    const cards = cardsContainer.querySelectorAll('.col-md-4');
    const cardsData = [];

    cards.forEach((card) => {
        const title = card.querySelector('.card-title').textContent;
        const noteInputs = card.querySelectorAll('.note-input');
        const notes = Array.from(noteInputs).map((input) => input.value);

        cardsData.push({ title, notes });
    });

    localStorage.setItem('cardsData', JSON.stringify(cardsData));
}

function saveCardToLocalStorage(title, notes) {
    const cardsData = JSON.parse(localStorage.getItem('cardsData')) || [];
    cardsData.push({ title, notes });
    localStorage.setItem('cardsData', JSON.stringify(cardsData));
}

function loadCardsFromLocalStorage() {
    const cardsData = JSON.parse(localStorage.getItem('cardsData'));

    if (cardsData) {
        cardsData.forEach((data) => {
            createNewCard(data.title, data.notes);
        });
    }
}

function init() {
    loadCardsFromLocalStorage();
    document.querySelector('#navbarNav .btn-primary').addEventListener('click', createNewCard);
}

window.addEventListener('load', init);