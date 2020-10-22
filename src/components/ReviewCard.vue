<template>
    <div class="d-flex review-card pl-4 mb-5 elevation-1 py-4 mx-4 mt-4">
        <div class="review-card__image flex-grow-0 mr-3">
            <v-img class="rounded" width="80px" height="100px" :src="link(book.details.cover)"></v-img>
        </div>
        <div class="review-card__title flex-grow-1">
            <p class="text-body-1 font-weight-semibold">
                {{book.details.title}}
            </p>
        </div>
        <v-btn color="#ffcb36" dark class="review-card__btn my-auto" @click.stop="addReview(book.book_id)">
            <v-icon>ri ri-add-line</v-icon>
        </v-btn>
    </div>
</template>

<script>
import {bookMixin} from "@/mixins/bookMixin.js";
import store from "@/store";
export default {
    mixins: [bookMixin],
    name: "review-card",
    props : {
        book : {
            type: Object
        }
    },
    methods: {
        async addReview(id){
            const {value : formValues} = await this.$swal.fire({
                title: 'Review Buku',
                icon: 'success',
                text: 'Tulis review anda',
                html : 
                `
                <div class="form-review">
                    <label for="swal-input1" class="label-input">Nilai</label>
                    <select id="swal-input1" class="swal-input2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                `+
                `
                <div class="form-review">
                    <label for="swal-input2" class="label-input">Ulasan</label>
                    <textarea id="swal-input2" class="swal-input2" rows="5" cols="30"></textarea>
                </div>
                `,
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
            //check formValues if exist
            if(formValues){
                //destructuring and set book_id
                let data = {
                    //destructuring values (default array)
                    ...formValues,
                    book_id : id
                }

                store.dispatch('user/submitReview',data)
                    .then(()=> {
                        this.$swal.fire(
                            'Sukses!',
                            'Submit Review Berhasil',
                            // location.reload()
                        )
                    })
            }
        }
    }
}
</script>

<style lang="scss">
.review-card__btn {
	min-width: 40px !important;
	height: 40px !important;
}
.form-review {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:10px ;
}
.swal-input2 {
    padding:10px;
    display: block;
}
.label-input{
    margin-bottom: 8px;
}
select.swal-input2,
textarea.swal-input2{
    border: 1px solid #cdcdcd;
}
select.swal-input2 {
    appearance: menulist;
}
</style>