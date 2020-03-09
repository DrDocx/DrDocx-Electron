import * as React from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface DatePickerProps {
	variant: "dialog" | "inline" | "static" | undefined;
	id: string;
	label: string;
	inputRef: React.RefObject<any>
}

export interface DatePickerState { date: Date; }

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {

	constructor(props: DatePickerProps) {
		super(props);
		this.state = {
			date: new Date()
		}
	}

	getDate(): string {
		return String(this.state.date);
	}

	render(): any {
		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					variant={this.props.variant}
					margin="none"
					id={this.props.id}
					label={this.props.label}
					inputRef={this.props.inputRef}
					format="MM/dd/yyyy"
					value={this.state.date}
					onChange={(newDate: MaterialUiPickersDate) => { this.setState({ date: newDate as Date, }); }}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
		);
	}
}

export default DatePicker;