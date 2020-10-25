<template>
    <v-flex xs12 class=" mx-2">
        <v-card
          class="mx-auto card-book"
          max-width="120"
        >
        <template v-if=book.cover> 
          <v-img class="d-inline-block image-book"
            :src="link(book.cover)"
            height="140px"
            width="107px"
          ></v-img>
        </template>
        <template v-else>
          <image-placeholder class="image-placeholder"
              :width="107"
              :height="140"
              :show-ratio="true"
              :backgroundColour="backgroundColour"
              :borderColour="borderColour"
              :font-size="12"
              :fontFamily="fontFamily"
          >Belum ada foto</image-placeholder>
        </template>
          <div class="text-body-2 mt-2 book-title">
            <!-- {{ book.title.slice(0,30) + '...' }} -->
            {{ book.title }}
          </div>
          <div class="text-caption text--disabled d-flex align-center justify-space-between">
            <slot name="custom-bar">
              <v-chip click color="red" @click.stop="deleteRecommendation(book.details.id)">
                    <v-icon color="#fff">ri ri-delete-bin-7-line</v-icon>
                </v-chip>
            </slot>
          </div>
        </v-card>
    </v-flex>
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
  .image-placeholder {
    border-radius: 9px !important;
  }
  .image-book {
    border-radius: 5px !important;
  }
</style>

<script>
import store from "@/store";
import imagePlaceholder from 'vuejs-image-placeholder'
import {bookMixin} from "@/mixins/bookMixin.js";
export default {
  mixins: [bookMixin],
  props : {
    book : Object
  },
  data() {
    return {
      borderColour: '#fff',
      backgroundColour: '#dcdee8',
      fontFamily: 'Nunito, sans-serif'
    }
  },
  methods: {
    deleteRecommendation(data){
        this.$swal.fire({
        title: 'Apakah kamu yakin akan menambah buku ini ke rekomendasi pembaca?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
        }).then((result) => {
            if (result.isConfirmed) {
                let id = {
                    book_id: data
                }
                store.dispatch('user/processAddRecommendation',id)
                .then(()=> {
                    this.$swal.fire(
                    'Sukses!',
                    'Berhasil Tambah ke Rekomendasi',
                    location.reload()    
                    )
                });
            }
        });
    }
  },
  components : {
    imagePlaceholder
  }
}
</script>