import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const SubscribeTemplate = styled.div`
  button {
    border-radius: 4px;
    border: none;
    color: white;
    padding: 10px 16px;
    font-weight: 500;
    font-size: 1rem;
    text-transform: uppercase;
  }
`;

function Subscriber(props) {

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)

  useEffect(() => {

    let subscribeNumberVariables = { userTo: props.userTo, userFrom: props.userFrom }

    Axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
      .then(response => {
        if(response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber)
        } else {
          alert('구독자 수 정보를 받아오지 못 했습니다')
        }
      })

      let subscribedVariable = { userTo: props.userTo, userFrom: props.userFrom }       // 개발자 모드 Application > Storage > Local Storage

      Axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response => {
          if(response.data.success) {
            setSubscribed(response.data.subscribed)
          } else {
            alert('정보를 받아오지 못 했습니다')
          }
        })
  }, [])

  const onSubscribe = () => {

    let subscribedVariable = { userTo: props.userTo, userFrom: props.userFrom }

    if(Subscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
      .then(response => {
        if(response.data.success) {
          setSubscribeNumber(SubscribeNumber - 1)
          setSubscribed(!Subscribed)
        } else {
          alert('구독 취소하는데 실패했습니다')
        }
      })

    } else {
      Axios.post('/api/subscribe/subscribe', subscribedVariable)
      .then(response => {
        if(response.data.success) {
          setSubscribeNumber(SubscribeNumber + 1)
          setSubscribed(!Subscribed)
        } else {
          alert('구독하는데 실패했습니다')
        }
      })
    }

  }

  return(
    <SubscribeTemplate>
      <button style={{backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`}}
        onClick={onSubscribe}>{SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}</button>
    </SubscribeTemplate>
  )
}

export default Subscriber;
