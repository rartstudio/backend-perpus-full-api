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
            <template v-if="getPagination">
                <div class="d-flex justify-center items-center mt-4">
                    <template v-if="getPreviousPage">
                        <v-btn @click="prevPage" class="mx-2" text>Prev</v-btn>
                    </template>
                    <template v-if="getNextPage">
                        <v-btn @click="nextPage" class="mx-2" text>Next</v-btn>
                    </template>
                </div>
            </template>
        </template>
        <template v-if="!book.isLoading">
            <div class="px-4 text-center mt-4">
                <p class="text-body-2 font-italic">
                    Hasil pencarian {{getBookPagination}} dari {{getTotal}} buku
                </p>
            </div>
        </template>
    </div>
</template>

<script>
import store from "@/store";
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
        },
        getPreviousPage(){
            return this.book.searchResult.links.prev ? true : false
        },
        getNextPage(){
            return this.book.searchResult.links.next ? true : false
        },
        getPagination(){
            return this.book.searchResult.links.next != null || this.book.searchResult.links.prev != null ? true : false 
        },
        getBookPagination(){
            return this.book.searchResult.meta.to
        },
        getTotal(){
            return this.book.searchResult.meta.total
        }
    },
    methods: {
        back(){
            return this.$router.push({name: 'home'});
        },
        nextPage(){
            let query = this.$route.query;
            let from = this.book.searchResult.meta.current_page;
            let curPage = from + 1;
            
            if(query.name != undefined){
                this.$router.push({name: 'search-result', query: {
                    name : query.name,
                    page: curPage
                }})
            }
        },
        prevPage(){
            let query = this.$route.query;
            let from = this.book.searchResult.meta.current_page;
            let curPage = from - 1;
            
                if(query.name != undefined){
                    this.$router.push({name: 'search-result', query: {
                        name : query.name,
                        page: curPage
                    }})
                }
        }
    },
    watch: {
        async $route(to) {
            let data = to.query;
            await store.dispatch('book/fetchSearchBooks',data).then(()=> {})
        }
    }
}
</script>

<style lang="scss" scoped>
.h-full {
    height: 100vh;
}
</style>