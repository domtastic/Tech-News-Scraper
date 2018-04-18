$(document).on("click", '#savedButton', function(event) {
  event.preventDefault()
  var articleId = $(this).attr('data-articleId')
  var articleLink = $(this).attr('data-articleLink')
  var articleImg = $(this).attr('data-articleImg')
  var articleTitle = $(this).attr('data-articleTitle')
  console.log(articleId);
  console.log(articleLink);
  console.log(articleTitle);
  console.log(articleImg);
  var data = {
    title: articleTitle,
    img: articleImg,
    link: articleLink
  }
  $.post(`/saved/${articleId}`, data ).then((res) => {
    console.log(res);
  })


})
//for opening modal
// $(`#allComments-${articleId}`).empty()
// $.get(`headlines/${articleId}`).then((res) => {
//   res.forEach(article => {
    
//   });
// })

$(document).on("click", '#commentButton', function (event) {
  event.preventDefault()
  const articleId = $(this).attr('data-articleId')
  console.log(articleId);

  const comment = $(`#commentInput-${articleId}`).val()
  console.log(comment);
  const data = {
    title: comment
  };

  $.post(`/createNote/${articleId}`, data).then(function (res) {
      console.log(res);
      
      $.get(`/headlines/${articleId}`).then((res) => {
        $(`#allComments-${articleId}`).empty();
        console.log(res);
        res.notes.forEach(headline => {
          console.log(headline);
          var comment = $(`<p>${headline.title}</p><hr>`);
          $(`#allComments-${articleId}`).append(comment);
        });
      }).then($(`#commentInput-${articleId}`).val(""));
  })  
})

$(document).on("show.bs.modal", ".bd-example-modal-lg",  function (e) {
  console.log($(this));
  const articleId = $(this).attr('data-articleId')
  console.log(articleId);

  $.get(`/headlines/${articleId}`).then((res) => {
    $(`#allComments-${articleId}`).empty();
    console.log(res);
    res.notes.forEach(headline => {
      console.log(headline);
      var comment = $(`<p>${headline.title}</p><hr>`);
      $(`#allComments-${articleId}`).append(comment);
    });
  })
})