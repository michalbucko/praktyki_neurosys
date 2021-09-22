import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { toDashboard, toHardwarePage, toSoftwarePage, toUsersPage, toHistoryPage } from 'routes/routes'
import DashboardIcon from '@material-ui/icons/Dashboard'
import React, { ReactNode } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import ComputerIcon from '@material-ui/icons/Computer'
import HistoryIcon from '@material-ui/icons/History'
import { Web } from '@material-ui/icons'
import { appBarHeight } from './Appbar'

type FeaturesType = {
  name: string
  url: string
  icon: ReactNode
}

export const drawerWidth = 200

const useStyles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      position: 'static',
      height: `calc(100vh - ${appBarHeight}px)`,
    },
    '& .MuiDrawer-root': {
      height: `100%`,
    },
  },
})

export const Sidebar = () => {
  const { push } = useHistory()
  const { drawer } = useStyles()

  const features: FeaturesType[] = [
    {
      name: 'Dashboard',
      url: toDashboard,
      icon: <DashboardIcon />,
    },
    {
      name: 'Software',
      url: toSoftwarePage,
      icon: <Web />,
    },
    {
      name: 'Hardware',
      url: toHardwarePage,
      icon: <ComputerIcon />,
    },
    {
      name: 'Users',
      url: toUsersPage,
      icon: <PeopleIcon />,
    },
    {
      name: 'History',
      url: toHistoryPage,
      icon: <HistoryIcon />,
    },
  ]

  return (
    <Drawer className={drawer} variant="permanent" anchor="left">
      <List>
        {features.map((feature) => (
          <ListItem key={`drawer-${feature.name}`} button onClick={() => push(feature.url)}>
            <ListItemIcon>{feature.icon}</ListItemIcon>
            <ListItemText primary={feature.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
