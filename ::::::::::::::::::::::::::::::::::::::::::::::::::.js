///////////////////////////////////////////////////////////////////////////
/////////////////////////////// Variables /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//Data sources
var data_in = "/beegfs/work/smapp/playground/word_vex/pol/pol_data.json",

//Dimensions of the visualization.. hardcoded
var width = 960,
    height = 500;

var point_radius = .75;

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
    .style("opacity", 0.8)
    .attr("transform", function(d) {
      return "translate(" + projection([
        d.v1,
        d.v2
      ]) + ")";
    });