document.addEventListener("DOMContentLoaded", function(){
    json.init();
    feature.init(meta_array)
    slider.init(meta_array);


})

var meta_array = ['year', 'rated', 'released', 'runtime', 'genre', 'director', 'writer', 'actors', 'plot', 'language', 'country', 'awards', 'metascore', 'rating', 'votes', 'dvd', 'boxoffice', 'production'];

var json = {


    init: function() {

        $.ajax("/src/json/movies.json", function(data){
            type: "get"

        }).done(function(data){

            var movies_object = JSON5.parse(data);

            slider.populate(movies_object);
            filter.genres(movies_object);

        })
    }
}
var filter = {

    genres: function(movies){

        var genre_arr = [];
        var uniqueGenre= [];
        for(var i =0; i < movies.length ; i++){

            var movie = movies[i];
            var genres = movie.Genre.split(/\s*,\s*/);
            genre_arr.push(genres);
            var merged = [].concat.apply([], genre_arr);

            $.each(merged, function(i, el){

                if($.inArray(el, uniqueGenre) === -1) uniqueGenre.push(el);

            });

            uniqueGenre.sort();
            if(i === movies.length - 1) {
                filter.populate(uniqueGenre);

            }
        }
    },
    populate: function(uniqueGenre) {
        for(var i=0; i < uniqueGenre.length; i++) {
            var genre = uniqueGenre[i];
            var mhtml = '<option value="' + genre + '">' + genre + '</option>';
            $('#filter-movies').append(mhtml);
        }
    }
}

var slider = {

    init: function(meta) {

        for(var i =0; i < meta.length ; i++){

            var movie_meta = meta[i];
            var mhtml = '<div class="movie-info" data="' + movie_meta + '" data-content="'+ movie_meta +'"></div>';
            var template = $('#slider-template').html();

            $('#slider-template .movie-data').append(mhtml);
            // console.log(that);
        }
    },


    populate: function(movies){

        for(var i =0; i < movies.length ; i++){

            var movie = movies[i];
            // console.log(movie.Genre.replace(/,/g, ' '));


            $(".slider").loadTemplate($("#slider-template"),{

                poster     : movie.Poster,
                title      : movie.Title,
                year       : movie.Year,
                rated      : movie.Rated,
                released   : movie.Released,
                runtime    : movie.Runtime,
                genre      : movie.Genre,
                genres     : movie.Genre.replace(/,/g, ' '),
                director   : movie.Director,
                writer     : movie.Writer,
                actors     : movie.Actors,
                plot       : movie.Plot,
                language   : movie.Language,
                country    : movie.Country,
                awards     : movie.awards,
                metascore  : movie.Metascore,
                rating     : movie.Rating,
                votes      : movie.Votes,
                id         : movie.Id,
                type       : movie.Type,
                dvd        : movie.DVD,
                boxoffice  : movie.BoxOffice,
                production : movie.Production,
                website    : movie.Website


            }, {

                append: true

            });
            if(i === movies.length - 1) {

                slider.create();
                feature.select();
                $('.slider .slide:first-child').click();

            }
        }

    },
    create: function(){
        var $carousel = $('.slider').slick({
            infinte: true,
            slidesToShow: 6,
            arrows: true,
            prevArrow: $('.prev'),
            nextArrow: $('.next'),
            responsive: [
                {
                    breakpoint: 1200,
                      settings: {
                        slidesToShow: 5,

                    }
                },
                {
                    breakpoint: 1000,
                      settings: {
                        slidesToShow: 4,


                    }
                },
                {
                    breakpoint: 780,
                      settings: {
                        slidesToShow: 2,
                        centerMode: true,
                        // centerPadding: '50px',
                    }
                },
                {
                    breakpoint: 520,
                      settings: {
                        slidesToShow: 2,
                        // centerMode: true,
                        // centerPadding: '30px',
                    }
                }
            ]
        });
        $('#filter-movies').on('change', function(event){

            var select = $(this).val();

            if(select === 'All') {
                $carousel.slick('slickUnfilter');
            }else {
                $carousel.slick('slickUnfilter');
                $carousel.slick('slickFilter', '.'+select);
            }

        })

    }

}
var feature = {

    init: function(meta) {
        for(var i =0; i < meta.length ; i++){

            var movie_meta = meta[i];

            var mhtml = '<div class="meta-title ' + movie_meta + '">' + movie_meta + ': <span class="meta-content feature-' + movie_meta + '"></span></div>'

            $('.feature-data').append(mhtml);

        }

    },

    select: function() {

        var hiddenTerms = ['N/A'];

        $('.slide').on('click', function(){
            var img = $(this).find('.slide-poster').attr('src');

            $('.feature-image').attr('src', img);
            $(this).find('.movie-info').each(function(){
                var attr = $(this).attr("data");

                var content = $(this).html();
                if (hiddenTerms.indexOf(content) > -1) {
                    $('.feature-data').find('.feature-'+attr).html('');
                }else {
                    if(attr === 'title') {
                        $('.feature-title').html(content);
                    }else {
                        $('.feature-data').find('.feature-'+attr).html(content);
                    }
                }

            });
        })
    }
}
