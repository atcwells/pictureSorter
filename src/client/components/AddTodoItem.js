export default {
    name: 'AddTodoItem',
    data() {
        return {
            name: ''
        }
    },
    computed: {},
    template: `
          <ion-page>
            <ion-header class="toolbar-md-primary">
        
              <ion-toolbar>
                <ion-title>Add Item</ion-title>
              </ion-toolbar>
        
            </ion-header>
            <ion-content class="content">
        
              <ion-item>
                <ion-input :value="name" ref="newTodoItem" @input="updateTodoName" placeholder="Todo Name"></ion-input>
              </ion-item>
        
              <ion-fab-button class="todo-fab" @click="addTodo">
                <ion-icon name="checkmark"></ion-icon>
              </ion-fab-button>
        
            </ion-content>
          </ion-page>
    `,
    methods: {
        addTodo() {
            const newTodo = {name: this.name};
            this.$store.commit('add_todo', newTodo);
            this.$router.push({path: '/todos'});
        },
        updateTodoName() {
            this.name = this.$refs.newTodoItem.value
        }
    }
};
