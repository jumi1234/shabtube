import React, { useState, useEffect } from 'react';
import { Tooltip, Icon } from 'antd';
import styled from 'styled-components';
import Axios from 'axios';

const LikeDislikesTemplate = styled.div`
  span span {
    padding-left: 8px;
    cursor: auto;
  }
`;

function LikeDislikes(props) {

  const [Likes, setLikes] = useState(0)
  const [Dislikes, setDislikes] = useState(0)
  const [LikeAction, setLikeAction] = useState(null)
  const [DislikeAction, setDislikeAction] = useState(null)

  let variable = {}

  if(props.video) {
    variable = { videoId: props.videoId, userId: props.userId }
  } else {
    variable = { commentId: props.commentId , userId: props.userId }
  }

  useEffect(() => {
    Axios.post('/api/like/getLikes', variable)
      .then(response => {
        if(response.data.success) {
          // 얼마나 많은 좋아요를 받았는지
            setLikes(response.data.likes.length)
          // 내가 이미 그 좋아요를 눌렀는지
          response.data.likes.map(like => {
            if(like.userId === props.userId) {
              setLikeAction('liked')
            }
          })
        } else {
          alert('Like에 대한 정보를 가져올 수 없습니다')
        }
      })

      Axios.post('/api/like/getDislikes', variable)
        .then(response => {
          if(response.data.success) {
            // 얼마나 많은 싫어요를 받았는지
              setDislikes(response.data.dislikes.length)
            // 내가 이미 그 싫어요를 눌렀는지
            response.data.dislikes.map(dislike => {
              if(dislike.userId === props.userId) {
                setDislikeAction('disliked')
              }
            })
          } else {
            alert('Dislike에 대한 정보를 가져올 수 없습니다')
          }
        })
  }, [])

  const onLike = () => {
    if(LikeAction === null) {
      Axios.post('/api/like/upLike', variable)
        .then(response => {
          if(response.data.success) {
            setLikes(Likes + 1)
            setLikeAction('liked')

            if(DislikeAction !== null) {
              setDislikeAction(null)
              setDislikes(Dislikes - 1)
            }
          } else {
            alert('좋아요에 실패했습니다')
          }
        })
    } else {
      Axios.post('/api/like/unLike', variable)
        .then(response => {
          if(response.data.success) {
            setLikes(Likes - 1)
            setLikeAction(null)
          } else {
            alert('좋아요 취소에 실패했습니다')
          }
        })
    }
  }

  const onDislike = () => {
    if(DislikeAction !== null) {
      Axios.post('/api/like/unDislike', variable)
        .then(response => {
          if(response.data.success) {
            setDislikes(Dislikes - 1)
            setDislikeAction(null)
          } else {
            alert('싫어요 취소에 실패했습니다')
          }
        })
    } else {
      Axios.post('/api/like/upDislike', variable)
        .then(response => {
          if(response.data.success) {
            setDislikes(Dislikes + 1)
            setDislikeAction('disliked')

            if(LikeAction !== null) {
              setLikeAction(null)
              setLikes(Likes - 1)
            }
          } else {
            alert('싫어요에 실패했습니다')
          }
        })
    }
  }

  return (
    <LikeDislikesTemplate>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like"
                theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                onClick={onLike} />
        </Tooltip>
        <span> {Likes} </span>
        </span>&nbsp;&nbsp;

        <span key="comment-basic-dislike">
          <Tooltip title="DisLike">
            <Icon type="dislike"
                  theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                  onClick={onDislike} />
          </Tooltip>
          <span> {Dislikes} </span>
          </span>&nbsp;&nbsp;
    </LikeDislikesTemplate>
  )
}

export default LikeDislikes
