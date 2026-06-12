const GRAMMAR = [
  { lhs: 'programa', rhs: ['lista_comandos'] },
  { lhs: 'lista_comandos', rhs: ['comando', 'PUNTOYCOMA'] },
  { lhs: 'lista_comandos', rhs: ['comando', 'PUNTOYCOMA', 'lista_comandos'] },
  { lhs: 'comando', rhs: ['comando_move'] },
  { lhs: 'comando', rhs: ['comando_turn'] },
  { lhs: 'comando', rhs: ['comando_sample'] },
  { lhs: 'comando_move', rhs: ['MOVE', 'dir_move', 'NUMERO', 'METERS'] },
  { lhs: 'dir_move', rhs: ['FORWARD'] },
  { lhs: 'dir_move', rhs: ['BACKWARD'] },
  { lhs: 'comando_turn', rhs: ['TURN', 'dir_turn', 'NUMERO', 'DEGREES'] },
  { lhs: 'dir_turn', rhs: ['LEFT'] },
  { lhs: 'dir_turn', rhs: ['RIGHT'] },
  { lhs: 'comando_sample', rhs: ['TAKE', 'SAMPLE', 'FROM', 'terreno'] },
  { lhs: 'terreno', rhs: ['SOIL'] },
  { lhs: 'terreno', rhs: ['ROCK'] },
  { lhs: 'terreno', rhs: ['GAS'] },
]

function isTerminal(s) {
  if (s === 'NUMERO' || s === 'PUNTOYCOMA') return true
  return s === s.toUpperCase()
}

function GrammarDisplay() {
  return (
    <div className="grammar-section">
      <h2>Gramática</h2>
      <div className="grammar-rules">
        {GRAMMAR.map((rule, i) => (
          <div key={i} className="grammar-rule">
            <span className="nonterm">{rule.lhs}</span>
            <span className="arrow">→</span>
            {rule.rhs.map((sym, j) => (
              <span key={j}>
                {j > 0 && <span className="pipe"> </span>}
                <span className={isTerminal(sym) ? 'term' : 'nonterm'}>{sym}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GrammarDisplay
