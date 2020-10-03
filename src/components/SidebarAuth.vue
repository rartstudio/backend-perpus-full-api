<template>
    <v-list-item-group>
        <router-link to="/dashboard" text class="sidebar__link">
            <v-list-item>
                <v-list-item-icon>
                    <i class="ri ri-home-2-line" style="font-size: 24px"></i>
                </v-list-item-icon>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
        </router-link>
        <router-link to="/inbox">
            <v-list-item class="w-85">
                <v-list-item-icon>
                    <i class="ri ri-mail-line" style="font-size: 24px"></i>
                </v-list-item-icon>
                <v-list-item-title>Kotak Masuk</v-list-item-title>
                <v-badge bordered overlap content="10" class="mt-n1"></v-badge>
            </v-list-item>
        </router-link>
        <div class="text-center mt-4">
            <v-btn color=#0a369d dark large @click="logout">
                <v-icon>mdi-logout-variant</v-icon>
                <span class="ml-2">Logout</span>
            </v-btn>
        </div>
    </v-list-item-group>
</template>

<script>
    import store from "@/store"
    export default {
        methods: {
            logout(){
            store.dispatch('auth/fetchLogout')
                .then(()=>{
                    //get item from local storage
                    const token = localStorage.getItem('usacco')
                    const user = localStorage.getItem('user')

                    if(token.length != 0 && user.length != 0){
                        //remove item from local storage
                        localStorage.removeItem('usacco')
                        localStorage.removeItem('user')
                        localStorage.removeItem('borrow')
                        localStorage.removeItem('history')
                        localStorage.removeItem('process')
                        
                        //reload page after delete local storage cause 
                        //without reload page broken              
                        location.reload()
                    }
                })
            }
        },
    }
</script>

<style lang="scss">
.v-list-item__icon {
    margin-top: 6px !important;
    margin-bottom: 6px !important;
}
.w-85 {
    width: 85% !important;
}
</style>