import React from "react";
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

type Props = {};

export default function RegisterModal({ }: Props) {
  function equalTo(ref, msg) {
    return this.test({
      name: "equalTo",
      exclusive: false,
      message: msg || "Поля должны совпадать",
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }

  Yup.addMethod(Yup.string, "equalTo", equalTo);
  const location = useLocation();

   const initialState = {
     email: "",
     password: "",
     name: '',
     surname: '',
     repeatPassword: '',
   };

   const validationSchema = Yup.object().shape({
     email: Yup.string().email().required(),
     password: Yup.string().min(6).required(),
     name: Yup.string().required(),
     surname: Yup.string().required(),
     //@ts-ignore
     repeatPassword: Yup.string().equalTo(Yup.ref("password")),
   });

   function onSubmit(values) {
     console.log(values);
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
                    errors.repeatPassword ? classNames(st.input, st.error) : st.input
                  }
                >
                  <KeyIcon />
                  <Field name="repeatPassword" type="password" placeholder="Подтвердите пароль" />
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




