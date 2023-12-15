import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height='';
    weight='';
    bmiResult;
    bmiValue='';

    changeCapture(event)
    {
        const {name,value} =event.target;
        if(name === 'height')
        {
            this.height=value;
        }
        if(name === 'weight')
        {
            this.weight=value;
        }
    }

    submithandler(event)
    {
        event.preventDefault();
        let height1=Number(this.height/100);
        let bmi=this.weight/(height1*height1);
        this.bmiValue=Number(bmi.toFixed(2));
        if(this.bmiValue < 18.5)
        {
            this.bmiResult='Underweight';
        }
        else if(this.bmiValue >= 19 && this.bmiValue < 24)
        {
            this.bmiResult='Underweight';
        }
        else{
            this.bmiResult='Obese';
        }

        console.log('bmi val::'+this.bmiValue);
        console.log('bmi result::'+this.bmiResult);

    }

    recalculate(event)
    {
        this.height='';
        this.weight='';
        this.bmiResult='';
        this.bmiValue='';
    }
}