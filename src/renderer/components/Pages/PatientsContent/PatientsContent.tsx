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

import clsx from 'clsx';

import NewPatient from './NewPatient';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

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
		centerForm: {
			width: '70%',
			marginLeft: '15%',
		}
	});

export interface PatientsContentProps extends WithStyles<typeof styles> { subTab: string; switchSubTab: (subtab: string) => void; }

export interface PatientsContentState { subTab: string; addPatientDateOfBirth: Date; }

class PatientsContent extends React.Component<PatientsContentProps, PatientsContentState> {

	constructor(props: PatientsContentProps) {
		super(props);
		this.state = {
			subTab: props.subTab,
			addPatientDateOfBirth: new Date(),
		};
		this.switchSubTab.bind(this);
	}

	static getDerivedStateFromProps(props: PatientsContentProps, state: PatientsContentState): object {
		return {
			subTab: state.subTab,
		};
	}

	switchSubTab(subtab: string): void {
		this.setState({ subTab: subtab, });
		this.props.switchSubTab(subtab);
	}

	render(): any {
		const { classes } = this.props;
		switch (this.state.subTab) {
			case 'Default': {
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
										<Button
											variant="contained"
											color="primary"
											className={classes.addPatient}
											onClick={() => { this.switchSubTab('NewPatient'); }} >
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
			}
			case 'NewPatient': {
				return (
					<React.Fragment>
						<NewPatient
							switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
						/>
					</React.Fragment>
				);
			}
		}
	}
}

export default withStyles(styles)(PatientsContent);