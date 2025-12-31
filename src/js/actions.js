import { getDB, salvarDB, MAX_HORAS } from "./storage.js";
import { abrirModal } from "./modal.js";
import { render } from "./render.js";

function getDiaAtual(db) {
  const hoje = new Date().toISOString().slice(0, 10);
  return db.dias.find(d => d.data === hoje);
}

export function toggleHora(atividadeIndex, blocoIndex) {
  const db = getDB();
  const dia = getDiaAtual(db);
  const atividade = dia.atividades[atividadeIndex];

  atividade.blocosConcluidos =
    blocoIndex + 1 === atividade.blocosConcluidos
      ? blocoIndex
      : blocoIndex + 1;

  salvarDB();
  render();
}

export function addHora(i) {
  const db = getDB();
  const dia = getDiaAtual(db);
  const atividade = dia.atividades[i];

  if (atividade.blocosPlanejados >= MAX_HORAS) return;

  atividade.blocosPlanejados++;
  salvarDB();
  render();
}

export function remHora(i) {
  const db = getDB();
  const dia = getDiaAtual(db);
  const atividade = dia.atividades[i];

  if (atividade.blocosPlanejados <= 0) return;

  atividade.blocosPlanejados--;
  atividade.blocosConcluidos = Math.min(
    atividade.blocosConcluidos,
    atividade.blocosPlanejados
  );

  salvarDB();
  render();
}

export function addMateria() {
  abrirModal({
    titulo: "Adicionar atividade",
    usarInput: true,
    placeholder: "Título da atividade",
    confirmar: (titulo, descricao) => {
      if (!titulo) return;

      const db = getDB();
      const dia = getDiaAtual(db);

      dia.atividades.unshift({
        id: crypto.randomUUID(),
        titulo,
        descricao,
        blocosPlanejados: 2,
        blocosConcluidos: 0
      });

      salvarDB();
      render();
    }
  });
}

export function remMateria(i) {
  const db = getDB();
  const dia = getDiaAtual(db);

  abrirModal({
    titulo: `Remover "${dia.atividades[i].titulo}"?`,
    confirmar: () => {
      dia.atividades.splice(i, 1);
      salvarDB();
      render();
    }
  });
}

export function restart() {
  const db = getDB();
  const dia = getDiaAtual(db);

  abrirModal({
    titulo: "Resetar todas as atividades do dia?",
    confirmar: () => {
      dia.atividades.forEach(a => a.blocosConcluidos = 0);
      salvarDB();
      render();
    }
  });
}