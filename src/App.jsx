import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      

      <main className="flex-1">
        <AppRoutes />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;