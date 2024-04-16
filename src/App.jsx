import "./App.css";
import "./styles/main.scss";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import PopularSection from "./components/PopularSection/PopularSection";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import banner1 from "./assets/MainBannerPhoto.png";
import banner2 from "./assets/MainBannerPhoto@2x.png";
import DealOfTheDay from "./components/DealOfTheDay/DealOfTheDay";
import MostLovedProduct from "./components/MostLovedProducts/MostLovedProduct";
import FlexibleBorder from "./components/ui/FlexibleBorder/FlexibleBorder";
import ClientReviewSection from "./components/ClientReviewSection/ClientReviewSection";
import FeaturedSection from "./components/FeaturedSection/FeaturedSection";
import Footer from "./components/Footer/Footer";
import AllProducts from "./pages/AllProducts/AllProducts";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            index
            element={
              <>
                <header>
                  <Banner
                    images={[banner1, banner2]}
                    heading={"We Print What You Want!"}
                    subHeading={`Click edit button to change this text. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sapien.`}
                    buttonText={"Get Started"}
                    tagline={"Best Quality Products"}
                  />
                </header>
                <main>
                  <PopularSection />
                  <FeaturesSection />
                  <DealOfTheDay />
                  <MostLovedProduct />
                  <FlexibleBorder />
                  <ClientReviewSection />
                  <FeaturedSection />
                </main>
              </>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="mugs" element={<AllProducts />} />
          <Route path="tshirts" element={<AllProducts />} />
          <Route path="About" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;

// Enhanced version of Banner

<Banner
  images={[banner1, banner2]}
  heading={"We Print What You Want!"}
  subHeading={`Click edit button to change this text. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sapien.`}
  buttonText={"Get Started"}
  tagline={"Best Quality Products"}
/>;
