<template>
    <v-expansion-panels
        :accordion="true"
        :focusable="true"
        :hover="true"
        >
        <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
                <div class="d-flex flex-column">
                    <p class="fs-med">{{transaction.created_at}}</p>
                    <p class="fs-med">{{transaction.transaction_code}}</p>
                </div>
                <span class="text-center">
                    <template v-if="transaction.stated === 4">
                        <!-- using stop cause expansion have event click to if we dont stop it, it will open detail -->
                        <v-chip class="fs-med" color="teal" dark @click.stop="show(transaction.id)">
                            {{ checkTransactionState(transaction.stated) }}
                        </v-chip>
                    </template>
                    <template v-else-if="transaction.stated === 3">
                        <v-chip class="fs-med" color="orange" dark >
                            {{ checkTransactionState(transaction.stated) }}
                        </v-chip>
                    </template>
                    <template v-else>
                        <v-chip class="fs-med">
                            {{ checkTransactionState(transaction.stated) }}
                        </v-chip>
                    </template>
                </span>
                <template v-slot:actions v-if="transaction.stated === 4">
                    <v-icon color="teal">mdi-check</v-icon>
                </template>
                <template v-slot:actions v-else-if="transaction.stated === 3">
                    <v-icon color="orange">mdi-close</v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <div>
                    <h5 class="mb-2 ">Detail Pengambilan</h5>
                    <p class="fs-med">
                        {{transaction.add_info == null || transaction.add_info == '' ? 'Tunggu hingga status siap diambil' : transaction.add_info}}
                    </p>
                </div>
                <div>
                    <h5 class="mb-2">Detail Buku</h5>
                    <div class="d-flex" v-for="detail in transaction.transaction_details" :key="detail.id">
                        <p class="fs-med">{{ detail.details.title }} x </p>
                        <p class="fs-med ml-1">{{ detail.qty }}</p>
                    </div>
                </div>
                
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import store from "@/store"
    export default {
        props : {
            transaction: {
                type: Object
            }
        },
        methods : {
            show(id){
                this.$swal.fire({
                    title: 'Apakah kamu yakin sudah menerima buku yang dipinjam?',
                    icon: 'success',
                    text: 'pastikan buku yang diterima sudah sesuai dengan buku yang dipinjam',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Belum',
                    confirmButtonText: 'Sudah diterima'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(id);
                        store.dispatch('transaction/processBorrow',id)
                        .then(()=> {    
                            this.$swal.fire(
                            'Sukses!',
                            'Buku berhasil pinjam',
                            location.reload()
                            )
                        });
                    }
                });
            },
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