<template>
    <div class="main">

        <template v-if="book.snackbarState">
            <Snackbar :snackbarText="snackbarText"/>
        </template>
        <!-- header -->
        <v-container class="hero-container">
            <HeaderTitle/>
            <template v-if="book.isLoading">
                <HeaderCardLoader/>
            </template>
            <template v-else>
                <RecommendationCardLayout>
                    <HeaderCard v-for="recommendation in book.recommendationBooks.data" :key="recommendation.slug" :recommendation="recommendation"/>
                </RecommendationCardLayout>
            </template>
        </v-container>
        <!--end of header-->

        <!--search bar-->
        <v-text-field 
            placeholder="Cari buku disini" 
            class="mt-4 mx-4 search-form" 
            solo
            v-model="search"
            append-icon="ri ri-search-line" @keyup.enter="searchBooks()"/>
        <!-- end search bar -->

        <!--icon start here-->
        <!-- <HomePageIcon/> -->
        <!--icon end here -->
        
        <v-divider></v-divider>
        
        <!-- section bar -->
        <TitleHeader>
            <template v-slot:title>Baru </template>
            <template v-slot:subtitle>ditambahkan</template>
            <template v-slot:button-side>
                <v-btn text color="grey lighten-1" @click="viewAllBooks">
                    Lihat Semua
                </v-btn>
            </template>
        </TitleHeader>
        <template v-if="book.isLoading">
            <BookCardLayout>
                <BookCardLoader v-for="loop in book.skeletonCount" :key="loop"/>
            </BookCardLayout>
        </template>
        <template v-else>
            <BookCardLayout>
                <BookCard class="card-book" v-for="book in book.booksByOne.data" :key="book.slug" :book="book"/>
            </BookCardLayout>
        </template>
        <!-- end of section bar -->
    </div>
</template>

<style lang="scss">
.heading-book {
    color: #0a369d;
}

.search-form .v-input__control {
    margin-top : -45px;
}

.container{
    padding: 0 !important
}

.header-row {
    max-width: 363px !important;
}

.header-col {
    padding-right: 0;
}

.hero-container {
    height: 385px;
    background-color: #0a369d;
    color: white;
    border-radius: 0 0 30px 30px;

    h2{
        padding-left: 1rem;
        max-width: 348px;
    }
}

i.ri {
    color: #0a369d;
    display: block;
    text-align: center;
}

.icon-text {
    text-align: center;
    color: #0a369d;
}

</style>

<script>
/* eslint-disable */
// @ is an alias to /src
import BookCard from "@/components/BookCard.vue";
import BookCardLoader from "@/components/BookCardLoader.vue";
import TitleHeader from "@/components/TitleHeader.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import HeaderCard from "@/components/HeaderCard.vue";
import HeaderCardLoader from "@/components/HeaderCardLoader.vue";
// import HomePageIcon from "@/components/HomePageIcon.vue";
import Snackbar from "@/components/SnackBar.vue";

import BookCardLayout from "@/layout/BookCardLayout.vue";
import RecommendationCardLayout from "@/layout/RecommendationCardLayout.vue";

import { mapState } from "vuex";

import store from "@/store";

function getBooksBy(q, v, m , t){
    const query = q;
    const value = v;
    const max = m;
    const take = t;

    store.dispatch('book/fetchBooksByMax',{
        query: query,
        value : value,
        max : max,
        take: take,
    }).then(()=> {})
}

function getRecommendationBooks(){
    store.dispatch('book/fetchRecommendationBooks')
        .then(()=> {})
}

export default {
    components: {
        BookCard,
        BookCardLoader,
        BookCardLayout,
        // HomePageIcon,
        Snackbar,
        TitleHeader,
        HeaderCard,
        HeaderCardLoader,
        HeaderTitle,
        RecommendationCardLayout
    },
    data(){
        return {
            search: '',
            snackbarText: 'Pencarian tidak ditemukan'
        }
    },
    mounted () {
        getBooksBy('sort','desc','max',10)
        getRecommendationBooks()
    },
    methods : {
        searchBooks(){
            this.$store.state.book.snackbarState= false
            let data = {
                query: 'name',
                value : this.search
            }
            store.dispatch('book/fetchSearchBooks',data)
                .then(()=> {
                    if(this.$store.state.book.searchResult.data.length != 0){
                        this.$router.push({ name: 'search-result', query: {name: this.search}})
                    }
                    this.$store.state.book.snackbarState= true
                })
        },
        viewAllBooks(){
            this.$router.push({name : 'books-page', query: {page: 1}});
        }
    },
    beforeDestroy(){
        this.$store.state.book.snackbarState= false
    },
    computed : {
        ...mapState(['book']),
    }
};
</script>
