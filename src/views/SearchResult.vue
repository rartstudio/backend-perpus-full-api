<template>
    <div class="h-full">
        <template v-if="book.isLoading">
            <SearchCardLoader/>
        </template>
        <template v-else>
            <SearchCard v-for="book in book.searchResult.data" :key="book.slug" :book="book"/>
        </template>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SearchCard from "@/components/SearchCard.vue";
import SearchCardLoader from "@/components/SearchCardLoader.vue";
export default {
    components: {
        SearchCard,
        SearchCardLoader
    },
    computed : {
        ...mapState(['book']),
    }
}
</script>

<style lang="scss" scoped>
.h-full {
    height: 100vh;
}
</style>