// import AppRoutes from "./routes/AppRoutes";
// import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white">
      
//       <Navbar/>

//       <main className="flex-1">
//         <AppRoutes />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;


import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <AppRoutes />
    </div>
  );
}

export default App;