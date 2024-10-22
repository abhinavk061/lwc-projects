import { LightningElement } from 'lwc';

// Importing static resources from salesforce 
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClock extends LightningElement {

    // Creating proprty of alarm clock image 
    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png';

    // Creating audio property of ringtone 
    ringtone = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3');

    // Current time proprty
    currentTime = '';

    // Initial hour and minute values
    hours = [];
    minutes = [];
    ampm = ['AM', 'PM'];

    hourSelected = null;
    minuteSelected = null;
    meridiemSelected = null;

    // Set alarm properties
    alarmTime;
    isAlarmSet = false;

    isAlarmTriggered = false;

    // Gets called whenever a LWC gets loaded 
    connectedCallback(){

        // Fetch current time 
        this.currentTimeHandler();

        // Create dropdown values
        this.createHourOptions();
        this.createMinuteOptions();
    }

    currentTimeHandler(){

        // Calculate currentTime every second
        setInterval(() => {
            
            let dateTime = new Date();

            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let amPm = 'AM';

            if(hour === 0){
                hour = 12;
            }else if(hour === 12){
                amPm = 'PM';
            }else if(hour >= 12){
                amPm = 'PM';
                hour = hour - 12;
            }

            hour = hour < 10 ? '0'+hour : hour;
            min = min < 10 ? '0'+min : min;
            sec = sec < 10 ? '0'+sec : sec;

            this.currentTime = `${hour} : ${min} : ${sec} ${amPm}`;

            // Comparing alarm time with current time
            if(this.alarmTime === `${hour}:${min} ${amPm}`){
                this.isAlarmTriggered = true;
                this.ringtone.play();
                this.ringtone.loop = true;
            }

        }, 1000);

    }

    createHourOptions(){
        for(let i = 1; i <= 12; i++){

            let val = i < 10? '0'+i : i;
            this.hours.push(val);
        }
    };

    createMinuteOptions(){
        for(let i = 1; i <= 59; i++){

            let val = i < 10? '0'+i : i;
            this.minutes.push(val);
        }
    }

    // Listening child component 'clockDropdown'
    optionHandler(event){
        const {label, value} = event.detail;

        if(label === 'Hour(s)'){
            this.hourSelected = value;
        }else if(label === 'Minute(s)'){
            this.minuteSelected = value;
        }else if(label === 'AM / PM'){
            this.meridiemSelected = value;
        }
    };

    // If all 3 options are selected, then show submit button
    get isFieldNotSelected(){
        return !(this.hourSelected && this.minuteSelected && this.meridiemSelected);
    };

    // Set alarm
    setAlarmHandler(){
        this.isAlarmSet = true;
        this.alarmTime = `${this.hourSelected}:${this.minuteSelected} ${this.meridiemSelected}`;
    }

    // Reset alarm values 
    clearAlarmHandler(){
        this.isAlarmSet = false;
        this.alarmTime = '';
        this.hourSelected = '';
        this.minuteSelected = '';
        this.meridiemSelected = '';
        this.isAlarmTriggered = false;
        this.ringtone.pause();

        // Reset public method on all child components
        const elements = this.template.querySelectorAll('c-clock-dropdown');
        Array.from(elements).forEach(element => {

            // Calling reset method on every child component
            element.reset('');
        });
    }

    // Apply 'shake' class to the image if alarm is triggered 
    get shakeImage(){
        return this.isAlarmTriggered ? 'shake' : '';
    };

}

