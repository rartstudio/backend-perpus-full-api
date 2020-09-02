<template>
    <v-card class="mt-10 mx-4">
        <v-card-title class="mb-4 justify-center">
            <h1 class="header__login">Registrasi</h1>
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form @submit.prevent="register">
                <v-text-field
                    solo
                    prepend-inner-icon="mdi-account-circle-outline"
                    label="Nama"
                    v-model.trim="details.name"
                    @blur="$v.details.name.$touch()"
                    clearable
                    required
                />
                <div v-if="$v.details.name.$error">
                    <p v-if="!$v.details.name.required" class="text-red mt-m-25">Nama harap diisi.</p>
                    <p v-if="!$v.details.name.minLength" class="text-red mt-m-25">Nama minimal 3 huruf.</p>
                </div>
                <v-text-field
                    solo
                    prepend-inner-icon="mdi-email-outline"
                    label="Email"
                    v-model.trim="details.email"
                    @blur="$v.details.email.$touch()"
                    clearable
                    required
                />
                <div v-if="$v.details.email.$error">
                    <p v-if="!$v.details.email.email" class="text-red mt-m-25">Masukkan email valid</p>
                    <p v-if="!$v.details.email.required" class="text-red mt-m-25">Email is required.</p>
                </div>
                <v-text-field
                    solo
                    label="Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    prepend-inner-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="details.password"
                    @blur="$v.details.password.$touch()"
                    clearable
                    required
                />
                <div v-if="$v.details.password.$error">
                    <p v-if="!$v.details.password.required" class="text-red mt-m-25">Password harap diisi.</p>
                    <p v-if="!$v.details.password.minLength" class="text-red mt-m-25">Password minimal 8 huruf.</p>
                </div>
                <v-text-field
                    solo
                    label="Konfirmasi Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    prepend-inner-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="details.password_confirmation"
                    @blur="$v.details.password_confirmation.$touch()"
                    clearable
                    required
                />
                <div v-if="$v.details.password_confirmation.$error">
                    <p v-if="!$v.details.password_confirmation.required" class="text-red mt-m-25">Konfirmasi password harap diisi.</p>
                    <p v-if="!$v.details.password_confirmation.minLength" class="text-red mt-m-25">Konfirmasi password harus sesuai dengan password.</p>
                </div>
                <v-card-actions class="d-flex justify-center align-center pb-3">
                    <template v-if="isSubmitted">
                        <v-btn color="#1976D2" dark large class="ml-2" type="submit" disabled elevation="3">
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
                        <v-btn color="#1976D2" dark large class="ml-2" type="submit" :disabled="$v.$invalid">
                            <v-icon left color="#fff !important">mdi-pencil</v-icon>
                                Sign Up
                        </v-btn>
                    </template>
                </v-card-actions>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        
    </v-card>
</template>
<style>
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgba(0,0,0,0.3) !important;
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
</style>

<script>
import store from "@/store"
import { required, email, minLength } from "vuelidate/lib/validators"

export default {
    name: "Register",

    components: {
    },

    data: () => ({
        indeterminate: true,
        showPassword: false,
        isSubmitted: false,
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
    methods: {
        register(){
            this.isSubmitted = true;
            store.dispatch('auth/fetchRegister', this.details)
            .then(()=> {
                this.$router.push({ name: 'dashboard' })
            })
        }
    }
};
</script>


<style lang="scss" scoped>

.header__login {
    color: #42A5F5;
    text-align: center;
    font-size: 1.5rem;
}

</style>