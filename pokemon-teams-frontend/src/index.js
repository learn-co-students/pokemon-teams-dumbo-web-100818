// const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`
//
// document.addEventListener("DOMContentLoaded", (event)=>{
//   let main = document.querySelector('main')
//   main.addEventListener('click' , (e) =>{
//     if (e.target.className === 'release'){
//     deleteZoke(e)
//   }else if (e.target.className === 'addZoke'){
//     addZokemon(e)
//   }
//   })
//
//   let a = getTrainers()
//   a.then(display)
//
//
// })
//
// function getTrainers() {
//   return fetch(TRAINERS_URL)
//   .then(res => res.json())
// }
//
// function display(trainers) {
//   let main = document.getElementsByTagName('main')
//     let eachTrainer;
//       trainers.forEach((trainer) => {
//         const ul = document.createElement('ul')
//         eachTrainer =  `<div class="card" data-id="${trainer.id}"><p>"${trainer.name}"</p><button data-trainer-id="${trainer.id}" class='addZoke'>Add Pokemon</button>`
//
//       trainer.pokemons.forEach((pokemon) =>{
//           const allPokemons = `<li> Name:${pokemon.nickname} -Type: ${pokemon.species} <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
//           ul.innerHTML += allPokemons
//       })
//       eachTrainer += ul.innerHTML
//       eachTrainer += "</div>"
//       main[0].innerHTML += eachTrainer
// })
// }
//
// function addZokemon(e) {
// fetch()
//
// }
//
// function deleteZoke(e) {
//   let pokeid = e.target.dataset.pokemonId
//     fetch(`http://localhost:3000/pokemons/${pokeid}`, {method: "DELETE",
//   })
//   e.target.parentElement.innerHTML = ''
// }

// ************************* Prince way of doing this lecture ********************************\\
// ****** READ THE READ ME LOOK BACK IN THE INSTRUCTIONS THE ANSWER MIGHT BE IN THERE

 const BASE_URL = "http://localhost:3000"
 const TRAINERS_URL = `${BASE_URL}/trainers`
 const POKEMONS_URL = `${BASE_URL}/pokemons`

 // 1 We want to listen to the DOM loading
 // 2 in the DOM loading we want to fetch all of our trainers
//  3 display to page
document.addEventListener('DOMContentLoaded',function (event) {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json =>{
    const mainContainer = document.querySelector('main')
    json.forEach(trainer => {
      // make a div
     // add it to the main contaniner
     const pokeList = trainer.pokemons.map(pokemon => {
       // i want to generate a HTML string for a pokemon
       return `<li>${pokemon.nickname} ${pokemon.species}<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li> `
     })
     mainContainer.innerHTML += `<div class="card" data-id="${trainer.id}"> <p>${trainer.name}</p>
  <button class="addPoke" data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul>
    ${pokeList.join('')}
  </ul>
</div>`
    })
  })

const mainContainer = document.querySelector('main')
mainContainer.addEventListener('click', (e) =>{
  if (e.target.className === 'addPoke'){
    let targeted = parseInt(e.target.dataset.trainerId)
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Tells our browser we are sending json
      },
      body: JSON.stringify({
        trainer_id: targeted
      })
    })
    .then(res => res.json())
    .then(json => {
      // WE NEED TO FIND WHAT TRAINER IS BEING CALLED
      let ul = document.querySelector(`div[data-id="${json.trainer_id}"]`).children[2]
      // then go in and append
      ul.innerHTML += `<li>${json.nickname} ${json.species} <button class="release" data-pokemon-id="${json.id}">Release</button></li>`
    })
    // find the div according to the training id
  } else if (e.target.className === 'release'){
    let idOfPokemon = e.target.dataset.pokemonId
    e.target.parentElement.remove()
    fetch(`http://localhost:3000/pokemons/${idOfPokemon}`, {method: "DELETE",
     })
  }
})
})

// when a user hits add pokemon and they have enough space  to add
