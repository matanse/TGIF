const create_table_and_implament_data = (
  arr_categories,
  location_by_id,
  members
) => {
  const tbl = document.getElementById(location_by_id);
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");
  tbl.appendChild(tblHead);
  tbl.appendChild(tblBody);
  tbl.setAttribute("border", "2");
  tbl.setAttribute("style", "text-align:center;");

  for (i in arr_categories) {
    const tblHeadRow = document.createElement("th");
    const headCellText = document.createTextNode(arr_categories[i]);
    tblHeadRow.appendChild(headCellText);
    tblHead.appendChild(tblHeadRow);
  }

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

const categories = [
  "Full Name",
  "Party",
  "State",
  "Seniority",
  "Percentage of Votes with Party"
];

const senate_members = data.results[0].members;
create_table_and_implament_data(categories, "senate-data", senate_members);
