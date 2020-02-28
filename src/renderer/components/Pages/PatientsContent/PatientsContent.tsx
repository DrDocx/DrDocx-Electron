import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import NewPatient from './NewPatient';
import Default from './Default';
import ViewPatientFields from './ViewPatientFields';

const styles = (theme: Theme) =>
	createStyles({
	});

export interface PatientsContentProps extends WithStyles<typeof styles> { }

export interface PatientsContentState { subTab: string; currentPatientId: number; }

class PatientsContent extends React.Component<PatientsContentProps, PatientsContentState> {

	constructor(props: PatientsContentProps) {
		super(props);
		this.state = {
			subTab: 'Default',
			currentPatientId: 0,
		};
		this.switchSubTab.bind(this);
		this.switchCurrentPatientId.bind(this);
	}

	static getDerivedStateFromProps(props: PatientsContentProps, state: PatientsContentState): object {
		return {
			subTab: state.subTab,
		};
	}

	switchSubTab(subtab: string): void {
		this.setState({ subTab: subtab, });
	}

	switchCurrentPatientId(patientid: number): void {
		this.setState({ currentPatientId: patientid, });
	}

	render(): any {
		const { classes } = this.props;
		switch (this.state.subTab) {
			case 'Default': {
				return (
					<Default
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
						switchCurrentPatientId={(patientid: number) => { this.switchCurrentPatientId(patientid); }}
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
			case 'ViewPatientFields': {
				return (
					<ViewPatientFields
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
						currentPatientId = {this.state.currentPatientId}
					/>
				);
			}
			default: {
				return (
					<div>Page in development</div>
				);
			}
		}
	}
}

export default withStyles(styles)(PatientsContent);