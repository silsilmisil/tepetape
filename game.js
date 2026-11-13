"use strict";
/* ================= マップ ================= */
const TS=16, W=58, H=42;
const T={GRASS:0,FENCE:1,WALL:2,WOOD:3,CORR:4,DESK:5,BOARD:6,TREE:7,SAKURA:8,GYM:9,DIRT:10,PATH:11,SHELF:12,PIANO:13,LOCKER:14,BED:15,TDESK:16,TILE:17,CARPET:18,WHITE:19,BLUE:20,SINK:21,STAGE:22,FLOWER:23,WATER:24,POOLSIDE:25,BAR:26,BENCH:27};
const SOLID=new Set([T.FENCE,T.WALL,T.DESK,T.BOARD,T.TREE,T.SAKURA,T.SHELF,T.PIANO,T.LOCKER,T.BED,T.TDESK,T.SINK,T.FLOWER,T.WATER,T.BAR,T.BENCH]);
const FLOORS=new Set([T.GRASS,T.WALL,T.WOOD,T.CORR,T.GYM,T.DIRT,T.PATH,T.TILE,T.CARPET,T.WHITE,T.BLUE,T.STAGE,T.POOLSIDE]);
const grid=Array.from({length:H},()=>Array(W).fill(T.GRASS));
const base=Array.from({length:H},()=>Array(W).fill(T.GRASS));
function fill(x0,y0,x1,y1,t){for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){if(x<0||y<0||x>=W||y>=H)continue;grid[y][x]=t;if(FLOORS.has(t))base[y][x]=t;}}
const set=(x,y,t)=>fill(x,y,x,y,t);

fill(0,0,W-1,0,T.FENCE);fill(0,H-1,W-1,H-1,T.FENCE);fill(0,0,0,H-1,T.FENCE);fill(W-1,0,W-1,H-1,T.FENCE);
fill(3,3,43,24,T.WALL);
fill(4,4,12,11,T.WOOD);fill(14,4,22,11,T.WOOD);fill(24,4,32,11,T.WOOD);fill(34,4,42,11,T.CARPET);
fill(4,13,42,14,T.CORR);
fill(4,16,12,23,T.WOOD);fill(14,16,22,23,T.TILE);fill(24,16,32,23,T.WOOD);fill(34,16,37,23,T.WHITE);fill(39,16,42,23,T.BLUE);
for(const dx of[8,18,28,38])fill(dx,12,dx+1,12,T.CORR);
for(const dx of[8,28,35,40])fill(dx,15,dx+1,15,T.CORR);
fill(16,15,20,15,T.TILE);fill(17,24,19,24,T.TILE);
fill(43,13,45,14,T.CORR);
fill(46,3,56,20,T.WALL);fill(47,4,55,19,T.GYM);fill(46,13,46,14,T.CORR);fill(47,4,55,5,T.STAGE);
fill(8,28,40,38,T.DIRT);fill(17,25,19,28,T.PATH);
fill(46,24,56,31,T.POOLSIDE);fill(47,25,55,30,T.WATER);
for(let x=5;x<=41;x+=4)set(x,1,T.SAKURA);
for(let y=4;y<=38;y+=3)set(1,y,y%2?T.SAKURA:T.TREE);
for(let x=4;x<=54;x+=5)set(x,40,T.TREE);
for(let y=34;y<=38;y+=2)set(55,y,T.TREE);
set(44,26,T.TREE);set(44,30,T.SAKURA);set(5,26,T.SAKURA);set(41,26,T.TREE);
fill(12,26,15,26,T.FLOWER);fill(21,26,24,26,T.FLOWER);
fill(43,35,45,35,T.BAR);fill(30,39,31,39,T.BENCH);
fill(6,3,10,3,T.BOARD);set(8,5,T.TDESK);for(const y of[7,9])for(const x of[5,7,9,11])set(x,y,T.DESK);
fill(16,3,20,3,T.BOARD);set(18,5,T.TDESK);for(const y of[7,9])for(const x of[15,17,19,21])set(x,y,T.DESK);
fill(26,3,30,3,T.BOARD);fill(25,5,26,6,T.PIANO);for(const y of[8,10])for(const x of[27,29,31])set(x,y,T.DESK);
fill(35,5,41,5,T.SHELF);fill(35,7,37,7,T.SHELF);fill(39,7,41,7,T.SHELF);fill(36,9,37,10,T.DESK);fill(40,9,41,10,T.DESK);
fill(6,24,10,24,T.BOARD);set(8,21,T.TDESK);for(const y of[17,19])for(const x of[5,7,9,11])set(x,y,T.DESK);
fill(15,17,15,22,T.LOCKER);fill(21,17,21,22,T.LOCKER);
fill(26,18,27,19,T.DESK);fill(30,18,31,19,T.DESK);fill(26,21,27,22,T.DESK);fill(30,21,31,22,T.DESK);
fill(35,18,35,19,T.BED);fill(35,21,35,22,T.BED);
fill(42,17,42,18,T.SINK);

const REGIONS=[[4,4,12,11,"1年A組"],[14,4,22,11,"1年B組"],[24,4,32,11,"音楽室"],[34,4,42,11,"図書室"],[4,12,45,15,"ろうか"],[4,16,12,23,"2年A組"],[14,16,22,24,"昇降口"],[24,16,32,23,"職員室"],[34,16,37,23,"保健室"],[39,16,42,23,"トイレ"],[47,4,55,19,"体育館"],[46,24,56,31,"プール"],[8,28,40,38,"グラウンド"]];
function regionAt(tx,ty){for(const r of REGIONS)if(tx>=r[0]&&tx<=r[2]&&ty>=r[1]&&ty<=r[3])return r[4];return "校庭";}

/* ================= ドット描画（淡い色・主線なし） ================= */
function hash(x,y){let h=(x*374761393+y*668265263)|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295;}
const tileAt=(x,y)=>(x<0||y<0||x>=W||y>=H)?-1:grid[y][x];
const isWallish=(x,y)=>{const t=tileAt(x,y);return t===T.WALL||t===T.BOARD;};
const SH="rgba(86,66,112,.34)";
const WSH="rgba(70,52,96,.42)";

