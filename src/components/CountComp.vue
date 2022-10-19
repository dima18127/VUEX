<template>
    <h1>Counter</h1>
    <h2>{{$store.state.count}}</h2>
    <button @click="increase" >НАЖМИ НА МЕНЯ</button>
</template>
<script>
export default {
    methods: {
        increase(){
            console.log(this);
            this.$store.state.count++
        }
    }
}
</script>
<style>
</style>