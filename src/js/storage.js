export const MAX_HORAS = 10;

const dbDefault = {
  configuracoes: {
    blocoMinutos: 60
  },

  dias: [
    {
      data: new Date().toISOString().slice(0, 10),
      atividades: [
        {
          id: crypto.randomUUID(),
          titulo: "Matemática",
          descricao: "Revisão geral",
          blocosPlanejados: 2,
          blocosConcluidos: 0
        }
      ]
    }
  ]
};

let db = null;

export function carregarDB() {
  const res = localStorage.getItem("ciclo-db");

  try {
    db = res ? JSON.parse(res) : dbDefault;
  } catch {
    db = dbDefault;
  }

  return db;
}

export function salvarDB() {
  localStorage.setItem("ciclo-db", JSON.stringify(db));
}

export function getDB() {
  if (!db) {
    carregarDB();
  }
  return db;
}