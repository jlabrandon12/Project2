let button = document.getElementById("searchBtn");
let results = document.getElementById("results"); //these elements are in html and we are grabbing them

button.addEventListener("click", function (e) {
  //this says: when the user clicks this button, run this function. (e) represents object/click event
  e.preventDefault(); //prevents form from realoading page, i did not use 'form' so may not need?

  let keyword = document.getElementById("searchInput").value; //get input that user entered into search
  if (keyword === "") {
    //says if keyword is = "" which is nothing, empty string
    alert("Please enter a search keyword"); //then show an alert box telling user to enter a keyword
    return; //and stop function with return to beginning
  }

  results.innerHTML = "Loading..."; //shows the user the message "loading..." while fetching gifs. noticed it does not show if gifs come back instantly

  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=S71EVb1mpdRUNvmmnkRtl3mAQ6BZzS0W=${keyword}&limit=12`, //sends a request to giphy api, limit at the end allows only 12 to be returned, has personal api and keyword search item
  )
    .then(function (response) {
      //converts response to json
      return response.json();
    })
    .then(function (data) {
      //data.data is an array of gifs from giphy, for each loops through them all
      results.innerHTML = "";
      data.data.forEach(function (gif) {
        let img = document.createElement("img"); //create img element
        img.src = gif.images.fixed_height.url; //set img src to the url/fixed height is giphy preset
        results.appendChild(img); //appends image to results so it shows on page
      });
    })
    .catch(function (error) {
      results.innerHTML = "Something went wrong."; //catches errors and shows "something went wrong"
      console.log("Error:", error);
    });
});
