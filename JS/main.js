// ---------------- functions    -------------

const fatch_json = () => {
  if (document.title.includes("Senate")) {
    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
      headers: {
        "X-API-Key": "ZERZB6sQwFt0IQHJ9NIklUwqQMuPYsW6yBT8Fk4X"
      }
    })
      .then(Response => Response.json())
      .then(data => {
        start_page(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  } else if (document.title.includes("House")) {
    fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
      headers: {
        "X-API-Key": "ZERZB6sQwFt0IQHJ9NIklUwqQMuPYsW6yBT8Fk4X"
      }
    })
      .then(Response => Response.json())
      .then(data => {
        start_page(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
};

const create_table_head_and_body_bY_lucation = (location_by_id, col_list) => {
  const tblLocation = document.getElementById(location_by_id);
  tblLocation.innerHTML = "";
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

const create_state_menu = (
  table_location_id,
  location_by_id,
  members,
  quality = 0
) => {
  const states = [];
  for (i in members) {
    if (states.includes(members[i].state) != true) {
      states.push(members[i].state);
    }
  }
  states.sort();
  const state_menu_location = document.getElementById(location_by_id);
  for (state of states) {
    const line = document.createElement("li");
    line.setAttribute("class", "checkbox keep-open");
    const lebl = document.createElement("label");
    const in_put = document.createElement("input");
    in_put.setAttribute("type", "checkbox");
    in_put.setAttribute("value", state);
    in_put.setAttribute("id", state);
    in_put.setAttribute("name", "state");
    lebl.innerHTML = " " + state + " ";

    state_menu_location.appendChild(line);
    line.appendChild(lebl);
    lebl.appendChild(in_put);

    document.getElementById(state).addEventListener("change", function() {
      if (document.title == "Senate Data" || document.title == "House Data") {
        create_members_table(table_location_id, members);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table(
          table_location_id,
          location_by_id,
          members,
          quality
        );
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(
          table_location_id,
          location_by_id,
          members,
          quality
        );
      }
    });
  }
};

function event_listeners(location_by_id, members, quality = 0) {
  document
    .getElementById("CheckboxDemocrats")
    .addEventListener("change", function() {
      if (document.title == "Senate Data" || document.title == "House Data") {
        create_members_table(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table(location_by_id, members, quality);
        create_attendance_table(location_by_id, members, quality);
      }
    });
  document
    .getElementById("CheckboxReplubicans")
    .addEventListener("change", function() {
      if (document.title == "Senate Data" || document.title == "House Data") {
        create_members_table(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table(location_by_id, members, quality);
        create_attendance_table(location_by_id, members, quality);
      }
    });
  document
    .getElementById("CheckboxIndependents")
    .addEventListener("change", function() {
      if (document.title == "Senate Data" || document.title == "House Data") {
        create_members_table(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table(location_by_id, members, quality);
        create_attendance_table(location_by_id, members, quality);
      }
    });
  document
    .getElementById("state-menu-dropdown")
    .addEventListener("change", function() {
      if (document.title == "Senate Data" || document.title == "House Data") {
        create_state_menu(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table("worst-table", members, "worst");
        create_attendance_table("best-table", members, "best");
      }
    });
}

const checked_filters_values = () => {
  let selectedBoxes = {
    party: [],
    states: []
  };
  let selected_parties = document.querySelectorAll("input[name=party]:checked");
  let selected_states = document.querySelectorAll("input[name=state]:checked");
  for (i = 0; i < selected_parties.length; i++) {
    selectedBoxes.party.push(selected_parties[i].value);
  }
  for (i = 0; i < selected_states.length; i++) {
    selectedBoxes.states.push(selected_states[i].value);
  }
  // console.log(`p: ${selectedBoxes.party} s: ${selectedBoxes.states}`);
  return selectedBoxes;
};

// ----------- tables ------------

const create_members_table = (location_by_id, members_list) => {
  const filters_values = checked_filters_values();
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
    if (
      (filters_values.party.includes(member.party) &&
        filters_values.states.length == 0) ||
      (filters_values.states.includes(member.state) &&
        filters_values.party.length == 0) ||
      (filters_values.states.includes(member.state) &&
        filters_values.party.includes(member.party)) ||
      (filters_values.party.length == 0 && filters_values.states.length == 0)
    ) {
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
  }
};

const create_attendance_table = (location_by_id, members_list, attend) => {
  const filters_values = checked_filters_values();
  const attendance_list = [];

  for (member of members_list) {
    if (
      (filters_values.party.includes(member.party) &&
        filters_values.states.length == 0) ||
      (filters_values.states.includes(member.state) &&
        filters_values.party.length == 0) ||
      (filters_values.states.includes(member.state) &&
        filters_values.party.includes(member.party)) ||
      (filters_values.party.length == 0 && filters_values.states.length == 0)
    ) {
      if (member.middle_name == null) {
        attendance_list.push({
          name: `${member.first_name} ${member.last_name}`,
          party: member.party,
          missed_votes: member.missed_votes,
          missed_pct: member.missed_votes_pct,
          attendance: member.total_present,
          url: member.url
        });
      } else {
        attendance_list.push({
          name: `${member.first_name} ${member.middle_name} ${member.last_name}`,
          party: member.party,
          missed_votes: member.missed_votes,
          missed_pct: member.missed_votes_pct,
          attendance: member.total_present,
          url: member.url
        });
      }
    }
  }

  const sort_by_attendance = attendance_list.sort((a, b) => {
    return b.attendance - a.attendance;
  });

  const list_length = sort_by_attendance.length;
  const ten_percent = Math.floor(list_length * 0.1);

  const best_attend = sort_by_attendance.slice(0, ten_percent);
  // best_attend.sort((a, b) => a.missed_votes - b.missed_votes);

  const lowest_attendance = attendance_list.sort((a, b) => {
    return a.attendance - b.attendance;
  });

  const worst_attend = lowest_attendance.slice(0, ten_percent);
  //worst_attend.sort((a, b) => b.missed_votes - a.missed_votes);

  // -------- create table missed -------------

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

const create_loyalty_table = (location_by_id, members_list, loyalty) => {
  const filters_values = checked_filters_values();
  const loyalty_list = [];
  for (member of members_list) {
    if (
      (filters_values.party.includes(member.party) &&
        filters_values.states.length == 0) ||
      (filters_values.states.includes(member.state) &&
        filters_values.party.length == 0) ||
      (filters_values.states.includes(member.state) &&
        filters_values.party.includes(member.party)) ||
      (filters_values.party.length == 0 && filters_values.states.length == 0)
    ) {
      const num_votes_with_party = Math.round(
        (member.total_votes / 100) * member.votes_with_party_pct
      );
      if (member.middle_name == null) {
        loyalty_list.push({
          name: `${member.first_name} ${member.last_name}`,
          party: member.party,
          num_votes_with_party: num_votes_with_party,
          party_pct: member.votes_with_party_pct,
          url: member.url
        });
      } else {
        loyalty_list.push({
          name: `${member.first_name} ${member.middle_name} ${member.last_name}`,
          party: member.party,
          num_votes_with_party: num_votes_with_party,
          party_pct: member.votes_with_party_pct,
          url: member.url
        });
      }
    }
  }
  const sort_by_loyalty = loyalty_list.sort((a, b) => {
    return b.party_pct - a.party_pct;
  });

  const list_length = sort_by_loyalty.length;
  const ten_percent = list_length * 0.1;

  const worst_loyal = sort_by_loyalty.slice(-ten_percent);
  const best_loyal = sort_by_loyalty.slice(0, Math.floor(ten_percent));

  // --------- create table missed ------
  const categories = ["Name", "No. Party Votes", "% Party Votes"];

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
      const tblCell_with_party_votes = document.createElement("td");
      const tblCell_party_votes_pct = document.createElement("td");

      const tblName_to_website = document.createElement("a");
      tblName_to_website.setAttribute("href", `"${member.url}"`);
      tblName_to_website.setAttribute("target", "_blank");

      tblName_to_website.innerHTML = member.name;
      tblCell_with_party_votes.innerHTML = member.num_votes_with_party;
      tblCell_party_votes_pct.innerHTML = member.party_pct;

      tblCell_name.appendChild(tblName_to_website);
      tblRow.appendChild(tblCell_name);
      tblRow.appendChild(tblCell_with_party_votes);
      tblRow.appendChild(tblCell_party_votes_pct);
      tblBody.appendChild(tblRow);
    }
  } else if (loyalty == "best") {
    for (member of best_loyal) {
      const tblRow = document.createElement("tr");
      const tblCell_name = document.createElement("td");
      const tblCell_with_party_votes = document.createElement("td");
      const tblCell_party_votes_pct = document.createElement("td");

      const tblName_to_website = document.createElement("a");
      tblName_to_website.setAttribute("href", `"${member.url}"`);
      tblName_to_website.setAttribute("target", "_blank");

      tblName_to_website.innerHTML = member.name;
      tblCell_with_party_votes.innerHTML = member.num_votes_with_party;
      tblCell_party_votes_pct.innerHTML = member.party_pct;

      tblCell_name.appendChild(tblName_to_website);
      tblRow.appendChild(tblCell_name);
      tblRow.appendChild(tblCell_with_party_votes);
      tblRow.appendChild(tblCell_party_votes_pct);
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
  // --------- create table at a glance --------

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

// ----------------------------  functions end --------------------------

// -------- page start functions calls ------------

const start_page = json => {
  const members_data = json.results[0].members;

  if (document.title.includes("Attendance")) {
    event_listeners("worst-table", members_data, "worst");
    event_listeners("best-table", members_data, "best");
    create_state_menu(
      "worst-table",
      "state-menu-dropdown",
      members_data,
      "worst"
    );
    create_state_menu(
      "best-table",
      "state-menu-dropdown",
      members_data,
      "best"
    );
    create_attendance_table("worst-table", members_data, "worst");
    create_attendance_table("best-table", members_data, "best");
    at_a_glance_table("at-glance", members_data);
  } else if (document.title.includes("Loyalty")) {
    event_listeners("worst-table", members_data, "worst");
    event_listeners("best-table", members_data, "best");
    create_state_menu(
      "worst-table",
      "state-menu-dropdown",
      members_data,
      "worst"
    );
    create_state_menu(
      "best-table",
      "state-menu-dropdown",
      members_data,
      "best"
    );
    create_loyalty_table("worst-table", members_data, "worst");
    create_loyalty_table("best-table", members_data, "best");
    at_a_glance_table("at-glance", members_data);
  } else if (
    document.title == "Senate Data" ||
    document.title == "House Data"
  ) {
    create_state_menu("data", "state-menu-dropdown", members_data);
    event_listeners("data", members_data);
    create_members_table("data", members_data);
  }
};

fatch_json();
