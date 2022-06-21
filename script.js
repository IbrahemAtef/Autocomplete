const inp = document.getElementById("site-search");
const list = $("#results");
inp.onkeyup = function () {
  $.ajax({
    method: "POST",
    url: "http://localhost:5000/",
    data: { word: this.value },
    dataType: "json",
  })
    .done(function (msg) {
      list.empty();
      msg.responseText
        .split("-")
        .slice(0, 10)
        .map((e) => {
          list.append(`<li>${e}</li>`);
        });
      if (msg.responseText.split("-").length > 10) {
        list.append(
          `<li>There are ${msg.responseText.split("-").length} more</li>`
        );
      }
    })
    .fail(function (msg) {
      list.empty();
      msg.responseText
        .split("-")
        .slice(0, 10)
        .map((e) => {
          list.append(`<li>${e}</li>`);
        });
      if (msg.responseText.split("-").length > 10) {
        list.append(
          `<li>There are ${msg.responseText.split("-").length} more</li>`
        );
      }
    });
};
