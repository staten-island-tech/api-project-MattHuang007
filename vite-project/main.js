import "./style.css";
import { cardSets, sortables } from "./filters";

const query = {
  cardset: cardSets[0],
  sort: sortables[0],
};

const app = document.querySelector("#app");

// create filter form
function createForm(field, options) {
  const form = document.createElement("form");
  form.innerHTML = `
    <label for="${field}-filter">${field}:</label>
      <select id="${field}-filter">
        ${options
      .map((option) => `<option value="${option}">${option}</option>`)
      .join("\n")}
      </select>
  `;

  form.onchange = (event) => {
    console.log(event.target.value);
    query[field] = event.target.value;
    getCards();
  };

  app.appendChild(form);
}
createForm("cardset", cardSets);
createForm("sort", sortables);

const cardContainer = document.createElement("div");
cardContainer.className = "card-container";

app.appendChild(cardContainer);

getCards(cardSets[0]); // default load
const btn = document.getElementById("dialog-btn");
btn.addEventListener("click", dialogclose)
async function getCards() {
  const baseUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?`;

  try {
    const response = await fetch(baseUrl + new URLSearchParams(query));
    const responseData = await response.json();
    const cards = responseData.data;

    cardContainer.innerHTML = ""; // clear cards
    cards.forEach(createCard);
  } catch {
    alert("Api does not have this card set");
  }
}

function createCard(card) {
  const cardDiv = document.createElement("img");
  cardDiv.className = "small-card";
  cardDiv.src = card.card_images[0].image_url_small;
  cardDiv.addEventListener("click", () => cardclick(card.card_images[0].image_url_small))
  cardContainer.appendChild(cardDiv);
}
function cardclick(src) {
  console.log("click")
  const cardDiv = document.createElement("img");
  cardDiv.className = "big-card";
  cardDiv.src = src
  const dialog = document.getElementById("big");
  const dialogdiv = document.getElementById("dialog-div");
  dialogdiv.prepend(cardDiv); //appendchild but front instead of back
  dialog.showModal()
}
function dialogclose() {
  const dialogdiv = document.getElementById("dialog-div");
  const dialog = document.getElementById("big");
  dialogdiv.removeChild(dialogdiv.firstChild)
  dialog.close()
}
