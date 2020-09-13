<template>
    <div class="d-flex cart__card mb-2 mx-4">
        <div>
            <v-img :src="link(cart.image)" height="140px" width="95px"></v-img>
        </div>
        <div class="ml-2">
            <p class="h-48 font-weight-bold">{{cart.title}}</p>
            <p class="text-body-2">Qty : {{cart.qty}}</p>
            <v-btn @click="deleteFromCart(cart.id)" color="#bfc0d9" class="cart__delete">
                <v-icon color="#fff" size="16px">ri ri-delete-bin-line</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import store from "@/store"
export default {
    props: {
        cart : {
            type: Object
        }
    },
    methods : {
        deleteFromCart(id){
            store.dispatch('transaction/deleteFromCart',id)
            .then()
        },
        link(data){
        //const linkImg = this.getLinkServer
        const linkImg = this.$store.state.linkServer

        let imgUrl = data
        let sliceImgUrl = imgUrl.slice(0,5)
        
        if(sliceImgUrl === 'https'){
          return imgUrl
        }
        else {
          return linkImg+imgUrl
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.d-flex.cart__card {
    box-shadow: none !important;
}
.h-48{
    height: 48px;
}
.cart {
    &__delete {
        height: 30px !important;
        min-width: 48px !important;
    }
}
</style>