function drawMap(){
  const c=document.createElement("canvas");c.width=W*TS;c.height=H*TS;
  const g=c.getContext("2d");
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)drawTile(g,x,y);
  // 木の影は上に重ねる（となりのタイルにはみ出す）
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(grid[y][x]===T.TREE||grid[y][x]===T.SAKURA)drawTreeTop(g,x,y);
  g.globalAlpha=.75;g.strokeStyle="#fbf6ea";g.lineWidth=1;
  g.strokeRect(48*TS+.5,7*TS+.5,7*TS-1,12*TS-1);
  g.beginPath();g.moveTo(48*TS,13*TS+.5);g.lineTo(55*TS,13*TS+.5);g.stroke();
  g.beginPath();g.arc(51.5*TS,13*TS,20,0,Math.PI*2);g.stroke();
  g.beginPath();g.ellipse(24.5*TS,33.5*TS,13*TS,4*TS,0,0,Math.PI*2);g.stroke();
  g.beginPath();g.ellipse(24.5*TS,33.5*TS,11*TS,2.6*TS,0,0,Math.PI*2);g.stroke();
  g.globalAlpha=1;
  return c;
}
function drawTile(g,x,y){
  const t=grid[y][x],b=base[y][x],px=x*TS,py=y*TS;
  const R=(c,ax,ay,w,h)=>{g.fillStyle=c;g.fillRect(px+ax,py+ay,w,h);};
  const hv=i=>hash(x*7+i,y*13+i*3);
  function floor(f){
    switch(f){
      case T.GRASS:R("#aed85a",0,0,16,16);for(let i=0;i<4;i++){if(hv(i)>.5)R("#8cc443",Math.floor(hv(i+5)*14),Math.floor(hv(i+9)*13),2,2);if(hv(i+20)>.7)R("#cfeb7c",Math.floor(hv(i+11)*15),Math.floor(hv(i+13)*15),1,1);}break;
      case T.WOOD:R("#ecc89a",0,0,16,16);for(let i=3;i<16;i+=4)R("#dcb383",0,i,16,1);R("#dcb383",(x%2)*8+3,0,1,4);R("#dcb383",((x+1)%2)*8+5,8,1,4);if(hv(1)>.8)R("#f4d9b6",6,5,4,1);break;
      case T.CORR:R("#eef1d8",0,0,16,16);R("#dfe8c6",0,0,8,8);R("#dfe8c6",8,8,8,8);break;
      case T.TILE:R("#f1ece2",0,0,16,16);R("#ddd5c8",0,15,16,1);R("#d6d0c6",15,0,1,16);break;
      case T.CARPET:R("#e4b2ab",0,0,16,16);if((x+y)%2)R("#d69e97",6,6,4,4);break;
      case T.WHITE:R("#f0f1ea",0,0,16,16);R("#dfe2d8",0,15,16,1);R("#dfe2d8",15,0,1,16);break;
      case T.BLUE:R("#d5e9ef",0,0,16,16);R("#bcd8e1",0,15,16,1);R("#bcd8e1",15,0,1,16);break;
      case T.GYM:R("#f1cc93",0,0,16,16);R("#e0b67a",5,0,1,16);R("#e0b67a",11,0,1,16);break;
      case T.STAGE:R("#c49a78",0,0,16,16);R("#b78d6c",0,7,16,1);if(tileAt(x,y+1)!==T.STAGE)R("#9c7a68",0,12,16,4);break;
      case T.DIRT:R("#f1dcb4",0,0,16,16);for(let i=0;i<3;i++)if(hv(i)>.5)R("#d9c5a2",Math.floor(hv(i+4)*15),Math.floor(hv(i+7)*15),1,1);break;
      case T.PATH:R("#f5e8cb",0,0,16,16);R("#e6d4ac",2,3,5,3);R("#e6d4ac",9,10,5,3);break;
      case T.POOLSIDE:R("#ebe8e0",0,0,16,16);R("#dcd8ce",0,15,16,1);R("#dcd8ce",15,0,1,16);break;
      case T.WALL:{
        const stone=["#f6ecd9","#fbf4e6","#eee1c9","#f3e6cf"];
        R(stone[Math.floor(hv(2)*4)],0,0,16,16);
        R(stone[Math.floor(hv(3)*4)],(y%2)*8,0,8,5);
        if(!isWallish(x,y+1)){R("#cdb79f",0,9,16,7);R("#b9a28c",0,9,16,1);R("#8c7a8e",0,13,16,3);}
        if(!isWallish(x-1,y))R("#c9b8a6",0,0,1,16);
        if(!isWallish(x+1,y))R("#c9b8a6",15,0,1,16);
        break;}
    }
    // 壁の下に落ちる影
    if(f!==T.WALL&&isWallish(x,y-1)){R(WSH,0,0,16,5);R(SH,0,5,16,2);}
    if(f!==T.WALL&&isWallish(x-1,y))R(SH,0,0,3,16);
  }
  floor(FLOORS.has(t)?t:b);
  switch(t){
    case T.FENCE:
      if(x===0||x===W-1){R("#cbb9a3",6,0,4,16);R("#b8a593",9,0,1,16);}
      else{R("#cbb9a3",0,5,16,2);R("#cbb9a3",0,10,16,2);R("#bca894",2,3,3,11);R(SH,2,14,4,2);}
      break;
    case T.BOARD:R("#ab8c74",0,2,16,9);R("#6f8d79",0,3,16,7);if(hv(1)>.4)R("#e5efe6",2+Math.floor(hv(2)*8),5,4,1);if(hv(3)>.5)R("#e5efe6",3+Math.floor(hv(4)*6),7,3,1);R("#d6c6b4",0,11,16,1);break;
    case T.DESK:R(SH,3,5,13,10);R("#b58e6c",2,2,12,8);R("#c9a583",2,2,12,3);R("#9f7a5d",2,9,12,1);R("#e2d9cd",5,11,6,4);R("#cfc4b6",5,14,6,1);break;
    case T.TDESK:R(SH,2,6,15,10);R("#9a6a5c",1,4,14,8);R("#ad7d6e",1,4,14,2);R("#faf6ee",4,6,4,3);break;
    case T.SHELF:R(SH,1,3,15,13);R("#a98468",1,1,14,12);{const cols=["#d9a3a0","#a7b9d4","#eed9a0","#a9cf7e","#e6bfca","#f6f1e6"];for(let i=0;i<7;i++){R(cols[Math.floor(hash(x*9+i,y)*cols.length)],1+i*2,2,2,4);R(cols[Math.floor(hash(x*3+i,y+7)*cols.length)],1+i*2,7,2,4);}}break;
    case T.PIANO:R("#5a5260",0,0,16,16);R("#6c6472",1,1,14,3);if(tileAt(x,y+1)!==T.PIANO){R("#fbf8f1",0,9,16,6);for(let i=1;i<16;i+=3)R("#cfc6c4",i,9,1,6);for(let i=2;i<16;i+=3)R("#5a5260",i,9,1,3);R(SH,0,15,16,1);}break;
    case T.LOCKER:R(SH,2,2,14,14);R("#b2bccb",1,0,14,15);for(let i=1;i<15;i+=5)R("#9ea9bb",1,i,14,1);R("#9ea9bb",8,0,1,15);break;
    case T.BED:R(SH,2,1,14,15);R("#fbf9f4",1,0,14,15);if(tileAt(x,y-1)!==T.BED)R("#f0c9cf",3,2,10,4);else R("#c7dde6",1,0,14,14);break;
    case T.SINK:R(SH,2,2,14,14);R("#eef1f2",1,1,14,13);R("#c7d8df",4,4,8,7);R("#aebdc5",7,3,2,2);break;
    case T.FLOWER:R("#b89a80",0,5,16,10);R(SH,0,14,16,2);{const fc=["#f2b8c2","#fbeec2","#fdfbf6","#e7c7e6"];for(let i=0;i<4;i++){R("#7fbf3e",1+i*4,7,3,4);R(fc[(x+i)%4],1+i*4,5,3,3);}}break;
    case T.WATER:R("#a9cdd9",0,0,16,16);R("#cfe6ec",2+(y%2)*6,4,5,1);R("#cfe6ec",8-(y%2)*4,11,5,1);if(tileAt(x,y-1)!==T.WATER)R("#8fb6c6",0,0,16,3);break;
    case T.BAR:R("#a8a3b0",2,6,2,8);R("#a8a3b0",12,6,2,8);R("#cdcad3",0,6,16,2);R(SH,0,9,16,2);break;
    case T.BENCH:R(SH,1,6,16,9);R("#c4a283",0,4,16,3);R("#c4a283",0,8,16,3);R("#ad8a6c",0,11,16,1);break;
  }
}
function drawTreeTop(g,x,y){
  const sak=grid[y][x]===T.SAKURA,px=x*TS+8,py=y*TS+7;
  const sh=sak?"#d9a7b5":"#5f9a3a",mid=sak?"#f1c7d0":"#8cc63f",hi=sak?"#fbe6ea":"#c6e46a";
  const circ=(c,cx,cy,r)=>{g.fillStyle=c;g.beginPath();g.arc(cx,cy,r,0,Math.PI*2);g.fill();};
  g.fillStyle=SH;g.beginPath();g.ellipse(px+3,py+8,10,4,0,0,Math.PI*2);g.fill();
  circ(sh,px,py+1,8);circ(sh,px-5,py+3,5);circ(sh,px+5,py+3,5);
  circ(mid,px-1,py-1,7);circ(mid,px-5,py+1,4);circ(mid,px+5,py,4);
  circ(hi,px-3,py-4,3);g.fillStyle=hi;g.fillRect(px+2,py-3,2,2);
  if(sak){g.fillStyle="#fffdfb";g.fillRect(px-1,py+2,1,1);g.fillRect(px+4,py-2,1,1);}
  else{g.fillStyle="#b4d85a";g.fillRect(px+3,py+3,2,1);}
}

/* ================= スプライト ================= */
function spriteCanvas(fn){const c=document.createElement("canvas");c.width=16;c.height=16;fn(c.getContext("2d"));return c;}
const box=(g,c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
// dir: 0下 1上 2左 3右
function drawKid(g,dir,frame){
  const SK="#f5dcc6",SKd="#e3c2a8",HR="#6d5448",HRd="#58433a",CAP="#e3958a",CAPd="#c97b72",UNI="#8496bb",UNId="#6c7da3",SHOE="#8a6e66";
  box(g,"rgba(112,94,134,.3)",4,14,8,2);
  if(frame===0){box(g,SHOE,5,12,2,2);box(g,SHOE,9,12,2,2);}
  else if(dir<2){box(g,SHOE,5,11,2,2);box(g,SHOE,9,13,2,1);}
  else{box(g,SHOE,5,13,2,1);box(g,SHOE,9,11,2,2);}
  box(g,UNI,4,8,8,4);box(g,UNId,4,11,8,1);
  if(dir===0)box(g,"#fbf8f1",7,8,2,2);
  if(dir<2){box(g,SK,3,9,1,2);box(g,SK,12,9,1,2);}else box(g,SK,dir===2?5:10,10,1,2);
  box(g,SK,4,2,8,6);box(g,SKd,4,7,8,1);
  if(dir===1){box(g,HR,4,2,8,6);box(g,HRd,4,7,8,1);}
  else{
    box(g,HR,4,2,8,2);
    if(dir===2){box(g,HR,9,2,3,5);box(g,"#4f4651",5,5,1,1);}
    else if(dir===3){box(g,HR,4,2,3,5);box(g,"#4f4651",10,5,1,1);}
    else{box(g,"#4f4651",6,5,1,1);box(g,"#4f4651",9,5,1,1);box(g,"#f0b4aa",5,6,1,1);box(g,"#f0b4aa",10,6,1,1);}
  }
  box(g,CAP,4,1,8,2);box(g,CAPd,4,2,8,1);
  if(dir===0)box(g,CAPd,4,3,8,1);if(dir===2)box(g,CAP,2,2,3,1);if(dir===3)box(g,CAP,11,2,3,1);
}
// [本体, ハイライト, 影, 受話器]
const PHONE_COLORS=[["#f2a7b0","#fbd0d4","#cf8590","#e48f9b"],["#9fd6c1","#cdeee1","#78b39d","#86c7af"],["#f5d27a","#fbe8b0","#d3aa52","#e9c25e"],["#9cc3ea","#cde2f6","#7299c4","#84b1df"],["#c3a9e2","#e2d3f3","#9b82be","#b195d6"],["#f3a67c","#fbcfb4","#cf8460","#e8946a"]];
function drawRotary(g,c){
  box(g,"rgba(86,66,112,.34)",2,13,13,3);
  box(g,c[0],2,7,12,7);box(g,c[1],3,7,10,2);box(g,c[2],2,13,12,1);
  box(g,c[3],1,3,14,3);box(g,c[3],1,5,3,2);box(g,c[3],12,5,3,2);box(g,c[1],2,3,12,1);box(g,c[2],1,6,3,1);box(g,c[2],12,6,3,1);
  g.fillStyle="#fffaf2";g.beginPath();g.arc(8,10.5,2.6,0,Math.PI*2);g.fill();box(g,c[2],8,10,1,1);
}
function drawWaves(g){
  const c="#fff1c4",d="#e9c98a";
  box(g,c,1,4,2,1);box(g,c,0,7,2,1);box(g,c,13,4,2,1);box(g,c,14,7,2,1);box(g,d,1,5,2,1);box(g,d,13,5,2,1);
}

/* ================= Three.js ================= */
const renderer=new THREE.WebGLRenderer({antialias:false});
renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));renderer.setClearColor(0x141018);
document.getElementById("game").appendChild(renderer.domElement);
const scene=new THREE.Scene();
const camera=new THREE.OrthographicCamera(-1,1,1,-1,-100,100);camera.position.z=10;
function tex(cv){const t=new THREE.CanvasTexture(cv);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;return t;}
const mat=t=>new THREE.MeshBasicMaterial({map:t,alphaTest:.5});

