<template>
    <div class="dashboard">
        <template v-if="user.isLoading">
            <DashboardLoader/>
        </template>
        <template v-else>
            <v-container>
                <v-row class="user-container user-width">
                    <v-col cols="2" class="ml-5 pa-0">
                        <template v-if="user.loadingImage == true">
                            <v-skeleton-loader
                            type="avatar"
                            class="mt-5 ml-2 profile-image"
                            width="60"
                            height="60"
                            >
                            </v-skeleton-loader>
                        </template>
                        <template v-else>
                            <template v-if="user.userData.details.image != null && user.loadingImage == false">
                                <v-img width="60px" height="60px" :src="link(user.userData.details.image)" class="rounded-circle mt-5 ml-2"></v-img>
                            </template>
                            <template v-else>
                                <v-avatar color="white" size="60" class="mt-5 ml-2">
                                    <span class="white--text headline"></span>
                                </v-avatar>
                            </template>
                        </template>
                        <v-file-input
                        prepend-icon="ri ri-camera-line"
                        hide-input
                        truncate-length="50"
                        @change=uploadImage
                        class="input-image ml-2"
                        ></v-file-input>
                        <div class="text-center btn-question mt-2">
                            <v-btn color="#fff" text @click="question">
                                <v-icon> 
                                    ri ri-question-line
                                </v-icon>
                        </v-btn>
                        </div>
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
                                <v-spacer></v-spacer>
                                <router-link to="/profile-form">
                                    <v-btn icon class="mt-n1">
                                        <v-icon color="#fff">ri ri-user-line</v-icon>
                                    </v-btn>
                                </router-link>
                                <router-link to="/inbox">
                                    <v-btn icon class="mt-n1">
                                        <template v-if="getNotRead != 0">
                                            <v-badge
                                            :content="getNotRead"
                                            color="#FFCB36"
                                            overlap
                                            dark
                                            >
                                                <v-icon color="#fff">ri ri-mail-line</v-icon>
                                            </v-badge>
                                        </template>
                                        <template v-else>
                                            <v-icon color="#fff">ri ri-mail-line</v-icon>
                                        </template>
                                    </v-btn>
                                </router-link>
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
                                <div class="d-flex justify-center align-center">
                                    <v-btn dense class="fs-med mt-4 flex-grow-1" depressed disabled dark>
                                        User Terverifikasi
                                    </v-btn>
                                    <v-btn dense class="mt-4 ml-2" dark color="#FFCB36" @click="statisticUser">
                                        <v-icon color="#fff">ri ri-bar-chart-line</v-icon>
                                    </v-btn>
                                </div>
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
import {bookMixin} from "@/mixins/bookMixin.js";
import store from "@/store";
import DashboardLoader from "@/components/DashboardLoader.vue";
import TransactionTab from "@/components/TransactionTab.vue";

export default {
    mixins: [bookMixin],
    components: {
        DashboardLoader,
        TransactionTab
    },
    data(){
        return {
            photo: null
        }
    },
    created() {
        getUser()
    },
    methods: {
        question(){
            this.$router.push({name: 'terms'})
        },
        statisticUser(){
            this.$router.push({name: 'profile-user'})
        },  
        uploadImage(e){
            this.photo = e

            const data = new FormData();
            data.append('image', this.photo);

            store.dispatch('user/fetchImage',data)
                .then(() => {
                    this.$swal.fire(
                        'Sukses!',
                        'Berhasil upload foto profil',
                        location.reload()    
                    )
                })
        },
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
        ...mapGetters('message',['getNotRead']),
    }   
}


</script>

<style lang="scss">
.v-badge__badge{
    color: #000;
}
.btn-question {
    margin-left: 5px !important;
}
.theme--light.v-icon.ri.ri-camera-line {
    color: white !important;
}
.profile-image .v-skeleton-loader__avatar {
    width: 60px !important;
    height: 60px !important; 
    background-color: rgba(255, 255, 255, .5) !important;
}
.input-image .v-input__prepend-outer {
    margin: 0 auto !important;
}
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