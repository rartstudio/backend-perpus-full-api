<template>
    <div class="h-full">
        <div class="px-4 pt-4 mt-2">
            <v-select dense solo label="Filter" :items="items" v-model="selectedFilter" class="text-body-2 select-filter"/>
            <v-select dense solo label="Kategori" :items="getCategories" v-if="selectedFilter == 'Kategori'" class="mt-n3 text-body-2 select-filter" v-model="selectedCategories"/>
            <template v-if="book.isLoading">
                <v-btn class="mt-n3 mb-4 btn-filter" block loading disabled>
                </v-btn>
            </template>
            <template v-else>
                <v-btn class="mt-n3 mb-4 btn-filter" color="#FFCB36" block @click="filterSearch" :disabled="checkFilter">
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
        <v-btn @click="prevPage">Prev</v-btn>
        <v-btn @click="nextPage">Next</v-btn>
    </div>
</template>

<script>

import store from "@/store";
import { mapGetters, mapState } from "vuex";
import SearchCard from "@/components/SearchCard.vue";
import SearchCardLoader from "@/components/SearchCardLoader.vue";
// import Pagination from 'vue-pagination-2';


export default {
    name: "books-page",
    data(){
        return {
            page: 1,
            items : [
                'Terbaru','Terlama','Kategori'
            ],
            selectedFilter : null,
            selectedCategories: null,
        }
    },
    methods: {
        nextPage(){
            let from = this.book.allBooks.meta.current_page;
            let curPage = from + 1;
            this.$router.push({name: 'books-page', query: {
                    page : curPage
            }})
        },
        prevPage(){
            let from = this.book.allBooks.meta.current_page;
            let curPage = from - 1;
            this.$router.push({name: 'books-page', query: {
                    page : curPage
            }})
        },
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
        ...mapGetters('book',['getBooks','getLinkServer','getCategories']),
        checkFilter(){
            if(this.selectedFilter == null){
                return true
            }

            if(this.selectedFilter == 'Kategori' && this.selectedCategories == null){
                return true
            }

            return false
        }
    },
    //using watch to see change from route
    watch: {
        async $route(to){
            //get query params
            let data = to.query
            if(data.page == undefined){
                await store.dispatch('book/fetchAllBooks',data).then(()=> {})
            }
            else {
                await store.dispatch('book/fetchPerPage',data).then(()=> {})
            }
            // console.log(data)
        }
    },
    async mounted(){
        let query = this.$route.query 
        await store.dispatch('book/fetchCategoriesBook').then(()=> {})          
        await store.dispatch('book/fetchPerPage',query).then(()=> {
        })
      
            // await store.dispatch('book/fetchAllBooks').then(()=> {
            // })
    },
    created(){
        this.$router.push({name: 'books-page'}).catch(err => { 
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (err.name != "NavigationDuplicated") {
        // But print any other errors to the console
            console.error(err);
        }
        })
    }
}   

</script>

<style lang="scss">
.pagination {
    display: flex;
    margin-top: 20px;
    padding-left: 0px !important;
    list-style: none;
    justify-content: space-evenly;
}
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