Vue.createApp({
data: () => ({
    counters: {},
    numberOfCountersWanted: 11, // quickly set the number of counters wanted here - careful: if you select fewer than there were before, data might be lost
    counterData: {},
    textareaContent: '',
    darkmodeEnabled: false
}),
computed: {
    doy: () => {
        let currentDate = new Date(); // current timestamp
        let firstDayCurrentYear = new Date(currentDate.getFullYear(), 0, 1) // current year at month 0 (= jan) and day 1 (= 1st)
        let fullDaysPassed = Math.floor((currentDate - firstDayCurrentYear) / (1000 * 60 * 60 * 24 ));
        let dayOfYear = fullDaysPassed + 1; // + 1 because the present day which is not completed counts towards it, too
        return dayOfYear;
    },
    cw: () => {

        let currentDate = new Date(); // current timestamp | 3-9 = 1 | 10-16 = 2
        let firstDayCurrentYear = new Date(currentDate.getFullYear(), 0, 1) // year taken from currentDate at month 0 (= jan) and day 1 (= 1st)

        // get the first Monday starting from Jan 1 of the current year
        let firstMonday = () => {
            let dayOfYear = 1;
            let iteration = new Date(currentDate.getFullYear(), 0, dayOfYear);
            while (iteration.getUTCDay() !== 0) {
                dayOfYear++;
                iteration = new Date(currentDate.getFullYear(), 0, dayOfYear);
            }
            let firstMonday = Math.floor(((iteration - firstDayCurrentYear) / (1000 * 60 * 60 * 24))) + 1; // + 1 because we start at day one, e.g. Jan 1st - Jan 1st would be 0, not 1
            return firstMonday
        }
        
        let fullDaysPassed = Math.floor((currentDate - firstDayCurrentYear) / (1000 * 60 * 60 * 24 )); // division makes days from milliseconds
        let dayOfYear = fullDaysPassed + 1; // + 1 because the present day, which is not completed, counts towards it, too
        let weekNumber = Math.ceil(( dayOfYear - ( firstMonday() - 1 ) ) / 7) // fix the offset caused by the monday not being the first, e.g. firstMonday = 3 needs an offset by 2, because we start at Jan 1st, not Oth
        return weekNumber !== 0 ? weekNumber : 52 // if the weekNumber is 0, it is the 52nd week of the prior year
    },
    counterSum: function() {
        let sum = 0;
        for (counter in this.counters) {
            sum += this.counters[counter].value;
        }
        return this.convertMillisecondsToReadableFormat(sum);
    },
},
mounted() {

    this.getModeSetting();
    this.getTextarea();

    // create counter instances as properties of this.counters based on number of counters wanted
    for (let i = 1; i <= this.numberOfCountersWanted; i++) {
        this.counters[`counter${i}`] = {
            id: `counter${i}`,
            name: '',
            startOrResumeText: 'Start Timer',
            value: 0,
            display: '00:00:00',
            interval: null,
            nameChangeDisabled: true,
            inputReadOnly: false,
            startTimerDisabled: false,
            stopTimerDisabled: true,
            resetTimerDisabled: true
        }
    }

    // if counterData exists, take its properties - otherwhise its an empty object
    this.counterData = localStorage.getItem('counterData') ? JSON.parse(localStorage.getItem('counterData')) : this.counterData;

    // create a dynamic counterData template object based on how many counters there are in the data() method of Vue
    let counterDataTemplate = {}
    for (let key in this.counters) {
        counterDataTemplate[key] = { name: '', value: 0 }
    }

    // merge the template with existing data
    for (let key in counterDataTemplate) {
        if (this.counterData[key]) {
            counterDataTemplate[key].name = this.counterData[key].name;
            counterDataTemplate[key].value = this.counterData[key].value;
        }
    }

    // make the edited template the new actual data and save it to local storage
    this.counterData = counterDataTemplate;
    localStorage.setItem('counterData', JSON.stringify(this.counterData))

    // iterate over keys in now-stored local storage object to get a copy into this.counters for the view 
    for (let key in this.counterData) {
        // assign its property values to corresponding counter object's properties
        this.counters[key].name = this.counterData[key].name;
        this.counters[key].value = this.counterData[key].value;
        // set readonly of input to true and enable the "edit name" and "reset name" buttons where a name is given
        if (this.counters[key].name.length > 0) {
            this.counters[key].inputReadOnly = true;
            this.counters[key].nameChangeDisabled = false;
        }
        // rename the "start timer" button to "resume timer" and enable resetting if there is already time saved
        if (this.counters[key].value !== 0) {
            this.counters[key].startOrResumeText = 'Resume Timer';
            this.counters[key].resetTimerDisabled = false;
        }
    }

    // initialize the displays of all counters via converting milliseconds to hh:mm:ss format
    for (let key in this.counters) {
        this.counters[key].display = this.convertMillisecondsToReadableFormat(this.counters[key].value)
    }
},
methods: {
    convertMillisecondsToReadableFormat(number) {
        number = number / 1000
        let hours = Math.floor(number / 3600);
        hours = hours < 10 ? '0' + hours : hours;
        let minutes = number % 3600;
        minutes = Math.floor(minutes / 60);
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        let seconds = Math.floor(number % 60);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return `${hours}:${minutes}:${seconds}`
    },
    startTimer() {
        // get id off of clicked button
        let id = event.target.id;

        // swap button enables/disables and rename "start timer" button because time is running
        this.counters[id].startTimerDisabled = true;
        this.counters[id].stopTimerDisabled = false;
        this.counters[id].startOrResumeText = 'Resume Timer';
        this.counters[id].resetTimerDisabled = false;

        // get currently stored time
        let storedTime = this.counters[id].value;
        // initialize a starting time
        let startingTime = new Date();

        // set up an interval for the counter based on id with an executing interval of 500 milliseconds
        this.counters[id].interval = setInterval(() => {
            this.counters[id].value = new Date() - startingTime + storedTime;
            this.counters[id].display = this.convertMillisecondsToReadableFormat(this.counters[id].value);

            // store the value after each iteration, so the saving works even when window is closed while running
            this.counterData[id]['value'] = this.counters[id].value;
            localStorage.setItem('counterData', JSON.stringify(this.counterData))
        }, 500);
    },
    stopTimer() {
        // get id off of clicked button
        let id = event.target.id;

        // swap button enables/disables
        this.counters[id].startTimerDisabled = false;
        this.counters[id].stopTimerDisabled = true;

        // clear the interval and restore it to null
        clearInterval(this.counters[id].interval);
        this.counters[id].interval = null;

        // save data a final time to get exact time of stop
        this.counterData[id]['value'] = this.counters[id].value;
        localStorage.setItem('counterData', JSON.stringify(this.counterData))
    },
    resetTimer() {
        // get id off of clicked button
        let id = event.target.id;

        // swap button enables/disables
        this.counters[id].startTimerDisabled = false;
        this.counters[id].stopTimerDisabled = true;
        this.counters[id].resetTimerDisabled = true;
        
        // clear the interval and restore it to null
        clearInterval(this.counters[id].interval);
        this.counters[id].interval = null;

        // reset the "resume timer" button to "start timer"
        this.counters[id].startOrResumeText = 'Start Timer';

        // reset the displayed value
        this.counters[id].value = 0;
        this.counters[id].display = this.convertMillisecondsToReadableFormat(this.counters[id].value);

        // save the reset to local storage
        this.counterData[id]['value'] = this.counters[id].value;
        localStorage.setItem('counterData', JSON.stringify(this.counterData))
    },
    makeNameEditable() {
        // get id off of clicked button
        let id = event.target.id;

        // make the input editable and focus it via the ref which is just the id of all of the buttons
        this.counters[id].inputReadOnly = false;
        this.$refs[id][0].focus();

        // disable "edit name" and "reset name" buttons for the time being
        this.counters[id].nameChangeDisabled = true;
    },
    confirmNameChange() {
        // get id off of input id
        let id = event.target.id;

        // enable "edit name" and "reset name" buttons if text is put in, otherwise it can stay the same
        if (this.counters[id].name.length > 0) {
            this.counters[id].nameChangeDisabled = false;
            this.counters[id].inputReadOnly = true;
        }

        // unfocus the input via the ref which is just the id of all of the buttons
        this.$refs[id][0].blur();

        // save the new name to local storage
        this.counterData[id]['name'] = this.counters[id].name;
        localStorage.setItem('counterData', JSON.stringify(this.counterData))
    },
    resetName() {
        // get id off of clicked button
        let id = event.target.id;

        // reset name in view, disable "edit name" and "reset name" buttons and allow input editing
        this.counters[id].name  = '';
        this.counters[id].nameChangeDisabled  = true;
        this.counters[id].inputReadOnly = false;

        // save the reset to local storage
        this.counterData[id]['name'] = this.counters[id].name;
        localStorage.setItem('counterData', JSON.stringify(this.counterData))
    },
    getTextarea() {
        this.textareaContent = localStorage.getItem('counterDataTextarea') ? localStorage.getItem('counterDataTextarea') : '';
    },
    setTextarea() {
        this.textareaContent !== '' ? localStorage.setItem('counterDataTextarea', this.textareaContent) : localStorage.removeItem('counterDataTextarea');
    },
    toggleMode() {
        this.darkmodeEnabled = this.darkmodeEnabled ? false : true;
        this.setModeSetting();
    },
    getModeSetting() {
            if (localStorage.getItem('darkmodeEnabled')) {

            if (localStorage.getItem('darkmodeEnabled') === 'true') {
                this.darkmodeEnabled = true;
            }
            // else is false by default

            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.darkmodeEnabled = true;
            }

        this.setModeSetting();
    },
    setModeSetting() {
        this.darkmodeEnabled ? localStorage.setItem('darkmodeEnabled', 'true') : localStorage.setItem('darkmodeEnabled', 'false');
    }
}
}).mount('#app')