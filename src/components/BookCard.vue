<template>
  <router-link class="home__link" :to="{name: 'books-show', params: {id: book.slug}}">
    <v-flex xs12 class="mt-12 mx-2">
        <v-card
          class="mx-auto card-book"
          max-width="120"
        >
          <v-img
            :src="book.cover"
            height="180px"
            width="180px"
          ></v-img>

          <div class="text-body-2 mt-2">
            {{ book.title.slice(0,30) + '...' }}
            <!-- {{ book.title }} -->
          </div>

          <div class="text-caption text--disabled">
            {{ book.author.name }}
          </div>
        </v-card>
    </v-flex>
  </router-link>
</template>

<style>
  .card-book {
    line-height: 1.4rem;
    word-break: normal;
    box-shadow: none !important;
  }
  .btn-borrow {
    color: #00005e !important;
  }
</style>

<script>
  export default {
    data: () => ({
      show: false,
    }),
    props : {
      book : Object
    }
  }
</script>