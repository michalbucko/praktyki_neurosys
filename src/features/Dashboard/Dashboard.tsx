import { Grid } from '@material-ui/core'
import Loader from 'components/Loader/Loader'
import { StatCard } from 'components/StatCard/StatCard'
import { useEffect } from 'react'
import { useDispatchDashboard, useSelectDashboard } from './dashboardSlice'

const images = [
  { name: 'softwares', img: 'https://apptech.com.tr/wp-content/uploads/2018/09/c-software.png' },
  {
    name: 'users',
    img: 'http://zslchrobry.lezajsk.pl/wp-content/uploads/2017/11/users.png',
  },
  { name: 'devices', img: 'https://www.phocuswire.com/uploadedimages/uploads/2012/11/mobile-devices.jpg' },
]

export const Dashboard = (): JSX.Element => {
  const { stats } = useSelectDashboard()
  const { fetchStats } = useDispatchDashboard()

  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Loader isLoading={stats.isLoading}>
      <Grid container justifyContent="center" spacing={4}>
        {stats.data &&
          Object.entries(stats.data).map((value) => (
            <Grid item xs={12} sm={8} md={4} lg={3}>
              <StatCard label={value[0]} count={value[1]} img={images.find((image) => image.name === value[0])?.img} />
            </Grid>
          ))}
      </Grid>
    </Loader>
  )
}
