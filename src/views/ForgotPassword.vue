<template>
    <v-card class="mt-10 mx-4" elevation=0>
        <v-card-title class="mb-4">
            <h1 class="header__login mb-4">Lupa Password</h1>
            <p class="text-body-2 text--secondary">Silahkan diisi form nya sesuai data yang dibutuhkan yah </p>
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form @submit.prevent="forgot" autocomplete="off">
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
                        Email yang dimasukkan salah
                    </p>
                </div>
                <p v-if="!$v.details.email.email" class="text-red mt-m-25 fs-12">Masukkan email valid</p>
                <div v-if="$v.details.email.$error" class="mt-2">
                    <p v-if="!$v.details.email.required" class="text-red mt-m-25 fs-12">Email wajib diisi.</p>
                </div>
                <v-text-field
                    outlined
                    prepend-inner-icon="mdi-account-circle-outline"
                    label="No Member Gereja"
                    v-model.trim="details.member_code"
                    @blur="$v.details.member_code.$touch()"
                    clearable
                    required
                    dense
                    class="mb-2"
                    :error="isMemberCodeError"
                    :loading="isLoading"
                    :disabled="disabled"
                />
                <p v-if="!$v.details.member_code.minLength" class="text-red mt-m-25 fs-12">No Member minimal 3 huruf.</p>
                <div v-if="$v.details.member_code.$error">
                    <p v-if="!$v.details.member_code.required" class="text-red mt-m-25 fs-12">No Member harap diisi.</p>
                </div>
                <div class="mt-n2">
                    <label for="" style="font-size: 12px">Tanggal Baptis</label>
                    <DatePicker v-model="details.date_of_baptism" valueType="format"></DatePicker>
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

/* datepicker */
.mx-datepicker {
  width: 100%;
  margin-bottom: 20px;
}
.mx-input {
  padding: 20px 30px;
}
</style>

<script>
/* eslint-disable */
import store from "@/store"
import { required, email, minLength } from "vuelidate/lib/validators"
import { mapState } from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: "Forgot",
    components :{
        DatePicker
    },
    data: () => ({
        //if any error when typing text field
        isMemberCodeError: false,
        isEmailError: false,
        isDateOfBaptismError: false,

        //loading bar text field
        isLoading: false,

        //template button
        isSubmitted: false,

        //disabled text field
        disabled: false,

        //spinner
        indeterminate: true,

        //using backend validation
        emailError: false,
        anyError: false,
        details : {
            date_of_baptism : null,
            email : null,
            member_code : null
        },
    }),
    validations: {
        details : {
            member_code : {
                required,
                minLength: minLength(4)
            },
            email : {
                required,email
            }
        }
    },
    computed : {
        ...mapState(['auth']),
    },
    updated(){

        //checking type data after backend validation return true
        if(this.details.date_of_baptism != null || this.details.member_code != null) {
            this.disabledBackendValidationAny()
        }

        //checking type data after backend validation return true
        if(this.details.email != null){
            this.disabledBackendValidationEmail()
        }

        //check name if doesnt match with minlength
        if(!this.$v.details.member_code.minLength){
            this.isMemberCodeError = true
        }
        else {
            this.isMemberCodeError = false
        }

        //check email if doesnt match with minlength
        if(this.$v.details.email.email == true){
            this.isEmailError = false
        }
        else {
            this.isEmailError = true
        }
    },
    methods: {
        disabledBackendValidationAny(){
            return this.anyError = false
        },
        disabledBackendValidationEmail(){
            return this.emailError = false
        },
        beforeFetchForgot(){
            this.isSubmitted = true
            this.isLoading = true
            this.disabled = true
        },
        afterFetchForgot(){
            this.isLoading = false
            this.disabled = false
            this.isSubmitted = false
        },
        forgot(){
            this.beforeFetchForgot()
            store.dispatch('auth/fetchForgot', this.details)
            .then(()=> {
                //checking promise from auth
                //state.auth.status
                // if(this.auth.status == 200){
                //     this.$router.push({ name: 'dashboard' })
                // }
                // else if(this.auth.status == 422){
                //     this.passError = true
                //     this.afterFetchForgot()
                // }
                // else if(this.auth.status == 500){
                //     this.emailError = true
                //     this.afterFetchForgot()
                //     this.details.email = null
                // }
            })
        }
    }
};
</script>