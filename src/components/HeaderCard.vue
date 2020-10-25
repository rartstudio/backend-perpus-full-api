<template>
    <router-link :to="{name: 'book-show', params: {slug: recommendation.book.slug}}">
        <v-flex>
            <v-card class="d-flex justify-start rounded-lg">
                <div class="pa-2">
                                    <v-img :src="link(recommendation.book.cover)"
                    height="110px"
                    width="90px"
                    class="rounded-lg"
                ></v-img>
                </div>
                <div class="card-column__title d-flex align-start flex-column pr-4">
                    <p class="text-body-2 mt-4 font-weight-bold card-column__text">
                        {{ recommendation.book.title}}
                    </p>
                    <span class="font-weight-bold text-caption">
                        <v-icon color="#FFCB36">mdi-star</v-icon>
                        {{ rating(recommendation.book.reviews) }}
                    </span>
                </div>
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
.card-column__title {
    width: 100px;
}
.card-column__text {
    min-height: 67px;
}
</style>