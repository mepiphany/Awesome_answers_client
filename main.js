$(document).ready(function(){
  $.ajax({
    url: "http://localhost:3001/questions.json",
    method: "GET",
    error: function(){
      alert('Please reload!');
    },
    success: function(questions) {
      $("#questions").html("");
      // Fetching the Mustache template for a question listing
      var template = $('#question-listing').html();

      for(var i = 0; i < questions.length; ++i) {

        // Mustache.render takes in a Mustache template and a Javascript object
        // and then generates valid HTML by replacing any variables within {{ }}
        // from the attributes of the object. So if you have {{ title }} it will
        // be replaced with `questions[i].title`
        var renderedHtml = Mustache.render(template, questions[i]);


        $("#questions").append(renderedHtml);
      }
    }
  });
  $("#questions").on("click", "a", function(){
     $.ajax({
       url: "http://localhost:3001/questions/" + $(this).data('id') + ".json",
       method: "GET",
       error: function(){
         alert("failed to load");
       },
       success: function(question){
         console.log(question);
       }
     })
   });
});
