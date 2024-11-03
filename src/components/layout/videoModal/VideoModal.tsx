import { useLocation, useParams } from "react-router-dom";
import Modal from "../../ui/modal/Modal";
import st from "./VideoModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect } from "react";
import { getCurrentMovie } from "../../../redux/slices/moviesReducer";
import Loader from "../../ui/loader/Loader";
import ReactPlayer from "react-player";

export default function VideoModal() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isMobile = window.innerWidth <= 770;
  const { currentMovie, currentLoading } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (id) { dispatch(getCurrentMovie(id)); }
  }, [id, dispatch]);

  const trailerUrl = currentMovie?.trailerUrl;

  return (
    <Modal
      logo={false}
      link={location.state.background.pathname}
      sx={{
        width: isMobile ? "100%" : "960px",
        height: isMobile ? "212px" : "540px",
        backgroundColor: "rgba(57, 59, 60, 1)",
        padding: "0",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: 0,
      }}
    >
      <div className={st.root}>
        {currentLoading ? (
          <Loader />
        ) : (
          <ReactPlayer
            //url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
            // url="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
            url={trailerUrl}
            playing={false}
            controls={false}
            // volume={null}
            // muted={false}
            width="100%"
            height="100%"
          />
        )}
      </div>
    </Modal>
  );
}
