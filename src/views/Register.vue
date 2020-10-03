<template>
    <v-card class="mt-10 mx-4" elevation=0>
        <v-card-title class="mb-4">
            <h1 class="header__login mb-4">Join Perpus GKKB</h1>
            <p class="text-body-2 text--secondary">Silahkan registrasi menggunakan email dan Daftar untuk meminjam buku</p>
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form @submit.prevent="register">
                <v-text-field
                    outlined
                    prepend-inner-icon="mdi-account-circle-outline"
                    label="Nama"
                    v-model.trim="details.name"
                    @blur="$v.details.name.$touch()"
                    clearable
                    required
                    dense
                    class="mb-2"
                    :error="isNameError"
                    :loading="isLoading"
                    :disabled="disabled"
                />
                <p v-if="!$v.details.name.minLength" class="text-red mt-m-25 fs-12">Nama minimal 3 huruf.</p>
                <div v-if="$v.details.name.$error">
                    <p v-if="!$v.details.name.required" class="text-red mt-m-25 fs-12">Nama harap diisi.</p>
                </div>
                <v-text-field
                    outlined
                    prepend-inner-icon="mdi-email-outline"
                    label="Email"
                    v-model.trim="details.email"
                    @blur="$v.details.email.$touch()"
                    clearable
                    required
                    dense
                    class="mb-2"
                    :error="isEmailError"
                    :loading="isLoading"
                    :disabled="disabled"
                />
                <div v-if="emailError" class="mb-20">
                    <p class="text-red mt-m-25 fs-12">
                        Email tersebut sudah pernah registrasi
                    </p>
                </div>
                <p v-if="!$v.details.email.email" class="text-red mt-m-25 fs-12">Masukkan email valid</p>
                <div v-if="$v.details.email.$error" class="mt-2">
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
                    clearable
                    required
                    dense
                    class="mb-2"
                    :error="isPassError"
                    :loading="isLoading"
                    :disabled="disabled"
                    :counter="counterPassword ? countPass : false"
                />
                <div v-if="passError" class="mb-20">
                    <p class="text-red mt-m-25 fs-12">
                        Konfirmasi Password beda dengan password
                    </p>
                </div>
                <p v-if="!$v.details.password.minLength" class="text-red mt-m-25 fs-12">Password minimal 8 huruf.</p>
                <div v-if="$v.details.password.$error" class="mt-2">
                    <p v-if="!$v.details.password.required" class="text-red mt-m-25 fs-12">Password harap diisi.</p>
                </div>
                <v-text-field
                    outlined
                    label="Konfirmasi Password" 
                    :type="showPasswordConfirm ? 'text' : 'password'" 
                    prepend-inner-icon="mdi-lock"
                    :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPasswordConfirm = !showPasswordConfirm"
                    v-model="details.password_confirmation"
                    @blur="$v.details.password_confirmation.$touch()"
                    clearable
                    required
                    dense
                    class="mb-2"
                    :error="isConfirmPassError"
                    :loading="isLoading"
                    :disabled="disabled"
                    :counter="counterConfirm ? countConfirm : false"
                />
                <p v-if="!$v.details.password_confirmation.minLength" class="text-red mt-m-25 fs-12">Konfirmasi password harus sesuai dengan password.</p>
                <div v-if="$v.details.password_confirmation.$error">
                    <p v-if="!$v.details.password_confirmation.required" class="text-red mt-m-25 fs-12">Konfirmasi password harap diisi.</p>
                </div>
                <v-card-actions class="d-flex justify-center align-center pa-0 mt-6">
                    <template v-if="isSubmitted">
                        <v-btn color="#0a369d" dark large type="submit" disabled elevation="3">
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
                        <v-btn color="#0a369d" dark large block type="submit" :disabled="$v.$invalid">
                            <v-icon left color="#fff !important">mdi-pencil</v-icon>
                                Sign Up
                        </v-btn>
                    </template>
                </v-card-actions>
            </v-form>
        </v-card-text>
        <v-card-text>
            <div class="d-flex link__container">
                <p>Sudah punya akun ? &nbsp;</p>
                <router-link to="/login" class="sidebar__link ml-1 font-weight-bold">Masuk Disini</router-link>
            </div>
        </v-card-text>
        
    </v-card>
