<template>
        <tr > 
          <td > {{generateRandomDate()}} </td>
          <td> {{row_data.title}} </td>
          <td > {{row_data.stock}} </td>
          <td >  {{row_data.price}}</td>
        </tr>
    
</template>


<script> export default {
    name: 'Table-row',
    props: { row_data: {
        type: Object,
            default: () => {
            return {} 
            }
        },
        // generateRandomDate(){
        //     type: Function
        // },
    },
    data(){ return {
        randomDate:  null,
    }
    },
    methods: {
        // generateRandomDateCHILD() {
        //     this.generateRandomDate()
        // },
        generateRandomDate() { 
        return Math.floor((Math.random()*10)+1) + ' centember 2022'; 
        }
    },

}

</script>

<style>

</style>