const mapMesh=new THREE.Mesh(new THREE.PlaneGeometry(W*TS,H*TS),new THREE.MeshBasicMaterial({map:tex(drawMap())}));
mapMesh.position.set(W*TS/2,-H*TS/2,0);scene.add(mapMesh);

const kidTex=[];for(let d=0;d<4;d++){kidTex[d]=[];for(let f=0;f<2;f++)kidTex[d][f]=tex(spriteCanvas(g=>drawKid(g,d,f)));}
const phoneTex=PHONE_COLORS.map(c=>tex(spriteCanvas(g=>drawRotary(g,c)))),waveTex=tex(spriteCanvas(drawWaves));
const sprGeo=new THREE.PlaneGeometry(16,16);
const kidMat=mat(kidTex[0][0]);const kidMesh=new THREE.Mesh(sprGeo,kidMat);scene.add(kidMesh);
const waveMesh=new THREE.Mesh(sprGeo,mat(waveTex));waveMesh.visible=false;scene.add(waveMesh);

const VERT=`varying vec2 vP;void main(){vec4 w=modelMatrix*vec4(position,1.);vP=vec2(w.x,-w.y);gl_Position=projectionMatrix*viewMatrix*w;}`;
const NOISE=`float h1(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h1(i),h1(i+vec2(1,0)),f.x),mix(h1(i+vec2(0,1)),h1(i+vec2(1,1)),f.x),f.y);}`;

// 木漏れ日と雲の影（プレイヤーにも落ちる）
const lightMat=new THREE.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,uniforms:{uTime:{value:0}},vertexShader:VERT,
fragmentShader:`uniform float uTime;varying vec2 vP;${NOISE}
void main(){
  vec2 p=floor(vP/2.)*2.;
  float c=n2(p/190.+vec2(uTime*.018,uTime*.007))*.65+n2(p/80.+vec2(uTime*.03,-uTime*.01))*.35;
  float cloud=smoothstep(.68,.82,c);
  vec2 q=vec2(p.x*.8+p.y*.6,p.y*.8-p.x*.6);
  float leaf=n2(q/26.+vec2(uTime*.10,uTime*.04));
  float flick=n2(p/8.+vec2(uTime*.5,uTime*.2));
  float streak=step(.66,leaf)*step(.42,flick);
  float dapple=step(.6,n2(p/11.+uTime*.25))*step(.55,leaf)*.6;
  float L=max(streak,dapple)*(1.-cloud*.7);
  vec4 sh=vec4(.38,.3,.52,cloud*.16);
  vec4 li=vec4(1.,.95,.76,L*.26);
  vec4 o=vec4(mix(sh.rgb,li.rgb,li.a>0.?.85:0.),max(sh.a,li.a)+sh.a*li.a*.2);
  if(o.a<.01)discard;
  gl_FragColor=o;
}`});
const lightMesh=new THREE.Mesh(new THREE.PlaneGeometry(W*TS+400,H*TS+400),lightMat);
lightMesh.position.set(W*TS/2,-H*TS/2,5);lightMesh.renderOrder=5;scene.add(lightMesh);

// 黒いもや
const MAXC=48;
const fogUni={uTime:{value:0},uN:{value:0},uC:{value:Array.from({length:MAXC},()=>new THREE.Vector3())},uBlob:{value:new THREE.Vector4(0,0,0,0)}};
const fogMat=new THREE.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,uniforms:fogUni,vertexShader:VERT,
fragmentShader:`uniform float uTime;uniform int uN;uniform vec3 uC[${MAXC}];uniform vec4 uBlob;varying vec2 vP;${NOISE}
void main(){
  vec2 p=floor(vP/2.)*2.;
  float band=floor(p.y/6.);
  float gk=step(.94,h1(vec2(band,floor(uTime*11.))));
  vec2 pg=p+vec2(gk*(h1(vec2(band,floor(uTime*23.)))-.5)*28.,0.);
  float nn=n2(pg/15.+vec2(uTime*.7,-uTime*.45))*.7+n2(pg/5.-uTime*1.4)*.3;
  float d=1e5;
  for(int i=0;i<${MAXC};i++){if(i>=uN)break;d=min(d,length(pg-uC[i].xy)-uC[i].z);}
  float dv=d-nn*12.;
  float fog=step(0.,dv);
  float edge=fog*(1.-step(7.,dv));
  float bf=0.,bedge=0.;
  if(uBlob.w>.5){
    float db=length(pg-uBlob.xy)-uBlob.z-nn*10.;
    bf=1.-step(0.,db);
    bedge=bf*step(-7.,db);
  }
  if(fog<.5&&bf<.5)discard;
  float sp=h1(p+floor(uTime*14.));
  vec3 col=vec3(.078,.063,.094);
  if(fog>.5){
    if(edge>.5&&sp>.72)col=sp>.93?vec3(.62,.55,.7):vec3(.22,.18,.27);
  }else{
    col=mix(vec3(.25,.15,.78),vec3(.42,.3,.98),nn);
    if(bedge>.5&&sp>.6)col=sp>.9?vec3(.88,.84,1.):vec3(.6,.5,1.);
  }
  gl_FragColor=vec4(col,1.);
}`});
const fogMesh=new THREE.Mesh(new THREE.PlaneGeometry(W*TS+800,H*TS+800),fogMat);
fogMesh.position.set(W*TS/2,-H*TS/2,8);fogMesh.renderOrder=8;fogMesh.visible=false;scene.add(fogMesh);

// 花びら
const petals=[];const petalGeo=new THREE.PlaneGeometry(2,2);
for(let i=0;i<34;i++){const m=new THREE.Mesh(petalGeo,new THREE.MeshBasicMaterial({color:i%3?0xf6d3da:0xfbe9ec,depthTest:false,transparent:true}));m.renderOrder=6;m.visible=false;scene.add(m);petals.push({m,on:false,x:0,y:0,vx:0,vy:0,ph:0});}
let nextGust=performance.now()+3000;

let scale=3,viewW=0,viewH=0;
function resize(){
  const w=window.innerWidth,h=window.innerHeight;
  if(("ontouchstart" in window)||navigator.maxTouchPoints>0){
    const rp=renderer.getPixelRatio(),target=Math.min(w/(15*TS),h/(8.5*TS));
    scale=Math.max(1.5,Math.min(6,Math.round(target*rp)/rp));
  }else scale=Math.max(1,Math.min(6,Math.floor(Math.min(w/(18*TS),h/(11*TS)))));
  viewW=w/scale;viewH=h/scale;
  camera.left=-viewW/2;camera.right=viewW/2;camera.top=viewH/2;camera.bottom=-viewH/2;camera.updateProjectionMatrix();
  renderer.setSize(w,h);
}
window.addEventListener("resize",resize);window.addEventListener("orientationchange",()=>setTimeout(resize,300));resize();

/* ================= 状態 ================= */
const START={x:18*TS+8,y:27*TS+12};
const FIRST_SPOT={tx:18,ty:26};
const player={x:START.x,y:START.y,dir:1,frame:0,animT:0,mvx:0,mvy:-1};
let mode="title",lock=true,playerName="きみ";
let phones=[];      // {tx,ty,pcm,buffer,card,room,final,color,used,mesh}
let kept=[];        // {id,buffer,room,label}
let clearings=[];   // {x,y,r,cur}
const blob={x:0,y:0,r:2.6*TS,cur:0,locked:true};
let found=0,discards=0,needFinal=1,finalActive=false,ringingPhone=null,inCall=false,keptSeq=0;
let actState="none",cdOpen=false,playingKeptId=null;
const keys=new Set();
const $=id=>document.getElementById(id);
const isTouch=("ontouchstart" in window)||navigator.maxTouchPoints>0;

/* ================= Firebase ================= */
let db=null;
try{
  const c=window.FIREBASE_CONFIG;
  if(window.firebase&&c&&c.apiKey&&!/ここに/.test(c.apiKey)&&c.projectId){firebase.initializeApp(c);db=firebase.firestore();}
}catch(e){console.warn("firebase",e);db=null;}

const ALPH="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function newCode(){const a=new Uint32Array(6);crypto.getRandomValues(a);let s="";for(const v of a)s+=ALPH[v%ALPH.length];return s;}

/* 声は 16kHz・8bit（μ-law）の 電話品質に して保存する。
   iPhone と Android で 録音形式が ちがっても、どちらでも 再生できる */
