
<template>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
<!-- <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" /> -->
  
<div id ="app" class="appe">
  <count-comp></count-comp>
      <table class="OurTable">
        <tr>
          <th v-for="item, index in MainString" :key=index > {{item }}    </th>
        </tr>
        <tr  v-for="product, index of LoadMorePages" :key="index">
          <td > {{generateRandomDate()}} </td>
          <td> {{product.title}} </td>
          <td > {{product.stock}} </td>
          <td >  {{product.price}}</td>
        </tr>
        <div ></div>
        <tr >
        </tr>
        <div v-if="Errored" class="alert alert-danger OurTable" role="alert">
          Ошибка в запросе к серверу API
        </div>
      </table>
          <container  class="pages">
            <div v-on:click="LoadMorePages" class="page" v-for="page, index in Pages" :key="index">
              {{page}}
            </div>

          </container>

          <div v-for="prod, index in info" :key="index" >
            {{prod}}
          </div>
      
  </div>
</template>


<script>
import axios from "axios"
import  CountComp  from "./components/CountComp.vue";
export default {
  name: 'App',
  data(){
    return {
      info: [],
      isActive: true,
      MainString: ['Дата ', 'Название ', 'Колличество', 'Расстояние'],
      Errored: false,
      CurrentPage: 1,
    }
  },
  components: {
    CountComp
  },
  methods: {
    generateRandomDate() { 
    return Math.floor((Math.random()*10)+1) + ' centember 2022'; 
    },
    LoadMorePages(){
      
      let from = (this.CurrentPage - 1)*5
      let to = from + 5
      this.CurrentPage += 1
      console.log(typeof(this.info.slice(from, to)));
      this.info.slice(from, to)
      console.log(this.info);
    }
  },

  mounted() {
    axios
      .get('https://dummyjson.com/products?_limit=13')
      .then(response => (this.info = response.data.products))
      .catch(() => {
        this.Errored = true
      });
  },
  // кол-во страниц
  computed: {
    Pages(){
      return Math.ceil(this.info.length/5)
    }
  }
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
