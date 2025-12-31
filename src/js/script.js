import { carregarDB } from "./storage.js";
import { render } from "./render.js";

const dateDiv = document.getElementById("date");
const now = new Date();
const formatedDate = now.toLocaleDateString('pt-BR', { year: 'numeric', day: 'numeric', month: 'numeric' });
const formatedDay = now.toLocaleDateString('pt-BR', { weekday: 'long' });

dateDiv.innerHTML = `
  <span class="day">${formatedDay.charAt(0).toUpperCase() + formatedDay.slice(1)}</span>
  <span class="date">${formatedDate}</span>
`;

carregarDB();
render();