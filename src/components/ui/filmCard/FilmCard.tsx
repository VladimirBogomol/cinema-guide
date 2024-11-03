import st from "./FilmCard.module.scss";
import { useNavigate } from "react-router-dom";
import Xicon from "../../../assets/icons/Xicon";
import { useAppDispatch } from "../../../redux/store";
import { handleDeleteFavorite } from "../../../redux/slices/favoritesReducer";
import classNames from "classnames";

type Props = {
  img: string;
  number?: number;
  id: number;
  isFavorite?: boolean,
  className?: string,
};

export default function FilmCard({ img, number, id, isFavorite, className = '' }: Props) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={classNames(st.root, className)} onClick={() => navigate(`/movies/${id}`)}>
      {number && <div className={st.number}>{number}</div>}
      {isFavorite && <div className={st.delete} onClick={(e) => {
        e.stopPropagation();
        dispatch(handleDeleteFavorite(id))
      }}><Xicon width="17" height="17" /></div>}
      <img src={img} alt="" />
    </div>
  );
}
