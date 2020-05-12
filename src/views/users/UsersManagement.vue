<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
        <transition name="slide">
          <b-table style="font-family:Roboto; margin-top:10px" :items="items" :fields="fields" striped>
            <template v-slot:cell(actions)=data>
              <CIcon name="cil-justify-center"/>
              <!-- <font-awesome-icon style="margin-left:5px" :icon="icons.edit" title="Edit user" />
              <font-awesome-icon style="margin-left:5px" :icon="icons.trash" title="Delete user" />
              <font-awesome-icon style="margin-left:5px" :icon="icons.building" title="Add to company" /> -->
            </template>
          </b-table>
        </transition>
        <span v-if="items.length==0">
          <div role="alert" style="text-align:center" aria-live="polite" aria-atomic="true" class="alert alert-info">No se han encontrado resultados. Puede añadir nuevos usuarios o modificar los filtros</div>
        </span>
      </b-col>
    </b-row>

  </div>
</template>

<script>

const axios = require('axios')

export default {
  name: 'Userss',
  components: {
  },
  data () {
    return {
      fields: ['username', 'email', 'first_name', 'last_name', 'actions'],
      items: [],
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers(){
      let vm = this
      axios.get('http://127.0.0.1:8000/management/users').then(function(response){
        if (response.data.results){
          vm.items = response.data.results
        }
      }).catch(error => {
        debugger
        alert("Error")
      })
    },
  }
}
</script>
