import React from 'react'
import st from "./Footer.module.scss"
import CIcon from '../../../assets/icons/CIcon';
import VKIcon from '../../../assets/icons/VKIcon';

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className={st.root}>
      <div className={st.left}>
        <h3>LLC «Мультимедиа Визион»</h3>
        <CIcon />
        <h4>Все права защищены</h4>
      </div>
          <div className={st.right}>
              <a href=""><VKIcon/></a>
              <a href=""><VKIcon/></a>
              <a href=""><VKIcon/></a>
              <a href=""><VKIcon/></a>
      </div>
    </div>
  );
}