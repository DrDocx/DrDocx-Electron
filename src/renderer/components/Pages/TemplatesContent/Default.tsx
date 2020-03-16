import * as React from 'react';

import {
	AppBar,
	Toolbar,
	Typography,
	Paper,
	Grid,
	Button,
	TextField,
	FormControlLabel,
} from '@material-ui/core';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { IconButton, Tooltip } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import clsx from 'clsx';

import * as rm from 'typed-rest-client/RestClient';
import fetch from 'cross-fetch';

const { shell } = require('electron');

import { Template } from '../../Models/Template';

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
}

export interface DefaultState { templates: Template[]; newTemplateDialogOpen: boolean; }

class Default extends React.Component<DefaultProps, DefaultState> {

	private ErrorText: React.RefObject<any>;
	private newTemplateName: React.RefObject<any>;
	private chosenFile: React.RefObject<any>;

	constructor(props: DefaultProps) {
		super(props);
		this.state = {
			templates: [],
			newTemplateDialogOpen: false,
		}
		this.ErrorText = React.createRef();
		this.newTemplateName = React.createRef();
		this.chosenFile = React.createRef();
	}

	componentDidMount(): void {
		this.getTemplates().then((value: Template[]) => this.setState({ templates: value, }));
	}

	async getTemplates(): Promise<Template[]> {
		let rest: rm.RestClient = new rm.RestClient('get-templates', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<Template[]> = await rest.get<Template[]>('api/Report');
		if (res.result) {
			return res.result;
		} else {
			return [];
		}
	}

	async addTemplate(): Promise<void> {
		var fileInput: HTMLInputElement | null = document.getElementById('templateFile') as HTMLInputElement;
		if (this.newTemplateName.current.value === '') {
			this.ErrorText.current.innerText = 'Please input a template name'
			return;
		}
		else if (fileInput.files![0]! === undefined) {
			this.ErrorText.current.innerText = 'Please input a file';
			return;
		}
		
		const formData = new FormData();
		formData.append('garbage', 'garbage'); // Microsoft ASP.NET Core Bug, see REST API documentation for why this needs to exist
		formData.append('templateFile', fileInput.files![0]!);
		formData.append('templateName', this.newTemplateName.current.value);
		const options = {
			method: 'POST',
			body: formData
		}
		fetch('https://localhost:1211/api/Report/upload',options);
		this.getTemplates().then((value: Template[]) => this.setState({ templates: value, }));
		
	}

	chooseFile(): void {
		var fileInput: HTMLInputElement | null = document.getElementById('templateFile') as HTMLInputElement;
		this.chosenFile.current.innerText = 'Chosen File: ' + fileInput.files![0]!.name;
	}

	async deleteTemplate(id: number): Promise<any> {

		this.setState({
			templates: this.state.templates.filter((template: Template) => { return template.id !== id })
		});
		let rest: rm.RestClient = new rm.RestClient('del-template', 'https://localhost:1211/', undefined, { ignoreSslError: true });
		let res: rm.IRestResponse<Template[]> = await rest.del<Template[]>('api/Report/' + id as string);
	}

	render(): any {

		const { classes } = this.props;
		return (
			<React.Fragment>
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
										placeholder="Search Templates"
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
										onClick={() => this.setState({ newTemplateDialogOpen: true })} >
										New Template
								</Button>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
					{this.state.templates.length > 0 &&
						<Table >
							<TableBody>
								{this.state.templates.map((template: Template) => (
									<TableRow
										hover
										tabIndex={-1}
										key={template.id}
									>
										<TableCell align='left' >
											{template.name}
										</TableCell>
										<TableCell align='right' >
											<Tooltip title='Edit' >
												<IconButton color='primary'
													onClick={() => shell.openItem(template.filePath)}
												>
													<EditIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title='Delete' >
												<IconButton color='primary' onClick={() => this.deleteTemplate(template.id)} >
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					}
					{this.state.templates.length === 0 &&
						<div className={classes.contentWrapper}>
							<Typography color="textSecondary" align="center">
								No templates yet
						</Typography>
						</div>
					}
				</Paper>
				<Dialog open={this.state.newTemplateDialogOpen} onClose={() => this.setState({ newTemplateDialogOpen: false })} aria-labelledby="form-dialog-title">
					<DialogTitle>New Template</DialogTitle>
					<DialogContent>
						<Grid container spacing={1} >
							<Grid item xs={12} >
								<TextField required label='Template Name' fullWidth inputRef={this.newTemplateName} ></TextField>
							</Grid>
							<Grid item xs={12} >
								<Typography color='error' ref={this.ErrorText} ></Typography>
							</Grid>
							<Grid item xs={12} >
								<Button fullWidth variant='contained' color='primary' component='label' >
									Choose File
									<input type='file' accept='.docx' onChange={() => this.chooseFile()} id='templateFile' style={{ display: "none" }} />
								</Button>
							</Grid>
							<Grid item xs={12} >
								<Typography ref={this.chosenFile} ></Typography>
							</Grid>
							<Grid item xs={12} >
								<Button
									fullWidth
									variant='outlined'
									color='primary'
									onClick={() => {this.addTemplate(); this.setState({ newTemplateDialogOpen: false });}}
								>
									Add Template
								</Button>
							</Grid>
						</Grid>
					</DialogContent>
				</Dialog>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Default);