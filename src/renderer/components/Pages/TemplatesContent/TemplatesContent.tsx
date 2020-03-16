import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import Default from './Default';

const styles = (theme: Theme) =>
	createStyles({
	});

export interface TemplatesContentProps extends WithStyles<typeof styles> { }

export interface TemplatesContentState { subTab: string; }

class TemplatesContent extends React.Component<TemplatesContentProps, TemplatesContentState> {

	constructor(props: TemplatesContentProps) {
		super(props);
		this.state = {
			subTab: 'Default',
		};
		this.switchSubTab.bind(this);
	}

	static getDerivedStateFromProps(props: TemplatesContentProps, state: TemplatesContentState): object {
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
			default: {
				return (
					<div>Page in development</div>
				);
			}
		}
	}
}

export default withStyles(styles)(TemplatesContent);