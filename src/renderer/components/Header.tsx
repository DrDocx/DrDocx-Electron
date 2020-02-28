import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
	createStyles({
		secondaryBar: {
			zIndex: 0,
		},
		menuButton: {
			marginRight: theme.spacing(1),
		},
		iconButtonAvatar: {
			padding: 4,
		},
		link: {
			textDecoration: 'none',
			color: lightColor,
			'&:hover': {
				color: theme.palette.common.white,
			},
		},
		button: {
			borderColor: lightColor,
		},
		title: {
			flexGrow: 1,
		}
	});

interface HeaderProps extends WithStyles<typeof styles> { onDrawerToggle: () => void; activeTab: string; }

interface HeaderState { activeTab: string; }

class Header extends React.Component<HeaderProps, HeaderState> {

	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			activeTab: props.activeTab,
		}
	}

	static getDerivedStateFromProps(props: HeaderProps, state: HeaderState): object {
		return {
			activeTab: props.activeTab,
		};
	}

	render(): any {
		const { classes, onDrawerToggle } = this.props;

		return (
			<React.Fragment>
				<AppBar position="sticky" color='primary' >
					<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { onDrawerToggle(); }} >
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{this.state.activeTab}
						</Typography>
					</Toolbar>
				</AppBar>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Header);
