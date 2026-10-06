/*
  Funções de cálculo puras: recebem valores e devolvem resultados.
  Não mexem em estado nem em tela — por isso são fáceis de testar e reutilizar.
*/

// "1,75" -> 1.75 | "" -> NaN
export function paraNumero(valor) {
  return parseFloat(String(valor).replace(",", "."));
}

function valido(...numeros) {
  return numeros.every((n) => Number.isFinite(n) && n > 0);
}

// Limites realistas: barram erros de digitação (ex.: idade 305, peso 7)
const LIMITES = {
  idade: [1, 120], // anos
  peso: [20, 400], // kg
  altura: [0.5, 2.5], // m
};

function dentro(valor, [min, max]) {
  return valor >= min && valor <= max;
}

// Ninguém tem mais de 3 m: acima disso a altura foi digitada em cm (ex.: 175)
function alturaEmMetros(a) {
  return a > 3 ? a / 100 : a;
}

function alturaEmCm(a) {
  return a > 3 ? a : a * 100;
}

// 1780.4 -> "1.780"
function kcal(valor) {
  return Math.round(valor).toLocaleString("pt-BR");
}

/* ---------- IMC ---------- */
// altura em metros (ou cm, convertida), peso em kg
export function calcularImc(altura, peso, faixas) {
  const a = alturaEmMetros(paraNumero(altura));
  const p = paraNumero(peso);
  if (!valido(a, p) || !dentro(a, LIMITES.altura) || !dentro(p, LIMITES.peso)) return null;

  // Arredonda para 1 casa antes de comparar com as faixas da tabela
  const imc = Math.round((p / (a * a)) * 10) / 10;
  const faixa = faixas.find((f) => imc >= f.min && imc <= f.max);

  return {
    imc: imc.toFixed(1).replace(".", ","), // formato brasileiro: 23,0
    info: faixa?.info ?? "",
    infoClass: faixa?.infoClass ?? "",
  };
}

/* ---------- TMB (Mifflin-St Jeor) ---------- */
// peso em kg, altura em cm (ou m, convertida), idade em anos
const FATOR_ATIVIDADE = {
  1: 1.2, // sedentário
  2: 1.375, // levemente ativo
  3: 1.55, // moderadamente ativo
  4: 1.725, // muito ativo
  5: 1.9, // extremamente ativo
};

export function calcularTmb(sexo, idade, peso, altura, nivelFisico) {
  const i = paraNumero(idade);
  const p = paraNumero(peso);
  const a = alturaEmCm(paraNumero(altura));
  const fator = FATOR_ATIVIDADE[nivelFisico];

  if (!valido(i, p, a) || !fator) return null;
  if (!dentro(i, LIMITES.idade) || !dentro(p, LIMITES.peso) || !dentro(a / 100, LIMITES.altura)) return null;
  if (sexo !== "masculino" && sexo !== "feminino") return null;

  const ajusteSexo = sexo === "masculino" ? 5 : -161;
  const tmb = 10 * p + 6.25 * a - 5 * i + ajusteSexo;
  const gct = tmb * fator; // gasto calórico total do dia

  return {
    tmb: kcal(tmb),
    gct: kcal(gct),
    caloriasPerda: kcal(gct * 0.8), // déficit de 20%
    caloriasGanha: kcal(gct * 1.2), // superávit de 20%
  };
}

/* ---------- Água recomendada ---------- */
// 35 a 40 ml por kg
export function calcularAgua(peso) {
  const p = paraNumero(peso);
  if (!valido(p) || !dentro(p, LIMITES.peso)) return null;

  // Números em litros (não texto): a tabela usa para calcular a distribuição
  return {
    aguaMinima: Math.round(p * 35) / 1000,
    aguaMaxima: Math.round(p * 40) / 1000,
  };
}

/* ---------- Massa magra (fórmula de Boer) ---------- */
// peso em kg, altura em cm (ou m, convertida)
export function calcularLbm(sexo, peso, altura) {
  const p = paraNumero(peso);
  const a = alturaEmCm(paraNumero(altura));
  if (!valido(p, a) || !dentro(p, LIMITES.peso) || !dentro(a / 100, LIMITES.altura)) return null;

  const massaMagra =
    sexo === "masculino"
      ? 0.407 * p + 0.267 * a - 19.2
      : 0.252 * p + 0.473 * a - 48.3;

  // Em combinações extremas (ex.: muito alto e muito leve) a fórmula
  // passa do peso total ou dá negativo: aí o resultado não faz sentido
  if (massaMagra <= 0 || massaMagra >= p) return null;

  const massaGorda = p - massaMagra;
  const umaCasa = (n) => Math.round(n * 10) / 10;

  // Números (não texto): a tela formata e desenha a barra com eles
  return {
    weight: umaCasa(p),
    massaMagra: umaCasa(massaMagra),
    massaGorda: umaCasa(massaGorda),
    percentoGordura: umaCasa((massaGorda / p) * 100),
  };
}