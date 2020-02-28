import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import TodayIcon from '@material-ui/icons/Today';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SubjectIcon from '@material-ui/icons/Subject';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import clsx from 'clsx';
import * as rm from 'typed-rest-client/RestClient';
import { FieldGroup } from '../../Models/FieldGroup';


const styles = (theme: Theme) =>
	createStyles({
		contentWrapper: {
			margin: '40px 16px',
		},
		centerContent: {
			width: '70%',
			marginLeft: '15%',
		},
		selected: {
			"&:hover": { backgroundColor: theme.palette.primary.main, },
			backgroundColor: theme.palette.primary.main,
			color: 'white',
		},
		unSelected: {
			color: theme.palette.primary.main,
		},
	});

export interface NewFieldProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; }

export interface NewFieldState { }

class NewField extends React.Component<NewFieldProps, NewFieldState> {

	private FieldGroupName: React.RefObject<any>;
	private ErrorText: React.RefObject<any>;
	constructor(props: NewFieldProps) {
		super(props);
		this.FieldGroupName = React.createRef();
		this.ErrorText = React.createRef();
	}

	async submit(): Promise<FieldGroup | null> {
		if (this.FieldGroupName.current.value !== '') {
			let newFieldGroup: object = {
				'name': this.FieldGroupName.current.value,
				'description': '',
				'fields':[],
			};
			let rest: rm.RestClient = new rm.RestClient('add-field-group', 'https://localhost:1211/', undefined, { ignoreSslError: true });
			let res: rm.IRestResponse<FieldGroup> = await rest.create<FieldGroup>('api/FieldGroup', newFieldGroup);
			this.FieldGroupName.current.value = '';
			this.ErrorText.current.innerText = '';
			this.props.switchSubTab('Default');
			return res.result;
		} else {
			this.ErrorText.current.innerText = 'Please put in a Field Group name.';
			return null;
		}
	}

	selectFieldType(fieldtype: string): void {
		this.setState({ fieldType: fieldtype });
		this.ErrorText.current.innerText = '';
	}

	render(): any {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<IconButton color='primary' onClick={() => { this.props.switchSubTab('Default'); }} >
					<ArrowBackIcon />
				</IconButton>Back
					<div className={clsx(classes.contentWrapper, classes.centerContent)} >
					<Typography variant="h6" gutterBottom>
						New Field Group
					</Typography>
					<Grid container spacing={2} >
						<Grid item xs={12}>
							<TextField
								required
								variant='filled'
								id="FieldGroupName"
								label="Field Group Name"
								fullWidth
								inputRef={this.FieldGroupName}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2} >
						<Grid item container xs={12} justify='flex-end' >
							<Button variant='contained' color='primary' onClick={() => this.submit()} >Add Field</Button>
						</Grid>
						<Grid item container xs={12} >
							<Typography color='error' ref={this.ErrorText} ></Typography>
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(NewField);