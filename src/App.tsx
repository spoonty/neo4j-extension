import GraphProvider from '@/features/graph/Provider'
import ToastProvider from '@/ui/Toast/Provider'

function App() {
  return (
    <div className="h-full w-full bg-background-dark">
      <ToastProvider>
        <GraphProvider />
      </ToastProvider>
    </div>
  )
}

export default App
