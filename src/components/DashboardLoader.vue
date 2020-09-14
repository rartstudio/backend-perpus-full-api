<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-skeleton-loader
                    type="list-item-avatar-three-line"
                    width="100%"
                    >
                </v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" mx-auto>
                <v-skeleton-loader
                    class="mx-auto"
                    type="heading"
                    width="100%"
                    >
                </v-skeleton-loader>
            </v-col>
            <v-col cols="4">
                <v-skeleton-loader
                    type="heading"
                    width="100%"
                    >
                </v-skeleton-loader>
            </v-col>
            <v-col cols="4">
                <v-skeleton-loader
                    type="heading"
                    width="100%"
                    >
                </v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss">
.v-skeleton-loader__heading{
    width: 100% !important;
}
.v-skeleton-loader__avatar {
    height: 72px;
    width: 72px;
}
.card-style {
    padding-top: 25px;
    padding-left: 35px;
}
</style>

<script>
export default {
    data() {
        return {
            tile: true
        }
    }
}
</script>