import React, { useEffect, useState } from 'react'
import {FaCode} from "react-icons/fa";
import styled from 'styled-components';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';

const {Title} = Typography
const {Meta} = Card

const LandingTemplate = styled.div `
  width: 85%;
  margin: 3rem auto;
`;
const ThumbDiv = styled.div `
  position: relative;
`;

function LandingPage() {

  const [Videos, setVideos] = useState([])

  useEffect(() => {
    Axios.get('/api/video/getVideos').then(response => {
      if (response.data.success) {
        console.log(response.data.videos)
        setVideos(response.data.videos)
      } else {
        alert('Failed to get Videos')
      }
    })
  }, [])      // useEffect(, []) 빈 배열은 렌더링했을 때 한 번만 실행, 배열이 없으면 리렌더링할 때마다 항상 실행



  const renderCards = Videos.map((video, index) => {

    const upViews = () => {
      const variables = { id: video._id, views: video.views + 1 }
      Axios.post('/api/video/upViews', variables)
        .then(response => {
          if(response.data.success) {

          } else {
            alert('조회수 증가에 실패했습니다')
          }
        })
    }

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return <Col lg={6} md={8} xs={24} key={index}>
      <ThumbDiv>
        <a href={`/video/${video._id}`} onClick={upViews}>
        <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
        <div className="duration">
          <span>{minutes} : {seconds}</span>
        </div>

      </a>
      </ThumbDiv>
      <br />
      <Meta avatar={
          <Avatar src={video.writer.image} />
        }
        title={video.title} />
      <span>{video.writer.name} </span><br />
        <span style={{ marginLeft: '3rem' }}> {video.views} views</span> • <span> {moment(video.createdAt).format("MMM Do YY")} </span>
    </Col>
  })

  return (
    <LandingTemplate>
      <Title level={2}>Recommended</Title>
      <hr/>
      <Row gutter={[32, 16]}>
        {renderCards}
      </Row>
    </LandingTemplate>
  )
}

export default LandingPage
