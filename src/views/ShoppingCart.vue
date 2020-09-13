<template>
    <div class="mt-10 mb-15">
        <template v-if="checkCart">
        </template>
        <template v-else>
            <p class="text-center font-weight-bold header__cart mb-10 text-h6">List Buku yang akan dipinjam</p>
        </template>
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
            <template v-if="isSubmitted">
                <v-btn color="#ca0b64" class="pa-2 ml-auto btn__cart" @click="processToCheckout" :disabled="isSubmitted">
                    <span class="text-white">Proses..</span>
                    <v-progress-circular
                        indeterminate
                        size="20"
                        color="#fff"
                        >
                    </v-progress-circular>
                </v-btn>
            </template>
            <template v-else>
                <v-btn color="#ca0b64" class="pa-2 ml-auto btn__cart" @click="processToCheckout" :disabled="checkCart">
                    <span class="text-white">Checkout</span>
                    <v-icon color="#fff">ri ri-arrow-right-line</v-icon>
                </v-btn>
            </template>
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
            isSubmitted : false,
            enabledSnackbar : false
        }
    },
    components : {
        ShoppingCartCard,
        Snackbar
    },
    methods : {
        processToCheckout(){
            if(this.$store.state.user.userData){
                this.isSubmitted = true
                const isVerifiedUser = this.$store.state.user.userData.details.is_verified    
                store.dispatch('transaction/checkoutItem',isVerifiedUser)
                .then(()=>{
                    if (this.$store.state.transaction.status == 200){
                        this.$router.push({ name: 'dashboard'})
                    }
                    else {
                        this.$router.push({ name: 'cart'})
                        this.enabledSnackbar = true
                    }
                })
            }
            else {
                this.$router.push({name: 'login'})
            }
            this.isSubmitted = false
            this.enabledSnackbar = false
        }
    },
    computed : {
        ...mapGetters('transaction',['getCartLength','checkCart']),
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
.btn__cart.v-btn--disabled {
    background: #c5c5c5 !important;
}
</style>