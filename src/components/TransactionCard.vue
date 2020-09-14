<template>
    <v-expansion-panels
        :accordion="true"
        :focusable="true"
        :hover="true"
        >
        <v-expansion-panel
            
        >
            <v-expansion-panel-header>{{transaction.transaction_code}}
                <span class="text-center">
                    <v-chip>
                        {{ checkTransactionState(transaction.state) }}
                    </v-chip>
                </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-for="detail in transaction.transaction_details" :key="detail.id">
                {{ detail.details.title }}
                {{ detail.qty }}
                <span></span>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    export default {
        props : {
            transaction: {
                type: Object
            }
        },
        methods : {
            checkTransactionState (data) {
                if (data == 1){
                    return 'Menunggu'
                }
                if (data == 2){
                    return 'Diterima'
                }
                if (data == 3){
                    return 'Ditolak'
                }
                if (data == 4){
                    return 'Siap diambil'
                }
                if (data == 5){
                    return 'Sedang dipinjam'
                }
                if (data == 6){
                    return 'Sudah dikembalikan'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>