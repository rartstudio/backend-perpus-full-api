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
                <template v-if="user.unreview.length != 0">
                    <v-btn text color="grey lighten-1">
                        Lihat Semua
                    </v-btn>
                </template>
            </template>
        </TitleHeader>
        <template v-if="!user.isLoading">
            <template v-if="user.unreview.length != 0">
                <UserReviewCard v-for="book in user.unreview" :key="book.book_id" :book="book"/>
            </template>
            <template v-else>
                <p class="text-center font-italic text-body-2">
                    Belum ada buku yang dipinjam
                </p>
            </template>
        </template>
        <template v-else>
            <div class="text-center">
                <v-progress-circular
                    :size="40"
                    color="primary"
                    indeterminate
                    >
                </v-progress-circular>
            </div>
        </template>
        <TitleHeader>
            <template v-slot:title>Buku</template>
            <template v-slot:subtitle> Dipinjam</template>
        </TitleHeader>
        <template v-if="!user.isLoading">
            <template v-if="user.review.length != 0">
                <BookCardLayout>
                    <BookCard class="card-book" v-for="book in user.statistic" :key="book.slug" :book="book.details"/>
                </BookCardLayout>
            </template>
            <template v-else>
                <p class="text-center font-italic">
                    Buku dipinjam belum ada
                </p>
            </template>
        </template>
        <template v-else>
            <div class="text-center">
                <v-progress-circular
                    :size="40"
                    color="primary"
                    indeterminate
                    >
                </v-progress-circular>
            </div>
        </template>
        <TitleHeader>
            <template v-slot:title>Ulasan </template>
            <template v-slot:subtitle>Saya</template>
            <template v-slot:button-side>
                 <template v-if="user.review.length != 0">
                    <v-btn text color="grey lighten-1">
                        Lihat Semua
                    </v-btn>
                </template>
            </template>
        </TitleHeader>
        <template v-if="!user.isLoading">
            <template v-if="user.review.length != 0">
                <ReviewCard v-for="review in user.review" :key="review.book_id" :review="review"/>
            </template>
            <template v-else>
                <p class="text-center font-italic">
                    Belum ada buku yang dipinjam
                </p>
            </template>
        </template>
        <template v-else>
            <div class="text-center">
                <v-progress-circular
                    :size="40"
                    color="primary"
                    indeterminate
                    >
                </v-progress-circular>
            </div>
        </template>
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
import BookCardLayout from "@/layout/BookCardLayout.vue";
import BookCard from "@/components/BookCard.vue";

export default {
    mixins: [bookMixin],
    components : {
        CountPlaceholder,
        TitleHeader,
        UserReviewCard,
        ReviewCard,
        BookCard,
        BookCardLayout
    },
    computed : {
        ...mapState(['user']),
        ...mapGetters('user',['getImage','getName','getHistory','getTotal','getBorrow'])
    },
    async mounted(){
        NProgress.start()
        await store.dispatch('user/fetchUnreview').then()
        await store.dispatch('user/fetchStatistic').then()
        await store.dispatch('user/fetchReview').then()
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