import st from "./Footer.module.scss"
import CIcon from '../../../assets/icons/CIcon';
import VKIcon from '../../../assets/icons/VKIcon';
import YTIcon from "../../../assets/icons/YTIcon"
import OKIcon from '../../../assets/icons/OKIcon';
import TelegramIcon from '../../../assets/icons/TelegramIcon';

export default function Footer() {
  return (
    <div className={st.root}>
      <div className={st.left}>
        <h3>LLC «Мультимедиа Визион»</h3>
        <CIcon />
        <h4>Все права защищены</h4>
      </div>
          <div className={st.right}>
              <a href=""><VKIcon/></a>
              <a href=""><YTIcon/></a>
              <a href=""><OKIcon/></a>
              <a href=""><TelegramIcon/></a>
      </div>
    </div>
  );
}