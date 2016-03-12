Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {

      //show newest tasks at the top
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .next-task": function(event) {
      event.preventDefault();

      //Get value from form element
      var text = event.target.text.value;

      //Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      //Clear form
      event.target.text.value = "";
    }
  });

  Template.task.events({
    //set the checked property to the opposite of its current value
    "click .toggle-checked": function() {
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },

    "click .delete": function() {
      Tasks.remove(this._id);
    }
  })
}
