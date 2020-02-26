import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import { IconButton } from '@material-ui/core';

const styles = (theme: Theme) =>
	createStyles({
		contentWrapper: {
			margin: '40px 16px',
		},
		centerContent: {
			width: '70%',
			marginLeft: '15%',
		}
	});

export interface DefaultProps extends WithStyles<typeof styles> { switchSubTab: (subtab: string) => void; }

export interface DefaultState { }

class Default extends React.Component<DefaultProps, DefaultState> {

	render(): any {
		const { classes } = this.props;
		return (
			<div className={clsx(classes.contentWrapper, classes.centerContent)} >
				<Grid container spacing={2} justify='center' >
					<Grid item container justify='center' xs={12} >
						<Button variant='contained' color='primary' onClick={() => { this.props.switchSubTab('NewField') }} >New Field</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Default);