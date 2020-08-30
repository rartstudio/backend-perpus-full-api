<template>
    <v-card class="mt-10 mx-4">
        <v-card-title class="mb-4 justify-center">
            <h1 class="header__login">Member Sign Up</h1>
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form @submit.prevent="register">
                <v-text-field
                    solo
                    prepend-inner-icon="mdi-account-circle-outline"
                    label="Nama"
                    v-model="name"
                />
                <v-text-field
                    solo
                    prepend-inner-icon="mdi-email-outline"
                    label="Email"
                    v-model="email"
                />
                <v-text-field
                    solo
                    label="Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    prepend-inner-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="password"
                />
                <v-text-field
                    solo
                    label="Konfirmasi Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    prepend-inner-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="password_confirm"
                />
                <v-card-actions class="d-flex justify-center align-center pb-3">
                    <v-btn color="#1976D2" dark large class="ml-2" type="submit">
                        <v-icon left>mdi-pencil</v-icon>
                            Sign Up
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        
    </v-card>
</template>

<script>
export default {
    name: "Register",

    components: {
    },

    data: () => ({
        showPassword: false,
        name : '',
        email : '',
        password : '',
        password_confirm: '',
    }),
    methods: {
        register() {
            console.log('ini adalah nama '+ this.name + 'email' + this.email + 'password'+ this.password+ 'password_confirm' + this.password_confirm);
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