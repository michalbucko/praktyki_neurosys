import React, { useEffect, useRef, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatchNotification, useSelectNotification } from 'shared/Notification/notificationsSlice'
import { Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Message } from '../types'

export const Notification = () => {
  const [open, setOpen] = useState(false)
  const messagesRef = useRef<Message[]>([])
  const { messages, type } = useSelectNotification()
  const { clearMessages } = useDispatchNotification()

  useEffect(() => {
    if (messages.length && (messages === messagesRef.current || !messagesRef.current.length)) {
      setOpen(true)
    } else if (open && messages !== messagesRef.current) {
      setOpen(false)
    }

    messagesRef.current = messages
  }, [messages, open])

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    clearMessages()
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          elevation={6}
          severity={type || undefined}
          variant="filled"
          action={
            <>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        >
          {messages.length
            ? messages.map((message) => (
                <Typography variant="body1" key={`${message}.${Math.random()}`}>
                  {message}
                </Typography>
              ))
            : ''}
        </Alert>
      </Snackbar>
    </div>
  )
}
