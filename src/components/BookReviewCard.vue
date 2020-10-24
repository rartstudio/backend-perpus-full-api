<template>
    <div class="d-flex justify-start flex-column mb-2 py-2 mx-4">
        <div class="d-flex flex-column justify-start flex-grow-1 mb-1">
            <div class="d-flex">
                <v-icon color="#FFCB36" size="13px" v-for="star in inFive" :key="star+(Math.random()*10)">
                    mdi-star {{ star }}
                </v-icon>
                <v-icon class="icon-star" v-for="star in notFive" :key="star+(Math.random()*10)">ri ri-star-line {{star}}</v-icon>
            </div>
            <p class="text-body-1 mt-2 review__content">{{review.comment}}</p>
        </div>
        <div class="flex-grow-0 d-flex">
            <v-img width="40px" height="40px" class="rounded-circle flex-grow-0" :src="link(review.user.details.image)"></v-img>
            <div class="d-flex flex-column ml-2">
                <p class="review__name text-body-2 mb-0 review__name font-weight-medium">{{review.user.name}}</p>
                <p class="mb-0 text-caption review__time">{{review.last}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {bookMixin} from "@/mixins/bookMixin.js";
    export default {
        mixins: [bookMixin],
        name: "user-review-card",
        props : {
            review : {
                type: Object
            }
        },
        computed: {
            notFive(){
                let allStar = 5
                let leftStar = allStar - this.review.rating
                return leftStar
            },
            inFive(){
                return this.review.rating
            }
        }
    }
</script>

<style lang="scss">
.icon-star.v-icon{
    color: rgba(0, 0, 0, 0.2);
}
.review {
    &__time {
        color: #585858
    }
    &__content {
        color: #757575;
    }
    &__name {
        color: #000;
    }
}
</style>