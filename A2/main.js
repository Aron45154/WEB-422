/********************************************************************************
*  WEB422 – Assignment 2
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: _____Moe Thet Paing_________________ Student ID: __128784238___________ Date: ______tue Jub 3________
*
********************************************************************************/


let page = 1;
const perPage = 6;
let searchName = null;

function loadSitesData() {
  let url = `https://sites-api-seven.vercel.app/api/sites?page=${page}&perPage=${perPage}`;
  if (searchName) url += `&name=${searchName}`;

  fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      const tbody = document.querySelector("#sitesTable tbody");
      tbody.innerHTML = "";

      if (data.length > 0) {
        document.getElementById("current-page").textContent = page;

        data.map(site => {
          const dates = site.dates.map(d => `<li>${d.year} (${d.type})</li>`).join("");
          tbody.innerHTML += `
            <tr data-id="${site._id}">
              <td>${site.siteName}</td>
              <td><img src="${site.image || ''}" onerror="this.src='https://placehold.co/100x50?text=No+Image'" class="img-fluid"/></td>
              <td>${site.description}</td>
              <td><ul>${dates}</ul></td>
              <td>${site.designated}</td>
              <td>${site.location.latitude} | ${site.location.longitude}</td>
              <td>${site.location.town}</td>
              <td>${site.provinceOrTerritory.name}</td>
              <td>${site.provinceOrTerritory.region}</td>
            </tr>`;
        });

        document.querySelectorAll("#sitesTable tbody tr").forEach(row => {
          row.addEventListener("click", () => {
            const id = row.getAttribute("data-id");
            fetch(`https://sites-api-seven.vercel.app/api/sites/${id}`)
              .then(res => res.ok ? res.json() : Promise.reject(res.status))
              .then(site => {
                const dates = site.dates.map(d => `<li>${d.year} (${d.type})</li>`).join("");
                document.querySelector(".modal-title").textContent = site.siteName;
                document.querySelector(".modal-body").innerHTML = `
                  <img src="${site.image}" class="img-fluid w-100" onerror="this.src='https://placehold.co/600x400?text=Photo+Not+Available'" /><br><br>
                  <p><b>Description:</b> ${site.description}</p>
                  <p><b>Dates:</b></p><ul>${dates}</ul>
                  <p><b>Designated:</b> ${site.designated}</p>
                  <p><b>Location:</b> ${site.location.latitude}, ${site.location.longitude}</p>
                  <p><b>Town:</b> ${site.location.town}, ${site.provinceOrTerritory.name}</p>
                  <p><b>Region:</b> ${site.provinceOrTerritory.region}</p>`;
                new bootstrap.Modal(document.getElementById("detailsModal")).show();
              });
          });
        });

      } else {
        if (page > 1) page--;
        else tbody.innerHTML = `<tr><td colspan="9"><strong>No data available</strong></td></tr>`;
      }
    })
    .catch(() => {
      document.querySelector("#sitesTable tbody").innerHTML = `<tr><td colspan="9"><strong>No data available</strong></td></tr>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSitesData();

  document.getElementById("previous-page").addEventListener("click", e => {
    e.preventDefault();
    if (page > 1) {
      page--;
      loadSitesData();
    }
  });

  document.getElementById("next-page").addEventListener("click", e => {
    e.preventDefault();
    page++;
    loadSitesData();
  });

  document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();
    searchName = document.getElementById("name").value.trim();
    page = 1;
    loadSitesData();
  });

  document.getElementById("clearForm").addEventListener("click", () => {
    document.getElementById("name").value = "";
    searchName = null;
    loadSitesData();
  });
});
