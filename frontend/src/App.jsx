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
import { useSelector } from "react-redux";
import { Charts } from "./pages/Charts";
import { MergePDF } from "./pages/MergePDF";

function App() {
  const { darkMode } = useSelector((state) => state.theme);
  return (
    <>
      <BrowserRouter>
        <Header />
        <div id="root" className={`${darkMode ? "dark-mode" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoutes Component={HomePage} />}
            />
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
            <Route
              path="/sales"
              element={<ProtectedRoutes Component={Charts} />}
            />
            <Route
              path="/merge"
              element={<ProtectedRoutes Component={MergePDF} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
