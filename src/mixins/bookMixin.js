export const bookMixin = {
    methods: {
        link(data){
            const linkImg = this.$store.state.linkServer

            let imgUrl = data
            let sliceImgUrl = imgUrl.slice(0,5)
            
            if(sliceImgUrl === 'https'){
                return imgUrl
            }
            else {
                return linkImg+imgUrl
            }
        },
        // rating(data){
        //     var rating = 0;
        //     var final = 0;

        //     for(var i = 0; i < data.length; i++){
        //         rating += parseInt(data[i].rating)
        //     }
            
        //     if(rating == 0){
        //         final = 0;
        //     }
        //     else {
        //         final = Math.round(rating/data.length) 
        //     }

        //     this.rates = final;

        //     return final
        // },
    }
}