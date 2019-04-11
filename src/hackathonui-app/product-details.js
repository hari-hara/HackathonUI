import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
class productDetails extends PolymerElement {
    static get template(){
        return html `Products details page`
    }   
}
customElements.define('product-details', productDetails);
