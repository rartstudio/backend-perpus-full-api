<template>
    <v-card class="mt-10 mx-4">
        <v-card-title class="mb-4 justify-center">
            <h1 class="header__login">Member Login</h1>
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form>
                <v-text-field
                    solo
                    prepend-inner-icon="mdi-email-outline"
                    label="Email"
                />
                <v-text-field
                    solo
                    label="Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    prepend-inner-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                />
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <router-link to="/register" class="btn-form">
                <v-btn color="#1976D2" dark large class="ml-2">
                    <v-icon left>mdi-pencil</v-icon>
                    Sign Up
                </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn color="#42A5F5" dark large outlined class="mr-2 btn-form">
                <v-icon left>mdi-arrow-right</v-icon>
                    Log In
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<style>
    .btn-form{
        width: 135px;
    }
</style>

<script>
export default {
  name: "Login",

  components: {
  },

  data: () => ({
    showPassword: false
  })
};
</script>


<style lang="scss" scoped>

.header__login {
    color: #42A5F5;
    text-align: center;
    font-size: 1.5rem;
}

</style>