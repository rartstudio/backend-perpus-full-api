<template>
    <v-expansion-panels>
        <v-card
            elevation="2"
            shaped
            width="88%"
            class="my-2"
        >
            <v-card-title class="text-body-1 font-weight-bold">
                {{transaction.transaction_code}}
            </v-card-title>
            <v-card-text class="text-body-2">
                <template v-if="transaction.stated === 5">
                    <p>Batas Pengembalian</p>
                    {{ transaction.returned_at }}
                </template>
                <template v-else>
                    {{ transaction.created_at }}
                </template>
            </v-card-text>
            <v-card-actions>
                <template v-if="transaction.stated === 4">
                <!-- using stop cause expansion have event click to if we dont stop it, it will open detail -->
                    <v-chip class="fs-med" color="teal" dark @click.stop="accept(transaction.id)">
                        {{ checkTransactionState(transaction.stated) }}
                    </v-chip>
                    <v-chip class="fs-med ml-3" color="red" dark @click.stop="reject(transaction.id)">
                        Batalkan Peminjaman
                    </v-chip>
                </template>
                <template v-else-if="transaction.stated === 3">
                    <v-chip class="fs-med" color="red" dark >
                        {{ checkTransactionState(transaction.stated) }}
                    </v-chip>
                </template>
                <template v-else-if="transaction.stated === 2">
                    <v-chip class="fs-med" color="#0a369d" dark >
                        {{ checkTransactionState(transaction.stated) }}
                    </v-chip>
                    <v-chip class="fs-med ml-3" color="red" dark @click.stop="reject(transaction.id)">
                        Batalkan Peminjaman
                    </v-chip>
                </template>
                <template v-else-if="transaction.stated === 5">
                    <v-chip class="fs-med" color="#FFCB36">
                        {{ checkTransactionState(transaction.stated) }}
                    </v-chip>
                    <template v-if="transaction.is_late == '0 hari'">
                        <v-chip class="fs-med ml-2" color="red" dark>
                            Telat
                        </v-chip>
                    </template>
                    <template v-else>
                        <v-chip class="fs-med ml-2" color="#3285C0" dark>
                            {{ transaction.is_late}}
                        </v-chip>
                    </template>
                </template>
                <template v-else>
                     <v-chip class="fs-med" color="#0a369d" dark>
                        {{ checkTransactionState(transaction.stated) }}
                    </v-chip>
                </template>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    @click="detail = !detail"
                    >
                        <v-icon>{{ detail ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="detail">
                    <v-divider></v-divider>
                    <template v-if="transaction.stated == 4">
                        <v-card class="pa-4 elevation-0">
                            <h5 class="mb-2 text-body-1 font-weight-bold">Detail Pengambilan</h5>
                            <p class="fs-med">
                                {{transaction.add_info == null || transaction.add_info == '' ? 'Tunggu hingga status siap diambil' : transaction.add_info}}
                            </p>
                        </v-card>
                    </template>
                    <template v-if="transaction.stated == 5">
                        <v-card class="pa-4 elevation-0">
                            <h5 class="mb-2 text-body-1 font-weight-bold">Detail Pengambilan</h5>
                            <p class="fs-med">
                                {{transaction.add_info == null || transaction.add_info == '' ? 'Tunggu hingga status siap diambil' : transaction.add_info}}
                            </p>
                        </v-card>
                    </template>
                    <v-card class="pa-4 elevation-0">
                        <h5 class="mb-2 text-body-1 font-weight-bold">Detail Buku</h5>
                        <div class="d-flex mb-2" v-for="detail in transaction.transaction_details" :key="detail.id">
                            <img :src="link(detail.details.cover)" width="55px" height="80px">
                            <v-card-title class="text-body-1">{{ detail.details.title }}</v-card-title>
                        </div>
                    </v-card>
                </div>
            </v-expand-transition>
        </v-card>
    </v-expansion-panels>
</template>

<script>
import {bookMixin} from "@/mixins/bookMixin.js";
import store from "@/store"
export default {
    mixins: [bookMixin],
    data (){
        return {
            detail: false
        }
    },
    props : {
        transaction: {
            type: Object
        }
    },
    methods : {
        async reject(id){
            const { value: add_info } = await this.$swal.fire({
                title: 'Kenapa yah dibatalin ?',
                input: 'textarea',
                inputPlaceholder: 'Type your message here...',
                inputAttributes: {
                    'aria-label': 'Type your message here'
                },
                showCancelButton: true
                })

                if (add_info) {
                    let rejectData = {
                        add_info,
                        id
                    } 
                    store.dispatch('transaction/rejectBorrow',rejectData)
                    .then(()=> {    
                        this.$swal.fire(
                        'Sukses!',
                        'Pembatalan pinjaman buku berhasil',
                        location.reload()    
                        )
                    });
                }
        },
        accept(id){
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
            if (data == 7){
                return 'Dibatalkan Member'
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>