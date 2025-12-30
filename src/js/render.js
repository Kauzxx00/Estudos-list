import { getDB, MAX_HORAS } from "./storage.js";
import { circularProgressSVG } from "./progress.js";
import { toggleHora, addHora, remHora, remMateria, restart, addMateria } from "./actions.js";

const ciclo = document.getElementById("ciclo");

export function render() {
  const db = getDB();
  ciclo.innerHTML = "";

  db.materias.forEach((m, i) => {
    const div = document.createElement("div");
    const progresso = m.horas === 0 ? 0 : (m.marcadas / m.horas) * 100;
    const progressSVG = circularProgressSVG({
      percentage: progresso,
      size: 30,
      strokeWidth: 3,
      text: `${m.marcadas}/${m.horas}`
    });
    
    div.className = "materia";
    div.innerHTML = `
      <div class="header">
        <div class="title">
          ${progressSVG}
          <h2>${m.nome}</h2>
        </div>

        <div class="controls">
          <button ${m.horas >= MAX_HORAS ? "disabled" : ""} data-add="${i}">
            <i class="fi fi-br-plus-small"></i>
          </button>
          <button ${m.horas <= 0 ? "disabled" : ""} data-rem="${i}">
            <i class="fi fi-br-minus-small"></i>
          </button>
          <button data-del="${i}"><i class="fi fi-br-trash"></i></button>
        </div>
      </div>

      <div class="horas">
        ${Array.from({ length: m.horas }).map((_, h) => `
          <div class="hora ${h < m.marcadas ? "marcada" : ""}"
               data-m="${i}" data-h="${h}">
               ${h < m.marcadas ? "<i class=\"fi fi-br-check\"></i>" : ""}
          </div>
        `).join("")}
      </div>
    `;

    ciclo.appendChild(div);
  });

  document.querySelectorAll("[data-m]").forEach(el => {
    el.onclick = () =>
      toggleHora(+el.dataset.m, +el.dataset.h);
  });

  document.querySelectorAll("[data-add]").forEach(el => {
    el.onclick = () => addHora(+el.dataset.add);
  });

  document.querySelectorAll("[data-rem]").forEach(el => {
    el.onclick = () => remHora(+el.dataset.rem);
  });

  document.querySelectorAll("[data-del]").forEach(el => {
    el.onclick = () => remMateria(+el.dataset.del);
  });
  
  document.querySelector(".refresh").addEventListener("click", restart);
  
  document.querySelector(".addMateria").addEventListener("click", addMateria);
}