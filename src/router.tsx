import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LogIn from './pages/logIn';
import Main from './pages/Main';
import My from './pages/Mypage';
import SingUp from './pages/singUp';
import Layout from './layouts/Layout';
import RecommandList from './pages/Recommand';

export default function Router(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<LogIn />}/>
            <Route path='/signup' element={<SingUp />}/>
            <Route path='/my' element={<My />} />
            <Route path='/recommand' element={<RecommandList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}