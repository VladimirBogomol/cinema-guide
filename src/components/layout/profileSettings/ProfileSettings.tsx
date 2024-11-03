import st from "./ProfileSettings.module.scss";
import MailIcon from "../../../assets/icons/MailIcon";
import Button from "../../ui/button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { handleLogout } from "../../../redux/slices/userReducer";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
  const { userCredentials } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  return (
    <div className={st.root}>
      <div className={st.info}>
        <div className={st.item}>
          <div className={st.circle}>
            {userCredentials?.name[0].toUpperCase()}
            {userCredentials?.surname[0].toUpperCase()}
          </div>
          <div className={st.user}>
            <p>Имя Фамилия</p>
            <h4>
              {userCredentials?.name} {userCredentials?.surname}
            </h4>
          </div>
        </div>
        <div className={st.item}>
          <div className={st.circle}>
            <MailIcon fill="white" opacity={1} />
          </div>
          <div className={st.user}>
            <p>Электронная почта</p>
            <h4>{userCredentials?.email}</h4>
          </div>
        </div>
      </div>
      <Button
        className={st.logoutBtn}
        variant="primary"
        onClick={() => {
          dispatch(handleLogout()).then(()=> navigate("/"));
        }}
        sx={{ width: "262px" }}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
}
