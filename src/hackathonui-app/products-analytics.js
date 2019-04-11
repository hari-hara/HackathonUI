import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
class productsAnalytics extends PolymerElement {
    static get template(){
        return html `<h2>Products analytics page</h2>`
    }   
}
customElements.define('products-analytics', productsAnalytics);
