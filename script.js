		// Configuration
		//
		// ms to wait after dragging before auto-rotating
		var rotationDelay = 3000
		// scale of the globe (not the canvas element)
		var scaleFactor = 0.9
		// autorotation speed
		var degPerSec = 6
		// start angles
		var angles = {
		  x: 0,
		  y: 40,
		  z: 0
		}
		// colors
		var colorWater = 'transparent'
		var colorLand = 'yellowgreen'
		var colorGraticule = '#ccc'
		var colorCountry = '#111'
		var colorLineCountry = '#fff'
		//
		// Handler
		function leave(country) {
		  current.text('')
		}
		//
		// Variables
		//
		var current = d3.select('#current')
		var canvas = d3.select('#globe')
		var context = canvas.node().getContext('2d')
		var water = {
		  type: 'Sphere'
		}
		var projection = d3.geoOrthographic().precision(0.1)
		var graticule = d3.geoGraticule10()
		var path = d3.geoPath(projection).context(context)
		var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
		var r0 // Projection rotation as Euler angles at start.
		var q0 // Projection rotation as versor at start.
		var lastTime = d3.now()
		var degPerMs = degPerSec / 1000
		var width, height
		var land, countries
		var countryList
		var autorotate, now, diff, roation
		var currentCountry
		// Functions
		function setAngles() {
		  var rotation = projection.rotate()
		  rotation[0] = angles.y
		  rotation[1] = angles.x
		  rotation[2] = angles.z
		  projection.rotate(rotation)
		}

		function scale() {
		  width = document.documentElement.clientWidth
		  height = document.documentElement.clientHeight
		  canvas.attr('width', width).attr('height', height)
		  projection
		    .scale((scaleFactor * Math.min(width, height)) / 2)
		    .translate([width / 2, height / 2])
		  render()
		}
		//////////////////////////////////////////////////////////////
