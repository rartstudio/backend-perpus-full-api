<template>
  <router-link class="home__link" :to="{name: 'book-show', params: {slug: book.slug}}">
    <v-flex xs12 class=" mx-2">
        <v-card
          class="mx-auto card-book"
          max-width="120"
        >
          <v-img class="d-inline-block"
            :src="link(book.cover)"
            height="140px"
            width="107px"
          ></v-img>
          <div class="text-body-2 mt-2 book-title">
            <!-- {{ book.title.slice(0,30) + '...' }} -->
            {{ book.title }}
          </div>
          <div class="text-caption text--disabled d-flex align-center justify-space-between">
            <template v-if="book.stock.qty != 0">
                <v-chip class="d-flex justify-center align-center" color="#3285C0">
                  <v-icon color="#fff" size="24px">
                    ri ri-check-line
                  </v-icon>
                  <p class="text-caption mb-0 ml-1" style="color:white">Tersedia</p>
                </v-chip>
            </template>
            <template v-else>
              <v-chip class="d-flex justify-center align-center" color="#e31a1a">
                  <v-icon color="#fff" size="24px">
                    ri ri-indeterminate-circle-line
                  </v-icon>
                  <p class="text-caption mb-0 ml-1" style="color:white">Tersedia</p>
                </v-chip>
            </template>
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