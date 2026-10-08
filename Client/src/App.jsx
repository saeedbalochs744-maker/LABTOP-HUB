import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";
import SignIn from "./Pages/SignIn";

function App() {
  return (
    <BrowserRouter>

      {/* ONE NAVBAR */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/laptops" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      {/* ONE FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;