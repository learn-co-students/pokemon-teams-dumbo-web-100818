const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
fetch(TRAINERS_URL).then(res => res.json()).then(json => showTrainers(json))
})

function showTrainers(data) {
let mainSection = document.querySelector('main');
mainSection.addEventListener('click', releaseOrAddPokemon)
data.forEach( trainer => {
  mainSection.innerHTML +=
  `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
<button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
 ${showPokemon(trainer)}
</div>`
})
}

function showPokemon(trainer){
let list = `<ul>`
 trainer.pokemons.forEach(poke => {
   list += `<li>${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
 })
list += `</ul>`
return list
}

function releaseOrAddPokemon(e) {
  if (e.target.className === 'release') {
    deletePokemon(e)
  } else if (e.target.className === 'add') {
    addPokemon(e)
  }
}

function deletePokemon(e) {
  fetch(`${BASE_URL}/pokemons/${e.target.dataset.pokemonId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then((json) => {
    document.querySelector(`button[data-pokemon-id="${json.id}"]`).parentElement.remove()
  })
}

function addPokemon(e) {
  // debugger
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      trainer_id: e.target.dataset.trainerId
    })

  }).then(res => res.json()).then((json) => {
    newPokemon(json)
  })
}

function newPokemon(pokemon) {
  let newPokemon = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  let div = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
  let ul = div.querySelector('ul')
  ul.innerHTML += newPokemon
}


