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
    <div class="d-flex justify-space-between mt-8">
      <div class="mb-4 pl-4 text-h6 heading-book">
        Koleksi Buku Science
      </div>
      <v-btn icon>
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
    </div>
    <div class="collection-book d-flex">
      <BookCard v-for="book in bookByCat.booksByCat.data" :key="book.slug" :book="book"/>
    </div>
    <div class="d-flex justify-space-between mt-8">
      <div class="mb-4 pl-4 text-h6 heading-book">
        Koleksi Buku Bisnis
      </div>
      <v-btn icon>
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
    </div>
    <div class="collection-book d-flex">
      <BookCard v-for="book in bookByCat.booksByCat.data" :key="book.slug" :book="book"/>
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

function getBookByCat(q, v){
  const query = q;
  const value = v;

  store
    .dispatch('bookByCat/fetchBooks',{
      query: query,
      value : value,
    })
    .then(()=> {
      console.log('success')
    })
}

function getBooks() {
  store
    .dispatch('book/fetchBooks')
    .then(() => {
      console.log('success')
    })
}

export default {
  components: {
    BookCard,
    CarouselBar
  },
  mounted () {
    getBookByCat('cat','science')
    getBooks()
  },
  computed : {
    ...mapState(['book','bookByCat']),
  }
};
</script>
