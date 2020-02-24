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
		centerContent: {
			width: '70%',
			marginLeft: '15%',
		}
	});

export interface NewPatientProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; hidden: boolean }

export interface NewPatientState { dateOfBirth: Date; }

class NewPatient extends React.Component<NewPatientProps, NewPatientState> {

	private Name: React.RefObject<any>;
	private MedicalRecordNumber: React.RefObject<any>;
	private DateOfBirth: React.RefObject<any>;
	private Notes: React.RefObject<any>;
	constructor(props: NewPatientProps) {
		super(props);
		this.state = {
			dateOfBirth: new Date(),
		};
		this.submit.bind(this);
		this.Name = React.createRef();
		this.MedicalRecordNumber = React.createRef();
		this.DateOfBirth = React.createRef();
		this.Notes = React.createRef();
	}

	submit(): void {
		console.log(JSON.stringify({
			'name':this.Name.current.value,
			'medicalRecordNumber': this.MedicalRecordNumber.current.value,
			'dateOfBirth': this.state.dateOfBirth,
			'notes': this.Notes.current.value,
		}));
		this.Name.current.value = '';
		this.MedicalRecordNumber.current.value='';
		this.setState({dateOfBirth: new Date(),})
		this.Notes.current.value='';
		this.props.switchSubTab('Default');
	}

	render(): any {
		const { classes } = this.props;
		return (
			<div hidden={this.props.hidden} >
				<IconButton color='primary' onClick={() => { this.props.switchSubTab('Default'); }} >
					<ArrowBackIcon />
				</IconButton>Back
					<div className={clsx(classes.contentWrapper, classes.centerContent)} >
					<Typography variant="h6" gutterBottom>
						New Patient
					</Typography>
					<Grid container spacing={2} >
						<Grid item xs={12} sm={6}>
							<TextField
								required
								variant='standard'
								id="Name"
								label="Name"
								fullWidth
								autoComplete="name"
								inputRef={this.Name}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								variant='standard'
								id="MedicalRecordNumber"
								label="Medical Record Number"
								fullWidth
								inputRef={this.MedicalRecordNumber}
							/>
						</Grid>
						<Grid item xs={12} sm={6} >
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									required
									variant='dialog'
									margin="none"
									id="DateOfBirth"
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
								id='Notes'
								label='Notes'
								variant='outlined'
								multiline
								rows={4}
								rowsMax={6}
								fullWidth
								inputRef={this.Notes}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Button variant='contained' color='primary' ><AddIcon />Field</Button>
						</Grid>
						<Grid item container xs={6} justify='flex-end' >
							<Button variant='contained' color='primary' onClick={()=>this.submit()} >Submit</Button>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(NewPatient);