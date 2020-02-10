const members_data = data.results[0].members;

const create_table_head_and_body_bY_lucation = (location_by_id, col_list) => {
  const tblLocation = document.getElementById(location_by_id);
  const tbl = document.createElement("table");
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");
  for (category of col_list) {
    const tblHeadCell = document.createElement("th");
    tblHeadCell.innerHTML = category;
    tblHead.appendChild(tblHeadCell);
  }
  tblLocation.appendChild(tbl);
  tbl.appendChild(tblHead);
  tbl.appendChild(tblBody);
  tbl.setAttribute("style", "text-align:center;");
  tbl.setAttribute("class", "table");

  const table_elemnts = {
    tblhead: tblHead,
    tblbody: tblBody
  };
  return table_elemnts;
};

const create_members_table = (location_by_id, members_list) => {
  const categories = [
    "Full Name",
    "Party",
    "State",
    "Seniority",
    "Percentage of Votes with Party"
  ];

  const table_elements = create_table_head_and_body_bY_lucation(
    location_by_id,
    categories
  );
  const tblHead = table_elements.tblhead;
  const tblBody = table_elements.tblbody;

  for (member of members_list) {
    const tblRow = document.createElement("tr");
    const tblCell_name = document.createElement("td");
    const tblName_to_website = document.createElement("a");
    tblName_to_website.setAttribute("href", `"${member.url}"`);
    tblName_to_website.setAttribute("target", "_blank");
    const tblCell_party = document.createElement("td");
    const tblCell_state = document.createElement("td");
    const tblCell_seniority = document.createElement("td");
    const tblCell_votes_percentage = document.createElement("td");
    if (member.middle_name == null) {
      tblName_to_website.innerHTML = `${member.first_name} ${member.last_name}`;
    } else {
      tblName_to_website.innerHTML = `${member.first_name} ${member.middle_name} ${member.last_name}`;
    }
    tblCell_party.innerHTML = member.party;
    tblCell_state.innerHTML = member.state;
    tblCell_seniority.innerHTML = member.seniority;
    tblCell_votes_percentage.innerHTML = member.votes_with_party_pct;

    tblCell_name.appendChild(tblName_to_website);
    tblBody.appendChild(tblRow);
    tblRow.appendChild(tblCell_name);
    tblRow.appendChild(tblCell_party);
    tblRow.appendChild(tblCell_state);
    tblRow.appendChild(tblCell_seniority);
    tblRow.appendChild(tblCell_votes_percentage);
  }
};

if (document.title == "House Data") {
  create_members_table("house-data", members_data);
} else if (document.title == "Senate Data") {
  create_members_table("senate-data", members_data);
}

