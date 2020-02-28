import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import Default from './Default';
import EditFieldGroup from './EditFieldGroup';
import NewField from './NewField';
import NewFieldGroup from './NewFieldGroup';

const styles = (theme: Theme) =>
	createStyles({
	});

export interface PatientFieldsContentProps extends WithStyles<typeof styles> {  }

export interface PatientFieldsContentState { subTab: string; currentFieldGroupId: number; }

class PatientFieldsContent extends React.Component<PatientFieldsContentProps, PatientFieldsContentState> {

	constructor(props: PatientFieldsContentProps) {
		super(props);
		this.state = {
			subTab: 'Default',
			currentFieldGroupId: 0,
		};
		this.switchSubTab.bind(this);
		this.switchCurrentFieldGroupId.bind(this);
	}

	static getDerivedStateFromProps(props: PatientFieldsContentProps, state: PatientFieldsContentState): object {
		return {
			subTab: state.subTab,
		};
	}

	switchSubTab(subtab: string): void {
		this.setState({ subTab: subtab, });
	}

	switchCurrentFieldGroupId(fieldGroupId: number): void {
		this.setState({ currentFieldGroupId: fieldGroupId, });
	}

	render(): any {
		const { classes } = this.props;
		switch (this.state.subTab) {
			case 'Default': {
				return (
					<Default
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
						switchCurrentFieldGroupId={(fieldGroupId: number) => { this.switchCurrentFieldGroupId(fieldGroupId); }}
					/>
				);
			}
			case 'NewFieldGroup': {
				return (
					<NewFieldGroup
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
					/>
				);
			}
			case 'EditFieldGroup': {
				return (
					<EditFieldGroup
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
						currentFieldGroupId={this.state.currentFieldGroupId}
					/>
				);
			}
			case 'NewField': {
				return (
					<NewField
						switchSubTab={(subtab: string) => { this.switchSubTab(subtab); }}
						currentFieldGroupId={this.state.currentFieldGroupId}
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

export default withStyles(styles)(PatientFieldsContent);