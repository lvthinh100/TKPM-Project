const render = (parent, markup) => {
  const body = document.querySelector(parent);
  console.log(body);

  body.innerHTML = "";
  body.insertAdjacentHTML("afterbegin", markup);
};

exports.renderSpinner = (parent) => {
  const markup = `
    <div class="d-flex justify-content-center m-2">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `;
  render(parent, markup);
};
