<template>
  <b-row>
    <b-col>
      <b-card class="d-flex content-center min-vh-100">
        <b-card-body>
          <h2 v-if="wrongCred">Wrong credentials entered!. Please enter your correct details.</h2>
          <form v-on:submit.prevent="loginUser">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" name="username" id="user" v-model="username" placeholder="username">
            </div>
            <div class="form-group">
              <label for="pass">Contraseña</label>
              <input type="password" class="form-control" name="password" id="pass" placeholder="contraseña" v-model="password" >
            </div>
            <button
              class="btn btn-secondary custom_button"
              type="submit"
            >
            Login
            </button>
          </form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      wrongCred: false, // activates appropriate message if set to true
    }
  },
  methods: {
    loginUser () { // call loginUSer action
      this.$store.dispatch('loginUser', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.wrongCred = false
          // this.$router.push({path: `users`})
          this.$router.push({ path: '/dashboard' }) 
          // this.$router.push({ name: 'downloads' })
        })
      .catch(err => {
        console.log(err)
        this.wrongCred = true // if the credentials were wrong set wrongCred to true
      })
    },
  },
}
</script>
<style>
/* .form-control{
  font-size: 58pt;
} */
</style>


