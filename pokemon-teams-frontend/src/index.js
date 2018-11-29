const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


let main = document.querySelector("main")
 function getTrainers() {
  fetch("http://localhost:3000/trainers")
    .then(res => res.json())
    .then(json => {
      main.innerHTML = ""
      json.forEach(trainer => {
        let card = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>`
         trainer.pokemons.forEach(pokemon => {
          card += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        })
         card += `</ul></div>`
         main.innerHTML += card
      })
    })
}
 function addPokemon(trainerid){
  let trainerData = {
    trainer_id: trainerid
  }
   fetch("http://localhost:3000/pokemons", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(trainerData)
   })
  .then(res => res.json())
  .then(json => getTrainers())
}
 function removePokemon(pokemonId) {
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(json => getTrainers())
}
 document.addEventListener("DOMContentLoaded", () => {
  getTrainers()
  main.addEventListener('click', (event) => {
    if (event.target.innerHTML === "Add Pokemon"){
      let trainerid = event.target.dataset.trainerId
      addPokemon(trainerid)
    } else if (event.target.innerHTML === "Release") {
      let pokemonId = event.target.dataset.pokemonId
      removePokemon(pokemonId)
    }
  })
})
