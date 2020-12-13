import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const styles = (theme : Theme) => createStyles({
  root: {
    flexGrow: 1,
    flexWrap: 'nowrap',
    backgroundColor: 'grey',
    padding: theme.spacing(1)
  }
})

const TaskScreen = withStyles(styles)(Box)

export default TaskScreen
