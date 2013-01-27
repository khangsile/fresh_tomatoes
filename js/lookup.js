function lookup(query) {
    var API_KEY = "qbqf3mzakee76b8xn7qwhw8q";
    var req = new XMLHttpRequest();
    
    console.log("Made it here");
    req.open("GET", 
	     "http://api.rottentomatoes.com/api/public/v1.0/movies.json?" + 
	     "apikey=" + API_KEY + 
	     "&q="+ query + 
	     "&page_limit=1",
	     true);

    req.onreadystatechange = function() {
	if (req.status == 200  & req.readyState == 4) {
	    var resp = req.responseText;
	    var obj = jQuery.parseJSON(resp);
	    var movie = obj.movies[0];
	    var ratings = movie.ratings;
	    console.log("How about here");
	    
	    $(document.body).append("<div id='movie'>" + 
				    movie.title + "-------------------------" +
				    ratings.critics_rating + "-" + 
				    ratings.critics_score + 
				    "</div>");
	}
    }

    req.send();
}

$( document ).ready(function() {
	$( '#searchSub' ).click(function() {
		q = $( '#query' ).val();
		lookup(q);
	    });
    });