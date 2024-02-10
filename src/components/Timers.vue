<script setup lang="ts">
import { ref } from 'vue';

import GenericButton from './generics/GenericButton.vue';

import { useTimers } from '@/composables/useTimers';

const {
    removeTimer,
    startTimer,
    stopTimer,
    resetTimer,
    confirmNameChange,
    resetName,
    timers,

 } = useTimers();

const timerRefs = ref<Array<HTMLElement>|null>(null);
</script>

<template>
    <TransitionGroup name="slide" tag="ul" class="timers">
        <li v-for="timer in timers" class="timer-row" :key="timer.id">
            <div class="timer">
                <div class="timer-name-wrapper">
                    <input
                        class="timer-name"
                        type="text"
                        ref="timerRefs"
                        :id="String(timer.id)"
                        v-model.lazy="timer.name"
                        @keydown.enter="confirmNameChange(timerRefs, timer)"
                        @focusout="confirmNameChange(timerRefs, timer)"
                        placeholder="Issue / topic"
                    >
                    <button
                        v-if="timer.name.length > 0"
                        class="timer-reset-name"
                        @click="resetName(timer)"
                        :disabled="timer.name.length === 0"
                    >
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                                c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                                c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                                c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                                l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                                c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                        </svg>
                    </button>
                </div>
                <GenericButton
                    v-if="!timer.isRunning"
                    @click="startTimer(timer)"
                    height="40px"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-4 -4 28 28"><path d="M3 22v-20l18 10-18 10z"/></svg>
                </GenericButton>
                <GenericButton
                    v-if="timer.isRunning"
                    @click="stopTimer(timer)"
                    height="40px"
                >
                    <svg width="22" height="22" viewBox="-16 -32 528 528" xmlns="http://www.w3.org/2000/svg">
                        <path d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"/>
                    </svg>
                </GenericButton>
                <GenericButton
                    @click="resetTimer(timer)"
                    :disabled="timer.resetTimerDisabled"
                    height="40px"
                >
                    <svg width="22" height="22" viewBox="-250 -220 2160 2160" xmlns="http://www.w3.org/2000/svg">
                        <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fill-rule="evenodd"/>
                    </svg>
                </GenericButton>
                <span class="display">{{ timer.display }}</span>
            </div>

            <GenericButton height="40px" @click="removeTimer(timer)">
                <svg width="30" height="30" viewBox="-4 -5 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 11V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </GenericButton>
        </li>
    </TransitionGroup>
</template>

<style scoped lang="scss">
.timers {
    position: relative;

    .timer-row {
        width: 100%;
        margin-bottom: .8rem;
        list-style-type: none;
        display: flex;
        align-items: center;
        height: 70px;
        gap: 1rem;

        .timer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: .8rem;
            padding: .8rem;
            border: 1px solid rgb(158, 158, 158);
            border-radius: 10px;
            background-color: rgba(120, 120, 120, 0.1);
            flex: 1;

            .timer-name-wrapper {
                position: relative;
                flex: 1;

                input.timer-name {
                    height: 40px;
                    padding-inline: 10px;
                    border-radius: 5px;
                    min-width: 150px;
                    width: 100%;
                    font-weight: bold;
                    color: var(--text-color);
                    background-color: var(--element-bg-color);
                    flex-grow: 1;

                    &::placeholder {
                        color: var(--text-color-off);
                    }
                }

                button.timer-reset-name {
                    cursor: pointer;
                    height: calc(100% - 16px);
                    width: 24px;
                    margin: 8px;
                    position: absolute;
                    top: -1px;
                    right: 0;
                    border-radius: 5px;
                    background-color: var(--element-bg-color);

                    & > svg {
                        height: 14px;
                        width: 14px;
                        display: block;
                        margin: 0 auto;
                        fill: var(--text-color);;;
                    }
                }
            }

            span.display {
                font-size: 20px;
                font-weight: bold;
                height: 39px;
                width: 110px;
                text-align: center;
                border: 2px solid black;
                padding: 6px 12px;
                border-radius: 5px;
                color: var(--text-color);
                background-color: var(--element-bg-color);
            }
        }
    }
}

.slide-move,
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-enter-from {
    opacity: 0;
    transform: scaleY(0) translateY(-70px);
}
.slide-leave-to {
    opacity: 0;
    transform: scaleY(0) translateY(70px);
}

.slide-leave-active {
    margin-block: calc((70px + 0.8rem) * -1); // you are supposed to set position: absolute here, but that didn't work
}
</style>