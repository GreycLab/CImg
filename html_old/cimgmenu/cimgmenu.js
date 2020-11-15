
/*!
 * JavaScript code for drop-down menu (created: May 15, 2015)
 * Copyright (c) 2003-2015 Drop Down Menu Generator. All rights reserved.
 * http://www.dropdownmenugenerator.com
 * http://www.apnsoft.com
 */
var cmn=new cmnc();function cmnc(){this.ComponentName='APNSoft WebControls JS source file.';this.Version='Version 4.0 (81)';this.Copyright='Copyright (C) APNSoft. All rights reserved.';this.uid=null;this.mX=0;this.mY=0;this.InsVrb=null;this.RqsBg=null;this.RqsDrt=null;this.HrfEnb=true;this.TmrFdOn=null;this.FdOnId='';this.ErrHr=function(ex,args){try{var wen=cmn.Gisv('wen');if(wen!='true')return;var msg='Error! APNSoft Control was unable to perform an operation.';if(ex.lineNumber){msg+='\r\nLine Number: '+ex.lineNumber;}var cp=args[0];if(cp){msg+='\r\nObject: '+cp;}if(ex.description){msg+='\r\nDescription: '+ex.description;}if(args.callee){var prcs=new String(args.callee);var re;re=new RegExp('(/\\*)([^/]|([^\\*]/))*\\*/','gi');prcs=prcs.replace(re,'');re=new RegExp('\/\/.*\r\n','gi');prcs=prcs.replace(re,'\r\n');re=new RegExp('\t','gi');prcs=prcs.replace(re,'');re=new RegExp('^\s{2,}','gi');prcs=prcs.replace(re,'');re=new RegExp('\r[\\s]*\n','gi');prcs=prcs.replace(re,'\r\n');re=new RegExp('\n','gi');prcs=prcs.replace(re,'');re=new RegExp('\r','gi');prcs=prcs.replace(re,'');prcs=prcs.substring(0,500)+'...';msg+='\r\n\r\nException Details:\r\n'+prcs;}msg+='\r\n\r\nPlease contact support at http:\/\/www.apnsoft.com/';alert(msg);}catch(ex){}return true;};//Adds Event to the page
this.AddEvt=function(el,evt,fn,bubble){if("addEventListener" in el){
try{
el.addEventListener(evt,fn,bubble);
}catch(e){
if(typeof fn === "object"&&fn.handleEvent){
el.addEventListener(evt,function(e){
fn.handleEvent.call(fn,e);
},bubble);
}else{
throw e;
}
}
}else if("attachEvent" in el){
if(typeof fn === "object"&&fn.handleEvent){
el.attachEvent("on"+evt,function(){
fn.handleEvent.call(fn);
});
}else{
el.attachEvent("on"+evt,fn);
}
}};this.GtnIds=function(UID){var res=cmn.Gisv('nidsXML',UID);if(res==null||res==undefined){var nids=cmn.Gisv('nids',UID);if(typeof(nids)=='string'&&nids==''){nids=null};if(nids!=''&&nids!=null&&nids!=undefined){res=cmn.StrToXml(nids);cmn.Sisv('nidsXML',res,UID);}}if(res==undefined)res=null;return res;};this.sDv=function(w){if(w==null||w==undefined)return;w.style.display='block';w.style.visibility='visible';};this.hDv=function(w,fnc){if(w==null||w==undefined)return;w.style.display='';w.style.visibility='hidden';if(fnc!=null&&fnc!=undefined)fnc();};this.sDvOpc=function(w,sp,opTo){if(w==null||w==undefined)return;var wid=w.id;var opFr=0;var opcStp=20;if(cmn.oVs(w)==false){if(cmn.dBv('ie55p')){cmn.sDv(w);cmn.StOpc(wid,0);}else{cmn.StOpc(wid,0);cmn.sDv(w);}}else{var opct=w.opct;if(opct!=null&&opct!=undefined){if(opct<opTo)opFr=opct;if(opct>=opTo)return;}}w.opTo=opTo;var procID=cmn.rnd();w.procID=procID;if(cmn.TmrFdOn!=null){if(cmn.FdOnId!=''&&cmn.FdOnId!=wid){cmn.StOpc(cmn.FdOnId,100);}clearInterval(cmn.TmrFdOn);cmn.TmrFdOn=null;cmn.FdOnId='';}var i=opFr;cmn.TmrFdOn=setInterval(function(){i=i+opcStp;if(i>opTo){clearInterval(cmn.TmrFdOn);cmn.TmrFdOn=null;cmn.FdOnId='';}cmn.SetOpAut(wid,procID,opcStp);cmn.FdOnId=wid;},30);};this.hDvOpc=function(w,sp,opFr,mvAw,fnc){if(w==null||w==undefined)return;if(cmn.oVs(w)==false){return;}var wid=w.id;var opcStp=40;var opct=w.opct;if(opct!=null&&opct!=undefined){opFr=opct;}w.opTo=0;var procID=cmn.rnd();w.procID=procID;if(cmn.TmrFdOn!=null){if(cmn.FdOnId!=''&&cmn.FdOnId!=wid){cmn.StOpc(cmn.FdOnId,0);} }var i=0;var TmrFdOff=setInterval(function(){i=i+opcStp;if(i>opFr){clearInterval(TmrFdOff);TmrFdOff=null;}cmn.SetOpAut(wid,procID,opcStp,mvAw,fnc);},10);};this.SetOpAut=function(wid,procID,opcStp,mvAw,fnc){var w=cmn.Mko(wid);if(w==null||w==undefined)return;if((w.procID!=procID)||(w.procID==null)||(w.procID==undefined)){return;}var opct=w.opct;var opTo=w.opTo;if(opct==opTo)return;var opNxt=0;if(opct<opTo){opNxt=opct+opcStp;if(opNxt>100)opNxt=100;}if(opct>opTo){opNxt=opct-opcStp;if(opNxt<0)opNxt=0;}cmn.StOpc(wid,opNxt);if(opNxt==100){w.procID='';}if(opNxt==0){w.procID='';cmn.hDv(w,fnc);cmn.StOpc(wid,1000);if(mvAw==true){w.style.top='0px';w.style.left='0px';}}};this.oVs=function(w){var rs=false;if(!w)return rs;if(w.style.visibility=='visible')rs=true;return rs;};this.rvs=function(nm,uid){var UID=cmn.uid;if(uid!=null&&uid!=undefined){UID=uid;}var hf=cmn.Mko(nm+'_'+UID+'_vs');if(hf==null){return '';}var res=hf.value;if(res==undefined||res==null){res='';}return hf.value;};this.svs=function(nm,vl,uid){var UID=cmn.uid;if(uid!=null&&uid!=undefined){UID=uid;}var hf=cmn.Mko(nm+'_'+UID+'_vs');if(hf==null){return;}hf.value=vl;};this.RmSl=function(){try{if(window.getSelection){var myRange=window.getSelection();myRange.removeAllRanges();}else{document.selection.empty();}}catch(ex){}};this.GtTtl=function(wid){var ttl='';try{ttl=cmn.Mko(wid).innerHTML;}catch(ex){}if(ttl==null||ttl==undefined)ttl='';var re=new RegExp('\'','gi');ttl=ttl.replace(re,'%FB0');var re=new RegExp('\\\\','gi');ttl=ttl.replace(re,'%FD0');return ttl;};this.ItmPrc=function(prc,uid,id,ttl){try{if(prc!=null&&prc!=undefined){var re=null;if(uid!=null&&uid!=undefined){re=new RegExp('[$]ComponentID[$]','gi');prc=prc.replace(re,uid);}if(id!=null&&id!=undefined){re=new RegExp('[$]ItemID[$]','gi');prc=prc.replace(re,id);}if(ttl!=null&&ttl!=undefined){var re=new RegExp('%FB0','gi');ttl=ttl.replace(re,'\\\'');var re=new RegExp('%FD0','gi');ttl=ttl.replace(re,'\\\\');re=new RegExp('[$]Title[$]','gi');prc=prc.replace(re,ttl);}var ApplPth=null;try{ApplPth=cvd3j76gergyjuhw;}catch(e){}if(ApplPth==null||ApplPth==undefined)ApplPth='';re=new RegExp('~','gi');prc=prc.replace(re,ApplPth);prc=eval(TE=prc);if(prc!=null&&prc!=undefined){prc;}}}catch(e){var wen=cmn.Gisv('wen');if(wen=='true'){alert('Error! Check the client-side code: '+prc+'\r\n\r\nDescription: '+e.description+'.');}}};this.AjaxRzErr=function(Tx,cntx){try{var wen=cmn.Gisv('wen',cntx);if(wen=='true'){var msg = "Error! APNSoft Control cannot get data from the server! \r\nException Details: " + Tx;alert(msg);}}catch(ex){cmn.ErrHr(ex,arguments);}};this.WF_CBCa=function(){if(typeof(WebForm_CallbackComplete)=="function"){if(WebForm_CallbackComplete!=cmn.WF_CBC){WebForm_CallbackComplete=cmn.WF_CBC;};}};this.WF_CBC=function(){for(var i=0;i<__pendingCallbacks.length;i++){callbackObject=__pendingCallbacks[i];if(callbackObject&&callbackObject.xmlRequest&&(callbackObject.xmlRequest.readyState==4)){WebForm_ExecuteCallback(callbackObject);if(__pendingCallbacks[i]!=null){if(!__pendingCallbacks[i].async){__synchronousCallBackIndex=-1;};}__pendingCallbacks[i]=null;var cbfid="__CALLBACKFRAME"+i;var xrf=document.getElementById(cbfid);if(xrf){xrf.parentNode.removeChild(xrf);};};};};this.getDomAdapter=function(){var adapter='';if('undefined'!=typeof(ActiveXObject)){adapter='MS';}else if('undefined'!=typeof(document)&& document.implementation&& document.implementation.createDocument&& 'undefined'!=typeof(DOMParser)){adapter='default';}switch (adapter){case 'MS':return new (function(){this.createDocument=function(){var names=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument","MSXML.DOMDocument", "Microsoft.XMLDOM"];for(var key in names){try{return new ActiveXObject(names[key]);}catch(e){}}throw new Error('Unable to create DOMDocument');};this.serialize=function(doc){return doc.xml;};this.parseXml=function(xml){var doc=this.createDocument();if(!doc.loadXML(xml)){throw new Error('Parse error');}return doc;};})();case 'default':return new (function(){this.createDocument=function(){return document.implementation.createDocument("", "", null);};this.serialize=function (doc) {return new XMLSerializer().serializeToString(doc);};this.parseXml=function (xml) {var doc=new DOMParser().parseFromString(xml,"text/xml");if("parsererror"==doc.documentElement.nodeName){throw new Error('Parse error');}return doc;};})();default:throw new Error('Unable to select the DOM adapter');}};this.StrToXml=function(str){var res=cmn.getDomAdapter().parseXml('<t>'+str+'</t>');return res;};this.InnXml=function(xml){var str=(new XMLSerializer()).serializeToString(xml);return str;};this.NdAtr=function(nam,atr,UID){var nIds=cmn.GtnIds(UID);if(nIds==null)return null;var nd=nIds.getElementsByTagName('i'+nam)[0];if(nd==null)return null;var vl=nd.getAttribute(atr);return vl;};this.ShwShd=function(Obj,PngShdCnt,ccp){if(PngShdCnt==null||PngShdCnt=='')return;if(PngShdCnt<2)return; var x=cmn.pX(Obj);var y=cmn.pY(Obj);var zIndex=Obj.style.zIndex;var ShLft=null;if(PngShdCnt==3){ShLft=cmn.CrtDv(Obj.id+'_Sh0');ShLft.style.zIndex=zIndex;}var ShRgt=cmn.CrtDv(Obj.id+'_Sh1');ShRgt.style.zIndex=zIndex;var ShBtm=cmn.CrtDv(Obj.id+'_Sh2');ShBtm.style.zIndex=zIndex;var ShCrn=cmn.CrtDv(Obj.id+'_Sh3');ShCrn.style.zIndex=zIndex;if(ShLft!=null){ShLft.className=ccp+'ShdLft '+ccp+'ShdCmn'; cmn.setTop(ShLft,y);cmn.setLeft(ShLft,x-ShLft.offsetWidth);ShLft.style.height=Obj.offsetHeight+'px';cmn.sDv(ShLft);}ShRgt.className=ccp+'ShdRgt '+ccp+'ShdCmn';cmn.setLeft(ShRgt,x+Obj.offsetWidth);cmn.setTop(ShRgt,y);ShRgt.style.height=Obj.offsetHeight+'px';cmn.sDv(ShRgt);ShCrn.className=ccp+'ShdCrn '+ccp+'ShdCmn';cmn.setLeft(ShCrn,x+Obj.offsetWidth+ShRgt.offsetWidth-ShCrn.offsetWidth);cmn.setTop(ShCrn,y+Obj.offsetHeight);cmn.sDv(ShCrn);ShBtm.className=ccp+'ShdBtm '+ccp+'ShdCmn';cmn.setTop(ShBtm,y+Obj.offsetHeight);if(PngShdCnt==2){cmn.setLeft(ShBtm,x);ShBtm.style.width=Obj.offsetWidth+ShRgt.offsetWidth-ShCrn.offsetWidth+'px';}if(PngShdCnt==3){cmn.setLeft(ShBtm,x-ShLft.offsetWidth);ShBtm.style.width=Obj.offsetWidth+ShLft.offsetWidth+ShRgt.offsetWidth-ShCrn.offsetWidth+'px';}cmn.sDv(ShBtm);};this.HdShd=function(Obj){var ShDv=null;for(var i=0;i<4;i++){ShDv=cmn.Mko(Obj.id+'_Sh'+i);if(ShDv!=null){cmn.setLeft(ShDv,0);cmn.setTop(ShDv,0);cmn.hDv(ShDv);}}};this.GtCssRl=function(cls,rul){var res='';try{for(var i=0;i<document.styleSheets.length;i++){var st=document.styleSheets[i];var rls=st.cssRules;if(rls==null||rls==undefined)rls=st.rules;for(var j=0;j<rls.length;j++){var rl=rls[j];if(rl.selectorText!=null&&rl.selectorText!=undefined){if(rl.selectorText.toLowerCase()==('.'+cls.toLowerCase())){res=eval('rl.style.'+rul);break;}}}}}catch(ex){}return res;};this.cmc=function(e){if(!e)e=window.event;if(e){ if(e.pageX||e.pageY){cmn.mX=e.pageX;cmn.mY=e.pageY;}else if(e.clientX||e.clientY){cmn.mX=e.clientX+document.body.scrollLeft;cmn.mY=e.clientY+document.body.scrollTop;}  };};this.ScrVals=function(){var doc=document.documentElement;var scL=(window.pageXOffset||doc.scrollLeft)-(doc.clientLeft||0);var scT=(window.pageYOffset||doc.scrollTop)-(doc.clientTop||0);return{'scL':scL,'scT':scT};};this.getVP=function(){var w=0; var h=0; if (typeof window.innerWidth!='undefined'){w=window.innerWidth;}else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0){w=document.documentElement.clientWidth;}else{w=document.getElementsByTagName('body')[0].clientWidth;}return [w,h];};this.WinScrV=function(){if(typeof window.innerWidth === 'number') return window.innerWidth>document.documentElement.clientWidth;var rt=document.documentElement||document.body;var of=null;if(typeof rt.currentStyle !== 'undefined') of=rt.currentStyle.overflow;of=of||window.getComputedStyle(rt,'').overflow;var ofY=null;if(typeof rt.currentStyle !== 'undefined') ofY=rt.currentStyle.overflowY;ofY=ofY||window.getComputedStyle(rt, '').overflowY;var cnof=rt.scrollHeight>rt.clientHeight;var ovSh= /^(visible|auto)$/.test(of) || /^(visible|auto)$/.test(ofY);var alShSc=of === 'scroll' || ofY === 'scroll';return (cnof&&ovSh)||(alShSc);};this.pX=function(w){var cl=0;if(w==null)return cl;if(w.parentNode==null)return cl;if(w.offsetParent){while(w){cl+=w.offsetLeft;w=w.offsetParent;}}else{if(w.x){cl+=w.x;}}return cl;};this.pY=function(w){var ct=0;if(w==null)return ct;if(w.parentNode==null)return ct;if(w.offsetParent){while(w){ct+=w.offsetTop;w=w.offsetParent;}}else{if(w.y){ct+=w.y;}}return ct;};this.pX2=function(w){var ct=0;while(w){ct+=(w.offsetLeft-w.scrollLeft+w.clientLeft);w=w.offsetParent;}return ct;};this.pY2=function(w){var ct=0;while(w){ct+=(w.offsetTop-w.scrollTop+w.clientTop);w=w.offsetParent;}return ct;};this.setLeft=function(w,L){if(w==null||w==undefined)return;w.style.left=L+'px';var Req=w.offsetLeft;var Cur=cmn.pX(w);var Del=Req-Cur;w.style.left=(L+Del)+'px';};this.setTop=function(w,T){if(w==null||w==undefined)return;w.style.top=T+'px';var Req=w.offsetTop;var Cur=cmn.pY(w);var Del=Req-Cur;w.style.top=(T+Del)+'px';};this.Sisv=function(key,val,uid){var UID=cmn.uid;if(uid!=null&&uid!=undefined){UID=uid;}if(cmn.InsVrb==null){cmn.InsVrb=new Object();cmn.InsVrb.obj=eval(UID+'L');cmn.InsVrb.name=UID;}else{if(cmn.InsVrb.name!=UID){cmn.InsVrb.obj=eval(UID+'L');cmn.InsVrb.name=UID;}}cmn.InsVrb.obj[key]=val;};this.Gisv=function(key,uid){var UID=cmn.uid;if(uid!=null&&uid!=undefined){UID=uid;}var val='';if(UID==null||UID==undefined)return val;if(UID=='')return val;var Obj=null;cmn.InsVrb=new Object();try{Obj=eval(UID+'L');}catch(e){}if(Obj==null||Obj==undefined)return '';cmn.InsVrb.obj=Obj;cmn.InsVrb.name=UID;val=cmn.InsVrb.obj[key];return val;};this.href=function(u,t){if(this.HrfEnb==false)return;var v;var nh;var re=null;u=cmn.trim(u);t=cmn.trim(t);if(u==''||u==null||u==undefined){return;}if(t==''||t==null||t==undefined){t='_top';}try {var re=new RegExp('&amp;', 'gi');u=u.replace(re, '&');u=u.replace('$Rnd$', cmn.rnd());var ApplPth=null;try{ApplPth=cvd3j76gergyjuhw;}catch(e){}if(ApplPth==null||ApplPth==undefined)ApplPth='';re=new RegExp('~','gi');u=u.replace(re,ApplPth);v=open(u,t);}catch(e){}};this.APB=function(uid,id){try{__doPostBack(uid,id);}catch(ex){cmn.ErrHr(ex,arguments);}};this.CrtDv=function(id){var Dv=cmn.Mko(id);if(Dv==null){Dv=document.createElement('DIV');Dv.name=id; Dv.id=id; Dv.style.position='absolute'; Dv.style.display='block'; Dv.style.left='0px'; Dv.style.top='0px'; Dv.style.visibility='hidden'; Dv.style.whiteSpace='nowrap';document.body.appendChild(Dv);}return Dv;};this.cIFR=function(ifid,uid){var ifr=document.createElement('iframe');ifr.id=ifid;ifr.src=cmn.Gisv('EmpHtm',uid);ifr.border=0;ifr.frameBorder=0;ifr.marginHeight=0;ifr.marginWidth=0;ifr.scrolling='no';ifr.style.position='absolute';ifr.style.display='none';ifr.style.top='0px';ifr.style.left='0px';ifr.style.width='1px';ifr.style.height='1px';ifr.style.backgroundColor='transparent';return ifr;};this.cmb=function(){var r=false;if(!document.compatMode||document.compatMode==undefined){var tmp=null;tmp=document.createElement('div');tmp.style.width='1';if(tmp.style.width==''){r=true;}tmp=null;return r;}if(document.compatMode&&document.compatMode.toLowerCase().indexOf('back')<0){r=true;}return r;};this.Mko=function(n){var Ob;try{Ob=document.getElementById(n);}catch(e){return null;}if(Ob==undefined)return null;return Ob;};this.trim=function(str){var s=new String(str);if(s==''||s==null||s==undefined)return s;s=s.replace(/^\s*/,'').replace(/\s*$/,'');return s;};this.rnd=function(){var RND='';var _rnd=Math.random()*100000000;RND=Math.round(_rnd)+'';return RND;};this.dBv=function(nm){var mj=0;try{mj=parseInt(navigator.appVersion);}catch(ex){}var ua=navigator.userAgent.toLowerCase();var op=(ua.indexOf("opera")!=-1);var op2=(ua.indexOf("opera 2")!=-1||ua.indexOf("opera/2")!=-1);var op3=(ua.indexOf("opera 3")!=-1||ua.indexOf("opera/3")!=-1);var op4=(ua.indexOf("opera 4")!=-1||ua.indexOf("opera/4")!=-1);var op5p=(op&&!op2&&!op3&&!op4);var ie=((ua.indexOf("msie")!=-1)&&(ua.indexOf("opera")==-1));var ie3=(ie&&(mj<4));var ie4=(ie&&(mj==4)&&(ua.indexOf("msie 4")!=-1));var ie5=(ie&&(mj==4)&&(ua.indexOf("msie 5.0")!=-1));var ie55p=(ie&&!ie3&&!ie4&&!ie5);var ie9=(ie&&(mj==5)&&(ua.indexOf("msie 9.0")!=-1));var ie9p=false;if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ var ieversion=new Number(RegExp.$1); if (ieversion>=9&&ie9)ie9p=true;}var saf=((ua.indexOf('safari')!=-1)&&(ua.indexOf('mac')!=-1))?true:false;var SafWin=(!saf&&(ua.indexOf('safari')!=-1)&&(ua.indexOf('windows')!=-1))?true:false;var Chr=(SafWin&&(ua.indexOf("chrome")!=-1));if(Chr==true)SafWin=false;var FF=((ua.indexOf('firefox')!=-1)&&(!ie55p)&&(ua.indexOf('mozilla/5')!=-1)&&(ua.indexOf('spoofer')==-1)&&(ua.indexOf('compatible')==-1)&&(ua.indexOf('opera')==-1)&&(ua.indexOf('webtv')==-1)&&(ua.indexOf('hotjava')==-1));var FF3p=(FF&&(ua.indexOf("firefox/2")==-1));return(eval(nm));};this.GPg=function(){var P=location.href;if(P.indexOf('?')>-1){P=P.substring(0,P.indexOf('?'));}return P;};this.Delay=function(ms){var date=new Date();var curDate=null;do {curDate=new Date();} while(curDate-date<ms);};this.outerHTML=function(elm){try{var res=elm.outerHTML;if((res!=null)&&(res!=undefined)){return res;}var tmp=null;tmp=document.createElement('div');tmp.appendChild(elm.cloneNode(true));res=tmp.innerHTML;tmp=null;return res;}catch(ex){cmn.ErrHr(ex,arguments);}};this.GtSdStr=function(cls){var Shd=0;var shd=cmn.GtCssRl(cls,'filter');if(shd!=undefined&&shd!=null){shd=shd.toLowerCase();var ind=shd.indexOf('strength=')+9;shd=shd.substring(ind,ind+3);Shd=parseInt(shd);if(isNaN(Shd))Shd=0;}return Shd;};this.StOpcObj=function(w,op){if(w==null||w==undefined)return;var ws=w.style;if(ws==null||ws==undefined)return;var fv=op/100;w.opct=op;if((ws.opacity!=null)&&(ws.opacity!=undefined)){w.style.opacity=fv;}if((ws.filter!=null)&&(ws.filter!=undefined)){var filter=cmn.GtCssRl(w.className,'filter');ws.filter=filter;if(op<100){ws.filter+=' alpha(opacity='+op+')';}return;}if((ws.MozOpacity!=null)&&(ws.MozOpacity!=undefined)){ws.MozOpacity=fv;return;}if((ws.opacity!=null)&&(ws.opacity!=undefined)){ws.opacity=fv;return;}if((ws.KhtmlOpacity!=null)&&(ws.KhtmlOpacity!=undefined)){ws.KhtmlOpacity=fv;return;}};this.StOpc=function(wid,op){var w=cmn.Mko(wid);if(w==null||w==undefined)return;cmn.StOpcObj(w,op);};this.GtAjxLd=function(){var res=null;try{res=zcc46jhssgd54ffggesh4;}catch(e){}if(res==null||res==undefined)res='';return res;};this.EncodeValue=function(val){var res=val;var re;re=new RegExp(';','gi');res=res.replace(re,'%FA0');re=new RegExp('\'','gi');res=res.replace(re,'%FB0');re=new RegExp('\\\\','gi');res=res.replace(re,'%FD0');re=new RegExp('"','gi');res=res.replace(re,'%FE0');re=new RegExp('=','gi');res=res.replace(re,'%FG0');re=new RegExp(',','gi');res=res.replace(re,'%FH0');re=new RegExp('<BR[^>]*>','gi');res=res.replace(re,'%FFFBR');re=new RegExp('<br[^>]*>','gi');res=res.replace(re,'%FFFBR');return res;};this.DecodeValue=function(val){var res=val;var re;re=new RegExp('%FA0','gi');res=res.replace(re,';');re=new RegExp('%FB0','gi');res=res.replace(re,'\'');re=new RegExp('%FD0','gi');res=res.replace(re,'\\\\');re=new RegExp('%FE0','gi');res=res.replace(re,'"');re=new RegExp('%FG0','gi');res=res.replace(re,'=');re=new RegExp('%FH0','gi');res=res.replace(re,',');re=new RegExp('%FFFBR','gi');res=res.replace(re,'<BR>');return res;};this.SetAttr=function(id,name,val){
try{
var obj=cmn.Mko(id);
if(obj==null){throw 'Element ['+id+'] not found!';return false;}
var attr=obj.attributes[name];
if(attr==null||attr==undefined){
attr=document.createAttribute(name);obj.setAttributeNode(attr);}
attr.value=val;if(val=='')obj.removeAttribute(name);}catch(e){alert(e);}};
this.GetAttr=function(id,name){
try{
var res='';
var obj=cmn.Mko(id);
if(obj==null){throw 'Element ['+id+'] not found!';return false;}
var attr=obj.attributes[name];
if(attr==null||attr==undefined){
return '';
}
res=attr.value;
if(res==null)res='';
return res;
}catch(e){alert(e);}};this.PBtoURL=function(u){var url=u.toLowerCase();if((url.indexOf('http:')==0)||(url.indexOf('https:')==0)){var x=open(u,'_top');return;}document.forms[0].action = u;document.forms[0].__VIEWSTATE.name = 'NOVIEWSTATE';__doPostBack(document.forms[0].id,null);};this.IsHTML5=function(){var res=false;var pbid=null;var dt=document.doctype;if(dt!=null&&dt!=undefined){pbid=dt.publicId;if(pbid==null||pbid==''){res=true;}return res;}else{dt=document.all[0].text;if(dt!=null&&dt!=undefined){dt=dt.toLowerCase();if(dt!=''&&dt.indexOf('public')==-1){res=true;}}}return res;};this.IsMobChk=function(){try{if(sessionStorage.desktop)return false;if (localStorage.mobile)return true;}catch(ex){}var mobile=['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];var nav=navigator.userAgent.toLowerCase();for (var i in mobile){if(nav.indexOf(mobile[i].toLowerCase())>0){return true; break;}}return false;};this.Show=function(vrb,clr){var ID='DebugDiv';var Dv=cmn.Mko(ID);if(Dv==null){Dv=document.createElement('DIV');Dv.name = ID; Dv.id = ID; Dv.style.position='absolute'; Dv.style.display='Block'; Dv.style.left='20px'; Dv.style.top='100px'; Dv.style.width='300px'; Dv.style.visibility='visible'; Dv.style.color='red';Dv.style.background='White';Dv.style.fontSize='12px';Dv.style.zIndex=50000;document.body.appendChild(Dv);}try{var re=new RegExp('&','gi');vrb=vrb.replace(re,'&amp;');re=new RegExp('<','gi');vrb=vrb.replace(re,'&lt;');re=new RegExp('>','gi');vrb=vrb.replace(re,'&gt;');}catch(ex){}if(clr!=''&&clr!=null&&clr!=undefined)vrb='<font color=\''+clr+'\'>'+vrb+'</font>';Dv.innerHTML+=vrb+', ';};};

var dm=new dmc();function dmc(){this.ComponentName='APNSoft WebControls JS source file.';this.Version='Version 4.2 (28)';this.Copyright='Copyright (C) APNSoft. All rights reserved.';this.ie=(document.all);this.n6=(document.getElementById&&!this.ie);this.uid='';this.tObj;this.mO=1;this.Lvl;this.oDr=1;this.tr=false;this.Oms=new Array(12);this.ocM;this.ocD;this.ocMt=600;this.ocDt=250;this.EDV='0';this.cdID='';this.smch=true;this.tmpo=null;this.mwc=0;this.omc='';this.omm='';this.dttob;this.tdo=null;this.cAmt=null;this.sod=0;this.smo='0';this.eommo=false;this.cifs=null;this.ttf=null;this.hmp=0;this.SmIsSc=false;this.DsplX=0;this.DsplY=0;this.IsMob=false;this.i=function(mid,t){try{var div=cmn.Mko(mid+'_-0p');var uid_l=cmn.Gisv('uid',mid);if((uid_l==''||div==null)&&t<50){t++;setTimeout('dm.i(\''+mid+'\','+t+');',50);return;}if(div){dm.IsMob=cmn.IsMobChk();if(dm.IsMob==true){cmn.Sisv('smc','2',mid);}dm.uid=mid;dm.dInO(mid);dm.HSPth(mid);dm.mO=cmn.Gisv('o',mid);if(dm.mO=='2'){var tbl=div.childNodes[0];div.style.visibility='visible';var _WdtVrtMn=cmn.Gisv('WdtVrtMn',mid); if(_WdtVrtMn!=false){dm.StEqWd(tbl);if(cmn.dBv('Chr')){var asn=function(){tbl.wprc='0';dm.StEqWd(tbl);};setTimeout(asn,50);}}}var DvMb=cmn.Mko(mid+'_Mob');if(DvMb){var InRs=function(){try{cmn.AddEvt(window,'resize',function(e){dm.WinRsz(e,mid);},false);cmn.AddEvt(window,'scroll',function(e){dm.WinRsz(e,mid);},false);dm.RspMnAct(mid);}catch(exx){}};setTimeout(InRs,20);}return;}}catch(ex){cmn.ErrHr(ex,arguments);}};this.WinRsz=function(e,uid){dm.RspMnAct(uid);};this.RspMnAct=function(uid){var DvMb=cmn.Mko(uid+'_Mob');if(DvMb==null)return;try{var SbDv=cmn.Mko(uid+'_Mob-p'); var dv=cmn.Mko(uid+'_-0p');  var MnTbl=dv.childNodes[0];  var pdL=cmn.pX(MnTbl);var RgEdg=pdL+MnTbl.offsetWidth; var DvPdd=0;var wW=cmn.getVP()[0]-1; var _ScrVals=cmn.ScrVals(); wW=wW+_ScrVals.scL-17;if(MnTbl.RgEdg!=null&&MnTbl.RgEdg!=undefined){RgEdg=MnTbl.RgEdg;pdL=MnTbl.pdL;DvPdd=dv.DvPdd;}if((RgEdg+_ScrVals.scL)>wW){ if(MnTbl.RgEdg==null||MnTbl.RgEdg==undefined){MnTbl.RgEdg=RgEdg;MnTbl.pdL=pdL;DvPdd=0; try{ DvPdd=parseInt(window.getComputedStyle(dv,null).getPropertyValue('padding-left'));}catch(ep){}dv.DvPdd=DvPdd;}if(dv.style.display!='none'){ dv.style.display='none'; DvMb.style.display='block'; if(DvMb.offsetLeft==0)DvMb.Fxd=true;}if(DvMb.Fxd){ DvMb.style.width=(wW-cmn.pX(DvMb)-(DvPdd*2)-_ScrVals.scL)+'px'; }else{ DvMb.style.width=(wW-cmn.pX(DvMb)-(DvPdd*2))+'px'; DvMb.style.marginLeft=_ScrVals.scL+'px'; }if(SbDv.style.display!=''){dm.RspSubPos(DvMb,SbDv);}}else{ if(dv.style.display=='none'){MnTbl.RgEdg=null; dv.style.display='inline-block';DvMb.style.display='none';dm.RspSubHd(uid);}}}catch(ex){cmn.ErrHr(ex,arguments);}};this.RspSubShHd=function(mid){var DvMb=cmn.Mko(mid+'_Mob');if(DvMb==null)return;var SbDv=cmn.Mko(mid+'_Mob-p');var Icn=cmn.Mko(mid+'_MobIcn');if(SbDv.style.display==''){ SbDv.style.width='auto';SbDv.style.height='auto';SbDv.style.overflow='auto';dm.RspSubPos(DvMb,SbDv);dm.ShHdObj(SbDv,'t','s');if(Icn!=null)Icn.innerHTML='&#xe793;';}else{ var FxY=0;var PosY=cmn.pY(DvMb);var MnHgt=DvMb.offsetHeight;var MnBtEdg=PosY+MnHgt; try{var _ScrVals=cmn.ScrVals(); var MnDvRct=DvMb.getBoundingClientRect();FxY=Math.round(PosY-MnDvRct.top-_ScrVals.scT);}catch(ex){}if(FxY==0||(MnBtEdg-FxY)<(cmn.pY(SbDv)+SbDv.offsetHeight)){ dm.RspSubHd(mid); }else{ SbDv.TT=(_ScrVals.scT+MnBtEdg);cmn.setTop(SbDv,MnBtEdg-FxY);}}};this.RspSubHd=function(mid){var SbDv=cmn.Mko(mid+'_Mob-p'); SbDv.style.overflow='hidden';SbDv.style.width='1px';SbDv.style.height='1px';SbDv.style.top='0px';SbDv.style.left='0px';dm.ShHdObj(SbDv,'t','h'); var Icn=cmn.Mko(mid+'_MobIcn');if(Icn!=null)Icn.innerHTML='&#xe777;';};this.RspSubPos=function(DvMb,SbDv){var FxX=0;var FxY=0;var PosX=cmn.pX(DvMb);var PosY=cmn.pY(DvMb);var MnHgt=DvMb.offsetHeight;var MnBtEdg=PosY+MnHgt; try{var _ScrVals=cmn.ScrVals(); var MnDvRct=DvMb.getBoundingClientRect();FxX=Math.round(PosX-MnDvRct.left-_ScrVals.scL);FxY=Math.round(PosY-MnDvRct.top-_ScrVals.scT);}catch(ex){}SbDv.style.left=PosX-FxX+'px'; cmn.setTop(SbDv,MnBtEdg-FxY);if(FxY!=0){if(SbDv.style.display!=''){ if(SbDv.TT==null||SbDv.TT==undefined){cmn.setTop(SbDv,MnBtEdg);}else{if(SbDv.TT>(_ScrVals.scT+MnBtEdg)){SbDv.TT=(_ScrVals.scT+MnBtEdg);}cmn.setTop(SbDv,SbDv.TT);}}else{ cmn.setTop(SbDv,MnBtEdg-FxY);SbDv.TT=(MnBtEdg-FxY);}}SbDv.style.width=DvMb.offsetWidth+'px'; };this.RspExCll=function(id){var obj=cmn.Mko('MobSub_'+id);if(obj==null)return;var icn=cmn.Mko('RspExpIcn_'+id);if(obj.style.display=='none'){ obj.style.display='block';if(icn!==null)icn.innerHTML='&#xeb20;'; }else{ obj.style.display='none';if(icn!==null)icn.innerHTML='&#xe920;'; }};this.dInO=function(uid){try{var UID=dm.uid;if(uid!=null&&uid!=undefined){UID=uid;}var tr;tr=cmn.Gisv('ocDt',UID);if(tr==null||tr==undefined){tr=250;}dm.ocDt=tr;dm.tr=cmn.Gisv('TrEff',UID);dm.EDV='0';tr=cmn.Gisv('edv',UID);if(tr=='1'){dm.EDV='1';}dm.tdo=null;}catch(ex){cmn.ErrHr(ex,arguments);}};this.StEqWd=function(tbl){if(tbl==null||tbl==undefined)return;if(tbl.rows!=null&&tbl.rows!=undefined){if(tbl.wprc!=undefined&&tbl.wprc=='1')return;tbl.wprc='1';var Wdt=0;var WdtIc=0;var WdtAr=0;var ItmTRs=new Array();for(var i=0;i<tbl.rows.length;i++){var ItmTR=null;try{ItmTR=tbl.rows[i].childNodes[0].childNodes[0].rows[0];}catch(ex){}ItmTRs[i]=ItmTR;if(ItmTR!=null&&ItmTR!=undefined){var ItmIcnTD=ItmTR.cells[0];var ItmTtlTD=ItmTR.cells[1];var ItmArrTD=ItmTR.cells[2];if(ItmIcnTD!=null&&ItmIcnTD!=undefined){if(WdtIc<ItmIcnTD.offsetWidth){WdtIc=ItmIcnTD.offsetWidth;}}if(ItmTtlTD!=null&&ItmTtlTD!=undefined){if(Wdt<ItmTtlTD.offsetWidth){Wdt=ItmTtlTD.offsetWidth;}}if(ItmArrTD!=null&&ItmArrTD!=undefined){if(WdtAr<ItmArrTD.offsetWidth){WdtAr=ItmArrTD.offsetWidth;}}}}tbl.parentNode.style.width=(tbl.offsetWidth+200)+'px';for(var i=0;i<ItmTRs.length;i++){var TD=null;if(ItmTRs[i]!=null&&ItmTRs[i]!=undefined){TD=ItmTRs[i].cells[0];if(TD!=null&&TD!=undefined){TD.style.width=WdtIc+'px';if(TD.offsetWidth>WdtIc){TD.style.width=(WdtIc-(TD.offsetWidth-WdtIc))+'px';}}TD=ItmTRs[i].cells[1];if(TD!=null&&TD!=undefined){TD.style.width=Wdt+'px';if(TD.offsetWidth>Wdt){TD.style.width=(Wdt-(TD.offsetWidth-Wdt))+'px';}}TD=ItmTRs[i].cells[2];if(TD!=null&&TD!=undefined){TD.style.width=WdtAr+'px';if(TD.offsetWidth>WdtAr){TD.style.width=(WdtAr-(TD.offsetWidth-WdtAr)+2)+'px';}}}}if(tbl.parentNode.id!=''&&tbl.parentNode.id.indexOf('sd')==tbl.parentNode.id.length-2){tbl.parentNode.style.width=tbl.offsetWidth+17+'px';}else{tbl.parentNode.style.width=tbl.offsetWidth+'px';}}};this.HSPth=function(mid,mxlvl){var hpth=cmn.Gisv('hpth',mid);if(hpth!='true')return false;var sit=cmn.rvs('sit',mid);if((mxlvl==null)||(mxlvl==undefined)){mxlvl=-1;}if(sit!=''){var SelIts=dm.GtPrnItm(sit,mid);if (SelIts!=undefined&&SelIts!=null){if (SelIts.length>0) {for (var i=0;i<SelIts.length;i++){var lvl=SelIts.length-i; if(lvl>mxlvl){dm.MrkItm(SelIts[i],'s',lvl,mid);}}}}cmn.Sisv('SelIts',SelIts,mid);if(SelIts=='')return false;return true;}return false;};this.vD=function(){clearTimeout(dm.ocM);dm.ocM=null;};this.uD=function(){try{clearTimeout(dm.ocD);dm.ocD=null;clearTimeout(dm.ocM);dm.ocM=null;dm.htt();var smc=cmn.Gisv('smc',dm.uid);if(smc=='1'){var _th=this;dm.ocM=setTimeout(function(){_th.cAm();},dm.ocMt);}}catch(ex){cmn.ErrHr(ex,arguments);}};this.v=function(w,lvl){try{clearTimeout(dm.ocD);dm.ocD=null;clearTimeout(dm.ocM);dm.ocM=null;clearTimeout(dm.cAmt);dm.cAmt=null;var NewMnu=false;var cmId=w.id.substring(0,w.id.indexOf('_'));if((dm.uid!='')&&(dm.uid!=cmId)){dm.cAm();clearInterval(cmn.TmrFdOn); cmn.TmrFdOn=null;cmn.FdOnId='';}if((dm.uid=='')||(dm.uid!=cmId)){NewMnu=true;}dm.uid=cmId;cmn.uid=dm.uid;if(NewMnu){dm.dInO(cmId);}dm.mO=cmn.Gisv('o',dm.uid);dm.Lvl=lvl;if(dm.Lvl==1){dm.rsDr();}if((dm.Lvl==1)&&(document.onclick!=dm.bmo)){dm.omc=document.onclick;document.onclick=dm.bmo;if(dm.IsMob==true){try{if(document.addEventListener){document.addEventListener('touchend',dm.bmo2,true);document.addEventListener('touchmove',dm.bmo3,true);}}catch(ex){}}}if(dm.tObj!=w){dm.tObj=w;dm.htt();}clearTimeout(dm.dttob);dm.dttob=null;var _th=this;dm.dttob=setTimeout(function(){_th.dtt();},400);if(document.onmousemove!=dm.omm&&document.onmousemove!=cmn.cmc){dm.omm=document.onmousemove;document.onmousemove=cmn.cmc;}if(!dm.eommo){try{if(window.OnMenuMouseOver){OnMenuMouseOver();}}catch(e){}dm.eommo=true;}if(dm.smch==true){dm.Hv(w);}var i;for(i=1;i<12;i++){if(dm.Oms[i]==dm.tObj.id+'-p'){return;}}if(dm.smo=='0'){dm.smo=cmn.Gisv('smo',dm.uid);}var _th=this;if((dm.smo=='1')||(dm.sod==1)){if((dm.mO!=1)||(dm.Lvl>1)){dm.ocD=setTimeout(function(){_th.oChe();},dm.ocDt);}else{var ocDth=cmn.Gisv('ocDth',dm.uid);dm.cCl('n');dm.ocD=setTimeout(function(){_th.oChe();},ocDth);}}}catch(ex){try{if(dm.omc!=''){document.onclick=dm.omc;}}catch(ex){document.onclick=dm.omc;}cmn.ErrHr(ex,arguments);}};this.u=function(w){try{clearTimeout(dm.ocD);dm.ocD=null;clearTimeout(dm.ocM);dm.ocM=null;clearTimeout(dm.dttob);dm.dttob=null;var _th=this;var smc=cmn.Gisv('smc',dm.uid);if(smc=='1'){dm.ocM=setTimeout(function(){_th.cAm();},dm.ocMt);if(cmn.dBv('FF3p')){if(dm.SmIsSc){clearTimeout(dm.ocM);dm.ocM=null;}}}var i;for(i=1;i<12;i++){if(dm.Oms[i]==w.id+'-p'){return;}}}catch(ex){cmn.ErrHr(ex,arguments);}};this.dtt=function(tx){try{if(dm.tObj==null){return;}var t=cmn.Gisv('ttt_'+dm.tObj.id,dm.uid);if((t=='undefined')||(t=='')||(t==null)){return;}var ifc=null;ifc=cmn.Mko(dm.uid+'ifc');if(ifc==null||ifc==undefined){return;}if(dm.tdo==null){var nd=new dm.cDIV();ifc.appendChild(nd);dm.tdo=nd;}dm.tdo.innerHTML=t;var zi=cmn.Gisv('zi',dm.uid);dm.tdo.style.zIndex = zi+20;var ccp=cmn.Gisv('ccp',dm.uid);dm.tdo.className=ccp+'TooltipDIV';dm.tdo.style.whiteSpace='nowrap';try{if(cmn.dBv('ie55p')||cmn.dBv('op5p')){dm.tdo.attachEvent('onmouseover',dm.htt);}else{dm.tdo.addEventListener('mouseover',dm.htt,true);}}catch(tm){}var res=dm.stp();if(res==false){return;}if(cmn.dBv('ie55p')){if(dm.ttf==null){var nif=new cmn.cIFR('dm_ttf',dm.uid);ifc.appendChild(nif);dm.ttf=nif;}var Shd=cmn.GtSdStr(dm.tdo.className);if(cmn.dBv('ie9p')){Shd=0;}dm.ttf.style.display='block';dm.ttf.style.height=(dm.tdo.offsetHeight-Shd)+'px';dm.ttf.style.width=(dm.tdo.offsetWidth-Shd)+'px';cmn.setTop(dm.ttf,cmn.pY(dm.tdo));cmn.setLeft(dm.ttf,cmn.pX(dm.tdo));dm.ttf.style.zIndex = 0;dm.tmpo=dm.ttf;}dm.dttl(dm.tdo);}catch(ex){cmn.ErrHr(ex,arguments);}};this.dttl=function(w){cmn.sDv(w);cmn.sDv(dm.tmpo);};this.htt=function(){clearTimeout(dm.dttob);dm.dttob=null;try{if(dm.tdo!=null){cmn.hDv(dm.tdo);cmn.setTop(dm.tdo,0);cmn.setLeft(dm.tdo,0);}if((cmn.dBv('ie55p'))&&(dm.ttf!=null)){cmn.hDv(dm.ttf);cmn.setTop(dm.ttf,0);cmn.setLeft(dm.ttf,0);}}catch(ex){cmn.ErrHr(ex,arguments);}};this.stp=function(){try{var dX=-5; var dY=20;var pX=cmn.mX+dX;var pY=cmn.mY+dY;if((cmn.mX==cmn.mY)&&(cmn.mX==0)){return false;}var wH=600;var wW=800;var dB=document.body;if(dm.ie){wH=dB.offsetHeight;wW=dB.offsetWidth;}else{if(dm.n6){wH=innerHeight;wW=innerWidth;}}if(cmn.dBv('ie55p')){wH=dB.parentNode.offsetHeight;wW=dB.parentNode.offsetWidth;}else{wH=innerHeight;wW=innerWidth;}var _ScrVals=cmn.ScrVals();scL=_ScrVals.scL;scT=_ScrVals.scT;if(cmn.mX+dX<5){pX=5;}if(wW-cmn.mX<dm.tdo.offsetWidth+dX+20-scL){pX=wW-dm.tdo.offsetWidth-20+scL;}if(wH-cmn.mY-dY-dm.tdo.offsetHeight+scT<15){pY=cmn.mY-dY-dm.tdo.offsetHeight;}cmn.setLeft(dm.tdo,pX);cmn.setTop(dm.tdo,pY);return true;}catch(ex){cmn.ErrHr(ex,arguments);return false;}};this.cDIV=function(){var d=document.createElement('DIV');d.id='tt'+dm.uid;d.style.position='absolute';d.style.visibility='hidden';return d;};this.cIFRs=function(){if(dm.cifs==null){dm.cifs=new Array(12);var ifc=cmn.Mko(dm.uid+'ifc');var nif;for(i=0;i<12;i++){nif=new cmn.cIFR('dm_'+i+'f',dm.uid);ifc.appendChild(nif);dm.cifs[i]=nif;}}};this.mc=function(){dm.mwc=1;if((dm.smo=='2')&&(dm.sod==0)){dm.oChe();dm.sod=1;}};this.bmo=function(){if(dm.cAmt==null){dm.cAmt=setTimeout('dm.cAm()',100);}};this.bmo2=function(){if(dm.tmpo){dm.tmpo=null; return;}if(dm.cAmt==null){dm.cAmt=setTimeout('dm.cAm()',500);}dm.tmpo=null; };this.bmo3=function(){dm.tmpo=true; };this.oChe=function(){dm.cCl('t');dm.oCh(dm.tObj);};this.oCh=function(w){if(w==null||w==undefined)return;var chOb=cmn.Mko(w.id+'-p');if(!chOb){return;}dm.SmIsSc=false;var UID=w.id.substring(0,w.id.indexOf('_'));var ccp=cmn.Gisv('ccp',UID);var scdo=cmn.Mko(w.id+'sd');var tbl=cmn.Mko(w.id+'-smt');dm.StEqWd(tbl);if(scdo!=null){if(scdo.style.height=='auto'){var SMH=cmn.Gisv('SMH',dm.uid);scdo.style.height=parseInt(SMH)+'px';}if(parseInt(scdo.style.height)<=tbl.offsetHeight){if(cmn.dBv('FF3p')||cmn.dBv('op5p')||cmn.dBv('saf')||cmn.dBv('SafWin')){if(scdo.style.width=='auto'){scdo.style.width=scdo.offsetWidth+17+'px';}}else if(!cmn.dBv('ie55p')){if(cmn.dBv('FF')){scdo.style.width=scdo.offsetWidth+'px';}}if(scdo.offsetWidth<(scdo.childNodes[0].offsetWidth+17)){scdo.style.width=scdo.offsetWidth+17+'px';}dm.SmIsSc=true;}else{scdo.style.height='auto';scdo.style.width=tbl.offsetWidth+'px';}}var cOb=cmn.Mko(w.id+'-p');dm.dCr(w,cOb);if(dm.tObj!=null&&dm.tObj!=undefined){var Obj=cmn.Mko(dm.tObj.id+'-p'); if(Obj!=null&&Obj!=undefined){if(cmn.dBv('ie55p')){var Shd=cmn.GtSdStr(ccp+'SubMenuDIV');if(cmn.dBv('ie9p')){Shd=0;}dm.cIFRs();var ifr=dm.cifs[dm.Lvl-1];ifr.style.display='block';ifr.style.height=(Obj.offsetHeight-Shd)+'px';ifr.style.width=(Obj.offsetWidth-Shd)+'px';cmn.setTop(ifr,cmn.pY(Obj));cmn.setLeft(ifr,cmn.pX(Obj));ifr.style.zIndex = 0; dm.ShHdObj(ifr,'t','s',2);}Obj.style.zIndex=cmn.Gisv('zi',UID)+dm.Lvl+1;var ScrDv=cmn.Mko(w.id+'sd');if(ScrDv!=null){ScrDv.style.position='static';}dm.ShHdObj(Obj,'t','s');var PngShdCnt=cmn.Gisv('PngShdCnt',UID);cmn.ShwShd(Obj,PngShdCnt,ccp);}}dm.Oms[dm.Lvl]=w.id+'-p';};this.cCl=function(t){for(i=dm.Lvl;i<12;i++){dm.HdSbm(i,t);}};this.cAm=function(){try{clearTimeout(dm.cAmt);dm.cAmt=null;if(dm.mwc==1){dm.mwc=0;return;}try{if(window.OnMenuCloseAll){OnMenuCloseAll();}}catch(e){}dm.eommo=false;dm.tObj=null;dm.htt();if(dm.omm!=cmn.cmc&&dm.omm!=''){document.onmousemove=dm.omm;dm.omm='';}try{if(dm.omc!=''){document.onclick=dm.omc;}}catch(ex){document.onclick=dm.omc;}dm.omc='';if(dm.IsMob==true){try{if(document.removeEventListener){document.removeEventListener('touchend',dm.bmo2,true);document.removeEventListener('touchmove',dm.bmo3,true);}}catch(ex){}}dm.sod=0;dm.smo='0';for(i=1;i<12;i++){dm.HdSbm(i,'t');}dm.UhlHv(dm.uid);}catch(ex){cmn.ErrHr(ex,arguments);}};this.HdScrDv=function(ScrDv){ScrDv.style.position='absolute';ScrDv.style.left='-6000px';};this.HdSbm=function(i,t){var obj=cmn.Mko(dm.Oms[i]);if(obj!=null){var ScrDv=cmn.Mko(obj.id.substring(0,obj.id.indexOf('-p'))+'sd'); var _th=this;if(ScrDv!=null){dm.ShHdObj(obj,t,'h',null,function(){_th.HdScrDv(ScrDv);});}else{dm.ShHdObj(obj,t,'h');}cmn.HdShd(obj);dm.Oms[i]=undefined; if(dm.cifs!=null){obj=dm.cifs[i-1];if(obj!=null){cmn.hDv(obj);cmn.setTop(obj,0);cmn.setLeft(obj,0);}}}};this.UhlHv=function(uid){var UID=dm.uid;if(uid!=undefined&&uid!=null){UID=uid;}var HovIts=cmn.Gisv('HovIts',UID);var SelIts=cmn.Gisv('SelIts',UID);if(HovIts!=null&&HovIts!=undefined){if(HovIts.length>0){for(var i=0;i<HovIts.length;i++){var lvl=HovIts.length-i;var SetItem=null;if(SelIts!=null)SetItem=SelIts[i];if(SetItem==null||SetItem!=HovIts[i]){dm.MrkItm(HovIts[i],'n',lvl,UID);}}}}cmn.Sisv('HovIts',null,UID);var SelIts=cmn.Gisv('SelIts',UID);if (SelIts!=undefined&&SelIts!=null){if (SelIts.length>0) {for (var i=0;i<SelIts.length;i++){var lvl=SelIts.length-i; dm.MrkItm(SelIts[i],'s',lvl,UID);}}}};this.gCd=function(w){var dOb=w.parentNode;if(cmn.dBv('SafWin')){while(dOb.parentNode){if((dOb.tagName=='DIV')&&(dOb.style.overflowX!='auto')){return dOb;}dOb=dOb.parentNode;}}else{while(dOb.parentNode){if((dOb.tagName=='DIV')&&(dOb.style.overflow.length==0)){return dOb;}dOb=dOb.parentNode;}}return null;};this.Hv=function(w){dm.UhlHv(dm.uid); var UID=w.id.substring(0,w.id.indexOf('_'));var ItemID=w.id.substring(UID.length+1);var HovIts=dm.GtPrnItm(ItemID,UID);if(HovIts==null)return;if(HovIts.length>0){for(var i=0;i<HovIts.length;i++){var lvl=HovIts.length-i;dm.MrkItm(HovIts[i],'h',lvl,null);}}cmn.Sisv('HovIts',HovIts,dm.uid);};this.MrkItm=function(w,Ind,lvl,uid){var UID=dm.uid;if(uid!=null&&uid!=undefined){UID=uid;}if(w==null){return;}var ItemID=w.id.substring(UID.length+1);var ccp=cmn.Gisv('ccp',UID);var Ncn='';var CssPref='Main';var PCV=null;if(lvl>1){CssPref='Sub';}if(Ind=='n'||Ind==''||Ind==null||Ind==undefined){Ncn=ccp+CssPref+'MenuItemTD';PCV=cmn.Gisv('MITD_'+ItemID,UID);if(PCV!=null)Ncn=ccp+PCV;}else if(Ind=='h'){Ncn=ccp+CssPref+'MenuItemHoveredTD';PCV=cmn.Gisv('MIHTD_'+ItemID,UID);if(PCV!=null)Ncn=ccp+PCV;}else if(Ind=='s'){Ncn=ccp+CssPref+'MenuItemSelectedTD';PCV=cmn.Gisv('MISTD_'+ItemID,UID);if(PCV!=null)Ncn=ccp+PCV;}if(w.className!=Ncn){w.className=Ncn;}var Obj=w.childNodes[0];if(Obj!=null){if(Obj.tagName=='IMG'){var Im=cmn.Gisv('m'+ItemID+'Im',UID);var ImO=cmn.Gisv('m'+ItemID+'ImO',UID);if(Im!=null&&ImO!=null){if(Ind=='h'){Obj.src=ImO.src;}if(Ind=='n'||Ind=='s'){Obj.src=Im.src;}}return;}}var icn=cmn.Mko(w.id+'-icn');if(icn!=null){var Ic=cmn.Gisv('i'+ItemID+'Ic',UID);var IcO=cmn.Gisv('i'+ItemID+'IcO',UID);if(Ic!=null&&IcO!=null){if(Ind=='h'||Ind=='s'){icn.src=IcO.src;}else{icn.src=Ic.src;}}}};this.ItClk=function(w,alt){if(dm.IsMob==true){try{w.onmouseover();}catch(ex){}}var ItemID=w.id.substring(dm.uid.length+1);var SlIts=null;var hpth=cmn.Gisv('hpth',dm.uid);if(hpth=='true'){dm.UnhItm(dm.uid,ItemID);cmn.svs('sit',ItemID,dm.uid);dm.HSPth(dm.uid);}dm.Hv(w);dm.MrkItm(w,'s',dm.Lvl,dm.uid);var asn=function(){if(dm.tObj==w){dm.MrkItm(w,'h',dm.Lvl,dm.uid);}};setTimeout(asn,80);var cid=cmn.Gisv('id',dm.uid);alt=cmn.trim(alt);var ttl=cmn.GtTtl(w.id+'-tl');if(alt!=''&&alt!=null){cmn.ItmPrc(alt,cid,ItemID,ttl);}else{var prc=cmn.Gisv('ClClk',dm.uid);cmn.ItmPrc(prc,cid,ItemID,ttl);}var SbmAtHd=cmn.Gisv('SbmAtHd',dm.uid);if(SbmAtHd==true){if((dm.Lvl>1)||(dm.Lvl==1&&dm.smo!='2')){if(w.onclick){var fn=''+w.onclick;fn=fn.toLowerCase();if(fn.indexOf('cmn.href')>-1){dm.mwc=0;dm.cAm();}}}}};this.UnhItm=function(uid,ItemID){var sit=cmn.rvs('sit',uid);if(sit!=''&&sit!=ItemID){SlIts=dm.GtPrnItm(sit,uid);if(SlIts!=null&&SlIts.length>0){for(var i=0;i<SlIts.length;i++){var lvl=SlIts.length-i;dm.MrkItm(SlIts[i],'n',lvl,uid);}}        }};this.GtPrnItm=function(ItemID,UID){try{var res=new Array();res[0]=cmn.Mko(UID+'_'+ItemID);var nIds=cmn.GtnIds(UID);if(nIds!=null){var pn=null;var NdID='i'+ItemID;for(var i=1;i<13;i++){pn=nIds.getElementsByTagName(NdID)[0];if(pn==null||pn==undefined){break;}pn=pn.parentNode;NdID=pn.nodeName;if(pn.nodeName=='t'){break;}res[i]=cmn.Mko(UID+'_'+NdID.substring(1));}}return res;}catch(ex){cmn.ErrHr(ex,arguments);}};this.GtPrnID=function(w){try{var res='';var UID=w.id.substring(0,w.id.indexOf('_'));var ItemID=w.id.substring(UID.length+1);var nIds=cmn.GtnIds(UID);if(nIds!=null){var pn=null;var NdID='i'+ItemID;pn=nIds.getElementsByTagName(NdID)[0].parentNode;if(pn.nodeName=='t'){return res;}res=pn.nodeName.substring(1);}return res;}catch(ex){cmn.ErrHr(ex,arguments);}};this.dCr=function(w,cOb){var UID=w.id.substring(0,w.id.indexOf('_'));var ItemID=w.id.substring(UID.length+1);var OvH=-5;var OvV=-4;var Ov=cmn.Gisv('ho',dm.uid);if(Ov!=null){OvH=Ov;}Ov=cmn.Gisv('vo',dm.uid);if(Ov!=null){OvV=Ov;}var cDw=cOb.childNodes[0].offsetWidth;var cDh=cOb.childNodes[0].offsetHeight;var wH=600;var wW=800;var dB=document.body;var stY;var stX;var _ScrVals=cmn.ScrVals();scL=_ScrVals.scL;scT=_ScrVals.scT;if(dm.ie){wH=dB.offsetHeight;wW=dB.offsetWidth;}else{if(dm.n6){wH=innerHeight;wW=innerWidth;}}if(cmn.dBv('ie55p')){wH=dB.parentNode.offsetHeight;wW=dB.parentNode.offsetWidth;}else{wH=innerHeight;wW=innerWidth;}var cDo=dm.gCd(w);var FxY=0;var FxX=0;if(dm.Lvl==1){ try{var MnDv=cmn.Mko(dm.uid+'_-0p');var MnDvRct = MnDv.getBoundingClientRect();FxY=Math.round(cmn.pY(MnDv)-MnDvRct.top-scT);FxX=Math.round(cmn.pX(MnDv)-MnDvRct.left-scL);}catch(ex){}}if(dm.Lvl==1){dm.hmp=0;}if(dm.Lvl==1&&dm.mO==1){if(dm.EDV=='1'){stY=cmn.pY(cDo)-cDh;dm.hmp=stY+cDh;}else{stY=cmn.pY(cDo)+cDo.offsetHeight;}stY+=OvV;}else{var brdH=parseInt((w.offsetHeight-w.clientHeight)/2);if(isNaN(brdH))brdH=0;stY=cmn.pY(w);stY=stY-brdH;}if(FxY<-2)stY+=scT;if((dm.Lvl!=1)&&(cmn.dBv('saf'))){stY-=document.body.offsetTop;}var svsp=cmn.Gisv('svsp',UID); if(svsp=='f'){var ChScr=cmn.Mko(w.id+'sd');if(ChScr!=null){ChScr.scrollTop=0;}}var PrnID=dm.GtPrnID(w);var scdo=cmn.Mko(dm.uid+'_'+PrnID+'sd');if(scdo!=null){stY-=scdo.scrollTop;}if(dm.Lvl!=1||dm.mO!=1){var SbHg=cDh;try{if(SbHg<12){SbHg=cOb.childNodes[0].childNodes[0].offsetHeight+8;}}catch(e){}if((stY+SbHg+21)>(wH+scT)){stY=(wH+scT)-SbHg-21;}if(dm.hmp>0){if((stY+SbHg)>dm.hmp){stY=dm.hmp-SbHg;}}}var MrgTp=cmn.NdAtr(ItemID,'MrgTp',UID);if(MrgTp==null||MrgTp==undefined)MrgTp=0;var MrgTp=parseInt(MrgTp);if(isNaN(MrgTp)){MrgTp=0;}stY+=MrgTp;if(dm.Lvl==1){stY-=this.DsplY;}cmn.setTop(cOb,stY);dm.rsDr(); if(!dm.cFt(w,cOb,wW,cDo,scL)){dm.rDr();}if(!dm.cFt(w,cOb,wW,cDo,scL)){dm.rDr();}if(dm.Lvl==1&&dm.mO==1){stX=cmn.pX(w);var _MrgLf=cmn.NdAtr(ItemID,'MrgLf',UID);var MrgLf=0;if(_MrgLf!=null&&_MrgLf!=undefined){if(_MrgLf=='center'){ //Get centered value
MrgLf=(w.offsetWidth-cOb.offsetWidth)/2;
}else if(_MrgLf=='right'){ MrgLf=w.offsetWidth-cOb.offsetWidth}else{MrgLf=parseInt(_MrgLf);if(isNaN(MrgLf)){MrgLf=0;}}}stX+=MrgLf;if(dm.Lvl==1){stX-=this.DsplX;}if((wW-20)>cDw){if((wW-stX-30)<cDw-scL){stX=wW-cDw-30+scL;}else{if((stX-scL)<0){stX+=(scL-stX)+10;}}}else{if((wW-stX-30)<cDw-scL){stX=((cDw-wW)/2)+scL;}else{if((stX-scL)<0){stX=((cDw-wW)/2)+scL;}}}}if(dm.Lvl>1||dm.mO!=1){if(dm.oDr==1){stX=cmn.pX(cDo.childNodes[0])+cDo.childNodes[0].offsetWidth;if(!dm.Op){stX+=OvH;}if(dm.Lvl==1&&dm.mO!=1){stX-=this.DsplX;}}if(dm.oDr==2){stX=cmn.pX(cDo.childNodes[0])-cDw;if(!dm.Op){stX-=OvH;}}}if(FxX<-2)stX+=scL;if((dm.Lvl!=1)&&(cmn.dBv('saf'))){stX-=document.body.offsetLeft;}cmn.setLeft(cOb,stX);w.offsetParent;};this.rDr=function(){if(dm.oDr==1){dm.oDr=2;}else{dm.oDr=1;}};this.rsDr=function(){var dDd=cmn.Gisv('ed',dm.uid);if(dDd){dm.oDr=dDd;}};this.cFt=function(w,cOb,wW,cDo,scL){if((dm.Lvl==1)&&(dm.mO==1)){return true;}var r=true;var CrDvPs=cmn.pX(cDo.childNodes[0]);var cDw=cOb.offsetWidth;if(cmn.dBv('op5p')){cDw=cOb.childNodes[0].offsetWidth;}var crDw=cDo.childNodes[0].offsetWidth;if(dm.oDr==1){if((wW-(CrDvPs+crDw-scL))<(cDw+30)){r=false;}}if(dm.oDr==2){if((CrDvPs-scL)<(cDw+10)){r=false;}}return r;};this.ShHdObj=function(w,t,sh,opCst,fnc){try{if(w==null||w==undefined)return;var Spd=5;if(t=='t'){if(dm.tr==false)t='n';}var zInd=w.style.zIndex;var op=100;var ccp=cmn.Gisv('ccp',dm.uid);var css=ccp+'SubMenuDIV';var opc=cmn.GtCssRl(css,'opacity');if(opc!=undefined&&opc!=null){if(opc!='')op=opc*100;if(op==0)op=100;}if(opCst!=undefined&&opCst!=null){op=opCst;}if(t=='t'){Spd=cmn.Gisv('TrSpd',dm.uid);if(sh=='s'){cmn.sDvOpc(w,Spd,op);}else{cmn.hDvOpc(w,Spd,op,true,fnc);}}else{if(sh=='s'){cmn.sDv(w);cmn.StOpc(w.id,op);}else{cmn.hDv(w,fnc);}}}catch(ex){cmn.ErrHr(ex,arguments);}};this.GetFullMenuID=function(mid){var midF=null;try{midF=eval('gbd4Hirq0nTyd'+mid);}catch(ex){}if(midF==null||midF==undefined||midF==''){alert('Error! APNSoft Menu \''+mid+'\' not found!');return '';}return midF;};this.GetHref=function(mid,iid){var midF=dm.GetFullMenuID(mid); if(midF=='')return;var itmTD=cmn.Mko(midF+'_'+iid);if(itmTD==null||itmTD==undefined){alert('Error! Item \''+iid+'\' not found!');return '';}var oncl='';try{oncl=itmTD.attributes['onclick'].value;}catch(ex){}if(oncl=='')return '';var ind=oncl.indexOf('cmn.href(\'');var ind2=oncl.indexOf('\',\'');if(ind==-1||ind2==-1)return '';var href=oncl.substring(ind+10,ind2);return href;};this.HideSubmenus=function(mid){var midF=dm.GetFullMenuID(mid); if(midF=='')return;var uidRm=dm.uid;dm.uid=midF;dm.mwc=0;dm.cAm();dm.uid=uidRm; };this.HighlightItem=function(mid,iid,t){var uid=dm.GetFullMenuID(mid);if(uid=='')return;if(t==null||t==undefined){t=0;}var Res=false;cmn.Sisv('hpth','true',uid);dm.UnhItm(uid,iid);cmn.svs('sit',iid,uid);var sit=cmn.rvs('sit',uid);if(sit==''&&t<100){t++;setTimeout('dm.HighlightItem(\''+mid+'\',\''+iid+'\','+t+');',50); return;}Res=dm.HSPth(uid); cmn.Sisv('hpth','false',uid); return Res;};};

function AddGlyphs(Path){

    var Hd=document.getElementsByTagName('head')[0];
    var stls=document.getElementsByTagName('style');
    
    var AddFont=true;
    for (var i=0;i<stls.length;i++){   
        if(stls[i]!=null&&stls[i]!=undefined){                            
            var stid=stls[i].getAttribute('id');   
            if(stid!=null&&stid!=undefined){
                if(stid=='MG_Icons'){AddFont=false;break;}
            }
        }
    }
    if(AddFont==false){return;}
    
    var stl=document.createElement('style');
    stl.setAttribute('type','text/css');
    stl.setAttribute('id', 'MG_Icons');
    
    var CssFn='@font-face {';
        CssFn+='font-family: \'MG_Icons\';';

CssFn+='src:url(\''+Path+'MG_Icons.eot\');';
        CssFn+='src:url(\''+Path+'MG_Icons.eot?#iefix\') format(\'embedded-opentype\'),';
        CssFn+='    url(\''+Path+'MG_Icons.woff?#68699864\') format(\'woff\'),';
        CssFn+='    url(\''+Path+'MG_Icons.ttf?#68699864\') format(\'truetype\');';
        CssFn+='font-weight: normal;';
        CssFn+='font-style: normal;';
    CssFn+='}';
    
    var Css='[class^="MG_Icons"], [class*=" MG_Icons"] {';
    Css+='font-family: \'MG_Icons\';';
    Css+='font-style: normal;';
    Css+='font-weight: normal;';
    Css+='font-variant: normal;';
    Css+='text-transform: none;';
    Css+='line-height: 1;';
    Css+='-webkit-font-smoothing: antialiased;';
    Css+='-moz-osx-font-smoothing: grayscale;';
    Css+='}';
    
    if(stl.styleSheet==null||stl.styleSheet==undefined){
        try{
            stl.innerHTML=CssFn+Css;
        }catch(err){
            try{stl.textContent=CssFn+Css;}catch(err){stl.innerText=CssFn+Css;}
        }
        Hd.appendChild(stl);
    }else{
        stl.styleSheet.cssText=Css;
        Hd.appendChild(stl);
        stl.styleSheet.cssText=CssFn+stl.styleSheet.cssText;
    }
};
function AddCss_cimgmenu(Path){
    var stls=document.getElementsByTagName('style');
    var Hd=document.getElementsByTagName('head')[0];
    for (var i=0;i<stls.length;i++){   
        if(stls[i]!=null&&stls[i]!=undefined){                            
            var stid=stls[i].getAttribute('id');   
            if(stid!=null&&stid!=undefined){
                if(stid=='Style_Menu_cimgmenu'){
                    Hd.removeChild(stls[i]);
                }
            }
        }
    }
    var Css='.AE57ShdLft{width:4px;*filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+Path+'ShadowLeft.png\', sizingMethod=\'crop\');background:transparent url('+Path+'ShadowLeft.png);}.AE57ShdBtm{height:9px;*filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+Path+'ShadowBottom.png\', sizingMethod=\'crop\');background:transparent url('+Path+'ShadowBottom.png);}.AE57ShdCrn{width:18px;height:9px;*filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+Path+'ShadowCorner.png\', sizingMethod=\'crop\');background:transparent url('+Path+'ShadowCorner.png);}.AE57ShdRgt{width:5px;*filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+Path+'ShadowRight.png\', sizingMethod=\'crop\');background:transparent url('+Path+'ShadowRight.png);}.AE57ShdCmn{position:absolute;display:-moz-inline-stack;display:inline-block;zoom:1;*display:inline;background-repeat:no-repeat;*background-image:none;*background-color:Transparent;padding:0px;}.AE57MainMenuDIV TD, .AE57SubMenuDIV TD {vertical-align: middle;border: none;padding: 0px;}.AE57Defaults {color: #FFFFFF;OverlapVertical: -1px;OverlapHorizontal: 0px;}.AE57IconTD, .AE57TitleTD, .AE57ArrowTD {text-shadow: none;font-size: 14px;font-family: Ubuntu-webfont;white-space: nowrap;padding: 0px;line-height: normal;vertical-align: middle;}.AE57TitleTD {text-align: left;}.AE57ArrowTD {padding-left: 2px;}.AE57IconTD font, .AE57ArrowTD font {margin: 0 !important;display: block !important;padding: 0px;line-height: 14px;}.AE57MainMenuDIV {padding: 0px;background-color: #DDDDDD;border-bottom: solid 1px;border-bottom-color: #B2B2B2;cursor: default;}.AE57MainMenuDIV_Transparent {border-bottom: none;border-bottom-color: #E5E5E5;}.AE57MainMenuDIV TABLE {border-collapse: separate;margin: 0px;padding: 0px;}.AE57Menu_Width {}.AE57MainMenuItemTD {padding: 8px !important;padding-top: 16px !important;padding-bottom: 14px !important;}.AE57MainMenuItemTD .AE57TitleTD, .AE57MainMenuItemTD .AE57IconTD, .AE57MainMenuItemTD .AE57ArrowTD {color: #4F4F4F;}.AE57MainMenuItemHoveredTD {padding: 8px !important;padding-top: 16px !important;padding-bottom: 14px !important;background-color: #FFFFFF;cursor: default;cursor: hand;cursor: pointer;}.AE57MainMenuItemHoveredTD .AE57TitleTD, .AE57MainMenuItemHoveredTD .AE57IconTD, .AE57MainMenuItemHoveredTD .AE57ArrowTD {color: #4F4F4F;}.AE57MainMenuItemSelectedTD {padding: 8px !important;padding-top: 16px !important;padding-bottom: 14px !important;background-color: #FFFFFF;}.AE57MainMenuItemSelectedTD .AE57TitleTD, .AE57MainMenuItemSelectedTD .AE57IconTD, .AE57MainMenuItemSelectedTD .AE57ArrowTD {color: #4F4F4F;}.AE57SubMenuDIV {-moz-box-sizing: content-box;-webkit-box-sizing: content-box;box-sizing: content-box;background-color: #DEDEDE;border: solid 1px;border-color: #B2B2B2;cursor: default;}.AE57SubMenuDIV TABLE {border-collapse: separate;width: auto !important;margin: 0px;padding: 0px;}.AE57SubMenuItemTD, .AE57SubResDIV {padding: 8px !important;padding-left: 10px !important;padding-right: 10px !important;}.AE57SubMenuItemTD .AE57TitleTD, .AE57SubMenuItemTD .AE57IconTD, .AE57SubMenuItemTD .AE57ArrowTD, .AE57SubResDIV {color: #4F4F4F;}.AE57SubMenuItemHoveredTD, .AE57SubResDIV:hover {padding: 8px !important;padding-left: 10px !important;padding-right: 10px !important;background-color: #FFFFFF;cursor: default;cursor: hand;cursor: pointer;}.AE57SubMenuItemHoveredTD .AE57TitleTD, .AE57SubMenuItemHoveredTD .AE57IconTD, .AE57SubMenuItemHoveredTD .AE57ArrowTD, .AE57SubResDIV:hover {color: #4F4F4F;}.AE57SubMenuItemSelectedTD {padding: 8px !important;padding-left: 10px !important;padding-right: 10px !important;background-color: #FFFFFF;}.AE57SubMenuItemSelectedTD .AE57TitleTD, .AE57SubMenuItemSelectedTD .AE57IconTD, .AE57SubMenuItemSelectedTD .AE57ArrowTD {color: #4F4F4F;}.AE57SeparatorVerticalTD {padding: 0px !important;border-left-style: solid !important;border-left-width: 1px !important;border-left-color: #B9B9B9 !important;}.AE57SeparatorHorizontalTD {padding: 0px !important;border-top-style: solid !important;border-top-width: 1px !important;border-top-color: #A1A1A1 !important;}.AE57MainMenuDIV .AE57SeparatorHorizontalTD {border-top-color: #A1A1A1 !important;}.AE57TooltipDIV {font-family: Ubuntu-webfont;font-size: 12px;color: #555555;padding: 3px;padding-left: 5px;padding-right: 5px;background-color: #F8F8F8;border: solid 1px #888888;border-radius: 3px;-webkit-border-radius: 3px;-khtml-border-radius: 3px;-moz-border-radius: 3px;}.AE57IconTD {color: #000000;vertical-align: middle;text-align: center;}.AE57IconTD font {font-size: 16px;padding-left: 2px;padding-right: 8px;width: 16px;}';
var FontPath=Path;var FontReg='@font-face {';
FontReg+='font-family: \'Ubuntu-webfont\';';
FontReg+='src:url(\''+FontPath+'Ubuntu-webfont.eot\');';
    FontReg+='src:url(\''+FontPath+'Ubuntu-webfont.eot?#iefix\') format(\'embedded-opentype\'),';
    FontReg+='    url(\''+FontPath+'Ubuntu-webfont.woff?#68699864\') format(\'woff\'),';
    FontReg+='    url(\''+FontPath+'Ubuntu-webfont.ttf?#68699864\') format(\'truetype\');';
FontReg+='}';

Css=FontReg+Css;

    var stl=document.createElement('style');
    stl.setAttribute('type','text/css');
    stl.setAttribute('id', 'Style_Menu_cimgmenu');
    if(stl.styleSheet==null||stl.styleSheet==undefined){
        try{
            stl.innerHTML=Css;
        }catch(err){
            try{stl.textContent=Css;}catch(err){stl.innerText=Css;}
        }
    }else{
        stl.styleSheet.cssText=Css;
    }


    Hd.appendChild(stl);
};
                    


var gbd4Hirq0nTydcimgmenu='mnFFAC7097';
var mnFFAC7097i=function(){dm.i('mnFFAC7097',0);};
var mnFFAC7097L = null;
function mnFFAC7097LCn(Path){
this.id='cimgmenu';
this.uid='cimgmenu';
this.sfu=Path;
this.qstr='';
this.ccp='AE57';
this.EmpHtm=Path+'Empty.htm';
this.PngShdCnt=3;
this.o=1;
this.ed=1;
this.TrEff=true;
this.TrSpd=5;
this.ho=0;
this.vo=-1;
this.zi=9999;
this.smo='1';
this.smc='1';
this.hpth='false';
this.ocDth=20;
this.ocDt=250;
this.HovIts=null;
this.SelIts=null;
this.SMH='10000px';
this.nids='<ii1/><ii5/><ii17/><ii23/><ii24/><ii6/><ii7/><ii8/>';
this.SbmAtHd=true;
this.ttt_mnFFAC7097_i1='Go to Home Page';
};

var cimgmenu={
    _path:'',
    _div:'',
    _SbMnu:false,
    Mnu:'',
    Plcd:false,
    ItmsCnt:8,
    
    Prepare:function(){
        var Ident='cimgmenu';
        var Path=cimgmenu._path;

        if(Path==''||Path==null||Path==undefined){
            Path='./'+Ident+'/';
            var e=document.getElementsByTagName('script');
            var src=null;
            var attr=null;
            var IdentLw=Ident.toLowerCase();
            var Ind=-1;
            var attrLw='';
            for(var i=0;i<e.length;i++) {
                src=e[i].attributes['src'];
                if(src&&src!=null&&src!=undefined&&src!=''){
                    attr=src.value;
                    if(attr&&attr!=null&&attr!=undefined&&attr!=''){
                        attrLw=attr.toLowerCase();
                        Ind=attrLw.lastIndexOf('/'+IdentLw+'.js')
                        if(Ind>-1){
                            Path=attr.substring(0,Ind);
                            break;
                        }
                        Ind=attrLw.indexOf(IdentLw+'/script.js')
                        if(Ind>-1){
                            Path=attr.substring(0,Ind)+Ident;
                            break;
                        }
                    }
                }
            }
        
            var PrmInd=0;
            PrmInd=Path.indexOf('?');
            if(PrmInd>0)Path=Path.substring(0,PrmInd);

            Path=Path.replace(/(\r\n|\n|\r)/gm,'');//Line Breaks
        }

        var lst=Path.substring(Path.length-1);
        if(lst!='/')Path=Path+'/';AddGlyphs(Path);

        AddCss_cimgmenu(Path);
mnFFAC7097L=new mnFFAC7097LCn(Path);cimgmenu.Mnu='<div><input id="sit_mnFFAC7097_vs" name="sit_mnFFAC7097_vs" type="hidden" value="" /></div><div id="mnFFAC7097_-0p" class="AE57MainMenuDIV" onmouseover="dm.vD();" onmouseout="dm.uD();" style="z-index:10000;position:static;vertical-align:top;display:-moz-inline-stack;display:inline-block;zoom:1;*display:inline;"><table border="0" cellspacing="0" cellpadding="0" onclick="dm.mc();"><tr><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i1" onclick="dm.ItClk(this,\'\');cmn.href(\'http://cimg.eu\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe721;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i1-tl">Home</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i5" onclick="dm.ItClk(this,\'\');cmn.href(\'http://cimg.eu/download.shtml\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe751;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i5-tl">Download</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i17" onclick="dm.ItClk(this,\'\');cmn.href(\'http://cimg.eu/screenshots.shtml\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe758;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i17-tl">Screenshots</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i23" onclick="dm.ItClk(this,\'\');cmn.href(\'http://cimg.eu/reference/group__cimg__faq.html\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe729;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i23-tl">FAQ</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i24" onclick="dm.ItClk(this,\'\');cmn.href(\'http://cimg.eu/reference/group__cimg__tutorial.html\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe747;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i24-tl">Tutorial</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i6" onclick="dm.ItClk(this,\'\');cmn.href(\'http://cimg.eu/reference/index.html\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe727;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i6-tl">Documentation</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i7" onclick="dm.ItClk(this,\'\');cmn.href(\'https://github.com/dtschump/CImg/issues\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe73f;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i7-tl">Forum</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td><td onmouseover="dm.v(this,1);" onmouseout="dm.u(this);" id="mnFFAC7097_i8" onclick="dm.ItClk(this,\'\');cmn.href(\'http://cimg.eu/links.shtml\',\'\');" class="AE57MainMenuItemTD"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="AE57IconTD"><font class="MG_Icons">&#xe72d;</font></td><td class="AE57TitleTD" id="mnFFAC7097_i8-tl">Links</td><td class="AE57ArrowTD">&nbsp;</td></tr></table></td></tr></table></div>';cimgmenu.SubMnu='<div id="mnFFAC7097ifc"></div>';
        /**/
    },

    addEvent:function(el,evnt,func){
        try{
            if(el.addEventListener){
                el.addEventListener(evnt, func, false);
            }else if(el.attachEvent){
                el.attachEvent('on'+evnt, func);
            }
        }catch(e){}
    },

    GetDst:function(){
        var DstID=cimgmenu._div;
        if(DstID=='')DstID='cimgmenu';
        var Dst=cmn.Mko(DstID);
        return Dst;
    },

    PlaceAuto:function(p,d,sb){
        cimgmenu.Plcd=false;
        cimgmenu._path='';
        cimgmenu._div='';
        cimgmenu._SbMnu=false;
        if(p!=null&&p!=undefined&&p!=''){cimgmenu._path=p;}
        if(d!=null&&d!=undefined&&d!=''){cimgmenu._div=d;}
        if(sb==true){cimgmenu._SbMnu=true;}
        cimgmenu.Prepare();
        cimgmenu.addEvent(window,'load',cimgmenu.PutInDIV);
        cimgmenu.PutInDIV_TO(0);
    },

    PutInDIV_TO:function(t){
        var Dst=cimgmenu.GetDst();
        if(Dst==null||Dst==undefined){
            if(t<50){
                t++;
                setTimeout('cimgmenu.PutInDIV_TO('+t+');',50);
                return;
            }
        }else{
            cimgmenu.PutInDIV();
        }
    },

    PutInDIV:function(){
        if(cimgmenu.Plcd==true)return;
        var Dst=cimgmenu.GetDst();
        if(Dst==null||Dst==undefined){
            return;
        }

        if(cimgmenu._SbMnu==true){
            Dst.innerHTML=cimgmenu.Mnu+cimgmenu.SubMnu;
        }else{
            Dst.innerHTML=cimgmenu.Mnu;
            var Dv=document.createElement('DIV');
            Dv.innerHTML=cimgmenu.SubMnu;
            document.body.appendChild(Dv);
        }

        setTimeout('mnFFAC7097i()',10);
        cimgmenu.Plcd=true;
        var Mnu=cmn.Mko('mnFFAC7097_-0p');
        if(Mnu!=null){
            var ShMn=function(){
                Mnu.childNodes[0].style.visibility='visible';
            };
            setTimeout(ShMn,20);
        }
    },
    
    Show:function(){
        cimgmenu.Plcd=false;
        cimgmenu.Prepare();
        document.write(cimgmenu.Mnucimgmenu.SubMnu);
        setTimeout('mnFFAC7097i()',10);
        cimgmenu.Plcd=true;
    }

};
cimgmenu.PlaceAuto();
