<template>
    <div class="header-card-loader">
        <v-flex class="d-flex">
            <v-card class="d-flex header-card">
                <v-skeleton-loader
                    type="avatar"
                    width="100%"
                    :tile="tile"
                />
                <v-skeleton-loader
                    type="heading"
                    width="100%"
                    :tile="tile"
                />
            </v-card>
            <v-card class="d-flex header-card">
                <v-skeleton-loader
                    type="avatar"
                    width="100%"
                    :tile="tile"
                />
                <v-skeleton-loader
                    type="heading"
                    width="100%"
                    :tile="tile"
                />
            </v-card>
        </v-flex>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tile : true
            }
        }
    }
</script>

<style lang="scss">
.header-card-loader .header-card {
    margin-left: 18px;
}
.header-card-loader .v-skeleton-loader {
    width: 50% !important;
    margin-right: 10px;
}
.header-card {
    width: 45% !important;
}
.v-skeleton-loader__heading{
    width: 100% !important;
    margin-top: 10px;
}
.v-skeleton-loader__avatar {
    height: 110px;
    width: 90px;
}
</style>