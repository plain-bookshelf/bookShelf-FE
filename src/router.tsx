import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LogIn from './pages/logIn';
import Main from './pages/Main';
import My from './pages/Mypage';

export default function Router(){
  return(
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<LogIn />}/>
            <Route path='/' element={<Main/>} />
            <Route path='/My' element={<My/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}