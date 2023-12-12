import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './templates/Header/NavBar';
import Accueil from './components/Accueil';
import LoginUser from "./components/User/LoginUser";
import RegisterUser from "./components/User/RegisterUser";
import News from "../src/templates/News/Articles";
import Edit from './components/User/Edit';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
      <Routes>
        <Route path='/' element={<Accueil />} />
          <Route path='/news' element={<News />} />
        <Route path='/login' element={<LoginUser />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/Edit/:id' element={<Edit />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
