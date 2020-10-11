<template>
    <router-link :to="{name: 'book-show', params: {slug: book.slug}}">
    <div class="pa-4">
        <v-card class="pa-4 elevation-2 mb-n5">
            <div class="d-flex">
                <v-img
                    :src="link(book.cover)"
                    height="140px"
                    width="107px"
                    class="flex-grow-0"
                ></v-img>
                <div class="d-flex flex-column pl-4 flex-grow-1">
                    <p class="text-subtitle-1 font-weight-bold">{{book.title}}</p>
                    <p class="text-body-2 mb-3">{{book.author.name}}</p>
                    <template v-if="book.stock.qty != 0">
                        <v-chip class="d-flex justify-center align-center w-50" color="#3285C0">
                            <v-icon color="#fff" size="24px">
                                ri ri-check-line
                            </v-icon>
                            <p class="text-caption mb-0 ml-1" style="color:white">Tersedia</p>
                        </v-chip>
                    </template>
                    <template v-else>
                        <v-chip class="d-flex justify-center align-center w-50" color="#e31a1a">
                            <v-icon color="#fff" size="24px">
                                ri ri-indeterminate-circle-line
                            </v-icon>
                            <p class="text-caption mb-0 ml-1" style="color:white">Tersedia</p>
                        </v-chip>
                    </template>
                </div>
            </div>
          
        </v-card>
    </div>
    </router-link>
</template>

<script>
import {bookMixin} from "@/mixins/bookMixin.js";
    export default {
        mixins: [bookMixin],
        props : {
            book: {
                type: Object
            }
        }
    }
</script>

<style lang="scss" scoped>
.w-50 {
    width: 50% !important;
}
</style>