$(function(){
    var d = new Date(),
        h = d.getHours(),
        m = d.getMinutes()
    
    if(h < 10) h = '0' + h; 
    if(m < 10) m = '0' + m; 
    $('input[type="time"][value="now"]').each(function(){ 
    $(this).attr({'value': h + ':' + m});

    });
});