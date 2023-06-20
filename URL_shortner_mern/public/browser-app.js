const shortNersDOM = document.querySelector(".shortNers");
const shortNersContDom = document.querySelector(".shortNers-container");
const upperheaderDom = document.querySelector(".upperHeader");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".shortNer-form");
const shortNerInputDOM = document.querySelector("#name-cont");
const notessInputDOM = document.querySelector("#notess-cont");
const formAlertDOM = document.querySelector(".form-alert");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const searchResults = document.querySelector(".search-results");

const performSearch = async () => {
  const searchTerm = searchInput.value.trim();
  loadingDOM.style.visibility = "hidden";

  if (searchTerm !== "") {
    try {
      const response = await fetch(
        `/api/v1/shortNers/search?hihi=${searchTerm}`
      );
      const data = await response.json();
      console.log(data);

    
      if (data.results.length > 0) {
        shortNersDOM.style.visibility = "hidden";
        loadingDOM.style.visibility = "hidden";
        shortNersContDom.style.visibility = "visible";

        const resultsHtml = data.results
          .map((result) => {
            const { notess, shortId, visitHistory, _id: shortNerID } = result;
            return `
            <tr >
              <td ><span><i ></i></span>${notess}</td>
              <td><a href="http://localhost:5000/${shortId}" target="_blank">${shortId}</a></td>
              <td><span><i ></i></span>${visitHistory.length}</td>
              <td>
                <button type="button" class="delete-btn" data-id="${shortNerID}">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          `;
          })
          .join("");

        const tableHTML = `
        <div class="table-responsive">
          <table  class="fl-table">
            <thead>
              <tr>
                <th>Notes</th>
                <th>Short URL</th>
                <th>Total Clicks</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              ${resultsHtml}
            </tbody>
          </table>
          </div>
        `;

        searchResults.innerHTML = tableHTML;
      } else {
        searchResults.innerHTML = "<p>No results found.</p>";
      }
    } catch (error) {
      console.log(error);
      searchResults.innerHTML =
        "<p>An error occurred while fetching the data.</p>";
    }
  } else {
    searchResults.innerHTML = "<p>Please enter a search term.</p>";
  }
};

searchBtn.addEventListener("click", performSearch);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    console.log(e.key);
    performSearch();
  }
});

//""""""""""""""""""""""""""""""""""

const showShort_Ners = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { shortNers },
    } = await axios.get("/api/v1/shortNers");
    if (shortNers.length < 1) {
      shortNersDOM.innerHTML =
        '<h5 class="empty-list">No shortNers in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }

    const allShort_Ners = shortNers
      .map((shortNer) => {
        const { _id: shortNerID, visitHistory, notess, shortId } = shortNer;
        return `
      <tr>
        <td ><span><i "></i></span>${notess}</td>
        <td><a href="http://localhost:5000/api/v1/shortNers/${shortId}" target="_blank">${shortId}</a></td>
        <td>${visitHistory.length}</td>
        <td>
          <button type="button" class="delete-btn" data-id="${shortNerID}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
      })
      .join("");

    const tableHTML = `
    <div class="table-responsive">
    <table  class="fl-table">
      <thead>
        <tr>
          <th>Notes</th>
          <th>Short URL</th>
          <th>Total Clicks</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        ${allShort_Ners}
      </tbody>
    </table>
    </div>
  `;

    shortNersDOM.innerHTML = tableHTML;
  } catch (error) {
    shortNersDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showShort_Ners();

shortNersDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/shortNers/${id}`);
      showShort_Ners();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});
searchResults.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/shortNers/${id}`);
      performSearch();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = shortNerInputDOM.value;
  const notess = notessInputDOM.value;

  try {
    await axios.post("/api/v1/shortNers", { name, notess });
    showShort_Ners();
    shortNerInputDOM.value = "";
    notessInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, shortNer added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
