
var eventColors1 = [
    
];
var rClcick_Menu_Event = [
    [{
        text: "Delete",
        action: function () {
            console.log("Cut");
        }
    }]
];
var R = {
    Init: function () {
        R.RenderCalendar();
        R.RenderExtraEvent();
        // R.SetRightClick();

    },
    Register: function () {
        $('#test-add-event').off('click').on('click', function () {
            var data_event = {
                title: "Test them su kien",
                start: "2021-06-18T10:30:00",
                end: "2021-06-19T10:30:00",
                editable: false
            }
            R.AddEvent(data_event)
        })
        $('#save-add-event').off('click').on('click', function(){
            R.SaveEvents();

        })


    },
    RenderCalendar: function () {

        var el_calender = $('.mixed-calendar');
        var x = el_calender.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            defaultDate: '2021-06-12',
            events: eventColors1, // Day la event color goc cua no
            locale: 'vi',
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function () {
                // if ($('#drop-remove').is(':checked')) { // is the "remove after drop" checkbox checked?
                //     $(this).remove(); // if so, remove the element from the "Draggable Events" list
                // }
            },
            eventMouseover: function (event, jsEvent, view) {
                console.log(event);
                console.log(jsEvent);
                var el = jsEvent.currentTarget;
                var class_container = $(el).parent();
                class_container.addClass(event._id);
                R.SetRightClick(event);
                // R.SetRightClick(el);
            }
        });
        
        R.Register();
    },
    RenderExtraEvent: function () {
        // Initialize the external events
        $('#external-events-1 .fc-event-mixed').each(function () {

            // Different colors for events
            $(this).css({ 'backgroundColor': $(this).data('color'), 'borderColor': $(this).data('color') });

            // Store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).html()), // use the element's text as the event title
                color: $(this).data('color'),
                stick: true // maintain when user navigates (see docs on the renderEvent method)
            });

            // Make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 // original position after the drag
            });
        });
        R.Register();
    },
    AddEvent: function (dataEvent) { //Them 1 event moi
        // var array = [];
        // array.push(dataEvent);
        var el_calender = $('.mixed-calendar');
        var original_source = el_calender.fullCalendar( 'getEventSources' );
        original_source.push(dataEvent);
        console.log(original_source);
        el_calender.fullCalendar( 'refetchEventSources', original_source )
        R.SetRightClick();

    },
    SetRightClick: function (event) {
        console.log(event);
        if(typeof(event) !== 'undefined'){
            $.contextMenu({
                selector: "."+event._id, 
                callback: function(key, options) {
                    var el_calender = $('.mixed-calendar');
                    if(key == "delete"){
                       
                        el_calender.fullCalendar( 'removeEvents', event._id )
                    }
                    if(key == "edit"){
                        event.title = "da sua ten";
                        el_calender.fullCalendar( 'updateEvent', event )
                    }
                },
                items: {
                    "edit":{name: "Edit", icon: "edit"},
                    "delete": {name: "Delete", icon: "delete"},
                    "quit": {name: "Quit", icon: function(){
                        return 'context-menu-icon context-menu-icon-quit';
                    }}
                }
            });
        }
        
        R.Register();
    },
    SaveEvents: function(){
        var el_calender = $('.mixed-calendar');
        var x = el_calender.fullCalendar( 'getEventSources' );
        console.log(x);


    }
}
$(document).ready(function () {
    R.Init();
})
