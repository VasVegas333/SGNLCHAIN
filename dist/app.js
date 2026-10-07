const filters=[...document.querySelectorAll('[data-filter]')];
function filterReleases(artist){let count=0;document.querySelectorAll('.release').forEach(card=>{card.hidden=artist!=='all'&&!card.dataset.artists.split(' ').includes(artist);if(!card.hidden){card.style.setProperty('--cascade-step',count%3);card.style.setProperty('--mobile-step',count%2);count++}});filters.forEach(b=>{const active=b.dataset.filter===artist;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('.planet').forEach(planet=>{planet.hidden=artist!=='all'&&!planet.dataset.artists.split(' ').includes(artist)});document.querySelector('#results').textContent=`${count} releases shown`;}
filters.forEach(b=>b.addEventListener('click',()=>filterReleases(b.dataset.filter)));
document.querySelectorAll('[data-artist-link]').forEach(b=>b.addEventListener('click',()=>{filterReleases(b.dataset.artistLink);document.querySelector('#releases').scrollIntoView();filters.find(f=>f.dataset.filter===b.dataset.artistLink).focus({preventScroll:true})}));
const canvas=document.querySelector('#signal'),ctx=canvas.getContext('2d'),slider=document.querySelector('#tune'),motion=document.querySelector('#motion'),reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduce.matches,t=0,visible=true,raf=0;
function syncButton(){document.querySelector('.hero').classList.toggle('signal-paused',paused);motion.textContent=paused?'Resume motion ▶':'Pause motion II';motion.setAttribute('aria-pressed',String(paused))}syncButton();
function draw(){const w=canvas.clientWidth,h=canvas.clientHeight,d=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*d)||canvas.height!==Math.round(h*d)){canvas.width=Math.round(w*d);canvas.height=Math.round(h*d)}ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);ctx.lineWidth=.7;ctx.strokeStyle='rgba(255,255,255,.08)';for(let x=0;x<w;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let line=0;line<29;line++){ctx.beginPath();for(let x=0;x<=w;x+=3){const p=x/w,env=Math.pow(Math.sin(p*Math.PI),1.7),wave=Math.sin(p*Number(slider.value)/7+t+line*.1),y=h*.5+wave*env*h*(.22+line*.006)*(1+(window.sgnlAudioPower||0)*.55)+Math.cos(p*12-t+line*.2)*h*.02; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.strokeStyle=`rgba(255,255,255,${.13+line*.017})`;ctx.stroke()}}
function frame(){raf=0;draw();if(!paused&&visible&&!document.hidden){t+=.018+(window.sgnlAudioPower||0)*.025;raf=requestAnimationFrame(frame)}}function start(){if(!raf)frame()}
slider.addEventListener('input',()=>{document.querySelector('#freq').textContent=Number(slider.value).toFixed(1)+' Hz';draw()});motion.addEventListener('click',()=>{paused=!paused;syncButton();start()});reduce.addEventListener('change',e=>{paused=e.matches;syncButton();start()});new ResizeObserver(draw).observe(canvas);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start()}).observe(canvas);document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});start();
document.querySelectorAll('.art img').forEach(img=>{const fallback=()=>{img.parentElement.classList.add('failed');img.parentElement.dataset.title=img.closest('.release').querySelector('h3').textContent;};img.addEventListener('error',fallback);if(img.complete&&!img.naturalWidth)fallback()});

const releaseCards=[...document.querySelectorAll('.release')];
if(!reduce.matches&&'IntersectionObserver' in window){
 const releaseObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');releaseObserver.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
 releaseCards.forEach(card=>{card.classList.add('reveal-ready');releaseObserver.observe(card)});
 reduce.addEventListener('change',event=>{if(event.matches){releaseCards.forEach(card=>card.classList.add('is-visible'));releaseObserver.disconnect()}});
}

const heroVisual=document.querySelector('.hero');
heroVisual.addEventListener('pointermove',event=>{if(reduce.matches||paused||event.pointerType==='touch')return;const rect=heroVisual.getBoundingClientRect();heroVisual.style.setProperty('--logo-tilt-x',((event.clientX-rect.left)/rect.width-.5)*14+'deg');heroVisual.style.setProperty('--logo-tilt-y',-((event.clientY-rect.top)/rect.height-.5)*10+'deg')});
heroVisual.addEventListener('pointerleave',()=>{heroVisual.style.setProperty('--logo-tilt-x','0deg');heroVisual.style.setProperty('--logo-tilt-y','0deg')});

