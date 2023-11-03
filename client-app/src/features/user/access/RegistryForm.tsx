import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Button, Header, Message } from "semantic-ui-react";
import InputField from "../../../app/common/form/InputField";
import { ServerErrorMessage } from "../../../app/models/errorMessage";
import { useState } from "react";

export default observer(function RegistryForm() {
  const {userStore} = useStore();
  const [serverErrors, setServerErrors] = useState<ServerErrorMessage[]>();
  const passwordSchema = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,8}$/;
  const schema = Yup.object({
    email: Yup.string().email("Введите корректную почту").required("Почта обязательна к заполнению"),
    username: Yup.string().required("Имя учетной записи обязательно"),
    surname: Yup.string().required("Фамилия обязательна"),
    name: Yup.string(),
    patronymic: Yup.string(),
    password: Yup.string().min(6).matches(passwordSchema, 'Пароль не достаточно сложный').required("Введите пароль"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Пароли должны совпадать').required('Повторите ввод пароля')
  })
  return (
    <Formik
      initialValues={{email: "", username: "", surname: "", name: "", patronymic: "",
                      password: "", confirmPassword: "", serverErrors}}
      validationSchema={schema}
      onSubmit={(values, {setFieldError}) => userStore.registry(values).catch((error) => {
        setServerErrors(error);
        error.forEach(({field, message}: ServerErrorMessage) => {
          setFieldError(field, message);
        });
      })}
    >
      {({handleSubmit, isSubmitting, isValid, dirty}) => (
        <Form
          className="ui form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Header content='Регистрация' textAlign='center'/>
          <InputField name='email' placeholder="Электронная почта" label="Электронная почта" />
          <InputField name='username' placeholder="Имя учетной записи" label="Имя учетной записи" />
          <InputField name='surname' placeholder="Фамилия" label="Фамилия" />
          <InputField name='name' placeholder="Имя" label="Имя (необязательно)" />
          <InputField name='patronymic' placeholder="Отчество" label="Отчество (необязательно)" />
          <InputField name='password' placeholder="Пароль" label="Пароль" type="password"/>
          <InputField name='confirmPassword' placeholder="Подтверждение пароля" label="Подтверждение пароля" type="password"/>

          {serverErrors && (
            <Message negative>
              <Message.List>
                {serverErrors?.map(e => (
                  <Message.Item key={e.field}>{e.message}</Message.Item>
                ))}
              </Message.List>
            </Message>
          )}

          <Button
            content="Зарегистрироваться" positive fluid
            type='submit'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          />
        </Form>
      )}

    </Formik>
  )
})
