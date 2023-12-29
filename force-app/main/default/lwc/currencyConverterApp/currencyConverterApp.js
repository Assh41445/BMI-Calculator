import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import  CurrencyConverterAssets  from '@salesforce/resourceUrl/CurrencyConverterAssets';
export default class CurrencyConverterApp extends LightningElement {
    countryCodeList = countryCodeList;
    imageUrl=CurrencyConverterAssets +'/currencyConverterAssets/currency.svg';
    countryFrom='USD';
    countryTo='AUD';
    amount;
    result;
    error;
    
    handleChange(event)
    {
        const {name,value}=event.target;
        this[name]=value;
        console.log('Label::'+name);
        console.log('value::'+value);
    }

    convertCurrency(event){
        event.preventDefault();
        this.convert();
    }

    async convert()
    {
        console.log('in convert ');
        const API_KEY = '0d4be41e8e9969109403bfc5';
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`;
        try{
            console.log('in try block ');
            fetch(API_URL, {
                method: "GET"
            }).then((response) => response.json())
                .then(repos => {
                    console.log('ffff:::'+repos.conversion_rate);
                    this.result=(Number(this.amount) * repos.conversion_rate).toFixed(2);
                    console.log('ggggg:::'+this.result);
                });
        }
        catch(error){
            
            this.error="An error occurred. Please try again..."
            console.log(error)
          }
    }
}