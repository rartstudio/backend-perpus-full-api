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
import {bookMixin} from "@/mixins/bookMixin.js";

export default {
    mixins: [bookMixin],
    props : {
        recommendation : {
            type: Object
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