import { observer } from "mobx-react-lite";
import { Contact } from "../../../app/models/contact";
import { Card, Image, List, Popup} from "semantic-ui-react";
import { NavLink } from "react-router-dom";

interface Props {
  contact: Contact;
}

export default observer(function ContackListItem({contact}: Props) {
  return (
    <List.Item as={NavLink} to={`/contacts/${contact.id}`}>
      <Popup
        position='right center'
        hoverable
        trigger={
          <Card style={{borderRadius: '15px'}}>
          <Card.Content>
            <Image src={contact.imageUrl || '/src/assets/user.png'} size='mini' floated='left' circular/>
            <Card.Header>
              {contact.surname}
            </Card.Header>
            <Card.Meta>{contact.category}</Card.Meta>
          </Card.Content>
        </Card>
        }
      >
       <span>{contact.surname}</span>
       <span>{contact.name !== null ? (" " + contact.name): ('')}</span>
       <span>{contact.patronymic !== null ? (" " + contact.patronymic): ('')}</span>
      </Popup>
    </List.Item>
  )
})
