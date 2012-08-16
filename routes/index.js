
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('editfile', { title: 'Express', contents: "Hi thar!" });
};