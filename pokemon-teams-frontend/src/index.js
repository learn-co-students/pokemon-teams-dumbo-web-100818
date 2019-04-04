const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
	fetchTrainers()
	const main = document.querySelector('main')

	main.addEventListener('click', (e) => {
		if(e.target.className === "add") {
			addPokemon(e.target.dataset.trainerId)
		} else if(e.target.className === "release") {
			let parent = e.target.parentElement
			releasePokemon(e.target.dataset.pokemonId)
			parent.innerHTML = ''
		}
	})
})

function fetchTrainers() {
	fetch(TRAINERS_URL)
	.then(resp => resp.json())
	.then(function(trainers) {
		for(const trainer of trainers) {
			addTrainerHtml(trainer)
		}
	})
}

function addTrainerHtml(trainer) {
	const main = document.querySelector('main')
	let card = document.createElement('div')
	card.className = 'card'
	card.setAttribute('data-id', trainer.id)
	card.innerHTML = `<p>${trainer.name}</p>
						<button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>`
	let ul = document.createElement('ul')

	for(const pokemon of trainer.pokemons) {
		ul.innerHTML += `<li>${pokemon.nickname} (${pokemon.species})
							<button class="release" data-pokemon-id="${pokemon.id}">Release</button>
							</li>`
	}

	card.appendChild(ul)
	main.appendChild(card)
}

function addPokemonHtml(pokemon) {
	const card = document.querySelector(`[data-id='${pokemon.trainer_id}']`)
	const ul = card.querySelector('ul')
	ul.innerHTML += `<li>${pokemon.nickname} (${pokemon.species})
						<button class="release" data-pokemon-id="${pokemon.id}">Release</button>
						</li>`
}

function addPokemon(trainerId) {
	const data = {trainer_id: trainerId}

	fetch(POKEMONS_URL, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {'Content-Type': 'application/json'}
	})
	.then(resp => resp.json())
	.then(json => addPokemonHtml(json))
}

function releasePokemon(pokemonId) {
	fetch(POKEMONS_URL+'/'+pokemonId, {
		method: 'DELETE'
	})
}



