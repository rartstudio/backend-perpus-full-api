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
            placeholder="Cari buku atau penulis" 
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
        <TitleBook>
            <template v-slot:header>
                Baru ditambahkan
            </template>
        </TitleBook>
        <template v-if="book.isLoading">
            <BookCardLayout>
                <BookCardLoader v-for="loop in book.skeletonCount" :key="loop"/>
            </BookCardLayout>
        </template>
        <template v-else>
            <BookCardLayout>
                <BookCard class="card-book" v-for="book in book.booksByOne.data" :key="book.slug" :book="book"/>
                <v-btn fab color="#0a369d" class="mt-11">
                    <v-icon color="#fff">ri ri-arrow-drop-right-line</v-icon>
                </v-btn>
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
import TitleBook from "@/components/TitleBook.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import HeaderCard from "@/components/HeaderCard.vue";
import HeaderCardLoader from "@/components/HeaderCardLoader.vue";
// import HomePageIcon from "@/components/HomePageIcon.vue";
import Snackbar from "@/components/SnackBar.vue";

import BookCardLayout from "@/layout/BookCardLayout.vue";
import RecommendationCardLayout from "@/layout/RecommendationCardLayout.vue";

import { mapState } from "vuex";
// import { gsap } from "gsap";

import store from "@/store";

function getBooksBy(q, v){
  const query = q;
  const value = v;

  store.dispatch('book/fetchBooksBy',{
      query: query,
      value : value})
        .then(()=> {})
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
    TitleBook,
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
    getBooksBy('sort','desc')
    getRecommendationBooks()
  },
  methods : {
    searchBooks(){
        this.$store.state.book.snackbarState= false
        store.dispatch('book/fetchSearchBooks',{
            query: 'name',
            value : this.search})
            .then(()=> {
                if(this.$store.state.book.searchResult.data.length != 0){
                    this.$router.push({ name: 'search-result', query: {name: this.search}})
                }
                this.$store.state.book.snackbarState= true
            })
    }
  },
  beforeDestroy(){
      this.$store.state.book.snackbarState= false
  },
  updated () {
    // gsap.from('.card-book',{
    //       duration: 0.5,
    //       opacity: 0,
    //       scale: 0,
    //       x: 200,
    //       ease: 'power1',
    //       stagger: 0.1
    // })
  },
  computed : {
    ...mapState(['book']),
  }
};
</script>
