
d3.json("/data/test.json", function (yelp_data) {
	

var bubbleChart = dc.bubbleChart("#dc-bubble-graph");
var pieChart = dc.pieChart("#dc-pie-graph");
var volumeChart = dc.barChart("#dc-volume-chart");
var flowChart = dc.pieChart("#dc-flow-chart");
var dataTable = dc.dataTable("#dc-table-graph");
var rowChart = dc.rowChart("#dc-row-graph");


var ndx = crossfilter(yelp_data);
	
	// for volumechart	
	var numberFormat = d3.format('.2f');
	var parseDate = d3.time.format("%Y").parse;
	yelp_data.forEach(function(d){
		d.year = parseDate(d.year).getFullYear();
	});
	var yearDim = ndx.dimension(function(d) {return d.year;});
	var yearDimGroup = yearDim.group().reduce(
			function(p,v){
				++p.count;
				p.trade_sum += v.trade_usd;
				p.avg= p.trade_sum/p.count;
				return p;
			},
			//remove
			function(p,v){
				--p.count;
				p.trade_sum -= v.trade_usd;
				p.avg = p.trade_sum/ p.count;
				return p;
			},
			//init
			function(p,v){
				return {count:0, trade_sum: 0, avg:0};
			}
	
	
	)
	
	
	var minyear = yearDim.bottom(1)[0].year;
	var maxyear = yearDim.top(1)[0].year;
	print_filter(minyear);
	print_filter(maxyear);
	
	
	//for bubble chart
	var countryDimension = ndx.dimension(function (d) { return d.country; });
	var countryGroup=countryDimension.group().reduceSum(function(d){return d.trade_usd;});
	print_filter(countryGroup);
	var countryDimensionGroup = countryDimension.group().reduce(
		//add
		function(p,v){
			++p.count;
			p.trade_sum += v.trade_usd;
			p.avg= p.trade_sum/p.count;
			return p;
		},
		//remove
		function(p,v){
			--p.count;
			p.trade_sum -= v.trade_usd;
			p.avg = p.trade_sum/ p.count;
			return p;
		},
		//init
		function(p,v){
			return {count:0, trade_sum: 0, avg:0};
		}
	);
	 
	var xrange= [0, d3.max(countryDimensionGroup.all(),function(d){ return d.value.avg;})];
	var yrange= [0, d3.max(countryDimensionGroup.all(),function(d){ return d.value.trade_sum;})]
	
	// for pieChart
	var categories = ndx.dimension(function(d) {return d.type;});
	var type_group = categories.group().reduceSum(function(d){ 
		return d.trade_usd;});
  

    //for flow pie chart
    var flowDim = ndx.dimension(function(d){return d.flow;});
    var flowDimGroup = flowDim.group().reduceSum(function(d){ return d.trade_usd;});

    
	
bubbleChart.width(750)
			.height(300)
			.margins({top: 10, right: 50, bottom: 30, left: 40})
			.dimension(countryDimension)
			.group(countryDimensionGroup)
			.transitionDuration(300)
			.colors(d3.scale.category10())
			
		
			
			.keyAccessor(function (p) {
				return p.value.trade_sum;
			})
			.valueAccessor(function (p) {
				return p.value.avg;
			})
			.radiusValueAccessor(function (p) {
				return p.value.count;
			})
			.x(d3.scale.linear().domain(xrange))
			.y(d3.scale.linear().domain(yrange))
			.r(d3.scale.linear().domain([0,500]))
		
			.elasticY(true)
			.yAxisPadding(200)
			.elasticX(true)
			.xAxisPadding(200)
			
			
			.label(function (p) {
				return p.key;
				})
			.title(function(p){
				return "Total trade:$" +  p.value.trade_sum +"\n"+
						"Trade average:$"+ numberFormat(p.value.avg)
			})
				
			.renderLabel(true)
			.renderlet(function (chart) {
		        rowChart.filter(chart.filter());
		    })
		    .on("postRedraw", function (chart) {
		        dc.events.trigger(function () {
		            rowChart.filter(chart.filter());
		        });
			            });;


pieChart.width(300)
		.height(300)
		.transitionDuration(1500)
		.dimension(categories)
		.group(type_group)
	
		.colors(d3.scale.category10())
		.radius(120)
		.innerRadius(30)
		.minAngleForLabel(0)
		.label(function(d) { return d.data.key; });


flowChart.width(200)
		 .height(200)
		 .transitionDuration(1500)
		 .dimension(flowDim)
		 .group(flowDimGroup)
		 .colors(colorbrewer.RdYlGn[9]) 
		 .radius(90)
		 
		.minAngleForLabel(0)
		.label(function(d) { return d.data.key; });

volumeChart.width(750)
	.height(300)
	.dimension(yearDim)
	.group(yearDimGroup)
	.transitionDuration(1500)
	.centerBar(true)	
	.gap(4)
	.filter([minyear-1,maxyear+1])
	.x(d3.scale.linear().domain([minyear-1,maxyear+1]))
	.valueAccessor(function(d) {
			return d.value.trade_sum;
			})
			.elasticY(true)

			.xAxis().ticks(6).tickFormat(d3.format("d"));	
volumeChart.yAxis().ticks(5).tickFormat(function(v) {return v;});

rowChart.width(400)
	.height(300)
	.dimension(countryDimension)
	.group(countryGroup)
	.renderLabel(true)
	.colors(d3.scale.category10())
	
	 .renderlet(function (chart) {
		        bubbleChart.filter(chart.filter());
		    })
		    .on("filtered", function (chart) {
		        dc.events.trigger(function () {
		            bubbleChart.filter(chart.filter());
		        });
			            })
		.xAxis().ticks(5);

dataTable.width(800).height(800)
	.dimension(yearDim)
	.group(function(d) { return d.year;
	})
	.size(100)
	.columns([
	          function(d) { return d.country; },
	          function(d) { return d.type; },
	          function(d) { return d.flow; },
	          function(d) { return d.trade_usd; }
	          
])
.sortBy(function(d){ return d.country; })
.order(d3.ascending);

	dc.renderAll();
});

function print_filter(filter){
	var f=eval(filter);
	if (typeof(f.length) != "undefined") {}else{}
	if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
} 
