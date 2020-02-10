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

const create_attendance_table = (location_by_id, members_list, attend) => {
  const attendance_list = [];

  for (member of members_list) {
    if (member.middle_name == null) {
      attendance_list.push({
        name: `${member.first_name} ${member.last_name}`,
        missed_votes: member.missed_votes,
        missed_pct: member.missed_votes_pct,
        attendance: member.total_present,
        url: member.url
      });
    } else {
      attendance_list.push({
        name: `${member.first_name} ${member.middle_name} ${member.last_name}`,
        missed_votes: member.missed_votes,
        missed_pct: member.missed_votes_pct,
        attendance: member.total_present,
        url: member.url
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

      const tblName_to_website = document.createElement("a");
      tblName_to_website.setAttribute("href", `"${member.url}"`);
      tblName_to_website.setAttribute("target", "_blank");

      tblName_to_website.innerHTML = member.name;
      tblCell_missed_votes.innerHTML = member.missed_votes;
      tblCell_missed_pct.innerHTML = member.missed_pct;

      tblCell_name.appendChild(tblName_to_website);
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

      const tblName_to_website = document.createElement("a");
      tblName_to_website.setAttribute("href", `"${member.url}"`);
      tblName_to_website.setAttribute("target", "_blank");

      tblName_to_website.innerHTML = member.name;
      tblCell_missed_votes.innerHTML = member.missed_votes;
      tblCell_missed_pct.innerHTML = member.missed_pct;

      tblCell_name.appendChild(tblName_to_website);
      tblRow.appendChild(tblCell_name);
      tblRow.appendChild(tblCell_missed_votes);
      tblRow.appendChild(tblCell_missed_pct);
      tblBody.appendChild(tblRow);
    }
  }
};

const loyalty_table = (location_by_id, members_list, loyalty) => {
  const loyalty_list = [];

  for (member of members_list) {
    if (member.middle_name == null) {
      const num_votes_with_party =
        (member.total_votes / 100) * member.votes_with_party_pct;

      attendance_list.push({
        name: `${member.first_name} ${member.last_name}`,
        numnum_votes_with_party: num_votes_with_party,
        party_pct: member.votes_with_party_pct,
        url: member.url
      });
    } else {
      attendance_list.push({
        name: `${member.first_name} ${member.middle_name} ${member.last_name}`,
        numnum_votes_with_party: num_votes_with_party,
        party_pct: member.votes_with_party_pct,
        url: member.url
      });
    }
  }
  const sort_by_loyalty = loyalty_list.sort((a, b) => {
    return b.party_pct - a.party_pct;
  });

  const list_length = sort_by_loyalty.length;
  const ten_percent = list_length * 0.1;

  const worst_loyal = sort_by_loyalty.slice(-ten_percent);
  const best_loyal = sort_by_loyalty.slice(0, Math.floor(ten_percent));

  // ------------- create table missed ------------------

  const categories = ["Name", "No. Missed Votes", "% Missed"];

  const table_elements = create_table_head_and_body_bY_lucation(
    location_by_id,
    categories
  );
  const tblHead = table_elements.tblhead;
  const tblBody = table_elements.tblbody;

  if (loyalty == "worst") {
    for (member of worst_loyal) {
      const tblRow = document.createElement("tr");
      const tblCell_name = document.createElement("td");
      const tblCell_missed_votes = document.createElement("td");
      const tblCell_missed_pct = document.createElement("td");

      const tblName_to_website = document.createElement("a");
      tblName_to_website.setAttribute("href", `"${member.url}"`);
      tblName_to_website.setAttribute("target", "_blank");

      tblName_to_website.innerHTML = member.name;
      tblCell_missed_votes.innerHTML = member.missed_votes;
      tblCell_missed_pct.innerHTML = member.missed_pct;

      tblCell_name.appendChild(tblName_to_website);
      tblRow.appendChild(tblCell_name);
      tblRow.appendChild(tblCell_missed_votes);
      tblRow.appendChild(tblCell_missed_pct);
      tblBody.appendChild(tblRow);
    }
  } else if (loyalty == "best") {
    for (member of best_loyal) {
      const tblRow = document.createElement("tr");
      const tblCell_name = document.createElement("td");
      const tblCell_missed_votes = document.createElement("td");
      const tblCell_missed_pct = document.createElement("td");

      const tblName_to_website = document.createElement("a");
      tblName_to_website.setAttribute("href", `"${member.url}"`);
      tblName_to_website.setAttribute("target", "_blank");

      tblName_to_website.innerHTML = member.name;
      tblCell_missed_votes.innerHTML = member.missed_votes;
      tblCell_missed_pct.innerHTML = member.missed_pct;

      tblCell_name.appendChild(tblName_to_website);
      tblRow.appendChild(tblCell_name);
      tblRow.appendChild(tblCell_missed_votes);
      tblRow.appendChild(tblCell_missed_pct);
      tblBody.appendChild(tblRow);
    }
  }
};

const at_a_glance_table = (location_by_id, members_list) => {
  var members_parties = {
    D: {
      name: "Democrats",
      count: 0,
      votes_with_party_pct: 0
    },
    R: {
      name: "Replubicans",
      count: 0,
      votes_with_party_pct: 0
    },
    I: {
      name: "Independents",
      count: 0,
      votes_with_party_pct: 0
    },
    Total: {
      name: "Total",
      count: 0,
      votes_with_party_pct: 0
    }
  };
  for (member in members_list) {
    members_parties.Total.count += 1;
    members_parties.Total.votes_with_party_pct +=
      members_list[member].votes_with_party_pct;
    if (members_list[member].party == "D") {
      members_parties.D.count += 1;
      members_parties.D.votes_with_party_pct +=
        members_list[member].votes_with_party_pct;
    } else if (members_list[member].party == "R") {
      members_parties.R.count += 1;
      members_parties.R.votes_with_party_pct +=
        members_list[member].votes_with_party_pct;
    } else {
      members_parties.I.count += 1;
      members_parties.I.votes_with_party_pct +=
        members_list[member].votes_with_party_pct;
    }
  }
  // --------------------- create table at a glance --------

  const categories = ["Party", "No. of Reps", "% Voted w/ Party"];

  const table_elements = create_table_head_and_body_bY_lucation(
    location_by_id,
    categories
  );
  const tblHead = table_elements.tblhead;
  const tblBody = table_elements.tblbody;

  for (party in members_parties) {
    const tblRow = document.createElement("tr");
    const tblCell_party = document.createElement("td");
    const tblCell_rep = document.createElement("td");
    const tblCell_votes_with_party_pct = document.createElement("td");

    tblCell_party.innerHTML = members_parties[party].name;
    if (members_parties[party].count != 0) {
      tblCell_rep.innerHTML = members_parties[party].count;
      tblCell_votes_with_party_pct.innerHTML =
        Math.round(
          (members_parties[party].votes_with_party_pct /
            members_parties[party].count) *
            10
        ) / 10;
    } else {
      tblCell_rep.innerHTML = 0;
      tblCell_votes_with_party_pct.innerHTML = 0;
    }

    tblBody.appendChild(tblRow);
    tblRow.appendChild(tblCell_party);
    tblRow.appendChild(tblCell_rep);
    tblRow.appendChild(tblCell_votes_with_party_pct);
  }
};

if (document.title == "Attendance") {
  create_attendance_table("attend-worst-table", members_data, "worst");
  create_attendance_table("attend-best-table", members_data, "best");
  at_a_glance_table("at-glance", members_data);
} else if (document.title == "Loyalty") {
  create_attendance_table("loyal-worst-table", members_data, "worst");
  create_attendance_table("loyal-best-table", members_data, "best");
  at_a_glance_table("at-glance", members_data);
}
