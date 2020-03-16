import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import TodayIcon from '@material-ui/icons/Today';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SubjectIcon from '@material-ui/icons/Subject';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { Field } from '../../Models/Field';

import * as rm from 'typed-rest-client/RestClient';
import fetch from 'cross-fetch';

import clsx from 'clsx';
import { th } from 'date-fns/locale';

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

export interface NewFieldProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; currentFieldGroupId: number; }

export interface NewFieldState { fieldType: string; }

class NewField extends React.Component<NewFieldProps, NewFieldState> {

	private FieldName: React.RefObject<any>;
	private ErrorText: React.RefObject<any>;
	constructor(props: NewFieldProps) {
		super(props);
		this.state = {
			fieldType: 'None',
		};
		this.FieldName = React.createRef();
		this.ErrorText = React.createRef();
	}

	async submit(): Promise<Field | null> {
		if (this.state.fieldType !== 'None') {

			let newField: object = {
				fieldGroupId: this.props.currentFieldGroupId,
				name: this.FieldName.current.value,
				type: this.state.fieldType
			};

			console.log(newField);

			let rest: rm.RestClient = new rm.RestClient('create-field', 'https://localhost:1211/', undefined, { ignoreSslError: true });
			console.log("requestStart");
			let res: rm.IRestResponse<Field> = await rest.create<Field>('api/Field', newField);

			console.log("requestEnd");

			this.props.switchSubTab('EditFieldGroup');
			return res.result;
		} else {
			this.ErrorText.current.innerText = 'Please select a field type.';
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
				<IconButton color='primary' onClick={() => { this.props.switchSubTab('EditFieldGroup'); }} >
					<ArrowBackIcon />
				</IconButton>Back
				<div className={clsx(classes.contentWrapper, classes.centerContent)} >
					<Typography variant="h6" gutterBottom>
						New Field
					</Typography>
					<Grid container spacing={2} >
						<Grid item xs={12}>
							<TextField
								required
								variant='filled'
								id="FieldName"
								label="Field Name"
								fullWidth
								inputRef={this.FieldName}
							/>
						</Grid>
						<Grid item xs={4} sm={2}>
							<Tooltip title='Date' >
								<IconButton
									className={this.state.fieldType === 'Date' ? classes.selected : classes.unSelected}
									onClick={() => this.selectFieldType('Date')}
								>
									<TodayIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2}>
							<Tooltip title='Text' >
								<IconButton
									className={this.state.fieldType === 'SmallText' ? classes.selected : classes.unSelected}
									onClick={() => this.selectFieldType('SmallText')}
								>
									<TextFieldsIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2}>
							<Tooltip title='Paragraph' >
								<IconButton
									className={this.state.fieldType === 'LargeText' ? classes.selected : classes.unSelected}
									onClick={() => this.selectFieldType('LargeText')}
								>
									<SubjectIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
					<Grid container spacing={2} >
						<Grid item container xs={12} justify='flex-end' >
							<Button variant='contained' color='primary' onClick={() => {this.submit();console.log("submit")}} >Add Field</Button>
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