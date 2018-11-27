document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://localhost:3000";
  const POKEMONS_URL = `${BASE_URL}/pokemons`;
  const TRAINERS_URL = `${BASE_URL}/trainers`;
  const main = document.querySelector("main");

  function getTrainers() {
    fetch(TRAINERS_URL)
      .then(res => res.json())
      .then(displayTrainerCards)
  };


  function displayTrainerCards(trainers) {
    main.innerHTML = "";
    trainers.forEach(trainer => {
      main.appendChild(renderTrainerCardElement(trainer));
    });
  };


  function renderTrainerCardElement(trainer) {
    const trainerDiv = renderTrainerElement(trainer);
    const ul = document.createElement("ul");

    trainer.pokemons.forEach(pokemon => {
      ul.appendChild(renderPokemonElement(pokemon));
    });

    trainerDiv.appendChild(ul);
    return trainerDiv;
  };


  function renderTrainerElement(trainer) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const button = document.createElement("button");

    div.classList.add("card");
    div.dataset.id = trainer.id;
    p.innerHTML = trainer.name;
    button.dataset.trainerId = trainer.id;
    button.innerHTML = "Add Pokemon";

    div.appendChild(p);
    div.appendChild(button);
    return div;
  };


  function renderPokemonElement(pokemon) {
    let li = document.createElement("li");
    let button = document.createElement("button");

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    button.classList.add("release");
    button.dataset.pokemonId = pokemon.id;
    button.innerHTML = "Release";

    li.appendChild(button);
    return li;
  }


  function addPokemon(trainerId) {
    let trainerData = {trainer_id: trainerId};

    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(trainerData)
    })
    .then(res => res.json())
    .then(getTrainers);
  };


  function removePokemon(pokemonId) {
    fetch(POKEMONS_URL + `/${pokemonId}`, {method: "DELETE"})
    .then(getTrainers);
  };


  function delegateButtonAction(event) {
    if (event.target.innerHTML === "Add Pokemon"){
      let trainerId = event.target.dataset.trainerId;
      addPokemon(trainerId);
    } else if (event.target.innerHTML === "Release") {
      let pokemonId = event.target.dataset.pokemonId;
      removePokemon(pokemonId);
    };
  }


  getTrainers();
  main.addEventListener('click', delegateButtonAction);
});
