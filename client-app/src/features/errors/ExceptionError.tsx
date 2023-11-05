import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Container, Header, Segment } from "semantic-ui-react";

export default observer(function ExceptionError() {
  const {commonStore} = useStore();
  return(
    <Container>
      <Header as='h1' content='Server Error'/>
      <Header sub as='h5' color="red" content={commonStore.exceptionError?.message} />
      {commonStore.exceptionError?.details && (
        <Segment>
          <Header as='h4' content='Stack Trace' color='teal'/>
          <code style={{marginTop: '10px'}}>
            {commonStore.exceptionError.details}
          </code>
        </Segment>
      )}
    </Container>
  )
})
