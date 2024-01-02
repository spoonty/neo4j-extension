import AddNodeDrawer from '@/features/add-node/AddNodeDrawer'
import Graph from '@/features/graph/Graph'

function App() {
  return (
    <div className="h-full w-full bg-background-dark">
      <Graph />
      <AddNodeDrawer />
    </div>
  )
}

export default App
