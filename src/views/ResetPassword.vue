<template>
    <v-card class="mt-10 mx-4" elevation=0>
        <v-card-title class="mb-4">
            <h1 class="header__login mb-4">Reset Password</h1>
            <p class="text-body-2 text--secondary">Silahkan isi password yang baru</p>
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form @submit.prevent="resetPassword" autocomplete="off">
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
                <div v-if="$v.details.password.$error" class="mt-4">
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
                        <v-btn color="#0a369d" dark large block type="submit" disabled elevation="3">
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
                                Submit
                        </v-btn>
                    </template>
                </v-card-actions>
            </v-form>
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
    name: "Reset",

    data: () => ({
        //if any error when typing text field
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
        passError: false,
        details : {
            password : null,
            password_confirmation: null,
        },
    }),
    validations: {
        details : {
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
    destroyed(){
        this.$store.commit('auth/SET_USER',null);
    },
    updated(){

        //checking type data after backend validation return true
        if(this.details.password != null) {
            this.disabledBackendValidationPass()
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
        resetValidation(){
            this.$v.$reset()
        },
        disabledBackendValidationPass(){
            return this.passError = false
        },
        beforeFetchReset(){
            this.isSubmitted = true
            this.isLoading = true
            this.disabled = true
        },
        afterFetchReset(){
            this.isLoading = false
            this.disabled = false
            this.isSubmitted = false
            this.details.password_confirmation = null
            this.details.password = null
        },
        resetPassword(){
            this.beforeFetchReset()
            store.dispatch('auth/fetchReset', this.details)
            .then(()=> {
                //checking promise from auth
                //state.auth.status
                if(this.$store.state.auth.status == 200){
                    this.resetValidation()
                    this.$router.push({ name: 'login' })
                }
                else {
                    this.passError = true
                    this.afterFetchReset()
                    this.resetValidation()
                }
            })
        }
    }
};
</script>