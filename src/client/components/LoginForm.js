export default {
    name: 'UserInfo',
    data() {
        return {
            greeting: 'Hello'
        }
    },
    computed: {
        count() {
            return this.$store.state.count
        }
    },
    template: `
    <form>
        <input type="text" name="username"/>
        <input type="password" name="password"/>
        <button type="submit">Login</button>
         <p>{{ count }}</p>
         <p>
           <button type="button" @click="increment">+</button>
           <button type="button" @click="decrement">-</button>
         </p>
    </form>
    `,
    methods: {
        increment() {
            this.$store.commit('increment')
        },
        decrement() {
            this.$store.commit('decrement')
        }
    }
};
