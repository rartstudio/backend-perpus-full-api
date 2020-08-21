<template>
  <router-link class="home__link" :to="{name: 'books-show', params: {id: book.slug}}">
    <v-flex xs12 class="mt-12 mx-2">
      <v-hover 
        open-delay="200"
        close-delay="200"
        v-slot:default="{hover}"
      >
        <v-card 
          color="white" 
          class="mb-12"
          :elevation="hover ? 12 : 2" 
        >
          <v-layout row class="mx-2">
            <v-flex xs5>
              <v-img
                :src="book.cover"
                height="200px"
                width="150px"
                contain
                class="mt-n8 mb-5"
              ></v-img>
              <div class="pl-2">{{ book.qty > 0 ? 'Stok Tersedia' : 'Stok Kosong'}}</div>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title class="card-book mb-n2">
                <div>
                  <div 
                    class="text-h6">
                    {{ book.title.slice(0,15) + '...' }}
                  </div>
                  <div class="caption mb-4">{{ book.categories.name }}</div>
                  <div class="text-body-2 mb-3">
                    {{ book.description.slice(0,45) + '...'}}
                  </div>
                  <div class="text-body-1">{{ book.author.name }}</div>
                </div>
              </v-card-title>
              <v-card-actions class="pa-3">
                <v-hover>
                  <v-btn icon>
                    <v-icon color="">
                      mdi-heart
                    </v-icon>
                  </v-btn>
                </v-hover>
                <v-spacer></v-spacer>
                <v-btn depressed large color="#FF940a" class="btn-borrow">Pinjam</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-hover>
      
    </v-flex>
  </router-link>
</template>

<style>
  .card-book {
    line-height: 1.4rem;
    word-break: normal;
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