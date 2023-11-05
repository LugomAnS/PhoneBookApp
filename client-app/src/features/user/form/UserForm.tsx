import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Formik } from "formik";
import { Button, Grid, Image } from "semantic-ui-react";
import { UserEditForm } from "../../../app/models/user";
import InputField from "../../../app/common/form/InputField";

interface Props {
  setIsEdit: (value: boolean) => void;
}

export default observer(function UserForm({setIsEdit}: Props) {
  const {userStore: {user, updateUser, userEditLoading}} = useStore();
  const formValues: UserEditForm = {
    surname: user!.surname,
    name: user!.surname,
    patronymic: user!.patronymic
  }

  async function handleForm(values: UserEditForm, setSubmiting: (value: boolean) => void) {
    updateUser(values).then(() => {
      setSubmiting(false);
      setIsEdit(false);
    }).catch(() => setSubmiting(false));
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={(values, {setSubmitting}) => handleForm(values, setSubmitting)}
    >
      {({handleSubmit, isSubmitting}) => (
        <Form className="ui form"
          onSubmit={handleSubmit}
        >
        <Grid style={{marginBottom: 10}}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Grid verticalAlign='middle'>
              <Grid.Column width={4}>
                <Image src={user!.image || '/src/assets/user.png'} size='small' floated='left' />
              </Grid.Column>
              <Grid.Column width={9}>
                <InputField name="surname" placeholder="Фамилия"/>
                <InputField name="name" placeholder="Имя"/>
                <InputField name="patronymic" placeholder="Отчество"/>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        </Grid>

        <Button type='submit' content='Сохранить' positive
          disabled={isSubmitting || userEditLoading}
          loading={isSubmitting || userEditLoading}
          />
        <Button content='Отмена' onClick={() => setIsEdit(false)} type="button" />
        </Form>
      )}
    </Formik>
  )
})