/* 
		context.strokeStyle = "#fff", 
		context.lineWidth = .5, 
		context.beginPath(), 
        path(borders), context.stroke(); */
		//////////////////////////////////////////////////////////////

		function startRotation(delay) {
		  autorotate.restart(rotate, delay || 0)
		}

		function stopRotation() {
		  autorotate.stop()
		}

		function dragstarted() {
		  v0 = versor.cartesian(projection.invert(d3.mouse(this)))
		  r0 = projection.rotate()
		  q0 = versor(r0)
		  stopRotation()
		}

		function dragged() {
		  var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
		  var q1 = versor.multiply(q0, versor.delta(v0, v1))
		  var r1 = versor.rotation(q1)
		  projection.rotate(r1)
		  render()
		}

		function dragended() {
		  startRotation(rotationDelay)
		}

		function render() {
		  context.clearRect(0, 0, width, height)
		  fill(water, colorWater)
		  stroke(graticule, colorGraticule)
		  fill(land, colorLand)
		  if (currentCountry) {
		    fill(currentCountry, colorCountry)
		  }
		}

		function fill(obj, color) {
		  context.beginPath()
		  path(obj)
		  context.fillStyle = color
		  context.fill()
		}

		function stroke(obj, color) {
		  context.beginPath()
		  path(obj)
		  context.strokeStyle = color
		  context.stroke()
		}

		function rotate(elapsed) {
		  now = d3.now()
		  diff = now - lastTime
		  if (diff < elapsed) {
		    rotation = projection.rotate()
		    rotation[0] += diff * degPerMs
		    projection.rotate(rotation)
		    render()
		  }
		  lastTime = now
		}

		function loadData(cb) {
		  d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function(error, world) {
		    if (error) throw error
		    d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function(error, countries) {
		      if (error) throw error
		      cb(world, countries)
		    })
		  })
		}

		// https://github.com/d3/d3-polygon
		function polygonContains(polygon, point) {
		  var n = polygon.length
		  var p = polygon[n - 1]
		  var x = point[0],
		    y = point[1]
		  var x0 = p[0],
		    y0 = p[1]
		  var x1, y1
		  var inside = false
		  for (var i = 0; i < n; ++i) {
		    p = polygon[i], x1 = p[0], y1 = p[1]
		    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
		    x0 = x1, y0 = y1
		  }
		  return inside
		}

		//////////////////////////////////////////////

		function slide(country) {
		  var country = countryList.find(function(b) {
		    return parseInt(b.id, 10) === parseInt(country.id, 10)
		  })
		  current.text(country && country.name || '')
		  /* Here change to country information */

		}

		function mousemove() {
		  var b = getCountry(this)

		  if (!b) {
		    if (currentCountry) {
		      leave(currentCountry)
		      currentCountry = undefined
		      render()
		    }
		    return
		  }
		  if (b === currentCountry) {
		    return
		  }
		  currentCountry = b
		  render()
		  slide(b)

		}
		//
		//////////////////////////////////////////////////////
		////

        var butnOp = document.getElementById("modal");
        var getTitle = document.getElementById("title");

		function enter(country) {
		  var country = countryList.find(function(data) {
		    return parseInt(data.id, 10) === parseInt(country.id, 10)
		  })
		  current.text(country && country.name || '')
		  /* Here change to country information */

		  if (country.name === "Colombia") {
		    console.log('Seleccionar colombia');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
            //window.open("http://google.com");
            
		  } else
		  if (country.name === "Poland") {
		    console.log('selecciono polonia');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
		  } else
		  if (country.name === "Mexico") {
		    console.log('selecciono mexico');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
		  } else
		  if (country.name === "Bolivia, Plurinational State of") {
		    console.log('selecciono bolivia');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
		  }
		  else
		  if (country.name === "Brazil") {
		    console.log('selecciono Brazil');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
		  }
		  else
		  if (country.name === "Argentina") {
		    console.log('selecciono Argentina');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
		  }
		  else
		  if (country.name === "Chile") {
		    console.log('selecciono Chile');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
		  }
		  else
		  if (country.name === "Peru") {
		    console.log('selecciono Peru');
            butnOp.style.display = "block";
            getTitle.style.display = "none";
		  }

		}

        function off() {
            document.getElementById("modal").style.display = "none";
            document.getElementById("points").style.display = "block";
            document.getElementById("title").style.display = "block";

        }
		//
		function click() {
		  var data = getCountry(this)

		  if (!data) {
		    if (currentCountry) {
		      leave(currentCountry)
		      currentCountry = undefined
		      render()
		    }
		    return
		  }
		  if (data === currentCountry) {
		    return
		  }
		  currentCountry = data
		  render()
		  enter(data)
		}

		//////////////////////////////////////////////////////

		function getCountry(event) {
		  var pos = projection.invert(d3.mouse(event))
		  return countries.features.find(function(f) {
		    return f.geometry.coordinates.find(function(c1) {
		      return polygonContains(c1, pos) || c1.find(function(c2) {
		        return polygonContains(c2, pos)
		      })
		    })
		  })
		}

		//
		// Initialization
		//

		setAngles()

		canvas
		  .call(d3.drag()
		    .on('start', dragstarted)
		    .on('drag', dragged)
		    .on('end', dragended)
		  )
		  .on('click', click)
		  //.on('mouse', mousemove)

		/*
        .on('mousemove', function(d){
           console.log("arrastrando");
        })
  			*/

		//////////////////////////////////////////////////////////////////////


		loadData(function(world, cList) {
		  land = topojson.feature(world, world.objects.land)

		  countries = topojson.feature(world, world.objects.countries)
		  countryList = cList

		  window.addEventListener('resize', scale)

		  scale()
		  autorotate = d3.timer(rotate)
		})


		////////////////////////////////////////////////////////

		context.strokeStyle = "#fff";
		context.beginPath();
		//path(mesh);
		context.stroke();

		//////////////////////////////////////////////////////////


/*
Button controls
 */
 
var angX = 0;
var angY = 0;

$('.button').on('click', function(){
	switch ($(this).attr("id")){
	   case 'up':
		   angX = angX + 90;
		   break;
	   case 'bottom':
		   angX = angX - 90;
		   break;
	   case 'right':
		   angY = angY - 90;
		   break;
	   case 'left':
		   angY = angY + 90;
		   break;
   }


 $('#cube').attr('style', 'transform: rotateX(' + angX + 'deg) rotateY(' + angY + 'deg);')
   });



 