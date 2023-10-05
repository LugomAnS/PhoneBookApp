import { observer } from "mobx-react-lite"
import { useStore } from "../../stores/store"
import { Modal } from "semantic-ui-react";

export default observer(function ModalContainer(){
  const {modalStore} = useStore();
  return (
    <Modal
      closeIcon
      dimmer='blurring'
      open={modalStore.isOpen}
      onClose={modalStore.closeModal}
      size='mini'
    >
      <Modal.Content>
        {modalStore.body}
      </Modal.Content>
    </Modal>
  )
})
