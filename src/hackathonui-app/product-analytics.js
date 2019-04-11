import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class ProductAnalytics extends PolymerElement{
    connectedCallback(){
        super.connectedCallback();
        
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        ajaxCall.url = "http://10.117.189.54:8085/product/groupCount";
        //ajaxCall.body = {"id": this.routeData.mainId, "sub_id": this.routeData.subId }
        ajaxCall.generateRequest();

                 
    }
    handleResponse(event){
        //this.data = event.detail.__data.response;
        let data = event.detail.response.map((transaction) => {
            return {
                "groupName": event.detail.response.groupName,
                "count": parseInt(event.detail.response.count)
            }
        })
        var svg = d3.select(this.$.svgImage),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin

        svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Product Group Analytics")

        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
                .attr("transform", "translate(" + 100 + "," + 100 + ")");

        /*d3.csv(this.data, function(error, data) {
            if (error) {
                throw error;
            }*/

            xScale.domain(data.map(function(d) { return  d.groupName; }));
            
            //let yData = data.map(function(d, subarray ) { return  d.details[0].amount; });    
            yScale.domain([0, d3.max(data, function(d) { 
                //data.map(function(d, subarray ) { return  d.details[0].amount; })    
                return d.count; 
            })]);
            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - 250)
            .attr("x", width - 100)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Group Name");

            g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return "$" + d;
            })
            .ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Count");

            g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xScale(d.groupName); })
            .attr("y", function(d) { return yScale(d.count); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - yScale(d.count); })
            .attr("fill", function(d) {
                //return colorPicker(d.amount); // call the color picker to get the fill.
                if (d.count <= 5000) {
                    return "#666666";
                } else if (d.count > 500) {
                    return "#FF0033";
                }
            });
        
    }
    static get template(){
        return html `
        <h2> [[pagetitle]]!</h2>
        <svg id="svgImage" width="980" height="500"></svg>
        <iron-ajax
            auto
            id="ajax"
            handle-as="json"
            on-response="handleResponse"
            debounce-duration="300">
        </iron-ajax>
        
        `;
    }
    static get properties() {
        return {
          pagetitle: {
            type: String,
            value: 'Product Analytics'
          }
          
        };
    }
}
customElements.define('product-analytics', ProductAnalytics);