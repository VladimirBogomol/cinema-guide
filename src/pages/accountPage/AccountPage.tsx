import { useEffect, useState } from "react";
import st from "./AccountPage.module.scss";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/footer/Footer";
import LikeIcon from "../../assets/icons/LikeIcon";
import PersonIcon from "../../assets/icons/PersonIcon";
import classNames from "classnames";
import { useAppDispatch } from "../../redux/store";
import FavoriteMovies from "../../components/layout/favoriteMovies/FavoriteMovies";
import ProfileSettings from "../../components/layout/profileSettings/ProfileSettings";
import { getFavoriteMovies } from "../../redux/slices/favoritesReducer";

export default function AccountPage() {
  const [tabActive, setTabActive] = useState(0);
  const dispatch = useAppDispatch();
  const isMobile = window.innerWidth <= 770;

  useEffect(() => {
    dispatch(getFavoriteMovies());
  }, []);

  useEffect(() => {
    function changeTab(e:KeyboardEvent) { 
      if (e.key === "Tab") {
        setTabActive((prev) => (prev === 0 ? 1 : 0));
      }
    }
    document.addEventListener("keyup", changeTab);
    return () => document.removeEventListener("keyup", changeTab);
  }, []);

  function handleTabClick(number: number) {
    setTabActive(number);
  }

  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        <h1>Мой аккаунт</h1>
        <div className={st.tabs}>
          <button
            tabIndex={1}
            className={
              tabActive === 0 ? classNames(st.tab, st.tab__active) : st.tab
            }
            onClick={() => handleTabClick(0)}
          >
            <LikeIcon />
            <span>{isMobile? "Избранное" : "Избранные фильмы"}</span>
          </button>
          <button
            tabIndex={2}
            className={
              tabActive === 1 ? classNames(st.tab, st.tab__active) : st.tab
            }
            onClick={() => handleTabClick(1)}
          >
            <PersonIcon fill="white" opacity={1} />
            <span>{isMobile? "Настройки" : "Настройка аккаунта"}</span>
          </button>
        </div>
        {tabActive === 0 && <FavoriteMovies />}
        {tabActive === 1 && <ProfileSettings />}
        <Footer />
      </div>
    </div>
  );
}

