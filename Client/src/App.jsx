import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AuthPopup from "./Components/AuthPopup";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";
import Gaming from "./Pages/Gaming";
import Student from "./Pages/Student";
import Business from "./Pages/Business";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      {/* ONE NAVBAR */}
      <Navbar />

      {/* opens automatically for logged-out visitors */}
      <AuthPopup />

      <Routes>
        {/* public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/laptops" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/student" element={<Student />} />
        <Route path="/business" element={<Business />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* needs login */}
        <Route
          path="/service"
          element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ONE FOOTER */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
