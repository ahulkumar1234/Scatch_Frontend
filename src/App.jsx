import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import AuthPage from './components/AuthSystem/AuthPage'
import OwnerAuth from './components/AuthSystem/OwnerAuth';
import { Toaster } from "react-hot-toast";
import Shop from './pages/ShopPage/Shop';
import OwnerPanel from './pages/OwnerPage/OwnerPanel';
import Navbar from './components/Navbar/Navbar';
import About from './pages/AboutPage/About';
import ProtectedRoute from './components/AuthSystem/ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';  // <-- IMPORTANT
import Cart from './pages/CartPage/Cart';
import DetailProd from './pages/ProductDetails/DetailProd';
import StorePage from './pages/OwnerPage/StorePage';

function App() {

  // const location = useLocation();
  // const hideNavbarRoutes = ["/owner", "/ownerpanel"];   // <-- yaha owner pages list hai
  // const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>

        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          {/* {shouldShowNavbar && <Navbar />}    */}
          <Navbar />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path='/owner' element={<OwnerAuth />} />
            <Route path='/ownerpanel' element={<OwnerPanel />} />
            <Route path='/ownerstore' element={<StorePage/>}/>

            {/* Protected Routes */}
            <Route path='/shop' element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
            <Route path='/details/:id' element={<ProtectedRoute><DetailProd/></ProtectedRoute>} />
          </Routes>
        </Router>

    </AuthProvider>
  )
}

export default App;