const SR=16000;
const MU_DEC=new Float32Array(256);
for(let b=0;b<256;b++){const y=b/127.5-1;MU_DEC[b]=Math.sign(y)*(Math.pow(256,Math.abs(y))-1)/255;}
function encodeVoice(buffer){
  const ch=buffer.numberOfChannels,n=buffer.length,src=new Float32Array(n);
  for(let c=0;c<ch;c++){const d=buffer.getChannelData(c);for(let i=0;i<n;i++)src[i]+=d[i]/ch;}
  const ratio=buffer.sampleRate/SR,m=Math.min(Math.floor(n/ratio),SR*31),f=new Float32Array(m);
  for(let i=0;i<m;i++){const a=Math.floor(i*ratio),b=Math.min(n,Math.floor((i+1)*ratio));let s=0;for(let k=a;k<b;k++)s+=src[k];f[i]=s/Math.max(1,b-a);}
  let peak=0;for(let i=0;i<m;i++)peak=Math.max(peak,Math.abs(f[i]));
  const g=peak>0?Math.min(5,.9/peak):1,u=new Uint8Array(m);
  for(let i=0;i<m;i++){const x=Math.max(-1,Math.min(1,f[i]*g));const y=Math.sign(x)*Math.log(1+255*Math.abs(x))/Math.log(256);u[i]=Math.max(0,Math.min(255,Math.round((y+1)*127.5)));}
  return u;
}
function decodeVoice(u){
  const r=actx.sampleRate/SR,n=Math.max(1,Math.floor(u.length*r)),b=actx.createBuffer(1,n,actx.sampleRate),d=b.getChannelData(0),L=u.length-1;
  for(let i=0;i<n;i++){const x=i/r,a=Math.floor(x),t=x-a;d[i]=MU_DEC[u[a]]*(1-t)+MU_DEC[u[Math.min(L,a+1)]]*t;}
  return b;
}
const B=()=>firebase.firestore.Blob;
async function uploadTape(onProgress){
  const col=db.collection("tapes");
  let code=newCode();
  for(let i=0;i<5;i++){const s=await col.doc(code).get();if(!s.exists)break;code=newCode();}
  let done=0;onProgress(0,phones.length);
  await Promise.all(phones.map((p,i)=>col.doc(code).collection("voices").doc("v"+i).set({pcm:B().fromUint8Array(p.pcm),n:p.pcm.length}).then(()=>onProgress(++done,phones.length))));
  await col.doc(code).set({to:playerName,count:phones.length,createdAt:firebase.firestore.FieldValue.serverTimestamp(),
    phones:phones.map((p,i)=>({tx:p.tx,ty:p.ty,final:!!p.final,color:p.color,v:"v"+i}))});
  return code;
}
async function loadTape(code,onProgress){
  const ref=db.collection("tapes").doc(code);
  const s=await ref.get();
  if(!s.exists)return null;
  const d=s.data();let done=0;onProgress(0,d.phones.length);
  const list=await Promise.all(d.phones.map(p=>ref.collection("voices").doc(p.v).get().then(v=>{onProgress(++done,d.phones.length);return{...p,pcm:v.data().pcm.toUint8Array()};})));
  return{to:d.to||"",phones:list};
}

/* ================= 入力 ================= */
const KEYMAP={ArrowUp:"u",KeyW:"u",ArrowDown:"d",KeyS:"d",ArrowLeft:"l",KeyA:"l",ArrowRight:"r",KeyD:"r"};
window.addEventListener("keydown",e=>{
  if(e.target&&e.target.tagName==="INPUT")return;
  if(KEYMAP[e.code]){keys.add(KEYMAP[e.code]);e.preventDefault();}
  if((e.code==="Space"||e.code==="Enter")&&!$("act").hidden&&!lock){e.preventDefault();onAction();}
});
window.addEventListener("keyup",e=>{if(KEYMAP[e.code])keys.delete(KEYMAP[e.code]);});
window.addEventListener("blur",()=>{keys.clear();endStick();});
document.addEventListener("gesturestart",e=>e.preventDefault());

// 仮想スティック
const stick={id:null,ox:0,oy:0,dx:0,dy:0};
const zone=$("zone"),stickEl=$("stick"),knob=$("knob");
const R_STICK=46;
function restStick(){const h=window.innerHeight;stickEl.style.left=(Math.max(16,window.innerWidth*0)+96)+"px";stickEl.style.top=(h-96)+"px";knob.style.transform="translate(0,0)";stickEl.classList.remove("on");}
zone.addEventListener("pointerdown",e=>{
  if(stick.id!==null)return;
  stick.id=e.pointerId;stick.ox=e.clientX;stick.oy=e.clientY;stick.dx=stick.dy=0;
  stickEl.style.left=e.clientX+"px";stickEl.style.top=e.clientY+"px";stickEl.classList.add("on");
  try{zone.setPointerCapture(e.pointerId);}catch(_){}
  ensureAudio();e.preventDefault();
});
zone.addEventListener("pointermove",e=>{
  if(e.pointerId!==stick.id)return;
  let dx=e.clientX-stick.ox,dy=e.clientY-stick.oy;const m=Math.hypot(dx,dy);
  if(m>R_STICK){dx*=R_STICK/m;dy*=R_STICK/m;}
  stick.dx=dx;stick.dy=dy;knob.style.transform=`translate(${dx}px,${dy}px)`;e.preventDefault();
});
function endStick(e){if(e&&e.pointerId!==stick.id)return;stick.id=null;stick.dx=stick.dy=0;restStick();}
zone.addEventListener("pointerup",endStick);zone.addEventListener("pointercancel",endStick);
window.addEventListener("resize",()=>{if(stick.id===null)restStick();});
restStick();

/* ================= 当たり判定 ================= */
const pBox=(x,y)=>({x0:x-5,x1:x+5,y0:y-6,y1:y+1});
const phoneBox=p=>({x0:p.tx*TS+2,x1:p.tx*TS+14,y0:p.ty*TS+4,y1:p.ty*TS+15});
const overlap=(a,b)=>a.x0<b.x1&&a.x1>b.x0&&a.y0<b.y1&&a.y1>b.y0;
const inClear=(x,y)=>clearings.some(c=>Math.hypot(x-c.x,y-c.y)<=c.cur);
const corners=b=>[[b.x0,b.y0],[b.x1,b.y0],[b.x0,b.y1],[b.x1,b.y1]];
function blocked(bx){
  for(let ty=Math.floor(bx.y0/TS);ty<=Math.floor((bx.y1-.001)/TS);ty++)
    for(let tx=Math.floor(bx.x0/TS);tx<=Math.floor((bx.x1-.001)/TS);tx++){const t=tileAt(tx,ty);if(t<0||SOLID.has(t))return "wall";}
  if(mode==="find"){
    if(blob.locked){const cx=Math.max(bx.x0,Math.min(blob.x,bx.x1)),cy=Math.max(bx.y0,Math.min(blob.y,bx.y1));if(Math.hypot(cx-blob.x,cy-blob.y)<blob.r)return "blob";}
    if(!corners(bx).every(([x,y])=>inClear(x,y)))return "fog";
  }
  for(const p of phones)if(!p.used&&overlap(bx,phoneBox(p)))return p;
  return null;
}
function tryMove(dx,dy){
  const nx=player.x+dx,ny=player.y+dy,hit=blocked(pBox(nx,ny));
  if(!hit){player.x=nx;player.y=ny;return null;}
  return hit==="wall"?null:hit;
}

/* ================= 音 ================= */
let actx=null,micStream=null,micAnalyser=null,playAnalyser=null;
function setSession(t){try{if(navigator.audioSession)navigator.audioSession.type=t;}catch(e){}}
function ensureAudio(){
  if(!actx){
    setSession("playback");
    actx=new(window.AudioContext||window.webkitAudioContext)();
    const b=actx.createBuffer(1,1,22050),s=actx.createBufferSource();s.buffer=b;s.connect(actx.destination);s.start(0);
  }
  if(actx.state!=="running")actx.resume();
}
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&actx&&actx.state!=="running")actx.resume();});
let ring=null;
function startRing(vol){
  stopRing();
  const out=actx.createGain();out.gain.value=vol;out.connect(actx.destination);
  const lp=actx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=3000;lp.connect(out);
  const pat=actx.createGain();pat.gain.value=0;pat.connect(lp);
  const am=actx.createGain();am.gain.value=.5;am.connect(pat);
  const oscs=[1250,1650].map(f=>{const o=actx.createOscillator();o.type="square";o.frequency.value=f;const gg=actx.createGain();gg.gain.value=.11;o.connect(gg);gg.connect(am);o.start();return o;});
  const lfo=actx.createOscillator();lfo.type="square";lfo.frequency.value=24;const lg=actx.createGain();lg.gain.value=.5;lfo.connect(lg);lg.connect(am.gain);lfo.start();oscs.push(lfo);
  let next=actx.currentTime+.05;
  const sched=()=>{while(next<actx.currentTime+2){pat.gain.setValueAtTime(1,next);pat.gain.setValueAtTime(0,next+.9);pat.gain.setValueAtTime(1,next+1.15);pat.gain.setValueAtTime(0,next+2.05);next+=3.3;}};
  sched();const iv=setInterval(sched,400);
  ring={out,stop(){clearInterval(iv);out.gain.setTargetAtTime(0,actx.currentTime,.02);setTimeout(()=>{oscs.forEach(o=>{try{o.stop()}catch(e){}});out.disconnect();},120);}};
}
function stopRing(){if(ring){ring.stop();ring=null;}}
// 電話っぽく帯域を絞って、右チャンネルだけで鳴らす
let current=null;
function playRight(buffer,onend){
  const src=actx.createBufferSource();src.buffer=buffer;
  const hp=actx.createBiquadFilter();hp.type="highpass";hp.frequency.value=280;
  const lp=actx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=3800;
  const mono=actx.createGain();mono.channelCount=1;mono.channelCountMode="explicit";mono.channelInterpretation="speakers";mono.gain.value=1.4;
  const merger=actx.createChannelMerger(2);
  playAnalyser=actx.createAnalyser();playAnalyser.fftSize=1024;
  src.connect(hp);hp.connect(lp);lp.connect(mono);mono.connect(merger,0,1);mono.connect(playAnalyser);merger.connect(actx.destination);
  let done=false;
  const finish=()=>{if(done)return;done=true;playAnalyser=null;current=null;try{merger.disconnect()}catch(e){}onend&&onend();};
  src.onended=finish;src.start();
  current={stop(){try{src.stop()}catch(e){}finish();}};
  return current;
}
function playPlain(buffer){const s=actx.createBufferSource();s.buffer=buffer;s.connect(actx.destination);s.start();return s;}
function toneBuffer(i){
  const sr=actx.sampleRate,len=Math.floor(sr*1.8),b=actx.createBuffer(1,len,sr),d=b.getChannelData(0);
  const notes=[[523,659,784],[587,698,880],[659,784,988],[440,554,659],[494,622,740],[392,494,587]][i%6];
  for(let n=0;n<3;n++){const f=notes[n],s0=Math.floor(n*.5*sr),l=Math.floor(.5*sr);for(let k=0;k<l;k++){const env=Math.min(1,k/400)*Math.exp(-k/(sr*.25));d[s0+k]+=Math.sin(2*Math.PI*f*k/sr)*.4*env;}}
  return b;
}

