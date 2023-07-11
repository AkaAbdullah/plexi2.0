import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ViewAllOrders } from "./pages/ViewAllOrders";
import { GenrateOrders } from "./pages/GenrateOrders";
import { AddNewOrders } from "./pages/AddNewOrders";
import { UpdateOrders } from "./pages/UpdateOrders";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { UserProfile } from "./pages/UserProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<ProtectedRoutes Component={HomePage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={<ProtectedRoutes Component={AdminPage} />}
          />
          <Route
            path="/genrateorders"
            element={<ProtectedRoutes Component={GenrateOrders} />}
          />
          <Route
            path="/allorders"
            element={<ProtectedRoutes Component={ViewAllOrders} />}
          />
          <Route
            path="/addnew"
            element={<ProtectedRoutes Component={AddNewOrders} />}
          />
          <Route
            path="/update"
            element={<ProtectedRoutes Component={UpdateOrders} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoutes Component={UserProfile} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
