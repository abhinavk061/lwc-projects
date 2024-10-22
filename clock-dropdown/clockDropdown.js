import { LightningElement, api} from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api label = '';
    @api dropdownOptions = [];
    @api dropdownId = '';

    changeHandler(event){
       this.callParent(event.target.value);
    };

    callParent(value){
        this.dispatchEvent(new CustomEvent('optionhandler', {

            // This passing data property should always be 'detail'
            detail: {
                label: this.label,
                value: value
            }
        }));
    };

    // Reset the dropdown value after clicking 'clear alarm' button
    @api reset(value){

        // Get reference of the select element in HTML file
        this.template.querySelector('select').value = value;

        this.callParent(value);
    };
}