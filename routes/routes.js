const { Router } = require('express');
const router = Router();
const { Appointment } = require('../db');


function checkLogin(req, res, next) {
    if (req.session.user == null) {
      return res.redirect('/login');
    }
    next();
}

  
router.get('/', checkLogin, async (req, res) => {
    const Appointmentnew = await Appointment.findAll();
    res.render('index.ejs', { appointments : Appointmentnew});
});

router.get('/appointment', async (req, res) => {
  const Appointmentnew = await Appointment.findAll();
  res.render('appointment', { appointment : Appointmentnew});
});


router.post('/appointment', async (req, res) => {
    console.log(req.body.complain);

  try {
      if (req.body.pacient == '')
          throw new Error('El paciente no puede ser vacío, debes de escribir uno');
      if (req.body.complain == '')
          throw new Error('La complicación no puede ser vacía, debes de escribir uno');
      const new_appointment = await Appointment.create({
          date: req.body.date,
          time: req.body.time,
          patient: req.body.patient,
          complain: req.body.complain
      });
      req.flash('mensaje', `El appointment con complejo ${new_appointment.complain} fue creado en la base de datos.`);
  } catch (err) {
      console.log(err.message);
      req.flash('error', err.message);
  }

  /*let info = req.body;
  quotes.push({author: info.author, text: info.text})
  console.log(quotes); */
  res.redirect('/');

});


  
module.exports = router;