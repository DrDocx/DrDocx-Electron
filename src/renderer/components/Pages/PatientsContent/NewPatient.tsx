import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import DatePicker from '../../Miscellaneous/DatePicker';

import {
	Typography,
	Grid,
	Button,
	TextField,
	IconButton,
	Menu,
	MenuItem,
} from '@material-ui/core';

import clsx from 'clsx';

import fetch from 'cross-fetch';
import * as rm from 'typed-rest-client/RestClient';

import { PatientInfo } from '../../Models/Patient'
import { FieldGroup } from '../../Models/FieldGroup';
import { Field } from '../../Models/Field';
import { keys } from '@material-ui/core/styles/createBreakpoints';

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

export interface NewPatientProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; }

export interface NewPatientState {
	fieldGroupMenuPos: any;
	fieldGroups: FieldGroup[];
	addedFieldGroups: FieldGroup[];
	addedFieldGroupIds: Set<number>;
}

class NewPatient extends React.Component<NewPatientProps, NewPatientState> {

	private Name: React.RefObject<any>;
	private FieldValueGroups: any;
	constructor(props: NewPatientProps) {
		super(props);
		this.state = {
			fieldGroupMenuPos: null,
			fieldGroups: [],
			addedFieldGroups: [],
			addedFieldGroupIds: new Set<number>(),
		};
		this.submit.bind(this);
		this.Name = React.createRef();
		this.FieldValueGroups = {};
	}

	componentDidMount(): void {
		this.getFieldGroups().then((value: FieldGroup[]) => this.setState({ fieldGroups: value, }));
	}

