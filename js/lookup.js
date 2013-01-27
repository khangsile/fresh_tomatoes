function lookup(query) {
    var API_KEY = "qbqf3mzakee76b8xn7qwhw8q";
    var url = "www.rottentomatoes.com/m/"
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
	    var crating = 'Not Rated', cscore = '??';

	    if (ratings.critics_rating != null)
		crating = ratings.critics_rating;
	    if (ratings.critics_score >= 0)
		cscore = ratings.critics_score;
	    

	    $(document.body).append("<div id='movie'>" + 
				    "<a href = '#' onclick='seePage()' " +
				    "name='" + 
				    movie.title.replace(/ /g, '_')
				    +  "'>" +
				    movie.title + "</a>" + 
				    " ("+
				    crating + " - " + 
				    cscore + ")" +
				    "</div>");
	    setClick(movie.title.replace(/ /g, '_'));
	}
    }
    

    req.send();
}

function setClick(movie) {
    $(document).ready(function() {
	    $('a[name='+ movie + ']').click(function() {
		    movie = movie.replace(/:/g, '').replace(/-/g, '');
		    var url = "http://www.rottentomatoes.com/m/" + movie + "/";
		    chrome.tabs.create({url: url});
		});
	});
}


$( document ).ready(function() {
	$( '#searchsub' ).click(function() {
		getQuery();
	    });
	$(function() {
		$('#query').keypress(function (e) {
			if (e.which==13 || e.keyCode==13) {
			    getQuery();
			}
		    });
	    });
});

function getQuery() {
    q = $( '#query' ).val();
    $( '#query' ).val('');
    lookup(q);
}