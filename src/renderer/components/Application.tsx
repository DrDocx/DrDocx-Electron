import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Button, AppBar, Tabs, Tab } from '@material-ui/core';

import CounterContainer from '../containers/CounterContainer';

import Paperbase from './Paperbase';

interface HelloProps { compiler: string; framework: string;}

class Hello extends React.Component<HelloProps> {
	render(): any {
		return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
	}
}

const Application = () => (
	<div>
		<Paperbase />
	</div>
);

export default hot(Application);
