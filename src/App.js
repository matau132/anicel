import "./App.css";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { SkeletonTheme } from "react-loading-skeleton";
import ScrollToTop from "./components/UI/ScrollToTop";

function App() {
  return (
    <div className="main">
      <ScrollToTop />
      <SkeletonTheme baseColor="#1b1a1d" highlightColor="#202224">
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </SkeletonTheme>
    </div>
  );
}

export default App;
