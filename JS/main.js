const members = data.results[0].members;

// const print_members = arr => {
//   for (i in arr) {
//     if (members[i].middle_name == null) {
//       let full_name = `${members[i].first_name} ${members[i].last_name}`;
//       console.log(full_name);
//     } else {
//       let full_name = `${members[i].first_name} ${members[i].middle_name} ${members[i].last_name}`;
//       console.log(full_name);
//     }
//   }
// };

// // print_members(members);
const categories = [
  "Full Name",
  "Party",
  "State",
  "Seniority",
  "Percentage of Votes with Party"
];
const create_tables_categories = arr_categories => {
  const table = document.getElementById("senate-data");
  const thead = document.createElement("thead");
  const tblBody = document.createElement("tbody");
  for (i in arr_categories) {
    const head = document.createElement("th");
    const head_cell = document.createTextNode(arr_categories[i]);
    head.appendChild(head_cell);
    thead.appendChild(head);
  }
  table.appendChild(thead);
  table.setAttribute("border", "2");
  table.appendChild(tblBody);

  tblBody.innerHTML = "";
  for (j in members) {
    const tblRow = document.createElement("tr");
    const tblCell_name = document.createElement("td");
    const tblCell_party = document.createElement("td");
    const tblCell_state = document.createElement("td");
    const tblCell_seniority = document.createElement("td");
    const tblCell_votes_percentage = document.createElement("td");
    if (members[j].middle_name == null) {
      const tblCellText_name = document.createTextNode(
        `${members[j].first_name} ${members[j].last_name}`
      );
      tblCell_name.appendChild(tblCellText_name);
    } else {
      const tblCellText_name = document.createTextNode(
        `${members[j].first_name} ${members[j].middle_name} ${members[j].last_name}`
      );
      tblCell_name.appendChild(tblCellText_name);
    }
    const tblCellText_party = document.createTextNode(members[j].party);
    const tblCellText_state = document.createTextNode(members[j].state);
    const tblCellText_seniority = document.createTextNode(members[j].seniority);
    const tblCellText_votes_percentage = document.createTextNode(
      `${members[j].votes_with_party_pct} %`
    );
    tblBody.appendChild(tblRow);
    tblRow.appendChild(tblCell_name);
    tblRow.appendChild(tblCell_party);
    tblRow.appendChild(tblCell_state);
    tblRow.appendChild(tblCell_seniority);
    tblRow.appendChild(tblCell_votes_percentage);

    tblCell_party.appendChild(tblCellText_party);
    tblCell_state.appendChild(tblCellText_state);
    tblCell_seniority.appendChild(tblCellText_seniority);
    tblCell_votes_percentage.appendChild(tblCellText_votes_percentage);
  }
};

create_tables_categories(categories);
