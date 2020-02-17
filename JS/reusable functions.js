const create_table_head_and_return_tbody_by_location = (
  location_by_id,
  col_list
) => {
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

  return tblBody;
};

const create_state_dropdown_menu = (
  table_location_id,
  location_by_id,
  members,
  quality = 0
) => {
  const states = [];
  for (i in members) {
    if (!states.includes(members[i].state)) {
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

const event_listeners = (location_by_id, members, quality = "") => {
  document
    .getElementById("CheckboxDemocrats")
    .addEventListener("change", function() {
      if (document.title.includes("Data")) {
        create_members_table(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table(location_by_id, members, quality);
      }
    });
  document
    .getElementById("CheckboxRepublicans")
    .addEventListener("change", function() {
      if (document.title.includes("Data")) {
        create_members_table(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table(location_by_id, members, quality);
      }
    });
  document
    .getElementById("CheckboxIndependents")
    .addEventListener("change", function() {
      if (document.title.includes("Data")) {
        create_members_table(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table(location_by_id, members, quality);
      }
    });
  document
    .getElementById("state-menu-dropdown")
    .addEventListener("change", function() {
      if (document.title.includes("Data")) {
        create_state_dropdown_menu(location_by_id, members);
      } else if (document.title.includes("Loyalty")) {
        create_loyalty_table(location_by_id, members, quality);
        create_loyalty_table(location_by_id, members, quality);
      } else if (document.title.includes("Attendance")) {
        create_attendance_table("worst-table", members, "worst");
        create_attendance_table("best-table", members, "best");
      }
    });
};

const checked_filters_values = () => {
  let selected_boxes = {
    party: [],
    states: []
  };
  let selected_parties = document.querySelectorAll("input[name=party]:checked");
  let selected_states = document.querySelectorAll("input[name=state]:checked");
  for (i = 0; i < selected_parties.length; i++) {
    selected_boxes.party.push(selected_parties[i].value);
  }
  for (i = 0; i < selected_states.length; i++) {
    selected_boxes.states.push(selected_states[i].value);
  }
  if (
    (selected_boxes.party.includes(member.party) &&
      selected_boxes.states.length == 0) ||
    (selected_boxes.states.includes(member.state) &&
      selected_boxes.party.length == 0) ||
    (selected_boxes.states.includes(member.state) &&
      selected_boxes.party.includes(member.party)) ||
    (selected_boxes.party.length == 0 && selected_boxes.states.length == 0)
  ) {
    return true;
  } else {
    return false;
  }
};
