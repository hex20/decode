$(document).ready(function($) {

    var tasksColumns = $('.pro-task__tasks').get();

    countTasks(tasksColumns);
  
    dragula(tasksColumns).on('drop', function() {
      countTasks(tasksColumns);
    });
  
    $('.pro-nav__menu-icon').click(function() {
      toggleMenu();
    });
  
});

function countTasks(columns) {
  $(columns).each(function (index, element) {
    var amount = $(element).children().length;
    $(element).siblings('.pro-task__number').text(amount + ' Tasks');
  });
}

function toggleMenu() {
  $('.pro-sidebar').toggleClass('pro-sidebar--closed');
}
