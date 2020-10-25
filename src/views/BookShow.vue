<template>
    <div>
        <template v-if="book.isLoading">
            <BookShowLoader/>
        </template>
        <template v-else>
            <div class="book">
                <div class="d-flex justify-between align-start pa-4 mt-1">
                    <div>
                        <template v-if="book.book.cover">
                            <img class="book__img elevation-4 ml-0" :src="link(book.book.cover)" height="200px" width="140px"> 
                        </template>
                        <template v-else>
                            <image-placeholder class="image-placeholder"
                                :width="140"
                                :height="200"
                                :show-ratio="true"
                                :backgroundColour="backgroundColour"
                                :borderColour="borderColour"
                                :font-size="12"
                                :fontFamily="fontFamily"
                                    >
                                    Belum ada foto
                            </image-placeholder>
                        </template>
                    </div>
                    <div class="ml-4 d-flex flex-column justify-start">
                        <h4 class="book__title">{{book.book.title}}</h4>
                        <p class="text-caption mt-2">{{book.book.author.name}}</p>
                        <template v-if="book.book.reviews.length != 0">
                            <div class="d-flex mb-3">
                                <v-icon color="#FFCB36" size="13px" v-for="star in inFive" :key="star+(Math.random()*10)">
                                    mdi-star {{ star }}
                                </v-icon>
                                <v-icon class="icon-star" v-for="star in notFive" :key="star+(Math.random()*10)">ri ri-star-line {{star}}</v-icon>
                            </div>
                        </template>
                        <template v-else>
                            <div class="d-flex mb-3">
                                <v-icon class="icon-star" v-for="star in notFive" :key="star+(Math.random()*10)">ri ri-star-line {{star}}</v-icon>
                            </div>
                        </template>
                        <template v-if="book.book.stock.qty != 0">
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
                </div>
                <div class="px-4">
                    <p class="font-weight-bold text-h6">Sinopsis</p>
                    <p class="book__description text-body-2 mt-2" v-html="book.book.description"></p>
                </div>
                <TitleHeader>
                    <template v-slot:title>Ulasan </template>
                    <template v-slot:subtitle>Pembaca</template>
                </TitleHeader>
                <template v-if="book.book.reviews.length != 0">
                    <BookReviewCard v-for="(review,index) in book.book.reviews" :key="index" :review="review"/>
                </template>
                <template v-else>
                    <div class="pl-4">
                        <p class="review__content text-body-2">Belum ada ulasan</p>
                    </div>
                </template>
                <div class="pl-4 mt-5">
                    <p class="text-h6 font-weight-bold grey lighten-5">Buku lainnya</p>
                </div>
                <BookCardLayout>
                    <BookCard class="card-book" v-for="book in book.relatedBooks.data" :key="book.slug" :book="book"/>
                </BookCardLayout>
                <v-footer fixed class="book__footer">
                    <template v-if="enabledSnackbar">
                        <Snackbar :snackbarText="text"/>
                    </template>
                    <template v-if="book.book.stock.qty != 0">
                        <v-btn class="book__btn" color="#FFCB36" @click="addToCart()">
                            <v-icon>ri ri-add-line</v-icon>
                            <span class="book__btn--text">Keranjang</span>
                        </v-btn>
                    </template>
                    <template v-else>
                        <v-btn class="book__btn" color="#FFCB36" @click="addToCart()" disabled>
                            <v-icon>ri ri-add-line</v-icon>
                            <span class="book__btn--text">Keranjang</span>
                        </v-btn>
                    </template>
                </v-footer>
            </div>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
import imagePlaceholder from 'vuejs-image-placeholder'
import store from "@/store";
import {mapActions, mapState} from "vuex";
import Snackbar from "@/components/SnackBar.vue";
import ChipDefault from "@/components/ChipDefault.vue";
import BookCardLayout from "@/layout/BookCardLayout.vue";
import BookCard from "@/components/BookCard.vue";
import BookCardLoader from "@/components/BookCardLoader.vue";
import BookReviewCard from "@/components/BookReviewCard.vue";
import BookShowLoader from "@/components/BookShowLoader.vue";
import TitleHeader from "@/components/TitleHeader.vue";

import {bookMixin} from "@/mixins/bookMixin.js";
import 'nprogress/nprogress.css';

function getBooksBy(q, v){
  const query = q;
  const value = v;

  store.dispatch('book/fetchRelatedBooks',{
      query: query,
      value : value})
        .then(()=> {})
}

export default {
    mixins: [bookMixin],
    components : {
        Snackbar,
        ChipDefault,
        BookCard,
        BookReviewCard,
        BookCardLoader,
        BookCardLayout,
        BookShowLoader,
        imagePlaceholder,
        TitleHeader
    },
    props: {
        slug: {
            type: String
        }
    },
    data: () => ({
        rates: 0,
        timeout: 1500,
        borderColour: '#fff',
        backgroundColour: '#dcdee8',
        fontFamily: 'Nunito, sans-serif'
    }),
    created(){
        //recreate component after user clicking related book
        this.fetchBook(this.slug)
        this.scrollToTop()
        //getBooksBy('cat',this.$store.state.book.book.categories.name)
    },
    beforeDestroy(){
        this.$store.commit('transaction/SET_SNACKBAR',false)
        this.$store.commit('transaction/SET_TEXT',null)
    },
    //using watch to see change from route
    watch: {
        $route(to,from){
            //parse params to slug props
            this.slug = to.params.slug
            //dispatch
            store.dispatch("book/fetchBook",this.slug)
            .then(() => {
                this.scrollToTop()
                next()
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    computed : {
        ...mapState('transaction',['text','enabledSnackbar']),
        ...mapState(['book']),
        notFive(){    
            let allStar = 5
            let leftStar = allStar - this.rating(this.book.book.reviews)
            return leftStar
        },
        inFive(){
            return this.rating(this.book.book.reviews)
        }
    },
    methods : {
        ...mapActions('book',['fetchBook']),
        scrollToTop() {
            window.scrollTo(0,0);
        },
        addToCart(){
            let cartItem = {
                id : this.$store.state.book.book.id,
                image : this.$store.state.book.book.cover,
                title : this.$store.state.book.book.title,
                qty : 1
            }
            store.dispatch('transaction/sendToCart',cartItem)
                .then(()=> {
                })
        }
    }
}
</script>

<style lang="scss">
#nprogress .bar {
background: #FFCB36 !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
    background: #f5f5f5 !important;
}
    .book {
        color: #0a369d;

        &__footer {
            background: none !important;
        }

        &__btn {
            margin: 0 auto;

            &--text {
                margin-left: 5px;
            }
        }

        &__description {
            color: #242424;
        }
    }
    .review {
    
        &__comment {
            color: #818181;
        }
    }
</style>