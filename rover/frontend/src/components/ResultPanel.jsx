function ResultPanel({ valido, error }) {
  return (
    <>
      <h2>Resultado</h2>
      <div className={`status-badge ${valido ? 'valido' : 'invalido'}`}>
        {valido ? 'VÁLIDO' : 'INVÁLIDO'}
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  )
}

export default ResultPanel
