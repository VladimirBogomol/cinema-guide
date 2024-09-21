import st from "./GenreList.module.scss";
import img from "../../../assets/genresImg.png";
import { useAppSelector } from "../../../redux/store";
import drama from "../../../assets/drama.png"
import comedy from "../../../assets/comedy.png"
import crime from "../../../assets/criminal.png"
import family from "../../../assets/family.png"
import history from "../../../assets/hystorical.png"
import thriller from "../../../assets/thriller.png"
import fantasy from "../../../assets/fantasy.png"
import adventure from "../../../assets/adventure.png"
import { Link } from "react-router-dom";


type Props = {};

const genresImg = {
  drama: drama,
  comedy: comedy,
  crime: crime,
  family: family,
  history: history,
  thriller: thriller,
  fantasy: fantasy,
  adventure: adventure,
};

export default function GenreList({}: Props) {
  const { genres, loading, error } = useAppSelector((state) => state.genre);

  const filteredGenres = genres.filter((item) => item in genresImg);

  return (
    <div className={st.root}>
      <h1>Жанры фильмов</h1>
      <div className={st.body}>
        {filteredGenres.map((genre, index) => {
          return (
            <Link to={`/genres/${genre}`} key={index} className={st.card}>
              <img src={genresImg[genre]} alt="Картинка жанра" />
              <div className={st.info}>
                <span>{genre}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
