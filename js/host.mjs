const includesAny=(q,words)=>words.some(w=>q.includes(w));
export function answerIslandQuestion(input,data){const q=String(input).trim().toLowerCase().replace(/[？?！!，,。\s]/g,'');const center={id:'center',name:data.center.name};const result=(text,ids=[])=>({text,sources:ids.map(id=>id==='center'?center:{id,name:data.courses.find(c=>c.id===id)?.name}).filter(x=>x.name)});
 if(!q)return result('我是島主焰兒！你可以問我課程內容、網站怎麼用，或該從哪一座島開始。',['center']);
 if(includesAny(q,['答案','正解','選哪個','第幾題','第1題','第2題','第3題','第4題']))return result('我不直接提供測驗答案喔！你可以問我教材概念，或先作答再閱讀每題解析；我們一起把觀念弄懂。',[]);
 const gem=/(?:^|[^a-z])gems?(?:$|[^a-z])/.test(q)||q.includes('專屬助教'),skill=includesAny(q,['skill','技能']),task=includesAny(q,['spark','任務','教材生產']),studio=includesAny(q,['workspace','studio','自動化中樞']);
 const explicit=gem&&skill?'island-04':task&&studio?'island-07':studio?'island-06':task?'island-05':skill?'island-03':gem?'island-02':q.includes('gemini')?'island-01':null;
 if(explicit&&!includesAny(q,['證書','測驗','考試','總複習','已讀','我的進度','本站','這個網站'])){const c=data.courses.find(c=>c.id===explicit);return result(c.name+'：'+c.blocks.map(b=>b.text).join('\n\n')+'\n\n以上依本站教材整理，操作保留原稿，實際服務依帳號與版本為準。',[explicit]);}
 if(includesAny(q,['你是誰','島主','焰兒','介紹自己']))return result('我是焰兒，這座教學群島的島主！我依本站教材與功能說明協助導覽，能帶你找課程、測驗與資源；我不會連到外部 AI，也不直接揭露測驗答案。',['center']);
 if(includesAny(q,['證書','證明','畢業','75']))return result('要領取學習完成紀念證書，七課都標記已讀，而且各課測驗至少 75 分。到中央廣場的「進度與證書」輸入姓名，就能下載 SVG 或列印／另存 PDF；這是學習紀念，不代表官方認證。',['center']);
 if(includesAny(q,['進度','存在哪','存哪裡','保存','儲存','重置','接續','不同電腦','換電腦']))return result('閱讀紀錄與測驗最高分保存在目前瀏覽器。重新整理會保留；換瀏覽器或裝置不會自動同步。中央廣場可查看與清除紀錄。若瀏覽器拒絕儲存，會提示「僅本次有效」，這次操作仍可繼續，但重新整理後不會保留。',['center']);
 if(includesAny(q,['清單','搜尋','找課','分類','段落']))return result('按下下方「文字清單」，就能展開七座課程島，搜尋關鍵字，點選章節直接讀教材。旁邊的課程清單也能依三個海域篩選，不用操作 3D 就能讀完全部課程。',['center']);
 if(includesAny(q,['學習單','markdown','開放題']))return result('本站已移除學習單功能，每課只有教材與隨堂測驗；七課已讀、每課測驗至少 75 分即可領取紀念證書。教材中外部工具製作學習單的範例仍保留。',['center']);
 if(includesAny(q,['測驗','考試','總複習','抽題','分數','及格']))return result('每課有四題隨堂測驗，提交後會顯示缺答、分數與逐題解析，並保留最高分。中央廣場的總複習每次從七課各抽一題，共七題；證書資格仍以各課測驗達 75 分為準。',['center']);
 if(includesAny(q,['白天','夜晚','夜海','黃昏','主題','色調','日夜']))return result('建築採奶油白、薄荷綠、蜜桃粉及淡薰衣草紫的馬卡龍色系。下方有晨光、海霧、夜海三種底色，以及白天／夜晚開關與光線選單。選夜海時會預設夜晚光線，之後還能獨立改成白天或黃昏。你的選擇會保存在這個瀏覽器。',['center']);
 if(includesAny(q,['人物','居民','島民','島嶼','點島','建築','放大','小人','散步','走路','橋','旋轉','縮放','全景','動態','暈']))return result('先點島名或島面聚焦放大，再點主建築讀教材。聚焦後可點14位具名島民的頭頂提示，看各自不同的關鍵概念；每座島也都有沿步道走動的焰兒可提問。島民沿環形步道與橋行走，開啟「減少動態」會暫停，按「回到全景」可重新選島。',['center']);
 if(includesAny(q,['音樂','聲音','播放']))return result('按下「音樂關閉」才會開始播放本站合成的輕音樂，再按一次即可關閉；網站不會自動播放聲音。',['center']);
 if(includesAny(q,['作者','講師','紅焰','黃泓諺','聯絡']))return result('網站作者是紅焰教學，講師為黃泓諺／紅焰。中央廣場有講師學經歷、現任資訊與聯絡連結。',['center']);
 const hasGem=/(?:^|[^a-z])gems?(?:$|[^a-z])/.test(q)||q.includes('助教'),hasSkill=includesAny(q,['skill','技能']),hasTask=includesAny(q,['spark','任務','生產','簡報','文件']),hasStudio=includesAny(q,['studio','workspace','自動化']);
 let preferred=hasGem&&hasSkill?'island-04':hasTask&&hasStudio?'island-07':null;
 if(!preferred&&includesAny(q,['下載','zip','資源包','歸檔']))preferred='island-05';
 if(!preferred&&includesAny(q,['從哪','開始','幾座','有哪些課','怎麼學','推薦','入門']))return result('這裡有七座課程島與中央廣場。建議從靈感發想島出發：Ask Gemini 發想 → Gems 專屬助教 → Skill 技能 → 比較工具 → Spark（任務）教材生產 → Workspace 自動化 → 進階架構比較。你也能依工作需要直接選課。',['island-01','island-04','island-07']);
 if(!preferred)preferred=hasStudio?'island-06':hasTask?'island-05':hasSkill?'island-03':hasGem?'island-02':includesAny(q,['gemini','靈感','提問','分頁','發想'])?'island-01':null;
 if(preferred){const c=data.courses.find(c=>c.id===preferred);return result(`${c.name}介紹的是：${c.blocks.map(b=>b.text).join('\n\n')}${preferred==='island-05'?'\n\n進入教材的「延伸資源」可找到原教材的備課資料生成 Skill ZIP 下載連結。':''}\n\n以上依本站提供教材整理，工具操作保留原稿，實際服務請以使用的帳號與版本為準。`,[preferred]);}
 const tokens=[...new Set(q.match(/[a-z0-9]+|[\u4e00-\u9fff]{2}/g)||[])].filter(t=>!['什麼','怎麼','如何','可以','請問','老師'].includes(t));let candidates=[];for(const c of data.courses)for(const b of c.blocks){const hay=(c.name+b.title+b.text).toLowerCase();const score=tokens.reduce((sum,t)=>sum+(hay.includes(t)?t.length:0),0);if(score>=4)candidates.push({c,b,score});}candidates.sort((a,b)=>b.score-a.score);if(candidates.length){const best=candidates[0];return result(best.b.title+'：'+best.b.text,[best.c.id]);}
 return result('目前本站教材找不到這個問題的可靠答案，我不會亂猜。你可以問「怎麼拿證書」、「Gems 和 Skill 差在哪」、「任務和 Studio 怎麼選」，或用清單搜尋課程。',[]);
}
