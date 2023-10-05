import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Button, Header, Label } from "semantic-ui-react";
import InputField from "../../app/common/form/InputField";

export default observer(function LoginForm(){
  const {userStore} = useStore();
  return (
    <Formik
      initialValues={{email: '', password: '', error: null}}
      onSubmit={(values, {setErrors}) => userStore.login(values).catch(() => setErrors({error: 'Неверный логин или пароль'})) }
    >
      {({handleSubmit, isSubmitting, errors}) => (
        <Form
          className="ui form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Header content='Войти в телефонную книгу' textAlign='center'/>
          <InputField name="email" placeholder='Электронная почта' label="Электронная почта" />
          <InputField
            name="password"
            placeholder='Пароль'
            label="Пароль"
            type="password"
          />
          <ErrorMessage
            name='error' render={() =>
            <Label style={{marginBottom: '10px'}} basic color="red" content={errors.error}/>}
          />
          <Button
            type='submit'
            content='Войти'
            loading={isSubmitting}
            positive
            fluid
          />
        </Form>
      )}
    </Formik>
  )
})
