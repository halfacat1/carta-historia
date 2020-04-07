(this["webpackJsonpcarta-historia"]=this["webpackJsonpcarta-historia"]||[]).push([[0],{225:function(e,t,a){e.exports=a(536)},230:function(e,t,a){},231:function(e,t,a){},233:function(e,t,a){},531:function(e,t,a){},536:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),l=a(20),o=a.n(l),i=(a(230),a(93)),c=a(94),s=a(97),u=a(96),m=(a(231),a(73)),d=a.n(m),h=a(134),p=(a(233),a(92)),b=a.n(p),v=(a(529),a(530),function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(i.a)(this,a),(r=t.call(this,e)).SCATTER_GL_SIZE=3,r.TIMELINE_BACKGROUND_COLOR="rgba(47, 57, 77, 0.5)",r.TIMELINE_LINE_COLOR="rgba(146, 176, 155, 0.5)",r.TEXT_COLOR="#fff",r.echartsInstance=null,r.state={},r}return Object(c.a)(a,[{key:"loadData",value:function(){var e=Object(h.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(window.location.href,"/db.csv"));case 2:return t=e.sent,e.t0=this,e.next=6,t.text();case 6:return e.t1=e.sent,e.abrupt("return",e.t0.createDatasetFromCsv.call(e.t0,e.t1));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"createDatasetFromCsv",value:function(e){var t={headers:[],items:[]},a=e.split("\n");if(a.length<1)return t;a.pop();var r=a.shift().split(","),n=a.map((function(e){for(var t={},a=e.split(","),n=0;n<r.length;n++)t[r[n]]=a[n];return t}));return t.headers=r,t.items=n,t}},{key:"cleanYearInDataset",value:function(e){var t=e.items.reduce((function(e,t){var a=parseInt(t.year);return isNaN(a)||(t.year=a,e.push(t)),e}),[]);e.items=t}},{key:"addGeoToDataset",value:function(e){var t=/Point\((-?[0-9]+[.]?[0-9]*) (-?[0-9]+[.]?[0-9]*)\)/;e.headers=e.headers.concat(["lat","lng"]),e.items.forEach((function(e){var a=t.exec(e.locationCoordinates);a&&(e.lat=a[2],e.lng=a[1])}))}},{key:"groupCountByYear",value:function(e){var t=e.reduce((function(e,t){var a=t.year;return a in e||(e[a]=0),e[a]++,e}),{}),a=Object.entries(t).map((function(e){return e[0]=parseInt(e),e}));return a.sort((function(e,t){return e[0]>t[0]?1:-1})),a}},{key:"getScatterSeriesData",value:function(e){return e.items.map((function(e){return{name:e.battleLabel,value:[e.lng,e.lat,e]}}))}},{key:"componentDidMount",value:function(){var e=Object(h.a)(d.a.mark((function e(){var t,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,this.echartsInstance=b.a.init(document.getElementById("echarts_container")),e.next=4,this.loadData();case 4:a=e.sent,this.cleanYearInDataset(a),this.addGeoToDataset(a),this.echartsInstance.on("dataZoom",(function(){var e=t.echartsInstance.getOption().dataZoom[0];t.echartsInstance.setOption({visualMap:{id:"battles-geo-scattergl",min:Math.round(e.startValue,0),max:Math.round(e.endValue,0),textStyle:{color:t.TEXT_COLOR}}})})),this.echartsInstance.on("click",(function(e){console.log(e)})),r={backgroundColor:"#000",geo:{map:"world",roam:!0,label:{emphasis:{show:!1}},silent:!0,itemStyle:{normal:{areaColor:"#323c48",borderColor:"#111"},emphasis:{areaColor:"#2a333d"}},bottom:"30%",zlevel:100,zoom:4},grid:[{id:"battles-time-line",top:"70%",show:!0,backgroundColor:t.TIMELINE_BACKGROUND_COLOR,zlevel:200}],dataset:{dimensions:a.headers,source:a.items},xAxis:{id:"battles-time-line-x",gridId:"battles-time-line",type:"value",name:"Year",nameTextStyle:{color:t.TEXT_COLOR},axisLabel:{textStyle:{color:t.TEXT_COLOR}},zlevel:201},yAxis:{id:"battles-time-line-y",gridId:"battles-time-line",type:"value",name:"Count",nameTextStyle:{color:t.TEXT_COLOR},axisLabel:{textStyle:{color:t.TEXT_COLOR}},zlevel:201},series:[{id:"battles-geo-scattergl",type:"scatterGL",progressive:1e6,coordinateSystem:"geo",symbolSize:t.SCATTER_GL_SIZE,blendMode:"lighter",zlevel:101},{id:"battles-geo-scatter",type:"scatter",coordinateSystem:"geo",data:t.getScatterSeriesData(a),symbolSize:15,itemStyle:{opacity:0},large:!0,animation:!1,tooltip:{formatter:function(e){var t=e.value[2];return t.battleLabel+"<br/>"+t.year}},zlevel:110},{id:"battles-time-line",type:"line",xAxisIndex:0,yAxisIndex:0,data:this.groupCountByYear(a.items),lineStyle:{color:t.TIMELINE_LINE_COLOR},itemStyle:{color:t.TEXT_COLOR,borderColor:t.TEXT_COLOR},tooltip:{show:!1},zlevel:201}],dataZoom:[{id:"battles-time-line",type:"slider",show:!0,xAxisIndex:[0],start:40,end:55,zlevel:201}],tooltip:{trigger:"item"},visualMap:[{id:"battles-geo-scattergl",seriesIndex:0,dimension:"year",type:"piecewise",splitNumber:10,min:-3e3,max:3e3,inRange:{color:["#94b9af","#90a583","#9d8420","#593837","#942911"]},outOfRange:{color:["rgba(0, 0, 0, 0.5)"]},textStyle:{color:t.TEXT_COLOR},bottom:"35%",formatter:function(e,t){return Math.round(e)+" to "+Math.round(t)},zlevel:110}]},this.echartsInstance.setOption(r,!0),window.onresize=function(){t.echartsInstance.resize()};case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return n.a.createElement("div",{className:"BattleVisualizer"},n.a.createElement("div",{id:"echarts_container",className:"ChartArea"}))}}]),a}(n.a.Component)),f=a(137),E=a(136),y=a(135);a(531);function g(e){return n.a.createElement(y.a,e,n.a.createElement("h4",null,"Carta Historia"),n.a.createElement("p",null,"Visualize battles throughout history across the world!"),n.a.createElement("h6",null,"Instructions"),n.a.createElement("span",{role:"img","aria-labelledby":"jsx-a11y/accessible-emoji"},"\ud83d\uddfa + \ud83d\uddb1/\ud83d\udc46\ud83e\udd0f"),n.a.createElement("br",null),"Pan & Zoom",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{role:"img","aria-labelledby":"jsx-a11y/accessible-emoji"},"\ud83d\udcc8 + \u2194"),n.a.createElement("br",null),"Resize & Move the Year Filter",n.a.createElement("br",null))}function O(e){return n.a.createElement(y.a,e,"Author: ",n.a.createElement("a",{href:"http://github.com/halfacat1/",target:"_blank",rel:"noopener noreferrer"},"Han Z."),n.a.createElement("br",null),n.a.createElement("br",null),"Built with:\xa0",n.a.createElement("a",{href:"https://www.echartsjs.com/",target:"_blank",rel:"noopener noreferrer"},"ECharts"),",\xa0",n.a.createElement("a",{href:"https://reactjs.org/",target:"_blank",rel:"noopener noreferrer"},"React"),n.a.createElement("br",null),"Powered by: ",n.a.createElement("a",{href:"https://www.wikidata.org/",target:"_blank",rel:"noopener noreferrer"},"Wikidata"))}var x=function(){return n.a.createElement("div",{className:"HelpOverlay"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-xs HelpOverlayContainer"},n.a.createElement(E.a,{placement:"left",overlay:g,trigger:"click"},n.a.createElement(f.a,{variant:"outline-light"},n.a.createElement("span",{role:"img",className:"Glow","aria-labelledby":"jsx-a11y/accessible-emoji"},"\ud83d\udca1")))),n.a.createElement("div",{className:"col-xs HelpOverlayContainer"},n.a.createElement(E.a,{placement:"bottom",overlay:O,trigger:"click"},n.a.createElement(f.a,{variant:"outline-light"},n.a.createElement("span",{role:"img","aria-labelledby":"jsx-a11y/accessible-emoji"},"\ud83d\udc4b")))))))},C=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(x,null),n.a.createElement(v,null))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(535);o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[225,1,2]]]);
//# sourceMappingURL=main.c033113a.chunk.js.map