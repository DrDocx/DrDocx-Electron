import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addPatient: {
      marginRight: theme.spacing(1),
    },
    contentWrapper: {
      margin: '40px 16px',
    },
  });

export interface ContentProps extends WithStyles<typeof styles> { activeTab: string; }

export interface ContentState { activeTab: string; }

class Content extends React.Component<ContentProps, ContentState> {

  constructor(props: ContentProps) {
    super(props);
    this.state = {
      activeTab: props.activeTab,
    };
  }

  render(): any {
    const { classes } = this.props;
    switch (this.state.activeTab) {
      case 'Patients': {
        return (
          <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <SearchIcon className={classes.block} color="inherit" />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Search by name"
                      InputProps={{
                        disableUnderline: true,
                        className: classes.searchInput,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" className={classes.addPatient} >
                      Add Patient
                  </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
              <Typography color="textSecondary" align="center">
                No patients yet
            </Typography>
            </div>
          </Paper>
        );
        break;
      }
      case 'Patient Fields': {
        return (
          <div>Patient Fields stuff</div>
        );
        break;
      }
      case 'Templates': {
        return (
          <div>Templates stuff</div>
        );
        break;
      }
      default: {
        return (
          <div>Page Not Found</div>
        );
        break;
      }
    }
  }
}

export default withStyles(styles)(Content);