// BGM（声を聞くときや録音中は音量0）
let bgmBuf=null,bgmSrc=null,bgmGain=null,bgmLoading=null,bgmQuiet=null;
const BGM_VOL=.18;
function loadBgm(){
  if(bgmLoading)return bgmLoading;
  bgmLoading=fetch("bgm.mp3").then(r=>r.arrayBuffer()).then(a=>new Promise((res,rej)=>actx.decodeAudioData(a,res,rej))).then(b=>{bgmBuf=b;}).catch(()=>{});
  return bgmLoading;
}
async function startBgm(){
  await loadBgm();if(!bgmBuf||bgmSrc)return;
  bgmGain=actx.createGain();bgmGain.gain.value=0;bgmGain.connect(actx.destination);
  bgmSrc=actx.createBufferSource();bgmSrc.buffer=bgmBuf;bgmSrc.loop=true;bgmSrc.connect(bgmGain);bgmSrc.start();bgmQuiet=null;
}
function updateBgm(){
  if(!bgmGain)return;
  const quiet=inCall||!!current||!$("rec").hidden||!$("endChoice").hidden||mode==="title"||mode==="end";
  if(quiet===bgmQuiet)return;bgmQuiet=quiet;
  bgmGain.gain.cancelScheduledValues(actx.currentTime);
  bgmGain.gain.setTargetAtTime(quiet?0:BGM_VOL,actx.currentTime,quiet?.06:.7);
}
// 足音（サッサッ）
let noiseBuf=null;
function footstep(){
  if(!actx)return;
  if(!noiseBuf){const n=Math.floor(actx.sampleRate*.11);noiseBuf=actx.createBuffer(1,n,actx.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);}
  const s=actx.createBufferSource();s.buffer=noiseBuf;s.playbackRate.value=.75+Math.random()*.5;
  const f=actx.createBiquadFilter();f.type="bandpass";f.frequency.value=2000+Math.random()*1400;f.Q.value=.9;
  const g=actx.createGain();g.gain.value=.11;s.connect(f);f.connect(g);g.connect(actx.destination);s.start();
}
// もやが晴れる音（トゥルルルル）
function trill(){
  if(!actx)return;
  const t0=actx.currentTime+.02,out=actx.createGain();out.gain.value=.14;out.connect(actx.destination);
  const notes=[659,784,880,988,1175,1319,1568,1760,2093];
  for(let i=0;i<22;i++){
    const base=notes[Math.min(notes.length-1,Math.floor(i/2.4))];
    const o=actx.createOscillator();o.type="triangle";o.frequency.value=i%2?base*1.12:base;
    const g=actx.createGain(),t=t0+i*.04;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(1-i/30,t+.006);g.gain.exponentialRampToValueAtTime(.001,t+.11);
    o.connect(g);g.connect(out);o.start(t);o.stop(t+.13);
  }
  setTimeout(()=>out.disconnect(),2000);
}

/* ================= UI ================= */
let toastT=0;
function toast(msg,ms=2400){const el=$("toast");el.textContent=msg;el.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove("on"),ms);}
const normals=()=>phones.filter(p=>!p.final);
function updateHud(){
  if(mode==="hide"){$("modeLabel").textContent="かくす";$("countLabel").textContent=`${phones.length}こ かくした`;}
  else{$("modeLabel").textContent="さがす";$("countLabel").textContent=`みつけた ${Math.min(found,normals().length)} / ${normals().length}　てばなした ${discards}`;}
  $("act2").hidden=!(mode==="hide"&&phones.length>=2);
}
function showGameUI(on){
  $("hud").hidden=!on;$("act").hidden=!on;$("zone").hidden=!on||!isTouch;$("stick").hidden=!on||!isTouch;$("keys").hidden=!on||isTouch;
  if(!on){$("act2").hidden=true;setCD(false);}
}
function setCD(open){cdOpen=open;$("cds").hidden=!open;}
function makeDisc(spin){const d=document.createElement("span");d.className="disc"+(spin?" spin":"");return d;}
function renderKept(){
  const list=$("cdList");list.innerHTML="";
  $("cdCount").textContent=kept.length;$("cdEmpty").hidden=kept.length>0;
  kept.forEach(k=>{
    const b=document.createElement("button");b.className="cditem";
    const nm=document.createElement("span");nm.className="nm";nm.textContent=k.label;
    const pl=document.createElement("span");pl.className="pl";pl.textContent="▶";
    b.append(makeDisc(playingKeptId===k.id),nm,pl);b.addEventListener("click",()=>replay(k));list.appendChild(b);
  });
}
function placeLabel(room){
  const same=kept.filter(k=>k.room===room).length+phones.filter(p=>p.used&&p.room===room&&!p.final).length;
  return same>1?`${room}の でんわ（${same}）`:`${room}の でんわ`;
}

/* ================= カード ================= */
const TOPICS=[
"後輩になりきって 愛の告白をする","先生になって 説教する","オレオレ詐欺を してみる","国民的キャラの モノマネで 自己紹介","通販番組の テンションで この場所を 売りこむ",
"ラジオDJになって 1曲 紹介する","執事になりきって お出迎えする","宇宙人として 地球に 来た理由を 話す","10年後の 自分から 電話する","ヒーローの 決めゼリフを 考えて 叫ぶ",
"迷子の 子どもに なりきる","昔の 恋人みたいに 未練たらしく 話す","天気予報士として この場所の 天気を 伝える","ライバル宣言を する","今 思いついた 嘘の 思い出を 語る",
"ひみつを うちあける","なぞなぞを 出す（答えは 言わない）","1フレーズ 歌う","奇声を あげる","実況アナウンサーとして 相手の 歩き方を 実況する",
"占い師として 今日の 運勢を 告げる","飲み会に さそう","待ち合わせ場所を 決める","ここに 来た理由を 話す"];
const LINES=[
"デュフ！デュフフウフ！ {n}氏、よくぞ 参られた…","もしもし、オレオレ。……{n}？ オレだよオレ、今すぐ 100円 振り込んで","{n}先輩……ずっと 前から 好きでした！！（返事は いらないです）",
"こらーっ {n}！ 廊下を 走るなと 何度 言ったら わかるんだ！","ピンポンパンポーン。{n}さん、{n}さん、至急 職員室まで お越しください","お電話 ありがとうございます。こちら {n}専用 お悩み相談室です",
"……見つけたな。この 電話を 取った者には、3日間 しゃっくりが 止まらない 呪いが","{n}！ ここ、なつかしくない？","もしもし？ もしもし？ ……あ、ごめん 間違えました",
"ワレワレハ ウチュウジン ダ。{n}ヲ ムカエニ キタ","おい{n}、宿題 やった？ 見せて","{n}、今日から おれたち ライバルな","見つかっちゃった！ {n} すごいじゃん",
"いま {n}の うしろに いるよ。……うそ","{n}、駅前で 18時な。遅れるなよ","あのときのこと、まだ おこってるからね {n}","{n}、がんばってるの 知ってるよ",
"ただいま 留守に しております。ピーという 発信音の あとに、{n}の 好きな 食べ物を どうぞ","ハロー {n}。This is your future speaking.","ここ、{n}が よく ねてた 場所でしょ"];
const FINAL_TOPICS=["いま 元気か たずねる","また会おうと 言う","お別れの ことばを 言う"];
const FINAL_LINES=["{n}、いま 元気？","{n}、また会おうね。元気でいてよ","ひさしぶり {n}。元気に してる？","{n}、げんき〜？"];
const used={t:new Set(),l:new Set()};
const pick=(arr,u)=>{const pool=arr.filter(a=>!u.has(a));const src=pool.length?pool:arr;const a=src[Math.floor(Math.random()*src.length)];u.add(a);return a;};
const fillName=s=>s.replaceAll("{n}",playerName);

