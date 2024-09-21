import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import MoviePage from "./pages/moviePage/MoviePage";
import GenrePage from "./pages/genrePage/GenrePage";
import MoviesInGenre from "./components/layout/moviesInGenre/MoviesInGenre";
import Modal from "./components/ui/modal/Modal";
import LoginModal from "./components/layout/loginModal/LoginModal";
import RegisterModal from "./components/layout/registerModal/RegisterModal";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/genres" element={<GenrePage />} />
        <Route path="/genres/:name" element={<MoviesInGenre />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/register" element={<RegisterModal/>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
