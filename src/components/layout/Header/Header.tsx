import st from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Search from "../../ui/search/Search";

export default function Header() {
  const location = useLocation();

  return (
    <header className={st.root}>
      <div className="container">
        <div className={st.row}>
          <img src={logo} alt="" />
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
          <Link state={{ background: location }} to="/login">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
