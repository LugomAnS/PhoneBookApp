import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import { ContactCategory } from "../../../app/models/contactCategory";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import InputField from "../../../app/common/form/InputField";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';

interface Props {
  categoryValue?: ContactCategory;
  cancelEdit?: (param: boolean) => void
}

export default observer(function CategoryForm({categoryValue, cancelEdit}: Props) {
  const {profileStore: {setAddingCategory, createCategory, editCategory}} = useStore();
  const [formValues, setFormValues] = useState<ContactCategory>({id: '', category: ''});

  useEffect(() => {
    if(categoryValue)
      setFormValues(categoryValue);
  }, [categoryValue])

  const validationSchema = Yup.object({
    category: Yup.string().required("Наименование категории не может быть пустым")
  })

  function handleSaveSubmit(value: ContactCategory){
    if(value.id) {
      return editCategory(value).then(() => cancelEdit!(true));
    } else {
      value.id = uuid();
      return createCategory(value);
    }
  }

  return (
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={formValues}
          onSubmit={(values, {setSubmitting}) => handleSaveSubmit(values).then(() => setSubmitting(false))}
        >
          {({handleSubmit, isSubmitting, isValid, dirty}) => (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
            >
              <Grid verticalAlign="middle">
                <Grid.Row>
                  <Grid.Column width={8}>
                    <InputField name="category" placeholder="Наименование категории"/>
                  </Grid.Column>
                  <Grid.Column width={8} floated="right">
                    <Button.Group size='tiny' floated="right">
                      <Button icon='save' type="submit" color="green"
                        loading={isSubmitting}
                        disabled={isSubmitting || !isValid || !dirty}
                      />
                      <Button icon='cancel' onClick={() => cancelEdit? cancelEdit(false) : setAddingCategory(false)}
                        type="button"
                      />
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        </Formik>
  )
})
