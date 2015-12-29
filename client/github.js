Template.github.helpers({
  githubTot: function(){
    return GitCollection.findOne({totalCommits:{$exists:true}});
  },
  githubLast:function(){
    return GitCollection.findOne({lastCommitsnumb:{$exists:true}});
  },
  commits: function(){
    return GitCollection.find(
      {
        commit: {$exists: true}
      },
      {
        sort: {"commit.date": -1},
        limit:10
      }
    );
  }
});
