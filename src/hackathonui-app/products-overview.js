import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
class productsOverview extends PolymerElement {
    constructor(){
        super();
        this.data = [
            { "id": 1, 
              "title": "Sample Product 1", 
              "subproducts": [
                {"sub_id": 1, "productName":"First Group sub Product 1"},      
                {"sub_id": 2, "productName":"First Group sub Product 2"},      
                {"sub_id": 3, "productName":"First Group sub Product 3"}      
              ] 
            },
            { "id": 2, 
              "title": "Sample Product 2", 
              "subproducts": [
                {"sub_id": 1, "productName":"Second Group sub Product 1"},      
                {"sub_id": 2, "productName":"Second Group sub Product 2"},      
                {"sub_id": 3, "productName":"Second Group sub Product 3"}      
              ] 
            },
            { "id": 3, 
              "title": "Sample Product 3", 
              "subproducts": [
                {"sub_id": 1, "productName":"Third Group sub Product 1"},      
                {"sub_id": 2, "productName":"Third Group sub Product 2"},      
                {"sub_id": 3, "productName":"Third Group sub Product 3"}      
              ] 
            }
          ]
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        ajaxCall.url = "http://localhost:3000/products";
        ajaxCall.generateRequest();
    }
    handleResponse(event){
        this.data = event.detail.response;
    }
    static get template(){
        return html `

        <iron-ajax
            id="ajax"
            handle-as="json"
            on-response="handleResponse"
            debounce-duration="300">
        </iron-ajax>
        <vaadin-accordion>
            <template is="dom-repeat"  items="{{data}}" as="product">
            <vaadin-accordion-panel theme="filled"> 
                <div slot="summary">{{product.title}} - {{product.subproducts.length}}</div>
                <template is="dom-repeat" items="{{product.subproducts}}">
                    <div><a href="#/details/[[product.id]]/[[item.sub_id]]">{{item.productName}}</a></div>
                </template>  
            </vaadin-accordian-panel>
            </template>
        </vaadin-accordion>
        `
    }   
}
customElements.define('products-overview', productsOverview);
