<template>
    <div>
        <CartCard/>
        <div class="text-center mt-50">
            <img src="../assets/cart-empty.svg" alt="" width="280px" />
            <p class="font-weight-bold">Maaf Keranjang peminjaman masih kosong</p>
        </div>
    </div>
</template>

<script>

import CartCard from "@/components/CartCard.vue";
export default {
    components : {
        CartCard
    }
}
</script>

<style lang="scss" scoped>
.mt-50 {
    margin-top: 70px;
}
</style>