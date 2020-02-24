import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import PatientsContent from './Pages/PatientsContent/PatientsContent';
import PatientFieldsContent from './Pages/PatientFieldsContent/PatientFieldsContent';

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
		return (
			<React.Fragment>

			<PatientsContent hidden={!(this.props.activeTab === 'Patients')} />

			<PatientFieldsContent hidden={!(this.props.activeTab === 'Patient Fields')} />

			<div hidden={!(this.props.activeTab === 'Templates')} >Templates stuff</div>

			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Content);
