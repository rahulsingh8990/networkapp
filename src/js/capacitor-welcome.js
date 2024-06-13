import { SplashScreen } from '@capacitor/splash-screen';
import { Network } from '@capacitor/network';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    networkstatus;
    constructor() {
      super();
   
      SplashScreen.hide();
        this.callNetworkPlugin();
    }


    callNetworkPlugin() {
      console.log("***************network***************")
      Network.addListener('networkStatusChange', status => {
        console.log("***************network changed***************")
        if(status.connected){
          this.networkstatus = true
        }
        else {
          this.networkstatus = false;
        }
        const root = this.attachShadow({ mode: 'open' });
        const div  = `<div> Network Status: ${this.networkstatus? 'connected':'disconnected'}<div>` 
        root.innerHTML = div;
        console.log('Network status changed', status);

      });
    }
  },
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  },
);
