(()=>{"use strict";var e={373:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.data=void 0,t.data={columns:[["x",15424128e5,15424992e5,15425856e5,1542672e6,15427584e5,15428448e5,15429312e5,15430176e5,1543104e6,15431904e5,15432768e5,15433632e5,15434496e5,1543536e6,15436224e5,15437088e5,15437952e5,15438816e5,1543968e6,15440544e5,15441408e5,15442272e5,15443136e5,15444e8,15444864e5,15445728e5,15446592e5,15447456e5,1544832e6,15449184e5,15450048e5,15450912e5,15451776e5,1545264e6,15453504e5,15454368e5,15455232e5,15456096e5,1545696e6,15457824e5,15458688e5,15459552e5,15460416e5,1546128e6,15462144e5,15463008e5,15463872e5,15464736e5,154656e7,15466464e5,15467328e5,15468192e5,15469056e5,1546992e6,15470784e5,15471648e5,15472512e5,15473376e5,1547424e6,15475104e5,15475968e5,15476832e5,15477696e5,1547856e6,15479424e5,15480288e5,15481152e5,15482016e5,1548288e6,15483744e5,15484608e5,15485472e5,15486336e5,154872e7,15488064e5,15488928e5,15489792e5,15490656e5,1549152e6,15492384e5,15493248e5,15494112e5,15494976e5,1549584e6,15496704e5,15497568e5,15498432e5,15499296e5,1550016e6,15501024e5,15501888e5,15502752e5,15503616e5,1550448e6,15505344e5,15506208e5,15507072e5,15507936e5,155088e7,15509664e5,15510528e5,15511392e5,15512256e5,1551312e6,15513984e5,15514848e5,15515712e5,15516576e5,1551744e6,15518304e5,15519168e5,15520032e5],["y0",37,20,32,39,32,35,19,65,36,62,113,69,120,60,51,49,71,122,149,69,57,21,33,55,92,62,47,50,56,116,63,60,55,65,76,33,45,64,54,81,180,123,106,37,60,70,46,68,46,51,33,57,75,70,95,70,50,68,63,66,53,38,52,109,121,53,36,71,96,55,58,29,31,55,52,44,126,191,73,87,255,278,219,170,129,125,126,84,65,53,154,57,71,64,75,72,39,47,52,73,89,156,86,105,88,45,33,56,142,124,114,64],["y1",22,12,30,40,33,23,18,41,45,69,57,61,70,47,31,34,40,55,27,57,48,32,40,49,54,49,34,51,51,51,66,51,94,60,64,28,44,96,49,73,30,88,63,42,56,67,52,67,35,61,40,55,63,61,105,59,51,76,63,57,47,56,51,98,103,62,54,104,48,41,41,37,30,28,26,37,65,86,70,81,54,74,70,50,74,79,85,62,36,46,68,43,66,50,28,66,39,23,63,74,83,66,40,60,29,36,27,54,89,50,73,52]],types:{y0:"line",y1:"line",x:"x"},names:{y0:"#0",y1:"#1"},colors:{y0:"#3DC23F",y1:"#F34C44"}}},607:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(373),i=o(n(760)),a=1600,s=800,u=10,c=function(e,t){t.lines.forEach((function(n){e.beginPath(),n.coordinates.forEach((function(o,r){var i=s/(t.max+100);!function(e,t){var n=t.left,o=t.top,r=t.color;e.lineWidth=4,e.strokeStyle=r,e.lineTo(n,o)}(e,{left:r*(a/u),top:s-o*i-100,color:n.colorLine,yRatio:i})})),e.stroke(),e.closePath()}))},l=function(e,t){if(!e)return console.error("Canvas not found"),null;var n=e.getContext("2d");if(!n)return console.error("Context not found"),null;i.default.init(),function(e){e.canvas.width=a,e.canvas.height=s,e.canvas.style.width="".concat(800,"px"),e.canvas.style.height="".concat(400,"px")}(n);var o=function(e){var t={lines:[],dates:[],min:-1,max:-1};return e.columns.forEach((function(n){var o=null==n?void 0:n[0];if(function(e,t){return"line"===t.types[e]}(o,e)){var r=function(e,t){return t.colors[e]}(o,e),i=n.slice(1),a=Math.min.apply(Math,i),s=Math.max.apply(Math,i);(-1===t.min||t.min>a)&&(t.min=a),(-1===t.max||t.max<s)&&(t.max=s),t.lines.push({coordinates:i,colorLine:r,min:a,max:s})}else t.dates=n.slice(1)})),t}(t);(function(e,t){var n=function(e){var t=0;return e.lines.forEach((function(e){var n=e.coordinates.length;if(0===t||t<n)return t=n,null})),t}(t),o=function(e,t){return function(n){if(t===i.default.getTargetElement()){n.preventDefault();var o=u+Number((n.deltaY/100).toFixed(3));o<e&&o>5&&(u=o)}}}(n,e);e.addEventListener("wheel",o)})(e,o),c(n,o);var r=function(){n.clearRect(0,0,a,s),c(n,o),window.requestAnimationFrame(r)};window.requestAnimationFrame(r)};window.onload=function(){var e,t;e=r.data,t=document.getElementById("canvas"),l(t,e)}},760:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){var e=this;this.events=[],this.coords={left:0,top:0},this.targetElement=null,this.handleMouseMove=function(t){e.setTargetElement(t.target),e.setCoords(t.clientX,t.clientY)}}return e.prototype.setTargetElement=function(e){this.targetElement=e},e.prototype.setCoords=function(e,t){this.coords={left:e,top:t}},e.prototype.getCoords=function(){return this.coords},e.prototype.addEvent=function(e,t){window.addEventListener(e,t),this.events.push({eventName:e,cb:t})},e.prototype.init=function(){this.addEvent("mousemove",this.handleMouseMove)},e.prototype.destroy=function(){this.events.forEach((function(e){window.removeEventListener(e.eventName,e.cb)}))},e.prototype.getTargetElement=function(){return this.targetElement},e}();t.default=new n}},t={};!function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}(607)})();