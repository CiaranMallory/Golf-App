
window.onload = function() {

  const form = document.getElementById('scores');
  const list = document.getElementById('scores-list');

  var username = sessionStorage.getItem("username");

  form.addEventListener('submit', (event) => {

    var coursename = document.getElementById('coursename').value;
    var date = document.getElementById('date').value;

    /*var hole1 = document.getElementById('one').value;
    var hole2 = document.getElementById('two').value;
    var hole3 = document.getElementById('three').value;
    var hole4 = document.getElementById('four').value;
    var hole5 = document.getElementById('five').value;
    var hole6 = document.getElementById('six').value;
    var hole7 = document.getElementById('seven').value;
    var hole8 = document.getElementById('eight').value;
    var hole9 = document.getElementById('nine').value;
    var hole10 = document.getElementById('ten').value;
    var hole11 = document.getElementById('eleven').value;
    var hole12 = document.getElementById('twelve').value;
    var hole13 = document.getElementById('thirteen').value;
    var hole14 = document.getElementById('fourteen').value;
    var hole15 = document.getElementById('fifthteen').value;
    var hole16 = document.getElementById('sixteen').value;
    var hole17 = document.getElementById('seventeen').value;
    var hole18 = document.getElementById('eighteen').value;

    var scores = [hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9, hole10, hole11, hole12, hole13, hole14, hole15, hole16, hole17, hole18];
    
    var score = scores.reduce((a, b) => a + b);
    console.log(score);*/

    var db = `http://localhost:3000/getcoursedata/${coursename}`;

    fetch(db)
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result);
      /*var calcScore = score - result.par;
      console.log(calcScore);

      var db = `http://localhost:3000/addscore/${username}/${date}/${coursename}/${score}`;

      fetch(db)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            return;
        });*/
    });

  });

  function getScores(username) {

    var db = `http://localhost:3000/getallscores/${username}`;
    fetch(db)
        .then(response => {
          return response.json();
        })
        .then(result => {
          if(result.score != 0) {
            for(var i=1; i < result.length; i++){
              li = document.createElement('li');
              li.innerHTML = result[i].date + '-' + result[i].coursename + '-' + result[i].score;
              li.setAttribute("class", "history-list-item");
              //button = document.createElement("BUTTON");
              //button.innerHTML = "Delete";
              //button.setAttribute("class", "delete");
              //li.appendChild(button);
              list.insertBefore(li, list.childNodes[0]);
            }
          } else {
            console.log('No scores on record for this date');
          }
          return;
        });
  }

  // This function allows deletion of list items
  /*function deleteItems() {

      var listitems = document.querySelectorAll(".listitems");
      for (var index = 0; index < listitems.length; index++){
          listitems[index].addEventListener("click", function(){
              this.classList.toggle("active");
          });
          listitems[index].querySelector(".delete").addEventListener("click",
          function(){
              this.closest(".listitems").remove();
          });
      }

  }

  // Calls the delete function every second
  setInterval(deleteItems, 1000);*/

  getScores(username);
};