const previewTracks=[{"id":30861901,"release_id":7545610,"title":"Saturnalia","artists":["BLNCA"],"sample":"https://geo-samples.beatport.com/track/a9f0b47b-ed83-4020-a84e-e084d206b712.LOFI.mp3","bpm":140},{"id":30507316,"release_id":7432004,"title":"Desire","artists":["ATARAS"],"sample":"https://geo-samples.beatport.com/track/aacd1f70-257e-4143-ace1-9e3074f5ea92.LOFI.mp3","bpm":140},{"id":30261173,"release_id":7359422,"title":"Drum Frum","artists":["ATARAS","BLNCA"],"sample":"https://geo-samples.beatport.com/track/49943c69-ba97-4284-bdc6-75b5372e18b7.LOFI.mp3","bpm":140},{"id":30082488,"release_id":7306367,"title":"Intercell Dreams","artists":["BLNCA"],"sample":"https://geo-samples.beatport.com/track/5c83394d-07e4-4564-abb5-2e7d7297fcfe.LOFI.mp3","bpm":144},{"id":29475464,"release_id":7123631,"title":"Rave Revolution","artists":["ATARAS","BLNCA"],"sample":"https://geo-samples.beatport.com/track/bbd67dca-436e-4fc8-970e-09e0ad13c09a.LOFI.mp3","bpm":143},{"id":29274224,"release_id":7046349,"title":"the preacher","artists":["BLNCA"],"sample":"https://geo-samples.beatport.com/track/cc112ad2-78b5-445c-9ad8-ea1735fce73c.LOFI.mp3","bpm":142},{"id":29023946,"release_id":6963124,"title":"TR Techno","artists":["ATARAS"],"sample":"https://geo-samples.beatport.com/track/f65925e5-1ed4-4cf3-8502-e5dbddc306dc.LOFI.mp3","bpm":140},{"id":28814926,"release_id":6897765,"title":"Phase 2","artists":["ATARAS","BLNCA"],"sample":"https://geo-samples.beatport.com/track/33fd1f18-bccc-4564-9cd8-ecdd5066f474.LOFI.mp3","bpm":140},{"id":28617707,"release_id":6841210,"title":"A Journey","artists":["BLNCA"],"sample":"https://geo-samples.beatport.com/track/5f2b23af-b3ad-41da-a1ef-7d200ba65f1a.LOFI.mp3","bpm":140},{"id":28597594,"release_id":6835787,"title":"Riverside","artists":["ATARAS","BLNCA"],"sample":"https://geo-samples.beatport.com/track/f97d3e41-d0f8-4bdd-8079-d9e951a0290e.LOFI.mp3","bpm":142},{"id":28342187,"release_id":6761247,"title":"XTC","artists":["ATARAS"],"sample":"https://geo-samples.beatport.com/track/0c72bf1c-f019-4001-aead-815a65254239.LOFI.mp3","bpm":140},{"id":27978821,"release_id":6650925,"title":"Thrill Her","artists":["BLNCA"],"sample":"https://geo-samples.beatport.com/track/5dacb596-338c-4d58-8657-6494b53952ce.LOFI.mp3","bpm":140},{"id":26930196,"release_id":6433651,"title":"Quake Machine","artists":["ATARAS","BLNCA"],"sample":"https://geo-samples.beatport.com/track/121ef3ee-bb39-4794-948a-4c86f12e4156.LOFI.mp3","bpm":140},{"id":24294492,"release_id":5953362,"title":"Lawnmower Man","artists":["ATARAS"],"sample":"https://geo-samples.beatport.com/track/f3089acc-1dfa-4cb7-afa6-803519f2f6c9.LOFI.mp3","bpm":140},{"id":24294269,"release_id":5953242,"title":"Cosmic Rush","artists":["BLNCA"],"sample":"https://geo-samples.beatport.com/track/fca2ed1d-6973-4f5c-8fc8-33fa1df7dea7.LOFI.mp3","bpm":138},{"id":24233624,"release_id":5933810,"title":"Signal 1","artists":["ATARAS","BLNCA"],"sample":"https://geo-samples.beatport.com/track/08879a96-8b2a-4142-87ce-95c174602630.LOFI.mp3","bpm":70},{"id":24233623,"release_id":5933810,"title":"20,000 Members","artists":["ATARAS","BLNCA"],"sample":"https://geo-samples.beatport.com/track/13514b57-6a55-407c-abb8-337d70b28dd2.LOFI.mp3","bpm":140}];
const galaxyReleases=[{"id":7545610,"title":"Saturnalia","artists":["BLNCA"],"catalog":"SC16","date":"2026-10-16","preorder":true,"image":"https://geo-media.beatport.com/image_size/600x600/dfc5d253-068a-421d-b7cb-0f106e3f731d.jpg","url":"https://www.beatport.com/release/saturnalia/7545610","tracks":1},{"id":7432004,"title":"Desire","artists":["ATARAS"],"catalog":"SC15","date":"2026-10-02","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/cf7123c3-d22e-4fae-8396-588224453f6d.jpg","url":"https://www.beatport.com/release/desire/7432004","tracks":1},{"id":7359422,"title":"Drum Frum","artists":["ATARAS","BLNCA"],"catalog":"SC14","date":"2026-09-11","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/85a2bd60-3d63-4ed6-849d-0eb4f80eaefd.jpg","url":"https://www.beatport.com/release/drum-frum/7359422","tracks":1},{"id":7306367,"title":"Intercell Dreams","artists":["BLNCA"],"catalog":"SC13","date":"2026-08-21","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/b0f0cc76-a5e9-44d1-8ae4-0e16614be34e.jpg","url":"https://www.beatport.com/release/intercell-dreams/7306367","tracks":1},{"id":7123631,"title":"Rave Revolution","artists":["ATARAS","BLNCA"],"catalog":"SC12","date":"2026-07-10","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/96de59c2-dd9f-4f17-8ee9-c789f4c25a62.jpg","url":"https://www.beatport.com/release/rave-revolution/7123631","tracks":1},{"id":7046349,"title":"the preacher","artists":["BLNCA"],"catalog":"SC11","date":"2026-06-26","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/0c6c7fc1-54f0-4864-902b-917327776cba.jpg","url":"https://www.beatport.com/release/the-preacher/7046349","tracks":1},{"id":6963124,"title":"TR Techno","artists":["ATARAS"],"catalog":"SC10","date":"2026-06-05","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/9835c5e1-dcb8-4655-b60e-8b4977ff3a8e.jpg","url":"https://www.beatport.com/release/tr-techno/6963124","tracks":1},{"id":6897765,"title":"Phase 2","artists":["ATARAS","BLNCA"],"catalog":"SC9","date":"2026-05-29","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/7ee33dea-3102-4aea-8011-cb707182597e.jpg","url":"https://www.beatport.com/release/phase-2/6897765","tracks":1},{"id":6841210,"title":"A Journey","artists":["BLNCA"],"catalog":"SC8","date":"2026-05-22","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/b67bcbdf-38ad-4ce4-9fa4-4bf650cfe3a5.jpg","url":"https://www.beatport.com/release/a-journey/6841210","tracks":1},{"id":6835787,"title":"Riverside","artists":["ATARAS","BLNCA"],"catalog":"SC7","date":"2026-05-15","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/fcdf43a9-7107-43fd-b947-4a19522171f2.jpg","url":"https://www.beatport.com/release/riverside/6835787","tracks":1},{"id":6761247,"title":"XTC","artists":["ATARAS"],"catalog":"SC6","date":"2026-05-08","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/78dacefb-ace0-454c-b32a-ee1db3724865.jpg","url":"https://www.beatport.com/release/xtc/6761247","tracks":1},{"id":6650925,"title":"Thrill Her","artists":["BLNCA"],"catalog":"SC5","date":"2026-05-01","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/325e7f32-784b-416c-bd4b-9fffeeed5ab9.jpg","url":"https://www.beatport.com/release/thrill-her/6650925","tracks":1},{"id":6433651,"title":"Quake Machine","artists":["ATARAS","BLNCA"],"catalog":"SC4","date":"2026-04-24","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/1b5a2558-de96-4ce3-a6e9-96fab4887cc5.jpg","url":"https://www.beatport.com/release/quake-machine/6433651","tracks":1},{"id":5953362,"title":"Lawnmower Man","artists":["ATARAS"],"catalog":"SC3","date":"2026-04-17","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/b96fa00a-54a9-4f76-a4ef-5cd484146a42.jpg","url":"https://www.beatport.com/release/lawnmower-man/5953362","tracks":1},{"id":5953242,"title":"Cosmic Rush","artists":["BLNCA"],"catalog":"SC2","date":"2026-04-03","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/664a0fbb-d51e-4986-b24b-8fab639e566c.jpg","url":"https://www.beatport.com/release/cosmic-rush/5953242","tracks":1},{"id":5933810,"title":"20,000 Members / Signal 1","artists":["ATARAS","BLNCA"],"catalog":"SC1","date":"2026-03-20","preorder":false,"image":"https://geo-media.beatport.com/image_size/600x600/0c3345d8-5c38-400e-a86f-0c9b4eff156e.jpg","url":"https://www.beatport.com/release/20000-members-signal-1/5933810","tracks":2}];

