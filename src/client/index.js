/*
    Libraries
 */
import Vue from './lib/vue.esm.browser.js';
import store from './lib/Store.js';
import router from './lib/Router.js';

/*
    Components
 */
import LoginForm from './components/LoginForm.js';

/*
    Bootstrap
 */
Vue.config.ignoredElements = [/^ion-/];

new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    store,
    router,
    components: {LoginForm}
});
