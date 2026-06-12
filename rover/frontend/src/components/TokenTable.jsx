function TokenTable({ tokens }) {
  if (!tokens || tokens.length === 0) {
    return (
      <>
        <h2 style={{ marginTop: '1.5rem' }}>Tokens</h2>
        <p className="empty-state">Sin tokens</p>
      </>
    )
  }

  return (
    <>
      <h2 style={{ marginTop: '1.5rem' }}>Tokens ({tokens.length})</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Lexema</th>
              <th>Línea</th>
              <th>Columna</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t, i) => (
              <tr key={i}>
                <td className="token-type">{t.tipo}</td>
                <td className="token-lexeme">{t.lexema}</td>
                <td>{t.linea}</td>
                <td>{t.columna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TokenTable
