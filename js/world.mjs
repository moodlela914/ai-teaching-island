export const ISLAND_LAYOUT=[
 {id:'center',x:1,z:-2,radius:6.8,elevation:3.3},
 {id:'island-01',x:-15,z:-8,radius:4.3,elevation:1.2},
 {id:'island-02',x:-18,z:6,radius:4.8,elevation:.25},
 {id:'island-03',x:-9,z:19,radius:5.4,elevation:2.7},
 {id:'island-04',x:8,z:20,radius:4.45,elevation:.6},
 {id:'island-05',x:20,z:7,radius:6.2,elevation:.1},
 {id:'island-06',x:15,z:-8,radius:4.7,elevation:4.4},
 {id:'island-07',x:-2,z:-15,radius:5.8,elevation:2.1}
];
export const BRIDGE_STYLES=[
 {id:'rope',name:'繩索吊橋',profile:'sag',arc:-.45,width:1.3,color:'#bfa08a'},
 {id:'stone',name:'月光石拱橋',profile:'arch',arc:.8,width:1.55,color:'#ded7c9'},
 {id:'candy',name:'糖果階梯橋',profile:'stairs',arc:0,width:1.45,color:'#eac5aa'},
 {id:'covered',name:'星燈廊橋',profile:'arch',arc:.12,width:1.45,color:'#cdb4a2'},
 {id:'logs',name:'圓木階梯橋',profile:'stairs',arc:0,width:1.4,color:'#b69a7f'},
 {id:'vine',name:'藤蔓花橋',profile:'arch',arc:.45,width:1.4,color:'#b7c7a3'},
 {id:'glass',name:'月光水晶橋',profile:'arch',arc:.7,width:1.4,color:'#d6c8ee'},
 {id:'grand-stairs',name:'廣場迎賓石階橋',profile:'stairs',arc:0,width:1.7,color:'#f4e3c4'},
 {id:'gear',name:'齒輪拱橋',profile:'arch',arc:.5,width:1.45,color:'#cdb396'}
];
export function bridgeRoute(from,to,style){if(!style)return[from,to];const length=Math.hypot(to.x-from.x,to.z-from.z),entry=Math.min(length*.35,style.landingStart??.65),exit=Math.min(length*.35,style.landingEnd??.65),ramp=Math.max(.1,length-entry-exit),count=Math.max(16,Math.ceil(length/.45),Math.ceil(Math.abs(to.y-from.y)/.12*length/ramp)),start=entry/length,end=1-exit/length;const ts=[start,end,1];for(let i=1;i<count;i++)ts.push(i/count);const times=[...new Set(ts.map(t=>Number(t.toFixed(10))))].sort((a,b)=>a-b),points=[{...from}];for(const t of times){const u=Math.max(0,Math.min(1,(t-start)/(end-start))),x=from.x+(to.x-from.x)*t,z=from.z+(to.z-from.z)*t,y=from.y+(to.y-from.y)*u+Math.sin(u*Math.PI)*(style.arc||0);if(style.profile==='stairs'){points.push({x,y:points.at(-1).y,z});if(Math.abs(y-points.at(-1).y)>1e-8)points.push({x,y,z});}else points.push({x,y,z});}points[points.length-1]={...to};return points;}
