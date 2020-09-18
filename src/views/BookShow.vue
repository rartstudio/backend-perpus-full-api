<template>
    <div>
        <template v-if="book.isLoading">
            <BookShowLoader/>
        </template>
        <template v-else>
            <div class="book">
                <h3 class="text-center mt-6">Detail Buku</h3>
                <div class="d-flex justify-between align-start mt-4 pa-4">
                    <div>
                        <img class="book__img elevation-4 ml-0" :src="link(book.book.cover)" height="200px" width="140px"> 
                    </div>
                    <div class="ml-4">
                        <h4 class="book__title mt-4">{{book.book.title}}</h4>
                        <p class="text-caption mt-2">{{book.book.author.name}}</p>
                        <div>
                            <ChipDefault>
                                Tersedia
                            </ChipDefault>
                        </div>
                    <!-- <div class="d-flex align-center review__book pa-1 mt-n2">
                        <v-icon color="#fff" size="13px">
                            mdi-star
                        </v-icon>
                        <div class="ml-1 review__number">
                            {{ rating(book.reviews) }}
                        </div>
                    </div> -->
                    </div>
                </div>
                <div class="pl-4">
                    <p class="font-weight-bold text-h6">Sinopsis</p>
                    <p class="book__description text-body-2 mt-2">
                        {{ book.book.description }}
                    </p>
                </div>
                <div class="pl-4">
                    <p class="text-h6 font-weight-bold">Buku lainnya</p>
                </div>
                <BookCardLayout>
                    <BookCard class="card-book" v-for="book in book.relatedBooks.data" :key="book.slug" :book="book"/>
                    <v-btn fab color="#0a369d" class="mt-11">
                        <v-icon color="#fff">ri ri-arrow-drop-right-line</v-icon>
                    </v-btn>
                </BookCardLayout>
                <v-footer fixed class="book__footer">
                    <template v-if="enabledSnackbar">
                        <Snackbar :snackbarText="text"/>
                    </template>
                    <v-btn class="book__btn" dark color="#ca0b64" @click="addToCart()">
                        <v-icon>ri ri-add-line</v-icon>
                        <span class="book__btn--text">Keranjang</span>
                    </v-btn>
                </v-footer>
            </div>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
import store from "@/store";
import {mapActions, mapState} from "vuex";
import Snackbar from "@/components/SnackBar.vue";
import ChipDefault from "@/components/ChipDefault.vue";
import BookCardLayout from "@/layout/BookCardLayout.vue";
import BookCard from "@/components/BookCard.vue";
import BookCardLoader from "@/components/BookCardLoader.vue";
import BookShowLoader from "@/components/BookShowLoader.vue";

import {bookMixin} from "@/mixins/bookMixin.js";
//import {mapGetters} from 'vuex';

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
        BookCardLoader,
        BookCardLayout,
        BookShowLoader
    },
    props: {
        slug: {
            type: String
        }
    },
    data: () => ({
        rates: 0,
        enabledSnackbar: false,
        timeout: 1500,
    }),
    created(){
        //recreate component after user clicking related book
        this.fetchBook(this.slug)
        this.scrollToTop()
    },
    mounted(){
        getBooksBy('cat',this.$store.state.book.book.categories.name)
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
        ...mapState('transaction',['text']),
        ...mapState(['book']),
        snackbarText(){
            return this.$store.state.transaction.text
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
                    this.enabledSnackbar = true
                })
        }
    }
}
</script>

<style lang="scss" scoped>
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
            color: #818181;
        }
    }
    .review {
    
        &__comment {
            color: #818181;
        }
    }
</style>