
<template>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
<!-- <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" /> -->
  
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
}
.OurTable {
  display: block;
  /* table-align: center; */
  margin: 60px auto 10px;
  font-size: 100px 30px;
  color:rgb(0, 68, 45);
  background-color: rgb(221, 221, 221);
  border: 1px solid grey;
  border-collapse: collapse;
  padding-top: 10px;
}
th {
  padding: 3px;
}
 tr, th, td {
  /* color: rgb(231, 0, 0); */
  border: 1px solid rgb(3, 3, 3)
}
#app > div > div{
  display: block;
  width: 50%;
  margin: auto;
}
.pages {
  display: flex;
  
}
.page {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  color: rgb(0, 68, 45);
  border: 2px solid rgb(0, 0, 0);
  margin-left: 10px;
  cursor: pointer;
}

</style>
