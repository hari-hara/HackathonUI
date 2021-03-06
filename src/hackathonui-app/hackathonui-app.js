import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import '@polymer/paper-toast/paper-toast.js';
import { sharedStyles } from './shared-styles.js';
/**
 * @customElement
 * @polymer
 */
class HackathonuiApp extends PolymerElement {
  static get template() {
    return html`
    ${sharedStyles}
      <style>
        :host {
          display: block;
        }
      </style>
      
      
      <app-location route="{{route}}" use-hash-as-path></app-location>
      <app-route
          route="{{route}}"
          pattern="/:page"
          data="{{routeData}}"
          tail="{{subroute}}">
      </app-route>
      

      
      <app-drawer-layout>
        <app-drawer slot="drawer"  class="bg-light border-right" id="sidebar-wrapper" style="background-color: #ff6200;">
          <div class="sidebar-heading"><img  class="img-thumbnail" src="../images/logo/ing-direct.png" alt="Sample logo" /></div>
          <div class="list-group list-group-flush">
            <a class="list-group-item list-group-item-action bg-light" style="background-color: #fc6617 !important; color: #fff;" href="#/overview">Overview</a>
            <a class="list-group-item list-group-item-action bg-light" style="background-color: #fc6617 !important; color: #fff;" href="#/analytics">Analytics</a>
          </div>
        </app-drawer>
        <app-header-layout>
          <app-header slot="header" style="background-color: #fc6617 !important; color: #fff;">
            <app-toolbar>
              <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
              <div main-title>ING Application</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" selected-attribute="visible">
            <products-overview name="overview"></products-overview>
            <prodcut-details name="details" route={{subroute}}></prodcut-details>
            <product-analytics name="analytics"></product-analytics>
          </iron-pages>

        </app-header-layout>
      </app-drawer-layout>

    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Hackathon UI'
      },
      page:{
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      }
    };
  }
  static get observers(){
    return ['_routeChanged(routeData.page)'];
  }
  _routeChanged(page){
    this.page = (page || ('overview'));
  }
  _pageChanged(newPage, oldpage){
   
    switch(newPage){
      case 'overview':
        import('./products-overview.js');
        break;
      case 'details':
        import('./prodcut-details.js');
        break;
      case 'analytics':
        import('./product-analytics.js');
        break;  
      default:
        this.page =  'overview'; 
        
    }
  }
}

window.customElements.define('hackathonui-app', HackathonuiApp);
