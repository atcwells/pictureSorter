import Vue from './vue.esm.browser.js';
import Vuex from "./vuex.esm.browser.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        todos: [{
            id: 1,
            name: 'wash up'
        }, {
            id: 2,
            name: "Make awesome applications"
        }]
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--,
        add_todo: (state, payload) => state.todos.push({
            name: payload.name,
            id: state.todos.length + 1
        }),
        update_todo: (state, payload) => state.todos.filter(todo => todo.id == payload.id)[0].name = payload.name
    }
});