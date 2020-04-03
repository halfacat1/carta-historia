(this["webpackJsonpcarta-historia"]=this["webpackJsonpcarta-historia"]||[]).push([[0],{215:function(e,t,a){e.exports=a(520)},220:function(e,t,a){},222:function(e,t,a){},520:function(e,t,a){"use strict";a.r(t);var n=a(28),r=a.n(n),o=a(210),i=a.n(o),s=(a(220),a(68)),c=a.n(s),l=a(123),u=a(211),d=a(212),m=a(213),f=a(214),h=(a(222),a(87)),p=a.n(h),v=(a(518),a(519),function(e){Object(f.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).echartsInstance=null,n.state={},n}return Object(d.a)(a,[{key:"loadData",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(window.location.origin,"/db.csv"));case 2:return t=e.sent,e.t0=this,e.next=6,t.text();case 6:return e.t1=e.sent,e.abrupt("return",e.t0.createDatasetFromCsv.call(e.t0,e.t1));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"createDatasetFromCsv",value:function(e){var t={headers:[],items:[]},a=e.split("\n");if(a.length<1)return t;a.pop();var n=a.shift().split(","),r=a.map((function(e){for(var t={},a=e.split(","),r=0;r<n.length;r++)t[n[r]]=a[r];return t}));return t.headers=n,t.items=r,t}},{key:"cleanYearInDataset",value:function(e){var t=e.items.reduce((function(e,t){var a=parseInt(t.year);return isNaN(a)||(t.year=a,e.push(t)),e}),[]);e.items=t}},{key:"addGeoToDataset",value:function(e){var t=/Point\((-?[0-9]+[.]?[0-9]*) (-?[0-9]+[.]?[0-9]*)\)/;e.headers=e.headers.concat(["lat","lng"]),e.items.forEach((function(e){var a=t.exec(e.locationCoordinates);a&&(e.lat=a[2],e.lng=a[1])}))}},{key:"groupCountByYear",value:function(e){var t=e.reduce((function(e,t){var a=t.year;return a in e||(e[a]=0),e[a]++,e}),{}),a=Object.entries(t).map((function(e){return e[0]=parseInt(e),e}));return a.sort((function(e,t){return e[0]>t[0]?1:-1})),a}},{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,a,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,this.echartsInstance=p.a.init(document.getElementById("echarts_container")),e.next=4,this.loadData();case 4:a=e.sent,this.cleanYearInDataset(a),this.addGeoToDataset(a),this.echartsInstance.on("dataZoom",(function(e){var a=t.echartsInstance.getOption().dataZoom[0];t.echartsInstance.setOption({visualMap:{id:"battles-geo-scatter",min:Math.round(a.startValue,0),max:Math.round(a.endValue,0),textStyle:{color:"#fff"}}})})),n={backgroundColor:"#000",geo:{map:"world",roam:!0,label:{emphasis:{show:!1}},silent:!0,itemStyle:{normal:{areaColor:"#323c48",borderColor:"#111"},emphasis:{areaColor:"#2a333d"}},bottom:"30%",zlevel:100,zoom:3},grid:[{id:"battles-time-line",top:"70%",show:!0,backgroundColor:"#2F394D",zlevel:200}],dataset:{dimensions:a.headers,source:a.items},xAxis:{id:"battles-time-line-x",gridId:"battles-time-line",type:"value",axisLabel:{textStyle:{color:"#fff"}},zlevel:201},yAxis:{id:"battles-time-line-y",gridId:"battles-time-line",type:"value",axisLabel:{textStyle:{color:"#fff"}},zlevel:201},series:[{id:"battles-geo-scatter",type:"scatterGL",progressive:1e6,coordinateSystem:"geo",symbolSize:2,zoomScale:.002,blendMode:"lighter",postEffect:{enable:!0},zlevel:101},{id:"battles-time-line",type:"line",xAxisIndex:0,yAxisIndex:0,data:this.groupCountByYear(a.items),lineStyle:{color:"#974716"},itemStyle:{color:"#fff",borderColor:"#fff"},zlevel:201}],dataZoom:[{id:"battles-time-line",type:"slider",show:!0,xAxisIndex:[0],start:40,end:55,zlevel:201}],visualMap:[{id:"battles-geo-scatter",seriesIndex:0,dimension:"year",type:"piecewise",splitNumber:10,min:-3e3,max:3e3,inRange:{color:["#94b9af","#90a583","#9d8420","#942911","#593837"]},outOfRange:{color:["#000000"]},textStyle:{color:"#fff"},bottom:"30%",zlevel:110}]},this.echartsInstance.setOption(n,!0),window.onresize=function(){t.echartsInstance.resize()};case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{id:"echarts_container",className:"Chart"}))}}]),a}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[215,1,2]]]);
//# sourceMappingURL=main.76584b4b.chunk.js.map