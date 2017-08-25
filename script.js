///////////////////////////////////////////////////////////////////////////
/////////////////////////////// Variables /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//Data sources
var data_in = "data/pol_data.json ";

//Dimensions of the visualization.. hardcoded
var width = 960,
    height = 500;
    padding = 25;
var point_radius = 1;

// assign svgs
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

var g = svg.append("g");

var xScale = d3.scale.linear()
    .domain([-1, 1])
    .range([padding, width - padding * 2])  // set the output range
    .nice();  // Make decimals round up nicely

var yScale = d3.scale.linear()
    .domain([-1, 1])
    .range([height - padding, padding])  // set the output range
    .nice();  // Make decimals round up nicely

d3.json(data_in, function(error, pol) {
  if (error) throw error;
  
  g.selectAll(".symbol")
    .data(pol)
    .enter().append("circle", ".symbol")
    // .filter(function(d) {
    //   return d.depth < depth_max 
    //        & d.depth > depth_min 
    //        & d.d18o >= skip_val
    // })
    .attr("r", point_radius)
        // change dot
    // .style("fill", function(d) {
    //   return color(d.d18o);
    // })
    .style("opacity", 1)
    .attr("x", xScale(pol.v1))
    .attr("y", yScale(pol.v2))
    // .attr("transform", function(d) {
    //   return "translate(" + projection([
    //     d.v1,
    //     d.v2
    //   ]) + ")";
    // })
});

var xAxis = d3.svg.axis()  // Create an x axis
    .scale(xScale)      // Scale x axis
    .orient("bottom")  // Put text on bottom of axis line
    .ticks(10);  // Set rough # of ticks (optional)

svg.append("g")     // Append a group element (itself invisible, but helps 'group' elements)
    .attr("class", "axis")  // Assign the 'axis' CSS
    .attr("transform", "translate(0," + (height - padding) + ")")  // Place axis at bottom
    .call(xAxis);  // Call function to create axis

// Define Y axis and attach to graph
var yAxis = d3.svg.axis()  // Create a y axis
    .scale(yScale)  // Scale y axis
    .orient("left")
    .ticks(5);  // Set rough # of ticks (optional)

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);