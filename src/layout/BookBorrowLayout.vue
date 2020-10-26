<template>
    <div class="collection-book d-flex mt-0 ml-2 mr-2">
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
    min-height: 230px;
}
</style>