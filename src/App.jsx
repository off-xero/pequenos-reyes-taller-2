import ComunicadosBoard from './components/ComunicadosBoard.jsx'
import comunicados from './data/comunicados.json'

function App() {
  return <ComunicadosBoard comunicados={comunicados} />
}

export default App
