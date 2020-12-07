import pxHeader from './pxHeader.js';
import pxFooter from './pxFooter.js';

export default {
    name: 'Todos',
    data() {
        return {
            todos: this.$store.state.todos
        }
    },
    computed: {},
    template: `
    <ion-page>
        <px-header></px-header>
        
        <ion-content class="content">
          <ion-list>
            <ion-item v-for="todo in todos" :key="todo.id">
              <router-link :to="{ path: '/todos/edit/' + todo.id}">{{todo.name}}</router-link>
            </ion-item>
          </ion-list>
    
          <ion-fab-button class="todo-fab" @click="addTodo">
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
        </ion-content>
        
        <px-footer></px-footer>
    </ion-page>
`,
    methods: {
        editTodo() {
            this.$router.push({path: `/todos/edit/${todo.id}`});
        },
        addTodo() {
            this.$router.push({path: '/todos/add'})
        },
        increment() {
            this.$store.commit('increment')
        },
        decrement() {
            this.$store.commit('decrement')
        }
    },
    components: {
        pxHeader,
        pxFooter
    }
};
