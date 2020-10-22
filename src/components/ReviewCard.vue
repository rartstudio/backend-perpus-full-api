<template>
    <div class="d-flex review-card">
        <div class="review-card__image flex-grow-0">
            <v-img width="80px" height="100px" :src="book.details.image"></v-img>
        </div>
        <div class="review-card__title">
            <p class="text-body-1 font-weight-semibold">
                book.details.title
            </p>
        </div>
        <v-btn color="#ffcb36" dark class="review-card__btn" @click="addReview(book.book_id)">
            <v-icon>ri ri-add-line</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "review-card",
        methods: {
            async addReview(id){
                const {value : formValues} = this.$swal.fire({
                    title: 'Review Buku',
                    icon: 'success',
                    text: 'Tulis review anda',
                    html : 
                    '<select id="swal-input1" class="swal-input2"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5>/option></select>'+
                    '<textarea id="swal-input2" class="swal-input2"></textarea>',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Batal',
                    confirmButtonText: 'Submit',
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value
                        ]
                    }
                })
                if(formValues){
                    console.log(formValues)
                    let reviewData = {
                        ...formValues,
                        book_id : id
                    }
                    console.log(reviewData)
                    
                    store.dispatch('user/submitReview',reviewData)
                        .then(()=> {
                            this.$swal.fire(
                                'Sukses!',
                                'Submit Review Berhasil',
                                location.reload()
                            )
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.review-card__btn {
	min-width: 40px !important;
	height: 40px !important;
}
</style>