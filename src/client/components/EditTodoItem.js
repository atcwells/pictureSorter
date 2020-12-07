export default {
    name: 'AddTodoItem',
    data() {
        return {
            todo: this.$store.state.todos.filter(todo => todo.id == this.$route.params.id)[0] || {}
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
                <ion-input :value="todo.name" ref="newTodoItem" @input="updateTodoName" :placeholder="todo.name"></ion-input>
              </ion-item>
        
              <ion-fab-button class="todo-fab" @click="updateTodo">
                <ion-icon name="checkmark"></ion-icon>
              </ion-fab-button>
        
            </ion-content>
          </ion-page>
    `,
    methods: {
        updateTodo() {
            const newTodo = this.todo;
            this.$store.commit('update_todo', newTodo);
            this.$router.push({path: '/todos'});
        },
        updateTodoName() {
            this.todo.name = this.$refs.newTodoItem.value
        }
    }
};
