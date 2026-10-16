
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
      <Navbar />
      <AuthPopup />

      <main className="min-h-screen">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/laptops" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/student" element={<Student />} />
          <Route path="/business" element={<Business />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Login required */}
          <Route
            path="/service"
            element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            }
          />

          {/* Unknown URL */}
          <Route
            path="*"
            element={
              <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-center text-white">
                <h1 className="text-5xl font-black">404</h1>
                <p className="text-slate-400">
                  Sorry, this LaptopHub page was not found.
                </p>
                <a
                  href="/"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500"
                >
                  Back to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
