import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Raiting from "../raiting/Raiting";
import st from "./Search.module.scss";
import Xicon from "../../../assets/icons/Xicon";
import debounce from "lodash.debounce";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  handleSearchMovies,
  setClearSearch,
} from "../../../redux/slices/moviesReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { convertMinutesToHours } from "../../../utils/convertMinutesToHours";

type Props = {
  onClose?: () => void,
}

export default function Search({onClose = () => {}}:Props) {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const { searchMovies } = useAppSelector((state) => state.movies);

  const memoSearch = useCallback(debounce(handleDebounce, 1000), []);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setClearSearch());
    setValue("");
  }, [location, dispatch]);

  function handleChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    if (target.value.trim() === "") {
      dispatch(setClearSearch());
    } else {
      memoSearch(target.value);
    }
  }

  function clearSearch() {
    setValue("");
    dispatch(setClearSearch());
    onClose();
  }

  function handleDebounce(search: string) {
    dispatch(handleSearchMovies(search));
  }

  function handleClick(id: number) {
    navigate(`/movies/${id}`);
  }

  return (
    <div className={st.root}>
      <div className={st.search}>
        <SearchIcon />
        <input
          onChange={handleChange}
          type="text"
          value={value}
          placeholder="Поиск"
        />{" "}
        {value.length > 0 && (
          <Xicon
            onClick={clearSearch}
            width="13px"
            height="13px"
            fill="rgba(255, 255, 255, 0.5)"
          />
        )}
      </div>
      {searchMovies.length > 0 && (
        <div className={st.body}>
          {searchMovies.map((item) => (
            <div
              onClick={() => handleClick(item.id)}
              key={item.id}
              className={st.item}
            >
              <img src={item.posterUrl} alt="" />
              <div className={st.info}>
                <div className={st.top}>
                  <Raiting
                    sx={{ padding: "2px 8px", fontSize: "12px" }}
                    rate={+item.tmdbRating.toFixed(1)}
                  />
                  <span>{item.releaseYear}</span>
                  <span>{item.genres.join(", ")}</span>
                  <span>{convertMinutesToHours(item.runtime)}</span>
                </div>
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
