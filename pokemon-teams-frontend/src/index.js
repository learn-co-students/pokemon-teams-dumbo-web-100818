const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// add pokemon, but there can only be 6!


function getTrainers(){
  fetch(TRAINERS_URL).then(response => response.json()).then(json => {
    json.forEach(trainer => showTrainers(trainer))
  })
}

function showTrainers(trainer){
  const main = document.querySelector('main')
  let card = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button class="add-poke" data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul id="ul-${trainer.id}">`
    trainer.pokemons.forEach(pokemon => {
     card += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
   }) + `
    </ul>
  </div>`
  main.innerHTML += card

}

document.addEventListener('DOMContentLoaded', () => {
  getTrainers()
  document.querySelector("main").addEventListener('click', pokeAction)
})

function pokeAction(e){
  if (e.target.className === "add-poke"){
    let id = e.target.dataset.trainerId
    let uly = document.querySelector(`#ul-${id}`)
    if(uly.childElementCount < 6){
      addPokemon(id)
    }
  } else if(e.target.className === "release"){
    let id = e.target.dataset.pokemonId
    releasePokemon(id)
  }
}

function addPokemon(id){
  let sendy = {
    trainer_id: id
  }

  fetch(POKEMONS_URL,{
    method: "POST",
    body: JSON.stringify(sendy),
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(response => response.json())
  .then(json => {
    document.querySelector('main').innerHTML = ""
    getTrainers()
  })
}

function releasePokemon(id){
  fetch(`${POKEMONS_URL}/${id}`,{
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(json => {
    document.querySelector('main').innerHTML = ""
    getTrainers()
  })
}
