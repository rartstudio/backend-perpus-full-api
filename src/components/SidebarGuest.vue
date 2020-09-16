<template>
    <v-list-item-group>
        <router-link  to="/login" text class="sidebar__link">
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>ri ri-arrow-right-line</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
        </router-link>
        <router-link  to="/register" text class="sidebar__link">
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>ri ri-user-add-line</v-icon>
                </v-list-item-icon>
                <v-list-item-title> Register </v-list-item-title>
            </v-list-item>
        </router-link>
    </v-list-item-group>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>