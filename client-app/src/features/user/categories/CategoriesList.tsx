import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Button, List } from "semantic-ui-react";
import CategoryListItem from "./CategoryListItem";
import CategoryForm from "../form/CategoryForm";

export default observer(function CategoriesList() {
  const {profileStore} = useStore();
  const {categoriesList, addingCategory, setAddingCategory} = profileStore;
  return (
    <>
      {!addingCategory &&
      <Button fluid content='Добавить категорию' icon='plus' onClick={() => setAddingCategory(true)} />}
      {addingCategory &&
      <CategoryForm />}
      <List>
        {categoriesList.length > 0 ? (
          categoriesList.map(c => (
            <CategoryListItem key={c.id} category={c}/>
          ))
        ) : (
          <div style={{fontStyle: 'italic'}}>Нет категорий</div>
        )}
      </List>
    </>
  )
})
