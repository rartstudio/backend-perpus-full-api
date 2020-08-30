<template>
  <div class="main">
    <v-text-field placeholder="Cari buku atau penulis " class="mt-4 mx-4" solo append-icon="mdi-magnify"></v-text-field>
    <CarouselBar class="mb-8 mt-n4"/>
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

<style>
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
</style>

<script>
// @ is an alias to /src
import BookCard from "@/components/BookCard.vue";
import BookCardLoader from "@/components/BookCardLoader.vue";
import TitleBook from "@/components/TitleBook.vue";
import CarouselBar from "@/components/CarouselBar.vue";

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
      console.log('success')
    })
}

export default {
  components: {
    BookCard,
    BookCardLoader,
    CarouselBar,
    TitleBook
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
