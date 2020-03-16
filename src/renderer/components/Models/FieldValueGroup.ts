import { FieldGroup } from './FieldGroup';
import { PatientInfo } from './Patient';
import { FieldValue } from './FieldValue';

export interface FieldValueGroup {
	id: number;
	fieldGroup: FieldGroup;
	patient: PatientInfo;
	fieldValues: FieldValue[];
}