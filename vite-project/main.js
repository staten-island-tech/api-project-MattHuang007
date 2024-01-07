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