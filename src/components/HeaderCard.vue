<template>
    <router-link :to="{name: 'book-show', params: {slug: recommendation.book.slug}}">
        <v-flex>
            <v-card class="d-flex">
                <v-img :src="link(recommendation.book.cover)"
                    height="110px"
                    width="90px"
                ></v-img>
                <v-card-title class="card-column__title">
                    <p class="text-caption">
                        {{ recommendation.book.title}}
                        <br>
                        <!-- {{ rating(recommendation.book.reviews) }} -->
                    </p>
                </v-card-title>
            </v-card>
        </v-flex>
    </router-link>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    props : {
        recommendation : Object
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

            return final 
        },
        link(data){
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

.v-card {
    margin-left: 18px;
}
.v-card__title{
    width: 80px;
    padding: 5px 0px 0px 5px !important;
}
</style>