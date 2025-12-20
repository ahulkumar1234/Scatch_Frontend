import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import AuthPage from './components/AuthSystem/AuthPage'
import OwnerAuth from './components/AuthSystem/OwnerAuth';
import { Toaster } from "react-hot-toast";
import Shop from './pages/ShopPage/Shop';
import OwnerPanel from './pages/OwnerPage/OwnerPanel';
// import Navbar from './components/Navbar/Navbar';
import About from './pages/AboutPage/About';
import ProtectedRoute from './components/AuthSystem/ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';  // <-- IMPORTANT
import Cart from './pages/CartPage/Cart';
import DetailProd from './pages/ProductDetails/DetailProd';
import StorePage from './pages/OwnerPage/StorePage';
import { OwnerAuthProvider } from './Context/CheckOwnerAuth';
import Address from './pages/AdressPage/Address';
import OrderPlace from './pages/OrderPlace/OrderPlace';
import Summary from './pages/Order-SummaryPage/Summary';
import Home from './pages/HomePage/Home';
import OwnerProtectedRoute from './components/AuthSystem/OwnerProtectedRoute';
// import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import OwnerLayout from './Layouts/OwnerLayout';
import UserLayout from './Layouts/UserLayout';
import Profile from './pages/UserProfile/Profile';
import Modal from './components/Profile/Modal';

function App() {
  return (
    <Router>
      <OwnerAuthProvider>
        <AuthProvider>

          <Toaster position="top-center" />

          <ScrollToTop>
<Modal/>
            <Routes>
              {/* OWNER ROUTES */}
              <Route element={<OwnerLayout />}>
                <Route path="/owner" element={<OwnerAuth />} />
                <Route
                  path="/ownerpanel/*"
                  element={
                    <OwnerProtectedRoute>
                      <OwnerPanel />
                    </OwnerProtectedRoute>
                  }
                />

                <Route
                  path="/ownerstore"
                  element={
                    <OwnerProtectedRoute>
                      <StorePage />
                    </OwnerProtectedRoute>
                  }
                />
              </Route>

              {/* USER ROUTES */}
              <Route element={<UserLayout />}>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/details/:id" element={<ProtectedRoute><DetailProd /></ProtectedRoute>} />
              </Route>
              <Route path="/checkout/address" element={<ProtectedRoute><Address /></ProtectedRoute>} />
              <Route path="/checkout/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
              <Route path="/checkout/orders/:orderId" element={<ProtectedRoute><OrderPlace /></ProtectedRoute>} />

            </Routes>
          </ScrollToTop>

        </AuthProvider>
      </OwnerAuthProvider>
    </Router>
  );
}

export default App;
