import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone"
import { Grid, Header, Icon, Label } from "semantic-ui-react";

interface Props {
  setFiles: (files: File[]) => void;
}

export default function PhotoWidgetDropzone({setFiles}: Props) {
  const [error, setError] = useState<string>();
  const dzStyles = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as const,
    height: 200
  }
  const dzActive = {
    borderColor: 'green'
  }

  function fileValidation(file: File) {
    if(file.type === 'image/jpeg' || file.type === 'image/png') {
      return null;
    } else {
      return {
        code: 'Ошибка валидации',
        message: 'Выберите файл формата jpeg или png',
      };
    }
  }

  const {acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive} = useDropzone({validator: fileValidation });

  useEffect(() => {
    fileRejections.map(({errors}) => setError(errors[0].message))
  }, [error, fileRejections, setError])

  useEffect(() => {
    setFiles(acceptedFiles);
  }, [acceptedFiles, setFiles])

  return (
    <Grid.Column width={16}>
      {error &&
      <Label color="red" content={error} />}
      <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
        <input {...getInputProps()} />
        <Icon name='upload' size="huge" />
        <Header content='Выберите файл для загрузки' />
      </div>
    </Grid.Column>
  )
}
