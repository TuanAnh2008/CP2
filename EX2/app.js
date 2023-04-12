const option = document.querySelector(".option");
const optionList = document.querySelector(".option-list");
const input = document.querySelector("#input-search");
const inputIcon = document.querySelector(".input-icon");
const loadingAnimation = document.querySelector(".loading-overlay");
const boxInfo = document.querySelector(".box__right-info");
const imageItem = document.querySelector(".image-box img");
// GET API

async function getPokemons() {
  // FAKE LOADING (min 1 second)
  loadingAnimation.style.display = "flex";
  setTimeout(async function () {
    try {
      const responce = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
      if (!responce.ok) {
        console.log("Hello");
        throw new Error(
          "không thể tìm API với value input đó, hoặc có lỗi với server"
        );
      }
      const data = await responce.json();
      loadingAnimation.style.display = "none";
      app(data);
    } catch (err) {
      console.error(err.message);
      loadingAnimation.style.display = "none";
    }
  }, 1000);
}

getPokemons();

// APP
function app(dataPokemon) {
  renderOption(dataPokemon.results);
  eventHandlers(dataPokemon.results);
}

// RENDER OPTIONS
function renderOption(items) {
  const allPokemonsName = items
    .map((item) => item.name)
    .map((itemName) => `<li class="option-item">${itemName}</li>`)
    .join("");
  optionList.innerHTML = allPokemonsName;
}

// RENDER POKEMON INFO
const renderPokemonData = async function (pokemonData) {
  try {
    const responce = await fetch(pokemonData.abilities[0].ability.url);
    const newRequest = await responce.json();
    const pokemonType = pokemonData.types
      .map((item) => item.type.name)
      .join("");
    const html = `
              <div class="content__group">
                  <h3 class="name-group">NAME</h3>
                  <p class="text-group">${pokemonData.forms[0].name}</p>
              </div>
              <div class="content__group">
                  <h3 class="name-group">TYPE</h3>
                  <p class="text-group">${pokemonType}</p>
              </div>
              <div class="content__group">
                  <h3 class="name-group">HEIGHT</h3>
                  <p class="text-group">${pokemonData.height}</p>
              </div>
              <div class="content__group">
                  <h3 class="name-group">WEIGHT</h3>
                  <p class="text-group">${pokemonData.weight}</p>
              </div>
              <div class="content__group">
                  <h3 class="name-group">BIO</h3>
                  <p class="text-group">${newRequest.flavor_text_entries[0].flavor_text}</p>
              </div>
          `;
    boxInfo.innerHTML = html;
    imageItem.src = pokemonData.sprites.back_default;
    //   console.log("Hello in async"); // 3
  } catch (err) {
    console.error(err);
  }
};

// EVENT HANDLERS
function eventHandlers(items) {
  const opitionItems = document.querySelectorAll(".option-item");
  input.addEventListener("focus", (e) => {
    option.style.opacity = "1";
    option.style.visibility = "visible";
    option.style.height = "200px";
    option.style.width = "300px";
    option.style.overflowY = "auto";
  });

  input.addEventListener("blur", (e) => {
    option.style.opacity = "0";
    option.style.visibility = "hidden";
    option.style.height = "0";
    option.style.width = "0";
  });

  input.addEventListener("input", (e) => {
    opitionItems.forEach((item) => {
      const checkItem = item.textContent
        .toLowerCase()
        .indexOf(input.value.toLowerCase());
      // console.log(item);
      if (checkItem === -1) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  });

  optionList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("option-item")) return;
    console.log(e.target.textContent);
    input.value = e.target.textContent;
  });

  inputIcon.addEventListener("click", (e) => {
    const result = items.find(
      (item) => item.name.toLowerCase() === input.value.toLowerCase()
    );

    (async function (url) {
      loadingAnimation.style.display = "flex";
      setTimeout(async function () {
        try {
          const responce = await fetch(url);
          if (!responce.ok) {
            throw new Error(
              "không thể tìm API với value input đó, hoặc có lỗi với server"
            );
          }
          const data = await responce.json();
          await renderPokemonData(data);
          loadingAnimation.style.display = "none";
          //   console.log("HELLO normal"); // 2
        } catch (err) {
          console.error(err.message);
          loadingAnimation.style.display = "none";
        }
      }, 1000);
    })(result?.url);
  });
}
