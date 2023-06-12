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

// const registerForm = document.querySelector("#form__register");
// registerForm?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData.entries());
//   console.log(data);
// });
