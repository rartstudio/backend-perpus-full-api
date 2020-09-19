<template>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="#ca0b64"
        top="top"
        >
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
            <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    export default {
        data(){
            return {
                snackbar: true,
                timeout: 3500,
            }
        },
        props : {
            snackbarText : {
                type : String
            },
            
        }
    }
</script>

<style lang="scss" scoped>

</style>