<template>
    <div>
        <SearchCard v-for="book in book.searchResult.data" :key="book.slug" :book="book"/>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SearchCard from "@/components/SearchCard.vue";
// import SearchCardLoader from "@/components/SearchCardLoader.vue";
export default {
    components: {
        SearchCard
    },
    computed : {
        ...mapState(['book']),
    }
}
</script>

<style lang="scss" scoped>

</style>