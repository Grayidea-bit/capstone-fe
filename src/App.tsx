import { BrowserRouter, useRoutes } from 'react-router-dom';

import { routes } from './routes/router';

function App() {
  const AppRouter = () => {
    return useRoutes(routes);
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
