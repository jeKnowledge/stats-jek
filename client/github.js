Template.github.helpers({
  github: function(){
    return RandomCenas.findOne({api: "github"});
  },
  commits: function(){
    return RandomCenas.find(
      {
        api: "github",
        commit: {$exists: true}
      },
      {
        sort: {"commit.date": -1},
        limit:10
      }
    );
  }
});
