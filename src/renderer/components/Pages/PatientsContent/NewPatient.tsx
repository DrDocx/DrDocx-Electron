import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
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
		contentWrapper: {
			margin: '40px 16px',
		},
		centerForm: {
			width: '70%',
			marginLeft: '15%',
		}
	});

export interface NewPatientProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; hidden: boolean }

export interface NewPatientState { dateOfBirth: Date; }

class NewPatient extends React.Component<NewPatientProps, NewPatientState> {

	constructor(props: NewPatientProps) {
		super(props);
		this.state = {
			dateOfBirth: new Date(),
		};
	}

	render(): any {
		const { classes } = this.props;
		return (
			<div hidden={this.props.hidden} >
				<IconButton color='primary' onClick={() => { this.props.switchSubTab('Default'); }} >
					<ArrowBackIcon />
				</IconButton>Back
					<div className={clsx(classes.contentWrapper, classes.centerForm)} >
					<Typography variant="h6" gutterBottom>
						New Patient
							</Typography>
					<Grid container spacing={2} >
						<Grid item xs={12} sm={6}>
							<TextField
								required
								variant='outlined'
								id="Name"
								name="Name"
								label="Name"
								fullWidth
								autoComplete="name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								variant='outlined'
								id="Medical Record Number"
								name="Medical Record Number"
								label="Medical Record Number"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} >
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									required
									variant='dialog'
									margin="none"
									id="date-of-birth"
									label="Date of Birth"
									format="MM/dd/yyyy"
									value={this.state.dateOfBirth}
									onChange={(date: MaterialUiPickersDate) => { this.setState({ dateOfBirth: date as Date, }); }}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={12} >
							<TextField
								label='Notes'
								variant='outlined'
								multiline
								rows={4}
								rowsMax={6}
								fullWidth
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Button variant='contained' color='primary' ><AddIcon />Field</Button>
						</Grid>
						<Grid item container xs={6} justify='flex-end' >
							<Button variant='contained' color='primary' >Submit</Button>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(NewPatient);