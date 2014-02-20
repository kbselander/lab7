var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find()
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[projectID]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;

  console.log(form_data);  // will no0t print
  console.log(req.body);

  var newPost = new models.Project({
    "title": form_data.title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url 
  });

  newPost.save(afterSaving);

  function afterSaving(err) { // this is a callback
      if(err) {console.log(err); res.send(500); }
      res.redirect('/');
    }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  console.log(models.Project // finds all projects
    .find(projectID));

  models.Project // deletes all projects
    .find(projectID)
    .remove()
    .exec(deleteCallback);

  function deleteCallback(err) {
    if(err) { console.log(err); res.send(500);}
    res.send(200);
  }

}