let pendingSpot=null,chosenCard=null,cardFinal=false;
function facingSpot(){
  const tx=Math.floor(player.x/TS),ty=Math.floor((player.y-3)/TS);
  const d=[[0,1],[0,-1],[-1,0],[1,0]][player.dir];
  const sx=tx+d[0],sy=ty+d[1],t=tileAt(sx,sy);
  if(t<0||SOLID.has(t))return null;
  if(phones.some(p=>p.tx===sx&&p.ty===sy))return null;
  if(overlap(pBox(player.x,player.y),{x0:sx*TS+2,x1:sx*TS+14,y0:sy*TS+4,y1:sy*TS+15}))return null;
  return{tx:sx,ty:sy};
}
function openCards({final=false,first=false,spot=null}={}){
  if(lock&&!first)return;
  const s=spot||facingSpot();
  if(!s){toast("向いている方に 置ける場所が ないよ");return;}
  pendingSpot=s;cardFinal=final;lock=true;keys.clear();endStick();
  $("cardsCancel").hidden=first;
  $("cardsTitle").textContent=final?"さいごの でんわ":first?"さいしょの でんわ":"なにを はなす？";
  $("cardsSub").textContent=final?"いちばん さいごに 鳴る でんわ。げんきか たずねたり、お別れを 言ったりしよう"
    :first?"まずは ここに ひとつ。聞く人が さいしょに 出る でんわだよ"
    :"カードを 1まい えらんでから ろくおんしよう";
  const cards=[
    {kind:"free",tag:"じゆう",text:final?"じゆうに はなす（さいごは「げんき？」と きいてね）":"じゆうに はなす"},
    {kind:"topic",tag:"おだい",text:final?pick(FINAL_TOPICS,used.t):pick(TOPICS,used.t)},
    {kind:"line",tag:"セリフ",text:"「"+fillName(final?pick(FINAL_LINES,used.l):pick(LINES,used.l))+"」"}
  ];
  const row=$("cardRow");row.innerHTML="";
  cards.forEach(c=>{
    const b=document.createElement("button");b.className="card";
    const tg=document.createElement("span");tg.className="tag "+(final&&c.kind!=="free"?"last":c.kind);tg.textContent=c.tag;
    const tx=document.createElement("span");tx.textContent=c.text;
    b.append(tg,tx);b.addEventListener("click",()=>{chosenCard=c;$("cards").hidden=true;openRec(first);});
    row.appendChild(b);
  });
  $("cards").hidden=false;
}
$("cardsCancel").addEventListener("click",()=>{$("cards").hidden=true;lock=false;});
$("act2").addEventListener("click",()=>openCards({final:true}));

/* ================= 録音 ================= */
let recorder=null,chunks=[],recBuffer=null,recT0=0,recTimer=0,previewSrc=null,recFirst=false;
const MAXSEC=30;
function setRecState(s){$("recStart").hidden=s!=="idle";$("recStop").hidden=s!=="rec";["recPlay","recRetry","recPlace"].forEach(id=>$(id).hidden=s!=="done");}
function openRec(first){
  recFirst=first;$("recCancel").hidden=first;
  $("recTag").textContent=chosenCard.tag;$("recTag").className="tag "+(cardFinal&&chosenCard.kind!=="free"?"last":chosenCard.kind);
  $("recText").textContent=chosenCard.text;$("recTime").textContent=`0.0 / ${MAXSEC} びょう`;
  $("meterFill").style.width="0";$("micErr").hidden=true;recBuffer=null;setRecState("idle");$("rec").hidden=false;
}
function releaseMic(){
  if(micStream){micStream.getTracks().forEach(t=>t.stop());micStream=null;}
  micAnalyser=null;setSession("playback");
  if(actx&&actx.state!=="running")actx.resume();
}
$("recStart").addEventListener("click",async()=>{
  ensureAudio();
  try{
    setSession("play-and-record");
    micStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
    if(actx.state!=="running")await actx.resume();
    const src=actx.createMediaStreamSource(micStream);micAnalyser=actx.createAnalyser();micAnalyser.fftSize=1024;src.connect(micAnalyser);
  }catch(e){releaseMic();$("micErr").hidden=false;return;}
  chunks=[];
  try{recorder=new MediaRecorder(micStream);}catch(e){releaseMic();$("micErr").hidden=false;return;}
  recorder.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
  recorder.onstop=async()=>{
    clearInterval(recTimer);releaseMic();
    try{const blob=new Blob(chunks,{type:recorder.mimeType||"audio/mp4"});const ab=await blob.arrayBuffer();
      recBuffer=await new Promise((res,rej)=>actx.decodeAudioData(ab,res,rej));setRecState("done");}
    catch(e){toast("録音を 読みこめなかった。もう一度 ためしてね");setRecState("idle");}
  };
  recorder.start(250);recT0=performance.now();setRecState("rec");
  recTimer=setInterval(()=>{const s=(performance.now()-recT0)/1000;$("recTime").textContent=`${s.toFixed(1)} / ${MAXSEC} びょう`;if(s>=MAXSEC&&recorder.state==="recording")recorder.stop();},100);
});
$("recStop").addEventListener("click",()=>{if(recorder&&recorder.state==="recording")recorder.stop();});
$("recPlay").addEventListener("click",()=>{ensureAudio();if(previewSrc)try{previewSrc.stop()}catch(e){}if(recBuffer)previewSrc=playPlain(recBuffer);});
$("recRetry").addEventListener("click",()=>{recBuffer=null;$("recTime").textContent=`0.0 / ${MAXSEC} びょう`;setRecState("idle");});
$("fileIn").addEventListener("change",async e=>{
  const f=e.target.files[0];if(!f)return;ensureAudio();
  try{const ab=await f.arrayBuffer();recBuffer=await new Promise((res,rej)=>actx.decodeAudioData(ab,res,rej));setRecState("done");$("micErr").hidden=true;}catch(err){toast("この ファイルは 読みこめなかった");}
});
function closeRec(){
  if(previewSrc)try{previewSrc.stop()}catch(e){}
  if(recorder&&recorder.state==="recording"){recorder.onstop=null;recorder.stop();clearInterval(recTimer);}
  releaseMic();$("rec").hidden=true;
}
$("recCancel").addEventListener("click",()=>{closeRec();lock=false;});
$("recPlace").addEventListener("click",()=>{
  if(!recBuffer||!pendingSpot)return;
  closeRec();
  addPhone(pendingSpot.tx,pendingSpot.ty,encodeVoice(recBuffer),chosenCard.text,cardFinal);
  lock=false;
  if(recFirst)toast("つぎは 学校の どこかに かくそう。置きたい場所の前で「ろくおん」",3600);
  else if(cardFinal){lock=true;setTimeout(finishHide,500);}
  else toast(phones.length>=2?`かくした！（${phones.length}こ）さいごの でんわを かくすと おわり`:"かくした！");
  updateHud();
});
function addPhone(tx,ty,pcm,card,final,color){
  if(color==null)color=Math.floor(Math.random()*phoneTex.length);
  const m=new THREE.Mesh(sprGeo,mat(phoneTex[color%phoneTex.length]));
  m.position.set(tx*TS+8,-(ty*TS+8),1+(ty*TS+14)*1e-4);scene.add(m);
  phones.push({tx,ty,pcm,buffer:decodeVoice(pcm),card,room:regionAt(tx,ty),final,color,used:false,mesh:m});
}
function clearPhones(){phones.forEach(p=>scene.remove(p.mesh));phones=[];}

/* ================= タイトル ================= */
const LBL=["lHome","lName","lCode","lStatus","lDone"],BTN=["bHome","bName","bCode","bDone"];
function titleView(l,b){LBL.forEach(id=>$(id).hidden=id!==l);BTN.forEach(id=>$(id).hidden=id!==b);$("testBtn").hidden=l!=="lName";$("cassette").classList.toggle("spinning",l==="lStatus");}
function showTitle(){
  mode="title";lock=true;showGameUI(false);
  $("title").hidden=false;requestAnimationFrame(()=>$("title").classList.remove("fade"));
  titleView("lHome","bHome");
}
function hideTitle(){$("title").classList.add("fade");setTimeout(()=>{if(mode!=="title")$("title").hidden=true;},650);}
document.querySelectorAll("#title .back").forEach(b=>b.addEventListener("click",()=>titleView("lHome","bHome")));
$("goRec").addEventListener("click",()=>{ensureAudio();loadBgm();titleView("lName","bName");setTimeout(()=>$("nameIn").focus(),50);});
$("goListen").addEventListener("click",()=>{ensureAudio();loadBgm();$("codeErr").hidden=true;titleView("lCode","bCode");setTimeout(()=>$("codeIn").focus(),50);});
$("nameIn").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();e.target.blur();}});
$("codeIn").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("codeGo").click();}});
$("codeIn").addEventListener("input",e=>{const v=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"");if(v!==e.target.value)e.target.value=v;$("codeErr").hidden=true;});

function beginHide(){
  ensureAudio();$("nameIn").blur();
  playerName=$("nameIn").value.trim()||"きみ";
  clearPhones();used.t.clear();used.l.clear();
  mode="hide";player.x=START.x;player.y=START.y;player.dir=1;
  hideTitle();showGameUI(true);updateHud();startBgm();
}
$("nameGo").addEventListener("click",()=>{beginHide();lock=true;setTimeout(()=>openCards({first:true,spot:FIRST_SPOT}),650);});
$("testBtn").addEventListener("click",()=>{
  beginHide();lock=true;
  addPhone(FIRST_SPOT.tx,FIRST_SPOT.ty,encodeVoice(toneBuffer(0)),"テスト音 1",false);
  const cands=[];
  for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){if(!SOLID.has(grid[y][x])&&Math.hypot(x-18,y-27)>8)cands.push([x,y]);}
  for(let i=1;i<6;i++){
    let c,tries=0;
    do{c=cands[Math.floor(Math.random()*cands.length)];tries++;}while(tries<300&&phones.some(p=>Math.hypot(p.tx-c[0],p.ty-c[1])<8));
    addPhone(c[0],c[1],encodeVoice(toneBuffer(i)),`テスト音 ${i+1}`,i===5);
  }
  setTimeout(finishHide,700);
});

