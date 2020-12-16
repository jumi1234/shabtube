import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const SideTemplate = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 0 2rem;
  > * {
    &:first-child {
      width: 40%;
      margin-right: 1rem;
      a img {
        width: 100%;
      }
    }
    &:nth-child(2) {
      width: 50%;
      a span {
        &:first-child {
          font-size: 1rem;
          color: black;
          & ~ span {
            color: gray;
          }
        }
      }
    }
  }
`;

function SideVideo(props) {

  const [SideVideos, setSideVideos] = useState([])

  useEffect(() => {
    Axios.get('/api/video/getVideos')
      .then(response => {
      if (response.data.success) {
        console.log(response.data.videos)
        setSideVideos(response.data.videos)
      } else {
        alert('Failed to get Videos')
      }
    })
  }, [])

  const renderSideVideo = SideVideos.map((video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

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

    return <SideTemplate key={index}>
          <div>
            <a href={`/video/${props.videoId}`} onClick={upViews}>
              <img src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
            </a>
          </div>
          <div>
            <a>
              <span>{video.title}</span>
              <br />
              <span>{video.writer.name}</span>
              <br />
              <span>{video.views} views</span>
              <br />
              <span>{minutes} : {seconds}</span>
            </a>
          </div>
        </SideTemplate>
  })

  return (
    <React.Fragment>
      <div style={{marginTop: '3rem'}} />
      {renderSideVideo}
    </React.Fragment>
  )
}

export default SideVideo;
