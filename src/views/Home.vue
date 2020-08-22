<template>
  <div class="main">
    <CarouselBar/>
    <div class="mb-4 pl-4 text-h4">
      Koleksi Buku
    </div>
    <BookCard v-for="book in book.books.data" :key="book.slug" :book="book"/>
  </div>
</template>

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
