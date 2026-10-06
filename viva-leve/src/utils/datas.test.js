import { describe, it, expect, vi, afterEach } from "vitest";
import { hojeISO, paraData, dataCurta, dataLonga } from "./datas.js";

describe("hojeISO", () => {
  afterEach(() => vi.useRealTimers());

  it("devolve a data local no formato AAAA-MM-DD", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 5, 23, 30)); // 5/out, 23h30 no horário local
    expect(hojeISO()).toBe("2026-10-05");
  });

  it("completa mês e dia com zero", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 7));
    expect(hojeISO()).toBe("2026-01-07");
  });
});

describe("paraData", () => {
  it("não volta um dia por causa do fuso (a armadilha do new Date('AAAA-MM-DD'))", () => {
    const d = paraData("2026-10-05");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(9); // outubro (os meses começam em 0)
    expect(d.getDate()).toBe(5);
  });
});

describe("formatos de exibição", () => {
  it("dataCurta: dia e mês abreviado", () => {
    expect(dataCurta("2026-10-05")).toBe("5 out");
    expect(dataCurta("2026-08-10")).toBe("10 ago");
  });

  it("dataLonga: padrão brasileiro", () => {
    expect(dataLonga("2026-10-05")).toBe("05/10/2026");
  });
});