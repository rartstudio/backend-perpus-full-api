<template>
    <div class="d-flex review-card pl-2 mb-5 elevation-1 py-2 mx-4">
        <div class="review-card__image flex-grow-0 mr-3">
            <v-img class="rounded-sm" width="45px" height="60px" :src="link(book.details.cover)"></v-img>
        </div>
        <div class="review-card__title flex-grow-1">
            <p class="text-body-2 font-weight-medium">
                {{book.details.title}}
            </p>
            <div class="d-flex">
                <v-icon class="icon-star" v-for="(star,index) in notFive" :key="index">ri ri-star-line {{star}}</v-icon>
            </div>
        </div>
        <v-btn class="review-card__btn my-auto rounded-circle" @click.stop="addReview(book.book_id)" color="#acf">
            <v-icon class="review-icon">ri ri-add-line</v-icon>
        </v-btn>
    </div>
</template>

<script>
import {bookMixin} from "@/mixins/bookMixin.js";
import store from "@/store";
export default {
    mixins: [bookMixin],
    name: "user-review-card",
    props : {
        book : {
            type: Object
        }
    },
    computed : {
        notFive(){
            return 5
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
                            location.reload()
                        )
                    })
            }
        }
    }
}
</script>

<style lang="scss">
.icon-star.v-icon{
    color: rgba(0, 0, 0, 0.2);
}
.review-icon {
    font-size: 16px !important;
}
.review-card__btn {
	min-width: 32px !important;
	height: 32px !important;
    padding: 0 8px !important;
    margin-right: 1rem;
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