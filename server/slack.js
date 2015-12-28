Slack={
  getLastMSG:function(channelID,channelName){
    SlackCollection.remove({msg:{$exists:true}});
    var link = "https://slack.com/api/channels.info" ;
    var arguments = {
      headers: {"User-Agent": "Meteor/1.0"},
      params: {"token": "xoxp-2770728157-13157110868-15807297649-cc4e782ed1",
              "channel": channelID
              }
    };
    HTTP.call('GET',link,arguments,function(error,response){
      var data=response.data.channel.latest;
      SlackCollection.insert({
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
    Slack.getLastMSG("C02NNME5F","#geral");
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
