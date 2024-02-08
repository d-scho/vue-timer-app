<template>
    <div :class="{ darkmode: darkmodeEnabled }" class="wrapping-wrapper">
        <div class="timers">
            <div v-for="timer in timers" class="wrapper">
                <button class="edit-name" @click="makeNameEditable(timer)" :disabled="timer.nameChangeDisabled">Edit name</button>
                <button class="reset-name" @click="resetName(timer)" :disabled="timer.name.length === 0">Reset name</button>
                <input
                    class="text"
                    type="text"
                    ref="timerRefs"
                    :id="String(timer.id)"
                    v-model.lazy="timer.name"
                    @keydown.enter="confirmNameChange(timer)"
                    @focusout="confirmNameChange(timer)"
                    :readonly="timer.inputReadOnly"
                    placeholder="Issue / topic"
                >
                <button class="timer-control" @click="startTimer(timer)" :disabled="timer.startTimerDisabled">{{ timer.startOrResumeText }}</button>
                <button class="timer-control" @click="stopTimer(timer)" :disabled="timer.stopTimerDisabled">Stop timer</button>
                <button class="timer-control-reset" @click="resetTimer(timer)" :disabled="timer.resetTimerDisabled">Reset timer</button>
                <span>{{ timer.display }}</span>
            </div>
            <div class="wrapper flex-end-1250-center">
                <span>{{ timerSum }}</span>
            </div>
        </div>
        <div class="add">
            <textarea
                ref="textarea"
                rows="20"
                placeholder="Hier können Notizen gemacht werden."
                v-model="textareaContent"
                @focusout="setStoredTextareaContent(textareaContent)"
            ></textarea>
            <div class="info-bar">
                <div class="day-and-cw-info">
                    <div>{{ dayOfYear }}<sup>{{ getCountingNumberSuffix(dayOfYear) }}</sup> day of the year</div>
                    <div>Current calendar week: {{ calendarWeek }}</div>
                </div>
                <div class="mode-toggle" @click="toggleDarkmode">
                    <div class="mode-toggle-switch">
                          <svg v-if="darkmodeEnabled" class="moon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                          </svg>
                          <svg v-else class="sun" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                          </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import getCountingNumberSuffix from './methods/getCountingNumberSuffix';
import getDayOfYear from './methods/getDayOfYear';
import getCalendarWeek from './methods/getCalendarWeek';
import convertMillisecondsToReadableFormat from './methods/convertMillisecondsToReadableFormat';
import { 
    getStoredDarkmodeSetting,
    setStoredDarkmodeSetting,
    getStoredTextareaContent,
    setStoredTextareaContent,
    getStoredTimers,
    setStoredTimers,
 } from './methods/localStorageHandling';

// essential variables
const numberOfTimersWanted = 11;  // quickly set the number of timers wanted here - careful: if you select fewer than there were before, data might be lost
const timers = ref<Timer[]>([]);
const timerSum = computed(() => {
    let sum = 0;
    timers.value.forEach(timer => {
      sum += timer.value;
    });
    return convertMillisecondsToReadableFormat(sum);
});
const storedTimers = ref<StoredTimer[]>([]);

// create timer instances based on number of timer wanted
for (let i = 1; i <= numberOfTimersWanted; i++) {
    timers.value.push({
        id: i,
        name: '',
        startOrResumeText: 'Start timer',
        value: 0,
        display: '00:00:00',
        nameChangeDisabled: false,
        inputReadOnly: false,
        startTimerDisabled: false,
        stopTimerDisabled: true,
        resetTimerDisabled: true
    });
}

// fill data with stored data
storedTimers.value = getStoredTimers();
storedTimers.value.forEach(element => {
    const timer = timers.value.find(el => el.id === element.id);
    if (timer) {
        timer.name = element.name;
        timer.value = element.value;
    }
});

// TODO: Remove these properties and compute them in the template section instead
timers.value.forEach(timer => {
    // set readonly of input to true and enable the "edit name" and "reset name" buttons where a name is given
    if (timer.name.length > 0) {
        timer.inputReadOnly = true;
        timer.nameChangeDisabled = false;
    }
    // rename the "start timer" button to "resume timer" and enable resetting if there is already time saved
    if (timer.value !== 0) {
        timer.startOrResumeText = 'Resume timer';
        timer.resetTimerDisabled = false;
    }
    // initialize the displays of all timers via converting milliseconds to hh:mm:ss format
    timer.display = convertMillisecondsToReadableFormat(timer.value);
});

// template ref
const timerRefs = ref<Array<HTMLElement>|null>(null);

// darkmode handling
const darkmodeEnabled = ref(getStoredDarkmodeSetting());
function toggleDarkmode() {
    darkmodeEnabled.value = darkmodeEnabled.value ? false : true;
    setStoredDarkmodeSetting(darkmodeEnabled.value);
};

