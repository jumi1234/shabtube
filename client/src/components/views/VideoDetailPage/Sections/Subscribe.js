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

function Subscribe(props) {

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)

  useEffect(() => {

    let varible = { userTo: props.userTo }

    Axios.post('/api/subscribe/subscribeNumber', varible)
      .then((response) => {
        if(response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber)
        } else {
          alert('구독자 수 정보를 받아오지 못 했습니다')
        }
      })

      let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }       // 개발자 모드 Application > Storage > Local Storage

      Axios.post('/api/post/subscribed', subscribedVariable)
        .then((response) => {
          if(response.data.success) {
            setSubscribed(response.data.subscribed)
          } else {
            alert('정보를 받아오지 못 했습지다')
          }
        })
  }, [])

  return(
    <SubscribeTemplate>
      <button style={{backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`}}>{SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}</button>
    </SubscribeTemplate>
  )
}

export default Subscribe;
