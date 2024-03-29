import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './templates/Header/NavBar';
import Accueil from './components/Accueil';
import LoginUser from "./components/User/LoginUser";
import RegisterUser from "./components/User/RegisterUser";
import News from "../src/templates/News/Articles";
import Edit from './components/User/Edit';
import MyCrypto from "./components/MesCryptos";
import DetailsCrypto from "./components/DetailsCrypto";
import CryptoList from './components/User/CryptoList';
import MesNews from './components/User/MesNews';
import Dashborad from './components/User/Admin/Dashborad'
import EditeUser from './components/User/Admin/EditeUser';
import AddUser from './components/User/Admin/AddUser';

function App() {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const Pref = ({children}) => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    // console.log(user.news.length)        <Route path='/coin/:coinId' element={<DetailCrypto/>} />
    if (user) {
      return user
    }
    return children
  };
  return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Accueil/>} />
            <Route path='/myCrypto' element={<MyCrypto/>} />
            <Route path='/:coinId' element={<DetailsCrypto/>} />
            <Route path='/news' element={<News user={user} />} />
            <Route path='/login' element={<LoginUser />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/Edit/:id' element={<Edit />} />
            <Route path="/mes-cryptos" element={<CryptoList />} />
            <Route path="/articlesPrefs" element={<MesNews />} />
            <Route path='/dashboard' element={<Dashborad />} />
            <Route path='/dashboard/edit-user/:id' element={<EditeUser />} />
            <Route path='/dashboard/add-user' element={<AddUser />} />
      


          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;