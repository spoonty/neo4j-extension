import GraphProvider from '@/features/graph/Provider'
import SessionProvider from '@/features/session/Provider'
import ToastProvider from '@/ui/Toast/Provider'

function App() {
  return (
    <div className="h-full w-full bg-background-dark">
      <ToastProvider>
        <SessionProvider>
          <GraphProvider />
        </SessionProvider>
      </ToastProvider>
    </div>
  )
}

export default App
