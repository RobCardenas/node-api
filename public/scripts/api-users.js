// CLIENT-SIDE JAVASCRIPT

$(function() {

// `phrasesController` holds all our phrase funtionality
  var usersController = {
    
    // compile phrase template
    template: _.template($('#user-template').html()),

    all: function() {
      $.get('/users', function(data) {
        var allUsers = data;
        
        // iterate through allPhrases
        _.each(allUsers, function(user) {
          // pass each phrase object through template and append to view
          var $phraseHtml = $(usersController.template(user));
          $('#user_list').append($phraseHtml);
        });
        // add event-handlers to phrases for updating/deleting
        usersController.addEventHandlers();
      });
    },

    create: function(newUser, newFirstName, newLastName, userAge) {
      var userData = {username: newUser, firstname: newFirstName, lastname: newLastName, age: userAge};
      // send POST request to server to create new phrase
      $.post('/users', userData, function(data) {
        // pass phrase object through template and append to view
        var $userHtml = $(usersController.template(data));
        $('#user_list').append($userHtml);
      });
    },

    update: function(userId, upUserName, upFirstName, upLastName, upAge) {
      // send PUT request to server to update phrase
      $.ajax({
        type: 'PUT',
        url: '/users/' + userId,
        data: {
          username: upUserName,
          firstname: upFirstName,
          lastname: upLastName,
          age: upAge
        },
        success: function(data) {
          // pass phrase object through template and append to view
          var $userHtml = $(usersController.template(data));
          $('#user_' + userId).replaceWith($userHtml);
        }
      });
    },
    
    delete: function(phraseId) {
      // send DELETE request to server to delete phrase

      // remove deleted phrase li from the view
    },

    // add event-handlers to phrases for updating/deleting
    addEventHandlers: function() {
      $('#user_list')
        // for update: submit event on `.update-phrase` form
        .on('edit-button', '.update-phrase', function(event) {
          event.preventDefault();
          var phraseId = $(this).closest('.phrase').attr('data-id');
          var updatedWord = $(this).find('.updated-word').val();
          var updatedDefinition = $(this).find('.updated-definition').val();
          phrasesController.update(phraseId, updatedWord, updatedDefinition);
        })
        // for delete: click event on `.delete-phrase` button
        .on('click', '.delete-phrase', function(event) {
          event.preventDefault();
          var phraseId = $(this).closest('.phrase').attr('data-id');
          phrasesController.delete(phraseId);
        });
    },

    setupView: function() {
      // append existing phrases to view
      usersController.all();
      
      // add event-handler to new-phrase form
      $('#new_user_id').on('submit', function(event) {
        event.preventDefault();
        var newUser = $('#user_name').val();
        var newFirstName = $('#first_name').val();
        var newLastName = $('#last_name').val();
        var userAge = $('#user_age').val();
        usersController.create(newUser, newFirstName, newLastName, userAge);
        
        // reset the form
        $(this)[0].reset();
        $('#user_name').focus();
      });
    }
  };

  usersController.setupView();

});