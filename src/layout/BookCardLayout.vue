<template>
    <div class="collection-book d-flex mt-0 max-height-180 ml-2 mr-2">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">

.collection-book {
    overflow-x: auto;
    overflow-y: hidden;
    min-height: 280px;
}

.max-height-180 {
    max-height: 180px;
}
</style>