<template>
  <router-link class="home__link" :to="{name: 'book-show', params: {slug: book.slug}}">
    <v-flex xs12 class=" mx-2">
        <v-card
          class="mx-auto card-book"
          max-width="120"
        >
          <v-img
            :src="link(book.cover)"
            height="140px"
            width="107px"
          ></v-img>
          <div class="text-body-2 mt-2 book-title">
            <!-- {{ book.title.slice(0,30) + '...' }} -->
            {{ book.title }}
          </div>
          <div class="text-caption text--disabled d-flex align-center justify-space-between">
            <div class="d-flex align-center review__book pa-1">
              <v-icon color="#fff" size="24px">
                ri ri-check-line
              </v-icon>
              <div class="ml-1 review__number">
                <!-- {{ rating(book.reviews) }} -->
                <!-- Tersedia -->
              </div>
            </div>
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
    background-attachment: #e2e2e2;
  }
  .book-title {
    min-height: 4.2rem;
  }
  .review__book {
    background: #0a369d;
    width: 2.2rem;
    height: 1.6rem;
    border-radius: 10px;
  }
  .review__number {
    color: #fff;
    font-size: .7rem;
  }
</style>

<script>
import {bookMixin} from "@/mixins/bookMixin.js";
export default {
  mixins: [bookMixin],
  props : {
    book : Object
  }
}
</script>