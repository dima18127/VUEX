<template>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <div class="selectMain">
        Фильтровать по  
        <select v-model="SelectedColumn" name="Filter3" label="Filter" tittle="filter" class="select">
        <option disabled >сортировка по</option>
        <option >Названию</option>
        <option >Колличеству</option>
        <option>Расстоянию</option>
    </select>
    {{Selected}}
    <select v-model="SelectedCondition" class="select" >
        <option disabled >Условие:</option>
        <option>Содержит</option>
        <option>Равно</option>
        <option>Больше</option>
        <option>Меньше</option>
    </select>
    {{SelectedCondition}}
    <textarea class="textarea" placeholder="введите текст" name="" id="" cols="30" rows="10"
    v-model="TextAreaValue" 
    @input="FilterFunc"
    ></textarea>
    <!-- <button @click="FilterFunc"> button   </button> -->
    <!-- <input v-model="TextAreaValue" type="text"> -->
    <p>{{TextAreaValue}}</p>
</div>
    
    <!-- таблица -->
    <table class="OurTable">
        <!-- первая строка таблицы -->
        <tr>  
            <th >Дата </th>
            <th @click="SortByTittle" >Название <i class="material-icons">unfold_more</i> </th>
            <th @click="SortByStock">Колличество <i class="material-icons">unfold_more</i> </th>
            <th @click="SortByPrice">Расстояние <i class="material-icons">unfold_more</i> </th>    
        </tr>
        <!-- таблица строки -->
        <TableRow :row_data="row" v-for="row, index in FilterFunc" :key="index"  />
        <!-- в случае ошибки -->
        <div v-if="Errored" class="alert alert-danger OurTable" role="alert">Ошибка в запросе к серверу API</div>
    </table>
    <!-- пагинация -->
    <container  class="pages">
        <div class="page" 
        v-for="page, index in Pages" :key="index"
        v-on:click="PageClick(page)"
        :class="{'active': page === CurrentPage}" >
        {{page}}
    </div>

    </container>

</template>


<script> 

import  TableRow  from "./Table-row";

export default {
    name: 'v-table',
    data(){
    return {
      Errored: false,
      CurrentPage: 1,
      ItemsInPage: 8,
      TextAreaValue: "",
      SelectedColumn: "",
      SelectedCondition: "",
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
    PageClick(PageNum){
        this.CurrentPage = PageNum;
    },
    
    SortByTittle() { this.users_data.sort((a,b) => a.title.localeCompare(b.title))},
    SortByStock() { this.users_data.sort((a,b) => b.stock-a.stock)},
    SortByPrice() { this.users_data.sort((a,b) => b.price-a.price)},

    },
  

    computed: {
    Pages(){
      return Math.ceil(this.users_data.length/this.ItemsInPage)
    },
    LoadMorePages(){
      let from = (this.CurrentPage - 1)*this.ItemsInPage
      let to = from + this.ItemsInPage;
      console.log(this.users_data.slice(from, to));
      return this.users_data.slice(from, to)  
    },
    FilterFunc(){  
        switch (this.SelectedColumn) {
        case "Названию": return this.LoadMorePages.filter(item => item.title.includes(this.TextAreaValue))
        case "Колличеству": if(this.SelectedCondition === "Больше") {
            return this.LoadMorePages.filter(item => item.stock > Number(this.TextAreaValue))
            } else if(this.SelectedCondition === "Меньше"){
           return this.LoadMorePages.filter(item =>  item.stock < Number(this.TextAreaValue))
            } else
            return this.LoadMorePages.filter(item =>  item.stock.toString().includes(this.TextAreaValue))
    // else if ( this.SelectedColumn==="Расстоянию")
        case "Расстоянию":
            if(this.SelectedCondition === "Больше") {
            return this.LoadMorePages.filter(item => item.price > Number(this.TextAreaValue))
            } else if(this.SelectedCondition === "Меньше"){
            return this.LoadMorePages.filter(item =>  item.price < Number(this.TextAreaValue))
            } else
             return this.LoadMorePages.filter(item => item.price.toString().includes(this.TextAreaValue))
        default: return this.LoadMorePages
        }
}
}}
</script>
<style>
.OurTable {
  display: block;
  /* table-align: center; */
  margin: 60px auto 10px;
  font-size: 100px 30px;
  color:rgb(0, 68, 45);
  background-color: rgb(189, 199, 190);
  border: 1px solid grey;
  border-collapse: collapse;
}
.selectMain {
    padding: 20px;
    display: flex;
}
.select { 
    background-color: rgb(189, 199, 190);
}
.textarea {
    height: 40px;
}
th {
  padding: 3px;
  
}
 tr, th, td {
  /* color: rgb(231, 0, 0); */
  border: 1px solid rgb(3, 3, 3) !important;
  padding: 6px;
}
.OurTable i {
    margin-left: 40px;
    cursor: pointer;
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
}
.page:hover {
cursor: pointer;
background-color: grey;
}
.active {
    background-color: rgb(189, 199, 190);
}
</style>