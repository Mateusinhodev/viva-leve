import { describe, it, expect } from "vitest";
import {
  paraNumero,
  calcularImc,
  calcularTmb,
  calcularAgua,
  calcularLbm,
} from "./calculos.js";

// Faixas no mesmo formato do data.js
const FAIXAS = [
  { min: 0, max: 18.4, info: "Magreza", infoClass: "low" },
  { min: 18.5, max: 24.9, info: "Normal", infoClass: "good" },
  { min: 25, max: 29.9, info: "Sobrepeso", infoClass: "low" },
  { min: 30, max: 39.9, info: "Obesidade", infoClass: "medium" },
  { min: 40, max: 99, info: "Obesidade grave", infoClass: "high" },
];

describe("paraNumero", () => {
  it("aceita vírgula e ponto como decimal", () => {
    expect(paraNumero("1,75")).toBe(1.75);
    expect(paraNumero("1.75")).toBe(1.75);
  });

  it("devolve NaN para texto vazio", () => {
    expect(paraNumero("")).toBeNaN();
  });
});

describe("calcularImc", () => {
  it("calcula e classifica um IMC normal", () => {
    expect(calcularImc("1,75", "70,5", FAIXAS)).toEqual({
      imc: "23,0",
      info: "Normal",
      infoClass: "good",
    });
  });

  it("entende altura digitada em centímetros", () => {
    expect(calcularImc("175", "70,5", FAIXAS).imc).toBe("23,0");
  });

  it("arredonda antes de comparar: 18,48 vira 18,5 e cai em Normal", () => {
    expect(calcularImc("1,75", "56,6", FAIXAS).info).toBe("Normal");
  });

  it.each([
    ["peso abaixo do limite", "1,75", "7"],
    ["peso acima do limite", "1,75", "500"],
    ["altura absurda", "40", "70"],
    ["campo vazio", "", "70"],
  ])("recusa %s", (_, altura, peso) => {
    expect(calcularImc(altura, peso, FAIXAS)).toBeNull();
  });
});

describe("calcularTmb", () => {
  it("usa a fórmula de Mifflin-St Jeor para homens", () => {
    // 10×80 + 6,25×180 − 5×30 + 5 = 1780
    expect(calcularTmb("masculino", "30", "80", "180", "3")).toEqual({
      tmb: "1.780",
      gct: "2.759", // 1780 × 1,55
      caloriasPerda: "2.207", // −20%
      caloriasGanha: "3.311", // +20%
    });
  });

  it("aplica o ajuste de −161 para mulheres", () => {
    // 10×62 + 6,25×165 − 5×30 − 161 = 1340,25
    expect(calcularTmb("feminino", "30", "62", "165", "1").tmb).toBe("1.340");
  });

  it("dá o mesmo resultado com altura em metros ou em cm", () => {
    expect(calcularTmb("feminino", "30", "62", "1,65", "2")).toEqual(
      calcularTmb("feminino", "30", "62", "165", "2")
    );
  });

  it("recusa idade impossível (não deixa a TMB ficar negativa)", () => {
    expect(calcularTmb("feminino", "305", "62", "165", "2")).toBeNull();
  });

  it("recusa sexo ou nível de atividade não informados", () => {
    expect(calcularTmb("", "30", "62", "165", "2")).toBeNull();
    expect(calcularTmb("feminino", "30", "62", "165", "")).toBeNull();
  });
});

describe("calcularAgua", () => {
  it("recomenda de 35 a 40 ml por kg, em litros", () => {
    expect(calcularAgua("70")).toEqual({ aguaMinima: 2.45, aguaMaxima: 2.8 });
  });

  it("devolve números, não texto (a tabela faz contas com eles)", () => {
    const { aguaMinima } = calcularAgua("70");
    expect(typeof aguaMinima).toBe("number");
  });

  it("recusa peso fora dos limites", () => {
    expect(calcularAgua("10")).toBeNull();
  });
});

describe("calcularLbm", () => {
  it("calcula a composição corporal pela fórmula de Boer", () => {
    expect(calcularLbm("masculino", "80", "180")).toEqual({
      weight: 80,
      massaMagra: 61.4,
      massaGorda: 18.6,
      percentoGordura: 23.2,
    });
  });

  it("massa magra + massa gorda = peso total", () => {
    const r = calcularLbm("feminino", "60", "165");
    expect(r.massaMagra + r.massaGorda).toBeCloseTo(60, 0);
  });

  it("recusa combinações em que a fórmula daria gordura negativa", () => {
    expect(calcularLbm("feminino", "45", "180")).toBeNull();
  });
});