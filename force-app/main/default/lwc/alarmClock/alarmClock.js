import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClock extends LightningElement {
    clockImage=AlarmClockAssets+'/AlarmClockAssets/clock.png';
    ringtone=new Audio(AlarmClockAssets+'/AlarmClockAssets/Clocksound.mp3')
    currentTime='';
    hours=[];
    minutes=[];
    ampm=['AM','PM'];
    selHour;
    selMin;
    selMeri;
    alarmTime;
    alarmSet=false;
    isAlarmTriggerd=false;

    connectedCallback()
    {
        this.currentTimeHandler();
        this.getHoursOptions();
        this.getMinutesOptions();
    }

    currentTimeHandler()
    {
        setInterval(()=>{
        let dateTime=new Date();
        let hrs=dateTime.getHours();
        let mins=dateTime.getMinutes();
        let secs=dateTime.getSeconds();
        let ampm='AM';
        if(hrs ==0)
        {
            hrs=12;
            ampm='AM';
        }
        else if(hrs === 12)
        {
            ampm='PM';
        }
        else if(hrs >12)
        {
            hrs=hrs-12;
            ampm='PM';
        }

        hrs=hrs<10? '0'+hrs:hrs;
        mins=mins<10? '0'+mins:mins;
        secs=secs<10? '0'+secs:secs;

        this.currentTime=`${hrs}:${mins}:${secs} ${ampm}`;

        if(this.alarmTime ===`${hrs}:${mins} ${ampm}`)
        {
            console.log('Alarm can be triggered !!');
            this.isAlarmTriggerd=true;
            this.ringtone.play();
            this.ringtone.loop =true;
        }

        },1000)

        
        
    }

    getHoursOptions(){
        for(let i=1;i<=12;i++)
        {
            let hrs= i<10 ? '0'+i : i;
            this.hours.push(hrs);
        }
    }

    getMinutesOptions(){
        for(let i=1;i<=59;i++)
        {
            let mins= i<10 ? '0'+i : i;
            this.minutes.push(mins);
        }
    }

    onValueChange(event)
    {
        const {label,value}=event.detail;
        if(label==='Hour(s)')
        {
            this.selHour=value;
        }
        else if(label==='Minute(s)')
        {
            this.selMin=value;
        }
        else if(label==='AM/PM')
        {
            this.selMeri=value;
        }
        else
        {

        }
        console.log('selHour:'+this.selHour);
        console.log('selMin:'+this.selMin);
        console.log('selMeri:'+this.selMeri);
    }

    setAlarm()
    {
        this.alarmTime=`${this.selHour}:${this.selMin} ${this.selMeri}`;
        this.alarmSet=true;
    }

    clearAlarm()
    {
        this.alarmSet=false;
        this.alarmTime='';
        this.isAlarmTriggerd=false;
        this.ringtone.pause();
        const elements=this.template.querySelectorAll('c-clock-dropdown');
        Array.from(elements).forEach(element=>{
            element.reset('');
        })
    }

    get shake(){
        return this.isAlarmTriggerd? 'shake':'';     
    }
}