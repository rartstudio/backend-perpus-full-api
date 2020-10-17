<template>
    <v-card class="mt-8 mx-4" elevation=0>
        <template v-if="auth.enabledSnackbar">
            <Snackbar :snackbarText="auth.message"/>
        </template>
        <v-card-title class="mb-4">
            <h1 class="header__login">Log In</h1>
            <p class="text-body-2 mt-1">Mohon login terlebih dahulu sebelum meminjam</p>
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form @submit.prevent="login" autocomplete="off">
                <v-text-field
                    outlined
                    prepend-inner-icon="mdi-email-outline"
                    label="Email"
                    v-model.trim="details.email"
                    @blur="$v.details.email.$touch()"
                    required
                    clearable
                    dense
                    :error="isEmailError"
                    :loading="isLoading"
                    :disabled="disabled"
                />
                <p v-if="!$v.details.email.email" class="text-red mt-m-25 fs-12">Masukkan email valid</p>
                <div v-if="$v.details.email.$error">
                    <p v-if="!$v.details.email.required" class="text-red mt-m-25 fs-12">Email wajib diisi.</p>
                </div>
                <v-text-field
                    outlined
                    label="Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    prepend-inner-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="details.password"
                    @blur="$v.details.password.$touch()"
                    required
                    clearable
                    dense
                    :error="isPassError"
                    :loading="isLoading"
                    :disabled="disabled"
                    :counter="counterPassword ? countPass : false"
                />
                <div v-if="passError" class="mb-20">
                    <p class="text-red mt-m-25 fs-12">
                        Kombinasi email password tidak sesuai
                    </p>
                </div>
                <p v-if="!$v.details.password.minLength" class="text-red mt-m-25 fs-12">Password minimal 8 huruf.</p>
                <div v-if="$v.details.password.$error">
                    <p v-if="!$v.details.password.required" class="text-red mt-m-25 fs-12">Password harap diisi.</p>
                </div>
                <router-link to="/forgot-password" class="text-right d-block sidebar__link font-weight-bold">Lupa Password ?</router-link>
                <v-card-actions class="d-flex justify-center align-center pa-0 mt-6">
                    <template v-if="isSubmitted">
                        <v-btn color="#0a369d" dark large type="submit" disabled block elevation="3">
                            <v-progress-circular
                                :indeterminate="indeterminate"
                                size="24"
                                width="4"
                                color="white"
                                class="mr-1"
                            ></v-progress-circular>
                            Proses
                        </v-btn>
                    </template>
                    <template v-else>
                        <v-btn color="#0a369d" dark large type="submit" block :disabled="$v.$invalid">
                            <v-icon left color="#fff">mdi-login-variant</v-icon>
                                Sign In
                        </v-btn>
                    </template>
                </v-card-actions>
            </v-form>
        </v-card-text>
        <v-card-text>
            <div class="d-flex link__container">
                <p>Belum punya akun ? &nbsp;</p>
                <router-link to="/register" class="sidebar__link ml-1 font-weight-bold">Daftar Disini</router-link>
            </div>
        </v-card-text>
    </v-card>
</template>
<style>
.header__login {
    color: #0a369d !important;
}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgba(0,0,0,0.2) !important;
}
.theme--dark.v-btn.v-btn--disabled {
    color: #fff !important;
}
.text-red {
    color:red;
}
.mt-m-25{
    margin-top: -25px
}
.fs-12 {
    font-size: 12px;
}

.mb-20 {
    margin-bottom: 20px;
}
</style>

<script>
/* eslint-disable */
import store from "@/store";
import Snackbar from "@/components/SnackBar.vue";
import { mapState } from 'vuex';
import { required, email, minLength } from "vuelidate/lib/validators"

export default {
    name: "Login",

    components: {
        Snackbar
    },

    data: () => ({
        //if text field has error
        isEmailError: false,
        isPassError: false,

        //loading bar text field
        isLoading: false,

        //disabled text field 
        disabled: false,

        //template button
        isSubmitted: false,

        //spinner
        indeterminate: true,
        
        //using show passowrd
        showPassword: false,

        //using counter
        counterPassword: true,
        countPass: 0,

        //using backend validation
        passError: false,
        details : {
            email : null,
            password : null
        },
    }),
    validations: {
        details : {
            email : {
                required,email
            },
            password : {
                required,
                minLength: minLength(8)
            }
        }
    },
    computed : {
        ...mapState(['auth'])
    },
    updated(){
        if(this.details.password != null) {
            this.disabledBackendValidation()
        }
        if(this.$v.details.email.email == true){
            this.isEmailError = false
        }
        else {
            this.isEmailError = true
        }
        if(!this.$v.details.password.minLength ){
            this.isPassError = true
        }
        else {
            this.isPassError = false
        }
    },
    destroyed(){
        this.$store.commit('auth/SET_USER',null);
        this.$store.commit('auth/SET_STATUS_CODE',null);
        this.$store.commit('auth/SET_MESSAGE',null);
        this.$store.commit('auth/SET_SNACKBAR',false);
    },
    methods: {
        disabledBackendValidation(){
            return this.passError = false
        },
        beforeFetchLogin(){
            this.isSubmitted = true
            this.isLoading = true
            this.disabled = true
        },
        afterFetchLogin(){
            this.isLoading = false
            this.disabled = false
            this.isSubmitted = false
            this.passError = true
            this.details.password = null
        },
        login(){
            this.beforeFetchLogin()  
            store.dispatch('auth/fetchLogin', this.details)
            .then(()=> {
                if(this.auth.status == 200){
                    this.$router.push({ name: 'dashboard' })
                }
                else {
                    this.afterFetchLogin()
                }
            })
        }
    },
};
</script>


<style lang="scss" scoped>

.mdi.mdi-email-outline.theme--light {
    color: red !important
}

.header__login {
    color: #42A5F5;
    text-align: center;
    font-size: 1.5rem;
}

.v-text-field__slot > .v-label:focus {
    left: -28px !important
}
</style>