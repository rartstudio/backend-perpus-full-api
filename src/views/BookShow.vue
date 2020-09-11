<template>
    <div class="book">
        <div class="d-flex justify-center align-start mt-4 pa-4">
            <div>
                <img class="book__img elevation-4" :src="link(book.data.cover)" height="200px" width="140px"> 
            </div>
            <div class="ml-4">
                <h4 class="book__title mt-4">{{book.data.title}}</h4>
                <p class="text-caption mt-2">{{book.data.author.name}}</p>
                <div>
                    <v-chip
                    outlined
                    class="text--white"
                    color="#0a369d"
                    label
                    dark
                    >
                    <v-icon left>ri ri-check-line</v-icon>
                    Tersedia
                </v-chip>
            </div>
            <!-- <div class="d-flex align-center review__book pa-1 mt-n2">
                <v-icon color="#fff" size="13px">
                    mdi-star
                </v-icon>
                <div class="ml-1 review__number">
                    {{ rating(book.data.reviews) }}
                </div>
            </div> -->
            
            <!-- <div class="align-self-start review mb-4">Review</div> -->
            <!-- <div class="align-self-start d-flex" v-for="(review, index) in book.data.reviews" :key="index">
                <div class="mr-2">
                    <v-avatar color="indigo" size="24" class="align-self-start">
                        <span class="white--text headline"></span>
                    </v-avatar>
                </div>
                <div class="d-flex flex-column align-start">
                    <div class="d-flex flex-row">    
                        <div v-for="(star,index) in rates" :key="index">
                            <v-icon color="#ebd229" size="13px">
                                mdi-star
                            </v-icon>
                        </div>
                    </div>
                    <div class="text-body-2">{{review.user.name}}</div>
                    <div class="text-caption review__comment">
                        {{ review.comment }}
                    </div>
                </div>
            </div> -->
            </div>
        </div>
        <div class="pl-4">
            <p class="font-weight-bold">Sinopsis</p>
            <p class="book__description text-body-2 mt-2">
                {{ book.data.description }}
            </p>
        </div>
        <v-footer fixed class="book__footer">
            <v-btn class="book__btn" dark color="#ca0b64">
                <v-icon>ri ri-add-line</v-icon>
                Keranjang</v-btn>
        </v-footer>
    </div>
    
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex';
export default {
    data: () => ({
        rates: 0,
    }),
    props: {
        book: {
            type: Object,
            required: true
        }
    },
    computed : {
        ...mapGetters('book',['getLinkServer'])
    },
    methods : {
        rating(data){
            var rating = 0;
            var final = 0;

            for(var i = 0; i < data.length; i++){
                rating += parseInt(data[i].rating)
            }
            
            if(rating == 0){
                final = 0;
            }
            else {
                final = Math.round(rating/data.length) 
            }

            this.rates = final;

            return final
        },
        link(data){
            // const linkImg = 'http://127.0.0.1:8000/'
            const linkImg = this.getLinkServer

            let imgUrl = data
            let sliceImgUrl = imgUrl.slice(0,5)
            
            if(sliceImgUrl === 'https'){
            return imgUrl
            }
            else {
            return linkImg+imgUrl
            }
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