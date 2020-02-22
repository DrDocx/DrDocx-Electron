import * as React from 'react';
import clsx from 'clsx';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import InputIcon from '@material-ui/icons/Input';

import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import { Omit } from '@material-ui/types';
import { Button } from '@material-ui/core';

var categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Patients', icon: <AssignmentIndIcon /> },
      { id: 'Patient Fields', icon: <InputIcon /> },
      { id: 'Templates', icon: <PostAddIcon /> },
    ],
  },
  {
    id: 'Settings',
    children: [
      { id: 'Account', icon: <SettingsIcon /> },
      { id: 'Privacy', icon: <TimerIcon /> },
      { id: 'Analytics', icon: <PhonelinkSetupIcon /> },
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
      color: '#49b2fb',
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

interface NavBarSubCategoryProps extends Omit<ListItemProps, 'classes'>, WithStyles<typeof styles> { active: boolean; id: string; icon: JSX.Element; myClick: Function; }

interface NavBarSubCategoryState { active: boolean; id: string; icon: JSX.Element; }

class NavBarSubCategory extends React.Component<NavBarSubCategoryProps, NavBarSubCategoryState> {

  static defaultProps = {
    active: false,
    id: 'unset id value',
    icon: null,
  }

  constructor(props: NavBarSubCategoryProps) {
    super(props);
    this.state = {
      active: props.active,
      id: props.id,
      icon: props.icon,
    };
  }

  static getDerivedStateFromProps(props: NavBarSubCategoryProps, state: NavBarSubCategoryState): object {
    return {
      active: props.active,
    };
  }

  render(): any {

    const { classes, active, id, icon, myClick, ...other } = this.props;

    return (
      <ListItem
        key={this.state.id}
        button={true}
        className={clsx(classes.item, this.state.active && classes.itemActiveItem)}
        onClick = {() => {this.props.myClick();}}
      >
        <ListItemIcon className={classes.itemIcon}>{this.state.icon}</ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.itemPrimary,
          }}
        >
          {this.state.id}
        </ListItemText>
      </ListItem>
    );
  }
}

export interface NavigatorProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> { activeTab: string; switchTabs: (tab: string) => void; }

export interface NavigatorState { activeTab: string; }

class Navigator extends React.Component<NavigatorProps,NavigatorState> {

  constructor(props: NavigatorProps) {
    super(props);
    this.state = {
      activeTab: props.activeTab,
    };
  }

  static getDerivedStateFromProps(props: NavigatorProps,state: NavigatorState): object {
    return {
      activeTab: props.activeTab,
    };
  }

  render(): any {
    const {classes, activeTab, switchTabs, ...other } = this.props;

    return (
      <Drawer {...other}>
        <List disablePadding>
          <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
            <img src={require('../images/logo.png')} width='144' height='75' />
          </ListItem>
          {categories.map(({ id, children }: { id: string, children: any }) => (
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
              {children.map(({ id: childId, icon }: { id: string, icon: JSX.Element }) => (
                <NavBarSubCategory id = {childId} key = {childId} active = {childId === this.state.activeTab} icon = {icon} classes = {classes} myClick = {() => {switchTabs(childId);}} />
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
