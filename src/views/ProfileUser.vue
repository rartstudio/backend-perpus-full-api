<template>
    <div class="profile-container">
        <div class="user-container d-flex flex-column justify-center align-center">
            <v-img width="60px" height="60px" :src="link(getImage)" class="rounded-circle ml-2 flex-grow-0"></v-img>
            <p class="text-body-1 font-weight-semibold white--text mt-4 mb-6">{{getName}}</p>
        </div>
        <CountPlaceholder>
            <template v-slot:borrow>
                {{ getBorrow.length }}
            </template>
            <template v-slot:history>
                {{ getHistory.length }}
            </template>
            <template v-slot:total>
                {{ getTotal.length }}
            </template>
        </CountPlaceholder>
        <TitleHeader>
            <template v-slot:title>Belum</template>
            <template v-slot:subtitle> Diulas</template>
            <template v-slot:button-side>
                <v-btn text color="grey lighten-1">
                    Lihat Semua
                </v-btn>
            </template>
        </TitleHeader>
        <UserReviewCard v-for="(book,index) in user.unreview" :key="index" :book="book"/>
        <TitleHeader>
            <template v-slot:title>Ulasan </template>
            <template v-slot:subtitle>Saya</template>
            <template v-slot:button-side>
                <v-btn text color="grey lighten-1">
                    Lihat Semua
                </v-btn>
            </template>
        </TitleHeader>
        <ReviewCard v-for="(review,index) in user.review" :key="index" :review="review"/>
    </div>
</template>

<script>
import NProgress from 'nprogress'
import store from "@/store";
import {mapGetters, mapState} from "vuex";
import {bookMixin} from "@/mixins/bookMixin.js";
import CountPlaceholder from "@/components/CountPlaceholder.vue";
import TitleHeader from "@/components/TitleHeader.vue";
import UserReviewCard from "@/components/UserReviewCard.vue";
import ReviewCard from "@/components/ReviewCard.vue";

export default {
    mixins: [bookMixin],
    components : {
        CountPlaceholder,
        TitleHeader,
        UserReviewCard,
        ReviewCard
    },
    computed : {
        ...mapState(['user']),
        ...mapGetters('user',['getImage','getName','getHistory','getTotal','getBorrow'])
    },
    async mounted(){
        NProgress.start()
        await store.dispatch('user/fetchStatistic').then()
        await store.dispatch('user/fetchReview').then()
        await store.dispatch('user/fetchUnreview').then()
        NProgress.done()
    }
}
</script>

<style lang="scss">
.profile-container {
    height: 100vh;
}
.user-container {
    height: 185px;
    padding-top : 0px;
    background-color:#0a369d;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
}
.color-title {
    color: #0a369d;
}
.color-subtitle {
    color: #9191ff;
}
</style>