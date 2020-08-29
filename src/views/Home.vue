<template>
  <div class="main">
    <v-text-field placeholder="Cari buku atau penulis " class="mt-4 mx-4" solo append-icon="mdi-magnify"></v-text-field>
    <CarouselBar class="mb-8 mt-n4"/>
    <TitleBook>
      <template v-slot:header>
        Koleksi Buku
      </template>
      <template v-slot:icon>
        <v-icon>mdi-chevron-double-right</v-icon>
      </template>
    </TitleBook>
    <div class="collection-book d-flex">
      <BookCard v-for="book in book.books.data" :key="book.slug" :book="book"/>
    </div>
    <TitleBook>
      <template v-slot:header>
        Koleksi Buku Science
      </template>
      <template v-slot:icon>
        <v-icon>mdi-chevron-double-right</v-icon>
      </template>
    </TitleBook>
    <div class="collection-book d-flex">
      <BookCard v-for="book in book.booksByOne.data" :key="book.slug" :book="book"/>
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
  height: 360px;
  margin-top: -50px;
}
</style>

<script>
// @ is an alias to /src
import BookCard from "@/components/BookCard.vue";
import TitleBook from "@/components/TitleBook.vue";
import CarouselBar from "@/components/CarouselBar.vue";

import { mapState } from "vuex";

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
    CarouselBar,
    TitleBook
  },
  mounted () {
    getBooksBy('cat','science')
    getBooks()
  },
  computed : {
    ...mapState(['book']),
  }
};
</script>
