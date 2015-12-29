Template.slack.helpers({

  slack:function(){
    return SlackCollection.find(
      {
        msg:{$exists:true}

      }
    )
  }
});


Template.stats.events({
  'click #aGithub': function () {
    $(".twitter").css('display', 'none');
    $(".facebook").css('display', 'none');
    $(".slack").css('display', 'none');
    $(".github").css('display', 'block');
  },
  'click #aTwitter': function () {
    $(".twitter").css('display', 'block');
    $(".facebook").css('display', 'none');
    $(".slack").css('display', 'none');
    $(".github").css('display', 'none');
  },
  'click #aFacebook': function () {
    $(".twitter").css('display', 'none');
    $(".facebook").css('display', 'block');
    $(".slack").css('display', 'none');
    $(".github").css('display', 'none');
  },
  'click #aSlack': function () {
    $(".twitter").css('display', 'none');
    $(".facebook").css('display', 'none');
    $(".slack").css('display', 'block');
    $(".github").css('display', 'none');
  }
});
Template.github.events({
  'click button': function () {
    Meteor.call("updateGithub");
  }

});
Template.twitter.events({
  'click button': function () {
    Meteor.call("updateCenasTwitFol");
  }
});
Template.facebook.events({
  'click button': function () {
    Meteor.call('updateFacebook');
  }
});
Template.slack.events({
  'click button': function () {
    Meteor.call('updateSlack');
  }
})
