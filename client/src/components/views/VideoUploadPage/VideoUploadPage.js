import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  {value: 0, label: "Private"},
  {value: 1, label: "Public"}
]

const CategoryOptions = [
  {value: 0, label: "Film & Animation"},
  {value: 1, label: "Autos & Vehicles"},
  {value: 2, label: "Music"},
  {value: 12, label: "Pets & Animals"},
]

const VideoTemplate = styled.div`
  maxWidth: 700px;
  margin: 2rem auto;
  padding: 50px 100px;
`;
const TitleDiv = styled.div`
  textAlign: center;
  marginBottom: 2rem;
`;
const DropDiv = styled.div`
  display: flex;
  justifyContent: space-between;
`;
const ThumbDiv = styled.div`

`;

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Category, setCategory] = useState(" Film & Animation ")
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [ThumbnailPath, setThumbnailPath] = useState("")

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value)
  }

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value)
  }

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value)
  }

  const onDrop = (files) => {
    let formData = new FormData;
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    Axios.post('/api/video/uploadfiles', formData, config)
      .then(response => {
        if(response.data.success) {
          console.log(response.data);

          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName
          }

          setFilePath(response.data.filePath)

          Axios.post('/api/video/thumbnail', variable)
            .then(response => {
              if(response.data.success) {
                setDuration(response.data.fileDuration)
                setThumbnailPath(response.data.thumbsFilePath)
              } else {
                alert('썸네일 생성에 실패했습니다')
              }
            })
        } else {
          alert('비디오 업로드에 실패했습니다')
        }

      })
  }

  return (
    <VideoTemplate>
      <TitleDiv>
        <Title level={2}>Upload Video</Title>
      </TitleDiv>
      <Form onSubmit>
        <DropDiv>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000000}>
          {({ getRootProps, getInputProps }) => (
            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem' }} />
            </div>
          )}
          </Dropzone>

          {ThumbnailPath &&           // ThumbnailPath 있을 때만 ThumbDiv 영역 렌더링
            <ThumbDiv>
              <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
            </ThumbDiv>
          }

        </DropDiv>

        <br />
        <br />
        <label>Title</label>
        <Input
          onChange={onTitleChange}
          value={VideoTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={Description}
        />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </VideoTemplate>
  )
}

export default VideoUploadPage;
