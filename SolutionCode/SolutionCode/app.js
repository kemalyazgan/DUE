function getExcerciseInfo() {
    return {
        excerciseNumber: 5,
        isAnimated: false,

    };
}

/*
    Create a Parallel Coordinates plot of the given data (Luftdaten_neu.csv) on your own.
    If you like, you can use the example from here:
    https://www.d3-graph-gallery.com/graph/parallel_basic.html as a template.
    However, how you create the visualization and exactly how you design it is up to you,
    as long as you use either two.js or d3.
*/
function draw(two) {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // get the data
    d3.csv("DesignuebungGradesVIS20212022.csv").then( function(data) {
        data.forEach(function(d) {
            d.Grade = +d.Grade;
        });
        // X axis: scale and draw
        const grades = ["1.0", "1.3", "1.7", "2.0", "2.3", "2.7", "3.0", "3.3", "3.7", "4.0", "5.0"];
        const x = d3.scaleBand()
            .domain(grades)
            .range([0, width])
            .padding(0.1);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // set the parameters for the histogram
        const histogram = d3.histogram()
            .value(function(d) { return +d.Grade; })
            .domain([0, 6])
            .thresholds(x.domain()); // Use the grades directly as thresholds


        // And apply this function to data to get the bins for each series
        const bins1 = histogram(data.filter(function(d) { return d.Year === "2021"; }));
        const bins2 = histogram(data.filter(function(d) { return d.Year === "2022"; }));
        const bins3 = histogram(data.filter(function(d) { return d.Year === "2023"; }));
        console.log(bins1);
        console.log(bins2);
        console.log(bins3);

// Y axis: scale and draw
        const y = d3.scaleLinear()
            .range([height, 0]);
        y.domain([0, d3.max(bins1.concat(bins2), function(d) { return d.length; })]);

        svg.append("g")
            .call(d3.axisLeft(y));

// append the bars for series 1
        svg.selectAll(".rect1")
            .data(bins1)
            .join("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#69b3a2")
            .style("opacity", 0.6);

// append the bars for series 2
        svg.selectAll(".rect2")
            .data(bins2)
            .join("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#404080")
            .style("opacity", 0.6);

// append the bars for series 2
        svg.selectAll(".rect3")
            .data(bins3)
            .join("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#728FCE")
            .style("opacity", 0.6);

// Handmade legend
        svg.append("circle").attr("cx", 300).attr("cy", 7).attr("r", 6).style("fill", "#69b3a2");
        svg.append("circle").attr("cx", 300).attr("cy", 37).attr("r", 6).style("fill", "#404080");
        svg.append("text").attr("x", 320).attr("y", 10).text("Year 2021").style("font-size", "15px").attr("alignment-baseline", "middle");
        svg.append("text").attr("x", 320).attr("y", 40).text("Year 2022").style("font-size", "15px").attr("alignment-baseline", "middle");
    });

}