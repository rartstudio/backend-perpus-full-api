<template>
  <div class="book-card">
    <BookCard msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import BookCard from "@/components/BookCard.vue";

export default {
  components: {
    BookCard
  }
};
</script>
