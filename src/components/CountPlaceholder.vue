<template>
    <div>
        <div class="d-flex justify-center white rounded-lg elevation-2 statistic">
            <div class="px-4 py-2 item-box d-flex justify-center align-center flex-column">
                <span class="statistic__count">2</span>
                <p class="statistic__title">Pinjam</p>
            </div>
            <div class="px-4 py-2 item-box d-flex justify-center align-center flex-column">
                <span class="statistic__count">998</span>
                <p class="statistic__title">Riwayat</p>
            </div>
            <div class="px-4 py-2 item-box d-flex justify-center align-center flex-column">
                <span class="statistic__count">1000</span>
                <p class="statistic__title">Total</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : "Count-Placeholder"
    }
</script>

<style lang="scss">
.statistic {
    width: 55%;
    margin: 0px auto;
    margin-top: -30px;

    &__count {
        font-weight: 900;
        color: #0a369d;
    }
}

p.statistic__title {
    color: #9191ff;
    font-size: .8rem;
    margin-bottom: 0px !important;
}
</style>