function TreeNode({ node, depth, isLast, prefix }) {
  const indent = prefix || ''
  const connector = depth === 0 ? '' : (isLast ? '└── ' : '├── ')
  const childPrefix = depth === 0 ? '' : (prefix || '') + (isLast ? '    ' : '│   ')

  const isTerminal = node.hijos === null || node.hijos === undefined || node.hijos.length === 0

  return (
    <>
      <div className="tree-line">
        {depth > 0 && (
          <span className="tree-indent">{indent}</span>
        )}
        {depth > 0 && (
          <span className="tree-connector">{connector}</span>
        )}
        <span className={`tree-node-label ${isTerminal ? 'terminal' : ''}`}>
          {node.simbolo}
          {isTerminal && node.lexema != null && (
            <span className="lexeme"> &laquo;{node.lexema}&raquo;</span>
          )}
        </span>
      </div>
      {node.hijos && node.hijos.map((hijo, i) => (
        <TreeNode
          key={i}
          node={hijo}
          depth={depth + 1}
          isLast={i === node.hijos.length - 1}
          prefix={childPrefix}
        />
      ))}
    </>
  )
}

function DerivationTree({ node }) {
  if (!node) return <p className="empty-state">Sin árbol</p>

  return (
    <div className="tree-container">
      <TreeNode node={node} depth={0} isLast={true} prefix="" />
    </div>
  )
}

export default DerivationTree
