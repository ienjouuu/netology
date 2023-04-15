module.exports = ((req, res) => {
  res.render('errors/404', {
    title: 'Что то пошло не так... 404',
  });
});