// textarea content handling
const textareaContent = ref(getStoredTextareaContent());

// day of year display
const dayOfYear = ref(getDayOfYear());

// calendar week display
const calendarWeek = ref(getCalendarWeek());

// timer handling
function startTimer(timer: Timer) {
     // swap button enables/disables and rename "start timer" button because time is running
    timer.startTimerDisabled = true;
    timer.stopTimerDisabled = false;
    timer.startOrResumeText = 'Resume timer';
    timer.resetTimerDisabled = false;

    // get currently stored time
    let storedTime = timer.value;
    // initialize a starting time
    let startingTime = Number(new Date());

    // set up an interval for the timer based on id with an executing interval of 500 milliseconds
    timer.interval = setInterval(() => {
        timer.value = Number(new Date()) - startingTime + storedTime;
        timer.display = convertMillisecondsToReadableFormat(timer.value);

        // store the value after each iteration, so the saving works even when window is closed while running
        let storedTimer = storedTimers.value.find(el => el.id === timer.id);
        if (!storedTimer) {
            storedTimer = {
              id: timer.id,
              name: timer.name,
              value: timer.value,
            };
            storedTimers.value.push(storedTimer);
        } else {
          storedTimer.value = timer.value;
        }
        setStoredTimers(storedTimers.value);
    }, 500);
};

function stopTimer(timer: Timer) {
    // swap button enables/disables
    timer.startTimerDisabled = false;
    timer.stopTimerDisabled = true;

    // clear the interval and restore it to null
    clearInterval(timer.interval);
    timer.interval = undefined;

    // save data a final time to get exact time of stop
    let storedTimer = storedTimers.value.find(el => el.id === timer.id);
    if (!storedTimer) {
        storedTimer = {
          id: timer.id,
          name: '',
          value: 0,
        };
        storedTimers.value.push(storedTimer);
    }
    storedTimer.value = timer.value;
    setStoredTimers(storedTimers.value);
};

function resetTimer(timer: Timer) {
    // swap button enables/disables
    timer.startTimerDisabled = false;
    timer.stopTimerDisabled = true;
    timer.resetTimerDisabled = true;
    
    // clear the interval and restore it to null
    clearInterval(timer.interval);
    timer.interval = undefined;

    // reset the "resume timer" button to "start timer"
    timer.startOrResumeText = 'Start timer';

    // reset the displayed value
    timer.value = 0;
    timer.display = convertMillisecondsToReadableFormat(timer.value);

    // save the reset to local storage
    let storedTimer = storedTimers.value.find(el => el.id === timer.id);
    if (!storedTimer) {
        storedTimer = {
          id: timer.id,
          name: '',
          value: 0,
        };
        storedTimers.value.push(storedTimer);
    }
    storedTimer.value = timer.value;
    setStoredTimers(storedTimers.value);
};

function makeNameEditable(timer: Timer) {
    // make the input editable and focus it via the ref which is just the id of all of the buttons
    timer.inputReadOnly = false;
    // TODO: In any cases that try to find the element like this, try to pass the element to the method instead
    if (timerRefs.value) {
      (timerRefs.value as HTMLElement[]).find(el => el.id === String(timer.id))?.focus();
    }

    // disable "edit name" and "reset name" buttons for the time being
    timer.nameChangeDisabled = true;
};

function confirmNameChange(timer: Timer) {
    // enable "edit name" and "reset name" buttons if text is put in, otherwise it can stay the same
    if (timer.name.length > 0) {
        timer.inputReadOnly = true;
    }
    timer.nameChangeDisabled = false;

    // unfocus the input via the ref which is just the id of all of the buttons
    if (timerRefs.value) {
      (timerRefs.value as HTMLElement[]).find(el => el.id === String(timer.id))?.blur();
    }

    // save the new name to local storage
    let storedTimer = storedTimers.value.find(el => el.id === timer.id);
    if (!storedTimer) {
        storedTimer = {
          id: timer.id,
          name: '',
          value: 0,
        };
        storedTimers.value.push(storedTimer);
    }
    storedTimer.name = timer.name;
    setStoredTimers(storedTimers.value);
};

function resetName(timer: Timer) {
    // reset name in view, disable "edit name" and "reset name" buttons and allow input editing
    timer.name  = '';
    timer.nameChangeDisabled = false;
    timer.inputReadOnly = false;

    // save the reset to local storage
    let storedTimer = storedTimers.value.find(el => el.id === timer.id);
    if (!storedTimer) {
        storedTimer = {
          id: timer.id,
          name: '',
          value: 0,
        };
        storedTimers.value.push(storedTimer);
    }
    storedTimer.name = timer.name;
    setStoredTimers(storedTimers.value);
};
</script>