let lastCode="";
async function finishHide(){
  lock=true;mode="title";showGameUI(false);
  $("title").hidden=false;requestAnimationFrame(()=>$("title").classList.remove("fade"));
  $("doneTo").textContent=`${playerName} への テープ`;$("doneErr").hidden=true;$("retryBtn").hidden=true;
  if(!db){
    $("codeOut").textContent="------";$("doneErr").textContent="オンラインの 設定が まだなので、この端末でだけ 聞けます";$("doneErr").hidden=false;
    $("copyBtn").hidden=true;titleView("lDone","bDone");return;
  }
  titleView("lStatus","bDone");$("bDone").hidden=true;
  try{
    lastCode=await uploadTape((d,n)=>{$("statusTx").textContent=`テープに 録音ちゅう… ${d}/${n}`;});
    $("codeOut").textContent=lastCode;$("copyBtn").hidden=false;
    titleView("lDone","bDone");
  }catch(e){
    console.warn(e);
    $("codeOut").textContent="------";$("doneErr").textContent="保存に 失敗しました。電波を たしかめて もう一度";$("doneErr").hidden=false;
    $("copyBtn").hidden=true;$("retryBtn").hidden=false;titleView("lDone","bDone");
  }
}
$("retryBtn").addEventListener("click",finishHide);
$("copyBtn").addEventListener("click",()=>{
  const done=()=>toast("コードを コピーした");
  try{navigator.clipboard.writeText(lastCode).then(done,()=>toast(`コード：${lastCode}`,4000));}catch(e){toast(`コード：${lastCode}`,4000);}
});
$("hereBtn").addEventListener("click",()=>{ensureAudio();startFind();});
$("homeBtn").addEventListener("click",()=>{clearPhones();titleView("lHome","bHome");});

$("codeGo").addEventListener("click",async()=>{
  ensureAudio();
  const code=$("codeIn").value.trim().toUpperCase();$("codeIn").blur();
  const err=m=>{$("codeErr").textContent=m;$("codeErr").hidden=false;titleView("lCode","bCode");};
  if(code.length!==6)return err("6文字の コードを 入れてね");
  if(!db)return err("オンラインの 設定が まだです");
  titleView("lStatus",null);$("statusTx").textContent="テープを さがしてる…";
  try{
    const t=await loadTape(code,(d,n)=>{$("statusTx").textContent=`テープを 読みこみちゅう… ${d}/${n}`;});
    if(!t)return err("その コードの テープは 見つからなかった");
    clearPhones();
    t.phones.forEach(p=>addPhone(p.tx,p.ty,p.pcm,"",p.final,p.color));
    if(!phones.some(p=>p.final))return err("この テープは こわれているみたい");
    startFind();
  }catch(e){console.warn(e);err("読みこめなかった。電波を たしかめて もう一度");}
});

/* ================= さがす ================= */
function startFind(){
  mode="find";found=0;discards=0;finalActive=false;ringingPhone=null;kept=[];playingKeptId=null;renderKept();
  phones.forEach(p=>{if(p.used){p.used=false;scene.add(p.mesh);}});
  needFinal=Math.max(1,phones.length-2);
  player.x=START.x;player.y=START.y;player.dir=1;player.mvx=0;player.mvy=-1;
  clearings=[{x:START.x,y:START.y-10,r:8*TS,cur:8*TS}];
  const fp=phones.find(p=>p.final);
  blob.x=fp.tx*TS+8;blob.y=fp.ty*TS+9;blob.r=2.6*TS;blob.cur=blob.r;blob.locked=true;
  fogMesh.visible=true;
  hideTitle();showGameUI(true);updateHud();startBgm();
  lock=false;
  toast("でんわを さがそう。近づくと 鳴るよ",3000);
  setTimeout(()=>{if(mode==="find"&&!lock)toast("黒い もやは、ひろった こえを 手放すと 晴れる",3600);},3600);
}

let fogHintT=0;
function bump(hit){
  if(mode!=="find"||inCall)return;
  const now=performance.now();
  if(hit==="fog"||hit==="blob"){
    if(now-fogHintT>6000){fogHintT=now;toast(kept.length?"右の ボタンで もやを 消せる":"こえを ひろうと、もやを 消せるように なる");}
    return;
  }
  if(hit.final&&!finalActive&&now-fogHintT>2500){fogHintT=now;toast("……まだ つながらない みたい");}
}
function fogAhead(){
  const l=Math.hypot(player.mvx,player.mvy)||1;
  const px=player.x+player.mvx/l*14,py=player.y-3+player.mvy/l*14;
  if(blob.locked&&Math.hypot(px-blob.x,py-blob.y)<blob.r+8)return "blob";
  if(!inClear(px,py))return "fog";
  return null;
}
function tryFog(t){
  if(t==="blob"&&!finalActive){toast("この もやは、ほかの でんわを ぜんぶ 聞いてから");return;}
  if(t==="blob"&&discards>=needFinal){unlockBlob();return;}
  openDiscard(t);
}

let discardTarget=null;
function openDiscard(target){
  if(kept.length===0){toast("手放せる こえが まだ ない");return;}
  discardTarget=target;lock=true;keys.clear();endStick();setCD(false);
  const left=needFinal-discards;
  $("discardTitle").textContent=target==="blob"?"さいごの でんわの もや":"もやが 道を ふさいでいる";
  $("discardText").textContent=(target==="blob"?`こえを ひとつ 手放す？　あと ${left}つ 手放すと 晴れる。`:"こえを ひとつ 手放して、もやを 晴らす？")+"　手放した こえは、もう二度と 聞けない。";
  const list=$("discardList");list.innerHTML="";
  kept.forEach((k,i)=>{
    const id="dk"+k.id;
    const l=document.createElement("label");l.htmlFor=id;
    const r=document.createElement("input");r.type="radio";r.name="dk";r.id=id;r.value=k.id;if(i===0)r.checked=true;
    const s=document.createElement("span");s.textContent=k.label;
    const w=document.createElement("button");w.type="button";w.className="dwrap";w.setAttribute("aria-label",k.label+"を 試聴");
    const pi=document.createElement("span");pi.className="pi";pi.textContent="▶";
    w.append(makeDisc(false),pi);
    w.addEventListener("click",ev=>{ev.preventDefault();ev.stopPropagation();previewDiscard(k,w);});
    l.append(w,s,r);list.appendChild(l);
  });
  $("discard").hidden=false;
}
let previewBtn=null;
function stopPreview(){if(current)current.stop();}
function previewDiscard(k,btn){
  ensureAudio();
  const same=previewBtn===btn&&current;
  stopPreview();
  if(same)return;
  previewBtn=btn;btn.querySelector(".disc").classList.add("spin");btn.querySelector(".pi").textContent="■";
  playRight(k.buffer,()=>{btn.querySelector(".disc").classList.remove("spin");btn.querySelector(".pi").textContent="▶";if(previewBtn===btn)previewBtn=null;});
}
$("discardNo").addEventListener("click",()=>{stopPreview();$("discard").hidden=true;lock=false;});
$("discardYes").addEventListener("click",()=>{
  stopPreview();
  const sel=document.querySelector('input[name="dk"]:checked');if(!sel)return;
  const id=+sel.value;kept=kept.filter(k=>k.id!==id);renderKept();
  discards++;$("discard").hidden=true;lock=false;updateHud();
  if(discardTarget==="fog"){
    const l=Math.hypot(player.mvx,player.mvy)||1;
    clearings.push({x:player.x+player.mvx/l*10*TS,y:player.y-4+player.mvy/l*10*TS,r:16*TS,cur:1.5*TS});trill();
    toast("こえが ひとつ 消えた。もやが 晴れていく…");
  }else{
    if(discards>=needFinal)unlockBlob();
    else{trill();toast(`もやが すこし ゆらいだ。あと ${needFinal-discards}つ`);}
  }
});
function unlockBlob(){if(!blob.locked)return;blob.locked=false;trill();toast("さいごの でんわの もやが 晴れた",3000);}

function answer(){
  if(!ringingPhone||inCall)return;
  const p=ringingPhone;inCall=true;lock=true;keys.clear();endStick();stopRing();setCD(false);
  waveMesh.visible=false;showGameUI(false);
  callDark(p.buffer,()=>afterCall(p));
}
let callIv=0;
function callDark(buffer,onend){
  $("dimmer").className="black";$("call").hidden=false;
  const t0=performance.now();clearInterval(callIv);
  callIv=setInterval(()=>{const s=Math.floor((performance.now()-t0)/1000);$("callTime").textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;},250);
  setTimeout(()=>playRight(buffer,()=>{clearInterval(callIv);setTimeout(()=>{$("call").hidden=true;$("callTime").textContent="0:00";onend();},800);}),700);
}
function afterCall(p){
  p.used=true;scene.remove(p.mesh);ringingPhone=null;inCall=false;
  if(p.final){$("endChoice").hidden=false;return;}
  found++;
  kept.push({id:++keptSeq,buffer:p.buffer,room:p.room,label:placeLabel(p.room)});renderKept();
  $("dimmer").className="";showGameUI(true);lock=false;updateHud();
  if(found>=normals().length){setTimeout(()=>{toast("……どこかで でんわが 鳴っている",3400);finalActive=true;startRing(.05);},1400);}
  else toast("こえを ひろった。右の ボタンで 聞きかえせる");
}
function replay(k){
  if(lock||inCall)return;
  ensureAudio();
  lock=true;keys.clear();endStick();$("dimmer").className="soft";$("stopBtn").hidden=false;$("act").hidden=true;$("act2").hidden=true;
  if(ringingPhone&&!ringingPhone.final){stopRing();ringingPhone=null;}
  const fr=ring;if(fr)fr.out.gain.setTargetAtTime(0,actx.currentTime,.05);
  playingKeptId=k.id;renderKept();
  playRight(k.buffer,()=>{playingKeptId=null;renderKept();$("stopBtn").hidden=true;$("dimmer").className="";$("act").hidden=false;lock=false;});
}
$("stopBtn").addEventListener("click",()=>{if(current)current.stop();});

