import { observer } from "mobx-react-lite";
import { Button, Grid, Header, List } from "semantic-ui-react";
import { ContactCategory } from "../../../app/models/contactCategory";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import CategoryForm from "../form/CategoryForm";

interface Props {
  category: ContactCategory;
}

export default observer(function CategoryListItem({category}: Props) {
  const {profileStore: {deleteCategory,loadingCategory}} = useStore();
  const [target, setTarget] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  function handleDeleteCategory(e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deleteCategory(category.id!);
  }

  return (
      <List.Item>
        {!isEdit ? (
          <Grid verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3'> {category.category}</Header>
            </Grid.Column>
            <Grid.Column width={8}>
            <Button.Group size='tiny' floated="right" >
              <Button icon="edit" onClick={() => setIsEdit(true)}
              />
              <Button icon="trash" color="red"
                name={category.id}
                loading={target == category.id && loadingCategory}
                onClick={(e) => handleDeleteCategory(e)}
              />
            </Button.Group>
            </Grid.Column>
          </Grid.Row>
          </Grid>
        ) : (
            <CategoryForm categoryValue={category} cancelEdit={setIsEdit} />
        )}
      </List.Item>
  )
})
