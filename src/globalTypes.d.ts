declare module '*.vue';

type StoredTimer = {
	id: number;
	name: string;
	value: number;
  }
  
type Timer = StoredTimer & {
	startOrResumeText: string;
	display: string;
	interval?: number;
	nameChangeDisabled: boolean;
	inputReadOnly: boolean;
	startTimerDisabled: boolean;
	stopTimerDisabled: boolean;
	resetTimerDisabled: boolean;
};