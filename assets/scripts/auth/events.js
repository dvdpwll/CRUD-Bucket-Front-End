'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

const onSignUp = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  console.log(data);
  api.signUp(data)
      .done(ui.success)
      .fail(ui.failure);
  $('#sign-up').modal('hide');
};

const onSignIn = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
      .done(ui.signInSuccess)
      .fail(ui.failure);
  $('#sign-in').modal('hide');
  console.log(data);
};

const onChangePassword = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
      .done(ui.success)
      .fail(ui.failure);
  console.log(data);
  $('#change-password').modal('hide');
};

const OnSignOut = function (event) {
  event.preventDefault();
  api.signOut()
      .done(ui.signOutSuccess)
      .fail(ui.failure);
  $('#welcome').html('Echo Diary');
  $('.after-sign-in, .after-show-diary').addClass('hide');
  $('.before-sign-in').removeClass('hide');
  $('.my-diary').empty();
  $('.edit-diary').empty();
  $('#welcome-user').html('Echo Diary');
  $('#welcome-sign').html('Record your life from here');
};

//folder ajax
const onCreate = function (event) {
  let folderData = getFormFields(this);
  console.log(folderData);
  event.preventDefault();

  api.create(folderData)
    .done(ui.createSuccess)
    .fail(ui.onError);
  $('#create-folder').modal('hide');
};

const addHandlers = () => {
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('.change-password-form').on('submit', onChangePassword);
  $('#sign-out').on('click', OnSignOut);
  $('.create-folder-form').on('submit', onCreate);
  $('#show-users').on('click', api.getUsers);
  $('#my-folder').on('click', api.getMyFolders);
};

module.exports = {
  addHandlers,
};
