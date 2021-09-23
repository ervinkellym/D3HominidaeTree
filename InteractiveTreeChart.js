// Data declaration
var treeData = [{
	"name": "Hominidae",
    "tooltip": "Humans & Great Apes",
    "parent": "null",
	"children": [
		{
			"name": "Homininae",
            "tooltip": "Subfamily: Hominids, Gorillas, Chimpanzees, & close relatives",
            "parent": "Hominidae",
			"children": [
				{
					"name": "Gorillini",
                    "tooltip": "Tribe: Gorillas & close relatives",
                    "parent": "Homininae",
					"children":[
						{
							"name": "Gorilla",
                            "tooltip": "Genus: Gorillas",
                            "parent": "Gorillini",
							"children": [
								{
									"name": "Gorilla beringei",
                                    "tooltip": "Species: Eastern Gorilla",
                                    "parent": "Gorilla"
								},
								{
									"name": "Gorilla gorilla",
                                    "tooltip": "Species: Western Gorilla",
                                    "parent": "Gorilla"
								}
							]
						}
					]
				},
				{
					"name": "Hominini",
                    "tooltip": "Tribe: Hominids & Chimpanzees",
                    "parent": "Homininae",
					"children": [
						{
							"name": "Australopithecina",
                            "tooltip": "Subtribe: Early Hominids",
                            "parent": "Hominini",
							"children" : [
								{
									"name": "Ardipithecus",
                                    "tooltip": "Species\n",
                                    "parent": "Australopithecina"
								},
								{
									"name": "Australopithecus",
                                    "tooltip": "Species\n",
                                    "parent": "Australopithecina"
								},
								{
									"name": "Paranthropus",
                                    "tooltip": "Species\n",
                                    "parent": "Australopithecina"
								}
							]
						},
						{
							"name": "Hominina",
                            "tooltip": "Subtribe: Later Hominids",
                            "parent": "Hominini",
							"children": [
								{
									"name": "Homo",
                                    "tooltip": "Genus: Humans & close relatives",
                                    "parent": "Hominina",
									"children": [
										{
											"name": "Human heidelbergensis",
                                            "tooltip": "Species: Heidelberg Man",
                                            "parent": "Homo"
										},
										{
											"name": "Homo sapiens",
                                            "tooltip": "Species: Human",
                                            "parent": "Homo"
										}
									]
								}
							]
						},
						{
							"name": "Panina",
                            "tooltip": "Subtribe: Chimpanzees & close relatives",
                            "parent": "Hominini",
							"children": [
								{
									"name": "Pan",
                                    "tooltip": "Genus: Chimpanzees & Bonobos",
                                    "parent": "Panina",
									"children": [
										{
											"name": "Pan paniscus",
                                            "tooltip": "Species: Pygmy Chimpanzee",
                                            "parent": "Pan"
										},
										{
											"name": "Pan troglodytes",
                                            "tooltip": "Species: Chimpanzee",
                                            "parent": "Pan"
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			"name": "Ponginae",
            "tooltip": "Subfamily: Orangutans & close relatives",
            "parent": "Hominidae",
			"children": [
				{
					"name": "Pongo",
                    "tooltip": "Genus: Orangutans",
                    "parent": "Ponginae",
					"children": [
						{
							"name": "Pongo abelii",
                            "tooltip": "Species: Sumatran Orangutan",
                            "parent": "Pongo"
						},
						{
							"name": "Pongo pygmaeus",
                            "tooltip": "Species: Bornean Orangutan",
                            "parent": "Pongo"
						},
						{
							"name": "Pongo tapanuliensis",
                            "tooltip": "Species: Tapanuli Orangutan",
                            "parent": "Pongo"
						}
					]
				}
			]
		}
	]
}];

// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 1300 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body")
    .append("div")
    .attr("id", "mytooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "#eee")
    .text("default text");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select(self.frameElement).style("height", "500px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click)
      .on("mouseover", mouseOver)
      .on("mousemove", mouseMove)
      .on("mouseout", d => { d3.select("#mytooltip").style("visibility", "hidden") });

    nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
      .attr("r", 10)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g").attr("class", "link")
        .attr("d", d => {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition().duration(duration)
        .attr("d", d => {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        }).remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

function mouseOver(d) {
    d3.select(this)
        .transition()
        .ease("cubic")
        .duration(0)
        .attr('r', function (d){
     return (d.x);
    });
    //show tooltip on hover
    d3.select("#mytooltip")
    .style("visibility", "visible")//set style to it
    .text(d.tooltip)//set text to it
}

function mouseMove() {
    return tooltip.style("top", (d3.event.pageY-10)+"px")
    .style("left",(d3.event.pageX+20)+"px");
}
