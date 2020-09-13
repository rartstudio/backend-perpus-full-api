<template>
    <div class="mt-10 mb-15">
        <p class="text-center font-weight-bold header__cart mb-10 text-h6">List Buku yang akan dipinjam</p>
        <template v-if="getCartLength != 0">
            <ShoppingCartCard v-for="item in cart" :key="item.id" :cart="item"/>
        </template>
        <template v-else>
            <div class="text-center mt-50">
                <img src="../assets/cart-empty.svg" alt="" width="280px" />
                <p class="font-weight-bold">Maaf Keranjang peminjaman masih kosong</p>
            </div>
        </template>
        <v-bottom-navigation
            color="purple lighten-1"
            fixed
            height="48"
        >
            <v-btn color="#ca0b64" class="pa-2 ml-auto" dark @click="processToCheckout">
                <span class="text-white">Checkout</span>
                <v-icon color="#fff">ri ri-arrow-right-line</v-icon>
            </v-btn>
        </v-bottom-navigation>
        <template v-if="enabledSnackbar">
            <Snackbar :snackbarText="text"/>
        </template>
    </div>
</template>

<script>
import store from "@/store"
import ShoppingCartCard from "@/components/ShoppingCartCard.vue";
import Snackbar from "@/components/SnackBar.vue"
import {mapGetters, mapState} from "vuex";

export default {
    data(){
        return {
            enabledSnackbar : false
        }
    },
    components : {
        ShoppingCartCard,
        Snackbar
    },
    methods : {
        processToCheckout(){
            const isVerifiedUser = parseInt(this.$store.state.user.userData.details.is_verified)
            // console.log(isVerifiedUser)
            store.dispatch('transaction/checkoutItem',isVerifiedUser)
                .then(()=>{
                    this.enabledSnackbar = true
                })
            this.enabledSnackbar = false
        }
    },
    computed : {
        ...mapGetters('transaction',['getCartLength']),
        ...mapState('transaction',['cart','text'])
    }
}
</script>

<style lang="scss" scoped>
.mt-50 {
    margin-top: 70px;
}
.text-white {
    color: #fff !important;
}
.header__cart {
    color: #0a369d;
}
</style>