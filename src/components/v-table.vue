<template>
    <table class="OurTable">
        <tr>
          <th v-for="item, index in MainString" :key=index > {{item }}    </th>
        </tr>
        <TableRow :row_data="row" v-for="row, index in users_data" :key="index"  />
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
          <!-- <div v-for="prod, index in users_data" :key="index" >
          </div> -->
</template>


<script> 
import  TableRow  from "./Table-row";

export default {
    name: 'v-table',
    data(){
    return {
      posts: [],
      isActive: true,
      MainString: ['Дата ', 'Название ', 'Колличество', 'Расстояние'],
      Errored: false,
      CurrentPage: 1,
    }
  },
  components: {
    TableRow
  },
  props: {
    users_data: {
          type: Array,
              default: () => {
              return []
              }
          },
  },
  methods: {
    
    generateRandomDate() { 
    return Math.floor((Math.random()*10)+1) + ' centember 2022'; 
    },
    LoadMorePages(){
      
      let from = (this.CurrentPage - 1)*5
      let to = from + 5
      this.CurrentPage += 1
      console.log(from, to);
      this.users_data.slice(from, to)
      console.log(this.users_data);
    }
  },
    computed: {
    Pages(){
      return Math.ceil(this.users_data.length/5)
    }
},
}
</script>