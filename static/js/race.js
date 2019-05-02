var tickDuration = 333;
const top_n = 12;

const svg = d3.select(DOM.svg(width, height));
    
const margin = {
    top: 80,
    right: 0,
    bottom: 5,
    left: 0
};

let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);
let title = svg.append('text')
    .attrs({
      class: 'title',
      y: 24
    })
    .html('18 years of Interbrand’s Top Global Brands');

let subTitle = svg.append('text')
    .attrs({
      class: 'subTitle',
      y: 55
    })
    .html('Brand value, $m');

let caption = svg.append('text')
    .attrs({
      class: 'caption',
      x: width,
      y: height-5
    })
    .styles({
      'text-anchor': 'end'
    })
    .html('Source: Interbrand');

let year = 2000;

brandData.forEach(d => {
    d.value = +d.value,
    d.lastValue = +d.lastValue,
    d.value = isNaN(d.value) ? 0 : d.value,
    d.year = +d.year,
    d.colour = d3.hsl(Math.random()*360,0.75,0.75)
  });

let yearSlice = brandData.filter(d => d.year == year && !isNaN(d.value))
  .sort((a,b) => b.value - a.value)
  .slice(0,top_n);

yearSlice.forEach((d,i) => d.rank = i);

let x = d3.scaleLinear()
    .domain([0, d3.max(yearSlice, d => d.value)])
    .range([margin.left, width-margin.right-65]);

let y = d3.scaleLinear()
    .domain([top_n, 0])
    .range([height-margin.bottom, margin.top]);

let xAxis = d3.axisTop()
    .scale(x)
    .ticks(width > 500 ? 5:2)
    .tickSize(-(height-margin.top-margin.bottom))
    .tickFormat(d => d3.format(',')(d));

svg.append('g')
    .attrs({
      class: 'axis xAxis',
      transform: `translate(0, ${margin.top})`
    })
    .call(xAxis)
      .selectAll('.tick line')
      .classed('origin', d => d == 0);

      svg.selectAll('rect.bar')
      .data(yearSlice, d => d.name)
      .enter()
      .append('rect')
      .attrs({
        class: 'bar',
        x: x(0)+1,
        width: d => x(d.value)-x(0)-1,
        y: d => y(d.rank)+5,
        height: y(1)-y(0)-barPadding
      })
      .styles({
        fill: d => d.colour
      });


svg.selectAll('text.label')
    .data(yearSlice, d => d.name)
    .enter()
    .append('text')
    .attrs({
        class: 'label',
        x: d => x(d.value)-8,
        y: d => y(d.rank)+5+((y(1)-y(0))/2)+1,
        'text-anchor': 'end'
      })
      .html(d => d.name);

    svg.selectAll('text.valueLabel')
      .data(yearSlice, d => d.name)
      .enter()
      .append('text')
      .attrs({
        class: 'valueLabel',
        x: d => x(d.value)+5,
        y: d => y(d.rank)+5+((y(1)-y(0))/2)+1,
      })
      .text(d => d3.format(',.0f')(d.lastValue));

      let yearText = svg.append('text')
      .attrs({
        class: 'yearText',
        x: width-margin.right,
        y: height-25
      })
      .styles({
        'text-anchor': 'end'
      })
      .html(~~year)
      .call(halo, 10);

      let ticker = d3.interval(e => {
  
        yearSlice = brandData.filter(d => d.year == year && !isNaN(d.value))
          .sort((a,b) => b.value - a.value)
          .slice(0,top_n);
        
        yearSlice.forEach((d,i) => d.rank = i);
        
        x.domain([0, d3.max(yearSlice, d => d.value)]);
        
        svg.select('.xAxis')
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .call(xAxis);
        
        let bars = svg.selectAll('.bar').data(yearSlice, d => d.name);
        
        bars
          .enter()
          .append('rect')
          .attrs({
            class: d => `bar ${d.name.replace(/\s/g,'_')}`,
            x: x(0)+1,
            width: d => x(d.value)-x(0)-1,
            y: d => y(top_n+1)+5,
            height: y(1)-y(0)-barPadding
          })
          .styles({
            fill: d => d.colour
          })
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              y: d => y(d.rank)+5
            });
        
        bars
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              width: d => x(d.value)-x(0)-1,
              y: d => y(d.rank)+5
            });
        
        bars
          .exit()
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              width: d => x(d.value)-x(0)-1,
              y: d => y(top_n+1)+5
            })
            .remove();
        
        let labels = svg.selectAll('.label').data(yearSlice, d => d.name);
        
        labels
          .enter()
          .append('text')
          .attrs({
            class: 'label',
            x: d => x(d.value)-8,
            y: d => y(top_n+1)+5+((y(1)-y(0))/2),
            'text-anchor': 'end'
          })
          .html(d => d.name)    
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              y: d => y(d.rank)+5+((y(1)-y(0))/2)+1,
            });
        
        labels
          .transition()
          .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              x: d => x(d.value)-8,
              y: d => y(d.rank)+5+((y(1)-y(0))/2)+1
            });
        
        labels
          .exit()
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              x: d => x(d.value)-8,
              y: d => y(top_n+1)+5
            })
            .remove();
        
        let valueLabels = svg.selectAll('.valueLabel').data(yearSlice, d => d.name);
        
        valueLabels
          .enter()
          .append('text')
          .attrs({
            class: 'valueLabel',
            x: d => x(d.value)+5,
            y: d => y(top_n+1)+5,
          })
          .text(d => d3.format(',.0f')(d.lastValue))
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              y: d => y(d.rank)+5+((y(1)-y(0))/2)+1
            });
        
        valueLabels
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              x: d => x(d.value)+5,
              y: d => y(d.rank)+5+((y(1)-y(0))/2)+1
            })
            .tween("text", function(d) {
              let i = d3.interpolateRound(d.lastValue, d.value);
              return function(t) {
                this.textContent = d3.format(',')(i(t));
              };
            });
        
        valueLabels
          .exit()
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attrs({
              x: d => x(d.value)+5,
              y: d => y(top_n+1)+5
            })
            .remove();
        
        yearText.html(~~year);
        
        if(year == 2018) ticker.stop();
        year = d3.format('.1f')((+year) + 0.1);
      },tickDuration);
    
      return svg.node();

      