import { useState } from "react";
import { Dialog } from "@material-tailwind/react";

import diarioPDF from "../../assets/Diario_Viva_Leve.pdf";
import ImcCalc from "../../components/ImcCalc";
import ImcTable from "../../components/ImcTable";
import TmbCalc from "../../components/TmbCalc.jsx";
import TmbTable from "../../components/TmbTable.jsx";
import AguaCalc from "../../components/AguaCalc.jsx";
import AguaTable from "../../components/AguaTable.jsx";
import LbmCalc from "../../components/LbmCalc.jsx";
import LbmTable from "../../components/LbmTable.jsx";

import { data } from "../../data/data.js";
import {
  calcularImc,
  calcularTmb,
  calcularAgua,
  calcularLbm,
} from "../../utils/calculos.js";

import styles from "./Main.module.css";

/* Dados dos cards: para adicionar uma calculadora nova, basta incluir aqui */
const CALCULADORAS = [
  {
    id: "imc",
    sigla: "IMC",
    nome: "Índice de Massa Corporal",
    descricao: "Medida internacional que indica se o seu peso está adequado para a sua altura.",
  },
  {
    id: "tmb",
    sigla: "TMB",
    nome: "Taxa Metabólica Basal",
    descricao: "Estima quantas calorias o seu corpo gasta por dia, em repouso e com atividade física.",
  },
  {
    id: "agua",
    sigla: "Água",
    nome: "Água recomendada",
    descricao: "Descubra quantos litros de água beber por dia com base no seu peso.",
  },
  {
    id: "lbm",
    sigla: "LBM",
    nome: "Massa magra",
    descricao: "Calcula quanto do seu peso é músculo, osso, órgãos e água — e quanto é gordura.",
  },
];

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/pesquisa?q=Tratamento+de+obesidade&loc=&filters%5Bservices%5D%5B%5D=3731&utm_source=meupesominhajornada_website&utm_medium=banner&utm_campaign=awareness_bookings";

