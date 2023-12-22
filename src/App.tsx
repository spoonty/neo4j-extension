import Graph from './features/graph/Graph'

function App() {
  // Ваши данные для графа (узлы и связи)
  const graphNodes = [
    { id: '1' },
    { id: '2' },
    // Добавьте дополнительные узлы
  ]

  const graphLinks = [
    { source: '1', target: '2' },
    // Добавьте дополнительные связи
  ]

  return (
    <div>
      <h1>Graph with D3.js and React</h1>
      <Graph nodes={graphNodes} links={graphLinks} />
    </div>
  )
}

export default App
