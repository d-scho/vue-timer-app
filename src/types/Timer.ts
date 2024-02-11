export type Timer = {
    id: string
    name: string
    value: number
    display: string
    interval?: number
    isRunning: boolean
    resetTimerDisabled: boolean
}

export type TimerDTO = Pick<Timer, 'id' | 'name' | 'value'>
