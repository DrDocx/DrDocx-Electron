import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Button, AppBar, Tabs, Tab } from '@material-ui/core';

import CounterContainer from '../containers/CounterContainer';

import Paperbase from './Paperbase';

interface HelloProps { compiler: string; framework: string; wasup: string; }

interface HelloState { wasup: string; mate: number }

class Hello extends React.Component<HelloProps,HelloState> {
	constructor(props: any){
		super(props);
		this.state = {
			wasup: props.wasup,
			mate: 4,
		}
		this.onClick = this.onClick.bind(this);
	}
	onClick(): void {
		console.log("hi");
		this.setState({wasup: 'im clicked',});
		this.render();
	}
	render(): any {
		return <button onClick = {this.onClick} >Hello from {this.props.compiler} and {this.props.framework}! Your wasup value is {this.state.wasup} </button>;
	}
}

const Application = () => (
	<div>
		<Paperbase activeTab='Patients' openDrawer = {true} />
	</div>
);

export default hot(Application);
