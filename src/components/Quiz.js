import React, { useContext, useEffect, useRef, useState } from 'react'
import useStateContext from '../hooks/useStateContext'
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from '../api'
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material'
import { getFormatedTime } from '../helper'

export default function Quiz() {

  const [qns, setQns] = useState([])
  const [qnIndex, setQnIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const {context, setContext} = useStateContext()

  const timerRef = useRef(null);

  let timer = null;

  const startTimer = () => {
   if (timerRef.current === null) { // Check if the timer is already running
     const startTime = performance.now();
     timerRef.current = setInterval(() => {
       const currentTime = performance.now();
       const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
       setTimeTaken(elapsedSeconds);
     }, [1000]); // Use 1000 milliseconds (1 second) as the interval
   }
 };

  useEffect(() => {
     createAPIEndpoint(ENDPOINTS.question)
     .fetch()
     .then(res => {
           setQns(res.data);
           startTimer();
     })
     .catch(err => {console.log(err);})
     return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null; 
      }
    };
  },[]) 

  const updateAnswer = (qnId,optionIdx) => {
   const temp =[...context.selectedOption]
      temp.push({
      qnId,
      selected:optionIdx
   })
  
   if (qnIndex < 4){
      setContext({selectedOption:[...temp]})
      setQnIndex(qnIndex+1)
   }
   else{ setContext({selectedOption:[...temp], timeTaken})
   }
  }

  return (
      qns.length !== 0
      ?<Card
         sx={{maxWidth:640, mx:'auto', mt:'5',
         '& .MuiCardHeader-action':{m:0, alignSelf:'center'}}} >
            <CardHeader
            title={ 'Question ' + (qnIndex + 1) + ' of 5 ' }
            action={<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
            <Box>
               <LinearProgress variant="determinate" value={(qnIndex+1)*100/5} />
            </Box>
            {qns[qnIndex].imageName != null
               ? <CardMedia
                   component="img"
                   image={BASE_URL + 'images/' + qns[qnIndex].imageName}
                   sx={{ width: 'auto', m: '10px auto' }} />
            :null}
         <CardContent>
            <Typography variant="h6">
               {qns[qnIndex].qnInWords}
            </Typography>
            <List>
               {qns[qnIndex].options.map((item, idx) =>
                 <ListItemButton key={idx} onClick={()=>updateAnswer(qns[qnIndex].qnId,idx)}>
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

