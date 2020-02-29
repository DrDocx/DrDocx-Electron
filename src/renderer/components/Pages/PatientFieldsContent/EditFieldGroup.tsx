import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TodayIcon from '@material-ui/icons/Today';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SubjectIcon from '@material-ui/icons/Subject';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { IconButton, Tooltip } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import clsx from 'clsx';

import { FieldGroup } from '../../Models/FieldGroup';
import { Field } from '../../Models/Field';

import * as rm from 'typed-rest-client/RestClient';

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
		addButton: {
			marginRight: theme.spacing(1),
		},
		contentWrapper: {
			margin: '40px 16px',
		},
	});

export interface EditFieldGroupProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; currentFieldGroupId: number; }

export interface EditFieldGroupState { id: number; name: string; description: string; fields: Field[]; }

class EditFieldGroup extends React.Component<EditFieldGroupProps, EditFieldGroupState> {

	constructor(props: EditFieldGroupProps) {
		super(props);
		this.state = {
			id: 0,
			name: '',
			description: '',
			fields: [],
		};
	}

	componentDidMount(): void {
		this.getFieldGroup().then((value: FieldGroup) => {
			this.setState({
				id: value.id,
				name: value.name,
				description: value.description,
				fields: value.fields,
			});
		});
	}

	async getFieldGroup(): Promise<FieldGroup> {
		let rest: rm.RestClient = new rm.RestClient('get-field-group', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<FieldGroup> = await rest.get<FieldGroup>('api/FieldGroup/' + this.props.currentFieldGroupId as string);
		if (res.result) {
			return res.result;
		} else {
			return { name: 'Something went wrong', id: -1, description: '', fields: [] };
		}
	}

	async deleteField(id: number): Promise<any> {

		this.setState({
			fields:
				this.state.fields.filter((field: Field) => { return field.id !== id })
		});
		let rest: rm.RestClient = new rm.RestClient('del-field', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<Field[]> = await rest.del<Field[]>('api/Field/' + id as string);
	}

	render(): any {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<IconButton color='primary' onClick={() => { this.props.switchSubTab('Default'); }} >
					<ArrowBackIcon />
				</IconButton>Back
			<div className={clsx(classes.contentWrapper)} >
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
											placeholder="Search Fields"
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
											className={classes.addButton}
											onClick={() => { this.props.switchSubTab('NewField'); }} >
											New Field
								</Button>
									</Grid>
								</Grid>
							</Toolbar>
						</AppBar>
						{this.state.fields.length > 0 &&
							<Table >
								<TableBody>
									{this.state.fields.map((field: Field) => (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={field.id}
										>
											<TableCell align='left' >
												{field.name}
											</TableCell>
											<TableCell align='right' >
												{field.type === 'Date' &&
													<Tooltip title='Date' >
														<IconButton color='primary' >
															<TodayIcon />
														</IconButton>
													</Tooltip>
												}
												{field.type === 'SmallText' &&
													<Tooltip title='Text' >
														<IconButton color='primary' >
															<TextFieldsIcon />
														</IconButton>
													</Tooltip>
												}
												{field.type === 'LargeText' &&
													<Tooltip title='Paragraph' >
														<IconButton color='primary' >
															<SubjectIcon />
														</IconButton>
													</Tooltip>
												}
											<Tooltip title='Delete' >
												<IconButton color='primary' onClick={() => { this.deleteField(field.id) }} >
													<DeleteIcon />
												</IconButton>
											</Tooltip>
											</TableCell>
										</TableRow>
								))}
								</TableBody>
							</Table>
					}
						{this.state.fields.length === 0 &&
						<div className={classes.contentWrapper}>
							<Typography color="textSecondary" align="center">
								No fields yet
						</Typography>
						</div>
					}
					</Paper>
				</div>
			</React.Fragment >
		);
	}
}

export default withStyles(styles)(EditFieldGroup);