const create_attendance_or_mi_table = (
  location_by_id,
  members_list,
  attend
) => {
  const attendance_list = [];

  for (member of members_list) {
    if (member.middle_name == null) {
      attendance_list.push({
        name: `${member.first_name} ${member.last_name}`,
        missed_votes: member.missed_votes,
        missed_pct: member.missed_votes_pct,
        attendance: member.total_present
      });
    } else {
      attendance_list.push({
        name: `${member.first_name} ${member.middle_name} ${member.last_name}`,
        missed_votes: member.missed_votes,
        missed_pct: member.missed_votes_pct,
        attendance: member.total_present
      });
    }
  }
  const sort_by_attendance = attendance_list.sort((a, b) => {
    return b.attendance - a.attendance;
  });

  const list_length = sort_by_attendance.length;
  const ten_percent = list_length * 0.1;

  const worst_attend = sort_by_attendance.slice(-ten_percent);
  const best_attend = sort_by_attendance.slice(0, Math.floor(ten_percent));
  worst_attend.sort((a, b) => b.missed_votes - a.missed_votes);
  best_attend.sort((a, b) => a.missed_votes - b.missed_votes);

  // ------------- create table missed ------------------

  const categories = ["Name", "No. Missed Votes", "% Missed"];

  const table_elements = create_table_head_and_body_bY_lucation(
    location_by_id,
    categories
  );
  const tblHead = table_elements.tblhead;
  const tblBody = table_elements.tblbody;

  if (attend == "worst") {
    for (member of worst_attend) {
      const tblRow = document.createElement("tr");
      const tblCell_name = document.createElement("td");
      const tblCell_missed_votes = document.createElement("td");
      const tblCell_missed_pct = document.createElement("td");

      tblCell_name.innerHTML = member.name;
      tblCell_missed_votes.innerHTML = member.missed_votes;
      tblCell_missed_pct.innerHTML = member.missed_pct;

      tblRow.appendChild(tblCell_name);
      tblRow.appendChild(tblCell_missed_votes);
      tblRow.appendChild(tblCell_missed_pct);
      tblBody.appendChild(tblRow);
    }
  } else if (attend == "best") {
    for (member of best_attend) {
      const tblRow = document.createElement("tr");
      const tblCell_name = document.createElement("td");
      const tblCell_missed_votes = document.createElement("td");
      const tblCell_missed_pct = document.createElement("td");

      tblCell_name.innerHTML = member.name;
      tblCell_missed_votes.innerHTML = member.missed_votes;
      tblCell_missed_pct.innerHTML = member.missed_pct;

      tblRow.appendChild(tblCell_name);
      tblRow.appendChild(tblCell_missed_votes);
      tblRow.appendChild(tblCell_missed_pct);
      tblBody.appendChild(tblRow);
    }
  }
};

const at_a_glance_table = (location_by_id, members_list) => {
  let members_parties = [
    {
      name: "Democrats",
      count: 0,
      votes_with_party_pct: 0
    },
    {
      name: "Replubicans",
      count: 0,
      votes_with_party_pct: 0
    },
    {
      name: "Independents",
      count: 0,
      votes_with_party_pct: 0
    },
    {
      name: "Total",
      count: 0,
      votes_with_party_pct: 0
    }
  ];

  for (member in members_list) {
    members_parties[3].count += 1;
    members_parties[3].votes_with_party_pct +=
      members_list[member].votes_with_party_pct;
    if (members_list[member].party == "D") {
      console.log(1);
      members_parties[0].count += 1;
      members_parties[0].votes_with_party_pct +=
        members_list[member].votes_with_party_pct;
    } else if (members_list[member].party == "R") {
      members_parties[1].count += 1;
      members_parties[1].votes_with_party_pct +=
        members_list[member].votes_with_party_pct;
    } else {
      members_parties[2].count += 1;
      members_parties[2].votes_with_party_pct +=
        members_list[member].votes_with_party_pct;
    }
  }
  // --------------------- create table at a glance --------
  for (party of members_parties) {
    console.log(party);
  }
  const categories = ["Party", "No. of Reps", "% Voted w/ Party"];

  const table_elements = create_table_head_and_body_bY_lucation(
    location_by_id,
    categories
  );
  const tblHead = table_elements.tblhead;
  const tblBody = table_elements.tblbody;

  for (party of members_parties) {
    const tblRow = document.createElement("tr");
    const tblCell_party = document.createElement("td");
    const tblCell_rep = document.createElement("td");
    const tblCell_votes_with_party_pct = document.createElement("td");

    tblCell_party.innerHTML = party.name;
    tblCell_rep.innerHTML = party.count;
    tblCell_votes_with_party_pct.innerHTML =
      Math.round((party.votes_with_party_pct / party.count) * 10) / 10;

    tblBody.appendChild(tblRow);
    tblRow.appendChild(tblCell_party);
    tblRow.appendChild(tblCell_rep);
    tblRow.appendChild(tblCell_votes_with_party_pct);
  }
};

if (document.title == "Senate Attendance") {
  create_attendance_or_mi_table("attend-worst-table", members_data, "worst");
  create_attendance_or_mi_table("attend-best-table", members_data, "best");
  at_a_glance_table("at-glance", members_data);
}
