import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

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

  return (
    <VideoTemplate>
      <TitleDiv>
        <Title level={2}>Upload Video</Title>
      </TitleDiv>
      <Form onSubmit>
        <DropDiv>
          <Dropzone onDrop multiple maxSize>
          {({ getRootProps, getInputProps }) => (
            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem' }} />
            </div>
          )}

          </Dropzone>
          <ThumbDiv>
            <img src alt />
          </ThumbDiv>
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
