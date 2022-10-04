

const d = new Date();
const year = d.getFullYear();


const year_elm = document.querySelector(".year");
year_elm.innerHTML = year;

$("[data-link]").on("click", projLink);

function projLink(e) {
  const path = $(this).data("link");
  console.log(path);

  document.location = path;

}