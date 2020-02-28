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

import * as rm from 'typed-rest-client/RestClient';

import { PatientInfo } from '../../Models/Patient'

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

export interface ViewPatientProps extends WithStyles<typeof styles> {
	switchSubTab: (subtab: string) => void;
	currentPatientId: number;
}

export interface ViewPatientState { }

class ViewPatient extends React.Component<ViewPatientProps, ViewPatientState> {

	private Name: React.RefObject<any>;
	private DateOfBirth: React.RefObject<any>;
	private Notes: React.RefObject<any>;
	constructor(props: ViewPatientProps) {
		super(props);
		this.Name = React.createRef();
		this.DateOfBirth = React.createRef();
		this.Notes = React.createRef();
	}

	componentDidMount(): void {
		this.getPatient().then((value: PatientInfo) => {
			this.Name.current.value = value.name;
		});
	}

	async getPatient(): Promise<PatientInfo> {
		let rest: rm.RestClient = new rm.RestClient('get-patient', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<PatientInfo> = await rest.get<PatientInfo>('api/Patient/' + this.props.currentPatientId as string);
		if (res.result) {
			return res.result;
		} else {
			return { name: 'Something went wrong', dateModified: 'undefined', id: -1, };
		}
	}

	render(): any {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<IconButton color='primary' onClick={() => { this.props.switchSubTab('Default'); }} >
					<ArrowBackIcon />
				</IconButton>Back
					<div className={clsx(classes.contentWrapper, classes.centerContent)} >
					<Grid container spacing={2} >
						<Grid item xs={12} sm={6}>
							<TextField
								disabled
								value='stuff'
								variant='standard'
								id="Name"
								label="Name"
								fullWidth
								inputRef={this.Name}
							/>
						</Grid>
						<Grid item xs={12} sm={6} >
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disabled
									variant='dialog'
									margin="none"
									id="DateOfBirth"
									label="Date of Birth"
									format="MM/dd/yyyy"
									value={new Date()}
									onChange={() => { }}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={12} >
							<TextField
								disabled
								value='stuff'
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
						<Grid item container xs={12} justify='flex-end' >
							<Button variant='contained' color='primary' >Edit Patient</Button>
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ViewPatient);