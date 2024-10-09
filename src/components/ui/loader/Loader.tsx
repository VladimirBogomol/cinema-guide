import st from "./Loader.module.scss"

export default function Loader() {
    return (
      <div className={st.root}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.6067 9.3934L28.2495 11.7504C26.1383 9.63917 23.2217 8.33333 20 8.33333C13.5567 8.33333 8.33333 13.5567 8.33333 20C8.33333 26.4433 13.5567 31.6667 20 31.6667C26.4433 31.6667 31.6667 26.4433 31.6667 20H35C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5C24.1422 5 27.8922 6.67893 30.6067 9.3934Z"
            fill="white"
          />
        </svg>
      </div>
    );
}