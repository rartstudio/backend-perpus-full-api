<template>
    <div class="pa-4">
        <v-card class="pa-4">
            <div class="d-flex">
                <v-skeleton-loader
                    type="avatar"
                    width="50%"
                    :tile="tile"
                    class="flex-grow-0"
                />
                <v-skeleton-loader
                    type="heading"
                    width="100%"
                    :tile="tile"
                    class="flex-grow-1"
                />    
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tile : true
            }
        },
        mounted(){
            window.scrollTo(0,0);
        }
    }
</script>

<style lang="scss" scoped>
.search-image .v-skeleton-loader__avatar  {
    border-radius: 0;
}
</style>