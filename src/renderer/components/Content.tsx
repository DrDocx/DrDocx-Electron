import * as React from 'react';

import { Button } from '@material-ui/core'

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import PatientsContent from './Pages/PatientsContent/PatientsContent';
import PatientFieldsContent from './Pages/PatientFieldsContent/PatientFieldsContent';
import TemplatesContent from './Pages/TemplatesContent/TemplatesContent';

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

export interface ContentProps extends WithStyles<typeof styles> { activeTab: string; }

export interface ContentState { activeTab: string; }

class Content extends React.Component<ContentProps, ContentState> {

	constructor(props: ContentProps) {
		super(props);
		this.state = {
			activeTab: props.activeTab,
		};
	}

	static getDerivedStateFromProps(props: ContentProps, state: ContentState): object {
		return {
			activeTab: props.activeTab,
		};
	}

	render(): any {
		const { classes } = this.props;
		switch (this.state.activeTab) {
			case 'Patients': {
				return (
					<PatientsContent />
				);
			}
			case 'Patient Fields': {
				return (
					<PatientFieldsContent />
				);
			}
			case 'Templates': {
				return (
					<TemplatesContent />
				);
			}
			default:{
				return (
					<div>Page in development</div>
				);
			}
		}
	}
}

export default withStyles(styles)(Content);
