import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ViewAllOrders } from "./pages/ViewAllOrders";
import { GenrateOrders } from "./pages/GenrateOrders";
import { AddNewOrders } from "./pages/AddNewOrders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/genrateOrders" element={<GenrateOrders />} />
          <Route path="/allorders" element={<ViewAllOrders />} />
          <Route path="/addnew" element={<AddNewOrders />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
