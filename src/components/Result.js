import React, { useEffect, useState } from 'react'
import useStateContext from '../hooks/useStateContext'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import { Box, Button, Card, Typography } from '@mui/material'
import { getFormatedTime } from '../helper'
import { green } from '@mui/material/colors'

export default function Result() {
  
  const {context, setContext} = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const ids = context.selectedOptions.map( x => x.qnId)
    createAPIEndpoint(ENDPOINTS.getAnswers)
    .post(ids)
    .then(res => {
      const qna = context.selectedOptions
      .map(x => ({
        ...x,
        ...(res.data.find(y => y.qnId == x.qnId))
      }))
      setQnAnswers(qna)
      calculateScore(qna)
    })
    .catch(err => console.log(err))
  }, [])

  const calculateScore = qna => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.seleted ? acc + 1 : acc;
    }, 0)
    setScore(tempScore)
  }

  const restart = () => {
    setContext({
      timetaken:0,
      selectedOptions:[]
    })
    navigate("/quiz")
  }

  return (
    <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
          <Typography variant="h4">
            Cogratulations
          </Typography>
          <Typography variant="h6">
            YOUR SCORE
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            <Typography variant="span" color={ green [1000]}>
              {score}
            </Typography>/100
          </Typography>
          <Typography variant="h6">
            Took {getFormatedTime(context.timeTaken)+ ' mins'}
          </Typography>
          <Button
          variant="contained"
          sx={{m : 1}}
          size="small"
          onClick={submitScore}>
          Submit
          </Button>
          <Button
          variant="contained"
          sx={{m : 1}}
          size="small"
          onClick={restart}>
          Re-try
          </Button>
        </CardContent>
      </Box>
    </Card>
  )
}
