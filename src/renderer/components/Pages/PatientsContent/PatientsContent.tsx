import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import NewPatient from './NewPatient';
import Default from './Default'

const styles = (theme: Theme) =>
	createStyles({
	});

export interface PatientsContentProps extends WithStyles<typeof styles> {  }

export interface PatientsContentState { subTab: string; }

class PatientsContent extends React.Component<PatientsContentProps, PatientsContentState> {

	constructor(props: PatientsContentProps) {
		super(props);
		this.state = {
			subTab: 'Default',
		};
		this.switchSubTab.bind(this);
	}

	static getDerivedStateFromProps(props: PatientsContentProps, state: PatientsContentState): object {
		return {
			subTab: state.subTab,
		};
	}

	switchSubTab(subtab: string): void {
		this.setState({ subTab: subtab, });
	}

	render(): any {
		const { classes } = this.props;
		switch (this.state.subTab) {
			case 'Default': {
				return (
					<Default
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
					/>
				);
			}
			case 'NewPatient': {
				return (
					<NewPatient
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
					/>
				);
			}
			default: {
				return (
					<div>404 Page Not Found</div>
				);
			}
		}
	}
}

export default withStyles(styles)(PatientsContent);