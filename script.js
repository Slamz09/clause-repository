// Sample clause data
const clauseData = [
  {
    clause_type: "Indemnity",
    contract_type: "SaaS",
    party_role: "Customer",
    industry: "Hospitality",
    clause_text: "Vendor shall indemnify the customer against all third-party claims arising out of breach of contract, negligence, or willful misconduct."
  },
  {
    clause_type: "Non-Conforming Waste",
    contract_type: "Waste Services",
    party_role: "Vendor",
    industry: "Environmental Services",
    clause_text: "Customer shall not deliver non-conforming or hazardous waste unless pre-approved in writing by Vendor."
  },
  {
    clause_type: "Limitation of Liability",
    contract_type: "SaaS",
    party_role: "Vendor",
    industry: "Tech",
    clause_text: "Vendor’s liability shall not exceed the fees paid in the prior 12 months."
  }
];

// Target the table body
const tableBody = document.querySelector("#clause-table tbody");

// Render all clauses to the table
function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach(clause => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${clause.clause_type}</td>
      <td>${clause.contract_type}</td>
      <td>${clause.party_role}</td>
      <td>${clause.industry}</td>
      <td>${clause.clause_text}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Apply filters when dropdowns are changed
function applyFilters() {
  const type = document.getElementById("filter-type").value;
  const contract = document.getElementById("filter-contract").value;
  const role = document.getElementById("filter-role").value;

  const filtered = clauseData.filter(clause =>
    (type === "" || clause.clause_type === type) &&
    (contract === "" || clause.contract_type === contract) &&
    (role === "" || clause.party_role === role)
  );

  renderTable(filtered);
}

// Add event listeners to filters
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", applyFilters);
});

// Initial table load
renderTable(clauseData);
