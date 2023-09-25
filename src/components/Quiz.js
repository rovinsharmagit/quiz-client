import React, { useContext, useEffect, useState } from 'react'
import useStateContext from '../hooks/useStateContext'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import { Card, CardContent, CardHeader, List, ListItemButton, Typography } from '@mui/material'
import { getFormatedTime } from '../helper'

export default function Quiz() {

  const [qns, setQns] = useState([])
  const [qnIndex, setQnIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)

  let timer;

  const startTimer = () => {
   const startTime = performance.now();
   timer = setInterval(() => {
     const currentTime = performance.now();
     const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
     setTimeTaken(elapsedSeconds);
   }, 1000);
   };

  useEffect(() => {
     createAPIEndpoint(ENDPOINTS.question)
     .fetch()
     .then(res => {
           setQns(res.data)
           startTimer()
     })
     .catch(err => {console.log(err);})
      return () => {clearInterval(timer)}
  },[]) 

  return (
      qns.length !== 0
      ?<Card
         sx={{maxWidth:640, mx:'auto', mt:'5'}} >
            <CardHeader
            title={ 'Question ' + (qnIndex + 1) + ' of 5 ' }
            action={<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
         <CardContent>
            <Typography variant="h6">
               {qns[qnIndex].qnInWords}
            </Typography>
            <List>
               {qns[qnIndex].options.map((item, idx) =>
                 <ListItemButton key={idx}
                 disappleRipple>
                    <div>
                      <b>{String.fromCharCode(65+idx)+" . "}</b> {item}
                    </div>
                 </ListItemButton>
               )}
            </List>
         </CardContent>  
      </Card>
      :null
  )
}

