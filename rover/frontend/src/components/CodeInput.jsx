import { useState } from 'react'

const EXAMPLES = [
  'MOVE FORWARD 10 METERS; TURN LEFT 90 DEGREES; TAKE SAMPLE FROM SOIL;',
  'MOVE BACKWARD 5 METERS;',
  'MOVE FORWARD 10 METERS; TURN RIGHT 45 DEGREES;',
  'TAKE SAMPLE FROM ROCK; TURN LEFT 180 DEGREES; MOVE FORWARD 20 METERS;',
  'TAKE SAMPLE FROM GAS;',
  'MOVE SIDEWAYS 10 METERS;',
  'MOVE 10 METERS;',
  'TURN 90 DEGREES;',
  'TAKE SAMPLE FROM;',
]

function CodeInput({ onCompile, loading }) {
  const [code, setCode] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (code.trim()) onCompile(code.trim())
  }

  function handleExample(example) {
    setCode(example)
  }

  return (
    <form className="editor-section" onSubmit={handleSubmit}>
      <label htmlFor="code">Comandos del rover</label>
      <textarea
        id="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Escribe comandos aquí… ej: MOVE FORWARD 10 METERS;"
        spellCheck={false}
      />
      <div className="actions">
        <button type="submit" disabled={loading || !code.trim()}>
          {loading ? 'Compilando…' : 'Compilar'}
        </button>
        <button type="button" className="secondary" onClick={() => setCode('')}>
          Limpiar
        </button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>Ejemplos rápidos</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              type="button"
              className="secondary"
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}
              onClick={() => handleExample(ex)}
            >
              Ejemplo {i + 1}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}

export default CodeInput
