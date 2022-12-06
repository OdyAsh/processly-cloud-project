import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./store/AuthProvider";

import HomePage from "./pages/client/HomePage";
import MakeAnOrderPage from "./pages/client/MakeAnOrderPage";
import ViewOrdersPage from "./pages/client/ViewOrdersPage";
import OrderDetailsPage from "./pages/client/OrderDetailsPage";
import AboutPage from "./pages/client/AboutPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./UI/layout/Layout";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders/make" element={<MakeAnOrderPage />} />
            <Route path="/orders/view" element={<ViewOrdersPage />} />
            <Route
              path="/orders/view/:orderId"
              element={<OrderDetailsPage />}
            />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
