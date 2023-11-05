import { Message } from "semantic-ui-react";
import { ServerErrorMessage } from "../../app/models/errorMessage";

interface Props {
  errors: ServerErrorMessage[];
}

export default function ValidationError({errors}: Props) {

  if(errors)
  for(const key in errors) {
    console.log('ValidationError: ' + errors[key].field + " " + errors[key].message);
  }
  return (
    <Message negative>
      {errors && (
        <Message.List>
          {errors?.map(e => (
            <Message.Item key={e.field}>{e.message}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  )
}
