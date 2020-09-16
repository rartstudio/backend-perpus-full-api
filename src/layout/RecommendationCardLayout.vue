<template>
    <div class="recommendation-book d-flex mt-0">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">
.recommendation-book {
    overflow-x: auto;
    overflow-y: hidden;
    height: 140px;
}
</style>