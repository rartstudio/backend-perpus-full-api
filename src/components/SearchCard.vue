<template>
    <router-link :to="{name: 'book-show', params: {slug: book.slug}}">
    <div class="pa-4">
        <v-card class="pa-4 elevation-2 mb-n5">
            <div class="d-flex">
                <template v-if="book.cover">
                    <v-img
                    :src="link(book.cover)"
                    height="140px"
                    width="107px"
                    class="flex-grow-0"
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
                        >
                        Belum ada foto
                    </image-placeholder>
                </template>
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
                    <template v-if="book.reviews.length != 0">
                        <div class="d-flex mb-3 mt-2">
                            <v-icon color="#FFCB36" size="13px" v-for="star in inFive" :key="star+(Math.random()*10)">
                                mdi-star {{ star }}
                            </v-icon>
                            <v-icon class="icon-star" v-for="star in notFive" :key="star+(Math.random()*10)">ri ri-star-line {{star}}</v-icon>
                        </div>
                    </template>
                    <template v-else>
                        <div class="d-flex mb-3 mt-2">
                            <v-icon class="icon-star" v-for="star in notFive" :key="star+(Math.random()*10)">ri ri-star-line {{star}}</v-icon>
                        </div>
                    </template>
                </div>
            </div>
        </v-card>
    </div>
    </router-link>
</template>

<script>
import imagePlaceholder from 'vuejs-image-placeholder'
import {bookMixin} from "@/mixins/bookMixin.js";
export default {
    data() {
        return {
        borderColour: '#fff',
        backgroundColour: '#dcdee8',
        fontFamily: 'Nunito, sans-serif'
        }
    },
    mixins: [bookMixin],
    props : {
        book: {
            type: Object
        }
    },
    mounted() {
        window.scrollTo(0,0);
    },
    components : {
        imagePlaceholder
    },
    computed: {
        notFive(){    
            let allStar = 5
            let leftStar = allStar - this.rating(this.book.reviews)
            return leftStar
        },
        inFive(){
            return this.rating(this.book.reviews)
        }
    }
}
</script>

<style lang="scss" scoped>
.w-50 {
    width: 50% !important;
}
</style>