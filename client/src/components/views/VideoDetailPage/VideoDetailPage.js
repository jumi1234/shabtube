import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import styled from 'styled-components';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

const DetailTemplate = styled.div`
  width: 100%;
  padding: 3rem 4rem;

  video {
    width: 1000px;
    height: 500px;
  }
`;

function VideoDetailPage(props) {

  const videoId = props.match.params.videoId      // landding 페이지에서 가져온 params에서 videoId 값 가져옴
  const variable = { videoId: videoId }

  const [VideoDetail, setVideoDetail] = useState([])

  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', variable)
      .then(response => {
        if(response.data.success) {
          setVideoDetail(response.data.videoDetail)
        } else {
          alert('비디오 정보를 가져오는 것을 실패했습니다')
        }
      })
  }, [])

  if(VideoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <DetailTemplate>
            <video src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

            <List.Item actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>]}>
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description} />
            </List.Item>

          </DetailTemplate>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    )
  } else {
    return (
      <div>loading...</div>
    )
  }
}

export default VideoDetailPage;
