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
        <ReviewCard v-for="(book,index) in user.statistic" :key="index" :book="book"/>
        <TitleHeader>
            <template v-slot:title>Sedang </template>
            <template v-slot:subtitle>Dipinjam</template>
            <template v-slot:button-side>
                <v-btn text color="grey lighten-1">
                    Lihat Semua
                </v-btn>
            </template>
        </TitleHeader>
        <TitleHeader>
            <template v-slot:title>Riwayat </template>
            <template v-slot:subtitle>Peminjaman</template>
            <template v-slot:button-side>
                <v-btn text color="grey lighten-1">
                    Lihat Semua
                </v-btn>
            </template>
        </TitleHeader>
        
    </div>
</template>

<script>
import store from "@/store";
import {mapGetters, mapState} from "vuex";
import {bookMixin} from "@/mixins/bookMixin.js";
import CountPlaceholder from "@/components/CountPlaceholder.vue";
import TitleHeader from "@/components/TitleHeader.vue";
import ReviewCard from "@/components/ReviewCard.vue";

export default {
    mixins: [bookMixin],
    components : {
        CountPlaceholder,
        TitleHeader,
        ReviewCard
    },
    computed : {
        ...mapState(['user']),
        ...mapGetters('user',['getImage','getName','getHistory','getTotal','getBorrow'])
    },
    mounted(){
        store.dispatch('user/fetchStatistic')
            .then(()=> {})
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