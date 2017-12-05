$( document ).ready(function() {
    json.init();

})

var json = {


    init: function() {

        $.ajax("/src/json/movies.json", function(data){
            type: "get"

        }).done(function(data){

            var movies_object = JSON5.parse(data);

            slider.init(movies_object);

        })
    }
}

var slider = {


    init: function(movies){

        for(var i =0; i < movies.length ; i++){
            var movie = movies[i];

            $(".slider").loadTemplate($("#slider-template"),{

                poster : movie.Poster

            }, {

                append: true

            });
        }

    },
    create: function(){
        $('.slider').slick({
            infinte: true,
        });
    }
}
