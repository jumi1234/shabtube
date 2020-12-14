import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import styled from 'styled-components';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input

const SingleCommentTemplate = styled.div`
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

function SingleComment(props) {

  const user = useSelector(state => state.user)
  const videoId = props.postId

  const [OpenReply, setOpenReply] =  useState(false)
  const [commentValue, setcommentValue] = useState("")

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }

  const onHandleChange = (e) => {
    setcommentValue(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = { content: commentValue, writer: user.userData._id, postId: videoId, responseTo: props.comment._id }

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

  const action = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
  ]

  return (
    <SingleCommentTemplate>
      <Comment
        actions={action}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      />
      {OpenReply &&
      <form onSubmit>
        <textarea
          onChange={onHandleChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button onClick>Submit</button>
      </form>
      }
    </SingleCommentTemplate>
  )
}

export default SingleComment
