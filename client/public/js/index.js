console.log("hello from index");

const AJAX = async function (url, uploadData = undefined, method) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    //   const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const res = await fetchPro;
    //   if (!res.ok) throw new Error("Some thing wrong!!! Please try again");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

//Handle like, unlike
const main = document.querySelector("main");
main?.addEventListener("click", async function (e) {
  const btn = e.target;
  if (!btn.classList.contains("add-favorite")) return;

  let data;

  if (btn.classList.contains("liked")) {
    //Da thich thi delete
    data = await AJAX(
      "http://127.0.0.1:20585/api/favorites",
      {
        id: btn.dataset.id,
      },
      "DELETE"
    );
  } else {
    //Chua thich thi Post
    data = await AJAX(
      "http://127.0.0.1:20585/api/favorites",
      {
        id: btn.dataset.id,
      },
      "POST"
    );
  }

  if (data.status == "failed" && data.message == "notAuth") {
    return (window.location.href = "/auth");
  }

  btn.classList.toggle("liked");
});

//Handle Search
const searchForm = document.querySelector(".search-movie");
searchForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchValue = document.querySelector("#search-movie");
  return (window.location.href = `/movies/search/${searchValue.value}`);
});

//Handle Search
const searchActors = document.querySelector(".search-actor");
searchActors?.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchValue = document.querySelector("#search-actor");
  return (window.location.href = `/actors/search/${searchValue.value}`);
});

//Handle review pagination
const reviews = document.querySelector(".reviews");
const reviewPagination = document.querySelector(".reviews-pagination");

const createdAt = function (submissiondate) {
  const date = new Date(submissiondate);
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

const renderReviews = (data) => {
  const { reviews: reviewsData, pages, page } = data;
  console.log(data);
  //generate review
  const reviewsMarkup = reviewsData
    .map(
      (rv) => `
    <div
      class="list-group-item list-group-item-action border-1 border p-3 my-2"
      aria-current="true"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 text-primary">${rv.author}</h5>
        <small>${createdAt(rv.submissiondate)}</small>
      </div>
      <p class="mb-1 fw-bold">${rv.title}</p>
      <small>Rating:
        <span class="text-warning fw-bold me-4">${rv.rating}</span></small>
      <small>Up: <span class="text-success fw-bold">${rv.up}</span></small>
      <small>Down: <span class="text-danger fw-bold">${rv.down}</span></small>
      <br />
      <div class="progress my-2" style="height: 3px;">
        <div
          class="progress-bar"
          role="progressbar"
          aria-label="Basic example"
          style="width: ${rv.helpPoint}%;"
          aria-valuenow="${rv.helpPoint}"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <p>${rv.text}</p>
    </div>
  `
    )
    .join("");

  reviews.innerHTML = "";
  reviews.insertAdjacentHTML("beforeEnd", reviewsMarkup);

  //generate pagination
  {
    /* <ul class="pagination">
        <li class="page-item"><button class="page-link" href="#">1</button></li>
        <li class="page-item"><button class="page-link" href="#">2</button></li>
        <li class="page-item"><button class="page-link" href="#">3</button></li>
      </ul> */
  }

  let paginateMarkup = [];
  for (let i = 0; i < pages; i++) {
    paginateMarkup.push(
      `<li class="page-item"><button class="page-link review-page ${
        i + 1 == page ? "active" : ""
      }" data-page=${i + 1}>${i + 1}</button></li>`
    );
  }

  reviewPagination.innerHTML = "";
  reviewPagination.insertAdjacentHTML("beforeend", paginateMarkup.join(""));
};

if (reviews) {
  //Load page 1 of review
  window.addEventListener("load", async function () {
    const data = await AJAX(
      `http://127.0.0.1:20585/api/reviews/${reviews.dataset.id}/?page=1`
    );
    renderReviews(data.data);
    console.log(data);
  });

  //handle pagination btn click
  reviewPagination?.addEventListener("click", async function (e) {
    const btn = e.target;
    if (!btn.classList.contains("review-page")) return;

    const page = +btn.dataset.page;

    const data = await AJAX(
      `http://127.0.0.1:20585/api/reviews/${reviews.dataset.id}/?page=${page}`
    );
    renderReviews(data.data);
  });
}
