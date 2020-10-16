<template>
    <div class="h-full">
        <div class="px-4 mt-6">
            <v-chip @click="back">Kembali</v-chip>
            <h6 class="text-body-2 font-italic text-center mt-4">Hasil Pencarian buku dengan kata kunci : {{ querySearch }}</h6>
        </div>
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
        querySearch (){
            return this.$route.query.name
        }
    },
    methods: {
        back(){
            return this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
.h-full {
    height: 100vh;
}
</style>