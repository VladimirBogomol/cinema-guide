import React from "react";
import st from "./FilmCard.module.scss";
import { useNavigate } from "react-router-dom";
import Xicon from "../../../assets/icons/Xicon";
import { useAppDispatch } from "../../../redux/store";
import { handleDeleteFavorite } from "../../../redux/slices/favoritesReducer";

type Props = {
  img: string;
  number?: number;
  id: number;
  isFavorite?: boolean,
};

export default function FilmCard({ img, number, id, isFavorite }: Props) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={st.root} onClick={() => navigate(`/movies/${id}`)}>
      {number && <div className={st.number}>{number}</div>}
      {isFavorite && <div className={st.delete} onClick={(e) => {
        e.stopPropagation();
        dispatch(handleDeleteFavorite(id))
      }}><Xicon width="17" height="17" /></div>}
      <img src={img} alt="" />
    </div>
  );
}
