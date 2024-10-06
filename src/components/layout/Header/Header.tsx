import st from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Search from "../../ui/search/Search";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect } from "react";
import { getProfile } from "../../../redux/slices/userReducer";

export default function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { authorized, userCredentials } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (authorized) {
      dispatch(getProfile());
    }
  }, [authorized]);

  return (
    <header className={st.root}>
      <div className="container">
        <div className={st.row}>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
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
      </div>
    </header>
  );
}
