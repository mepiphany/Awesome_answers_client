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
        // fetch the template
        var template = $("#question-details").html();
        // Use the template to generate HTML
        var renderedHtml = Mustache.render(template, question);
        // Insert the HTML on the page
        $("#question-details-container").html(renderedHtml);
        $("#question-details-container").hide();
        $("#questions").fadeOut(400, function(){
          $("#question-details-container").fadeIn(400);
        });
      }
    })
  });

  $("#question-details-container").on("click", "#back", function(){
    $("#question-details-container").fadeOut(400, function(){
      $("#questions").fadeIn(400);
    });
  });

  $("#question-details-container").on("click", "#show-answers", function(){
    var questionId = $(this).data("q-id");
    $.ajax({
      url: "http://localhost:3001/questions/" + questionId + "/answers.json",
      method: "GET",
      error: function(){
        alert("failed to load answers");
      },
      success: function(answers) {
        var template = $("#answer").html();
        for(var i = 0; i < answers.length; ++i) {
          var renderedHtml = Mustache.render(template, answers[i]);
          $("#answers-container").append(renderedHtml);
        }
        $("#show-answers").slideUp();
      }
    });
  });



});
