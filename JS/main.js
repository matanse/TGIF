const members = data.results[0].members;

const print_members = arr => {
  for (i in arr) {
    if (members[i].middle_name == null) {
      let full_name = `${members[i].first_name} ${members[i].last_name}`;
      console.log(full_name);
    } else {
      let full_name = `${members[i].first_name} ${members[i].middle_name} ${members[i].last_name}`;
      console.log(full_name);
    }
  }
};

print_members(members);
