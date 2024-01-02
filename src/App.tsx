import AddNodeDrawer from '@/features/add-node/AddNodeDrawer'
import Graph from '@/features/graph/Graph'

function App() {
  return (
    <div className="h-full w-full bg-gray-500">
      <Graph />
      <AddNodeDrawer />
    </div>
  )
}

export default App
