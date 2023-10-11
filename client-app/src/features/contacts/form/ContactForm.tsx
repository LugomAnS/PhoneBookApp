import { Form, Formik } from "formik";
import { Button, Grid, Image, Label, Segment} from "semantic-ui-react";
import InputField from "../../../app/common/form/InputField";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { ContactFormValues } from "../../../app/models/contact";
import { router } from "../../../app/router/router";
import TextAreaField from "../../../app/common/form/TextAreaField";
import { useEffect, useState } from "react";



export default function ContactForm() {
  const {profileStore: {createContact, selectedContact, loadContactDetails, updateContact}} = useStore();
  const [contact, setContact] = useState<ContactFormValues>(new ContactFormValues());
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      if(selectedContact) {
        setContact(new ContactFormValues(selectedContact));
      } else {
        loadContactDetails(id).then(() => setContact(new ContactFormValues(selectedContact!)))
      }
    }
  },[id, selectedContact, setContact, loadContactDetails])

  const validationSchema = Yup.object({
    surname: Yup.string().required("Поле обязательно для ввода")
  })

  function handleForm(contact: ContactFormValues) {
    if(!contact.id) {
      contact.id = uuid();
      createContact(contact).then(() => router.navigate(`/contacts/${contact.id}`));
    } else {
      updateContact(contact).then(() => router.navigate(`/contacts/${contact.id}`));

    }
  }

  return (
    <Formik
      enableReinitialize
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
        <Grid.Row>
          <Segment attached>
            <Label attached="top" content="Описание"/>
            <TextAreaField name="description" placeholder="Описание" rows={3}/>
          </Segment>
        </Grid.Row>
        <Grid.Row>
          <Segment attached>
            <Label attached="top" content="Адрес"/>
            <InputField name="contactAddress.city" placeholder="Город"/>
            <InputField name="contactAddress.venue" placeholder="Улица"/>
            <InputField name="contactAddress.house" placeholder="Дом"/>
            <InputField name="contactAddress.flat" placeholder="Квартира"/>
          </Segment>
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








