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
                <img src="../assets/cart-empty2.svg" alt="" width="280px" />
                <p class="font-weight-bold">Maaf Keranjang peminjaman masih kosong</p>
            </div>
        </template>
        <v-bottom-navigation
            color="purple lighten-1"
            fixed
            height="48"
        >
            <template v-if="isSubmitted">
                <v-btn color="#FFCB36" class="pa-2 ml-auto btn__cart" @click="processToCheckout" :disabled="isSubmitted">
                    <span style="color: #000">Proses..</span>
                    <v-progress-circular
                        indeterminate
                        size="20"
                        color="#000"
                        >
                    </v-progress-circular>
                </v-btn>
            </template>
            <template v-else>
                <v-btn color="#FFCB36" class="pa-2 ml-auto btn__cart" @click="processToCheckout" :disabled="checkCart">
                    <span style="color: #000">Checkout</span>
                    <v-icon color="#000">ri ri-arrow-right-line</v-icon>
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
            isSubmitted : false
        }
    },
    beforeDestroy(){
        this.$store.commit('transaction/SET_SNACKBAR',false)
        this.$store.commit('transaction/SET_TEXT',null)
    },
    components : {
        ShoppingCartCard,
        Snackbar
    },
    methods : {
        processToCheckout(){
            this.$swal.fire({
                title: 'Apakah kamu yakin sudah mengecek buku yang dipinjam?',
                icon: 'success',
                text: 'pastikan buku yang dipinjam sudah sesuai dengan yang diinginkan',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Belum',
                confirmButtonText: 'Sudah diterima'
            }).then((result) => {
                if (result.isConfirmed) {
                    store.dispatch('transaction/checkoutItem')
                    .then(()=>{
                        if (this.$store.state.transaction.status == 200){
                            this.$router.push({ name: 'dashboard'})
                        }
                    });
                }
            });
            
            this.isSubmitted = false 
        }
    },
    computed : {
        ...mapGetters('transaction',['getCartLength','checkCart']),
        ...mapState('transaction',['cart','text','enabledSnackbar'])
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