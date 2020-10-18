<template>
    <div class="d-flex justify-space-between mt-8">
      <div class="mb-4 pl-4 text-h6 heading-book">
        <slot name="header"></slot>
      </div>
      <div class="mb-4 pl-4">
        <slot name="button-side"></slot>
      </div>
    </div>
</template>