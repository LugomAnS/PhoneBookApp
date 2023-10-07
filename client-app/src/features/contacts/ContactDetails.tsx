import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default observer(function ContactDetails() {
  const {id} = useParams();
  const text = `Test object + ${id}`;
  return (
    <>
      <div>{text}</div>
      <Button content="Cancel" as={Link} to='/contacts'  />
    </>

  )
})
