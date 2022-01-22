// populating data  in the dashboard

const newCredentials = localStorage.getItem("loginCredentials");
const cred = JSON.parse(newCredentials);
// if (cred.isLoggedIn === false) {
//   window.location.replace("../login.html");
// }
console.log(cred);
const deleteBlo = document.querySelector("#my-delete-model");

// delete article function

const RetrieveArticles = localStorage.getItem("blogList");
const RetrievedObj = JSON.parse(RetrieveArticles);
function deleteArticle(id) {
  console.log(RetrievedObj);
  RetrievedObj.splice(
    RetrievedObj.findIndex((article) => article.id == id),
    1
  );
  console.log(RetrievedObj);
  localStorage.setItem("blogList", JSON.stringify(RetrievedObj));
  window.location.reload();
}

// update an article

const editModelss = document.querySelector("#my-edit-model");

function update(id) {
  editModelss.style.display = "block";
  
  const article = RetrievedObj.find(e => e.id == id);
  const imageUpdate = document.querySelector(".article-picture-update");
  imageUpdate.setAttribute('src', article.imageUrl);
  
  imageUpdate.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrls = reader.result;
      console.log(imageUrls);
      if (imageUrls === null) {
        return "image is required";
      } else {
        localStorage.setItem("recent-image", imageUrls);
        localStorage.setItem("save", imageUrls);
        const imagePreviewUpdate = localStorage.getItem("recent-image");
        console.log(imagePreviewUpdate);
        
        const img = document.querySelector("#image-preview-update")
        img.setAttribute("src", imagePreviewUpdate);
        localStorage.removeItem("recent-image");
      }
    };
    reader.readAsDataURL(imageUpdate.files[0]);
  });
  document.querySelector(".title-update").value = article.title;
  document.querySelector(".detailed-update-description").value = article.description;
  document.querySelector("#image-preview-update").setAttribute('src', article.imageUrl);
  const handleUpdateArticle = (e) => {
    e.preventDefault();
    const titleArticle = document.querySelector(".title-update");
    const bodyArticle = document.querySelector(".detailed-update-description");
    if (titleArticle.value.length < 4) {
      document.querySelector(".title-update-error.error-message").style.display = "block";
    }
    if (bodyArticle.value.length < 5) {
      const error = document.querySelector(".detailed-update-description.error-message");
      error.style.display = "block";
      error.innerText = "description is required";
    } else if ((bodyArticle.value.length >= 5) & (titleArticle.value.length >= 4)) {
      document.querySelector(".title-update-error.error-message").style.display = "none";
      document.querySelector(".detailed-update-description.error-message").style.display = "none";
      const imageUrl = document.querySelector('#image-preview-update').src;
  
      const newData = RetrievedObj.map(element => {
        if (element.id == id) {
          const data = {
            ...element,
            title: titleArticle.value,
            description: bodyArticle.value,
          };
          console.log(imageUrl);
          if (imageUrl.length > 0) data.imageUrl = imageUrl;
  
          return data;
        } else return element;
      });
  
      localStorage.setItem("blogList", JSON.stringify(newData));
      editModelss.style.display = "none";
      window.location.reload();
    }
  };
  document.querySelector(".submit-update-btn").addEventListener("click", handleUpdateArticle);
}

document.querySelector('.cancel-update-btn').onclick = () => {
  editModelss.style.display = 'none';
}



const getData = JSON.parse(RetrieveArticles);
let blogCardElement = document.querySelector(".section-content");
getData?.forEach((element, i) => {
  let body = element.description?.slice(0, 120) + "....";
  const html = `
    <div class="article-card">
      <a href="./article.html?id=${element.id}" data-id=${element.id}>
        <div class="article-owner-image">
          <img src="${element.imageUrl}" alt="importance of reading" width="400" height="350"/>
        </div>
        <div class="article-title-date">
          <h3 class="title-articles">${element.title}</h3>
          <p class="date-article">march, 12,2021</p>
          <div class="article-line"></div>
        </div>
        <div class="article-description">
          <p class="blog-content-description">${body}</p>
        </div>
      </a>
      <div class="edit-delete">
        <div class="edit-skill-article" id="edit-skill">
          <i onclick="update(${element.id})" class="fas fa-pen update"></i>
        </div>
        <div class="delete-blog">
          <i onclick="deleteArticle(${element.id})" class="fas fa-trash-alt delete"></i>
        </div>
      </div>
    </div>`

  if (i === 0) blogCardElement.innerHTML = html;
  else blogCardElement.innerHTML += html;
});
if (getData.length === 0) {
  blogCardElement.textContent = 'No blog created!';
}