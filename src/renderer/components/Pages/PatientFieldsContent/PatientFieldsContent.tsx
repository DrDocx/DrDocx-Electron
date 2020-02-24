import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import Default from './Default';
import NewField from './NewField';

const styles = (theme: Theme) =>
	createStyles({
	});

export interface PatientFieldsContentProps extends WithStyles<typeof styles> { hidden: boolean; }

export interface PatientFieldsContentState { subTab: string; }

class PatientFieldsContent extends React.Component<PatientFieldsContentProps, PatientFieldsContentState> {

	constructor(props: PatientFieldsContentProps) {
		super(props);
		this.state = {
			subTab: 'Default',
		};
		this.switchSubTab.bind(this);
	}

	static getDerivedStateFromProps(props: PatientFieldsContentProps, state: PatientFieldsContentState): object {
		return {
			subTab: state.subTab,
		};
	}

	switchSubTab(subtab: string): void {
		this.setState({ subTab: subtab, });
	}

	render(): any {
		const { classes } = this.props;
		return (
			<div hidden={this.props.hidden} >
				<Default
					switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
					hidden={!(this.state.subTab === 'Default')}
				/>

				<NewField
					switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
					hidden={!(this.state.subTab === 'NewField')}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(PatientFieldsContent);