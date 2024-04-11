const accessKey = "MTiXmAU-JPjL_CrK0CdEoorUxfIYRak7thZh4x0au3M";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imageContainer = document.querySelector(".image-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;

// Function to fetch image using Unsplash API
const fetchImages = async (query, pageNo) => {
    try {
        
    
  if (pageNo === 1) {
    imageContainer.innerHTML = '';
  }

  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=${pageNo}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  // console.log(data);

  if(data.results.length > 0){
      data.results.forEach((photo) => {
        // creating imagediv
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src ="${photo.urls.regular}"/>`;
    
        // creating overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");
    
        // creating overlay
        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description}`;
    
        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
    
        imageContainer.appendChild(imageElement);
      });
    
      if(data.total_pages === pageNo){
        loadMoreBtn.style.display = "none";
    }
    else{
          loadMoreBtn.style.display = "block";
    
      }

  }
  else{
    imageContainer.innerHTML = `<h2>No Image Found.</h2>`;
    if(loadMoreBtn.style.display === "block")
    loadMoreBtn.style.display = "none";
  }
} 
  catch (error) {
    imageContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;
}
}

// Adding Event Listener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== '') {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imageContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
    if(loadMoreBtn.style.display === "block")
        loadMoreBtn.style.display = "none";
  }
});

// Adding Event Listener to load more button to fetch more images
loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
