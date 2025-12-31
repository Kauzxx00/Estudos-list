import { getDB, MAX_HORAS } from "./storage.js";
import { circularProgressSVG } from "./progress.js";
import {
  toggleHora,
  addHora,
  remHora,
  remMateria,
  restart,
  addMateria
} from "./actions.js";

const ciclo = document.getElementById("ciclo");
const summaryEl = document.getElementById("day-summary");

function getDiaAtual(db) {
  const hoje = new Date().toLocaleDateString('pt-BR', { year: 'numeric', day: 'numeric', month: 'numeric' });
  console.log(db.dias, hoje);
  return db.dias.find(d => d.data === hoje);
}

export function render() {
  const db = getDB();
  const dia = getDiaAtual(db);

  console.log(dia);

  const resumo = getResumoDia(dia.atividades);
  summaryEl.innerHTML = `
    <strong>${resumo.concluidos}</strong> /
    ${resumo.planejados} blocos concluídos
  `;

  ciclo.innerHTML = "";

  dia.atividades.forEach((a, i) => {
    const progresso =
      a.blocosPlanejados === 0
        ? 0
        : (a.blocosConcluidos / a.blocosPlanejados) * 100;

    const div = document.createElement("div");
    div.className = "materia";

    div.innerHTML = `
      <div class="header">
        <div class="title">
          ${circularProgressSVG({
            percentage: progresso,
            size: 34,
            strokeWidth: 3,
            text: `${a.blocosConcluidos}/${a.blocosPlanejados}`
          })}
          <div class="texts">
            <h2>${a.titulo}</h2>
            ${a.descricao ? `<p class="desc">${a.descricao}</p>` : ""}
          </div>
        </div>

        <div class="controls">
          <button ${a.blocosPlanejados >= MAX_HORAS ? "disabled" : ""} data-add="${i}">
            <i class="fi fi-br-plus-small"></i>
          </button>
          <button ${a.blocosPlanejados <= 0 ? "disabled" : ""} data-rem="${i}">
            <i class="fi fi-br-minus-small"></i>
          </button>
          <button data-del="${i}">
            <i class="fi fi-br-trash"></i>
          </button>
        </div>
      </div>

      <div class="horas">
        ${Array.from({ length: a.blocosPlanejados }).map((_, h) => `
          <div class="hora ${h < a.blocosConcluidos ? "marcada" : ""}"
               title="Bloco ${h + 1}"
               data-m="${i}" data-h="${h}">
            ${h < a.blocosConcluidos ? `<i class="fi fi-br-check"></i>` : ""}
          </div>
        `).join("")}
      </div>
    `;

    ciclo.appendChild(div);
  });

  document.querySelectorAll("[data-m]").forEach(el => {
    el.onclick = () => toggleHora(+el.dataset.m, +el.dataset.h);
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

  document.querySelector(".refresh")?.addEventListener("click", restart);
  document.querySelector(".addMateria")?.addEventListener("click", addMateria);
}

function getResumoDia(atividades) {
  const planejados = atividades.reduce((s, a) => s + a.blocosPlanejados, 0);
  const concluidos = atividades.reduce((s, a) => s + a.blocosConcluidos, 0);

  return { planejados, concluidos };
}