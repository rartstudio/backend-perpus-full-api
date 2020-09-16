<template>
    <v-expansion-panels
        :accordion="true"
        :focusable="true"
        :hover="true"
        >
        <v-expansion-panel
            
        >
            <v-expansion-panel-header>
                <div class="d-flex flex-column">
                    <p class="text-body-1">{{transaction.created_at}}</p>
                    <p class="text-body-2">{{transaction.transaction_code}}</p>
                </div>
                <span class="text-center">
                    <v-chip>
                        {{ checkTransactionState(transaction.stated) }}
                    </v-chip>
                </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-for="detail in transaction.transaction_details" :key="detail.id">
                <div class="d-flex mt-7">
                    <p>{{ detail.details.title }}</p> x 
                     <p>{{ detail.qty }}</p>
                </div>
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