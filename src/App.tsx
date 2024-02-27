import Main from "./Components/Main";
import Footer from "./Components/Footer";
import Logo from "./Assets/Icons/Logo";

function App() {
  return (
    <div>
      <div className="w-full bg-white flex flex-col justify-center items-center">
        <Logo />
        <p className="text-text text-7xl font-black z-2 mb-3">
          The Rick and Morty API
        </p>
      </div>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
