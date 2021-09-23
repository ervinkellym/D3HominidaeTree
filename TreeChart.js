function treeChart() {

    // Data declaration
    const treeData = {
    	"name": "Hominidae",
    	"children": [
    		{
    			"name": "Homininae",
    			"children": [
    				{
    					"name": "Gorillini",
    					"children":[
    						{
    							"name": "Gorilla",
    							"children": [
    								{
    									"name": "Eastern Gorilla (Gorilla beringei)"
    								},
    								{
    									"name": "Western Gorilla (Gorilla gorilla)"
    								}
    							]
    						}
    					]
    				},
    				{
    					"name": "Hominini",
    					"children": [
    						{
    							"name": "Australopithecina",
    							"children" : [
    								{
    									"name": "Ardipithecus"
    								},
    								{
    									"name": "Australopithecus"
    								},
    								{
    									"name": "Paranthropus"
    								}
    							]
    						},
    						{
    							"name": "Hominina",
    							"children": [
    								{
    									"name": "Homo",
    									"children": [
    										{
    											"name": "Heidelberg Man (Human heidelbergensis)"
    										},
    										{
    											"name": "Human (Homo sapiens)"
    										}
    									]
    								}
    							]
    						},
    						{
    							"name": "Panina",
    							"children": [
    								{
    									"name": "Pan",
    									"children": [
    										{
    											"name": "Pygmy Chimpanzee (Pan paniscus)"
    										},
    										{
    											"name": "Chimpanzee (Pan troglodytes)"
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
    			"children": [
    				{
    					"name": "Pongo",
    					"children": [
    						{
    							"name": "Sumatran Orangutan (Pongo abelii)"
    						},
    						{
    							"name": "Bornean Orangutan (Pongo pygmaeus)"
    						},
    						{
    							"name": "Tapanuli Orangutan (Pongo tapanuliensis)"
    						}
    					]
    				}
    			]
    		}
    	]
    };

    // Declares a tree layout and assigns the size
    const treeLayout = d3.tree().size([600, 700]);
    const nodes = d3.hierarchy(treeData, d => d.children);
    treeLayout(nodes);

    treeNodes = d3.select("svg g.nodes");

    // Style parent nodes as circles
    treeNodes.selectAll("circle")
        .data(nodes.descendants())
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("r", 9);

    d3.select('svg g.links')
        .selectAll("line")
        .data(nodes.links())
        .enter()
        .append("path")
        .classed("link", true)
        .attr("d", function (d) {
            return "M" + d.target.y + "," + d.target.x
                + "C" + (d.source.y + d.target.y)/2 + "," + d.target.x
                + " " + (d.source.y + d.target.y)/2 + "," + d.source.x
                + " " + d.source.y + "," + d.source.x;
        });

    treeNodes.selectAll("text.nodes")
        .data(nodes.descendants())
        .enter()
        .append("text")
        .attr("class", "text")
        .attr("transform", d => `translate(${d.y+10},${d.x+5})`)
        .text(d => d.data.name);
}
