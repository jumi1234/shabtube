import React, { useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

const CommentTemplate = styled.div`
  form {
    display: flex;

    textarea {
      width: 100%;
      border-radius: 5px;
    }

    button {
      width: 20%;
      height: 52px;
    }
  }
`;

function Comment(props) {

  const videoId = props.postId
  const user = useSelector(state => state.user)
  const [commentValue, setcommentValue] = useState([])

  const handleClick = (e) => {
    setcommentValue(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()      // 새로고침 안 함

    const variables = { content: commentValue, writer: user.userData._id, postId: videoId }

    Axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if(response.data.success) {
          console.log(response.data.result)
          setcommentValue("")
          props.refreshFunction(response.data.result)
        } else {
          alert('코멘트를 저장하지 못 했습니다')
        }
      })
  }

  return (
    <CommentTemplate>
      <br />
      <p> Replies </p>
      <hr />
      {props.CommentLists && props.CommentLists.map((comment, index) => (
        (!comment.responseTo &&       // 대댓글이 아닌 코멘트만 출력
        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
        )
      ))}

      <form onSubmit={onSubmit}>
        <textarea
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button onClick={onSubmit}>Submit</button>
      </form>
    </CommentTemplate>
  )
}

export default Comment;
