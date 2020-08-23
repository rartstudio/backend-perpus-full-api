<template>
    <v-carousel
        cycle
        height="150"
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        class="mt-8 px-4"
    >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
        >
            <v-sheet
                :color="colors[i]"
                height="100%"
            >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <div class="display-3">{{ slide }}</div>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>


<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          '',
          '',
          '',
          '',
          '',
        ],
      }
    },
  }
</script>