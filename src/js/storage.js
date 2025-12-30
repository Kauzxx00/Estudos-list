export const MAX_HORAS = 10;

const materiasDefault = {
  materias: [
    { nome: "Matemática", horas: 8, marcadas: 0 },
    { nome: "Português", horas: 4, marcadas: 0 },
    { nome: "Física", horas: 8, marcadas: 0 },
    { nome: "Química", horas: 6, marcadas: 0 },
    { nome: "Inglês", horas: 4, marcadas: 0 }
  ]
};

let db = null;

export function carregarDB() {
  const res = localStorage.getItem("ciclo-db");
  db = JSON.parse(res) || materiasDefault;
  return db;
}

export function salvarDB() {
  localStorage.setItem("ciclo-db", JSON.stringify(db));
}

export function getDB() {
  return db;
}