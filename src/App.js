import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./store/AuthProvider";

import MakeAnOrderPage from "./pages/MakeAnOrderPage";
import HomePage from "./pages/HomePage";
import ViewOrdersPage from "./pages/ViewOrdersPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./UI/layout/Layout";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders/view" element={<ViewOrdersPage />} />
            <Route
              path="/orders/view/:orderId"
              element={<OrderDetailsPage />}
            />
            <Route path="/orders/make" element={<MakeAnOrderPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
