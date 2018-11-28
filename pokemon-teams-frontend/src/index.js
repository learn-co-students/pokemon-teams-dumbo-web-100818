const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded",(event)=>{

let main = document.querySelector("main")

  main.addEventListener('click', (e)=>{
  if(e.target.className ==="release"){

    removePokemon(e)
  }else if(e.target.className === "addPokemon"){

    addPokemon(e)
  }
})

let a = fetchTrainers()
a.then(display)

})

function fetchTrainers() {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
}


function display(trainers) {
  const main = document.getElementsByTagName("main")
  let eachTrainer;
    trainers.forEach((trainer)=>{
      const ul = document.createElement("ul")
      eachTrainer =  `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                      <button data-trainer-id="${trainer.id}" class="addPokemon">Add Pokemon</button>`

      trainer.pokemons.forEach((pokemon)=>{
        const eachPokemon = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        ul.innerHTML+=eachPokemon
      })

      eachTrainer+=ul.innerHTML
      eachTrainer+="</div>"
      main[0].innerHTML+=eachTrainer

    })
}
    function removePokemon(givenEvent) {

      let pokemonId = givenEvent.target.dataset.pokemonId
      fetch(`http://localhost:3000/pokemons/${pokemonId}`, {method: "DELETE",
      headers:
      {
        "Content-Type":"application/json"
      }
      })
        givenEvent.target.parentElement.innerHTML = ""
    }

    function addPokemon(givenEvent) {
      let trainerId = givenEvent.target.parentElement.dataset.id

   return fetch("http://localhost:3000/pokemons",{method: "POST",
      headers:
        {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({trainer_id: parseInt(trainerId)})
    }).then(res=>res.json()).then(json=>{

      let ul = document.querySelector(`div[data-id="${trainerId}"]`)
      const eachPokemon = `<li>${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release</button></li>`
      ul.innerHTML+=eachPokemon
    })
    }
