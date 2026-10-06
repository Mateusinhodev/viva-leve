import { describe, it, expect } from "vitest";
import { somenteDecimal, somenteInteiro, formatarKg, formatarVariacao } from "./formatos.js";

describe("somenteDecimal", () => {
  it.each([
    ["1.7a5", "1,75"], // letra removida, ponto vira vírgula
    ["1,,75", "1,75"], // só um separador
    ["70.5", "70,5"],
    ["abc", ""],
  ])("%s → %s", (entrada, esperado) => {
    expect(somenteDecimal(entrada)).toBe(esperado);
  });
});

describe("somenteInteiro", () => {
  it("remove tudo que não é dígito e limita o tamanho", () => {
    expect(somenteInteiro("3a0")).toBe("30");
    expect(somenteInteiro("12345")).toBe("123");
    expect(somenteInteiro("12345", 5)).toBe("12345");
  });
});

describe("formatarKg", () => {
  it("usa vírgula e sempre uma casa decimal", () => {
    expect(formatarKg(72.4)).toBe("72,4");
    expect(formatarKg(70)).toBe("70,0");
    expect(formatarKg(61.42)).toBe("61,4");
  });
});

describe("formatarVariacao", () => {
  it("mostra o sinal da variação", () => {
    expect(formatarVariacao(-3.2)).toBe("−3,2");
    expect(formatarVariacao(1.5)).toBe("+1,5");
  });

  it("não mostra sinal quando praticamente não mudou", () => {
    expect(formatarVariacao(0)).toBe("0,0");
    expect(formatarVariacao(0.01)).toBe("0,0");
  });
});