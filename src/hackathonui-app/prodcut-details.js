import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-ajax/iron-ajax.js';
import { sharedStyles } from './shared-styles.js';
class ProductDetails extends PolymerElement{
    constructor(){
        super();
        
    }
    connectedCallback(){
        super.connectedCallback();
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        //ajaxCall.url = "http://10.117.189.87:8085/bank/subgroupdetails/"+this.routeData.mainId+"/"+this.routeData.subId;
        ajaxCall.url = config.baseURL+"/bank/subgroupdetails/"+this.routeData.mainId+"/"+this.routeData.subId;
        //ajaxCall.body = {"id": this.routeData.mainId, "sub_id": this.routeData.subId }
        ajaxCall.generateRequest();
        // let ajaxCallOther = this.$.ajax;
        // ajaxCallOther.url = "http://localhost:3000/productDetails/?id="+this.routeData.mainId;
        // this.requestType = 'selectedProduct';		
        // ajaxCallOther.generateRequest();    
        this.addEventListener('click', this._loadOtherProducts);
    }
    _loadOtherProducts(){
        let ajaxOtherProduct = this.$.ajax;
        //ajaxOtherProduct.url = "http://10.117.189.87:8085/product/subgroupdetails/"+this.routeData.mainId+"/"+this.routeData.subId;
        ajaxOtherProduct.url = config.baseURL+"/bank/subgroupdetails/"+this.routeData.mainId+"/"+this.routeData.subId;
        //ajaxCall.body = {"id": this.routeData.mainId, "sub_id": this.routeData.subId }
        ajaxOtherProduct.generateRequest();
    }
    handleResponse(event, requestType){
        console.log(event);
        this.resData = event.detail.__data.response;
        this.selectedProducts = this.resData.filter((products) => {
            return products.sub_id == this.routeData.subId;
        });
        this.otherProducts = this.resData.filter((products) => {
            return products.sub_id != this.routeData.subId;
        });
        console.log("response data",this.resData);        
    }
    selectedProduct(event){
        console.log(event);
        return 
            for(let i = 0; i<this.resData.length; i++ ){
                if(this.resData[i].sub_id === this.routeData.subId){
                    return true;
                }
            }
    }
    otherProduct(){
        return this.resData.sub_id !== this.routeData.subId
    }
    handleError(event){
        this.$.messageHandle.toggle();
        this.toastMessage = "Failed to load Data";
    }
    
    static get template(){
        return html `
        ${sharedStyles}
        <h2>[[pagetitle]]!</h2>
        <paper-toast id="messageHandle" text="[[toastMessage]]" horizontal-align="center" vertical-align="middle"></paper-toast>
        <app-route
            route="{{route}}"
            pattern="/:mainId/:subId"
            data="{{routeData}}">
        </app-route>
      
        Selected Group ID: {{routeData.mainId}} -- Selected Product ID: {{routeData.subId}}
        
        <iron-ajax
            auto
            id="ajax"
            handle-as="json"
            on-response="handleResponse"
            debounce-duration="300">
        </iron-ajax>
        
        <table class="table table-striped">
            <tr>
                <td>ID</td>
                <td>Product Name</td>
                <td>Duration</td>
                <td>interest Rate</td>
                <td>Percentage</td>
            </tr>
            <template is="dom-repeat" items=[[selectedProducts]]>
                <tr>
                    <template is="dom-repeat" items=[[item.subProductDetails]]>
                        <td>{{item.subProductNameId}}</td>
                        <td>{{item.subProductName}}</td>
                        <td>{{item.subProductDuration}}</td>
                        <td>{{item.subProductInterestRate}}</td>
                        <td>{{item.subProductPercentage}}</td>
                    </template>
                    
                </td>
            </template>
        </table><br/>
        <h4>Other Products</h4>
            <ul>
                <template is="dom-repeat" items=[[otherProducts]] as="product">
                    <li>
                        <template is="dom-repeat" items=[[product.subProductDetails]]>
                            <a href="#/details/[[product.id]]/[[product.sub_id]]">{{item.subProductName}}</a>
                        </template>
                    </li>
                </template>
            </ul>
        `;
    }
    static get properties() {
        return {
          pagetitle: {
            type: String,
            value: 'Product Details page'
          }
          
        };
    }
}
customElements.define('prodcut-details', ProductDetails);