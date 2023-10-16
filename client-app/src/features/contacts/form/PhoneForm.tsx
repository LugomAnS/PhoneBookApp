import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Phone } from "../../../app/models/contact";
import { useEffect, useState } from "react";
import { Button, Grid, Popup } from "semantic-ui-react";
import InputField from "../../../app/common/form/InputField";
import { useStore } from "../../../app/stores/store";
import SelectInputField from "../../../app/common/form/SelectInputField";
import { phoneTypeOptions } from "../../../app/common/options/phoneTypeOptions";
import * as Yup from 'yup';
import 'yup-phone-lite';

interface Props {
  phone?: Phone
  cancelEdit?: (param: boolean) => void;
}

export default observer(function PhoneForm({phone, cancelEdit}: Props) {
  const {profileStore:{createPhone, setAddingPhone, updatePhone}} = useStore();
  const [phoneForm, setPhoneForm] = useState<Phone>(new Phone());
  const [isEditForm, setIsEditForm] = useState(false)

  const validationSchema = Yup.object({
    type: Yup.string().required(),
    phoneNumber: Yup.string().phone('RU', "Введите телефон в формате +7 ХХХ ХХХ ХХ ХХ")
      .required("Телефон обязателен для ввода")
  })

  useEffect(() => {
    if(phone) {
      setPhoneForm(phone)
      setIsEditForm(true)
    }
  }, [phone])

  function handleSavingSubmit(values: Phone) {
    if(values.id === undefined) {
      return createPhone(values).then(() => setAddingPhone(false));
    } else {
      return updatePhone(values).then(() => cancelEdit!(false));
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
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
                <SelectInputField name="type" placeholder="Тип телефона" options={phoneTypeOptions} />
              </Grid.Column>
              <Grid.Column width={4}>
                <InputField name="phoneNumber" placeholder="номер телефона" />
              </Grid.Column>
              <Grid.Column width={8}>
                <Button.Group size='tiny' floated="right">
                  <Popup hoverable
                    position='top right'
                    trigger={
                      <Button icon='save' color="green"
                      onClick={() =>handleSubmit}
                      type='submit'
                      loading={isSubmitting}
                      disabled={isSubmitting || !isValid || !dirty}/>
                    }>
                    <p>Сохранить</p>
                  </Popup>

                  <Popup hoverable
                    position='top right'
                    trigger={
                      <Button icon='cancel' type="button"
                        onClick={() => isEditForm && cancelEdit ? cancelEdit(false) : setAddingPhone(false)}/>
                    }>
                    <p>Отмена</p>
                  </Popup>
                </Button.Group>
              </Grid.Column>
            </Grid>
        </Form>
      )}
    </Formik>
  )
})
