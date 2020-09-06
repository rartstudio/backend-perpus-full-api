<template>
    <v-row class="ml-0 mt-3">
        <v-col cols="6" class="card-column">
            <v-card>
                <v-row>
                    <v-col cols="6" class="card-column">
                        <v-img src="https://picsum.photos/90/110"></v-img>
                    </v-col>
                    <v-col cols="6" class="card-column">
                        <v-card-title class="card-column__title">
                            <p class="text-caption">
                                tesgin
                            </p>
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col cols="6" class="card-column">
            <v-card>
                <v-row>
                    <v-col cols="6" class="card-column">
                        <v-img src="https://picsum.photos/90/110"></v-img>
                    </v-col>
                    <v-col cols="6" class="card-column">
                        <v-card-title>
                            <p class="text-caption">
                                tesgin
                            </p>
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
      </v-row>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">

.v-card {
  margin-left: 30px;
}

.card-column {
  padding : 0px !important;

  &__title {
    padding: 10px 0px 0px 10px !important;
  }
}

</style>