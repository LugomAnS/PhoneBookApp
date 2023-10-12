import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { useState } from "react";
import { Button, Grid, List } from "semantic-ui-react";
import InputField from "../../../app/common/form/InputField";
import { useStore } from "../../../app/stores/store";

interface Props {
  phone?: Phone
}

export default observer(function PhoneForm({phone}: Props) {
  const {profileStore:{createPhone, setAddingPhone}} = useStore();
  const [phoneForm, setPhoneForm] = useState<Phone>(new Phone());

  useState(() => {
    if(phone) {
      setPhoneForm(phone)
    }
  })

  return (
    <Formik
      enableReinitialize
      initialValues={phoneForm}
      onSubmit={(values, {setSubmitting}) => createPhone(values).then(() => {
        setSubmitting(false);
        setAddingPhone();
      } )}

    >
      {({handleSubmit, isSubmitting, isValid, dirty}) => (
        <Form
          className="ui form"
          onSubmit={handleSubmit}
        >
          <List.Item style={{paddingBottom: 10}}>
            <Grid verticalAlign='middle'>
              <Grid.Column width={4}>
                <InputField name="type" placeholder="тип телефона" />
              </Grid.Column>
              <Grid.Column width={4}>
                <InputField name="phoneNumber" placeholder="номер телефона" />
              </Grid.Column>
              <Grid.Column width={8}>
                <Button.Group size='tiny' floated="right">
                  <Button icon='save'
                    onClick={() =>handleSubmit}
                    type='submit'
                    loading={isSubmitting}
                    disabled={isSubmitting || !isValid || !dirty}
                  />
                  <Button icon='cancel'
                    onClick={() => setAddingPhone()}
                  />
                </Button.Group>
              </Grid.Column>
            </Grid>
          </List.Item>
        </Form>
      )}
    </Formik>
  )
})
