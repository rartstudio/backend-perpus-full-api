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
                                profile
                            </v-btn>
                            </router-link>
                            <v-progress-circular
                            :active="active"
                            :rounded="rounded"
                            :height="height"
                            :value="value"
                            :buffer-value="buffer"
                            :size="24"
                            color="#0a369d"
                            class="status-progress"
                        />
                        </div>
                    </v-col>
                </v-row>
                <v-row class="mt-m-120 user-width">
                    <v-col cols="12" class="no-padding-top">
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
        }
    },
    components: {
        DashboardLoader
    },
    mounted() {
        getUser()
    },
    computed : {
        ...mapState(['user']),
        value(){
            let baseState = 50
            let inc = 10
            let final = 0
            let temp

            if(this.$store.state.user.userData.details.address){
                temp = baseState + inc
            }
            if(this.$store.state.user.userData.details.date_of_birth){
                final = temp + inc
            }
            if(this.$store.state.user.userData.details.gender){
                final = temp + inc
            }
            if(this.$store.state.user.userData.details.phone_number){
                final = baseState + inc
            }
            if(this.$store.state.user.userData.details.no_cst){
                final = final + 5
            }

            if(final == 0){
                return baseState + "%"
            }

            return final + "%"
        }
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
.main-content {
    margin-top: 1.3rem !important;
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