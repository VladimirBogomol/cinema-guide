import st from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Search from "../../ui/search/Search";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import { getProfile, setOpenSearch } from "../../../redux/slices/userReducer";
import PersonIcon from "../../../assets/icons/PersonIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import GenresIcon from "../../../assets/icons/GenresIcon";

export default function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { authorized, userCredentials, openSearch } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (authorized) {
      dispatch(getProfile());
    }
  }, [authorized]);

  return (
    <header className={st.root}>
      <div className="container">
        {!openSearch ? <div className={st.row}>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <div className={st.mobile__menu}>
            <NavLink
              to="/genres"
              className={({ isActive }) => (isActive ? st.active : "")}
            >
              <GenresIcon />
            </NavLink>
            <button onClick={() => dispatch(setOpenSearch(true))}>
              <SearchIcon opacity={1} width={20} height={20} />
            </button>
            {authorized ? (
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? st.active : "")}
              >
                <PersonIcon fill="white" opacity={1} />
              </NavLink>
            ) : (
              <Link state={{ background: location }} to="/login">
                <PersonIcon fill="white" opacity={1} />
              </Link>
            )}
          </div>
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? st.active : "")}
            >
              Главная
            </NavLink>
            <NavLink
              to="/genres"
              className={({ isActive }) => (isActive ? st.active : "")}
            >
              Жанры
            </NavLink>
            <Search />
          </nav>
          <div className={st.profile}>
            {authorized ? (
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? st.active : "")}
              >
                {userCredentials?.name}
              </NavLink>
            ) : (
              <Link state={{ background: location }} to="/login">
                Войти
              </Link>
            )}
          </div>
        </div> : <Search onClose={() => dispatch(setOpenSearch(false))} />}
      </div>
    </header>
  );
}
