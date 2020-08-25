<template>
  <div class="main">
    <v-text-field placeholder="Cari buku atau penulis " class="mt-4 mx-4" solo append-icon="mdi-magnify"></v-text-field>
    <CarouselBar class="mb-8 mt-n4"/>
    <div class="d-flex justify-space-between">
      <div class="mb-4 pl-4 text-h6 heading-book">
        Koleksi Buku
      </div>
      <v-btn icon>
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
    </div>
    
    <div class="collection-book d-flex">
      <BookCard v-for="book in book.books.data" :key="book.slug" :book="book"/>
    </div>
  </div>
</template>

<style>
.heading-book {
  color: #0a369d;
}
.collection-book {
  overflow-x: auto;
  overflow-y: hidden;
  height: 340px;
  margin-top: -50px;
}
</style>

<script>
// @ is an alias to /src
import BookCard from "@/components/BookCard.vue";
import CarouselBar from "@/components/CarouselBar.vue";

import { mapState } from "vuex";

import store from "@/store";

export default {
  components: {
    BookCard,
    CarouselBar
  },
  created () {
    store.dispatch('book/fetchBooks')
        .then(() => {
          console.log('success')
        })
  },
  computed : {
    ...mapState(['book']),
  }
};
</script>
