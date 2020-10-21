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
        <div class="px-4 text-center mt-4">
            <p class="text-body-2 font-italic">Hasil pencarian {{getBookPagination}} dari {{getTotal}} buku</p>
        </div>
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
            let query = this.$route.query;
            let from = this.book.allBooks.meta.current_page;
            let curPage = from + 1;
            
            if(query.sort != undefined && query.sort == 'asc') {
                this.$router.push({name: 'books-page', query :{
                    sort : 'asc',
                    page : curPage
                }});
            }
            else if(query.sort != undefined && query.sort == 'desc'){
                this.$router.push({name: 'books-page', query :{
                    sort : 'desc',
                    page : curPage
                }});
            }
            else if(query.cat != undefined){
                this.$router.push({name: 'books-page', query :{
                    cat : this.selectedCategories,
                    page : curPage
                }});
            }
            else {
                this.$router.push({name: 'books-page', query :{
                    page : curPage
                }});
            }
        },

        prevPage(){
            let query = this.$route.query;
            let from = this.book.allBooks.meta.current_page;
            let curPage = from - 1;
            
            if(query.sort != undefined && query.sort == 'asc') {
                this.$router.push({name: 'books-page', query :{
                    sort : 'asc',
                    page : curPage
                }});
            }
            else if(query.sort != undefined && query.sort == 'desc'){
                this.$router.push({name: 'books-page', query :{
                    sort : 'desc',
                    page : curPage
                }});
            }
            else if(query.cat != undefined){
                this.$router.push({name: 'books-page', query :{
                    cat : this.selectedCategories,
                    page : curPage
                }});
            }
            else {
                this.$router.push({name: 'books-page', query :{
                    page : curPage
                }});
            }
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
            if(this.selectedFilter == null) return true

            if(this.selectedFilter == 'Kategori' && this.selectedCategories == null) return true
            
            return false
        },
        getPreviousPage(){
            return this.book.allBooks.links.prev ? true : false
        },
        getNextPage(){
            return this.book.allBooks.links.next ? true : false
        },
        getPagination(){
            return this.book.allBooks.links.next != null || this.book.allBooks.links.prev != null ? true : false 
        },
        getBookPagination(){
            return this.book.allBooks.meta.to
        },
        getTotal(){
            return this.book.allBooks.meta.total
        }
    },
    //using watch to see change from route
    watch: {
        async $route(to){
            //get query params
            let data = to.query
            if(data.page == undefined) {
                await store.dispatch('book/fetchAllBooks',data).then(()=> {
                    console.log('from async $route page undefined')
                })
            }
            else  {
                await store.dispatch('book/fetchPerPage',data).then(()=> {
                    console.log('from async $route page defined')
                })
            }
        }
    },
    async mounted(){
        let query = this.$route.query 
        await store.dispatch('book/fetchCategoriesBook').then(()=> {
            console.log('from mounted categories book')
        })        
        await store.dispatch('book/fetchPerPage',query).then(()=> {
            console.log('from mounted per page')
        })
    },
    created(){
        this.$router.push({name: 'books-page'}).catch(err => { 
            // Ignore the vuex err regarding  navigating to the page they are already on.
            if (err.name != "NavigationDuplicated") {
            // But print any other errors to the console
                console.error(err);
            }
        })
        console.log('from created hook')
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