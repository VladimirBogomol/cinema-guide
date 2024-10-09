import React, { ReactElement, ReactFragment, ReactPortal } from "react";
import st from "./Modal.module.scss";
import Xicon from "../../../assets/icons/Xicon";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/logo.png"

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
  sx?: React.CSSProperties,
  logo?: boolean,
};

export default function Modal({ children, link, sx={}, logo=true }: Props) {
  const navigate = useNavigate();

  return (
    <div className={st.root}>
      <div className={st.modal} style={sx}>
        <button className={st.close} onClick={() => navigate(link)}>
          <Xicon />
        </button>
        {logo && <div className={st.img}>
          <img className={st.logo} src={logoImg} alt="Логотип" />
        </div>}
        {children}
      </div>
    </div>
  );
}
