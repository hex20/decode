
var tasksColumns = [];

$(document).ready(function() {
  
    getColumns();

    countTasks(tasksColumns);
  
    dragula(tasksColumns);
  
    $('.pro-nav__menu-icon').click(function() {
      toggleMenu();
    });
  
});

function countTasks(Columns) {
  $(Columns).each(function (index, element) {
    var amount = element.children().length;
    element.siblings('.pro-task__number').text(amount + ' Tasks');
  });
}

function toggleTabs() {

}

function toggleMenu() {
  $('.pro-sidebar').toggleClass('pro-sidebar--closed');
}

function getColumns() {
  $('.pro-task__tasks').each(function(index, element) {
    console.log(element);
    tasksColumns.push($(element));   
  })

  return true;
}