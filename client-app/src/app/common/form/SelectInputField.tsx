import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  clear?: boolean;
  options: {text: string, value: string}[];
}

export default function SelectInputField(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable={props.clear ? props.clear : false}
        placeholder={props.placeholder}
        options={props.options}
        value={field.value || null}
        onBlur={() => helpers.setTouched(true)}
        onChange={(_, d) => helpers.setValue(d.value)}
      />
        {meta.touched && meta.error ? (
          <Label basic color="red">{meta.error}</Label>
        ) : null}
    </Form.Field>
  )
}
