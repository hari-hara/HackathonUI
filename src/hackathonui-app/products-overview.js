import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
class productsOverview extends PolymerElement {
    constructor(){
        super();
        this.data =  [
            { "id": 1, 
              "title": "Sparen", 
              "subproducts": [
                {"sub_id": 1, "productName":"Oranjespaarrekening"},      
                {"sub_id": 2, "productName":"Groeigroterrekening"},      
                {"sub_id": 3, "productName":"Spaarrekening voor Unicef"}      
              ] 
            },
            { "id": 2, 
              "title": "Payments", 
              "subproducts": [
                {"sub_id": 1, "productName":"Betaalrekening"},      
                {"sub_id": 2, "productName":"Aflossingvrij"},      
                {"sub_id": 3, "productName":"Lineair"}      
              ] 
            },
            { "id": 3, 
              "title": "SMortgage", 
              "subproducts": [
                {"sub_id": 1, "productName":"Bankspaarhypotheek"},      
                {"sub_id": 2, "productName":"Third Group sub Product 2"},      
                {"sub_id": 3, "productName":"Third Group sub Product 3"}      
              ] 
            }
          ]
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        ajaxCall.method="get";
        //ajaxCall.url = "http://10.117.189.87:8085/product/subgroupdetails";
        ajaxCall.url = config.baseURL+"/product/subgroupdetails";
        ajaxCall.generateRequest();
    }
    handleResponse(event){
        this.data2 = event.detail.response;
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
                <div slot="summary">{{product.title}} ({{product.subproducts.length}}) </div>
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
