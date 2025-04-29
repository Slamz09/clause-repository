const clauseData = [
  {
    clause_type: "Indemnity",
    contract_type: "SaaS",
    party_role: "Customer",
    industry: "Hospitality",
    tags: ["Legal", "Risk"],
    clause_text: "Vendor shall indemnify the customer against all third-party claims arising out of breach of contract, negligence, or willful misconduct.",
    favorite: false
  },
  {
    clause_type: "Non-Conforming Waste",
    contract_type: "Waste Services",
    party_role: "Vendor",
    industry: "Environmental Services",
    tags: ["Business", "Operational"],
    clause_text: "Customer shall not deliver non-conforming or hazardous waste unless pre-approved in writing by Vendor.",
    favorite: false
  },
  {
    clause_type: "Limitation of Liability",
    contract_type: "SaaS",
    party_role: "Vendor",
    industry: "Tech",
    tags: ["Legal", "Risk"],
    clause_text: "Vendor’s liability shall not exceed the fees paid in the prior 12 months.",
    favorite: false
  },
  
   {
    clause_type: "Warranty",
    contract_type: "Field Services",
    party_role: "Contractor",
    industry: "Industrial",
    tags: ["Legal", "Risk"],
    clause_text: "Goods. Contractor warrants that the Goods when delivered: (a) comply with this Agreement; (b) are new (unless stated otherwise in this Agreement) and of good and usable quality; and (c) free of defects in material, workmanship, design and manufacture (including any computer viruses or other software defects, if applicable).",
    favorite: false
   }
];

const tableBody = document.querySelector("#clause-table tbody");

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((clause, index) => {
    const starIcon = clause.favorite ? "⭐ " : "";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${clause.clause_type}</td>
      <td>${clause.contract_type}</td>
      <td>${clause.party_role}</td>
      <td>${clause.industry}</td>
      <td>
        <div class="tags">
          ${clause.tags.map((tag, tagIndex) =>
            `<span class="tag">${tag} <button class="delete-tag" data-index="${index}" data-tag-index="${tagIndex}">x</button></span>`
          ).join(" ")}
        </div>
        <input type="text" placeholder="Add tag..." class="tag-input" data-index="${index}" style="display:none;" />
        <button class="add-tag-btn" data-index="${index}">+ Tag</button>
      </td>
      <td>${starIcon}${clause.clause_text}</td>
      <td>
        <select class="action-dropdown" data-index="${index}">
          <option value="">Actions</option>
          <option value="favorite">${clause.favorite ? "Unstar" : "Star"}</option>
          <option value="delete">Delete</option>
        </select>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function applyFilters() {
  const type = document.getElementById("filter-type").value.toLowerCase();
  const contract = document.getElementById("filter-contract").value.toLowerCase();
  const role = document.getElementById("filter-role").value.toLowerCase();
  const tag = document.getElementById("filter-tags")?.value.toLowerCase() || "";
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();

  const filtered = clauseData.filter(clause => {
    const matchesType = !type || clause.clause_type.toLowerCase() === type;
    const matchesContract = !contract || clause.contract_type.toLowerCase() === contract;
    const matchesRole = !role || clause.party_role.toLowerCase() === role;
    const matchesSearch = !searchTerm || clause.clause_text.toLowerCase().includes(searchTerm);
    const matchesTag = !tag || clause.tags.map(t => t.toLowerCase()).includes(tag);

    return matchesType && matchesContract && matchesRole && matchesSearch && matchesTag;
  });

  renderTable(filtered);
}

document.getElementById("add-clause-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const clause = {
    clause_type: document.getElementById("new-clause-type").value.trim(),
    contract_type: document.getElementById("new-contract-type").value.trim(),
    party_role: document.getElementById("new-party-role").value.trim(),
    industry: document.getElementById("new-industry").value.trim(),
    clause_text: document.getElementById("new-clause-text").value.trim(),
    tags: [],
    favorite: false
  };

  clauseData.push(clause);
  applyFilters();
  this.reset();
});

// Filters
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", applyFilters);
});

document.getElementById("search-bar").addEventListener("input", applyFilters);

// Table actions
tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-tag-btn")) {
    const index = e.target.dataset.index;
    const input = document.querySelector(`input.tag-input[data-index='${index}']`);
    input.style.display = "inline-block";
    input.focus();
  }

  if (e.target.classList.contains("delete-tag")) {
    const clauseIndex = e.target.dataset.index;
    const tagIndex = e.target.dataset["tag-index"];
    clauseData[clauseIndex].tags.splice(tagIndex, 1);
    applyFilters();
  }
});

tableBody.addEventListener("change", function (e) {
  if (e.target.classList.contains("action-dropdown")) {
    const index = e.target.dataset.index;
    const action = e.target.value;

    if (action === "delete") {
      if (confirm("Are you sure you want to delete this clause?")) {
        clauseData.splice(index, 1);
      }
    }

    if (action === "favorite") {
      clauseData[index].favorite = !clauseData[index].favorite;
    }

    applyFilters();
  }
});

tableBody.addEventListener("keypress", function (e) {
  if (e.target.classList.contains("tag-input") && e.key === "Enter") {
    const index = e.target.dataset.index;
    const newTag = e.target.value.trim();
    if (newTag !== "") {
      clauseData[index].tags.push(newTag);
      e.target.value = "";
      e.target.style.display = "none";
      applyFilters();
    }
  }
});

renderTable(clauseData);
