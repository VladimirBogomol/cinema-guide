import st from "./RegisterModal.module.scss";
import Modal from "../../ui/modal/Modal";
import MailIcon from "../../../assets/icons/MailIcon";
import KeyIcon from "../../../assets/icons/KeyIcon";
import Button from "../../ui/button/Button";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "../../../assets/icons/PersonIcon";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { handleRegister } from "../../../redux/slices/userReducer";

export default function RegisterModal() {
  //@ts-expect-error expect error help
  function equalTo(ref, msg) {
    //@ts-expect-error expect error help
    return this.test({
      name: "equalTo",
      exclusive: false,
      message: msg || "Поля должны совпадать",
      params: {
        reference: ref.path,
      },
      test: function (value: string) {
        return value === this.resolve(ref);
      },
    });
  }

  Yup.addMethod(Yup.string, "equalTo", equalTo);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { completeRegister } = useAppSelector((state) => state.user);

  const initialState = {
    email: "",
    password: "",
    name: "",
    surname: "",
    repeatPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    name: Yup.string().required(),
    surname: Yup.string().required(),
    //@ts-expect-error expect error help
    repeatPassword: Yup.string().equalTo(Yup.ref("password")),
  });

  function onSubmit(values: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) {
    dispatch(
      handleRegister({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      })
    );
  }
  if (completeRegister) {
    return (
      <Modal link={location.state.background.pathname}>
        <div className={st.root}>
          <h2>Регистрация завершена</h2>
          <p className={st.text}>
            Используйте Вашу электронную почту для входа
          </p>
          <Link to="/login" state={{ background: location.state.background }}>
            <Button type="button" variant="primary" onClick={() => {}}>
              Войти
            </Button>
          </Link>
        </div>
      </Modal>
    );
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
                <h2>Регистрация</h2>
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
                    errors.name ? classNames(st.input, st.error) : st.input
                  }
                >
                  <PersonIcon />
                  <Field name="name" type="text" placeholder="Имя" />
                </div>
                <div
                  className={
                    errors.surname ? classNames(st.input, st.error) : st.input
                  }
                >
                  <PersonIcon />
                  <Field name="surname" type="text" placeholder="Фамилия" />
                </div>
                <div
                  className={
                    errors.password ? classNames(st.input, st.error) : st.input
                  }
                >
                  <KeyIcon />
                  <Field name="password" type="password" placeholder="Пароль" />
                </div>
                <div
                  className={
                    errors.repeatPassword
                      ? classNames(st.input, st.error)
                      : st.input
                  }
                >
                  <KeyIcon />
                  <Field
                    name="repeatPassword"
                    type="password"
                    placeholder="Подтвердите пароль"
                  />
                </div>
                <div className={st.bottom}>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!(dirty && isValid)}
                    onClick={() => {}}
                  >
                    Создать аккаунт
                  </Button>
                  <Link
                    to="/login"
                    state={{ background: location.state.background }}
                  >
                    У меня есть пароль
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
