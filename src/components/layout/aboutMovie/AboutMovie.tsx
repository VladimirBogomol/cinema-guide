import st from "./AboutMovie.module.scss"
import { Movie } from '../../../redux/slices/moviesReducer';

type Props = {
  movie: Movie | null,
  loading: boolean,
}

export default function AboutMovie({ movie, loading }: Props) {

  if (loading) {
    return (
      <div className={st.root}>Loading...</div>
    )
}

  if (movie) {
     return (
       <div className={st.root}>
         <h2>О фильме</h2>
         <div className={st.about}>
           <div className={st.row}>
             <span>Язык оригинала</span>
             <div className={st.border} style={{ width: "177px" }}></div>
             <span>{movie.language}</span>
           </div>
           <div className={st.row}>
             <span>Бюджет</span>
             <div className={st.border} style={{ width: "244px" }}></div>
             <span>{Number(movie.budget).toLocaleString()} руб</span>
           </div>
           <div className={st.row}>
             <span>Выручка</span>
             <div className={st.border} style={{ width: "241px" }}></div>
             <span>{Number(movie.revenue).toLocaleString()} руб</span>
           </div>
           <div className={st.row}>
             <span>Режиссёр</span>
             <div className={st.border} style={{ width: "231px" }}></div>
             <span>{movie.director}</span>
           </div>
           <div className={st.row}>
             <span>Продакшен</span>
             <div className={st.border} style={{ width: "215px" }}></div>
             <span>{movie.production}</span>
           </div>
           <div className={st.row}>
             <span>Награды</span>
             <div className={st.border} style={{ width: "239px" }}></div>
             <span>{movie.awardsSummary}</span>
           </div>
         </div>
       </div>
     );
  }
}