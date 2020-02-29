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

import { IconButton, Tooltip } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import clsx from 'clsx';

import * as rm from 'typed-rest-client/RestClient';

import { FieldGroup } from '../../Models/FieldGroup';

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

export interface DefaultProps extends WithStyles<typeof styles> {
	switchSubTab: (subtab: string) => void;
	switchCurrentFieldGroupId: (fieldgroupid: number) => void;
}

export interface DefaultState { fieldGroups: FieldGroup[] }

class Default extends React.Component<DefaultProps, DefaultState> {

	constructor(props: DefaultProps) {
		super(props);
		this.state = {
			fieldGroups: [],
		}
	}

	componentDidMount(): void {
		this.getFieldGroups().then((value: FieldGroup[]) => this.setState({ fieldGroups: value, }));
	}

	async getFieldGroups(): Promise<FieldGroup[]> {
		let rest: rm.RestClient = new rm.RestClient('get-field-groups', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<FieldGroup[]> = await rest.get<FieldGroup[]>('api/FieldGroup');
		if (res.result) {
			return res.result;
		} else {
			return [];
		}
	}

	async deleteFieldGroup(id: number): Promise<any> {

		this.setState({
			fieldGroups: this.state.fieldGroups.filter((fieldGroup: FieldGroup) => { return fieldGroup.id !== id })
		});
		let rest: rm.RestClient = new rm.RestClient('del-field-group', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<FieldGroup[]> = await rest.del<FieldGroup[]>('api/FieldGroup/' + id as string);
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
									placeholder="Search Field Groups"
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
									onClick={() => { this.props.switchSubTab('NewFieldGroup'); }} >
									New Field Group
								</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				{this.state.fieldGroups.length > 0 &&
					<Table >
						<TableBody>
							{this.state.fieldGroups.map((fieldGroup: FieldGroup) => (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={fieldGroup.id}
								>
									<TableCell align='left' >
										{fieldGroup.name}
									</TableCell>
									<TableCell align='right' >
										<Tooltip title='Edit' >
											<IconButton color='primary' onClick={() => {
												this.props.switchSubTab('EditFieldGroup');
												this.props.switchCurrentFieldGroupId(fieldGroup.id);
											}}
											>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Delete' >
											<IconButton color='primary' onClick={() => { this.deleteFieldGroup(fieldGroup.id); }} >
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				}
				{this.state.fieldGroups.length === 0 &&
					<div className={classes.contentWrapper}>
						<Typography color="textSecondary" align="center">
							No field groups yet
						</Typography>
					</div>
				}
			</Paper>
		);
	}
}

export default withStyles(styles)(Default);