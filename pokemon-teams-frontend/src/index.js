const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainerData = fetch(`${TRAINERS_URL}`)
    .then(res => res.json())
    .then(json =>
{
  let trainerContainer = document.querySelector("main")

  for (trainer of json){
    trainerContainer.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
    ${trainer.pokemons.map(pokemon => `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`).join(' ')}
    </ul>
    </div>`}

})

function changePoke(e){
  if(e.target.className === "add"){
    addPoke(e)
  } else if(e.target.className === "release")
  {
    deletePoke(e)
  }
}

function addPoke(e){
  let trainerId = e.target.dataset.trainerId
  return fetch(`${POKEMONS_URL}`, {
    method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ trainer_id: trainerId})
  })
  .then(res => res.json())
  .then(json => {
  let ul = document.querySelector(`div[data-id='${json.trainer_id}'] ul`)
  ul.innerHTML += `<li> ${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release</button></li>`
})
}

function deletePoke(e){
  //remove from HTML

  let pokeId = e.target.dataset.pokemonId;
  //remove from database

  return fetch(`${POKEMONS_URL}/${pokeId}`, {
    method: "DELETE"
  })
  .then(res => {
    e.target.parentNode.remove()
    res.json()
  })


}


addButton = document.getElementsByTagName('button')
changePokemon = document.addEventListener('click', changePoke)
