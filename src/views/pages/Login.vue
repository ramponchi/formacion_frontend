<template>
  <b-card class="d-flex content-center min-vh-100">
    <b-row>
      <b-col>
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
      </b-col>
    </b-row>




  <!-- <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton color="primary" class="px-4">Login</CButton>
                  </CCol>
                  <CCol col="6" class="text-right">
                    <CButton color="link" class="px-0">Forgot password?</CButton>
                    <CButton color="link" class="d-md-none">Register now!</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <CButton
              color="primary"
              class="active mt-3"
            >
              Register Now!
            </CButton>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer> -->





  </b-card>

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
      wrongEmail: false // activates appropriate message if set to true
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

