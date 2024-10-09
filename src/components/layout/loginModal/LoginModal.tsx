import st from "./LoginModal.module.scss";
import Modal from "../../ui/modal/Modal";
import MailIcon from "../../../assets/icons/MailIcon";
import KeyIcon from "../../../assets/icons/KeyIcon";
import Button from "../../ui/button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../redux/store";
import { handleLogin } from "../../../redux/slices/userReducer";

export default function LoginModal() {
  const location = useLocation();
  const initialState = {
    email: "",
    password: "",
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  });

  function onSubmit(values: {email: string, password: string}) {
    console.log(values);
    dispatch(handleLogin(values)).then(() => navigate("/profile"))

  }

  return (
    <Modal link={location.state.background.pathname}>
      <div className={st.root}>
        <Formik
          initialValues={initialState}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, dirty, isValid }) => {
            return (
              <Form>
                <div
                  className={
                    errors.email ? classNames(st.input, st.error) : st.input
                  }
                >
                  <MailIcon />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Электронная почта"
                  />
                </div>
                <div
                  className={
                    errors.password ? classNames(st.input, st.error) : st.input
                  }
                >
                  <KeyIcon />
                  <Field name="password" type="password" placeholder="Пароль" />
                </div>
                <div className={st.bottom}>
                  <Button
                    type="submit"
                    disabled={!(dirty && isValid)}
                    variant="primary"
                    onClick={() => {}}
                  >
                    Войти
                  </Button>
                  <Link
                    to="/register"
                    state={{ background: location.state.background }}
                  >
                    Регистрация
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}
