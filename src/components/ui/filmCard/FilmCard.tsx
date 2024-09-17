import React from "react";
import st from "./FilmCard.module.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  img: string;
  number?: number;
  id: number;
};

export default function FilmCard({ img, number, id }: Props) {

  const navigate = useNavigate();

  return (
    <div className={st.root} onClick={() => navigate(`/movies/${id}`)}>
      {number && <div className={st.number}>{number}</div>}
      <img src={img} alt="" />
    </div>   
  );
}
