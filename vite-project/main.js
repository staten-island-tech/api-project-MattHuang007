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
btn.addEventListener("click", dialogClose)
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
  cardDiv.alt=card.name;
  cardDiv.addEventListener("click", () => cardClick(card.card_images[0].image_url_small));
  cardContainer.appendChild(cardDiv);
}

function cardClick(src) {
  console.log("click")
  const cardDiv = document.createElement("img");
  cardDiv.className = "big-card";
  cardDiv.src = src;
  cardDiv.alt="Yugi-oh card"; 
  console.log(src);
  const dialog = document.getElementById("big");
  const dialogDiv = document.getElementById("dialog-div");
  dialogDiv.prepend(cardDiv); //appendchild but front instead of back
  dialog.showModal();
}

function dialogClose() {
  const dialogDiv = document.getElementById("dialog-div");
  const dialog = document.getElementById("big");
  dialogDiv.removeChild(dialogDiv.firstChild);
  dialog.close();
}

