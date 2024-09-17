import st from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import Search from "../../ui/search/Search";

export default function Header() {
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
          <Link
            to="/login"
          >
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