export default function Main() {
  const [aberta, setAberta] = useState(null); // "imc" | "tmb" | "agua" | "lbm" | null
  // Guarda a última calculadora aberta para o conteúdo não sumir durante a animação de fechar
  const [atual, setAtual] = useState(null);
  const [resultados, setResultados] = useState({}); // ex.: { imc: { imc, info, infoClass } }

  const abrir = (id) => {
    setAtual(id);
    setAberta(id);
  };

  const salvar = (id, resultado) =>
    setResultados((anteriores) => ({ ...anteriores, [id]: resultado }));

  // Limpa só a calculadora indicada (as outras mantêm seus resultados)
  const limpar = (id) =>
    setResultados((anteriores) => {
      const { [id]: _removido, ...resto } = anteriores;
      return resto;
    });

  // Salva o resultado ou, se o cálculo recusou os valores, avisa a pessoa
  const concluir = (id, resultado) => {
    if (resultado) {
      salvar(id, resultado);
    } else {
      alert(
        "Confira os valores digitados: idade entre 1 e 120 anos, peso entre 20 e 400 kg e altura entre 50 e 250 cm."
      );
    }
  };

  /* Handlers com a mesma assinatura que os formulários já usam */
  const calcImc = (e, altura, peso) => {
    e.preventDefault();
    concluir("imc", calcularImc(altura, peso, data));
  };

  const calcTmb = (e, sexo, idade, peso, altura, nivelFisico) => {
    e.preventDefault();
    concluir("tmb", calcularTmb(sexo, idade, peso, altura, nivelFisico));
  };

  const calcAgua = (e, peso) => {
    e.preventDefault();
    concluir("agua", calcularAgua(peso));
  };

  const calcLbm = (e, sexo, peso, altura) => {
    e.preventDefault();
    concluir("lbm", calcularLbm(sexo, peso, altura));
  };

  /* Mostra o formulário ou, se já houver resultado, a tabela */
  const renderConteudo = (id) => {
    const r = resultados[id];
    const resetCalc = () => limpar(id);

    switch (id) {
      case "imc":
        return r ? <ImcTable data={data} {...r} resetCalc={resetCalc} /> : <ImcCalc calcImc={calcImc} />;
      case "tmb":
        return r ? <TmbTable {...r} resetCalc={resetCalc} /> : <TmbCalc calcTmb={calcTmb} />;
      case "agua":
        return r ? <AguaTable {...r} resetCalc={resetCalc} /> : <AguaCalc calcAgua={calcAgua} />;
      case "lbm":
        return r ? <LbmTable {...r} resetCalc={resetCalc} /> : <LbmCalc calcLbm={calcLbm} />;
      default:
        return null;
    }
  };

  return (
    <div className={`container ${styles.main}`}>
      {/* ===== Calculadoras ===== */}
      <section id="calculadoras" aria-labelledby="calculadoras-titulo">
        <header className={styles.sectionHeader}>
          <h2 id="calculadoras-titulo" className={styles.sectionTitle}>
            Calculadoras de saúde
          </h2>
          <p className={styles.sectionSubtitle}>
            Escolha uma calculadora e descubra seus números em menos de um minuto.
          </p>
        </header>

        <ul className={styles.calcGrid}>
          {CALCULADORAS.map((calc) => (
            <li key={calc.id}>
              <button
                type="button"
                className={styles.calcCard}
                onClick={() => abrir(calc.id)}
              >
                <span className={styles.calcSigla}>{calc.sigla}</span>
                <span className={styles.calcNome}>{calc.nome}</span>
                <span className={styles.calcDescricao}>{calc.descricao}</span>
                <span className={styles.calcAcao} aria-hidden="true">
                  {resultados[calc.id] ? "Ver resultado →" : "Calcular →"}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Um único Dialog que troca de conteúdo conforme a calculadora aberta */}
        <Dialog open={aberta !== null} size="md" handler={() => setAberta(null)}>
          {atual && renderConteudo(atual)}
        </Dialog>
      </section>

      {/* ===== Jornada + Profissionais ===== */}
      <div className={styles.duo}>
        <section className={styles.panel} aria-labelledby="jornada-titulo">
          <h2 id="jornada-titulo" className={styles.panelTitle}>
            Minha jornada
          </h2>
          <p className={styles.panelText}>
            Alguns lembretes simples para te ajudar a cuidar de você com leveza:
          </p>

          <ul className={styles.checklist}>
            <li>Estabeleça metas reais e possíveis.</li>
            <li>Pese-se no máximo uma vez por semana.</li>
            <li>Observe como você se sente, não só o peso.</li>
            <li>Anote seus hábitos e pequenas vitórias.</li>
            <li>Cuide da água, do sono e da respiração.</li>
          </ul>

          <div className={styles.panelFooter}>
            <p className={styles.panelText}>Quer acompanhar seu progresso?</p>
            <div className={styles.panelActions}>
              <a href="#progresso" className={styles.btnPrimary}>
                Registrar meu peso
              </a>
              <a href={diarioPDF} className={styles.btnSecondary} download>
                Baixar diário em PDF
              </a>
            </div>
          </div>
        </section>

        <section className={styles.panel} aria-labelledby="profissionais-titulo">
          <h2 id="profissionais-titulo" className={styles.panelTitle}>
            Encontre ajuda profissional
          </h2>
          <p className={styles.panelText}>
            Nutricionistas e médicos podem montar um plano feito para você, com segurança.
          </p>

          <img
            src="https://imgur.com/ReDUX2B.jpeg"
            alt="Médica sorrindo em um consultório"
            className={styles.panelImg}
            loading="lazy"
          />

          <div className={styles.panelFooter}>
            <a
              href={DOCTORALIA_URL}
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buscar profissionais de saúde
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}