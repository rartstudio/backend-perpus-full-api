<template>
    <div class="book d-flex flex-column justify-center align-center">    
        <img class="book__img elevation-4" :src="book.data.cover" height="200px" width="140px"> 
        <h4 class="book__title mt-4">{{book.data.title}}</h4>
        <p class="text-caption mt-2">{{book.data.author.name}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            book: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>