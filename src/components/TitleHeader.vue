<template>
    <div class="d-flex justify-space-between mt-5">
      <div class="mb-4 pl-4">
        <h3 class="font-weight-bold mt-1">
            <span class="color-title"><slot name="title"></slot></span> 
            <span class="color-subtitle"><slot name="subtitle"></slot></span>
        </h3>
      </div>

      <div class="mb-4 pl-4">
        <slot name="button-side"></slot>
      </div>
    </div>
</template>
<style>
.color-title {
    color: #0a369d;
}
.color-subtitle {
    color: #9191ff;
}
</style>