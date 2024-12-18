import { useEffect } from "react";
import st from "./GenrePage.module.scss";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/footer/Footer";
import GenreList from "../../components/layout/genreList/GenreList";
import { useAppDispatch } from "../../redux/store";
import { getGenres } from "../../redux/slices/genreReducer";

export default function GenrePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);
  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        <GenreList />
        <Footer />
      </div>
    </div>
  );
}
