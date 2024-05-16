import { Typography, AppBar } from '@mui/material'
import CameraView from './components/CameraView'
import Options from './components/Options'
import Notifications from './components/Notifications'
import styles from './components/styles.module.css'



const App = () => {
  return (
    <div className={styles.wrapper}>
      <AppBar className={styles.appBar} position="static" color='transparent'>
        <Typography variant="h3" align='center'>
          Video Chat
        </Typography>
      </AppBar>
      <CameraView/>
      <Options>
        <Notifications/>  
      </Options>
    </div>
  )
}

export default App