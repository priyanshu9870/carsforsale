// import logo from './logo.svg';
import './App.css';
import {

  Route, Routes
} from "react-router-dom";
import Layout from './components/Layout.js';
import Mainbody from './components/Mainbody.js';
import SignInlayout from './components/SignInlayout.js';
import LogInlayout from './components/LogInlayout.js';
import ByModel from './components/Bymodel.js';
import CarDetailsNew from './components/CarDetailsNew.js';
import { AuthProvider } from './AuthContext.js';
import Protectedroute from './Protectedroute.js';
import Notfound from './components/Notfound.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import ScrollToTop from './components/ScrollToTop.js';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Mainbody />} />
          <Route path='/login' element={<LogInlayout />} />
          <Route path="/Signin" element={<SignInlayout />} />
          <Route path="/model/:model" element={
            <Protectedroute>
              <ByModel />
            </Protectedroute>
          } />
          <Route path="/car-details/:model" element={
            <Protectedroute>
              <CarDetailsNew />
            </Protectedroute>
          } />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Notfound />} />
          {/* <Route path="/Pricing" element={<Pricing />} />       */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
