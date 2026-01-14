import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// import Layout from './components/layout'
// import { ThemeProvider } from './context/theme-provider'
// import CityPage from './pages/city-page'


// const router=createBrowserRouter(
//   createRoutesFromElements(

//     <Route path='/' element={<Layout/>}>
//       <Route path='/city/:cityName' element={<CityPage/>}/>
//     </Route>
//   )
// )


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
