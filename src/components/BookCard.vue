<template>
  <router-link class="home__link" :to="{name: 'book-show', params: {slug: book.slug}}">
    <v-flex xs12 class=" mx-2">
        <v-card
          class="mx-auto card-book"
          max-width="120"
        >
          <v-img
            :src="link(book.cover)"
            height="140px"
            width="90px"
          ></v-img>
          <div class="text-body-2 mt-2 book-title">
            <!-- {{ book.title.slice(0,30) + '...' }} -->
            {{ book.title }}
          </div>
          <div class="text-caption text--disabled d-flex align-center justify-space-between">
            <div class="d-flex align-center review__book pa-1">
              <v-icon color="#fff" size="13px">
                mdi-star
              </v-icon>
              <div class="ml-1 review__number">
                {{ rating(book.reviews) }}
              </div>
            </div>
          </div>
        </v-card>
    </v-flex>
  </router-link>
</template>

<style>
  .card-book {
    line-height: 1.4rem;
    word-break: normal;
    box-shadow: none !important;
  }
  .btn-borrow {
    color: #00005e !important;
    background-attachment: #e2e2e2;
  }
  .book-title {
    min-height: 3.2rem;
  }
  .review__book {
    background: #0a369d;
    width: 2.2rem;
    height: 1.6rem;
    border-radius: 10px;
  }
  .review__number {
    color: #fff;
    font-size: .7rem;
  }
</style>

<script>

  export default {
    data: () => ({

    }),
    props : {
      book : Object
    },
    computed : {
        //...mapGetters('book',['getLinkServer'])
    },
    methods : {
      rating(data){
        var rating = 0;
        var final = 0;

        for(var i = 0; i < data.length; i++){
          rating += parseInt(data[i].rating)
        }
        
        if(rating == 0){
          final = 0;
        }
        else {
          final = Math.round(rating/data.length) 
        }

        return final 
      },
      link(data){
        //const linkImg = this.getLinkServer
        const linkImg = this.$store.state.linkServer

        let imgUrl = data
        let sliceImgUrl = imgUrl.slice(0,5)
        
        if(sliceImgUrl === 'https'){
          return imgUrl
        }
        else {
          return linkImg+imgUrl
        }
      }
    }
  }
</script>