
export type ScoreType = 'SS'|'Scaled Score'|'T score'|'z score'|'Percentile'|'Other';

export interface Test {
	id: number;
	name: string;
	scoreType: ScoreType;
	description: string;
}