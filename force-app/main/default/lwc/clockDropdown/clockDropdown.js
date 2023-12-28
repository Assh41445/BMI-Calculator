import { LightningElement,api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api label
    @api options
    @api uniqueId
    onChangeHanlder(event)
    {
        console.log('hhh: onChangeHanlder');
        this.callParent(event.target.value)
    }

    callParent(value)
    {
        console.log('hhh: callParent');
        this.dispatchEvent(new CustomEvent('valuechange',{
            detail: {
                label:this.label,
                value:value
            }
        }));
    }

    @api
    reset(value){
        this.template.querySelector('select').value=value;
        this.callParent(value);
    }
}