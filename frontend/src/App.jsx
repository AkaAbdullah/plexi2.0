import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AddNewOrders } from "./pages/AddNewOrders";
import { ViewAllOrders } from "./pages/ViewAllOrders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/addnew" element={<AddNewOrders />} />
          <Route path="/allorders" element={<ViewAllOrders />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
