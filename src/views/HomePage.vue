<template>
  <div class="main">
    <v-container class="hero-container">
      <v-row>
        <v-col cols="12">
          <h2>Mau pinjam 
            <br>
            buku apa hari ini ?</h2>
        </v-col>
      </v-row>
      <v-chip
        class="ml-4 mb-4 mt-2"
        color="#e6eaf5"
        >
        Rekomendasi Kami
      </v-chip>
      <HeaderCard/>
    </v-container>
    <v-text-field placeholder="Cari buku atau penulis " class="mt-4 mx-4" solo append-icon="mdi-magnify"></v-text-field>
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

.max-height-180 {
  max-height: 180px;
}

.v-input__control {
  margin-top : -45px;
}

.container{
  padding: 0 !important
}

.hero-container {
  height: 330px;
  background-color: #0a369d;
  color: white;
  border-radius: 0 0 30px 30px;

  h2{
    padding-left: 1rem;
  }
}
</style>

<script>
// @ is an alias to /src
import BookCard from "@/components/BookCard.vue";
import BookCardLoader from "@/components/BookCardLoader.vue";
import TitleBook from "@/components/TitleBook.vue";
import HeaderCard from "@/components/HeaderCard.vue";

import { mapState } from "vuex";
import { gsap } from "gsap";

import store from "@/store";

function getBooksBy(q, v){
  const query = q;
  const value = v;

  store
    .dispatch('book/fetchBooksBy',{
      query: query,
      value : value,
    })
    .then(()=> {
      
    })
}

export default {
  components: {
    BookCard,
    BookCardLoader,
    TitleBook,
    HeaderCard,
  },
  mounted () {
    getBooksBy('sort','desc')
  },
  updated () {
    gsap.from('.card-book',{
          duration: 0.5,
          opacity: 0,
          scale: 0,
          x: 200,
          ease: 'power1',
          stagger: 0.1
    })
  },
  computed : {
    ...mapState(['book']),
  }
};
</script>
