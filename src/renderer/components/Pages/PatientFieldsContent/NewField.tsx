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

export interface NewFieldProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; hidden: boolean }

export interface NewFieldState { fieldType: string; numOptions: number; }

class NewField extends React.Component<NewFieldProps, NewFieldState> {

	private FieldName: React.RefObject<any>;
	private NumOptions: React.RefObject<any>;
	private ErrorText: React.RefObject<any>;
	private Options: React.RefObject<any>[];
	constructor(props: NewFieldProps) {
		super(props);
		this.state = {
			fieldType: 'None',
			numOptions: 1,
		};
		this.FieldName = React.createRef();
		this.ErrorText = React.createRef();
		this.NumOptions = React.createRef();
		this.Options = [];
	}

	submit(): void {
		if (this.state.fieldType !== 'None') {
			let options: string[] = [];
			if(this.state.fieldType === 'MultipleChoice' || this.state.fieldType === 'CheckBox'){
				for(var i =0;i<this.state.numOptions;i++){
						options.push(this.Options[i].current.value);
				}
			}

			if(this.Options[0].current.value)
				this.Options[0].current.value='';

			console.log(JSON.stringify({
				'fieldName': this.FieldName.current.value,
				'fieldType': this.state.fieldType,
				'options': options,
			}));
			this.setState({ fieldType: 'None', numOptions:1, });
			this.NumOptions.current.value=1;
			this.FieldName.current.value = '';
			this.ErrorText.current.innerText = '';
			this.props.switchSubTab('Default');
		} else {
			this.ErrorText.current.innerText = 'Please select a field type.';
		}
	}

	selectFieldType(fieldtype: string): void {
		this.setState({ fieldType: fieldtype });
		this.ErrorText.current.innerText = '';
	}

	displayOptions(): any {
		var rows = [];
		for (var i = 1; i <= this.state.numOptions; i++) {
			// note: we add a key prop here to allow react to uniquely identify each
			// element in this array. see: https://reactjs.org/docs/lists-and-keys.html
			this.Options.push(React.createRef());
			rows.push(
				<Grid item xs={12} key={i-1} >
					<TextField
						required
						variant='standard'
						id={"Option" + i as string}
						label={"Option " + i as string}
						inputRef={this.Options[i-1]}
					/>
				</Grid>
			);
		}
		return <React.Fragment>{rows}</React.Fragment>;
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
							<IconButton
								className={this.state.fieldType === 'Date' ? classes.selected : classes.unSelected}
								onClick={() => this.selectFieldType('Date')}
							>
								<TodayIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'SmallText' ? classes.selected : classes.unSelected}
								onClick={() => this.selectFieldType('SmallText')}
							>
								<TextFieldsIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'LargeText' ? classes.selected : classes.unSelected}
								onClick={() => this.selectFieldType('LargeText')}
							>
								<SubjectIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'MultipleChoice' ? classes.selected : classes.unSelected}
								onClick={() => this.selectFieldType('MultipleChoice')}
							>
								<RadioButtonCheckedIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'CheckBox' ? classes.selected : classes.unSelected}
								onClick={() => this.selectFieldType('CheckBox')}
							>
								<CheckBoxIcon />
							</IconButton>
						</Grid>
					</Grid>
					<div hidden={this.state.fieldType !== 'MultipleChoice' && this.state.fieldType !== 'CheckBox'} >
						<Grid container spacing={2} >
							<Grid item xs={4} >
								<TextField
									required
									variant='standard'
									id="NumOptions"
									label="# of Options"
									type='number'
									fullWidth
									inputRef={this.NumOptions}
									InputProps={{ inputProps: { min: 1, max: 100 } }}
									onChange={() => this.setState({ numOptions: (+this.NumOptions.current.value), })}
								/>
							</Grid>
							{this.displayOptions()}
						</Grid>
					</div>
					<Grid container spacing={2} >
						<Grid item container xs={12} justify='flex-end' >
							<Button variant='contained' color='primary' onClick={() => this.submit()} >Add Field</Button>
						</Grid>
						<Grid item container xs={12} >
							<Typography color='error' ref={this.ErrorText} ></Typography>
						</Grid>
					</Grid>
				</div>
			</div >
		);
	}
}

export default withStyles(styles)(NewField);