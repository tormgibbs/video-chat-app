import { Grid, Typography, Paper } from '@mui/material'
import styles from './styles.module.css'

import { SocketContext } from '../SockectContext'
import { useContext } from 'react'

const CameraView = () => {
  const { name, callAccepted, myVideoRef, userVideoRef, callEnded, stream, call } = useContext(SocketContext)
  
  return (
    <Grid container className={styles.gridContainer}>
      {stream && (
        <Paper className={styles.paper}>
          <Grid item xs={12} md={6} >
            <Typography variant="h5" gutterBottom>{name || ''}</Typography>
            <video playsInline muted ref={myVideoRef} autoPlay className={styles.video} style={{ transform: "scaleX(-1)" }}/>
          </Grid>
        </Paper>
      )}

      {callAccepted && !callEnded && (
        <Paper className={styles.paper}>
          <Grid item xs={12} md={6} >
            <Typography variant="h5" gutterBottom>{call.name || ''}</Typography>
            <video playsInline  ref={userVideoRef} autoPlay className={styles.video}/>
          </Grid>
        </Paper>
      )}
      
    </Grid>
  )
}

export default CameraView