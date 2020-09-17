<template>
    <div>
        <div class="d-flex justify-between align-start mt-4 pa-4">
            <div>
                <v-skeleton-loader class="book-show__loader"
                type="avatar"
                :tile="tile">
                </v-skeleton-loader>
            </div>
            <div>
                <v-skeleton-loader
                    type="heading"
                    :tile="tile"
                    class="book-show__loader"
                    >
                </v-skeleton-loader>
            </div>
        </div>
        <div>
             <v-skeleton-loader
                    type="sentences"
                    :tile="tile"
                    class="book-show__loader ma-4"
                    >
                </v-skeleton-loader>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tile: true
            }
        }
    }
</script>

<style lang="scss">
.book-show__loader{
    .v-skeleton-loader__avatar {
        height: 200px !important;
        width: 140px !important;
    }
    .v-skeleton-loader__heading{
        width: 150px !important;
        margin-left: 8px;
    }
} 
</style>