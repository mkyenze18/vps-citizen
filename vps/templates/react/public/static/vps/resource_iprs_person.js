// TODO http://www.daterangepicker.com/#example3
$(function() {
    $('input[name="date_of_birth"]').daterangepicker({
      // minDate: ,
      maxDate: new Date(),
      singleDatePicker: true,
      showDropdowns: true,
      // minYear: 1901,
      // maxYear: parseInt(moment().format('YYYY'),10)
    }, function(start, end, label) {
      // var years = moment().diff(start, 'years');
      // alert("You are " + years + " years old!");
    });
});