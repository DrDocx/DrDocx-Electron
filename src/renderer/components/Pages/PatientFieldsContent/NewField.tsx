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
			"&:hover": {backgroundColor: theme.palette.primary.main,},
			backgroundColor: theme.palette.primary.main,
			color: 'white',
		},
		unSelected: {
			color: theme.palette.primary.main,
		},
	});

export interface NewFieldProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; hidden: boolean }

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

	submit(): void {
		if(this.state.fieldType !== 'None'){
			console.log(JSON.stringify({
				fieldName: this.FieldName.current.value,
				fieldType: this.state.fieldType,
			}));
			this.setState({fieldType: 'None'});
			this.FieldName.current.value = '';
			this.ErrorText.current.innerText = '';
			this.props.switchSubTab('Default');
		} else {
			this.ErrorText.current.innerText = 'Please select a field type.';
		}
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
								name="FieldName"
								label="Field Name"
								fullWidth
								autoComplete="Fieldname"
								inputRef={this.FieldName}
							/>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'Date' ? classes.selected : classes.unSelected }
								onClick={() => this.setState({fieldType: 'Date'})}
							>
								<TodayIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'SmallText' ? classes.selected : classes.unSelected }
								onClick={() => this.setState({fieldType: 'SmallText'})}
							>
								<TextFieldsIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'LargeText' ? classes.selected : classes.unSelected }
								onClick={() => this.setState({fieldType: 'LargeText'})}
							>
								<SubjectIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'MultipleChoice' ? classes.selected : classes.unSelected }
								onClick={() => this.setState({fieldType: 'MultipleChoice'})}
							>
								<RadioButtonCheckedIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4} sm={2}>
							<IconButton
								className={this.state.fieldType === 'CheckBox' ? classes.selected : classes.unSelected }
								onClick={() => this.setState({fieldType: 'CheckBox'})}
							>
								<CheckBoxIcon />
							</IconButton>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item container xs={12} justify='flex-end' >
							<Button variant='contained' color='primary' onClick={()=>this.submit()} >Add Field</Button>
						</Grid>
						<Grid item container xs={12} >
							<Typography color='error' ref={this.ErrorText} ></Typography>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(NewField);