const assetBase=new URL('assets/',document.currentScript.src);
const audio=document.querySelector('#preview-audio'),player=document.querySelector('.music-player'),playToggle=document.querySelector('#player-toggle'),seek=document.querySelector('#player-progress'),playerStatus=document.querySelector('#player-status');
let activeTrack=-1,playRequest=0,audioContext=null,analyser=null,spectrum=null,audioRAF=0;
const formatTime=seconds=>Number.isFinite(seconds)?Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0'):'0:00';
function announcePlayer(message){playerStatus.textContent=message;}
function setEnergy(value){window.sgnlAudioPower=value;document.documentElement.style.setProperty('--audio-power',value.toFixed(3));}
setEnergy(0);
function audioMeter(){audioRAF=0;if(audio.paused||document.hidden){setEnergy(0);return;}if(analyser){analyser.getByteFrequencyData(spectrum);let total=0;for(let i=1;i<48;i++)total+=spectrum[i];setEnergy(Math.min(1,total/47/210));}audioRAF=requestAnimationFrame(audioMeter);}
async function prepareAudio(){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;if(!audioContext){audioContext=new AC();const source=audioContext.createMediaElementSource(audio);analyser=audioContext.createAnalyser();analyser.fftSize=512;analyser.smoothingTimeConstant=.8;spectrum=new Uint8Array(analyser.frequencyBinCount);source.connect(analyser);analyser.connect(audioContext.destination);}if(audioContext.state==='suspended')await audioContext.resume();}catch(error){/* Playback remains available when Web Audio is unsupported. */}}
function updatePlaybackUI(){
 const playing=!audio.paused&&!audio.ended,current=previewTracks[activeTrack];
 playToggle.textContent=playing?'Ⅱ':'▶';playToggle.setAttribute('aria-label',playing?'Pause preview':'Play preview');
 document.querySelector('.hero').classList.toggle('audio-active',playing);
 document.querySelectorAll('[data-track]').forEach(button=>{const own=!!current&&Number(button.dataset.track)===current.id,isPlaying=own&&playing;button.classList.toggle('is-playing',isPlaying);button.setAttribute('aria-pressed',String(isPlaying));const icon=button.querySelector('.planet-play');if(icon)icon.textContent=isPlaying?'Ⅱ':'▶';});
 if(playing&&!audioRAF)audioMeter();if(!playing){cancelAnimationFrame(audioRAF);audioRAF=0;setEnergy(0);}
}
async function selectTrack(index){
 if(index<0||index>=previewTracks.length)return;
 const request=++playRequest,track=previewTracks[index],release=galaxyReleases.find(r=>r.id===track.release_id);
 player.hidden=false;document.body.classList.add('has-player');
 if(activeTrack===index&&!audio.paused){audio.pause();return;}
 if(activeTrack!==index){audio.pause();activeTrack=index;audio.src=track.sample;seek.value=0;seek.disabled=true;document.querySelector('#player-time').textContent='0:00 / 0:00';}
 document.querySelector('#player-title').textContent=track.title;
 document.querySelector('#player-artist').textContent=track.artists.join(' + ')+' · '+track.bpm+' BPM';
 document.querySelector('#player-art').src=new URL('releases/'+track.release_id+'.jpg',assetBase).href;
 document.querySelector('#player-buy').href=release.url;
 announcePlayer('Loading Beatport preview…');
 await prepareAudio();if(request!==playRequest)return;
 try{if(audio.ended)audio.currentTime=0;await audio.play();if(request===playRequest)announcePlayer('Beatport preview · audio-reactive visuals');}
 catch(error){if(request!==playRequest||error.name==='AbortError')return;announcePlayer('Preview unavailable. Open Beatport to listen.');updatePlaybackUI();}
}
document.querySelectorAll('[data-track]').forEach(button=>button.addEventListener('click',()=>{if(window.galaxyJustDragged)return;selectTrack(previewTracks.findIndex(track=>track.id===Number(button.dataset.track)))}));
playToggle.addEventListener('click',()=>{if(activeTrack>=0)selectTrack(activeTrack)});
document.querySelector('#player-prev').addEventListener('click',()=>selectTrack((activeTrack-1+previewTracks.length)%previewTracks.length));
document.querySelector('#player-next').addEventListener('click',()=>selectTrack((activeTrack+1)%previewTracks.length));
document.querySelector('#player-close').addEventListener('click',()=>{playRequest++;audio.pause();player.hidden=true;document.body.classList.remove('has-player')});
document.querySelector('#player-mute').addEventListener('click',event=>{audio.muted=!audio.muted;event.currentTarget.textContent=audio.muted?'Unmute':'Mute';event.currentTarget.setAttribute('aria-pressed',String(audio.muted));event.currentTarget.setAttribute('aria-label',audio.muted?'Unmute preview':'Mute preview')});
audio.addEventListener('play',updatePlaybackUI);audio.addEventListener('pause',updatePlaybackUI);
audio.addEventListener('ended',()=>{announcePlayer('Preview ended · play again or choose the next signal');updatePlaybackUI()});
audio.addEventListener('error',()=>{announcePlayer('Preview unavailable. Open Beatport to listen.');updatePlaybackUI()});
audio.addEventListener('loadedmetadata',()=>{seek.disabled=!Number.isFinite(audio.duration)});
audio.addEventListener('timeupdate',()=>{seek.value=Number.isFinite(audio.duration)?audio.currentTime/audio.duration*100:0;document.querySelector('#player-time').textContent=formatTime(audio.currentTime)+' / '+formatTime(audio.duration)});
seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number(seek.value)/100*audio.duration});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!audio.paused&&!audioRAF)audioMeter()});


