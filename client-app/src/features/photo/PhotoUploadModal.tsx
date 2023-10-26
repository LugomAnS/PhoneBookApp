import { useEffect, useState } from "react";
import { Button, Divider, Grid, Step, Image } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { useStore } from "../../app/stores/store";

interface Props {
  uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadModal({uploadPhoto}: Props) {
  const {modalStore: {closeModal}} = useStore();
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const [filePath, setFilePath] = useState<string>();
  const [blobFile, setBlobFile] = useState<Blob>();
  const [imageUrl, setImageUrl] = useState('');

  function handleNextStep() {
    if(step === 1) {
      if (cropper)
        cropper.getCroppedCanvas().toBlob(blob => {
          setBlobFile(blob!);
          setImageUrl(URL.createObjectURL(blob!));
        });
    }
    setStep(step + 1);
  }

  function handleBackStep() {
    if(step === 1) {
      setFiles([]);
    }

    setStep(step - 1);
  }

  useEffect(() => {
      if(files && files.length > 0 && step === 0) {
        setFilePath(URL.createObjectURL(files[0]));
        setStep(step + 1);
      }
  }, [files, step])

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Step.Group ordered fluid>
            <Step completed={step > 0} active={step === 0}>
              <Step.Content>
                <Step.Title content='Шаг 1'/>
                <Step.Description content='Выберите файл'/>
              </Step.Content>
            </Step>

            <Step completed={step > 1} active={step === 1}>
              <Step.Content>
                <Step.Title content='Шаг 2' />
                <Step.Description content='Отредактируйте фото'/>
              </Step.Content>
            </Step>

            <Step active={step === 2}>
              <Step.Content>
                <Step.Title content='Шаг 3' />
                <Step.Description content='Загрузите фото'/>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row>
        {step === 0 &&
        <PhotoWidgetDropzone setFiles={setFiles} />}
        {step === 1 &&
        <PhotoWidgetCropper setCropper={setCropper} imagePreview={filePath}/>}
        {step === 2 &&
        <Image centered src={imageUrl} style={{height: 300, width: 300}} /> }
      </Grid.Row>
      <Divider />
      <Grid.Column width={16}>
        <Button floated="left" content='Назад' onClick={() => handleBackStep()}
          disabled={step === 0}
        />
        {step === 2 ? (
          <Button positive floated="right" content='Сохранить' onClick={() => {
            uploadPhoto(blobFile!);
            closeModal();
          }}/>
        ) : (
          <Button positive floated="right" content='Дальше' onClick={() => handleNextStep()}
            disabled={!!files && !files[0]}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}
