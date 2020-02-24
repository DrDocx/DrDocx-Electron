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
	});

export interface DefaultProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; hidden: boolean }

export interface DefaultState { dateOfBirth: Date; }

class Default extends React.Component<DefaultProps, DefaultState> {

	render(): any {
		const { classes } = this.props;
		return (
			<div hidden={this.props.hidden} >
				<Paper className={classes.paper} >
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
										variant="outlined"
										color="primary"
										className={classes.addPatient}
										onClick={() => { this.props.switchSubTab('NewPatient'); }} >
										New Patient
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
			</div>
		);
	}
}

export default withStyles(styles)(Default);