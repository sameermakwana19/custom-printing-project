import { addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0pr7300Cvt-PgrD5ACoIN9tfXUz7spfQ",
  authDomain: "custom-printing-demo-project.firebaseapp.com",
  projectId: "custom-printing-demo-project",
  storageBucket: "custom-printing-demo-project.appspot.com",
  messagingSenderId: "836181649255",
  appId: "1:836181649255:web:027b5b2128c6008c7b71c2",
};

export default firebaseConfig;

// const mugsData = [
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1755215/pexels-photo-1755215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     category: "Mugs",
//     name: "Black Coffee Mug",
//     rating: 4,
//     price: 17.11,
//     isOnSale: false,
//     oldPrice: 18.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1925534/pexels-photo-1925534.jpeg?auto=compress&cs=tinysrgb&w=600",
//     category: "Mugs",
//     name: "Classic Tea Cup",
//     rating: 4,
//     price: 12.99,
//     isOnSale: false,
//     oldPrice: 11.49,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/894609/pexels-photo-894609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     category: "Mugs",
//     name: "Vintage Ceramic Mug",
//     rating: 5,
//     price: 19.99,
//     isOnSale: true,
//     oldPrice: 21.49,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/2417857/pexels-photo-2417857.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "Mugs",
//     name: "Travel Coffee Tumbler",
//     rating: 4,
//     price: 24.99,
//     isOnSale: false,
//     oldPrice: 26.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1382907/pexels-photo-1382907.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "Mugs",
//     name: "Personalized Name Mug",
//     rating: 4,
//     price: 14.99,
//     isOnSale: true,
//     oldPrice: 16.49,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/3493047/pexels-photo-3493047.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "Mugs",
//     name: "Modern Glass Mug",
//     rating: 3,
//     price: 18.99,
//     isOnSale: false,
//     oldPrice: 20.75,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/247650/pexels-photo-247650.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "Mugs",
//     name: "Cute Animal Mug",
//     rating: 5,
//     price: 16.99,
//     isOnSale: true,
//     oldPrice: 18.49,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/6312155/pexels-photo-6312155.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "Mugs",
//     name: "Porcelain Tea Mug",
//     rating: 4,
//     price: 13.99,
//     isOnSale: false,
//     oldPrice: 15.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/3867000/pexels-photo-3867000.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "Mugs",
//     name: "Unique Handcrafted Mug",
//     rating: 4,
//     price: 21.99,
//     isOnSale: true,
//     oldPrice: 23.49,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/280139/pexels-photo-280139.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "Mugs",
//     name: "Elegant Ceramic Coffee Mug",
//     rating: 5,
//     price: 22.99,
//     isOnSale: false,
//     oldPrice: 24.49,
//   },
// ];

// const tShirtData = [
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Graphic Print T-shirt",
//     rating: 4,
//     price: 29.99,
//     isOnSale: false,
//     oldPrice: 31.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Striped Cotton T-shirt",
//     rating: 4,
//     price: 19.99,
//     isOnSale: false,
//     oldPrice: 21.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1868566/pexels-photo-1868566.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Plain White T-shirt",
//     rating: 3,
//     price: 14.99,
//     isOnSale: true,
//     oldPrice: 16.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Vintage Logo T-shirt",
//     rating: 5,
//     price: 24.99,
//     isOnSale: false,
//     oldPrice: 26.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/9558567/pexels-photo-9558567.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Sporty Performance T-shirt",
//     rating: 4,
//     price: 34.99,
//     isOnSale: false,
//     oldPrice: 36.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/9558699/pexels-photo-9558699.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Casual V-neck T-shirt",
//     rating: 4,
//     price: 22.99,
//     isOnSale: true,
//     oldPrice: 24.49,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/2062324/pexels-photo-2062324.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Retro Style T-shirt",
//     rating: 5,
//     price: 27.99,
//     isOnSale: false,
//     oldPrice: 29.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/3026284/pexels-photo-3026284.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Funky Pattern T-shirt",
//     rating: 4,
//     price: 19.99,
//     isOnSale: true,
//     oldPrice: 21.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/10250614/pexels-photo-10250614.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Street Style Graphic Tee",
//     rating: 4,
//     price: 28.99,
//     isOnSale: false,
//     oldPrice: 30.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/4440566/pexels-photo-4440566.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Modern Fit T-shirt",
//     rating: 3,
//     price: 21.99,
//     isOnSale: true,
//     oldPrice: 23.49,
//   },
// ];

// const hottestDeals = [
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Graphic Print T-shirt",
//     rating: 4,
//     price: 29.99,
//     isOnSale: false,
//     oldPrice: 31.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1925534/pexels-photo-1925534.jpeg?auto=compress&cs=tinysrgb&w=600",
//     category: "Mugs",
//     name: "Classic Tea Cup",
//     rating: 4,
//     price: 12.99,
//     isOnSale: false,
//     oldPrice: 14.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Striped Cotton T-shirt",
//     rating: 4,
//     price: 19.99,
//     isOnSale: false,
//     oldPrice: 21.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1755215/pexels-photo-1755215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     category: "Mugs",
//     name: "Black Coffee Mug",
//     rating: 4,
//     price: 17.11,
//     isOnSale: false,
//     oldPrice: 18.99,
//   },
//   {
//     imageUrl:
//       "https://images.pexels.com/photos/1868566/pexels-photo-1868566.jpeg?auto=compress&cs=tinysrgb&w=400",
//     category: "T-shirts",
//     name: "Plain White T-shirt",
//     rating: 3,
//     price: 14.99,
//     isOnSale: true,
//     oldPrice: 16.99,
//   },
// ];

// async function addMugsData() {
//   mugsData.forEach(async (mug) => {
//     await addDoc(collection(db, "mugs"), mug);
//   });
// }

// async function addTshirtsData() {
//   tShirtData.forEach(async (tshirt) => {
//     await addDoc(collection(db, "tshirts"), tshirt);
//   });
// }

// async function addAllProducts() {
//   [...mugsData, ...tShirtData].forEach(async (product) => {
//     await addDoc(collection(db, "products"), product);
//   });
// }

// async function addHottestDealsProducts() {
//   hottestDeals.forEach(async (product) => {
//     await addDoc(collection(db, "hottest-deals"), product);
//   });
// }

// addTshirtsData();

// addMugsData();
// // //

// addAllProducts();

// // // alert("Hottest Deals Products added to Firestore");

// addHottestDealsProducts();