import { useState } from 'react'

const EXAMPLES = [
  { code: 'MOVE FORWARD 10 METERS; TURN LEFT 90 DEGREES; TAKE SAMPLE FROM SOIL;', valid: true },
  { code: 'MOVE BACKWARD 5 METERS;', valid: true },
  { code: 'MOVE FORWARD 10 METERS; TURN RIGHT 45 DEGREES;', valid: true },
  { code: 'TAKE SAMPLE FROM ROCK; TURN LEFT 180 DEGREES; MOVE FORWARD 20 METERS;', valid: true },
  { code: 'TAKE SAMPLE FROM GAS;', valid: true },
  { code: 'MOVE SIDEWAYS 10 METERS;', valid: false },
  { code: 'MOVE 10 METERS;', valid: false },
  { code: 'TURN 90 DEGREES;', valid: false },
  { code: 'TAKE SAMPLE FROM;', valid: false },
  { code: 'MOVE FORWARD 10 METERS @!ñ;', valid: false },
  { code: 'MOVE FORWARD 0 METERS;', valid: true },
  { code: 'MOVE FORWARD 3.14 METERS;', valid: true },
  { code: 'MOVE FORWARD 10 METERS; TURN LEFT 90 DEGREES; TAKE SAMPLE FROM SOIL; 42;', valid: false },
  { code: 'MOVE FORWARD 10 METERS; TURN LEFT 90 DEGREES;TAKE SAMPLE FROM SOIL;', valid: true },
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
              onClick={() => handleExample(ex.code)}
              style={{
                fontSize: '0.75rem',
                padding: '0.3rem 0.7rem',
                background: ex.valid ? '#1a3a2a' : '#3a1a1a',
                color: ex.valid ? '#4ade80' : '#f87171',
                border: `1px solid ${ex.valid ? '#4ade80' : '#f87171'}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
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
