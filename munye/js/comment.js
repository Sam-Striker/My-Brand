const commentData = document.querySelector("form");
const submitComment = document.querySelector(".comment-btn")
console.log("mupagasi")
const getBlogs = JSON.parse(localStorage.getItem("blogList"))
console.log(getBlogs);
const Params =new URLSearchParams(window.location.search);
const postId = Params.get("id");
console.log(postId);
getBlogs?.map((article)=>{
  if(article.id == postId){
       const handleComments = (e) => {
         e.preventDefault();
         const formData = new FormData(commentData).entries();
         const { name, comment } = Object.fromEntries(formData);
         const NameErrorMessage = validateName(name);
         const CommentErrorMessage = validateCommentField(comment);

         if (NameErrorMessage) {
           const NameErrorMessageElement = document.querySelector(
             ".name.error-message"
           );
           NameErrorMessageElement.innerText = NameErrorMessage;
         }
         if (CommentErrorMessage) {
           const CommentErrorMessageElement = document.querySelector(
             ".comment.error-message"
           );
           CommentErrorMessageElement.innerText = CommentErrorMessage;
         }
         if ((NameErrorMessage === " ") & (CommentErrorMessage === " ")) {
           const articleComments = {
             name,
             comment,
           };
           article.comments.push(articleComments);
           
           const saveData = JSON.stringify(getBlogsData);
           localStorage.setItem("blogList", saveData);
           document.querySelector("form").reset();
           console.log(getBlogsData);
         }
         getComments();
       };
       const validateName = (name) => {
         if (!name.trim()) return "Name field is required";
         return " ";
       };
       const validateCommentField = (comment) => {
         if (!comment.trim()) return "Comment field is required";
         return " ";
       };
       submitComment.addEventListener("click",handleComments)
    }
})