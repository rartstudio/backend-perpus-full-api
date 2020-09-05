<template>
    <div>
        <template v-if="user.isLoading">
            <DashboardLoader/>
        </template>
        <template v-else>
            <v-container>
                <v-row class="user-container">
                    <v-col cols="3" class="text-right">
                        <v-avatar color="white" size="48">
                            <span class="white--text headline"></span>
                        </v-avatar>
                    </v-col>
                    <v-col cols="9">
                        <div class="font-weight-bold text-uppercase text-subtitle-2 font-white">
                            {{ user.userData.name }}
                        </div>
                        <div class="text-caption dark font-white">
                            {{ user.userData.email }}
                        </div>
                        <div class="mt-1">
                            <v-btn small color="#ff8600" dark >
                                profile
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="mt-m-120">
                    <v-col cols="12">
                        <v-tabs background-color="#27187e" dark>
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
function getUser(){
    store.dispatch('user/fetchUser')
        .then(()=> {
        })
}

import {mapState} from "vuex"
import store from "@/store";
import DashboardLoader from "@/components/DashboardLoader.vue";

export default {
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
.mt-m-120{
    margin-top: -120px;
}
.mt-15 {
    margin-top: 15px;
}
.main-content {
    margin-top: 1.3rem !important;
}
.user-container {
    background-color: #27187e;
    border-radius: 10px;
    padding-top: 30px;
    height: 250px;
}
.font-white {
    color: #fff;
}
</style>