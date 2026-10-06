import Header from "./components/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Main from "./pages/Main/Main.jsx";
import Progresso from "./pages/Progresso/Progresso.jsx";
import Artigo from "./pages/Artigos/Artigos.jsx";
import Footer from "./pages/Footer/Footer.jsx";

function App() {
  return (
    <>
      <Header />

      <main>
        <Home />

        <Main />
        <Progresso />
        <Artigo />
      </main>

      <Footer />
    </>
  );
}

export default App;