import Graph from './features/graph/Graph'

function App() {
  const nodes = [
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
  ]

  const links = [
    { source: 1, target: 2, type: 'Type 1' },
    { source: 2, target: 3, type: 'Type 2' },
  ]

  return (
    <div className="h-full w-full">
      <Graph nodes={nodes} links={links} />
    </div>
  )
}

export default App
