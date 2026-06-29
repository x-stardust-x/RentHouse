import{a as Zt}from"./chunk-LUYOHYYM.js";import{b as ne,c as ae}from"./chunk-MQPWRJDA.js";import{a as ce}from"./chunk-4S3FSMG7.js";import{b as se,c as de}from"./chunk-ORYQ2MHD.js";import{f as ie,h as re,i as ht}from"./chunk-ZENUVJPE.js";import"./chunk-23HMX5JL.js";import"./chunk-7UYVL5WT.js";import{i as oe,j as et,o as _t}from"./chunk-3AJZFOUU.js";import{e as ut,k as Yt,n as Xt,s as Jt,u as te,v as ee}from"./chunk-2ZYXAZLY.js";import{a as qt}from"./chunk-S5I4I572.js";import"./chunk-R56AJZBV.js";import{a as Me}from"./chunk-JROR4JOP.js";import{a as pt,b as tt}from"./chunk-5NNRVGIZ.js";import{a as Kt}from"./chunk-2SA6672Q.js";import{a as Ut}from"./chunk-O5WUFD45.js";import{b as Gt,d as $t}from"./chunk-P2EQU5SH.js";import"./chunk-NZXWVCGV.js";import{Aa as St,Ab as ot,B as wt,C as Q,Cb as st,D as Mt,Db as dt,Eb as ct,Fb as b,Gb as r,H as Et,Hb as o,Ib as L,Jb as Ot,Jc as X,Kb as Ht,Mc as v,Nc as J,Pb as F,Q as Bt,R as W,Rb as g,S as At,T as O,Tb as h,Ub as P,Vb as I,Wb as Y,Xb as z,Ya as m,Yb as u,Zb as p,_ as G,_c as Vt,aa as D,bb as q,bc as lt,ca as l,cb as U,cc as Nt,d as we,dc as _,e as B,eb as it,ec as K,ed as Qt,fb as R,fc as s,g as Tt,gc as zt,ha as k,hb as Rt,hc as mt,i as V,ia as T,kd as Wt,la as at,lb as x,mb as Z,n as It,nb as f,ob as N,p as Dt,pa as C,pb as A,pc as j,qa as H,qb as Lt,qc as bt,sc as jt,wa as Pt,xa as $,xb as Ft,yb as w,za as S,zb as rt}from"./chunk-QSTXYQNA.js";var Ee=["*"];var Be=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],Ae=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],Pe=new D("MAT_CARD_CONFIG"),me=(()=>{class a{appearance;constructor(){let t=l(Pe,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=x({type:a,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(e,n){e&2&&_("mat-mdc-card-outlined",n.appearance==="outlined")("mdc-card--outlined",n.appearance==="outlined")("mat-mdc-card-filled",n.appearance==="filled")("mdc-card--filled",n.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:Ee,decls:1,vars:0,template:function(e,n){e&1&&(P(),I(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return a})(),be=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return a})();var ue=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return a})(),pe=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,selectors:[["mat-card-subtitle"],["","mat-card-subtitle",""],["","matCardSubtitle",""]],hostAttrs:[1,"mat-mdc-card-subtitle"]})}return a})(),he=(()=>{class a{align="start";static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(e,n){e&2&&_("mat-mdc-card-actions-align-end",n.align==="end")},inputs:{align:"align"},exportAs:["matCardActions"]})}return a})(),_e=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275cmp=x({type:a,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:Ae,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(e,n){e&1&&(P(Be),I(0),Ot(1,"div",0),I(2,1),Ht(),I(3,2))},encapsulation:2,changeDetection:0})}return a})();var fe=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275mod=Z({type:a});static \u0275inj=G({imports:[tt]})}return a})();var Ct=["*"];function Fe(a,d){a&1&&I(0)}var Oe=["tabListContainer"],He=["tabList"],Ne=["tabListInner"],ze=["nextPaginator"],je=["previousPaginator"],Ve=["content"];function Qe(a,d){}var We=["tabBodyWrapper"],Ge=["tabHeader"];function $e(a,d){}function qe(a,d){if(a&1&&A(0,$e,0,0,"ng-template",12),a&2){let t=h().$implicit;b("cdkPortalOutlet",t.templateLabel)}}function Ue(a,d){if(a&1&&s(0),a&2){let t=h().$implicit;zt(t.textLabel)}}function Ze(a,d){if(a&1){let t=F();r(0,"div",7,2),g("click",function(){let n=k(t),i=n.$implicit,c=n.$index,y=h(),E=lt(1);return T(y._handleClick(i,E,c))})("cdkFocusChange",function(n){let i=k(t).$index,c=h();return T(c._tabFocusChanged(n,i))}),L(2,"span",8)(3,"div",9),r(4,"span",10)(5,"span",11),rt(6,qe,1,1,null,12)(7,Ue,1,1),o()()()}if(a&2){let t=d.$implicit,e=d.$index,n=lt(1),i=h();K(t.labelClass),_("mdc-tab--active",i.selectedIndex===e),b("id",i._getTabLabelId(t,e))("disabled",t.disabled)("fitInkBarToContent",i.fitInkBarToContent),w("tabIndex",i._getTabIndex(e))("aria-posinset",e+1)("aria-setsize",i._tabs.length)("aria-controls",i._getTabContentId(e))("aria-selected",i.selectedIndex===e)("aria-label",t.ariaLabel||null)("aria-labelledby",!t.ariaLabel&&t.ariaLabelledby?t.ariaLabelledby:null),m(3),b("matRippleTrigger",n)("matRippleDisabled",t.disabled||i.disableRipple),m(3),ot(t.templateLabel?6:7)}}function Ye(a,d){a&1&&I(0)}function Ke(a,d){if(a&1){let t=F();r(0,"mat-tab-body",13),g("_onCentered",function(){k(t);let n=h();return T(n._removeTabBodyWrapperHeight())})("_onCentering",function(n){k(t);let i=h();return T(i._setTabBodyWrapperHeight(n))})("_beforeCentering",function(n){k(t);let i=h();return T(i._bodyCentered(n))}),o()}if(a&2){let t=d.$implicit,e=d.$index,n=h();K(t.bodyClass),b("id",n._getTabContentId(e))("content",t.content)("position",t.position)("animationDuration",n.animationDuration)("preserveContent",n.preserveContent),w("tabindex",n.contentTabIndex!=null&&n.selectedIndex===e?n.contentTabIndex:null)("aria-labelledby",n._getTabLabelId(t,e))("aria-hidden",n.selectedIndex!==e)}}var Xe=new D("MatTabContent"),Je=(()=>{class a{template=l(U);constructor(){}static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,selectors:[["","matTabContent",""]],features:[j([{provide:Xe,useExisting:a}])]})}return a})(),tn=new D("MatTabLabel"),Ce=new D("MAT_TAB"),en=(()=>{class a extends re{_closestTab=l(Ce,{optional:!0});static \u0275fac=(()=>{let t;return function(n){return(t||(t=$(a)))(n||a)}})();static \u0275dir=f({type:a,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[j([{provide:tn,useExisting:a}]),N]})}return a})(),xe=new D("MAT_TAB_GROUP"),xt=(()=>{class a{_viewContainerRef=l(Rt);_closestTabGroup=l(xe,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(t){this._setTemplateLabelInput(t)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new V;position=null;origin=null;isActive=!1;constructor(){l(Kt).load(oe)}ngOnChanges(t){(t.hasOwnProperty("textLabel")||t.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new ie(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(t){t&&t._closestTab===this&&(this._templateLabel=t)}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=x({type:a,selectors:[["mat-tab"]],contentQueries:function(e,n,i){if(e&1&&Y(i,en,5)(i,Je,7,U),e&2){let c;u(c=p())&&(n.templateLabel=c.first),u(c=p())&&(n._explicitContent=c.first)}},viewQuery:function(e,n){if(e&1&&z(U,7),e&2){let i;u(i=p())&&(n._implicitContent=i.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(e,n){e&2&&w("id",null)},inputs:{disabled:[2,"disabled","disabled",v],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[j([{provide:Ce,useExisting:a}]),Pt],ngContentSelectors:Ct,decls:1,vars:0,template:function(e,n){e&1&&(P(),Lt(0,Fe,1,0,"ng-template"))},encapsulation:2})}return a})(),ft="mdc-tab-indicator--active",ge="mdc-tab-indicator--no-transition",gt=class{_items;_currentItem;constructor(d){this._items=d}hide(){this._items.forEach(d=>d.deactivateInkBar()),this._currentItem=void 0}alignToElement(d){let t=this._items.find(n=>n.elementRef.nativeElement===d),e=this._currentItem;if(t!==e&&(e?.deactivateInkBar(),t)){let n=e?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(n),this._currentItem=t}}},nn=(()=>{class a{_elementRef=l(S);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(t){this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(t){let e=this._elementRef.nativeElement;if(!t||!e.getBoundingClientRect||!this._inkBarContentElement){e.classList.add(ft);return}let n=e.getBoundingClientRect(),i=t.width/n.width,c=t.left-n.left;e.classList.add(ge),this._inkBarContentElement.style.setProperty("transform",`translateX(${c}px) scaleX(${i})`),e.getBoundingClientRect(),e.classList.remove(ge),e.classList.add(ft),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(ft)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let t=this._elementRef.nativeElement.ownerDocument||document,e=this._inkBarElement=t.createElement("span"),n=this._inkBarContentElement=t.createElement("span");e.className="mdc-tab-indicator",n.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",e.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let t=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;t.appendChild(this._inkBarElement)}static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",v]}})}return a})();var ke=(()=>{class a extends nn{elementRef=l(S);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let t;return function(n){return(t||(t=$(a)))(n||a)}})();static \u0275dir=f({type:a,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(e,n){e&2&&(w("aria-disabled",!!n.disabled),_("mat-mdc-tab-disabled",n.disabled))},inputs:{disabled:[2,"disabled","disabled",v]},features:[N]})}return a})(),ve={passive:!0},an=650,rn=100,on=(()=>{class a{_elementRef=l(S);_changeDetectorRef=l(X);_viewportRuler=l(ae);_dir=l(pt,{optional:!0});_ngZone=l(H);_platform=l(ut);_sharedResizeObserver=l(ce);_injector=l(at);_renderer=l(it);_animationsDisabled=et();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new V;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new V;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){let e=isNaN(t)?0:t;this._selectedIndex!=e&&(this._selectedIndexChanged=!0,this._selectedIndex=e,this._keyManager&&this._keyManager.updateActiveItem(e))}_selectedIndex=0;selectFocusedIndex=new C;indexFocused=new C;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),ve),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),ve))}ngAfterContentInit(){let t=this._dir?this._dir.change:Dt("ltr"),e=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Et(32),O(this._destroyed)),n=this._viewportRuler.change(150).pipe(O(this._destroyed)),i=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new te(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),q(i,{injector:this._injector}),Q(t,n,e,this._items.changes,this._itemsResized()).pipe(O(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),i()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(c=>{this.indexFocused.emit(c),this._setTabFocus(c)})}_itemsResized(){return typeof ResizeObserver!="function"?It:this._items.changes.pipe(W(this._items),At(t=>new Tt(e=>this._ngZone.runOutsideAngular(()=>{let n=new ResizeObserver(i=>e.next(i));return t.forEach(i=>n.observe(i.elementRef.nativeElement)),()=>{n.disconnect()}}))),Bt(1),Mt(t=>t.some(e=>e.contentRect.width>0&&e.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!Jt(t))switch(t.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let e=this._items.get(this.focusIndex);e&&!e.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager?.onKeydown(t)}}_onContentChanges(){let t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return this._items?!!this._items.toArray()[t]:!0}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();let e=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?e.scrollLeft=0:e.scrollLeft=e.scrollWidth-e.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let t=this.scrollDistance,e=this._getLayoutDirection()==="ltr"?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(e)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){let e=this._tabListContainer.nativeElement.offsetWidth,n=(t=="before"?-1:1)*e/3;return this._scrollTo(this._scrollDistance+n)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;let e=this._items?this._items.toArray()[t]:null;if(!e)return;let n=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:i,offsetWidth:c}=e.elementRef.nativeElement,y,E;this._getLayoutDirection()=="ltr"?(y=i,E=y+c):(E=this._tabListInner.nativeElement.offsetWidth-i,y=E-c);let nt=this.scrollDistance,kt=this.scrollDistance+n;y<nt?this.scrollDistance-=nt-y:E>kt&&(this.scrollDistance+=Math.min(E-kt,y-nt))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let t=this._tabListInner.nativeElement.scrollWidth,e=this._elementRef.nativeElement.offsetWidth,n=t-e>=5;n||(this.scrollDistance=0),n!==this._showPaginationControls&&(this._showPaginationControls=n,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let t=this._tabListInner.nativeElement.scrollWidth,e=this._tabListContainer.nativeElement.offsetWidth;return t-e||0}_alignInkBarToSelectedTab(){let t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,e=t?t.elementRef.nativeElement:null;e?this._inkBar.alignToElement(e):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,e){e&&e.button!=null&&e.button!==0||(this._stopInterval(),wt(an,rn).pipe(O(Q(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:n,distance:i}=this._scrollHeader(t);(i===0||i>=n)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let e=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(e,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:e,distance:this._scrollDistance}}static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,inputs:{disablePagination:[2,"disablePagination","disablePagination",v],selectedIndex:[2,"selectedIndex","selectedIndex",J]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return a})(),sn=(()=>{class a extends on{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new gt(this._items),super.ngAfterContentInit()}_itemSelected(t){t.preventDefault()}static \u0275fac=(()=>{let t;return function(n){return(t||(t=$(a)))(n||a)}})();static \u0275cmp=x({type:a,selectors:[["mat-tab-header"]],contentQueries:function(e,n,i){if(e&1&&Y(i,ke,4),e&2){let c;u(c=p())&&(n._items=c)}},viewQuery:function(e,n){if(e&1&&z(Oe,7)(He,7)(Ne,7)(ze,5)(je,5),e&2){let i;u(i=p())&&(n._tabListContainer=i.first),u(i=p())&&(n._tabList=i.first),u(i=p())&&(n._tabListInner=i.first),u(i=p())&&(n._nextPaginator=i.first),u(i=p())&&(n._previousPaginator=i.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(e,n){e&2&&_("mat-mdc-tab-header-pagination-controls-enabled",n._showPaginationControls)("mat-mdc-tab-header-rtl",n._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",v]},features:[N],ngContentSelectors:Ct,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(e,n){e&1&&(P(),r(0,"div",5,0),g("click",function(){return n._handlePaginatorClick("before")})("mousedown",function(c){return n._handlePaginatorPress("before",c)})("touchend",function(){return n._stopInterval()}),L(2,"div",6),o(),r(3,"div",7,1),g("keydown",function(c){return n._handleKeydown(c)}),r(5,"div",8,2),g("cdkObserveContent",function(){return n._onContentChanges()}),r(7,"div",9,3),I(9),o()()(),r(10,"div",10,4),g("mousedown",function(c){return n._handlePaginatorPress("after",c)})("click",function(){return n._handlePaginatorClick("after")})("touchend",function(){return n._stopInterval()}),L(12,"div",6),o()),e&2&&(_("mat-mdc-tab-header-pagination-disabled",n._disableScrollBefore),b("matRippleDisabled",n._disableScrollBefore||n.disableRipple),m(3),_("_mat-animation-noopable",n._animationsDisabled),m(2),w("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby||null),m(5),_("mat-mdc-tab-header-pagination-disabled",n._disableScrollAfter),b("matRippleDisabled",n._disableScrollAfter||n.disableRipple))},dependencies:[_t,Xt],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--mat-tab-divider-height, 1px);
  border-top-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2})}return a})(),dn=new D("MAT_TABS_CONFIG"),ye=(()=>{class a extends ht{_host=l(vt);_ngZone=l(H);_centeringSub=B.EMPTY;_leavingSub=B.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(W(this._host._isCenterPosition())).subscribe(t=>{this._host._content&&t&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(e){return new(e||a)};static \u0275dir=f({type:a,selectors:[["","matTabBodyHost",""]],features:[N]})}return a})(),vt=(()=>{class a{_elementRef=l(S);_dir=l(pt,{optional:!0});_ngZone=l(H);_injector=l(at);_renderer=l(it);_diAnimationsDisabled=et();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=B.EMPTY;_position;_previousPosition;_onCentering=new C;_beforeCentering=new C;_afterLeavingCenter=new C;_onCentered=new C(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(t){this._positionIndex=t,this._computePositionAnimationState()}constructor(){if(this._dir){let t=l(X);this._dirChangeSubscription=this._dir.change.subscribe(e=>{this._computePositionAnimationState(e),t.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),q(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(t=>t()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let t=this._elementRef.nativeElement,e=n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),n.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(t,"transitionstart",n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(t,"transitionend",e),this._renderer.listen(t,"transitioncancel",e)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let t=this._position==="center";this._beforeCentering.emit(t),t&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(t){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",t)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(t=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=t=="ltr"?"left":"right":this._positionIndex>0?this._position=t=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),q(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=x({type:a,selectors:[["mat-tab-body"]],viewQuery:function(e,n){if(e&1&&z(ye,5)(Ve,5),e&2){let i;u(i=p())&&(n._portalHost=i.first),u(i=p())&&(n._contentElement=i.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(e,n){e&2&&w("inert",n._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(e,n){e&1&&(r(0,"div",1,0),A(2,Qe,0,0,"ng-template",2),o()),e&2&&_("mat-tab-body-content-left",n._position==="left")("mat-tab-body-content-right",n._position==="right")("mat-tab-body-content-can-animate",n._position==="center"||n._previousPosition==="center")},dependencies:[ye,ne],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--mat-tab-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2})}return a})(),Te=(()=>{class a{_elementRef=l(S);_changeDetectorRef=l(X);_ngZone=l(H);_tabsSubscription=B.EMPTY;_tabLabelSubscription=B.EMPTY;_tabBodySubscription=B.EMPTY;_diAnimationsDisabled=et();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new St;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(t){this._fitInkBarToContent=t,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){this._indexToSelect=isNaN(t)?null:t}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(t){let e=t+"";this._animationDuration=/^\d+$/.test(e)?t+"ms":e}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(t){this._contentTabIndex=isNaN(t)?null:t}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(t){let e=this._elementRef.nativeElement.classList;e.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&e.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new C;focusChange=new C;animationDone=new C;selectedTabChange=new C(!0);_groupId;_isServer=!l(ut).isBrowser;constructor(){let t=l(dn,{optional:!0});this._groupId=l(ee).getId("mat-tab-group-"),this.animationDuration=t&&t.animationDuration?t.animationDuration:"500ms",this.disablePagination=t&&t.disablePagination!=null?t.disablePagination:!1,this.dynamicHeight=t&&t.dynamicHeight!=null?t.dynamicHeight:!1,t?.contentTabIndex!=null&&(this.contentTabIndex=t.contentTabIndex),this.preserveContent=!!t?.preserveContent,this.fitInkBarToContent=t&&t.fitInkBarToContent!=null?t.fitInkBarToContent:!1,this.stretchTabs=t&&t.stretchTabs!=null?t.stretchTabs:!0,this.alignTabs=t&&t.alignTabs!=null?t.alignTabs:null}ngAfterContentChecked(){let t=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=t){let e=this._selectedIndex==null;if(!e){this.selectedTabChange.emit(this._createChangeEvent(t));let n=this._tabBodyWrapper.nativeElement;n.style.minHeight=n.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((n,i)=>n.isActive=i===t),e||(this.selectedIndexChange.emit(t),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((e,n)=>{e.position=n-t,this._selectedIndex!=null&&e.position==0&&!e.origin&&(e.origin=t-this._selectedIndex)}),this._selectedIndex!==t&&(this._selectedIndex=t,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let t=this._clampTabIndex(this._indexToSelect);if(t===this._selectedIndex){let e=this._tabs.toArray(),n;for(let i=0;i<e.length;i++)if(e[i].isActive){this._indexToSelect=this._selectedIndex=i,this._lastFocusedTabIndex=null,n=e[i];break}!n&&e[t]&&Promise.resolve().then(()=>{e[t].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(t))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(W(this._allTabs)).subscribe(t=>{this._tabs.reset(t.filter(e=>e._closestTabGroup===this||!e._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(t){let e=this._tabHeader;e&&(e.focusIndex=t)}_focusChanged(t){this._lastFocusedTabIndex=t,this.focusChange.emit(this._createChangeEvent(t))}_createChangeEvent(t){let e=new yt;return e.index=t,this._tabs&&this._tabs.length&&(e.tab=this._tabs.toArray()[t]),e}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Q(...this._tabs.map(t=>t._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(t){return Math.min(this._tabs.length-1,Math.max(t||0,0))}_getTabLabelId(t,e){return t.id||`${this._groupId}-label-${e}`}_getTabContentId(t){return`${this._groupId}-content-${t}`}_setTabBodyWrapperHeight(t){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=t;return}let e=this._tabBodyWrapper.nativeElement;e.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(e.style.height=t+"px")}_removeTabBodyWrapperHeight(){let t=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=t.clientHeight,t.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(t,e,n){e.focusIndex=n,t.disabled||(this.selectedIndex=n)}_getTabIndex(t){let e=this._lastFocusedTabIndex??this.selectedIndex;return t===e?0:-1}_tabFocusChanged(t,e){t&&t!=="mouse"&&t!=="touch"&&(this._tabHeader.focusIndex=e)}_bodyCentered(t){t&&this._tabBodies?.forEach((e,n)=>e._setActiveClass(n===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=x({type:a,selectors:[["mat-tab-group"]],contentQueries:function(e,n,i){if(e&1&&Y(i,xt,5),e&2){let c;u(c=p())&&(n._allTabs=c)}},viewQuery:function(e,n){if(e&1&&z(We,5)(Ge,5)(vt,5),e&2){let i;u(i=p())&&(n._tabBodyWrapper=i.first),u(i=p())&&(n._tabHeader=i.first),u(i=p())&&(n._tabBodies=i)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(e,n){e&2&&(w("mat-align-tabs",n.alignTabs),K("mat-"+(n.color||"primary")),Nt("--mat-tab-animation-duration",n.animationDuration),_("mat-mdc-tab-group-dynamic-height",n.dynamicHeight)("mat-mdc-tab-group-inverted-header",n.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",n.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",v],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",v],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",v],selectedIndex:[2,"selectedIndex","selectedIndex",J],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",J],disablePagination:[2,"disablePagination","disablePagination",v],disableRipple:[2,"disableRipple","disableRipple",v],preserveContent:[2,"preserveContent","preserveContent",v],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[j([{provide:xe,useExisting:a}])],ngContentSelectors:Ct,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(e,n){e&1&&(P(),r(0,"mat-tab-header",3,0),g("indexFocused",function(c){return n._focusChanged(c)})("selectFocusedIndex",function(c){return n.selectedIndex=c}),dt(2,Ze,8,17,"div",4,st),o(),rt(4,Ye,1,0),r(5,"div",5,1),dt(7,Ke,1,10,"mat-tab-body",6,st),o()),e&2&&(b("selectedIndex",n.selectedIndex||0)("disableRipple",n.disableRipple)("disablePagination",n.disablePagination),Ft("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby),m(2),ct(n._tabs),m(2),ot(n._isServer?4:-1),m(),_("_mat-animation-noopable",n._animationsDisabled()),m(2),ct(n._tabs))},dependencies:[sn,ke,Yt,_t,ht,vt],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2})}return a})(),yt=class{index;tab};var Ie=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275mod=Z({type:a});static \u0275inj=G({imports:[tt]})}return a})();var M=we(Me());var ln=()=>({label:"\u9996\u9801",link:"/home"}),mn=()=>({label:"\u6703\u54E1\u65B9\u6848"}),bn=(a,d)=>[a,d];function un(a,d){a&1&&(r(0,"button",19),s(1," \u60A8\u76EE\u524D\u7684\u65B9\u6848 "),o())}function pn(a,d){if(a&1){let t=F();r(0,"button",22),g("click",function(){k(t);let n=h();return T(n.onUpgrade(2))}),s(1),o()}if(a&2){let t=h();b("disabled",t.isLoading),m(),mt(" ",t.isLoading?"\u8655\u7406\u4E2D...":"\u5347\u7D1A\u9032\u968E\u6703\u54E1"," ")}}function hn(a,d){a&1&&(r(0,"button",19),s(1," \u60A8\u76EE\u524D\u7684\u65B9\u6848 "),o())}function _n(a,d){if(a&1){let t=F();r(0,"button",22),g("click",function(){k(t);let n=h();return T(n.onUpgrade(3))}),s(1),o()}if(a&2){let t=h();b("disabled",t.isLoading),m(),mt(" ",t.isLoading?"\u8655\u7406\u4E2D...":"\u5347\u7D1A\u5C0A\u69AE VIP"," ")}}function fn(a,d){a&1&&(r(0,"button",23),s(1," \u60A8\u5DF2\u662F\u6700\u9AD8\u7D1A VIP "),o())}var De=class a{constructor(d,t,e,n,i){this.authService=d;this.http=t;this.route=e;this.router=n;this.userService=i}currentTier=1;isLoading=!1;ngOnInit(){let d=localStorage.getItem("subscriptionTier");d&&(this.currentTier=parseInt(d,10)),this.route.queryParams.subscribe(t=>{if(t.status==="success"&&t.tier){let e=parseInt(t.tier,10);console.log("\u{1F50D} \u6E2C\u8A66\uFF1AuserId \u6293\u5230\u7684\u662F ->",localStorage.getItem("userId")),console.log("\u{1F50D} \u6E2C\u8A66\uFF1AaccountId \u6293\u5230\u7684\u662F ->",localStorage.getItem("accountId"));let n=Number(localStorage.getItem("userId"));n?this.userService.upgradeUserTier(n,e).subscribe({next:i=>{console.log("\u8CC7\u6599\u5EAB\u5347\u7D1A\u5B8C\u6210\uFF1A",i),this.currentTier=e,localStorage.setItem("subscriptionTier",e.toString()),M.default.fire({title:"\u4ED8\u6B3E\u6210\u529F\uFF01",text:"\u{1F389} \u7DA0\u754C\u6388\u6B0A\u6210\u529F\uFF01\u60A8\u7684 VIP \u6B0A\u9650\u5DF2\u5168\u9762\u89E3\u9396\uFF01",icon:"success",confirmButtonColor:"#4caf50",confirmButtonText:"\u958B\u59CB\u9AD4\u9A57"}).then(()=>{this.router.navigate(["/subscription"])})},error:i=>{console.error("\u8CC7\u6599\u5EAB\u66F4\u65B0\u5931\u6557\uFF1A",i),M.default.fire("\u932F\u8AA4","\u91D1\u6D41\u5DF2\u6388\u6B0A\uFF0C\u4F46\u958B\u901A\u6B0A\u9650\u6642\u767C\u751F\u7570\u5E38\uFF0C\u8ACB\u806F\u7D61\u5BA2\u670D\u3002","error")}}):M.default.fire({title:"\u627E\u4E0D\u5230\u6703\u54E1 ID",text:"\u91D1\u6D41\u5DF2\u6388\u6B0A\uFF0C\u4F46\u7121\u6CD5\u66F4\u65B0\u8CC7\u6599\u5EAB\u3002\u8ACB\u6309 F12 \u6AA2\u67E5 LocalStorage \u6B04\u4F4D\u540D\u7A31\u662F\u5426\u6B63\u78BA\uFF01",icon:"warning"})}})}onUpgrade(d){let t=d===2?"199":"299",e=d===2?"\u9032\u968E\u6703\u54E1":"\u5C0A\u69AE VIP";M.default.fire({title:"\u78BA\u8A8D\u5347\u7D1A\u65B9\u6848",html:`\u5373\u5C07\u524D\u5F80\u7DA0\u754C\u79D1\u6280\u652F\u4ED8 <b>NT$${t}</b> \u5347\u7D1A\u300C<b>${e}</b>\u300D<br>\u78BA\u8A8D\u7E7C\u7E8C\u55CE\uFF1F`,icon:"question",showCancelButton:!0,confirmButtonColor:"#e91e63",cancelButtonColor:"#999",confirmButtonText:"\u524D\u5F80\u7D50\u5E33",cancelButtonText:"\u53D6\u6D88",reverseButtons:!0}).then(n=>{n.isConfirmed&&(this.isLoading=!0,this.http.post(`https://localhost:7215/api/payment/ecpay-checkout?tier=${d}`,{}).subscribe({next:i=>{let c=document.createElement("div");c.innerHTML=i.form,document.body.appendChild(c);let y=document.getElementById("ecpayForm");y&&y.submit(),this.isLoading=!1},error:i=>{M.default.fire({title:"\u8A02\u55AE\u7522\u751F\u5931\u6557",text:"\u76EE\u524D\u7121\u6CD5\u9023\u7DDA\u5230\u7DA0\u754C\u91D1\u6D41\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002",icon:"error",confirmButtonColor:"#e91e63"}),this.isLoading=!1}}))})}onUpgradeMerchant(){M.default.fire({title:"\u5347\u7D1A\u8A8D\u8B49\u5546\u6236",text:"\u78BA\u5B9A\u8981\u82B1\u8CBB NT$499 \u8A3B\u518A\u6210\u70BA\u300C\u8A8D\u8B49\u5546\u6236\u300D\u55CE\uFF1F ",icon:"info",showCancelButton:!0,confirmButtonColor:"#1976d2",cancelButtonColor:"#999",confirmButtonText:"\u78BA\u5B9A\u5347\u7D1A",cancelButtonText:"\u53D6\u6D88",reverseButtons:!0}).then(d=>{d.isConfirmed&&(this.isLoading=!0,setTimeout(()=>{this.isLoading=!1,M.default.fire({title:"\u5347\u7D1A\u6210\u529F\uFF01",text:" \u606D\u559C\uFF01\u60A8\u5DF2\u6210\u529F\u5347\u7D1A\u70BA\u300C\u8A8D\u8B49\u5546\u6236\u300D\uFF0C\u89E3\u9396\u7121\u9650\u4EF6\u6578\u520A\u767B\u8207\u9632\u8DF3\u55AE\u7279\u6B0A\uFF01",icon:"success",confirmButtonColor:"#2e7d32",confirmButtonText:"\u958B\u59CB\u520A\u767B\u7269\u4EF6"})},800))})}static \u0275fac=function(t){return new(t||a)(R(qt),R(Wt),R(Gt),R($t),R(Zt))};static \u0275cmp=x({type:a,selectors:[["app-subscription"]],decls:110,vars:11,consts:[["eyebrow","Pricing Plan","title","\u6703\u54E1\u65B9\u6848",3,"breadcrumbs"],[1,"pricing-page"],[1,"pricing-header"],["mat-stretch-tabs","false","mat-align-tabs","center",1,"custom-tab-group"],["label","\u6211\u662F\u627F\u79DF\u4EBA"],[1,"cards-wrapper","cards-wrapper--tenant"],[1,"pricing-card","basic-card"],[1,"feature-list"],[1,"locked"],[1,"card-action"],["mat-stroked-button","","disabled","",4,"ngIf"],[1,"pricing-card","pro-card"],["mat-raised-button","","class","upgrade-btn",3,"disabled","click",4,"ngIf"],[1,"pricing-card","vip-card"],[1,"plan-badge"],[1,"highlight"],["mat-flat-button","","disabled","",4,"ngIf"],["label","\u6211\u662F\u51FA\u79DF\u4EBA"],[1,"cards-wrapper","cards-wrapper--lessor"],["mat-stroked-button","","disabled",""],[1,"pricing-card","vip-card","merchant-card"],["mat-raised-button","",1,"upgrade-btn",3,"click"],["mat-raised-button","",1,"upgrade-btn",3,"click","disabled"],["mat-flat-button","","disabled",""]],template:function(t,e){t&1&&(L(0,"app-page-hero",0),r(1,"div",1)(2,"div",2)(3,"h2"),s(4,"\u5347\u7D1A\u60A8\u7684\u539A\u539D\u5473\u9AD4\u9A57"),o(),r(5,"p"),s(6,"\u7121\u8AD6\u60A8\u662F\u5C0B\u627E\u597D\u623F\uFF0C\u9084\u662F\u51FA\u79DF\u611B\u5C4B\uFF0C\u6211\u5011\u90FD\u6709\u6700\u9069\u5408\u7684\u65B9\u6848\u3002"),o()(),r(7,"mat-tab-group",3)(8,"mat-tab",4)(9,"div",5)(10,"mat-card",6)(11,"mat-card-header")(12,"mat-card-title"),s(13,"\u4E00\u822C\u627F\u79DF\u4EBA"),o(),r(14,"mat-card-subtitle"),s(15,"\u514D\u8CBB / \u6708"),o()(),r(16,"mat-card-content")(17,"ul",7)(18,"li"),s(19,"\u700F\u89BD\u6240\u6709\u516C\u958B\u623F\u5C4B\u8CC7\u8A0A"),o(),r(20,"li"),s(21,"\u67E5\u770B\u4E00\u822C\u6703\u54E1\u8A55\u50F9"),o(),r(22,"li"),s(23,"\u652F\u63F4\u55AE\u6B21\u4ED8\u8CBB\u8A31\u9858\u6C60\u7F6E\u9802"),o(),r(24,"li",8),s(25,"AI \u667A\u6167\u5C0B\u5C4B\u914D\u5C0D"),o(),r(26,"li",8),s(27,"\u512A\u5148\u63A8\u64AD\u96B1\u85CF\u7248\u597D\u623F"),o()()(),r(28,"mat-card-actions",9),A(29,un,2,0,"button",10),o()(),r(30,"mat-card",11)(31,"mat-card-header")(32,"mat-card-title"),s(33,"\u9032\u968E\u6703\u54E1"),o(),r(34,"mat-card-subtitle"),s(35,"NT$ 199 / \u6708"),o()(),r(36,"mat-card-content")(37,"ul",7)(38,"li"),s(39,"\u5305\u542B\u514D\u8CBB\u7248\u6240\u6709\u529F\u80FD"),o(),r(40,"li"),s(41,"\u6BCF\u6708 3 \u6B21\u514D\u8CBB\u8A31\u9858\u6C60\u66DD\u5149"),o(),r(42,"li"),s(43,"\u512A\u5148\u63A8\u64AD\u96B1\u85CF\u7248\u597D\u623F"),o(),r(44,"li",8),s(45,"AI \u667A\u6167\u914D\u5C0D"),o()()(),r(46,"mat-card-actions",9),A(47,pn,2,2,"button",12)(48,hn,2,0,"button",10),o()(),r(49,"mat-card",13)(50,"div",14),s(51,"\u6700\u5212\u7B97\u63A8\u85A6"),o(),r(52,"mat-card-header")(53,"mat-card-title"),s(54,"\u5C0A\u69AE VIP"),o(),r(55,"mat-card-subtitle"),s(56,"NT$ 299 / \u6708"),o()(),r(57,"mat-card-content")(58,"ul",7)(59,"li"),s(60,"\u5305\u542B\u9032\u968E\u6703\u54E1\u6240\u6709\u529F\u80FD"),o(),r(61,"li",15),s(62,"AI \u667A\u6167\u914D\u5C0D"),o(),r(63,"li",15),s(64,"\u6BCF\u6708 3 \u6B21\u8A31\u9858\u6C60\u9EC3\u91D1\u66DD\u5149"),o(),r(65,"li",15),s(66,"\u512A\u5148\u63A8\u64AD\u96B1\u85CF\u7248\u597D\u623F"),o()()(),r(67,"mat-card-actions",9),A(68,_n,2,2,"button",12)(69,fn,2,0,"button",16),o()()()(),r(70,"mat-tab",17)(71,"div",18)(72,"mat-card",6)(73,"mat-card-header")(74,"mat-card-title"),s(75,"\u500B\u4EBA\u51FA\u79DF\u4EBA"),o(),r(76,"mat-card-subtitle"),s(77,"\u514D\u8CBB / \u6C38\u4E45"),o()(),r(78,"mat-card-content")(79,"ul",7)(80,"li"),s(81,"\u500B\u4EBA 1 \u4EF6\u514D\u8CBB\u520A\u767B"),o(),r(82,"li"),s(83,"\u57FA\u672C\u7269\u4EF6\u66DD\u5149\u8207\u79DF\u5BA2\u5A92\u5408"),o(),r(84,"li",8),s(85,"\u520A\u767B\u7B2C 2 \u4EF6\u4EE5\u4E0A\u7269\u4EF6"),o(),r(86,"li",8),s(87,"\u514D\u75AB\u7DDA\u4E0B\u8DF3\u55AE\u4FDD\u8B77\u6A5F\u5236"),o()()(),r(88,"mat-card-actions",9)(89,"button",19),s(90,"\u9810\u8A2D\u65B9\u6848"),o()()(),r(91,"mat-card",20)(92,"div",14),s(93,"\u9650\u6642\u512A\u60E0"),o(),r(94,"mat-card-header")(95,"mat-card-title"),s(96,"\u8A8D\u8B49\u5546\u6236"),o(),r(97,"mat-card-subtitle"),s(98,"NT$ 499 / \u6708"),o()(),r(99,"mat-card-content")(100,"ul",7)(101,"li",15),s(102,"2 \u4EF6\u4EE5\u4E0A\u8996\u70BA\u5546\u6236\uFF0C\u7121\u9650\u4EF6\u6578\u520A\u767B"),o(),r(103,"li",15),s(104,"\u514D\u75AB\u7DDA\u4E0B\u8DF3\u55AE\u4FDD\u8B77\u6A5F\u5236"),o(),r(105,"li",15),s(106,"\u5E73\u53F0\u4E0A\u7DDA\u524D\u534A\u5E74\u52A0\u8D08 3 \u500B\u6708\u514D\u8CBB\u9AD4\u9A57"),o()()(),r(107,"mat-card-actions",9)(108,"button",21),g("click",function(){return e.onUpgradeMerchant()}),s(109," \u8A3B\u518A\u5546\u6236\u4EAB\u512A\u60E0 "),o()()()()()()()),t&2&&(b("breadcrumbs",jt(8,bn,bt(6,ln),bt(7,mn))),m(29),b("ngIf",e.currentTier===1),m(18),b("ngIf",e.currentTier<2),m(),b("ngIf",e.currentTier===2),m(20),b("ngIf",e.currentTier<3),m(),b("ngIf",e.currentTier>=3))},dependencies:[Qt,Vt,fe,me,he,ue,_e,pe,be,de,se,Ie,xt,Te,Ut],styles:['@charset "UTF-8";.pricing-page[_ngcontent-%COMP%]{width:min(1120px,100% - 48px);margin:0 auto;padding:56px 0 88px}.pricing-header[_ngcontent-%COMP%]{margin-bottom:28px;text-align:center}.pricing-header[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%]{margin-bottom:.4rem;color:var(--color-primary, #e66f43);font-size:.9rem;font-weight:800}.pricing-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:.75rem;color:#2f2926;font-size:clamp(2rem,4vw,2.8rem);font-weight:800}.pricing-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#8a817c;line-height:1.8}.custom-tab-group[_ngcontent-%COMP%]{margin-top:24px}.cards-wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem;padding:36px 0 12px}.cards-wrapper--lessor[_ngcontent-%COMP%]{max-width:760px;margin:0 auto;grid-template-columns:repeat(2,minmax(0,1fr))}.pricing-card[_ngcontent-%COMP%]{position:relative;min-height:420px;padding:1.25rem;border:1px solid rgba(230,111,67,.14);border-radius:16px!important;background:#fff;box-shadow:0 12px 32px #402d240f;display:flex!important;flex-direction:column;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}.pricing-card[_ngcontent-%COMP%]:hover{transform:translateY(-4px);border-color:#e66f4352;box-shadow:0 18px 42px #402d241a}.pro-card[_ngcontent-%COMP%], .vip-card[_ngcontent-%COMP%], .merchant-card[_ngcontent-%COMP%]{border-color:#e66f4361;background:linear-gradient(180deg,#fffaf7,#fff)}.vip-card[_ngcontent-%COMP%]{transform:translateY(-8px);box-shadow:0 18px 42px #e66f4324}.vip-card[_ngcontent-%COMP%]:hover{transform:translateY(-12px)}.plan-badge[_ngcontent-%COMP%]{position:absolute;top:-13px;right:20px;padding:.35rem .8rem;border-radius:999px;background:var(--color-primary, #e66f43);color:#fff;font-size:.8rem;font-weight:800;box-shadow:0 10px 22px #e66f433d}mat-card-header[_ngcontent-%COMP%]{margin-bottom:1rem}mat-card-title[_ngcontent-%COMP%]{color:#2f2926;font-size:1.35rem;font-weight:800}mat-card-subtitle[_ngcontent-%COMP%]{color:var(--color-primary, #e66f43);font-size:1.05rem;font-weight:800}mat-card-content[_ngcontent-%COMP%]{flex:1}.feature-list[_ngcontent-%COMP%]{list-style:none;margin:1.5rem 0 0;padding:0;text-align:left;display:grid;gap:.9rem}.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{position:relative;padding-left:1.65rem;color:#5f5650;line-height:1.65}.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"\\2713";position:absolute;left:0;top:0;color:var(--color-primary, #e66f43);font-weight:900}.feature-list[_ngcontent-%COMP%]   .locked[_ngcontent-%COMP%]{color:#aaa19b;text-decoration:line-through}.feature-list[_ngcontent-%COMP%]   .locked[_ngcontent-%COMP%]:before{content:"\\d7";color:#aaa19b}.feature-list[_ngcontent-%COMP%]   .highlight[_ngcontent-%COMP%]{color:#b75a2f;font-weight:800}.card-action[_ngcontent-%COMP%]{padding-top:1.5rem}.upgrade-btn[_ngcontent-%COMP%]{width:100%;min-height:44px;border-radius:999px;background:var(--color-primary, #e66f43)!important;color:#fff!important;font-weight:800;box-shadow:0 10px 22px #e66f4338}.upgrade-btn[_ngcontent-%COMP%]:hover{background:var(--color-primary-hover, #ce5b30)!important}  .mat-mdc-tab-labels{justify-content:center;gap:.5rem}  .mat-mdc-tab .mdc-tab__text-label{color:#7a6f69;font-weight:800}  .mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:var(--color-primary, #e66f43)}  .mat-mdc-tab-group.mat-primary .mat-mdc-tab-header-pagination,   .mat-mdc-tab-group.mat-primary .mdc-tab-indicator__content--underline{border-color:var(--color-primary, #e66f43)}@media(max-width:992px){.cards-wrapper[_ngcontent-%COMP%], .cards-wrapper--lessor[_ngcontent-%COMP%]{grid-template-columns:1fr;max-width:420px}.vip-card[_ngcontent-%COMP%]{transform:none}.vip-card[_ngcontent-%COMP%]:hover{transform:translateY(-4px)}}@media(max-width:768px){.pricing-page[_ngcontent-%COMP%]{width:min(100% - 32px,1120px);padding:40px 0 64px}}']})};export{De as SubscriptionComponent};