	async addFieldValueGroup(newFieldValueGroup: any): Promise<number> {
		let rest: rm.RestClient = new rm.RestClient('add-patient', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<any> = await rest.create<any>('api/FieldValueGroup', newFieldValueGroup);
		return res.result!.id;
	}

	async addFieldValue(newFieldValue: any): Promise<null> {
		let rest: rm.RestClient = new rm.RestClient('add-patient', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<any> = await rest.create<any>('api/FieldValue', newFieldValue);
		return null;
	}

	async submit(): Promise<null> { // DO NOT TOUCH THIS FUNCTION
		let newPatient: any = {
			'name': this.Name.current.value,
			'dateModified': (new Date()).toISOString(),
		};
		let rest: rm.RestClient = new rm.RestClient('add-patient', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<any> = await rest.create<any>('api/Patient', newPatient);
		let patientId: number = res.result!.id;

		var idMap: number[] = [];
		let i = 0;

		let vals: any = {}

		Object.keys(this.FieldValueGroups).forEach((id: string) => {
			vals[id] = {};
			Object.keys(this.FieldValueGroups[id]).forEach((key: string) => {
				vals[id][key] = this.FieldValueGroups[id][key].current.value;
			});
		});


		Object.keys(this.FieldValueGroups).forEach(async (id: string) => {
			let newFieldValueGroup: any = {
				'FieldGroupId': Number(id),
				'PatientId': patientId,
			};
			let response: number = await this.addFieldValueGroup(newFieldValueGroup);
			idMap.push(response);

			Object.keys(this.FieldValueGroups[id]).forEach(async (fieldId: string) => {
				
				let newFieldValue: any = {
					'ParentGroupId': idMap[i],
					'FieldId': Number(fieldId),
					'FieldTextValue': vals[id][fieldId],
				}
				await this.addFieldValue(newFieldValue);
			})


			i++;
		})
		
		this.props.switchSubTab('Default');
		return null;
	}

	async getFieldGroups(): Promise<FieldGroup[]> {
		let rest: rm.RestClient = new rm.RestClient('get-field-groups', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<FieldGroup[]> = await rest.get<FieldGroup[]>('api/FieldGroup');
		if (res.result)
			return res.result;
		else
			return [];
	}

	async getFieldGroup(fieldGroupId: number): Promise<FieldGroup> {
		let rest: rm.RestClient = new rm.RestClient('get-field-group', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<FieldGroup> = await rest.get<FieldGroup>('api/FieldGroup/' + String(fieldGroupId));
		return res.result as FieldGroup;
	}

	addFieldGroup(fieldGroup: FieldGroup): void {
		this.getFieldGroup(fieldGroup.id).then((value: FieldGroup) => {
			this.FieldValueGroups[value.id] = {}
			for (var i = 0; i < value.fields.length; i++) {
				this.FieldValueGroups[value.id][value.fields[i].id] = React.createRef();
			}
			this.setState({
				addedFieldGroups: this.state.addedFieldGroups.concat([value]),
				addedFieldGroupIds: this.state.addedFieldGroupIds.add(value.id),
			});
		});
	}

	removeFieldGroup(id: number): void {
		let newIds: Set<number> = this.state.addedFieldGroupIds;
		newIds.delete(id);
		this.setState({
			addedFieldGroups: this.state.addedFieldGroups.filter((fieldGroup: FieldGroup) => (fieldGroup.id !== id)),
			addedFieldGroupIds: newIds,
		});
		delete this.FieldValueGroups[id];
	}

	render(): any {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<IconButton color='primary' onClick={() => { this.props.switchSubTab('Default'); }} >
					<ArrowBackIcon />
				</IconButton>Back
					<div className={clsx(classes.contentWrapper, classes.centerContent)} >
					<Typography variant="h5" gutterBottom>
						New Patient
					</Typography>
					<Grid container spacing={2} >
						<Grid item xs={12} >
							<TextField
								required
								variant='standard'
								id="Name"
								label="Name"
								autoComplete="name"
								inputRef={this.Name}
							/>
						</Grid>
						{this.state.addedFieldGroups.map((fieldGroup: FieldGroup) => (
							<Grid container item xs={12} spacing={2} key={fieldGroup.id} alignContent='center' >
								<Grid item xs={6} >
									<Typography variant='h6' gutterBottom >
										{fieldGroup.name}
									</Typography>
								</Grid>
								<Grid item container justify='flex-end' xs={6} >
									<IconButton color='primary' onClick={() => this.removeFieldGroup(fieldGroup.id)} >
										<DeleteIcon />
									</IconButton>
								</Grid>
								{fieldGroup.fields.map((field: Field) => (
									<React.Fragment key={field.id} >
										{field.type === 'Text' &&
											<Grid item xs={12} sm={6} >
												<TextField
													id={field.name}
													variant='standard'
													label={field.name}
													inputRef={this.FieldValueGroups[fieldGroup.id][field.id]}
												/>
											</Grid>
										}
										{field.type === 'Paragraph' &&
											<Grid item xs={12} >
												<TextField
													id={field.name}
													label={field.name}
													variant='outlined'
													multiline
													rows={4}
													rowsMax={6}
													fullWidth
													inputRef={this.FieldValueGroups[fieldGroup.id][field.id]}
												/>
											</Grid>
										}
										{field.type === 'Date' &&
											<Grid item xs={12} sm={6} >
												<DatePicker
													variant='dialog'
													id={field.name}
													label={field.name}
													inputRef={this.FieldValueGroups[fieldGroup.id][field.id]}
												/>
											</Grid>
										}
									</React.Fragment>
								))}
							</Grid>
						))}
						<Grid item xs={6}>
							{(this.state.addedFieldGroupIds.size < this.state.fieldGroups.length) &&
								<Button variant='contained' color='primary' onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.setState({ fieldGroupMenuPos: event.currentTarget })} ><AddIcon />Field Group</Button>
							}
							<Menu
								color='primary'
								open={Boolean(this.state.fieldGroupMenuPos)}
								anchorEl={this.state.fieldGroupMenuPos}
								onClose={() => this.setState({ fieldGroupMenuPos: null })}
								PaperProps={{
									style: {
										maxHeight: 48 * 4.5,
										width: 200,
									},
								}}
							>
								{this.state.fieldGroups.map((fieldGroup: FieldGroup) => {
									if (!this.state.addedFieldGroupIds.has(fieldGroup.id)) return (
										<MenuItem key={fieldGroup.id}
											onClick={() => {
												this.setState({ fieldGroupMenuPos: null, });
												this.addFieldGroup(fieldGroup);
											}}
										>
											{fieldGroup.name}
										</MenuItem>
									);
								})}
							</Menu>
						</Grid>
						<Grid item container xs={6} justify='flex-end' >
							<Button variant='contained' color='primary' onClick={() => this.submit()} >Submit</Button>
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(NewPatient);