import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import PatientsContent from './Pages/PatientsContent/PatientsContent';

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

export interface ContentState { activeTab: string; subTab: string; }

class Content extends React.Component<ContentProps, ContentState> {

	constructor(props: ContentProps) {
		super(props);
		this.state = {
			activeTab: props.activeTab,
			subTab: 'Default',
		};
	}

	static getDerivedStateFromProps(props: ContentProps, state: ContentState): object {
		return {
			activeTab: props.activeTab,
		};
	}

	switchSubTab(subtab: string): void {
		this.setState({ subTab: subtab, });
	}

	render(): any {
		const { classes } = this.props;
		switch (this.state.activeTab) {
			case 'Patients': {
				return (
					<PatientsContent
						subTab={this.state.subTab}
						switchSubTab={(subtab: string) => {this.switchSubTab(subtab);}}
					/>
				);
			}
			case 'Patient Fields': {
				return (
					<div>Patient Fields stuff</div>
				);
			}
			case 'Templates': {
				return (
					<div>Templates stuff</div>
				);
			}
			default: {
				return (
					<div>Page Not Found</div>
				);
			}
		}
	}
}

export default withStyles(styles)(Content);
