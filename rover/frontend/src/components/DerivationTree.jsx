const NODE_RADIUS = 38
const VERTICAL_GAP = 90
const MIN_SPACING = 100

function isLeaf(node) {
  return !node.hijos || node.hijos.length === 0
}

function getSubtreeWidth(node) {
  if (isLeaf(node)) return MIN_SPACING
  const w = node.hijos.reduce((s, c) => s + getSubtreeWidth(c), 0)
  return Math.max(w, MIN_SPACING)
}

function layout(node, x, y, nodes, edges) {
  const id = nodes.length
  const leaf = isLeaf(node)

  const label = formatLabel(node.simbolo)
  nodes.push({ id, label, raw: node.simbolo, lexema: node.lexema, x, y, leaf })

  if (!leaf) {
    const totalW = node.hijos.reduce((s, c) => s + getSubtreeWidth(c), 0)
    let cx = x - totalW / 2
    node.hijos.forEach((child) => {
      const cw = getSubtreeWidth(child)
      const childId = nodes.length
      layout(child, cx + cw / 2, y + VERTICAL_GAP, nodes, edges)
      edges.push({ from: id, to: childId })
      cx += cw
    })
  }
}

function formatLabel(s) {
  const parts = s.split(/(?=[A-Z][a-z])|_/).filter(Boolean)
  if (parts.length <= 1) return s
  const capped = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
  return capped.join(' ')
}

function fontSize(lines) {
  const longest = Math.max(...lines.map(l => l.length))
  if (longest > 12) return 9
  if (longest > 8) return 10
  return 11
}

function wrapLines(label) {
  if (label.length <= 10) return [label]
  const mid = Math.ceil(label.length / 2)
  const spaceIdx = label.indexOf(' ', mid)
  if (spaceIdx > 0) {
    return [label.slice(0, spaceIdx), label.slice(spaceIdx + 1)]
  }
  return [label]
}

function renderSVG(node) {
  const nodes = []
  const edges = []
  const totalW = getSubtreeWidth(node)
  layout(node, totalW / 2, NODE_RADIUS + 12, nodes, edges)

  let minX = Infinity, maxX = -Infinity, maxY = -Infinity
  nodes.forEach(n => {
    if (n.x - NODE_RADIUS < minX) minX = n.x - NODE_RADIUS
    if (n.x + NODE_RADIUS > maxX) maxX = n.x + NODE_RADIUS
    if (n.y + NODE_RADIUS > maxY) maxY = n.y + NODE_RADIUS
  })

  const pad = 40
  const w = Math.max(600, maxX - minX + pad * 2)
  const h = maxY + pad * 2

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`
  svg += `<defs>
    <filter id="s">
      <feDropShadow dx="1" dy="1" stdDeviation="3" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>`

  edges.forEach(e => {
    const from = nodes[e.from], to = nodes[e.to]
    const x1 = from.x - minX + pad, y1 = from.y + NODE_RADIUS
    const x2 = to.x - minX + pad, y2 = to.y - NODE_RADIUS
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#4a6cf7" stroke-width="2.5"/>`
  })

  nodes.forEach(n => {
    const cx = n.x - minX + pad, cy = n.y
    const fill = n.leaf ? '#2a2a12' : '#12123a'
    const stroke = n.leaf ? '#e8b830' : '#4a6cf7'
    const textFill = n.leaf ? '#f0c060' : '#aaccff'
    const lines = wrapLines(n.label)
    const fs = fontSize(lines)

    svg += `<circle cx="${cx}" cy="${cy}" r="${NODE_RADIUS}" fill="${fill}" stroke="${stroke}" stroke-width="2.5" filter="url(#s)"/>`

    const totalTextH = lines.length * (fs + 2)
    const startY = cy - totalTextH / 2 + (fs + 2) / 2
    lines.forEach((line, i) => {
      svg += `<text x="${cx}" y="${startY + i * (fs + 2)}" font-size="${fs}" font-weight="600"
                   fill="${textFill}" text-anchor="middle" dominant-baseline="middle"
                   font-family="system-ui, sans-serif">${esc(line)}</text>`
    })

    if (n.leaf && n.lexema != null) {
      svg += `<text x="${cx}" y="${cy + NODE_RADIUS + 15}" font-size="10" font-weight="400"
                   fill="#7acc8a" text-anchor="middle" font-family="monospace">«${esc(n.lexema)}»</text>`
    }
  })

  svg += '</svg>'
  return svg
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function DerivationTree({ node }) {
  if (!node) return <p className="empty-state">Sin árbol</p>
  return <div className="tree-svg-box" dangerouslySetInnerHTML={{ __html: renderSVG(node) }} />
}

export default DerivationTree
