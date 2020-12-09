import React from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

const { TextArea } = Input;
const { Title } = Typography;

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
          onChange
          value
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange
          value
        />
        <br />
        <br />
        <select onChange>
          <option key value></option>
        </select>

        <br />
        <br />
        <select onChange>
          <option key value></option>
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
