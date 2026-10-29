export function setupMusic({button,slider,output,audio,initialVolume=.35,onVolume=()=>{},onError=()=>{}}){
 const clamp=v=>Math.max(0,Math.min(1,Number.isFinite(Number(v))?Number(v):.35));
 function volume(value){const v=clamp(value);audio.volume=v;slider.value=String(Math.round(v*100));output.textContent=slider.value+'%';slider.setAttribute('aria-valuetext',slider.value+'%');return v;}
 volume(initialVolume);
 const sync=()=>{const playing=!audio.paused;button.textContent=playing?'♫ 關閉音樂':'♫ 開啟音樂';button.setAttribute('aria-pressed',String(playing));};
 audio.addEventListener('play',sync);audio.addEventListener('pause',sync);
 audio.addEventListener('error',()=>{audio.pause();sync();onError('音樂載入失敗，請檢查網路後再試一次。');});
 slider.addEventListener('input',()=>onVolume(volume(Number(slider.value)/100)));
 return {async toggle(){if(!audio.paused){audio.pause();sync();return;}button.disabled=true;try{await audio.play();}catch{audio.pause();onError('此瀏覽器暫時無法播放音樂，請再按一次或檢查音訊權限。');}finally{button.disabled=false;sync();}}};
}
