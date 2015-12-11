Slack={
  getLastMSG:function(channelID,channelName){
    //#tech ID=C03243CUQ
    //b3="C0D2AAXU3"
    RandomCenas.remove({msg:{$exists:true}});
    var link = "https://slack.com/api/channels.info" ;
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {"token": "xoxp-2770728157-13157110868-15807297649-cc4e782ed1",
              "channel": channelID
              }
    };
    HTTP.call('GET',link,arguments,function(error,response){
      var data=response.data.channel.latest;
      RandomCenas.insert({
        api:"slack",
        msg:{
          channel:channelName,
          message:data.text,
          author:Slack.getName(data.user)
        }
      });
    });
  },
  LastMsg:function(){
    Slack.getLastMSG("C03243CUQ","#tech");
    Slack.getLastMSG("C0D2AAXU3","#b3");
    Slack.getLastMSG("C03SNTML6","#events");
    Slack.getLastMSG("C02NNME5P","#random");
  },
  getName:function(nomeID){
    var link = "https://slack.com/api/users.info" ;
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {"token": "xoxp-2770728157-13157110868-15807297649-cc4e782ed1",
                "user":nomeID
              }
    };
    var result=HTTP.call('GET',link,arguments);
    return result.data.user.name;
  }

};