const galaxyShell=document.querySelector('.galaxy-shell'),viewport=document.querySelector('.galaxy-viewport'),world=document.querySelector('.galaxy-world'),grid=document.querySelector('.release-grid');
const starCanvas=document.querySelector('#galaxy-stars'),starCtx=starCanvas.getContext('2d'),core=document.querySelector('.galaxy-core');
let zoom=1,yaw=.42,pitch=.58,drag=null,galaxyVisible=false,galaxyPaused=reduce.matches,starRAF=0,starTime=0,lastFrame=0,hoveredPlanet=false,focusedPlanet=false;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
let seed=51;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
const sizePalette=[1.48,.78,1.16,.68,1.32,.86,1.06,1.4,.74,1.18,.82,1.34,.66,1.04,.92,1.24];
const planets=[...world.querySelectorAll('.planet')].map((el,i)=>{
 const ring=i<4?0:i<10?1:2,n=ring===0?4:6,j=ring===0?i:ring===1?i-4:i-10,angle=j/n*Math.PI*2+[.2,.55,.1][ring],radius=[185,300,430][ring];
 return {el,x:Math.cos(angle)*radius,y:Math.sin(angle*2.1+i)*65,z:Math.sin(angle)*radius,size:sizePalette[i],angle,radius};
});
const stars=Array.from({length:350},()=>({x:(random()-.5)*2800,y:(random()-.5)*1700,z:(random()-.5)*2200,size:random()*1.7+.35,phase:random()*6.28}));
const dust=Array.from({length:850},(_,i)=>{const r=70+Math.pow(random(),.7)*590,a=r*.0105+(i%3)*Math.PI*2/3+(random()-.5)*.6;return{x:Math.cos(a)*r,y:(random()-.5)*(22+r*.07),z:Math.sin(a)*r,alpha:random()*.18+.035,size:random()*1.3+.3}});
function project3D(point,w,h,rotation=yaw){
 const cy=Math.cos(rotation),sy=Math.sin(rotation),cp=Math.cos(pitch),sp=Math.sin(pitch);
 const x=point.x*cy-point.z*sy,z1=point.x*sy+point.z*cy,y=point.y*cp-z1*sp,z=point.y*sp+z1*cp;
 const focal=950,denominator=focal+z,perspective=focal/Math.max(180,denominator);
 const fit=Math.min(Math.max(180,w-110)/1050,(h-140)/780)*zoom;
 return{x:w/2+x*perspective*fit,y:h/2+y*perspective*fit,z,perspective,fit,visible:denominator>200};
}
function renderDepth(){
 const w=viewport.clientWidth,h=viewport.clientHeight;if(!w||!h)return;
 planets.forEach(planet=>{
  const p=project3D(planet,w,h),depth=clamp((p.z+430)/860,0,1);
  const scale=clamp(p.perspective*p.fit*planet.size,.38,1.9);
  planet.el.style.left=p.x.toFixed(2)+'px';planet.el.style.top=p.y.toFixed(2)+'px';
  planet.el.style.transform='scale('+scale.toFixed(3)+')';
  planet.el.style.zIndex=String(Math.round(1000-p.z));
  planet.el.style.setProperty('--depth-blur',(Math.max(0,depth-.4)*4.6).toFixed(2)+'px');
  planet.el.style.setProperty('--depth-opacity',(1-depth*.48).toFixed(3));
  planet.el.style.setProperty('--planet-light',(24+(p.x/w)*25).toFixed(1)+'%');
 });
 core.style.zIndex='1000';core.style.transform='translate(-50%,-50%) scale('+clamp(Math.min(w/1000,h/780)*zoom,.6,1.3)+')';
 document.querySelector('#galaxy-zoom-label').textContent=Math.round(zoom*100)+'%';
}
function resetGalaxy(){zoom=1;yaw=.42;pitch=.58;renderScene();}
function changeZoom(delta){zoom=clamp(zoom+delta,.65,2.1);renderScene();}
document.querySelector('#galaxy-in').addEventListener('click',()=>changeZoom(.15));
document.querySelector('#galaxy-out').addEventListener('click',()=>changeZoom(-.15));
document.querySelector('#galaxy-reset').addEventListener('click',resetGalaxy);
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>setCatalogueView(button.dataset.view)));
function setCatalogueView(view){galaxyShell.hidden=false;grid.hidden=false;if(view==='galaxy')resetGalaxy();}
viewport.addEventListener('pointerdown',event=>{if(event.button!==0)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY,yaw,pitch,moved:false};});
viewport.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.hypot(dx,dy)>6){drag.moved=true;viewport.setPointerCapture(event.pointerId);viewport.classList.add('dragging');window.galaxyJustDragged=true;}if(drag.moved){yaw=drag.yaw+dx*.005;pitch=clamp(drag.pitch+dy*.004,-1.15,1.15);renderScene();}});
function finishDrag(event){if(!drag||drag.id!==event.pointerId)return;drag=null;viewport.classList.remove('dragging');setTimeout(()=>{window.galaxyJustDragged=false},100);}
viewport.addEventListener('pointerup',finishDrag);viewport.addEventListener('pointercancel',finishDrag);viewport.addEventListener('lostpointercapture',finishDrag);
viewport.addEventListener('keydown',event=>{if(event.target!==viewport)return;let handled=true;if(event.key==='ArrowLeft')yaw-=.16;else if(event.key==='ArrowRight')yaw+=.16;else if(event.key==='ArrowUp')pitch=clamp(pitch-.12,-1.15,1.15);else if(event.key==='ArrowDown')pitch=clamp(pitch+.12,-1.15,1.15);else if(event.key==='+'||event.key==='=')changeZoom(.15);else if(event.key==='-')changeZoom(-.15);else if(event.key==='Home')resetGalaxy();else handled=false;if(handled){event.preventDefault();renderScene()}});
planets.forEach(({el})=>{el.addEventListener('pointerenter',()=>{hoveredPlanet=true});el.addEventListener('pointerleave',()=>{hoveredPlanet=false});});
world.addEventListener('focusin',event=>{const el=event.target.closest('.planet');if(!el||!el.matches(':focus-visible'))return;focusedPlanet=true;const p=planets.find(p=>p.el===el);yaw=-Math.PI/2-p.angle;zoom=1;renderScene();});
world.addEventListener('focusout',()=>{focusedPlanet=false});
function drawStars(){
 const w=viewport.clientWidth,h=viewport.clientHeight;if(!w||!h)return;
 const d=Math.min(devicePixelRatio||1,2);if(starCanvas.width!==Math.round(w*d)||starCanvas.height!==Math.round(h*d)){starCanvas.width=Math.round(w*d);starCanvas.height=Math.round(h*d);}
 starCtx.setTransform(d,0,0,d,0,0);starCtx.clearRect(0,0,w,h);
 const energy=reduce.matches?0:window.sgnlAudioPower||0;
 const glow=starCtx.createRadialGradient(w*.5,h*.5,0,w*.5,h*.5,Math.max(w,h)*.5);glow.addColorStop(0,'rgba(163,179,201,'+(.17+energy*.1)+')');glow.addColorStop(.3,'rgba(88,101,122,.075)');glow.addColorStop(1,'rgba(0,0,0,0)');starCtx.fillStyle=glow;starCtx.fillRect(0,0,w,h);
 stars.forEach(s=>{
  const p=project3D(s,w,h,yaw*.32);if(!p.visible||p.x<-30||p.x>w+30||p.y<-30||p.y>h+30)return;
  const size=clamp(s.size*p.perspective*.8,.25,7),alpha=clamp(.45+Math.sin(starTime*.3+s.phase)*.12-p.z/3500,.08,.8);
  if(size>2.5){const bokeh=starCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,size*3);bokeh.addColorStop(0,'rgba(221,230,243,'+alpha*.5+')');bokeh.addColorStop(1,'rgba(221,230,243,0)');starCtx.fillStyle=bokeh;starCtx.beginPath();starCtx.arc(p.x,p.y,size*3,0,Math.PI*2);starCtx.fill();}
  else{starCtx.fillStyle='rgba(222,231,246,'+alpha+')';starCtx.beginPath();starCtx.arc(p.x,p.y,size,0,Math.PI*2);starCtx.fill();}
 });
 dust.forEach(s=>{const p=project3D(s,w,h);if(!p.visible)return;starCtx.fillStyle='rgba(194,210,234,'+(s.alpha*(1+energy*.6))+')';const size=clamp(s.size*p.perspective,.3,3);starCtx.fillRect(p.x,p.y,size,size);});
 [185,300,430].forEach(radius=>{
  for(let j=0;j<90;j++){const a=j/90*Math.PI*2,b=(j+1)/90*Math.PI*2,p=project3D({x:Math.cos(a)*radius,y:0,z:Math.sin(a)*radius},w,h),q=project3D({x:Math.cos(b)*radius,y:0,z:Math.sin(b)*radius},w,h);starCtx.strokeStyle='rgba(207,221,243,'+(p.z<0?.17:.06)+')';starCtx.lineWidth=p.z<0?.9:.55;starCtx.beginPath();starCtx.moveTo(p.x,p.y);starCtx.lineTo(q.x,q.y);starCtx.stroke();}
 });
}
function renderScene(){renderDepth();drawStars();}
function starFrame(now=performance.now()){starRAF=0;const dt=lastFrame?Math.min((now-lastFrame)/1000,.05):0;lastFrame=now;if(!galaxyPaused&&!reduce.matches){starTime+=dt;if(!drag&&!hoveredPlanet&&!focusedPlanet)yaw+=dt*.045;}renderScene();if(galaxyVisible&&!galaxyPaused&&!document.hidden)starRAF=requestAnimationFrame(starFrame);}
function startStars(){if(!starRAF){lastFrame=0;starFrame()}}
function syncGalaxyMotion(){const b=document.querySelector('#galaxy-motion');b.textContent=galaxyPaused?'Resume motion':'Pause motion';b.setAttribute('aria-pressed',String(galaxyPaused))}
document.querySelector('#galaxy-motion').addEventListener('click',()=>{galaxyPaused=!galaxyPaused;syncGalaxyMotion();startStars()});
reduce.addEventListener('change',e=>{galaxyPaused=e.matches;syncGalaxyMotion();startStars()});
new IntersectionObserver(entries=>{galaxyVisible=entries[0].isIntersecting;if(galaxyVisible)startStars()}).observe(viewport);
new ResizeObserver(()=>{if(!galaxyShell.hidden)renderScene()}).observe(viewport);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&galaxyVisible)startStars()});
syncGalaxyMotion();setCatalogueView('galaxy');
