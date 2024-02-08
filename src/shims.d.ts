declare module '*.vue';

type StoredCounter = {
	id: number;
	name: string;
	value: number;
  }
  
  type Counter = StoredCounter & {
	  startOrResumeText: string;
	  display: string;
	  interval?: number;
	  nameChangeDisabled: boolean;
	  inputReadOnly: boolean;
	  startTimerDisabled: boolean;
	  stopTimerDisabled: boolean;
	  resetTimerDisabled: boolean;
  };