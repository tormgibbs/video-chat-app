/* eslint-disable react/prop-types */

import { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'


const SocketContext = createContext()

const socket = io('http://localhost:5000')

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState(null)
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')

  const myVideoRef = useRef()
  const userVideoRef = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream)

        if (myVideoRef.current) {
          myVideoRef.current.srcObject = currentStream;
        }
      })

    socket.on('me', id => setMe(id))
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal })
    })
  },[])
  
  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from })
    })

    peer.on('stream', (currentStream) => {
      userVideoRef.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = (id) => {
    console.log('callUser',id)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    })
    
    console.log(peer)
    

    console.log('peer',peer)

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name })
    })

    peer.on('stream', (currentStream) => {
      userVideoRef.current.srcObject = currentStream
    })

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
  }

  const endCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
    window.location.reload()
  }

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideoRef,
      userVideoRef,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      answerCall,
      endCall
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }
