<template>
    <v-row class="mt-m-120 user-width">
        <v-col cols="12" class="no-padding-top no-padding-right no-padding-left">
            <v-tabs background-color="#0a369d" dark v-model="tab">
                <v-tab
                    v-for="item in items"
                    :key = "item.tab"
                    >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item
                    >
                        <TransactionCard v-for="transaction in process" :key="transaction.id" :transaction="transaction"/>
                </v-tab-item>
                <v-tab-item
                    >
                        <TransactionCard v-for="transaction in borrow" :key="transaction.id" :transaction="transaction"/>
                </v-tab-item>
                <v-tab-item
                    >
                        <TransactionCard v-for="transaction in history" :key="transaction.id" :transaction="transaction"/>
                </v-tab-item>
            </v-tabs-items>
        </v-col>
    </v-row>
</template>

<script>
    import TransactionCard from "@/components/TransactionCard.vue";
    export default {
        data() {
            return {
                tab: null,
                items : [
                    {tab : 'Proses'},
                    {tab : 'Pinjam'},
                    {tab : 'Riwayat'},
                ]
            }
        },
        components : {
            TransactionCard
        },
        computed: {
            process : {
                get() {
                    return this.$store.state.user.transactionsInProcess
                }
            },
            borrow : {
                get() {
                    return this.$store.state.user.transactionsInBorrow
                }
            },
            history: {
                get(){
                    return this.$store.state.user.transactionsInHistory
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>