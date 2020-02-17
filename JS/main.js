// ---------------- functions    -------------

const fetch_json = () => {
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

// -------- page start functions calls ------------

const start_page = json => {
  const members_data = json.results[0].members;

  if (document.title.includes("Attendance")) {
    event_listeners("worst-table", members_data, "worst");
    event_listeners("best-table", members_data, "best");
    create_state_dropdown_menu(
      "worst-table",
      "state-menu-dropdown",
      members_data,
      "worst"
    );
    create_state_dropdown_menu(
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
    create_state_dropdown_menu(
      "worst-table",
      "state-menu-dropdown",
      members_data,
      "worst"
    );
    create_state_dropdown_menu(
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
    create_state_dropdown_menu("data", "state-menu-dropdown", members_data);
    event_listeners("data", members_data);
    create_members_table("data", members_data);
  }
};

fetch_json();
