<template>
    <div :class="{ darkmode: darkmodeEnabled }" class="wrapping-wrapper">
        <div class="counters">
            <div v-for="counter in counters" class="wrapper">
                <button class="edit-name" @click="makeNameEditable(counter)" :disabled="counter.nameChangeDisabled">Edit name</button>
                <button class="reset-name" @click="resetName(counter)" :disabled="counter.name.length === 0">Reset name</button>
                <input
                    class="text"
                    type="text"
                    ref="counterRefs"
                    :id="String(counter.id)"
                    v-model.lazy="counter.name"
                    @keydown.enter="confirmNameChange(counter)"
                    @focusout="confirmNameChange(counter)"
                    :readonly="counter.inputReadOnly"
                    placeholder="Issue / topic"
                >
                <button class="timer-control" @click="startTimer(counter)" :disabled="counter.startTimerDisabled">{{ counter.startOrResumeText }}</button>
                <button class="timer-control" @click="stopTimer(counter)" :disabled="counter.stopTimerDisabled">Stop timer</button>
                <button class="timer-control-reset" @click="resetTimer(counter)" :disabled="counter.resetTimerDisabled">Reset timer</button>
                <span>{{ counter.display }}</span>
            </div>
            <div class="wrapper flex-end-1250-center">
                <span>{{ counterSum }}</span>
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
    getStoredCounters,
    setStoredCounters,
 } from './methods/localStorageHandling';

// essential variables
const numberOfCountersWanted = 11;  // quickly set the number of counters wanted here - careful: if you select fewer than there were before, data might be lost
const counters = ref<Counter[]>([]);
const counterSum = computed(() => {
    let sum = 0;
    counters.value.forEach(counter => {
      sum += counter.value;
    });
    return convertMillisecondsToReadableFormat(sum);
});
const storedCounters = ref<StoredCounter[]>([]);

// create counter instances based on number of counters wanted
for (let i = 1; i <= numberOfCountersWanted; i++) {
    counters.value.push({
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
storedCounters.value = getStoredCounters();
storedCounters.value.forEach(element => {
    const counter = counters.value.find(el => el.id === element.id);
    if (counter) {
        counter.name = element.name;
        counter.value = element.value;
    }
});

// TODO: Remove these properties and compute them in the template section instead
counters.value.forEach(counter => {
    // set readonly of input to true and enable the "edit name" and "reset name" buttons where a name is given
    if (counter.name.length > 0) {
        counter.inputReadOnly = true;
        counter.nameChangeDisabled = false;
    }
    // rename the "start timer" button to "resume timer" and enable resetting if there is already time saved
    if (counter.value !== 0) {
        counter.startOrResumeText = 'Resume timer';
        counter.resetTimerDisabled = false;
    }
    // initialize the displays of all counters via converting milliseconds to hh:mm:ss format
    counter.display = convertMillisecondsToReadableFormat(counter.value);
});

// template ref
const counterRefs = ref(null);

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
function startTimer(counter: Counter) {
     // swap button enables/disables and rename "start timer" button because time is running
    counter.startTimerDisabled = true;
    counter.stopTimerDisabled = false;
    counter.startOrResumeText = 'Resume timer';
    counter.resetTimerDisabled = false;

    // get currently stored time
    let storedTime = counter.value;
    // initialize a starting time
    let startingTime = Number(new Date());

    // set up an interval for the counter based on id with an executing interval of 500 milliseconds
    counter.interval = setInterval(() => {
        counter.value = Number(new Date()) - startingTime + storedTime;
        counter.display = convertMillisecondsToReadableFormat(counter.value);

        // store the value after each iteration, so the saving works even when window is closed while running
        let storedCounter = storedCounters.value.find(el => el.id === counter.id);
        if (!storedCounter) {
            storedCounter = {
              id: counter.id,
              name: counter.name,
              value: counter.value,
            };
            storedCounters.value.push(storedCounter);
        } else {
          storedCounter.value = counter.value;
        }
        setStoredCounters(storedCounters.value);
    }, 500);
};

function stopTimer(counter: Counter) {
    // swap button enables/disables
    counter.startTimerDisabled = false;
    counter.stopTimerDisabled = true;

    // clear the interval and restore it to null
    clearInterval(counter.interval);
    counter.interval = undefined;

    // save data a final time to get exact time of stop
    let storedCounter = storedCounters.value.find(el => el.id === counter.id);
    if (!storedCounter) {
        storedCounter = {
          id: counter.id,
          name: '',
          value: 0,
        };
        storedCounters.value.push(storedCounter);
    }
    storedCounter.value = counter.value;
    setStoredCounters(storedCounters.value);
};

function resetTimer(counter: Counter) {
    // swap button enables/disables
    counter.startTimerDisabled = false;
    counter.stopTimerDisabled = true;
    counter.resetTimerDisabled = true;
    
    // clear the interval and restore it to null
    clearInterval(counter.interval);
    counter.interval = undefined;

    // reset the "resume timer" button to "start timer"
    counter.startOrResumeText = 'Start timer';

    // reset the displayed value
    counter.value = 0;
    counter.display = convertMillisecondsToReadableFormat(counter.value);

    // save the reset to local storage
    let storedCounter = storedCounters.value.find(el => el.id === counter.id);
    if (!storedCounter) {
        storedCounter = {
          id: counter.id,
          name: '',
          value: 0,
        };
        storedCounters.value.push(storedCounter);
    }
    storedCounter.value = counter.value;
    setStoredCounters(storedCounters.value);
};

function makeNameEditable(counter: Counter) {
    // make the input editable and focus it via the ref which is just the id of all of the buttons
    counter.inputReadOnly = false;
    // TODO: In any cases that try to find the element like this, try to pass the element to the method instead
    if (counterRefs.value) {
      (counterRefs.value as HTMLElement[]).find(el => el.id === String(counter.id))?.focus();
    }

    // disable "edit name" and "reset name" buttons for the time being
    counter.nameChangeDisabled = true;
};

function confirmNameChange(counter: Counter) {
    // enable "edit name" and "reset name" buttons if text is put in, otherwise it can stay the same
    if (counter.name.length > 0) {
        counter.inputReadOnly = true;
    }
    counter.nameChangeDisabled = false;

    // unfocus the input via the ref which is just the id of all of the buttons
    if (counterRefs.value) {
      (counterRefs.value as HTMLElement[]).find(el => el.id === String(counter.id))?.blur();
    }

    // save the new name to local storage
    let storedCounter = storedCounters.value.find(el => el.id === counter.id);
    if (!storedCounter) {
        storedCounter = {
          id: counter.id,
          name: '',
          value: 0,
        };
        storedCounters.value.push(storedCounter);
    }
    storedCounter.name = counter.name;
    setStoredCounters(storedCounters.value);
};

function resetName(counter: Counter) {
    // reset name in view, disable "edit name" and "reset name" buttons and allow input editing
    counter.name  = '';
    counter.nameChangeDisabled = false;
    counter.inputReadOnly = false;

    // save the reset to local storage
    let storedCounter = storedCounters.value.find(el => el.id === counter.id);
    if (!storedCounter) {
        storedCounter = {
          id: counter.id,
          name: '',
          value: 0,
        };
        storedCounters.value.push(storedCounter);
    }
    storedCounter.name = counter.name;
    setStoredCounters(storedCounters.value);
};
</script>