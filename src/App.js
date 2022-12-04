import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./store/AuthProvider";

import MakeOrder from "./pages/MakeOrder";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./UI/layout/Layout";
import ProdutPage from "./pages/ProdutPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders/view" element={<OrdersPage />} />
            <Route path="/products/:productId" element={<ProdutPage />} />
            <Route path="/orders/make" element={<MakeOrder />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