</template>
<style>
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgba(0,0,0,0.3) !important;
}
.theme--dark.v-btn.v-btn--disabled {
    color: #fff !important;
}
.fs-12 {
    font-size: 12px;
}

.mb-20 {
    margin-bottom: 20px;
}

.header__login {
    color: #0a369d;
    text-align: center;
    font-size: 1.5rem;
}

.v-text-field__slot > .v-label:focus {
    left: -28px !important
}
</style>

<script>
/* eslint-disable */
import store from "@/store"
import { required, email, minLength } from "vuelidate/lib/validators"
import { mapState } from "vuex";

export default {
    name: "Register",

    data: () => ({
        //if any error when typing text field
        isNameError: false,
        isEmailError: false,
        isPassError: false,
        isConfirmPassError: false,

        //loading bar text field
        isLoading: false,

        //template button
        isSubmitted: false,

        //disabled text field
        disabled: false,

        //spinner
        indeterminate: true,

        //using show passowrd
        showPassword: false,
        showPasswordConfirm: false,

        //using counter
        counterPassword: true,
        counterConfirm: true,
        countPass: 0,
        countConfirm: 0,

        //using backend validation
        emailError: false,
        passError: false,
        details : {
            name : null,
            email : null,
            password : null,
            password_confirmation: null,
        },
    }),
    validations: {
        details : {
            name : {
                required,
                minLength: minLength(3)
            },
            email : {
                required,email
            },
            password : {
                required,
                minLength: minLength(8)
            },
            password_confirmation : {
                required,
                minLength: minLength(8)
            }
        }
    },
    computed : {
        ...mapState(['auth']),
    },
    updated(){

        //checking type data after backend validation return true
        if(this.details.password != null) {
            this.disabledBackendValidationPass()
        }

        //checking type data after backend validation return true
        if(this.details.email != null){
            this.disabledBackendValidationEmail()
        }

        //check name if doesnt match with minlength
        if(!this.$v.details.name.minLength){
            this.isNameError = true
        }
        else {
            this.isNameError = false
        }

        //check emailif doesnt match with minlength
        if(this.$v.details.email.email == true){
            this.isEmailError = false
        }
        else {
            this.isEmailError = true
        }

        //check password if doesnt match with minlength
        if(!this.$v.details.password.minLength ){
            this.isPassError = true
        }
        else {
            this.isPassError = false
        }

        //check password confirmation if doesnt match with minlength
        if(!this.$v.details.password_confirmation.minLength ){
            //set border to red
            this.isConfirmPassError = true
        }
        else {
            //set border to blue (default)
            this.isConfirmPassError = false
        }
    },
    methods: {
        disabledBackendValidationPass(){
            return this.passError = false
        },
        disabledBackendValidationEmail(){
            return this.emailError = false
        },
        beforeFetchRegister(){
            this.isSubmitted = true
            this.isLoading = true
            this.disabled = true
        },
        afterFetchRegister(){
            this.isLoading = false
            this.disabled = false
            this.isSubmitted = false
            this.details.password_confirmation = null
            this.details.password = null
        },
        register(){
            this.beforeFetchRegister()
            store.dispatch('auth/fetchRegister', this.details)
            .then(()=> {
                //checking promise from auth
                //state.auth.status
                if(this.auth.status == 200){
                    this.$router.push({ name: 'dashboard' })
                }
                else if(this.auth.status == 422){
                    this.passError = true
                    this.afterFetchRegister()
                }
                else if(this.auth.status == 500){
                    this.emailError = true
                    this.afterFetchRegister()
                    this.details.email = null
                }
            })
        }
    }
};
</script>