/* ================= 右の丸ボタン ================= */
const ACT={
  rec:{ic:"●",tx:"ろくおん",cls:"rec"},
  answer:{ic:"☎",tx:"声を 聞く",cls:"answer"},
  fog:{ic:"✦",tx:"モヤを 消す",cls:"fog"},
  blob:{ic:"✦",tx:"モヤを 消す",cls:"fog"},
  list:{ic:"◎",tx:"もってる 声",cls:""},
  close:{ic:"×",tx:"とじる",cls:""}
};
function computeAct(){
  if(mode==="hide")return "rec";
  if(mode!=="find")return "none";
  if(ringingPhone)return "answer";
  const f=fogAhead();if(f)return f;
  return cdOpen?"close":"list";
}
function renderAct(){
  const a=computeAct();
  let na=false;
  if(a==="rec")na=!facingSpot();
  if((a==="fog"||a==="blob")&&kept.length===0&&!(a==="blob"&&finalActive&&discards>=needFinal))na=true;
  const key=a+(na?"-na":"");
  if(key===actState)return;actState=key;
  const d=ACT[a];if(!d)return;
  const el=$("act");el.className=d.cls+(na?" na":"");$("actIc").textContent=d.ic;$("actTx").textContent=d.tx;
}
function onAction(){
  if(lock)return;
  ensureAudio();
  const a=computeAct();
  if(a==="rec")openCards();
  else if(a==="answer")answer();
  else if(a==="fog"||a==="blob")tryFog(a);
  else if(a==="list")setCD(true);
  else if(a==="close")setCD(false);
}
$("act").addEventListener("click",onAction);

/* ================= おわり ================= */
const finalPhone=()=>phones.find(p=>p.final);
$("endAgain").addEventListener("click",()=>{$("endChoice").hidden=true;callDark(finalPhone().buffer,()=>{$("endChoice").hidden=false;});});
$("endClear").addEventListener("click",()=>{kept=[];renderKept();$("endChoice").hidden=true;mode="end";setTimeout(resetToTitle,1200);});
function resetToTitle(){
  stopRing();if(current)current.stop();
  clearPhones();kept=[];clearings=[];used.t.clear();used.l.clear();renderKept();
  ["endChoice","stopBtn","call"].forEach(id=>$(id).hidden=true);
  fogMesh.visible=false;inCall=false;ringingPhone=null;finalActive=false;
  player.x=START.x;player.y=START.y;player.dir=1;
  $("codeIn").value="";
  showTitle();
  setTimeout(()=>$("dimmer").className="",300);
}

/* ================= ループ ================= */
let last=performance.now(),roomName="",stepT=.2;
const glowEl=$("glow");let glowV=0;
function loop(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;
  if(!lock&&(mode==="hide"||mode==="find")){
    let vx=(keys.has("r")?1:0)-(keys.has("l")?1:0),vy=(keys.has("d")?1:0)-(keys.has("u")?1:0),mag=1;
    if(vx&&vy){vx*=Math.SQRT1_2;vy*=Math.SQRT1_2;}
    if(stick.id!==null){const m=Math.hypot(stick.dx,stick.dy);if(m>8){vx=stick.dx/m;vy=stick.dy/m;mag=Math.min(1,(m-4)/(R_STICK-12));}}
    if(vx||vy){
      if(Math.abs(vx)>Math.abs(vy))player.dir=vx<0?2:3;else player.dir=vy>0?0:1;
      player.mvx=vx;player.mvy=vy;
      const sp=120*dt*mag;
      const ox=player.x,oy=player.y;
      const h1=tryMove(vx*sp,0),h2=tryMove(0,vy*sp);
      if(Math.hypot(player.x-ox,player.y-oy)>.4){stepT+=dt*(.5+mag*.5);if(stepT>.2){stepT=0;footstep();}}
      const hit=h1||h2;if(hit)bump(hit);
      player.animT+=dt*mag;if(player.animT>.12){player.animT=0;player.frame^=1;}
    }else player.frame=0;
  }
  // もやの更新
  if(mode==="find"){
    for(const c of clearings)c.cur+=(c.r-c.cur)*Math.min(1,dt*2.5);
    if(!blob.locked)blob.cur+=(0-blob.cur)*Math.min(1,dt*2);
    const n=Math.min(MAXC,clearings.length);
    for(let i=0;i<n;i++){const c=clearings[clearings.length-n+i];fogUni.uC.value[i].set(c.x,c.y,c.cur);}
    fogUni.uN.value=n;
    fogUni.uBlob.value.set(blob.x,blob.y,blob.cur,blob.cur>2?1:0);
  }
  fogUni.uTime.value=t;lightMat.uniforms.uTime.value=t;
  // 近くの でんわが 鳴る
  if(mode==="find"&&!inCall&&!lock){
    const fp=phones.find(p=>p.final&&!p.used);
    if(finalActive&&fp){
      const d=Math.hypot(player.x-(fp.tx*TS+8),player.y-(fp.ty*TS+10));
      if(ring)ring.out.gain.setTargetAtTime(Math.max(.03,.35*(1-d/(30*TS))),actx.currentTime,.1);
      ringingPhone=(d<30&&!blob.locked)?fp:null;
    }else{
      let near=null,bd=27;
      for(const p of phones){if(p.used||p.final)continue;const d=Math.hypot(player.x-(p.tx*TS+8),player.y-(p.ty*TS+10));if(d<bd){bd=d;near=p;}}
      if(near!==ringingPhone){stopRing();ringingPhone=near;if(near)startRing(.25);}
    }
  }
  if(!$("act").hidden)renderAct();
  // 揺れ
  const shakeP=mode==="find"&&!inCall?(ringingPhone||(finalActive?phones.find(p=>p.final&&!p.used):null)):null;
  phones.forEach(p=>{p.mesh.position.x=p.tx*TS+8;});
  if(shakeP){shakeP.mesh.position.x+=Math.floor(now/40)%2?1:-1;waveMesh.visible=Math.floor(now/300)%2===0;waveMesh.position.set(shakeP.tx*TS+8,-(shakeP.ty*TS-4),2);}
  else waveMesh.visible=false;
  // プレイヤー
  kidMat.map=kidTex[player.dir][player.frame];
  kidMesh.position.set(Math.round(player.x),-Math.round(player.y-6),1+player.y*1e-4);
  if(mode==="hide"||mode==="find"){const r=regionAt(Math.floor(player.x/TS),Math.floor((player.y-3)/TS));if(r!==roomName){roomName=r;$("room").textContent=r;}}
  // カメラ
  const cx=W*TS<=viewW?W*TS/2:Math.min(Math.max(player.x,viewW/2),W*TS-viewW/2);
  const cy=H*TS<=viewH?H*TS/2:Math.min(Math.max(player.y-6,viewH/2),H*TS-viewH/2);
  camera.position.x=Math.round(cx*scale)/scale;camera.position.y=-Math.round(cy*scale)/scale;
  // 花びら
  const L=camera.position.x-viewW/2,Tp=-camera.position.y-viewH/2;
  if(now>nextGust){nextGust=now+5000+Math.random()*8000;const k=6+Math.floor(Math.random()*12);let c=0;
    for(const p of petals){if(c>=k)break;if(p.on)continue;c++;p.on=true;p.x=L-10-Math.random()*80;p.y=Tp+Math.random()*viewH*.75;p.vx=45+Math.random()*35;p.vy=10+Math.random()*16;p.ph=Math.random()*6;}}
  for(const p of petals){
    if(!p.on){p.m.visible=false;continue;}
    p.x+=p.vx*dt;p.y+=(p.vy+Math.sin(t*3+p.ph)*14)*dt;
    if(p.x>L+viewW+20||p.y>Tp+viewH+20){p.on=false;p.m.visible=false;continue;}
    p.m.visible=true;p.m.position.set(Math.round(p.x),-Math.round(p.y),6);
    p.m.scale.set(Math.sin(t*5+p.ph)>0?1:.5,1,1);
  }
  // 右端の光（声に合わせて）
  let target=0;
  if(playAnalyser){const a=new Uint8Array(playAnalyser.fftSize);playAnalyser.getByteTimeDomainData(a);let s=0;for(const v of a){const q=(v-128)/128;s+=q*q;}target=Math.min(1,Math.sqrt(s/a.length)*7);}
  glowV+=(target-glowV)*Math.min(1,dt*(target>glowV?14:4));glowEl.style.opacity=glowV.toFixed(3);
  if(!$("rec").hidden&&micAnalyser){const a=new Uint8Array(micAnalyser.fftSize);micAnalyser.getByteTimeDomainData(a);let s=0;for(const v of a){const q=(v-128)/128;s+=q*q;}$("meterFill").style.width=Math.min(100,Math.sqrt(s/a.length)*400)+"%";}
  if(actx)updateBgm();
  renderer.render(scene,camera);
  requestAnimationFrame(loop);
}
showTitle();
requestAnimationFrame(loop);
