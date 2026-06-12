import { useState } from 'react'
import CodeInput from './components/CodeInput'
import ResultPanel from './components/ResultPanel'
import DerivationTree from './components/DerivationTree'
import TokenTable from './components/TokenTable'
import GrammarDisplay from './components/GrammarDisplay'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleCompile(code) {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ valido: false, arbol: null, tokens: [], error: 'Error de conexión con el servidor: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Rover Lang</h1>
      <p className="subtitle">Intérprete de comandos para rover espacial</p>

      <GrammarDisplay />

      <CodeInput onCompile={handleCompile} loading={loading} />

      {result && (
        <>
          <div className="result-panel status-panel">
            <ResultPanel valido={result.valido} error={result.error} />
          </div>
          <div className="result-split">
            <div className="result-panel">
              <TokenTable tokens={result.tokens} />
            </div>
            <div className="result-panel tree-panel">
              <h2>Árbol de derivación</h2>
              {result.arbol ? (
                <DerivationTree node={result.arbol} />
              ) : (
                <p className="empty-state">No hay árbol (entrada inválida)</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
