import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

    result = '';
    height = '';
    weight = '';
    bmiValue = '';
    
    inputHandler(event){
        const {name, value} = event.target;
        if(name === 'height'){
            this.height = value;
        }else if(name === 'weight'){
            this.weight = value;
        }
    };
    submitHandler(event){
        event.preventDefault();
        console.log('weight: ' + this.weight);
        console.log('height: ' + this.height);
        this.calculate();
    };
    calculate(){
        let height = Number(this.height)/100;
        let bmi = this.weight / (height*height);
        this.bmiValue = Number(bmi.toFixed(2));
        console.log('Your BMI is ' + this.bmiValue);

        // Calculating final result 
        if(this.bmiValue < 18.5)
            this.result = 'Underweight';
        else if(this.bmiValue >= 18.5 && this.bmiValue < 25)
            this.result = 'Healthy';
        else if(this.bmiValue >= 25 && this.bmiValue < 30){
            this.result = 'Overweight';
        }else{
            this.result = 'Obese';
        }
        console.log('Result: ' + this.result);
    };
    reCalculate(){
        this.result = '';
        this.height = '';
        this.weight = '';
        this.bmiValue = '';
    }
}