<template>
    <div class="h-full">
        <div class="px-4 pt-4">
            <v-select dense solo label="Filter" :items="items" v-model="selectedFilter" class="text-body-2 select-filter"/>
            <v-select dense solo label="Kategori" :items="getCategories" v-if="selectedFilter == 'Kategori'" class="mt-n3 text-body-2 select-filter" v-model="selectedCategories"/>
            <template v-if="book.isLoading">
                <v-btn class="mt-n3 mb-4 btn-filter" block loading disabled>
                </v-btn>
            </template>
            <template v-else>
                <v-btn class="mt-n3 mb-4 btn-filter" color="#FFCB36" block @click="filterSearch">
                    <v-icon class="icon-filter mr-1">
                        ri ri-search-line
                    </v-icon>Cari
                </v-btn>
            </template>
        </div>
        <template v-if="book.isLoading">
            <SearchCardLoader/> 
        </template>
        <template v-else>
            <SearchCard v-for="book in book.allBooks.data" :key="book.slug" :book="book"/>
        </template>
    </div>
</template>

<script>
import store from "@/store";
import { mapGetters, mapState } from "vuex";
import SearchCard from "@/components/SearchCard.vue";
import SearchCardLoader from "@/components/SearchCardLoader.vue";
export default {
    name: "books-page",
    data(){
        return {
            items : [
                'Terbaru','Terlama','Kategori'
            ],
            selectedFilter : null,
            selectedCategories: null
        }
    },
    methods: {
        filterSearch(){
            if(this.selectedFilter == 'Terbaru'){
                this.$router.push({name: 'books-page', query: {
                    sort: 'desc'
                }})
            }
            if(this.selectedFilter == 'Terlama'){
                this.$router.push({name: 'books-page', query: {
                    sort: 'asc'
                }})
            }
            if(this.selectedFilter == 'Kategori' && this.selectedCategories){
                const value = this.selectedCategories
                this.$router.push({name: 'books-page', query: {
                    cat: value
                }})
            }
        }
    },
    components: {
        SearchCard,
        SearchCardLoader
    },
    computed: {
        ...mapState(['book']),
        ...mapGetters('book',['getBooks','getLinkServer','getCategories'])
    },
    //using watch to see change from route
    watch: {
        async $route(to){
            //get query params
            let data = to.query
            await store.dispatch('book/fetchAllBooks',data).then(()=> {})
        }
    },
    async mounted(){
        await store.dispatch('book/fetchAllBooks').then(()=> {})
        await store.dispatch('book/fetchCategoriesBook').then(()=> {})
    }   
}
</script>

<style lang="scss">
.btn-filter {
    height: 38px !important;
}
.icon-filter {
    font-size: 15px !important;
}
.select-filter .v-label{
    font-size : 0.9rem;
}
</style>