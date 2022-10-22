
<template>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
<!-- <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" /> -->
<!-- <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet"> -->
<div id ="app" class="appe">
  <Vtable :users_data="AllPosts" />
  </div>
</template>


<script>
// import axios from "axios"
// import  CountComp  from "./components/CountComp.vue";

import {mapGetters, mapActions} from 'vuex';
import Vtable from "./components/v-table.vue"

export default {
  name: 'App',
  components: {
    Vtable
  },
  methods: {
    ...mapActions(["GET_STORE_FROM_API"]),


  },
  computed: {
    ...mapGetters(["AllPosts"]),
    Pages(){
      return Math.ceil(this.AllPosts.length/5)
    }

},
  async mounted() {
    this.GET_STORE_FROM_API()
  },
}
</script>

<style>

.appe {
  display: flex;
  flex-direction:column;
  align-items:center;
  padding: 100px;
}


</style>
