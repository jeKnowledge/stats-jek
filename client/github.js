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
        limit:9
      }
    );
  },
  commitsTE:function(){
    var cursor=RandomCenas.find(
      {
        api: "github",
        commit: {$exists: true}
      },
      {
        sort: {"commit.date": -1},
      }
    ).collection._docs._map;
    var soma=0;

    return soma;


  }
});
