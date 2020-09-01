<template>
    <div>
        ini halaman user {{ user.userData }}
    </div>
</template>

<script>
    function getUser(){
        store.dispatch('user/fetchUser')
            .then(()=> {
            console.log('success')
            })
    }
    
    import {mapState} from "vuex"
    import store from "@/store";
    export default {
        mounted() {
            getUser()
        },
        computed : {
            ...mapState(['user'])
        }
    }
</script>

<style lang="scss" scoped>

</style>