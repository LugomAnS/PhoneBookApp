import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import InputField from "../../../app/common/form/InputField";
import { useStore } from "../../../app/stores/store";

interface Props {
  phone?: Phone
  cancelEdit?: (param: boolean) => void;
}

export default observer(function PhoneForm({phone, cancelEdit}: Props) {
  const {profileStore:{createPhone, setAddingPhone, updatePhone}} = useStore();
  const [phoneForm, setPhoneForm] = useState<Phone>(new Phone());
  const [isEditForm, setIsEditForm] = useState(false)

  useState(() => {
    if(phone) {
      setPhoneForm(phone)
      setIsEditForm(true)
    }
  })

  function handleSavingSubmit(values: Phone) {
    if(values.id === undefined) {
      return createPhone(values).then(() => setAddingPhone());
    } else {
      return updatePhone(values).then(() => cancelEdit!(false));
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={phoneForm}
      onSubmit={(values, {setSubmitting}) => handleSavingSubmit(values).then(() => {
        setSubmitting(false);
      } )}

    >
      {({handleSubmit, isSubmitting, isValid, dirty}) => (
        <Form
          className="ui form"
          onSubmit={handleSubmit}
        >
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
                  {isEditForm && cancelEdit ? (
                    <Button icon='cancel' type="button"
                      onClick={() => cancelEdit(false)}
                    />
                  ) : (
                    <Button icon='cancel' type="button"
                      onClick={() => setAddingPhone()}
                    />
                  )}
                </Button.Group>
              </Grid.Column>
            </Grid>
        </Form>
      )}
    </Formik>
  )
})
