import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import MoviePage from "./pages/moviePage/MoviePage";
import GenrePage from "./pages/genrePage/GenrePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MoviePage />} />
      <Route path="/genres" element={<GenrePage/>} />
    </Routes>
  );
}

export default App;
