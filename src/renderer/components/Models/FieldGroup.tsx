import { Field } from './Field'

export interface FieldGroup {
	id: number;
	name: string;
	description: string;
	fields: Field[];
}