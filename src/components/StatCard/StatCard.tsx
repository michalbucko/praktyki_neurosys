import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  cardArea: {
    maxHeight: 600,
    '& img': {
      maxWidth: '100%',
      maxHeight: 'calc(100% - 130px)',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imgWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 550,
  },
})

type Props = {
  label: string
  count: number
  img?: string
}

export const StatCard = ({ count, label, img }: Props) => {
  const { cardArea, imgWrapper } = useStyles()
  return (
    <Card>
      <CardActionArea className={cardArea}>
        <div className={imgWrapper}>
          <CardMedia component="img" image={img} alt={label} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h2" align="center">
            {count}
          </Typography>
          <Typography variant="h4" color="textSecondary" align="center">
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
