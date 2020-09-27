<template>
    <v-row class="mt-m-25 user-width">
        <v-col cols="12" class="no-padding-top no-padding-right no-padding-left ">
            <v-tabs background-color="#3285C0" dark v-model="tab" class="d-flex justify-center border-rad-8">
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

<style lang="scss">
.w-85 {
    width: 85%;
}
.border-rad-sm{
    border-radius: 8px;
}
.no-padding-top {
    padding-top: 0px !important;
}
.no-padding-right {
    padding-right: 0px !important;
}
.no-padding-left {
    padding-left: 0px !important;
}
</style>