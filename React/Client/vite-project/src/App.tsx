
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './Router'
import { Provider } from 'react-redux'
import store from './Store/Store'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </>
  )
}

export default App;
