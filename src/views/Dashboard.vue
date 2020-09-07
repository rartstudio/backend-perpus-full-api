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
                            {{ user.userData.name }}
                        </div>
                        <div class="text-subtitle-1">
                            {{ user.userData.email }}
                        </div>
                        <div class="mt-1">
                            <v-btn color="#0a369d" dark class="text-capitalize">
                                profile
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="user-width progress-container">
                    <v-col cols="5" class="status">
                        <p class="text-subtitle-2 font-color pl-8">Status Profil</p>
                    </v-col>
                    <v-col cols="7" class="status">
                        <v-progress-linear
                            :active="active"
                            :rounded="rounded"
                            :height="height"
                            :value="value"
                            :buffer-value="buffer"
                            color="#ff8600"
                            class="status-progress"
                        />
                    </v-col>
                </v-row>
                <v-row class="mt-m-120 user-width">
                    <v-col cols="12">
                        <v-tabs background-color="#0a369d" dark>
                            <v-tab>On Going</v-tab>
                            <v-tab>Request</v-tab>
                            <v-tab>Last</v-tab>
                        </v-tabs>
                        <template>
                            <v-card
                                class="mx-auto mt-3"
                                max-width="344"
                                outlined
                            >
                                <v-list-item three-line>
                                    <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="grey"
                                    ></v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="text-subtitle-2 mb-1">Headline 5</v-list-item-title>
                                        <v-list-item-subtitle class="text-caption">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
function getUser(){
    store.dispatch('user/fetchUser')
        .then(()=> {
        })
}

import {mapState} from "vuex"
import store from "@/store";
import DashboardLoader from "@/components/DashboardLoader.vue";

export default {
    data() {
        return {
            active: true,
            buffer: 100,
            height: "5px",
            rounded: true,
            value: "50%" 
        }
    },
    components: {
        DashboardLoader
    },
    mounted() {
        getUser()
    },
    computed : {
        ...mapState(['user'])
    }
}
</script>

<style lang="scss">
.mt-15 {
    margin-top: 15px;
}
.main-content {
    margin-top: 1.3rem !important;
}
.user-width {
    width: 373px;
}
.user-container {
    background-color: #f6f5ff;
    padding-top: 30px;
    height: 180px;
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
    margin-top: 8px;
}
</style>