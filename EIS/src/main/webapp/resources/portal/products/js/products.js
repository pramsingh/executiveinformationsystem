$(document).ready(function(){
	$(".details-button").click(function(){
		$('input[name="editable"]').bootstrapSwitch('state',false);
		$(".details-bar").toggleClass( "open" );
		$(".details").toggleClass("slide");
	});
	$(".add-button").click(function(){
		$(".add-bar").toggleClass( "open" );
		$(".add").toggleClass("slide");
	});
	$("[name='editable']").bootstrapSwitch();
	$('input[name="editable"]').on('switchChange.bootstrapSwitch', function(ev,state){
		if(state == true){
			$('.details-panel').hide();
			$('.edit-form').show();
		} else{
			$('.edit-form').hide();
			$('.details-panel').show();
		}
	});
	$('.browse').click(function(){
		$('.file').trigger('click');
	});
	$('.file').on('change', function(){
		$('#inputUploadFN').val(this.value);
	});
});
$(function (){
	Highcharts.setOptions({
		colors: ['#508eeb', '#d93248']
	});
	$('#chart').highcharts({
		chart: {
			backgroundColor: 'transparent',
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '2014 Season',
            data: [
                ['Wins',   10],
                ['Loss',    6]
            ]
        }]
	});
});