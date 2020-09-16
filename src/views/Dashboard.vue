<template>
    <div>
        <template v-if="user.isLoading">
            <DashboardLoader/>
        </template>
        <template v-else>
            <v-container>
                <v-row class="user-container user-width">
                    <v-col cols="4" class="text-right">
                        <v-avatar color="white" size="72">
                            <span class="white--text headline"></span>
                        </v-avatar>
                    </v-col>
                    <v-col cols="8">
                        <div class="font-weight-bold text-h6 text-capitalize font-color">
                            <div class="d-flex align-center">
                                {{ user.userData.name }}
                                <template v-if="user.userData.details.is_verified == 1">
                                    <i class="ri ri-checkbox-circle-line verified"></i>
                                </template>
                                <template v-else>
                                    <span></span>
                                </template>
                            </div>
                            
                        </div>
                        <div class="text-subtitle-1">
                            {{ user.userData.email }}
                        </div>
                        <div class="mt-1">
                            <router-link to="/profile-form">
                                
                            <v-btn color="#0a369d" dark class="text-capitalize">
                                profil
                            </v-btn>
                            </router-link>
                            <v-progress-circular
                                :active="true"
                                :rounded="true"
                                :height="5"
                                :value="getProgressValue"
                                :buffer-value="100"
                                :size="24"
                                color="#0a369d"
                                class="status-progress"
                        />
                        </div>
                    </v-col>
                </v-row>
                <TransactionTab/>
            </v-container>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
function getUser(){
    store.dispatch('user/fetchUser')
        .then()
}

import {mapGetters, mapState} from "vuex"
import store from "@/store";
import DashboardLoader from "@/components/DashboardLoader.vue";
import TransactionTab from "@/components/TransactionTab.vue";

export default {
    components: {
        DashboardLoader,
        TransactionTab
    },
    created() {
        getUser()
    },
    computed : {
        ...mapState(['user']),
        ...mapGetters('user',['getProgressValue']),
    }   
}


</script>

<style lang="scss">
.mt-15 {
    margin-top: 15px;
}
.no-padding-top {
    padding-top: 0px !important;
}
.no-padding-right {
    padding-right: 0px !important;
}
.no-padding-left {
    padding-left: 0px !important;
}
.main-content {
    margin-top: 1.3rem !important;
}
.v-slide-group__content{
    justify-content: center;
}
.user-width {
    min-width: 373px;
}
.user-container {
    background-color: #f6f5ff;
    padding-top: 30px;
    height: 180px;
}
.verified {
    display: inline-block !important;
    margin-left: 10px;
}
.font-color {
    color: #0a369d;
}
.progress-container {
    background: #f6f5ff;
}
.status {
    padding-top: 0 !important;
}
.status-progress {
    margin-left: 8px;
}
</style>