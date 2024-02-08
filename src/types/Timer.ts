export type Timer = {
	id: number;
	name: string;
	value: number;
	display: string;
	interval?: number;
	nameChangeDisabled: boolean;
	inputReadOnly: boolean;
	startTimerDisabled: boolean;
	stopTimerDisabled: boolean;
	resetTimerDisabled: boolean;
};

export type TimerDTO = Pick<Timer, 'id' | 'name' | 'value'>;