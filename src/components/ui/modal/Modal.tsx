import React, { ReactElement, ReactFragment, ReactPortal } from "react";
import st from "./Modal.module.scss";
import Xicon from "../../../assets/icons/Xicon";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type Props = {
  children:
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
  link: string;
};

export default function Modal({ children, link }: Props) {
  const navigate = useNavigate();

  return (
    <div className={st.root}>
      <div className={st.modal}>
        <button className={st.close} onClick={() => navigate(link)}>
          <Xicon />
        </button>
        <div className={st.img}>
          <img className={st.logo} src={logo} alt="Логотип" />
        </div>
        {children}
      </div>
    </div>
  );
}
