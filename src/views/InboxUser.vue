<template>
  <div>
    <template v-if="messages.length == 0">
    <div class="text-center mt-50">
      <img src="../assets/empty-inbox.svg" alt="" width="200px" />
      <p class="font-weight-bold">Kotak pesan masih kosong</p>
    </div>
    </template>
    <template v-else>
      <div class="pa-4 mt-2">
        <h3 class="text-center mb-2" style="color:#0a369d">Kotak Pesan</h3>
        <v-chip
          class="mb-4"
          color="#3285C0"
          dark
        >
          Terakhir
        </v-chip>
        <v-card
          elevation="2"
          outlined
          class="mb-3"
          v-for="message in messages"
          :key="message.id"
          >
          <v-card-title class="inbox-user__title">{{ message.header }}</v-card-title>
          <v-card-subtitle class="inbox-user__subtitle">AdminPerpus@gkkb.com | {{ message.created_at }}</v-card-subtitle>
          <v-card-text>{{ message.message}}</v-card-text>
          <v-card-actions class="pt-0 justify-space-between">
            <template v-if="message.is_read == 0">
              <v-btn elevation="0" color="#FFCB36" text class="pa-1" @click="readMessage(message.id)">
                Read
              </v-btn>
            </template>
            <template v-else>
              <v-btn elevation="0" color="#FFCB36" text class="pa-1">
                <v-icon class="mr-2">ri ri-check-line</v-icon>
                Read
              </v-btn>
              <p class="text-caption mt-2">
                {{ message.updated_at }}
              </p>
            </template>
          </v-card-actions>
        </v-card>
      </div>
    </template>
  </div>
</template>

<script>
  import store from "@/store";
  
  export default {
    created(){
      store.dispatch('message/fetchMessages')
    },
    methods: {
      readMessage(id){
        store.dispatch('message/readMessage',id)
        .then(() => {
            if(this.$store.state.message.status == 200) {
              location.reload()
            }
          }
        )
      }
    },
    computed : {
      messages () {
        return this.$store.state.message.messages
      }
    }
  }
</script>

<style lang="scss" scoped>
.mt-50 {
    margin-top: 70px;
}
.inbox-user {
  &__title {
    font-size: 1rem;
  }
  &__subtitle {
    font-size: 0.8rem;
  }
}
</style>