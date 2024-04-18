import "./App.css";
import "./styles/main.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./Routes/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;

// Enhanced version of Banner

{
  /* <Banner
  images={[banner1, banner2]}
  heading={"We Print What You Want!"}
  subHeading={`Click edit button to change this text. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sapien.`}
  buttonText={"Get Started"}
  tagline={"Best Quality Products"}
/>; */
}

// TODO: old app.jsx code

// <>
//   <BrowserRouter>
//     <Navbar />
//     <Routes>
//       <Route
//         index
//         element={
//           <>
//             <header>
//               <Banner
//                 images={[banner1, banner2]}
//                 heading={"We Print What You Want!"}
//                 subHeading={`Click edit button to change this text. Lorem ipsum dolor sit amet,
//         consectetur adipiscing elit. Sapien.`}
//                 buttonText={"Get Started"}
//                 tagline={"Best Quality Products"}
//               />
//             </header>
//             <main>
//               <PopularSection />
//               <FeaturesSection />
//               <DealOfTheDay />
//               <MostLovedProduct />
//               <FlexibleBorder />
//               <ClientReviewSection />
//               <FeaturedSection />
//             </main>
//           </>
//         }
//       />
//       <Route path="login" element={<Login />} />
//       <Route path="cart" element={<Cart />} />
//       <Route path="allproducts" element={<AllProducts />} />
//       <Route path="mugs" element={<AllProducts />} />
//       <Route path="tshirts" element={<AllProducts />} />
//       <Route path="About" element={<About />} />
//       <Route path="contact" element={<Contact />} />
//     </Routes>
//     <footer>
//       <Footer />
//     </footer>
//   </BrowserRouter>
// </>
