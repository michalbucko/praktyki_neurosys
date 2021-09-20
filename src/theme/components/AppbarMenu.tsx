import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { useDispatchLogin } from 'features/LoginPage/LoginSlice'

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    color: theme.palette.background.paper,
  },
}))

export const AppbarMenu = () => {
  const { menuIcon } = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { logOut } = useDispatchLogin()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const SignOut = () => {
    setAnchorEl(null)
    logOut()
  }

  return (
    <>
      <IconButton aria-controls="appBarMenu" aria-haspopup="true" onClick={handleClick}>
        <MoreVert className={menuIcon} />
      </IconButton>
      <Menu id="appBarMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={SignOut}>Logout</MenuItem>
      </Menu>
    </>
  )
}
