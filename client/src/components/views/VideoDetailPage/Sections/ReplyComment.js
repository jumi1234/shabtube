import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SingleComment from './SingleComment';

const ReplyTemplate = styled.div`
  p {
    font-size: 14px;
    margin: 0;
    color: gray;
  }
`;

function ReplyComment(props) {

  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReplyComment, setOpenReplyComment] = useState(false)

  useEffect(() => {
    let commentNumber = 0

    props.commentLists.map((comment) => {
      if(comment.responseTo === props.parentCommentId) {
        commentNumber++
      }
    })

    setChildCommentNumber(commentNumber)
  }, [props.commentLists])

  const onHandleChange = () => {
    setOpenReplyComment(!OpenReplyComment)
  }

  let renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, index) => (
        <React.Fragment>
            {
            comment.responseTo === parentCommentId &&
            <div style={{ width: '80%', marginLeft: '40px'}}>
              <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
              <ReplyComment commentLists={props.commentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
            </div>
          }
        </React.Fragment>
    ))

  return (
    <ReplyTemplate>
      { ChildCommentNumber > 0 &&
      <p onClick={onHandleChange}>
        View {ChildCommentNumber} more comment(s)
      </p>
      }
      {OpenReplyComment &&
          renderReplyComment(props.parentCommentId)
      }
    </ReplyTemplate>
  )

}

export default ReplyComment
