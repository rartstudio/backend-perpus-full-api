<template>
    <div class="d-flex justify-space-between mt-8">
      <div class="mb-4 pl-4 text-h6 heading-book">
        <slot name="header"></slot>
      </div>
      <v-btn icon>
        <slot name="icon"></slot>
      </v-btn>
    </div>
</template>