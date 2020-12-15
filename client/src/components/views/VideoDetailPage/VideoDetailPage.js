import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import styled from 'styled-components';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

const DetailTemplate = styled.div`
  width: 100%;
  padding: 3rem 4rem;

  video {
    width: 100%;
    height: 500px;
  }
`;

function VideoDetailPage(props) {

  const videoId = props.match.params.videoId      // landding 페이지에서 가져온 params에서 videoId 값 가져옴
  const variable = { videoId: videoId }

  const [VideoDetail, setVideoDetail] = useState([])
  const [Comments, setComments] = useState([])

  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', variable)
      .then(response => {
        if(response.data.success) {
          setVideoDetail(response.data.videoDetail)
        } else {
          alert('비디오 정보를 가져오는 것을 실패했습니다')
        }
      })

      Axios.post('/api/comment/getComment', variable)
        .then(response => {
          if(response.data.success) {
            console.log(response.data.comments);
            setComments(response.data.comments)
          } else {
            alert('댓글 정보를 가져오는 것을 실패했습니다')
          }
        })
  }, [])

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment))      // concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환
                                                  // Comment.js에서 새 코멘트 저정할 때 그 배열을 가져와서 업데이트
  }

  if(VideoDetail.writer) {

    const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscriber userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <DetailTemplate>
            <video src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

            <List.Item actions={[ <LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} />, subscribeButton ]}>
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description} />
            </List.Item>

            <Comment refreshFunction={refreshFunction} CommentLists={Comments} postId={videoId} />

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
