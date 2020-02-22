import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Button, AppBar, Tabs, Tab } from '@material-ui/core';

import Paperbase from './Paperbase';

const Application = () => (
	<div>
		<Paperbase activeTab='Patients' openDrawer = {true} />
	</div>
);

export default hot(Application);
