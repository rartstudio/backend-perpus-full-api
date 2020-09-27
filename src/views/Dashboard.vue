<template>
    <div class="dashboard">
        <template v-if="user.isLoading">
            <DashboardLoader/>
        </template>
        <template v-else>
            <v-container>
                <v-row class="user-container user-width">
                    <v-col cols="2" class="ml-5">
                        <v-avatar color="white" size="48">
                            <span class="white--text headline"></span>
                        </v-avatar>
                    </v-col>
                    <v-col cols="9">
                        <div class="text-h6 text-capitalize font-color">
                            <div class="d-flex align-start">
                                <p class="fs-med-xl">
                                    {{ user.userData.name }}
                                </p>
                                <template v-if="user.userData.details.is_verified == 1">
                                    <i class="ri ri-checkbox-circle-line verified"></i>
                                </template>
                            </div>
                            
                        </div>
                        <div class="mt-1 d-flex flex-column">
                            <p class="font-color fs-8">Status Profil</p>
                            <v-progress-linear
                                :active="true"
                                :rounded="true"
                                :height="5"
                                :value="getProgressValue"
                                :buffer-value="100"
                                :size="24"
                                color="#FFCB36"
                            />
                            <template v-if="user.userData.details.submission == 2">
                                <v-btn dense class="fs-med mt-4" depressed disabled dark>
                                    User Terverifikasi
                                </v-btn>
                            </template>
                            <template v-else-if="user.userData.details.submission == 1">
                                <v-btn dense class="fs-med mt-4" depressed disabled dark>
                                    Sedang Proses Verifikasi
                                </v-btn>
                            </template>
                            <template v-else>
                                <v-btn dense class="fs-med mt-4" depressed @click="submitVerified()">
                                    Verifikasi Saya
                                </v-btn>
                            </template>
                            
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
    methods: {
        submitVerified(){
            this.$swal.fire({
                    title: 'Apakah kamu yakin sudah mengisi form profil?',
                    icon: 'success',
                    text: 'pastikan data yang diisi sudah benar',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cek dulu ah',
                    confirmButtonText: 'Ya, Sudah'
                }).then((result) => {
                    if (result.isConfirmed) {
                        store.dispatch('user/fetchSubmission')
                        .then(()=> {    
                            this.$swal.fire(
                            'Sukses!',
                            'Berhasil submit profile',
                            location.reload()
                            )
                        });
                    }
                });
        }
    },
    computed : {
        ...mapState(['user']),
        ...mapGetters('user',['getProgressValue']),
    }   
}


</script>

<style lang="scss">
.btn-profile.text-capitalize {
    height: 25px !important;
    padding: 0 12px;
}
.fs-8 {
    font-size: 12px !important;
}
.mt-15 {
    margin-top: 15px;
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
    padding-top: 30px;
    height: 230px;
    background-color:#0a369d;
}
.verified {
    display: inline-block !important;
    margin-left: 10px;
    color: #fff !important;
}
.font-color {
    color: white;
}
.progress-container {
    background: #f6f5ff;
}
.status {
    padding-top: 0 !important;
}
</style>