<h1>
  <img src="public/favicon.svg" alt="" width="36" align="top" />
  Viva Leve
</h1>

Site de saúde com calculadoras e acompanhamento de peso, feito com React.
Calcule seu IMC, taxa metabólica basal, água recomendada e massa magra, e registre seu peso para ver sua evolução em um gráfico. Grátis e sem cadastro.

**🔗 Acesse:** [viva-leve.vercel.app](https://viva-leve.vercel.app) <!-- troque pelo endereço real depois do deploy -->

![Viva Leve: painel com IMC, evolução do peso e consumo de água](public/og-image.png)

---

## Funcionalidades

### Calculadoras de saúde
| Calculadora | O que mostra | Fórmula |
|---|---|---|
| **IMC** | Índice de massa corporal, com a sua faixa destacada na tabela de classificação | Peso ÷ altura² |
| **TMB** | Calorias gastas em repouso e quanto comer para manter, perder ou ganhar peso | Mifflin-St Jeor |
| **Água recomendada** | Meta diária em litros e em copos, distribuída por turno do dia | 35 a 40 ml por kg |
| **Massa magra** | Composição corporal com barra de proporção entre massa magra e gordura | Boer |

- Aceitam vírgula ou ponto, e altura em metros (`1,75`) ou centímetros (`175`)
- Recusam valores impossíveis (ex.: idade 305 ou peso 7 kg) em vez de mostrar resultados absurdos
- Enter calcula, e o teclado numérico abre automaticamente no celular

### Meu progresso
- Registro de peso por data, com um registro por dia (registrar de novo atualiza)
- Gráfico de evolução feito em SVG, sem biblioteca, com tooltip por mouse, toque e teclado
- Meta de peso opcional, com quanto falta e a variação destacada quando vai na direção certa
- Histórico com opção de desfazer exclusões
- Dados salvos no `localStorage`: ficam só no navegador da pessoa, sem login e sem servidor

### Também
- Artigos sobre alimentação e bem-estar
- Layout responsivo, do celular ao desktop
- Acessibilidade: HTML semântico, navegação por teclado, contraste adequado e suporte a `prefers-reduced-motion`
- SEO e imagem de compartilhamento para WhatsApp, LinkedIn e redes sociais

---

## Tecnologias

- **[React](https://react.dev)** com hooks (`useState`, `useEffect`, `useMemo`, `useRef`) e um hook próprio (`useLocalStorage`)
- **[Vite](https://vite.dev)** para desenvolvimento e build
- **CSS Modules** com variáveis CSS para cores e espaçamentos
- **[Material Tailwind](https://www.material-tailwind.com)** para o modal das calculadoras
- **[Vitest](https://vitest.dev)** para os testes

---

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
# Clone o repositório
git clone https://github.com/Mateusinhodev/viva-leve.git
cd viva-leve

# Instale as dependências
npm install

# Rode em modo de desenvolvimento (abre em http://localhost:5173)
npm run dev
```

Outros comandos:

```bash
npm test          # roda os testes (e roda de novo a cada arquivo salvo)
npm test -- --run # roda os testes uma vez só
npm run build     # gera a versão de produção na pasta dist/
```

---

## Estrutura

```
src/
├── components/     # Header, calculadoras, resultados, gráfico e estilos compartilhados
├── hooks/          # useLocalStorage
├── pages/          # Seções da página: Home, Main, Progresso, Artigos, Footer
├── utils/
│   ├── calculos.js # Fórmulas das calculadoras (funções puras)
│   ├── formatos.js # Filtros de digitação e formatação de números
│   ├── datas.js    # Datas no fuso local
│   └── *.test.js   # Testes de cada arquivo acima
├── data/           # Faixas de classificação do IMC
└── index.css       # Variáveis de cor, layout e estilos globais
```

---

## Testes

Os cálculos ficam em **funções puras** (`src/utils/calculos.js`): recebem números e devolvem resultados, sem depender de tela ou estado. Isso permite testar cada fórmula isoladamente.

São 33 testes, incluindo os casos que já foram bugs:

- altura digitada em centímetros é convertida corretamente
- idade 305 é recusada, em vez de gerar uma TMB negativa
- combinações em que a fórmula de Boer daria gordura negativa são recusadas
- datas não "voltam um dia" por causa do fuso horário (`new Date("2026-10-05")` é meia-noite em UTC, que no Brasil ainda é dia 4)

---

## Histórico do projeto

A primeira versão foi feita em 2025, quando comecei a estudar React. Em 2026, refatorei o projeto com o que aprendi desde então:

| Antes | Depois |
|---|---|
| CSS global, com estilos de uma calculadora sobrescrevendo os de outra | CSS Modules: cada componente com estilos isolados |
| 21 `useState` em um único componente | 2 estados, com os cálculos em funções separadas |
| Blocos de código repetidos para cada calculadora e artigo | Arrays de dados com `.map()` |
| Enter apagava o formulário, e no celular parte do resultado sumia | Bugs corrigidos e cobertos por testes |
| Tooltips que só funcionavam com mouse | Descrições visíveis em cards e navegação por teclado |
| Sem acompanhamento | Seção Meu progresso, com gráfico e meta |

---

## Aviso

As calculadoras e os conteúdos do Viva Leve são **informativos** e não substituem consulta com médico, nutricionista ou outro profissional de saúde.

---

Desenvolvido por **Mateus** · [GitHub](https://github.com/Mateusinhodev)