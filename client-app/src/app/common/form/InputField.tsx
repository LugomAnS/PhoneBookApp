import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}

export default function InputField(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label ? props.label : undefined}</label>
      <input {...field} {...props}/>
      {meta.touched && meta.error ? (
        <Label basic color='red'
          style={{position: 'absolute', width: 200}}
        >
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}
