//selectores
const pokemonsContainer = document.querySelector('.pokemons-container');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const form = document.querySelector('.form-search-pokemon');
const input = document.querySelector('.pokemkon-input');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const times = document.querySelector('.times');
const spinner = document.querySelector('.spinner');

//variables
const numberPokemons = 9;
let limit = 9;
let offset = 1;


//llamar a ciclo fetch pokemons cuando carga la pagina por primera vez para obtener los primeros 9 pokemons
document.addEventListener('DOMContentLoaded', () => {
    fetchPokemons(offset, limit);
});


//fecht de la url para buscar un pokemon por id y despues crearlo con createPokemon funciont
async function fetchPokemon(id) {

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`  

  try {
    const response = await fetch(url);
    const data = await response.json();
    createPokemon(data);
    spinner.style.display = 'none';
  } catch (error) {
      console.log(error);
  }

}

//ciclo para fetch de los pokemons
function fetchPokemons(offset, limit){

    spinner.style.display = 'block';
    for (let i = offset; i < offset + limit; i++) {
        fetchPokemon(i);        
    }
}


//crear un card y agregarlo a un container
function createPokemon(pokemon){

    const card = document.createElement('div');
    card.classList.add('card');

    const imageContainer = document.createElement('div')
    imageContainer.classList.add('card-img-container');
    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    imageContainer.appendChild(image);

    const bodyContainer = document.createElement('div');
    bodyContainer.classList.add('body-card-container');
    const pokemonName = document.createElement('h2');
    pokemonName.classList.add('card-pokemon-name');
    pokemonName.innerText = `${pokemon.name}`;
    bodyContainer.appendChild(pokemonName);
    const pokemonId = document.createElement('span');
    pokemonId.classList.add('card-pokemon-id');
    pokemonId.innerText = `#${pokemon.id}`;
    bodyContainer.appendChild(pokemonId);

    card.appendChild(imageContainer);
    card.appendChild(bodyContainer);

    pokemonsContainer.appendChild(card);
}

//paginacion previus
prev.addEventListener('click', (e) => {
    e.preventDefault();
    if(offset !== 1){
        offset -= limit; 
        removePokemons();
        fetchPokemons(offset, limit);
    }
    else{
        offset = 1;
        removePokemons();
        fetchPokemons(offset, limit);
    }
});


//paginacion siguiente
next.addEventListener('click', (e) => {
    e.preventDefault();
    if(offset <889){//
       offset += limit; //o offset += 9; por que van de 9 en 9
       removePokemons();
       fetchPokemons(offset, limit);
    }else if(offset === 889){
        offset += limit; //o offset += 9; por que van de 9 en 9
        removePokemons();
        fetchPokemons(offset, 1);//solo hay 898 pokemons, el ultimo offset es 897 por lo que el siguiente limite tiene que ser 1 y no 9
    }
    else{
        offset = 1;
        removePokemons();
        fetchPokemons(offset, limit);
    }
});

//remover los pokemons
function removePokemons(){

    while(pokemonsContainer.firstChild !== null){
        pokemonsContainer.removeChild(pokemonsContainer.firstChild);
    }

}

//buscar pokemon form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value) { 
        removePokemonsFromModal();
        searchPokemon();        
    }
});

async function searchPokemon(){
    const url = `https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        createModal(data);
      } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo no salio bien!',
            footer: 'Es probable que el pokemon no existe'
          })
        modal.style.display = 'none';
        input.value = '';
        console.log(error);
      }
}

function createModal(pokemon){
    const card = document.createElement('div');
    card.classList.add('card');

    const imageContainer = document.createElement('div')
    imageContainer.classList.add('card-img-container');
    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    imageContainer.appendChild(image);

    const bodyContainer = document.createElement('div');
    bodyContainer.classList.add('body-card-container');
    const pokemonName = document.createElement('h2');
    pokemonName.classList.add('card-pokemon-name');
    pokemonName.innerText = `${pokemon.name}`;
    bodyContainer.appendChild(pokemonName);
    const pokemonId = document.createElement('span');
    pokemonId.classList.add('card-pokemon-id');
    pokemonId.innerText = `#${pokemon.id}`;
    bodyContainer.appendChild(pokemonId);

    card.appendChild(imageContainer);
    card.appendChild(bodyContainer);

    modal.style.display = 'flex';

    modalContent.appendChild(card);
    input.value = '';
}

function removePokemonsFromModal(){

    while(modalContent.firstChild !== null){
        modalContent.removeChild(modalContent.firstChild);
    }

}
//cerrar el modal
times.addEventListener('click', () => {
    modal.style.display = 'none';
});