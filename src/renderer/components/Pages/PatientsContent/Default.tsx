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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { IconButton, Card, CardContent } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import clsx from 'clsx';

import * as rm from 'typed-rest-client/RestClient';

import { PatientInfo } from '../../Models/Patient';

import { format, parseISO } from 'date-fns';
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

export interface DefaultProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; }

export interface DefaultState { patientsInfo: PatientInfo[]; }

class Default extends React.Component<DefaultProps, DefaultState> {

	constructor(props: DefaultProps) {
		super(props);
		this.state = {
			patientsInfo: [],
		}
	}

	componentDidMount(): void {
		this.getPatients().then((value: PatientInfo[]) => this.setState({ patientsInfo: value, }));
	}

	async getPatients(): Promise<PatientInfo[]> {
		let rest: rm.RestClient = new rm.RestClient('get-patients', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<PatientInfo[]> = await rest.get<PatientInfo[]>('api/Patient');
		if (res.result) {
			return res.result;
		} else {
			return [];
		}
	}

	async deletePatient(id: number): Promise<any> {

		this.setState({
			patientsInfo: this.state.patientsInfo.filter((patientInfo: PatientInfo) => { return patientInfo.id !== id })
		});
		let rest: rm.RestClient = new rm.RestClient('get-patients', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<PatientInfo[]> = await rest.del<PatientInfo[]>('api/Patient/' + id as string);
	}

	render(): any {

		const { classes } = this.props;
		return (
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
				{this.state.patientsInfo.length > 0 &&
					<Table >
						<TableBody>
							{this.state.patientsInfo.map((patientInfo: PatientInfo) => (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={patientInfo.id}
								>
									<TableCell align='left' >
										<Checkbox color='primary' />
										{patientInfo.name}
									</TableCell>
									<TableCell align='right' >
										Modified {format(parseISO(patientInfo.dateModified), 'MM/dd/yyyy')}
									</TableCell>
									<TableCell align='right' >
										<IconButton color='primary' >
											<EditIcon />
										</IconButton>
										<IconButton color='primary' onClick={() => this.deletePatient(patientInfo.id)} >
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				}
				{this.state.patientsInfo.length === 0 &&
					<div className={classes.contentWrapper}>
						<Typography color="textSecondary" align="center">
							No patients yet
					</Typography>
					</div>
				}
			</Paper>
		);
	}
}

export default withStyles(styles)(Default);