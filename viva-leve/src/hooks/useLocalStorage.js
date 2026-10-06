import { useEffect, useState } from "react";

/*
  Igual ao useState, mas o valor fica salvo no navegador
  e volta quando a pessoa reabre o site.

  const [registros, setRegistros] = useLocalStorage("chave", []);
*/
export default function useLocalStorage(chave, valorInicial) {
  // A função dentro do useState roda só na primeira renderização
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo !== null ? JSON.parse(salvo) : valorInicial;
    } catch {
      // Aba anônima, storage bloqueado ou JSON corrompido: começa do zero
      return valorInicial;
    }
  });

  // Toda vez que o valor muda, salva de novo
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      // Sem storage disponível: o site continua funcionando, só não salva
    }
  }, [chave, valor]);

  return [valor, setValor];
}