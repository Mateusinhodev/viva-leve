/*
  Filtros de digitação usados pelos formulários das calculadoras.
*/

// Mantém só números e um único separador decimal (vírgula)
// "1.7a5" -> "1,75" | "1,,75" -> "1,75"
export function somenteDecimal(texto) {
  const limpo = texto.replace(/[^0-9.,]/g, "").replace(/\./g, ",");
  const [inteiro, ...decimais] = limpo.split(",");
  return decimais.length ? `${inteiro},${decimais.join("")}` : inteiro;
}

// 72.4 -> "72,4"
export function formatarKg(valor) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// -3.2 -> "−3,2" | 1.5 -> "+1,5" | 0 -> "0,0"
export function formatarVariacao(valor) {
  const sinal = valor > 0.04 ? "+" : valor < -0.04 ? "−" : "";
  return `${sinal}${formatarKg(Math.abs(valor))}`;
}

// Mantém só dígitos, com limite de tamanho (ex.: idade com até 3 dígitos)
export function somenteInteiro(texto, maxDigitos = 3) {
  return texto.replace(/\D/g, "").slice(0, maxDigitos);
}