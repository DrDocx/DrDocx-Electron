import * as React from 'react';
import clsx from 'clsx';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import { Omit } from '@material-ui/types';
import { Button } from '@material-ui/core';

const categories = [
	{
		id: 'Develop',
		children: [
			{ id: 'Patients', icon: <PeopleIcon />, active: true },
			{ id: 'Patient Fields', icon: <img src={require('../images/fields.png')} width='20' height='20' /> },
			{ id: 'Templates', icon: <img src={require('../images/document.png')} width='20' height='20' /> },
			{ id: 'Charts', icon: <img src={require('../images/charts.png')} width='20' height='20' /> },
		],
	},
	{
		id: 'Settings',
		children: [
			{ id: 'Analytics', icon: <SettingsIcon /> },
			{ id: 'Performance', icon: <TimerIcon /> },
			{ id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
		],
	},
];

const styles = (theme: Theme) =>
	createStyles({
		categoryHeader: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
		},
		categoryHeaderPrimary: {
			color: theme.palette.common.white,
		},
		item: {
			paddingTop: 1,
			paddingBottom: 1,
			color: 'rgba(255, 255, 255, 0.7)',
		},
		itemCategory: {
			backgroundColor: '#232f3e',
			boxShadow: '0 -1px 0 #404854 inset',
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
		},
		firebase: {
			fontSize: 24,
			color: theme.palette.common.white,
		},
		itemActiveItem: {
			color: '#ff69b4',
		},
		itemPrimary: {
			fontSize: 'inherit',
		},
		itemIcon: {
			minWidth: 'auto',
			marginRight: theme.spacing(2),
		},
		divider: {
			marginTop: theme.spacing(2),
		},
	});

export interface NavigatorProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> { }

class Navigator extends React.Component<NavigatorProps> {

	render(): any {
		const { classes, ...other } = this.props;

		return (
			<Drawer variant="permanent" {...other}>
				<List disablePadding>
					<ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
						<img src={require('../images/logo.png')} width='144' height='75' />
					</ListItem>
					{categories.map(({ id, children }) => (
						<React.Fragment key={id}>
							<ListItem className={classes.categoryHeader}>
								<ListItemText
									classes={{
										primary: classes.categoryHeaderPrimary,
									}}
								>
									{id}
								</ListItemText>
							</ListItem>
							{children.map(({ id: childId, icon, active }) => (
								<ListItem
									key={childId}
                  button={true}
                  onClick = {() => this.key = {'hellish'}}
									className={clsx(classes.item, active && classes.itemActiveItem)}
								>
									<ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
									<ListItemText
										classes={{
											primary: classes.itemPrimary,
										}}
									>
										{childId}
									</ListItemText>
								</ListItem>
							))}
							<Divider className={classes.divider} />
						</React.Fragment>
					))}
				</List>
			</Drawer>
		);
	}
}

export default withStyles(styles)(Navigator);
