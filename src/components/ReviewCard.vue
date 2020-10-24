<template>
    <div class="d-flex justify-start pl-2 mb-5 elevation-1 py-2 mx-4 rounded-lg">
        <div class="flex-grow-0">
            <v-img width="45px" height="60px" :src="link(review.book.cover)"></v-img>
        </div>
        <div class="d-flex flex-column justify-start ml-2 flex-grow-1">
            <h5 class="font-weight-medium text-body-2">{{review.book.title}}</h5>
            <p class="text-body-2 mt-2">{{review.comment}}</p>
            <div class="d-flex">
                <v-icon color="#FFCB36" size="13px" v-for="(star,index) in inFive" :key="index">
                mdi-star {{ star }}
            </v-icon>
            <v-icon class="icon-star" v-for="(star,index) in notFive" :key="index">ri ri-star-line {{star}}</v-icon>
            </div>
        </div>
        <div class="d-flex flex-column">
            <v-btn @click.stop="deleteReview(review.id)" class="review-card__btn my-auto rounded-circle" color="#f4a599">
                <v-icon class="review-icon">ri ri-delete-bin-7-line</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import {bookMixin} from "@/mixins/bookMixin.js";
import store from "@/store";
    export default {
        mixins: [bookMixin],
        name: "user-review-card",
        props : {
            review : {
                type: Object
            }
        },
        computed : {
            notFive(){    
                let allStar = 5
                let leftStar = allStar - this.review.rating
                return leftStar
            },
            inFive(){
                return this.review.rating
            }
        },
        methods: {
            deleteReview(id){
                this.$swal.fire({
                title: 'Apakah kamu yakin akan menghapus ulasan ini?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Tidak',
                confirmButtonText: 'Ya'
                }).then((result) => {
                    if (result.isConfirmed) {
                        store.dispatch('user/processDeleteReview',id)
                        .then(()=> {    
                            this.$swal.fire(
                            'Sukses!',
                            'Berhasil hapus ulasan',
                            location.reload()    
                            )
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
.review-card__btn {
	min-width: 32px !important;
	height: 32px !important;
    padding: 0 8px !important;
    margin-right: 1rem;
}
.review-icon {
    font-size: 16px !important;
}
</style>