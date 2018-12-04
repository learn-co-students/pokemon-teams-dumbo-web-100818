const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
  const main = document.getElementsByTagName('main')[0]

document.addEventListener("DOMContentLoaded", () => {
  getHomePage()
})

function getHomePage(){
  fetch("http://localhost:3000/trainers")
  .then(response=> response.json())
  .then(json =>{
    const trainers = json

    trainers.forEach((trainer)=> {
      let pokemonList = ''
      trainer.pokemons.forEach((pokemon)=>{
      pokemonList +=`<li>${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
    `})

      main.innerHTML += `<div class="card" data-id= "${trainer.id}"><p>${trainer.name}</p>
      <button class = "add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>${pokemonList}</ul> </div>`})
  })
}


  document.body.addEventListener("click",(e)=>{
    if (e.target.className === "add-pokemon") {
      addPokemon(e.target)
    } else if (e.target.className === "release"){
      releasePokemon(e.target)
    } else {
      null
    }
  })

  function addPokemon(target) {
    fetch("http://localhost:3000/pokemons", {method: "POST", headers: {
  'Content-Type': 'application/json',
  Accept:'application/json'
},
body: JSON.stringify({
  trainer_id: `${target.dataset.trainerId}`


})
})
.then(response => response.json())
.then(json => {

  let pokemon = json
  console.log(pokemon.species)
  let oldPokemonList = target.nextElementSibling
  if (pokemon.species !== undefined){
    oldPokemonList.innerHTML += `<li>${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
  }

})

}


function releasePokemon(target){
  target.parentElement.remove()
  fetch(POKEMONS_URL+`/${target.dataset.pokemonId}`,{ method: "DELETE"})
}
