import Graph from './features/graph/Graph'

function App() {
  const nodes = [
    { id: 0, label: 'Node 1' },
    { id: 1, label: 'Node 2' },
    { id: 2, label: 'Node 3' },
    { id: 3, label: 'Node 4' },
    { id: 4, label: 'Node 5' },
    { id: 5, label: 'Node 6' },
    { id: 6, label: 'Node 7' },
    { id: 7, label: 'Node 8' },
    { id: 8, label: 'Node 9' },
    { id: 9, label: 'Node 10' },
    { id: 10, label: 'Node 11' },
    { id: 11, label: 'Node 12' },
    { id: 12, label: 'Node 13' },
    { id: 13, label: 'Node 14' },
    { id: 14, label: 'Node 15' },
    { id: 15, label: 'Node 16' },
    { id: 16, label: 'Node 17' },
    { id: 17, label: 'Node 18' },
    { id: 18, label: 'Node 19' },
    { id: 19, label: 'Node 20' },
  ]

  const links = [
    { source: 0, target: 1, type: 'link' },
    { source: 0, target: 2, type: 'link' },
    { source: 1, target: 2, type: 'link' },
    { source: 1, target: 5, type: 'link' },
    { source: 2, target: 3, type: 'link' },
    { source: 3, target: 4, type: 'link' },
    { source: 4, target: 5, type: 'link' },
    { source: 5, target: 6, type: 'link' },
    { source: 6, target: 7, type: 'link' },
    { source: 7, target: 8, type: 'link' },
    { source: 8, target: 9, type: 'link' },
    { source: 9, target: 10, type: 'link' },
    { source: 10, target: 11, type: 'link' },
    { source: 11, target: 12, type: 'link' },
    { source: 12, target: 13, type: 'link' },
    { source: 13, target: 14, type: 'link' },
    { source: 14, target: 15, type: 'link' },
    { source: 15, target: 16, type: 'link' },
    { source: 16, target: 17, type: 'link' },
    { source: 17, target: 18, type: 'link' },
    { source: 18, target: 19, type: 'link' },
  ]

  return (
    <div className="h-full w-full">
      <Graph nodes={nodes} relations={links} />
    </div>
  )
}

export default App
