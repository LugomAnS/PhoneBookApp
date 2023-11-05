import { Fragment } from "react";
import { Grid, Placeholder} from "semantic-ui-react";

export default function ConactDetailsPlaceholder() {
  return (
    <Fragment>
      <Grid>
        <Grid.Row >
          <Grid.Column width={4}>
            <Placeholder fluid style={{height: 150, width: 150}}>
              <Placeholder.Image />
            </Placeholder>
          </Grid.Column>
          <Grid.Column width={12}>
              <Placeholder style={{height: 30}}>
                <Placeholder.Line  />
              </Placeholder>
              <Placeholder style={{height: 30}}>
                <Placeholder.Line  />
              </Placeholder>
              <Placeholder style={{height: 30}}>
                <Placeholder.Line  />
              </Placeholder>
          </Grid.Column>
        </Grid.Row>

          <Grid.Row style={{minHeght: 150}}>
            <Grid.Column width={16}>
            <Placeholder fluid style={{height: 30}}>
              <Placeholder.Paragraph>
                <Placeholder.Line length="full"/>
              </Placeholder.Paragraph>
            </Placeholder>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{minHeight: 450}}>
            <Grid.Column width={16}>
            <Placeholder fluid style={{height: 30}}>
              <Placeholder.Paragraph>
                <Placeholder.Line length="full"/>
              </Placeholder.Paragraph>
            </Placeholder>
            <Placeholder fluid style={{height: 30}}>
              <Placeholder.Paragraph>
                <Placeholder.Line length="full"/>
              </Placeholder.Paragraph>
            </Placeholder>
            <Placeholder fluid style={{height: 30}}>
              <Placeholder.Paragraph>
                <Placeholder.Line length="full"/>
              </Placeholder.Paragraph>
            </Placeholder>
            </Grid.Column>
          </Grid.Row>
      </Grid>
    </Fragment>
  )
}
