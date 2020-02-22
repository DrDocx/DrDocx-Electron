import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

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

export interface ContentProps extends WithStyles<typeof styles> { activeTab: string; subTab: string; }

export interface ContentState { activeTab: string; subTab: string; }

class Content extends React.Component<ContentProps, ContentState> {

  constructor(props: ContentProps) {
    super(props);
    this.state = {
      activeTab: props.activeTab,
      subTab: props.subTab,
    };
    this.switchSubTab.bind(this);
  }

  static getDerivedStateFromProps(props: ContentProps, state: ContentState): object {
    return {
      activeTab: props.activeTab,
      subTab: state.subTab,
    };
  }

  switchSubTab(subtab: string): void {
    this.setState({ subTab: subtab, });
  }

  render(): any {
    const { classes } = this.props;
    switch (this.state.activeTab) {
      case 'Patients': {
        switch (this.state.subTab) {
          case 'default': {
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
                        <Button variant="contained" color="primary" className={classes.addPatient} onClick={() => { this.switchSubTab('addPatient'); }} >
                          <AddIcon />Patient
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
          case 'addPatient': {
            return (
              <React.Fragment>
                <IconButton color='primary' onClick={() => { this.switchSubTab('default'); }} >
                  <ArrowBackIcon />
                </IconButton>Back
                <div className={classes.contentWrapper}>
                  <Typography variant="h6" gutterBottom>
                    New Patient
                </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="First Name"
                        name="First Name"
                        label="First Name"
                        fullWidth
                        autoComplete="name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="Preferred Name"
                        name="Preferred Name"
                        label="Preferred Name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={4} />
                    <Grid item xs={12} >
                      <TextField
                        required
                        id="Medical Record Number"
                        name="Medical Record Number"
                        label="Medical Record Number"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant='contained' color='primary' ><AddIcon />Field</Button>
                    </Grid>
                  </Grid>
                </div>
              </React.Fragment>
            );
            break;
          }
        }

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
