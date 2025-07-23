import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~shared/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Router from './router'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
