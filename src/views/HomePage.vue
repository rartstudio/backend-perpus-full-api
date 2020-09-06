<template>
    <div class="main">
        <!-- header -->
        <v-container class="hero-container">
            <HeaderTitle/>
            <template v-if="book.isLoading">
                <HeaderCardLoader/>
            </template>
            <template v-else>
                <div class="recommendation-book d-flex mt-0">
                    <HeaderCard v-for="recommendation in book.recommendationBooks.data" :key="recommendation.slug" :recommendation="recommendation"/>
                </div>
            </template>
        </v-container>
        <!--end of header-->

        <!--search bar-->
        <v-text-field 
            placeholder="Cari buku atau penulis" 
            class="mt-4 mx-4 search-form" 
            solo
            append-icon="mdi-magnify"/>
        <!-- end search bar -->

        <!--icon start here-->
        <HomePageIcon/>
        <!--icon end here -->
        
        <v-divider></v-divider>
        
        <!-- section bar -->
        <TitleBook>
            <template v-slot:header>
                Baru ditambahkan
            </template>
            <template v-slot:icon>
                <v-icon>mdi-chevron-double-right</v-icon>
            </template>
        </TitleBook>
        <template v-if="book.isLoading">
            <div class="collection-book d-flex mt-0 max-height-180">
                <BookCardLoader v-for="loop in book.skeletonCount" :key="loop"/>
            </div>
        </template>
        <template v-else>
            <div class="collection-book d-flex mt-0">       
                <BookCard class="card-book" v-for="book in book.booksByOne.data" :key="book.slug" :book="book"/>
            </div>
        </template>
        <!-- end of section bar -->
    </div>
</template>

<style lang="scss">
.heading-book {
    color: #0a369d;
}
.collection-book {
    overflow-x: auto;
    overflow-y: hidden;
    height: 280px;
    margin-top: -50px;
}

.recommendation-book {
    overflow-x: auto;
    overflow-y: hidden;
    height: 140px;
}

.max-height-180 {
    max-height: 180px;
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
    height: 345px;
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
import HomePageIcon from "@/components/HomePageIcon.vue";

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
    HomePageIcon,
    TitleBook,
    HeaderCard,
    HeaderCardLoader,
    HeaderTitle
  },
  mounted () {
    getBooksBy('sort','desc')
    getRecommendationBooks()
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
