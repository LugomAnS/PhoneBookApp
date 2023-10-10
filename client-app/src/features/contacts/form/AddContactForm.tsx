import { Form, Formik } from "formik";
import { Button, Grid, Image} from "semantic-ui-react";
import InputField from "../../../app/common/form/InputField";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { ContactForm } from "../../../app/models/contact";
import { router } from "../../../app/router/router";



export default function AddContactForm() {
  const {profileStore: {createContact}} = useStore();
  const contact = new ContactForm;
  const validationSchema = Yup.object({
    surname: Yup.string().required("Поле обязательно для ввода")
  })

  function handleForm(contact: ContactForm) {
    contact.id = uuid();
    createContact(contact).then(() => router.navigate(`/contacts/${contact.id}`));
  }

  return (
    <Formik
      initialValues={contact}
      onSubmit={values => handleForm(values)}
      validationSchema={validationSchema}
    >
      {({handleSubmit, isSubmitting, isValid, dirty}) => (
      <Form className="ui form"
        onSubmit={handleSubmit}
      >
      <Grid style={{marginBottom: 10}}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Grid verticalAlign='middle'>
              <Grid.Column width={4}>
                <Image src='/src/assets/user.png' size='small' floated='left' />
              </Grid.Column>

              <Grid.Column width={9}>
                <InputField name="surname" placeholder="Фамилия"/>
                <InputField name="name" placeholder="Имя (необязательно)" />
                <InputField name="patronymic" placeholder="Отчество (необязательно)" />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Button type='submit' content='Сохранить' positive
      disabled={isSubmitting || !isValid || !dirty}
      loading={isSubmitting}
      />
      <Button content='Отмена' as={Link} to='/contacts' />
      </Form>)}
    </Formik>
  )
}








