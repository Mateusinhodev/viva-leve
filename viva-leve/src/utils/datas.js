/*
  Datas no formato "AAAA-MM-DD" (o mesmo do <input type="date">).
*/

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// Data de hoje no fuso da pessoa: "2026-10-05"
export function hojeISO() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// "2026-10-05" -> Date no horário local.
// (new Date("2026-10-05") seria meia-noite UTC, que no Brasil ainda é dia 4!)
export function paraData(iso) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

// "2026-10-05" -> "5 out"
export function dataCurta(iso) {
  const d = paraData(iso);
  return `${d.getDate()} ${MESES[d.getMonth()]}`;
}

// "2026-10-05" -> "05/10/2026"
export function dataLonga(iso) {
  return paraData(iso).toLocaleDateString("pt-BR");
}