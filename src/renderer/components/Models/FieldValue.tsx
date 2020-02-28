import { Field } from './Field';
import { FieldValueGroup } from './FieldValueGroup';

export interface FieldValue {
	id: number;
	field: Field;
	fieldValueGroup: FieldValueGroup;
	fieldTextValue: string;
}