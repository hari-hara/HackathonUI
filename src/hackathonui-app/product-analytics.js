import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class ProductAnalytics extends PolymerElement{
    connectedCallback(){
        super.connectedCallback();
        
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        ajaxCall.url = "http://localhost:3000/trackers2";
        //ajaxCall.body = {"id": this.routeData.mainId, "sub_id": this.routeData.subId }
        ajaxCall.generateRequest();

                 
    }
    handleResponse(event){
        this.resData = event.detail.__data.response;

        
    }
    static get template(){
        return html `
        <h2> [[pagetitle]]!</h2>
        <iron-ajax
            auto
            id="ajax"
            handle-as="json"
            on-response="handleResponse"
            debounce-duration="300">
        </iron-ajax>
        
        `;
    }
    static get properties() {
        return {
          pagetitle: {
            type: String,
            value: 'Product Analytics'
          }
          
        };
    }
}
customElements.define('product-analytics', ProductAnalytics);