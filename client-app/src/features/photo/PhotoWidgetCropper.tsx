import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css'
import { Grid } from "semantic-ui-react";

interface Props {
  imagePreview?: string;
  setCropper: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({imagePreview, setCropper}: Props) {
  return (
    <>
      <Grid.Column width={8}>
      <Cropper
        src={imagePreview}
        style={{height: 300, width: '100%'}}
        initialAspectRatio={1}
        aspectRatio={1}
        preview='.img-preview'
        guides={false}
        viewMode={1}
        autoCropArea={1}
        background={false}
        onInitialized={cropper => setCropper(cropper)}
      />
      </Grid.Column>
      <Grid.Column width={8} textAlign='center'>
        <div className="img-preview" style={{height: 300, overflow: 'hidden'}}/>
      </Grid.Column>
    </>

  )
}
