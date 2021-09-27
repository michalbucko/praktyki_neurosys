import { Container, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}))

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const StyledContainer = ({ children }: Props) => {
  const { container } = useStyles()

  return (
    <Container className={container} maxWidth="md">
      {children}
    </Container>
  )
}
