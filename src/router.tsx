import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LogIn from './pages/logIn';

export default function Router(){
  return(
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<LogIn />}/>
            
        </Routes>
      </BrowserRouter>
    </>
  )
}