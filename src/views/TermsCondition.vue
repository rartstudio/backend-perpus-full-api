<template>
    <div class="mt-4 pa-4">
        <h2 class="text-center mb-5">Syarat dan Ketentuan</h2>
        <ul>
            <li class="mb-1" v-for="(term,index) in terms" :key="index">{{term}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                terms : [
                    'Sebelum meminjam buku akun pengguna wajib terverifikasi',
                    'Untuk terverifikasi user wajib mengisi profil terlebih dahulu',
                    'Ukuran foto profil maksimal 1mb',
                    'Setelah itu klik verifikasi saya dan tunggu dari admin untuk verifikasi',
                    'Bukti terverifikasi jika ada tanda centang setelah nama user',
                    'Setiap user hanya bisa mengajukan 1 transaksi pinjaman dengan maksimal 2 buku',
                    'Jika ada kesalahan user dapat membatalkannya dengan menekan tombol batalkan peminjaman yang muncul',
                    'Jika buku sudah siap cek detail pengambilannya pada tombol panah bawah',
                    'Lakukan sesuai instruksi yang diinfokan admin',
                    'Jika user sudah menerima buku dari admin, user dapat menekan tombol ready dan mensubmitnya',
                    'Batas peminjaman buku 14 hari',
                    'Untuk pengembalian dapat melakukan hal yang sama dengan instruksi pengambilan',
                    'Sekian dan Terima kasih'
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>