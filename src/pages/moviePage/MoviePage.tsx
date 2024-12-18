import { useEffect } from 'react'
import st from "./MoviePage.module.scss"
import Header from '../../components/layout/Header/Header';
import Poster from '../../components/layout/Poster/Poster';
import Footer from '../../components/layout/footer/Footer';
import AboutMovie from '../../components/layout/aboutMovie/AboutMovie';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getCurrentMovie } from '../../redux/slices/moviesReducer';

export default function MoviePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) { dispatch(getCurrentMovie(id)); };
  }, [id, dispatch]);

  const { currentMovie, currentLoading } = useAppSelector((state) => state.movies); 

  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        <Poster movie={currentMovie} loading={currentLoading} />
        <AboutMovie movie={currentMovie} loading={currentLoading} />
        <Footer />
      </div>
    </div>
  );
}