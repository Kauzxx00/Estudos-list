import { getDB, salvarDB, MAX_HORAS } from "./storage.js";
import { abrirModal } from "./modal.js";
import { render } from "./render.js";

export function toggleHora(materiaIndex, horaIndex) {
  const db = getDB();
  const materia = db.materias[materiaIndex];

  materia.marcadas =
    horaIndex + 1 === materia.marcadas ? horaIndex : horaIndex + 1;

  salvarDB();
  render();
}

export function addHora(i) {
  const db = getDB();
  if (db.materias[i].horas >= MAX_HORAS) return;

  db.materias[i].horas++;
  salvarDB();
  render();
}

export function remHora(i) {
  const db = getDB();
  if (db.materias[i].horas <= 0) return;

  db.materias[i].horas--;
  db.materias[i].marcadas = Math.min(
    db.materias[i].marcadas,
    db.materias[i].horas
  );

  salvarDB();
  render();
}

export function addMateria() {
  abrirModal({
    titulo: "Adicionar matéria",
    usarInput: true,
    placeholder: "Nome da matéria",
    confirmar: (nome) => {
      if (!nome) return;
      const db = getDB();
      db.materias.push({ nome, horas: 2, marcadas: 0 });
      salvarDB();
      render();
    }
  });
}

export function remMateria(i) {
  const db = getDB();
  abrirModal({
    titulo: `Remover "${db.materias[i].nome}"?`,
    confirmar: () => {
      db.materias.splice(i, 1);
      salvarDB();
      render();
    }
  });
}

export function restart() {
  const db = getDB();
  abrirModal({
    titulo: "Resetar todas as matérias?",
    confirmar: () => {
      db.materias.forEach(m => m.marcadas = 0);
      salvarDB();
      render();
    }
  });
}