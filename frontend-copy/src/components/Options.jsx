/* eslint-disable react/prop-types */
import { TextField, Button, Typography, Grid, Paper, Container } from '@mui/material'
import styles from './styles.module.css' 
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'

import { SocketContext } from '../Context'
import { useContext, useState } from 'react'

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, endCall, callUser } = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('')
  return (
    <Container className={styles.container}>
      <Paper elevation={10} className={styles.paper}>
        <form className={styles.root} noValidate autoComplete='off'>
          <Grid container className={styles.gridContainer}>
            <Grid item xs={12} md={6} className={styles.padding}>
              <Typography gutterBottom variant='h6'>Account Info</Typography>
              <TextField label='Name' value={name} onChange={e => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={styles.margin}>
                <Button variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large'/>}>
                  Copy Your ID
                  </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={styles.padding}>
              <Typography gutterBottom variant='h6'>Make a call</Typography>
              <TextField label='ID to Call' value={idToCall} onChange={e => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant='contained' 
                  color='secondary' 
                  fullWidth 
                  startIcon={<PhoneDisabled fontSize='large'/>}
                  onClick={endCall}
                  className={styles.margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button variant='contained' 
                color='primary' 
                fullWidth 
                startIcon={<Phone fontSize='large'/>}
                onClick={() => callUser(idToCall)}
                className={styles.margin}
                >
                  Call
                </Button>
              )}
            </Grid>

          </Grid>
        </form>
      {children}
      </Paper>
    </Container>
  )
}

export default Options