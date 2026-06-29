import{a as fe}from"./chunk-ODDX5WCR.js";import{a as Mt,b as Et}from"./chunk-LK3WGKVT.js";import{a as kt}from"./chunk-YPOVYBTR.js";import{f as bt,i as xt,j as vt}from"./chunk-ZENUVJPE.js";import"./chunk-I3ZNLDCE.js";import{a as yt}from"./chunk-7UYVL5WT.js";import{i as pe,j as ge,k as Re,n as Ct,o as Ae}from"./chunk-3AJZFOUU.js";import{e as me,j as ut,s as pt,u as gt,v as ne}from"./chunk-2ZYXAZLY.js";import{a as Ht}from"./chunk-JROR4JOP.js";import{a as ft,b as ue}from"./chunk-5NNRVGIZ.js";import{a as _e}from"./chunk-2SA6672Q.js";import{a as Ie,c as rt,g as ot,j as st,m as lt,p as dt,q as ct,r as ht,w as mt}from"./chunk-DBU2D5KL.js";import{a as _t}from"./chunk-O5WUFD45.js";import{d as it,e as at}from"./chunk-P2EQU5SH.js";import"./chunk-NZXWVCGV.js";import{Aa as Qe,Ab as v,Bb as se,Bc as he,C as We,D as $,Db as G,Dc as Je,Eb as Y,Fb as C,Gb as i,Hb as o,I as ze,Ib as f,Jb as le,Jc as B,K as He,Kb as Me,Lb as Ge,Mc as w,Nc as P,Oc as et,Pb as Ye,R as xe,Rb as h,Tb as d,Ua as Ce,Ub as J,Vb as O,Wb as ee,Xb as te,Y as ve,Ya as c,Yb as E,Zb as k,_ as X,a as ie,aa as I,b as ae,ca as _,cb as $e,cc as de,cd as tt,d as zt,dc as R,e as re,eb as Z,ec as Ee,ed as nt,fb as ye,fc as s,gc as ce,ha as p,hb as Ze,hc as S,i as z,ia as g,ja as Xe,kc as N,lb as U,lc as L,ma as je,mb as q,mc as W,n as Le,nb as F,ob as K,pa as T,pb as Ke,pc as A,qa as j,qc as ke,sc as we,tc as Te,ua as M,uc as Se,wa as oe,xa as qe,yb as V,za as H,zb as x}from"./chunk-QSTXYQNA.js";var Xt=["knob"],jt=["valueIndicatorContainer"];function qt(a,l){if(a&1&&(i(0,"div",2,1)(2,"div",5)(3,"span",6),s(4),o()()()),a&2){let e=d();c(4),ce(e.valueIndicatorText)}}var Qt=["trackActive"],$t=["*"];function Zt(a,l){if(a&1&&f(0,"div"),a&2){let e=l.$implicit,t=l.$index,n=d(3);Ee(e===0?"mdc-slider__tick-mark--active":"mdc-slider__tick-mark--inactive"),de("transform",n._calcTickMarkTransform(t))}}function Kt(a,l){if(a&1&&G(0,Zt,1,4,"div",8,se),a&2){let e=d(2);Y(e._tickMarks)}}function Gt(a,l){if(a&1&&(i(0,"div",6,1),x(2,Kt,2,0),o()),a&2){let e=d();c(2),v(e._cachedWidth?2:-1)}}function Yt(a,l){if(a&1&&f(0,"mat-slider-visual-thumb",7),a&2){let e=d();C("discrete",e.discrete)("thumbPosition",1)("valueIndicatorText",e.startValueIndicatorText)}}var m=(function(a){return a[a.START=1]="START",a[a.END=2]="END",a})(m||{}),Q=(function(a){return a[a.ACTIVE=0]="ACTIVE",a[a.INACTIVE=1]="INACTIVE",a})(Q||{}),Fe=new I("_MatSlider"),wt=new I("_MatSliderThumb"),Tt=new I("_MatSliderRangeThumb"),St=new I("_MatSliderVisualThumb");var Jt=(()=>{class a{_cdr=_(B);_ngZone=_(j);_slider=_(Fe);_renderer=_(Z);_listenerCleanups;discrete=!1;thumbPosition;valueIndicatorText;_ripple;_knob;_valueIndicatorContainer;_sliderInput;_sliderInputEl;_hoverRippleRef;_focusRippleRef;_activeRippleRef;_isHovered=!1;_isActive=!1;_isValueIndicatorVisible=!1;_hostElement=_(H).nativeElement;_platform=_(me);constructor(){}ngAfterViewInit(){let e=this._slider._getInput(this.thumbPosition);e&&(this._ripple.radius=24,this._sliderInput=e,this._sliderInputEl=this._sliderInput._hostElement,this._ngZone.runOutsideAngular(()=>{let t=this._sliderInputEl,n=this._renderer;this._listenerCleanups=[n.listen(t,"pointermove",this._onPointerMove),n.listen(t,"pointerdown",this._onDragStart),n.listen(t,"pointerup",this._onDragEnd),n.listen(t,"pointerleave",this._onMouseLeave),n.listen(t,"focus",this._onFocus),n.listen(t,"blur",this._onBlur)]}))}ngOnDestroy(){this._listenerCleanups?.forEach(e=>e())}_onPointerMove=e=>{if(this._sliderInput._isFocused)return;let t=this._hostElement.getBoundingClientRect(),n=this._slider._isCursorOnSliderThumb(e,t);this._isHovered=n,n?this._showHoverRipple():this._hideRipple(this._hoverRippleRef)};_onMouseLeave=()=>{this._isHovered=!1,this._hideRipple(this._hoverRippleRef)};_onFocus=()=>{this._hideRipple(this._hoverRippleRef),this._showFocusRipple(),this._hostElement.classList.add("mdc-slider__thumb--focused")};_onBlur=()=>{this._isActive||this._hideRipple(this._focusRippleRef),this._isHovered&&this._showHoverRipple(),this._hostElement.classList.remove("mdc-slider__thumb--focused")};_onDragStart=e=>{e.button===0&&(this._isActive=!0,this._showActiveRipple())};_onDragEnd=()=>{this._isActive=!1,this._hideRipple(this._activeRippleRef),this._sliderInput._isFocused||this._hideRipple(this._focusRippleRef),this._platform.SAFARI&&this._showHoverRipple()};_showHoverRipple(){this._isShowingRipple(this._hoverRippleRef)||(this._hoverRippleRef=this._showRipple({enterDuration:0,exitDuration:0}),this._hoverRippleRef?.element.classList.add("mat-mdc-slider-hover-ripple"))}_showFocusRipple(){this._isShowingRipple(this._focusRippleRef)||(this._focusRippleRef=this._showRipple({enterDuration:0,exitDuration:0},!0),this._focusRippleRef?.element.classList.add("mat-mdc-slider-focus-ripple"))}_showActiveRipple(){this._isShowingRipple(this._activeRippleRef)||(this._activeRippleRef=this._showRipple({enterDuration:225,exitDuration:400}),this._activeRippleRef?.element.classList.add("mat-mdc-slider-active-ripple"))}_isShowingRipple(e){return e?.state===Re.FADING_IN||e?.state===Re.VISIBLE}_showRipple(e,t){if(!this._slider.disabled&&(this._showValueIndicator(),this._slider._isRange&&this._slider._getThumb(this.thumbPosition===m.START?m.END:m.START)._showValueIndicator(),!(this._slider._globalRippleOptions?.disabled&&!t)))return this._ripple.launch({animation:this._slider._noopAnimations?{enterDuration:0,exitDuration:0}:e,centered:!0,persistent:!0})}_hideRipple(e){if(e?.fadeOut(),this._isShowingAnyRipple())return;this._slider._isRange||this._hideValueIndicator();let t=this._getSibling();t._isShowingAnyRipple()||(this._hideValueIndicator(),t._hideValueIndicator())}_showValueIndicator(){this._hostElement.classList.add("mdc-slider__thumb--with-indicator")}_hideValueIndicator(){this._hostElement.classList.remove("mdc-slider__thumb--with-indicator")}_getSibling(){return this._slider._getThumb(this.thumbPosition===m.START?m.END:m.START)}_getValueIndicatorContainer(){return this._valueIndicatorContainer?.nativeElement}_getKnob(){return this._knob.nativeElement}_isShowingAnyRipple(){return this._isShowingRipple(this._hoverRippleRef)||this._isShowingRipple(this._focusRippleRef)||this._isShowingRipple(this._activeRippleRef)}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=U({type:a,selectors:[["mat-slider-visual-thumb"]],viewQuery:function(t,n){if(t&1&&te(Ae,5)(Xt,5)(jt,5),t&2){let r;E(r=k())&&(n._ripple=r.first),E(r=k())&&(n._knob=r.first),E(r=k())&&(n._valueIndicatorContainer=r.first)}},hostAttrs:[1,"mdc-slider__thumb","mat-mdc-slider-visual-thumb"],inputs:{discrete:"discrete",thumbPosition:"thumbPosition",valueIndicatorText:"valueIndicatorText"},features:[A([{provide:St,useExisting:a}])],decls:4,vars:2,consts:[["knob",""],["valueIndicatorContainer",""],[1,"mdc-slider__value-indicator-container"],[1,"mdc-slider__thumb-knob"],["matRipple","",1,"mat-focus-indicator",3,"matRippleDisabled"],[1,"mdc-slider__value-indicator"],[1,"mdc-slider__value-indicator-text"]],template:function(t,n){t&1&&(x(0,qt,5,1,"div",2),f(1,"div",3,0)(3,"div",4)),t&2&&(v(n.discrete?0:-1),c(3),C("matRippleDisabled",!0))},dependencies:[Ae],styles:[`.mat-mdc-slider-visual-thumb .mat-ripple {
  height: 100%;
  width: 100%;
}

.mat-mdc-slider .mdc-slider__tick-marks {
  justify-content: start;
}
.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--active,
.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--inactive {
  position: absolute;
  left: 2px;
}
`],encapsulation:2,changeDetection:0})}return a})(),It=(()=>{class a{_ngZone=_(j);_cdr=_(B);_elementRef=_(H);_dir=_(ft,{optional:!0});_globalRippleOptions=_(Ct,{optional:!0});_trackActive;_thumbs;_input;_inputs;get disabled(){return this._disabled}set disabled(e){this._disabled=e;let t=this._getInput(m.END),n=this._getInput(m.START);t&&(t.disabled=this._disabled),n&&(n.disabled=this._disabled)}_disabled=!1;get discrete(){return this._discrete}set discrete(e){this._discrete=e,this._updateValueIndicatorUIs()}_discrete=!1;get showTickMarks(){return this._showTickMarks}set showTickMarks(e){this._showTickMarks=e,this._hasViewInitialized&&(this._updateTickMarkUI(),this._updateTickMarkTrackUI())}_showTickMarks=!1;get min(){return this._min}set min(e){let t=e==null||isNaN(e)?this._min:e;this._min!==t&&this._updateMin(t)}_min=0;color;disableRipple=!1;_updateMin(e){let t=this._min;this._min=e,this._isRange?this._updateMinRange({old:t,new:e}):this._updateMinNonRange(e),this._onMinMaxOrStepChange()}_updateMinRange(e){let t=this._getInput(m.END),n=this._getInput(m.START),r=t.value,u=n.value;n.min=e.new,t.min=Math.max(e.new,n.value),n.max=Math.min(t.max,t.value),n._updateWidthInactive(),t._updateWidthInactive(),e.new<e.old?this._onTranslateXChangeBySideEffect(t,n):this._onTranslateXChangeBySideEffect(n,t),r!==t.value&&this._onValueChange(t),u!==n.value&&this._onValueChange(n)}_updateMinNonRange(e){let t=this._getInput(m.END);if(t){let n=t.value;t.min=e,t._updateThumbUIByValue(),this._updateTrackUI(t),n!==t.value&&this._onValueChange(t)}}get max(){return this._max}set max(e){let t=e==null||isNaN(e)?this._max:e;this._max!==t&&this._updateMax(t)}_max=100;_updateMax(e){let t=this._max;this._max=e,this._isRange?this._updateMaxRange({old:t,new:e}):this._updateMaxNonRange(e),this._onMinMaxOrStepChange()}_updateMaxRange(e){let t=this._getInput(m.END),n=this._getInput(m.START),r=t.value,u=n.value;t.max=e.new,n.max=Math.min(e.new,t.value),t.min=n.value,t._updateWidthInactive(),n._updateWidthInactive(),e.new>e.old?this._onTranslateXChangeBySideEffect(n,t):this._onTranslateXChangeBySideEffect(t,n),r!==t.value&&this._onValueChange(t),u!==n.value&&this._onValueChange(n)}_updateMaxNonRange(e){let t=this._getInput(m.END);if(t){let n=t.value;t.max=e,t._updateThumbUIByValue(),this._updateTrackUI(t),n!==t.value&&this._onValueChange(t)}}get step(){return this._step}set step(e){let t=isNaN(e)?this._step:e;this._step!==t&&this._updateStep(t)}_step=1;_updateStep(e){this._step=e,this._isRange?this._updateStepRange():this._updateStepNonRange(),this._onMinMaxOrStepChange()}_updateStepRange(){let e=this._getInput(m.END),t=this._getInput(m.START),n=e.value,r=t.value,u=t.value;e.min=this._min,t.max=this._max,e.step=this._step,t.step=this._step,this._platform.SAFARI&&(e.value=e.value,t.value=t.value),e.min=Math.max(this._min,t.value),t.max=Math.min(this._max,e.value),t._updateWidthInactive(),e._updateWidthInactive(),e.value<u?this._onTranslateXChangeBySideEffect(t,e):this._onTranslateXChangeBySideEffect(e,t),n!==e.value&&this._onValueChange(e),r!==t.value&&this._onValueChange(t)}_updateStepNonRange(){let e=this._getInput(m.END);if(e){let t=e.value;e.step=this._step,this._platform.SAFARI&&(e.value=e.value),e._updateThumbUIByValue(),t!==e.value&&this._onValueChange(e)}}displayWith=e=>`${e}`;_tickMarks;_noopAnimations=ge();_resizeObserver=null;_cachedWidth;_cachedLeft;_rippleRadius=24;startValueIndicatorText="";endValueIndicatorText="";_endThumbTransform;_startThumbTransform;_isRange=!1;_isRtl=he(()=>this._dir?.valueSignal()==="rtl");_hasViewInitialized=!1;_tickMarkTrackWidth=0;_hasAnimation=!1;_resizeTimer=null;_platform=_(me);constructor(){_(_e).load(pe);let e=this._isRtl();et(()=>{let t=this._isRtl();t!==e&&(e=t,this._isRange?this._onDirChangeRange():this._onDirChangeNonRange(),this._updateTickMarkUI())})}_knobRadius=8;_inputPadding;ngAfterViewInit(){this._platform.isBrowser&&this._updateDimensions();let e=this._getInput(m.END),t=this._getInput(m.START);this._isRange=!!e&&!!t,this._cdr.detectChanges();let n=this._getThumb(m.END);this._rippleRadius=n._ripple.radius,this._inputPadding=this._rippleRadius-this._knobRadius,this._isRange?this._initUIRange(e,t):this._initUINonRange(e),this._updateTrackUI(e),this._updateTickMarkUI(),this._updateTickMarkTrackUI(),this._observeHostResize(),this._cdr.detectChanges()}_initUINonRange(e){e.initProps(),e.initUI(),this._updateValueIndicatorUI(e),this._hasViewInitialized=!0,e._updateThumbUIByValue()}_initUIRange(e,t){e.initProps(),e.initUI(),t.initProps(),t.initUI(),e._updateMinMax(),t._updateMinMax(),e._updateStaticStyles(),t._updateStaticStyles(),this._updateValueIndicatorUIs(),this._hasViewInitialized=!0,e._updateThumbUIByValue(),t._updateThumbUIByValue()}ngOnDestroy(){this._resizeObserver?.disconnect(),this._resizeObserver=null}_onDirChangeRange(){let e=this._getInput(m.END),t=this._getInput(m.START);e._setIsLeftThumb(),t._setIsLeftThumb(),e.translateX=e._calcTranslateXByValue(),t.translateX=t._calcTranslateXByValue(),e._updateStaticStyles(),t._updateStaticStyles(),e._updateWidthInactive(),t._updateWidthInactive(),e._updateThumbUIByValue(),t._updateThumbUIByValue()}_onDirChangeNonRange(){this._getInput(m.END)._updateThumbUIByValue()}_observeHostResize(){typeof ResizeObserver>"u"||!ResizeObserver||this._ngZone.runOutsideAngular(()=>{this._resizeObserver=new ResizeObserver(()=>{this._isActive()||(this._resizeTimer&&clearTimeout(this._resizeTimer),this._onResize())}),this._resizeObserver.observe(this._elementRef.nativeElement)})}_isActive(){return this._getThumb(m.START)._isActive||this._getThumb(m.END)._isActive}_getValue(e=m.END){let t=this._getInput(e);return t?t.value:this.min}_skipUpdate(){return!!(this._getInput(m.START)?._skipUIUpdate||this._getInput(m.END)?._skipUIUpdate)}_updateDimensions(){this._cachedWidth=this._elementRef.nativeElement.offsetWidth,this._cachedLeft=this._elementRef.nativeElement.getBoundingClientRect().left}_setTrackActiveStyles(e){let t=this._trackActive.nativeElement.style;t.left=e.left,t.right=e.right,t.transformOrigin=e.transformOrigin,t.transform=e.transform}_calcTickMarkTransform(e){let t=e*(this._tickMarkTrackWidth/(this._tickMarks.length-1));return`translateX(${this._isRtl()?this._cachedWidth-6-t:t}px)`}_onTranslateXChange(e){this._hasViewInitialized&&(this._updateThumbUI(e),this._updateTrackUI(e),this._updateOverlappingThumbUI(e))}_onTranslateXChangeBySideEffect(e,t){this._hasViewInitialized&&(e._updateThumbUIByValue(),t._updateThumbUIByValue())}_onValueChange(e){this._hasViewInitialized&&(this._updateValueIndicatorUI(e),this._updateTickMarkUI(),this._cdr.detectChanges())}_onMinMaxOrStepChange(){this._hasViewInitialized&&(this._updateTickMarkUI(),this._updateTickMarkTrackUI(),this._cdr.markForCheck())}_onResize(){if(this._hasViewInitialized){if(this._updateDimensions(),this._isRange){let e=this._getInput(m.END),t=this._getInput(m.START);e._updateThumbUIByValue(),t._updateThumbUIByValue(),e._updateStaticStyles(),t._updateStaticStyles(),e._updateMinMax(),t._updateMinMax(),e._updateWidthInactive(),t._updateWidthInactive()}else{let e=this._getInput(m.END);e&&e._updateThumbUIByValue()}this._updateTickMarkUI(),this._updateTickMarkTrackUI(),this._cdr.detectChanges()}}_thumbsOverlap=!1;_areThumbsOverlapping(){let e=this._getInput(m.START),t=this._getInput(m.END);return!e||!t?!1:t.translateX-e.translateX<20}_updateOverlappingThumbClassNames(e){let t=e.getSibling(),n=this._getThumb(e.thumbPosition);this._getThumb(t.thumbPosition)._hostElement.classList.remove("mdc-slider__thumb--top"),n._hostElement.classList.toggle("mdc-slider__thumb--top",this._thumbsOverlap)}_updateOverlappingThumbUI(e){!this._isRange||this._skipUpdate()||this._thumbsOverlap!==this._areThumbsOverlapping()&&(this._thumbsOverlap=!this._thumbsOverlap,this._updateOverlappingThumbClassNames(e))}_updateThumbUI(e){if(this._skipUpdate())return;let t=this._getThumb(e.thumbPosition===m.END?m.END:m.START);t._hostElement.style.transform=`translateX(${e.translateX}px)`}_updateValueIndicatorUI(e){if(this._skipUpdate())return;let t=this.displayWith(e.value);if(this._hasViewInitialized?e._valuetext.set(t):e._hostElement.setAttribute("aria-valuetext",t),this.discrete){e.thumbPosition===m.START?this.startValueIndicatorText=t:this.endValueIndicatorText=t;let n=this._getThumb(e.thumbPosition);t.length<3?n._hostElement.classList.add("mdc-slider__thumb--short-value"):n._hostElement.classList.remove("mdc-slider__thumb--short-value")}}_updateValueIndicatorUIs(){let e=this._getInput(m.END),t=this._getInput(m.START);e&&this._updateValueIndicatorUI(e),t&&this._updateValueIndicatorUI(t)}_updateTickMarkTrackUI(){if(!this.showTickMarks||this._skipUpdate())return;let e=this._step&&this._step>0?this._step:1,n=(Math.floor(this.max/e)*e-this.min)/(this.max-this.min);this._tickMarkTrackWidth=(this._cachedWidth-6)*n}_updateTrackUI(e){this._skipUpdate()||(this._isRange?this._updateTrackUIRange(e):this._updateTrackUINonRange(e))}_updateTrackUIRange(e){let t=e.getSibling();if(!t||!this._cachedWidth)return;let n=Math.abs(t.translateX-e.translateX)/this._cachedWidth;e._isLeftThumb&&this._cachedWidth?this._setTrackActiveStyles({left:"auto",right:`${this._cachedWidth-t.translateX}px`,transformOrigin:"right",transform:`scaleX(${n})`}):this._setTrackActiveStyles({left:`${t.translateX}px`,right:"auto",transformOrigin:"left",transform:`scaleX(${n})`})}_updateTrackUINonRange(e){this._isRtl()?this._setTrackActiveStyles({left:"auto",right:"0px",transformOrigin:"right",transform:`scaleX(${1-e.fillPercentage})`}):this._setTrackActiveStyles({left:"0px",right:"auto",transformOrigin:"left",transform:`scaleX(${e.fillPercentage})`})}_updateTickMarkUI(){if(!this.showTickMarks||this.step===void 0||this.min===void 0||this.max===void 0)return;let e=this.step>0?this.step:1;this._isRange?this._updateTickMarkUIRange(e):this._updateTickMarkUINonRange(e)}_updateTickMarkUINonRange(e){let t=this._getValue(),n=Math.max(Math.round((t-this.min)/e),0)+1,r=Math.max(Math.round((this.max-t)/e),0)-1;this._isRtl()?n++:r++,this._tickMarks=Array(n).fill(Q.ACTIVE).concat(Array(r).fill(Q.INACTIVE))}_updateTickMarkUIRange(e){let t=this._getValue(),n=this._getValue(m.START),r=Math.max(Math.round((n-this.min)/e),0),u=Math.max(Math.round((t-n)/e)+1,0),y=Math.max(Math.round((this.max-t)/e),0);this._tickMarks=Array(r).fill(Q.INACTIVE).concat(Array(u).fill(Q.ACTIVE),Array(y).fill(Q.INACTIVE))}_getInput(e){if(e===m.END&&this._input)return this._input;if(this._inputs?.length)return e===m.START?this._inputs.first:this._inputs.last}_getThumb(e){return e===m.END?this._thumbs?.last:this._thumbs?.first}_setTransition(e){this._hasAnimation=!this._platform.IOS&&e&&!this._noopAnimations,this._elementRef.nativeElement.classList.toggle("mat-mdc-slider-with-animation",this._hasAnimation)}_isCursorOnSliderThumb(e,t){let n=t.width/2,r=t.x+n,u=t.y+n,y=e.clientX-r,b=e.clientY-u;return Math.pow(y,2)+Math.pow(b,2)<Math.pow(n,2)}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=U({type:a,selectors:[["mat-slider"]],contentQueries:function(t,n,r){if(t&1&&ee(r,wt,5)(r,Tt,4),t&2){let u;E(u=k())&&(n._input=u.first),E(u=k())&&(n._inputs=u)}},viewQuery:function(t,n){if(t&1&&te(Qt,5)(St,5),t&2){let r;E(r=k())&&(n._trackActive=r.first),E(r=k())&&(n._thumbs=r)}},hostAttrs:[1,"mat-mdc-slider","mdc-slider"],hostVars:12,hostBindings:function(t,n){t&2&&(Ee("mat-"+(n.color||"primary")),R("mdc-slider--range",n._isRange)("mdc-slider--disabled",n.disabled)("mdc-slider--discrete",n.discrete)("mdc-slider--tick-marks",n.showTickMarks)("_mat-animation-noopable",n._noopAnimations))},inputs:{disabled:[2,"disabled","disabled",w],discrete:[2,"discrete","discrete",w],showTickMarks:[2,"showTickMarks","showTickMarks",w],min:[2,"min","min",P],color:"color",disableRipple:[2,"disableRipple","disableRipple",w],max:[2,"max","max",P],step:[2,"step","step",P],displayWith:"displayWith"},exportAs:["matSlider"],features:[A([{provide:Fe,useExisting:a}])],ngContentSelectors:$t,decls:9,vars:5,consts:[["trackActive",""],["tickMarkContainer",""],[1,"mdc-slider__track"],[1,"mdc-slider__track--inactive"],[1,"mdc-slider__track--active"],[1,"mdc-slider__track--active_fill"],[1,"mdc-slider__tick-marks"],[3,"discrete","thumbPosition","valueIndicatorText"],[3,"class","transform"]],template:function(t,n){t&1&&(J(),O(0),i(1,"div",2),f(2,"div",3),i(3,"div",4),f(4,"div",5,0),o(),x(6,Gt,3,1,"div",6),o(),x(7,Yt,1,3,"mat-slider-visual-thumb",7),f(8,"mat-slider-visual-thumb",7)),t&2&&(c(6),v(n.showTickMarks?6:-1),c(),v(n._isRange?7:-1),c(),C("discrete",n.discrete)("thumbPosition",2)("valueIndicatorText",n.endValueIndicatorText))},dependencies:[Jt],styles:[`.mdc-slider__track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  pointer-events: none;
  height: var(--mat-slider-inactive-track-height, 4px);
}

.mdc-slider__track--active,
.mdc-slider__track--inactive {
  display: flex;
  height: 100%;
  position: absolute;
  width: 100%;
}

.mdc-slider__track--active {
  overflow: hidden;
  border-radius: var(--mat-slider-active-track-shape, var(--mat-sys-corner-full));
  height: var(--mat-slider-active-track-height, 4px);
  top: calc((var(--mat-slider-inactive-track-height, 4px) - var(--mat-slider-active-track-height, 4px)) / 2);
}

.mdc-slider__track--active_fill {
  border-top-style: solid;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
  transform-origin: left;
  transition: transform 80ms ease;
  border-color: var(--mat-slider-active-track-color, var(--mat-sys-primary));
  border-top-width: var(--mat-slider-active-track-height, 4px);
}
.mdc-slider--disabled .mdc-slider__track--active_fill {
  border-color: var(--mat-slider-disabled-active-track-color, var(--mat-sys-on-surface));
}
[dir=rtl] .mdc-slider__track--active_fill {
  -webkit-transform-origin: right;
  transform-origin: right;
}

.mdc-slider__track--inactive {
  left: 0;
  top: 0;
  opacity: 0.24;
  background-color: var(--mat-slider-inactive-track-color, var(--mat-sys-surface-variant));
  height: var(--mat-slider-inactive-track-height, 4px);
  border-radius: var(--mat-slider-inactive-track-shape, var(--mat-sys-corner-full));
}
.mdc-slider--disabled .mdc-slider__track--inactive {
  background-color: var(--mat-slider-disabled-inactive-track-color, var(--mat-sys-on-surface));
  opacity: 0.24;
}
.mdc-slider__track--inactive::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-slider__track--inactive::before {
    border-color: CanvasText;
  }
}

.mdc-slider__value-indicator-container {
  bottom: 44px;
  left: 50%;
  pointer-events: none;
  position: absolute;
  transform: var(--mat-slider-value-indicator-container-transform, translateX(-50%) rotate(-45deg));
}
.mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container {
  pointer-events: auto;
}

.mdc-slider__value-indicator {
  display: flex;
  align-items: center;
  transform: scale(0);
  transform-origin: var(--mat-slider-value-indicator-transform-origin, 0 28px);
  transition: transform 100ms cubic-bezier(0.4, 0, 1, 1);
  word-break: normal;
  background-color: var(--mat-slider-label-container-color, var(--mat-sys-primary));
  color: var(--mat-slider-label-label-text-color, var(--mat-sys-on-primary));
  width: var(--mat-slider-value-indicator-width, 28px);
  height: var(--mat-slider-value-indicator-height, 28px);
  padding: var(--mat-slider-value-indicator-padding, 0);
  opacity: var(--mat-slider-value-indicator-opacity, 1);
  border-radius: var(--mat-slider-value-indicator-border-radius, 50% 50% 50% 0);
}
.mdc-slider__thumb--with-indicator .mdc-slider__value-indicator {
  transition: transform 100ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale(1);
}
.mdc-slider__value-indicator::before {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid;
  bottom: -5px;
  content: "";
  height: 0;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 0;
  display: var(--mat-slider-value-indicator-caret-display, none);
  border-top-color: var(--mat-slider-label-container-color, var(--mat-sys-primary));
}
.mdc-slider__value-indicator::after {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-slider__value-indicator::after {
    border-color: CanvasText;
  }
}

.mdc-slider__value-indicator-text {
  text-align: center;
  width: var(--mat-slider-value-indicator-width, 28px);
  transform: var(--mat-slider-value-indicator-text-transform, rotate(45deg));
  font-family: var(--mat-slider-label-label-text-font, var(--mat-sys-label-medium-font));
  font-size: var(--mat-slider-label-label-text-size, var(--mat-sys-label-medium-size));
  font-weight: var(--mat-slider-label-label-text-weight, var(--mat-sys-label-medium-weight));
  line-height: var(--mat-slider-label-label-text-line-height, var(--mat-sys-label-medium-line-height));
  letter-spacing: var(--mat-slider-label-label-text-tracking, var(--mat-sys-label-medium-tracking));
}

.mdc-slider__thumb {
  -webkit-user-select: none;
  user-select: none;
  display: flex;
  left: -24px;
  outline: none;
  position: absolute;
  height: 48px;
  width: 48px;
  pointer-events: none;
}
.mdc-slider--discrete .mdc-slider__thumb {
  transition: transform 80ms ease;
}
.mdc-slider--disabled .mdc-slider__thumb {
  pointer-events: none;
}

.mdc-slider__thumb--top {
  z-index: 1;
}

.mdc-slider__thumb-knob {
  position: absolute;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-style: solid;
  width: var(--mat-slider-handle-width, 20px);
  height: var(--mat-slider-handle-height, 20px);
  border-width: calc(var(--mat-slider-handle-height, 20px) / 2) calc(var(--mat-slider-handle-width, 20px) / 2);
  box-shadow: var(--mat-slider-handle-elevation, var(--mat-sys-level1));
  background-color: var(--mat-slider-handle-color, var(--mat-sys-primary));
  border-color: var(--mat-slider-handle-color, var(--mat-sys-primary));
  border-radius: var(--mat-slider-handle-shape, var(--mat-sys-corner-full));
}
.mdc-slider__thumb:hover .mdc-slider__thumb-knob {
  background-color: var(--mat-slider-hover-handle-color, var(--mat-sys-primary));
  border-color: var(--mat-slider-hover-handle-color, var(--mat-sys-primary));
}
.mdc-slider__thumb--focused .mdc-slider__thumb-knob {
  background-color: var(--mat-slider-focus-handle-color, var(--mat-sys-primary));
  border-color: var(--mat-slider-focus-handle-color, var(--mat-sys-primary));
}
.mdc-slider--disabled .mdc-slider__thumb-knob {
  background-color: var(--mat-slider-disabled-handle-color, var(--mat-sys-on-surface));
  border-color: var(--mat-slider-disabled-handle-color, var(--mat-sys-on-surface));
}
.mdc-slider__thumb--top .mdc-slider__thumb-knob, .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob, .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob {
  border: solid 1px #fff;
  box-sizing: content-box;
  border-color: var(--mat-slider-with-overlap-handle-outline-color, var(--mat-sys-on-primary));
  border-width: var(--mat-slider-with-overlap-handle-outline-width, 1px);
}

.mdc-slider__tick-marks {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 1px;
  position: absolute;
  width: 100%;
}

.mdc-slider__tick-mark--active,
.mdc-slider__tick-mark--inactive {
  width: var(--mat-slider-with-tick-marks-container-size, 2px);
  height: var(--mat-slider-with-tick-marks-container-size, 2px);
  border-radius: var(--mat-slider-with-tick-marks-container-shape, var(--mat-sys-corner-full));
}

.mdc-slider__tick-mark--inactive {
  opacity: var(--mat-slider-with-tick-marks-inactive-container-opacity, 0.38);
  background-color: var(--mat-slider-with-tick-marks-inactive-container-color, var(--mat-sys-on-surface-variant));
}
.mdc-slider--disabled .mdc-slider__tick-mark--inactive {
  opacity: var(--mat-slider-with-tick-marks-inactive-container-opacity, 0.38);
  background-color: var(--mat-slider-with-tick-marks-disabled-container-color, var(--mat-sys-on-surface));
}

.mdc-slider__tick-mark--active {
  opacity: var(--mat-slider-with-tick-marks-active-container-opacity, 0.38);
  background-color: var(--mat-slider-with-tick-marks-active-container-color, var(--mat-sys-on-primary));
}

.mdc-slider__input {
  cursor: pointer;
  left: 2px;
  margin: 0;
  height: 44px;
  opacity: 0;
  position: absolute;
  top: 2px;
  width: 44px;
  box-sizing: content-box;
}
.mdc-slider__input.mat-mdc-slider-input-no-pointer-events {
  pointer-events: none;
}
.mdc-slider__input.mat-slider__right-input {
  left: auto;
  right: 0;
}

.mat-mdc-slider {
  display: inline-block;
  box-sizing: border-box;
  outline: none;
  vertical-align: middle;
  cursor: pointer;
  height: 48px;
  margin: 0 8px;
  position: relative;
  touch-action: pan-y;
  width: auto;
  min-width: 112px;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-slider.mdc-slider--disabled {
  cursor: auto;
  opacity: 0.38;
}
.mat-mdc-slider.mdc-slider--disabled .mdc-slider__input {
  cursor: auto;
}
.mat-mdc-slider .mdc-slider__thumb,
.mat-mdc-slider .mdc-slider__track--active_fill {
  transition-duration: 0ms;
}
.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,
.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill {
  transition-duration: 80ms;
}
.mat-mdc-slider.mdc-slider--discrete .mdc-slider__thumb,
.mat-mdc-slider.mdc-slider--discrete .mdc-slider__track--active_fill {
  transition-duration: 0ms;
}
.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,
.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill {
  transition-duration: 80ms;
}
.mat-mdc-slider .mat-ripple .mat-ripple-element {
  background-color: var(--mat-slider-ripple-color, var(--mat-sys-primary));
}
.mat-mdc-slider .mat-ripple .mat-mdc-slider-hover-ripple {
  background-color: var(--mat-slider-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-primary) 5%, transparent));
}
.mat-mdc-slider .mat-ripple .mat-mdc-slider-focus-ripple,
.mat-mdc-slider .mat-ripple .mat-mdc-slider-active-ripple {
  background-color: var(--mat-slider-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-primary) 20%, transparent));
}
.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb, .mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,
.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator {
  transition: none;
}
.mat-mdc-slider .mat-focus-indicator::before {
  border-radius: 50%;
}

.mdc-slider__thumb--focused .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return a})();var en={provide:Ie,useExisting:ve(()=>Rt),multi:!0},tn={provide:Ie,useExisting:ve(()=>De),multi:!0},Rt=(()=>{class a{_ngZone=_(j);_elementRef=_(H);_cdr=_(B);_slider=_(Fe);_platform=_(me);_listenerCleanups;get value(){return P(this._hostElement.value,0)}set value(e){e===null&&(e=this._getDefaultValue()),e=isNaN(e)?0:e;let t=e+"";if(!this._hasSetInitialValue){this._initialValue=t;return}this._isActive||this._setValue(t)}_setValue(e){this._hostElement.value=e,this._updateThumbUIByValue(),this._slider._onValueChange(this),this._cdr.detectChanges(),this._slider._cdr.markForCheck()}valueChange=new T;dragStart=new T;dragEnd=new T;get translateX(){return this._slider.min>=this._slider.max?(this._translateX=this._tickMarkOffset,this._translateX):(this._translateX===void 0&&(this._translateX=this._calcTranslateXByValue()),this._translateX)}set translateX(e){this._translateX=e}_translateX;thumbPosition=m.END;get min(){return P(this._hostElement.min,0)}set min(e){this._hostElement.min=e+"",this._cdr.detectChanges()}get max(){return P(this._hostElement.max,0)}set max(e){this._hostElement.max=e+"",this._cdr.detectChanges()}get step(){return P(this._hostElement.step,0)}set step(e){this._hostElement.step=e+"",this._cdr.detectChanges()}get disabled(){return w(this._hostElement.disabled)}set disabled(e){this._hostElement.disabled=e,this._cdr.detectChanges(),this._slider.disabled!==this.disabled&&(this._slider.disabled=this.disabled)}get percentage(){return this._slider.min>=this._slider.max?this._slider._isRtl()?1:0:(this.value-this._slider.min)/(this._slider.max-this._slider.min)}get fillPercentage(){return this._slider._cachedWidth?this._translateX===0?0:this.translateX/this._slider._cachedWidth:this._slider._isRtl()?1:0}_hostElement=this._elementRef.nativeElement;_valuetext=M("");_knobRadius=8;_tickMarkOffset=3;_isActive=!1;_isFocused=!1;_setIsFocused(e){this._isFocused=e}_hasSetInitialValue=!1;_initialValue;_formControl;_destroyed=new z;_skipUIUpdate=!1;_onChangeFn;_onTouchedFn=()=>{};_isControlInitialized=!1;constructor(){let e=_(Z);this._ngZone.runOutsideAngular(()=>{this._listenerCleanups=[e.listen(this._hostElement,"pointerdown",this._onPointerDown.bind(this)),e.listen(this._hostElement,"pointermove",this._onPointerMove.bind(this)),e.listen(this._hostElement,"pointerup",this._onPointerUp.bind(this))]})}ngOnDestroy(){this._listenerCleanups.forEach(e=>e()),this._destroyed.next(),this._destroyed.complete(),this.dragStart.complete(),this.dragEnd.complete()}initProps(){this._updateWidthInactive(),this.disabled!==this._slider.disabled&&(this._slider.disabled=!0),this.step=this._slider.step,this.min=this._slider.min,this.max=this._slider.max,this._initValue()}initUI(){this._updateThumbUIByValue()}_initValue(){this._hasSetInitialValue=!0,this._initialValue===void 0?this.value=this._getDefaultValue():(this._hostElement.value=this._initialValue,this._updateThumbUIByValue(),this._slider._onValueChange(this),this._cdr.detectChanges())}_getDefaultValue(){return this.min}_onBlur(){this._setIsFocused(!1),this._onTouchedFn()}_onFocus(){this._slider._setTransition(!1),this._slider._updateTrackUI(this),this._setIsFocused(!0)}_onChange(){this.valueChange.emit(this.value),this._isActive&&this._updateThumbUIByValue({withAnimation:!0})}_onInput(){this._onChangeFn?.(this.value),(this._slider.step||!this._isActive)&&this._updateThumbUIByValue({withAnimation:!0}),this._slider._onValueChange(this)}_onNgControlValueChange(){(!this._isActive||!this._isFocused)&&(this._slider._onValueChange(this),this._updateThumbUIByValue()),this._slider.disabled=this._formControl.disabled}_onPointerDown(e){if(!(this.disabled||e.button!==0)){if(this._platform.IOS){let t=this._slider._isCursorOnSliderThumb(e,this._slider._getThumb(this.thumbPosition)._hostElement.getBoundingClientRect());this._isActive=t,this._updateWidthActive(),this._slider._updateDimensions();return}this._isActive=!0,this._setIsFocused(!0),this._updateWidthActive(),this._slider._updateDimensions(),this._slider.step||this._updateThumbUIByPointerEvent(e,{withAnimation:!0}),this.disabled||(this._handleValueCorrection(e),this.dragStart.emit({source:this,parent:this._slider,value:this.value}))}}_handleValueCorrection(e){this._skipUIUpdate=!0,setTimeout(()=>{this._skipUIUpdate=!1,this._fixValue(e)},0)}_fixValue(e){let t=e.clientX-this._slider._cachedLeft,n=this._slider._cachedWidth,r=this._slider.step===0?1:this._slider.step,u=Math.floor((this._slider.max-this._slider.min)/r),y=this._slider._isRtl()?1-t/n:t/n,D=Math.round(y*u)/u*(this._slider.max-this._slider.min)+this._slider.min,be=Math.round(D/r)*r,Wt=this.value;if(be===Wt){this._slider._onValueChange(this),this._slider.step>0?this._updateThumbUIByValue():this._updateThumbUIByPointerEvent(e,{withAnimation:this._slider._hasAnimation});return}this.value=be,this.valueChange.emit(this.value),this._onChangeFn?.(this.value),this._slider._onValueChange(this),this._slider.step>0?this._updateThumbUIByValue():this._updateThumbUIByPointerEvent(e,{withAnimation:this._slider._hasAnimation})}_onPointerMove(e){!this._slider.step&&this._isActive&&this._updateThumbUIByPointerEvent(e)}_onPointerUp(){this._isActive&&(this._isActive=!1,this._platform.SAFARI&&this._setIsFocused(!1),this.dragEnd.emit({source:this,parent:this._slider,value:this.value}),setTimeout(()=>this._updateWidthInactive(),this._platform.IOS?10:0))}_clamp(e){let t=this._tickMarkOffset,n=this._slider._cachedWidth-this._tickMarkOffset;return Math.max(Math.min(e,n),t)}_calcTranslateXByValue(){return this._slider._isRtl()?(1-this.percentage)*(this._slider._cachedWidth-this._tickMarkOffset*2)+this._tickMarkOffset:this.percentage*(this._slider._cachedWidth-this._tickMarkOffset*2)+this._tickMarkOffset}_calcTranslateXByPointerEvent(e){return e.clientX-this._slider._cachedLeft}_updateWidthActive(){}_updateWidthInactive(){this._hostElement.style.padding=`0 ${this._slider._inputPadding}px`,this._hostElement.style.width=`calc(100% + ${this._slider._inputPadding-this._tickMarkOffset*2}px)`,this._hostElement.style.left=`-${this._slider._rippleRadius-this._tickMarkOffset}px`}_updateThumbUIByValue(e){this.translateX=this._clamp(this._calcTranslateXByValue()),this._updateThumbUI(e)}_updateThumbUIByPointerEvent(e,t){this.translateX=this._clamp(this._calcTranslateXByPointerEvent(e)),this._updateThumbUI(t)}_updateThumbUI(e){this._slider._setTransition(!!e?.withAnimation),this._slider._onTranslateXChange(this)}writeValue(e){(this._isControlInitialized||e!==null)&&(this.value=e)}registerOnChange(e){this._onChangeFn=e,this._isControlInitialized=!0}registerOnTouched(e){this._onTouchedFn=e}setDisabledState(e){this.disabled=e}focus(){this._hostElement.focus()}blur(){this._hostElement.blur()}static \u0275fac=function(t){return new(t||a)};static \u0275dir=F({type:a,selectors:[["input","matSliderThumb",""]],hostAttrs:["type","range",1,"mdc-slider__input"],hostVars:1,hostBindings:function(t,n){t&1&&h("change",function(){return n._onChange()})("input",function(){return n._onInput()})("blur",function(){return n._onBlur()})("focus",function(){return n._onFocus()}),t&2&&V("aria-valuetext",n._valuetext())},inputs:{value:[2,"value","value",P]},outputs:{valueChange:"valueChange",dragStart:"dragStart",dragEnd:"dragEnd"},exportAs:["matSliderThumb"],features:[A([en,{provide:wt,useExisting:a}])]})}return a})(),De=(()=>{class a extends Rt{_cdr=_(B);getSibling(){return this._sibling||(this._sibling=this._slider._getInput(this._isEndThumb?m.START:m.END)),this._sibling}_sibling;getMinPos(){let e=this.getSibling();return!this._isLeftThumb&&e?e.translateX:this._tickMarkOffset}getMaxPos(){let e=this.getSibling();return this._isLeftThumb&&e?e.translateX:this._slider._cachedWidth-this._tickMarkOffset}_setIsLeftThumb(){this._isLeftThumb=this._isEndThumb&&this._slider._isRtl()||!this._isEndThumb&&!this._slider._isRtl()}_isLeftThumb=!1;_isEndThumb=!1;constructor(){super(),this._isEndThumb=this._hostElement.hasAttribute("matSliderEndThumb"),this._setIsLeftThumb(),this.thumbPosition=this._isEndThumb?m.END:m.START}_getDefaultValue(){return this._isEndThumb&&this._slider._isRange?this.max:this.min}_onInput(){super._onInput(),this._updateSibling(),this._isActive||this._updateWidthInactive()}_onNgControlValueChange(){super._onNgControlValueChange(),this.getSibling()?._updateMinMax()}_onPointerDown(e){this.disabled||e.button!==0||(this._sibling&&(this._sibling._updateWidthActive(),this._sibling._hostElement.classList.add("mat-mdc-slider-input-no-pointer-events")),super._onPointerDown(e))}_onPointerUp(){super._onPointerUp(),this._sibling&&setTimeout(()=>{this._sibling._updateWidthInactive(),this._sibling._hostElement.classList.remove("mat-mdc-slider-input-no-pointer-events")})}_onPointerMove(e){super._onPointerMove(e),!this._slider.step&&this._isActive&&this._updateSibling()}_fixValue(e){super._fixValue(e),this._sibling?._updateMinMax()}_clamp(e){return Math.max(Math.min(e,this.getMaxPos()),this.getMinPos())}_updateMinMax(){let e=this.getSibling();e&&(this._isEndThumb?(this.min=Math.max(this._slider.min,e.value),this.max=this._slider.max):(this.min=this._slider.min,this.max=Math.min(this._slider.max,e.value)))}_updateWidthActive(){let e=this._slider._rippleRadius*2-this._slider._inputPadding*2,t=this._slider._cachedWidth+this._slider._inputPadding-e-this._tickMarkOffset*2,n=this._slider.min<this._slider.max?(this.max-this.min)/(this._slider.max-this._slider.min):1,r=t*n+e;this._hostElement.style.width=`${r}px`,this._hostElement.style.padding=`0 ${this._slider._inputPadding}px`}_updateWidthInactive(){let e=this.getSibling();if(!e)return;let t=this._slider._cachedWidth-this._tickMarkOffset*2,n=this._isEndThumb?this.value-(this.value-e.value)/2:this.value+(e.value-this.value)/2,r=this._isEndThumb?(this.max-n)/(this._slider.max-this._slider.min):(n-this.min)/(this._slider.max-this._slider.min),u=this._slider.min<this._slider.max?r:1,y=this._slider._rippleRadius;u===1?y=48:u===0&&(y=0);let b=t*u+y;this._hostElement.style.width=`${b}px`,this._hostElement.style.padding="0px",this._isLeftThumb?(this._hostElement.style.left=`-${this._slider._rippleRadius-this._tickMarkOffset}px`,this._hostElement.style.right="auto"):(this._hostElement.style.left="auto",this._hostElement.style.right=`-${this._slider._rippleRadius-this._tickMarkOffset}px`)}_updateStaticStyles(){this._hostElement.classList.toggle("mat-slider__right-input",!this._isLeftThumb)}_updateSibling(){let e=this.getSibling();e&&(e._updateMinMax(),this._isActive?e._updateWidthActive():e._updateWidthInactive())}writeValue(e){(this._isControlInitialized||e!==null)&&(this.value=e,this._updateWidthInactive(),this._updateSibling())}_setValue(e){super._setValue(e),this._updateWidthInactive(),this._updateSibling()}static \u0275fac=function(t){return new(t||a)};static \u0275dir=F({type:a,selectors:[["input","matSliderStartThumb",""],["input","matSliderEndThumb",""]],exportAs:["matSliderRangeThumb"],features:[A([tn,{provide:Tt,useExisting:a}]),K]})}return a})(),At=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=q({type:a});static \u0275inj=X({imports:[yt,ue]})}return a})();var Ve=new I("CdkAccordion"),Pt=(()=>{class a{_stateChanges=new z;_openCloseAllActions=new z;id=_(ne).getId("cdk-accordion-");multi=!1;openAll(){this.multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(e){this._stateChanges.next(e)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}static \u0275fac=function(t){return new(t||a)};static \u0275dir=F({type:a,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:[2,"multi","multi",w]},exportAs:["cdkAccordion"],features:[A([{provide:Ve,useExisting:a}]),oe]})}return a})(),Ft=(()=>{class a{accordion=_(Ve,{optional:!0,skipSelf:!0});_changeDetectorRef=_(B);_expansionDispatcher=_(fe);_openCloseAllSubscription=re.EMPTY;closed=new T;opened=new T;destroyed=new T;expandedChange=new T;id=_(ne).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(e){if(this._expanded!==e){if(this._expanded=e,this.expandedChange.emit(e),e){this.opened.emit();let t=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,t)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=M(!1);_removeUniqueSelectionListener=()=>{};constructor(){}ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((e,t)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===t&&this.id!==e&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(e=>{this.disabled||(this.expanded=e)})}static \u0275fac=function(t){return new(t||a)};static \u0275dir=F({type:a,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",w],disabled:[2,"disabled","disabled",w]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[A([{provide:Ve,useValue:void 0}])]})}return a})(),Dt=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=q({type:a});static \u0275inj=X({})}return a})();var on=["body"],sn=["bodyWrapper"],ln=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],dn=["mat-expansion-panel-header","*","mat-action-row"];function cn(a,l){}var hn=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],mn=["mat-panel-title","mat-panel-description","*"];function _n(a,l){a&1&&(le(0,"span",1),Xe(),le(1,"svg",2),Ge(2,"path",3),Me()())}var Oe=new I("MAT_ACCORDION"),Vt=new I("MAT_EXPANSION_PANEL"),un=(()=>{class a{_template=_($e);_expansionPanel=_(Vt,{optional:!0});constructor(){}static \u0275fac=function(t){return new(t||a)};static \u0275dir=F({type:a,selectors:[["ng-template","matExpansionPanelContent",""]]})}return a})(),Ot=new I("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),Be=(()=>{class a extends Ft{_viewContainerRef=_(Ze);_animationsDisabled=ge();_document=_(je);_ngZone=_(j);_elementRef=_(H);_renderer=_(Z);_cleanupTransitionEnd;get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(e){this._hideToggle=e}_hideToggle=!1;get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(e){this._togglePosition=e}_togglePosition;afterExpand=new T;afterCollapse=new T;_inputChanges=new z;accordion=_(Oe,{optional:!0,skipSelf:!0});_lazyContent;_body;_bodyWrapper;_portal;_headerId=_(ne).getId("mat-expansion-panel-header-");constructor(){super();let e=_(Ot,{optional:!0});this._expansionDispatcher=_(fe),e&&(this.hideToggle=e.hideToggle)}_hasSpacing(){return this.accordion?this.expanded&&this.accordion.displayMode==="default":!1}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe(xe(null),$(()=>this.expanded&&!this._portal),ze(1)).subscribe(()=>{this._portal=new bt(this._lazyContent._template,this._viewContainerRef)}),this._setupAnimationEvents()}ngOnChanges(e){this._inputChanges.next(e)}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransitionEnd?.(),this._inputChanges.complete()}_containsFocus(){if(this._body){let e=this._document.activeElement,t=this._body.nativeElement;return e===t||t.contains(e)}return!1}_transitionEndListener=({target:e,propertyName:t})=>{e===this._bodyWrapper?.nativeElement&&t==="grid-template-rows"&&this._ngZone.run(()=>{this.expanded?this.afterExpand.emit():this.afterCollapse.emit()})};_setupAnimationEvents(){this._ngZone.runOutsideAngular(()=>{this._animationsDisabled?(this.opened.subscribe(()=>this._ngZone.run(()=>this.afterExpand.emit())),this.closed.subscribe(()=>this._ngZone.run(()=>this.afterCollapse.emit()))):setTimeout(()=>{let e=this._elementRef.nativeElement;this._cleanupTransitionEnd=this._renderer.listen(e,"transitionend",this._transitionEndListener),e.classList.add("mat-expansion-panel-animations-enabled")},200)})}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=U({type:a,selectors:[["mat-expansion-panel"]],contentQueries:function(t,n,r){if(t&1&&ee(r,un,5),t&2){let u;E(u=k())&&(n._lazyContent=u.first)}},viewQuery:function(t,n){if(t&1&&te(on,5)(sn,5),t&2){let r;E(r=k())&&(n._body=r.first),E(r=k())&&(n._bodyWrapper=r.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:4,hostBindings:function(t,n){t&2&&R("mat-expanded",n.expanded)("mat-expansion-panel-spacing",n._hasSpacing())},inputs:{hideToggle:[2,"hideToggle","hideToggle",w],togglePosition:"togglePosition"},outputs:{afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[A([{provide:Oe,useValue:void 0},{provide:Vt,useExisting:a}]),K,oe],ngContentSelectors:dn,decls:9,vars:4,consts:[["bodyWrapper",""],["body",""],[1,"mat-expansion-panel-content-wrapper"],["role","region",1,"mat-expansion-panel-content",3,"id"],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(t,n){t&1&&(J(ln),O(0),i(1,"div",2,0)(3,"div",3,1)(5,"div",4),O(6,1),Ke(7,cn,0,0,"ng-template",5),o(),O(8,2),o()()),t&2&&(c(),V("inert",n.expanded?null:""),c(2),C("id",n.id),V("aria-labelledby",n._headerId),c(4),C("cdkPortalOutlet",n._portal))},dependencies:[xt],styles:[`.mat-expansion-panel {
  box-sizing: content-box;
  display: block;
  margin: 0;
  overflow: hidden;
}
.mat-expansion-panel.mat-expansion-panel-animations-enabled {
  transition: margin 225ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel {
  position: relative;
  background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  color: var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));
  border-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-expansion-panel:not([class*=mat-elevation-z]) {
  box-shadow: var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}
.mat-accordion .mat-expansion-panel:not(.mat-expanded), .mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing) {
  border-radius: 0;
}
.mat-accordion .mat-expansion-panel:first-of-type {
  border-top-right-radius: var(--mat-expansion-container-shape, 12px);
  border-top-left-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-accordion .mat-expansion-panel:last-of-type {
  border-bottom-right-radius: var(--mat-expansion-container-shape, 12px);
  border-bottom-left-radius: var(--mat-expansion-container-shape, 12px);
}
@media (forced-colors: active) {
  .mat-expansion-panel {
    outline: solid 1px;
  }
}

.mat-expansion-panel-content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 100%;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper {
  transition: grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
  grid-template-rows: 1fr;
}
@supports not (grid-template-rows: 0fr) {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}
@media print {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}

.mat-expansion-panel-content {
  display: flex;
  flex-direction: column;
  overflow: visible;
  min-height: 0;
  visibility: hidden;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content {
  transition: visibility 190ms linear;
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper > .mat-expansion-panel-content {
  visibility: visible;
}
.mat-expansion-panel-content {
  font-family: var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));
  line-height: var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));
  letter-spacing: var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking));
}

.mat-expansion-panel-body {
  padding: 0 24px 16px;
}

.mat-expansion-panel-spacing {
  margin: 16px 0;
}
.mat-accordion > .mat-expansion-panel-spacing:first-child, .mat-accordion > *:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-top: 0;
}
.mat-accordion > .mat-expansion-panel-spacing:last-child, .mat-accordion > *:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-bottom: 0;
}

.mat-action-row {
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px 8px 16px 24px;
  border-top-color: var(--mat-expansion-actions-divider-color, var(--mat-sys-outline));
}
.mat-action-row .mat-button-base,
.mat-action-row .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-action-row .mat-button-base,
[dir=rtl] .mat-action-row .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}
`],encapsulation:2,changeDetection:0})}return a})();var Ue=(()=>{class a{panel=_(Be,{host:!0});_element=_(H);_focusMonitor=_(ut);_changeDetectorRef=_(B);_parentChangeSubscription=re.EMPTY;constructor(){_(_e).load(pe);let e=this.panel,t=_(Ot,{optional:!0}),n=_(new Je("tabindex"),{optional:!0}),r=e.accordion?e.accordion._stateChanges.pipe($(u=>!!(u.hideToggle||u.togglePosition))):Le;this.tabIndex=parseInt(n||"")||0,this._parentChangeSubscription=We(e.opened,e.closed,r,e._inputChanges.pipe($(u=>!!(u.hideToggle||u.disabled||u.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),e.closed.pipe($(()=>e._containsFocus())).subscribe(()=>this._focusMonitor.focusVia(this._element,"program")),t&&(this.expandedHeight=t.expandedHeight,this.collapsedHeight=t.collapsedHeight)}expandedHeight;collapsedHeight;tabIndex=0;get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){let e=this._isExpanded();return e&&this.expandedHeight?this.expandedHeight:!e&&this.collapsedHeight?this.collapsedHeight:null}_keydown(e){switch(e.keyCode){case 32:case 13:pt(e)||(e.preventDefault(),this._toggle());break;default:this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(e);return}}focus(e,t){e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(e=>{e&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=U({type:a,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:13,hostBindings:function(t,n){t&1&&h("click",function(){return n._toggle()})("keydown",function(u){return n._keydown(u)}),t&2&&(V("id",n.panel._headerId)("tabindex",n.disabled?-1:n.tabIndex)("aria-controls",n._getPanelId())("aria-expanded",n._isExpanded())("aria-disabled",n.panel.disabled),de("height",n._getHeaderHeight()),R("mat-expanded",n._isExpanded())("mat-expansion-toggle-indicator-after",n._getTogglePosition()==="after")("mat-expansion-toggle-indicator-before",n._getTogglePosition()==="before"))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:P(e)]},ngContentSelectors:mn,decls:5,vars:3,consts:[[1,"mat-content"],[1,"mat-expansion-indicator"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 -960 960 960","aria-hidden","true","focusable","false"],["d","M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],template:function(t,n){t&1&&(J(hn),le(0,"span",0),O(1),O(2,1),O(3,2),Me(),x(4,_n,3,0,"span",1)),t&2&&(R("mat-content-hide-toggle",!n._showToggle()),c(4),v(n._showToggle()?4:-1))},styles:[`.mat-expansion-panel-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  border-radius: inherit;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-header {
  transition: height 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header::before {
  border-radius: inherit;
}
.mat-expansion-panel-header {
  height: var(--mat-expansion-header-collapsed-state-height, 48px);
  font-family: var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));
  font-size: var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));
  font-weight: var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));
  line-height: var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));
  letter-spacing: var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking));
}
.mat-expansion-panel-header.mat-expanded {
  height: var(--mat-expansion-header-expanded-state-height, 64px);
}
.mat-expansion-panel-header[aria-disabled=true] {
  color: var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-expansion-panel-header:not([aria-disabled=true]) {
  cursor: pointer;
}
.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
  background: var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
@media (hover: none) {
  .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
    background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  }
}
.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused, .mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused {
  background: var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
.mat-expansion-panel-header._mat-animation-noopable {
  transition: none;
}
.mat-expansion-panel-header:focus, .mat-expansion-panel-header:hover {
  outline: none;
}
.mat-expansion-panel-header.mat-expanded:focus, .mat-expansion-panel-header.mat-expanded:hover {
  background: inherit;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before {
  flex-direction: row-reverse;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 16px 0 0;
}
[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 0 0 16px;
}

.mat-content {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
.mat-content.mat-content-hide-toggle {
  margin-right: 8px;
}
[dir=rtl] .mat-content.mat-content-hide-toggle {
  margin-right: 0;
  margin-left: 8px;
}
.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-left: 24px;
  margin-right: 0;
}
[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-right: 24px;
  margin-left: 0;
}

.mat-expansion-panel-header-title {
  color: var(--mat-expansion-header-text-color, var(--mat-sys-on-surface));
}

.mat-expansion-panel-header-title,
.mat-expansion-panel-header-description {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 16px;
  align-items: center;
}
[dir=rtl] .mat-expansion-panel-header-title,
[dir=rtl] .mat-expansion-panel-header-description {
  margin-right: 0;
  margin-left: 16px;
}
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description {
  color: inherit;
}

.mat-expansion-panel-header-description {
  flex-grow: 2;
  color: var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant));
}

.mat-expansion-panel-animations-enabled .mat-expansion-indicator {
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator {
  transform: rotate(180deg);
}
.mat-expansion-indicator::after {
  border-style: solid;
  border-width: 0 2px 2px 0;
  content: "";
  padding: 3px;
  transform: rotate(45deg);
  vertical-align: middle;
  color: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-legacy-header-indicator-display, none);
}
.mat-expansion-indicator svg {
  width: 24px;
  height: 24px;
  margin: 0 -8px;
  vertical-align: middle;
  fill: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-header-indicator-display, inline-block);
}

@media (forced-colors: active) {
  .mat-expansion-panel-content {
    border-top: 1px solid;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
`],encapsulation:2,changeDetection:0})}return a})();var Bt=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275dir=F({type:a,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]})}return a})(),Ut=(()=>{class a extends Pt{_keyManager;_ownHeaders=new Qe;_headers;hideToggle=!1;displayMode="default";togglePosition="after";ngAfterContentInit(){this._headers.changes.pipe(xe(this._headers)).subscribe(e=>{this._ownHeaders.reset(e.filter(t=>t.panel.accordion===this)),this._ownHeaders.notifyOnChanges()}),this._keyManager=new gt(this._ownHeaders).withWrap().withHomeAndEnd()}_handleHeaderKeydown(e){this._keyManager.onKeydown(e)}_handleHeaderFocus(e){this._keyManager.updateActiveItem(e)}ngOnDestroy(){super.ngOnDestroy(),this._keyManager?.destroy(),this._ownHeaders.destroy()}static \u0275fac=(()=>{let e;return function(n){return(e||(e=qe(a)))(n||a)}})();static \u0275dir=F({type:a,selectors:[["mat-accordion"]],contentQueries:function(t,n,r){if(t&1&&ee(r,Ue,5),t&2){let u;E(u=k())&&(n._headers=u)}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(t,n){t&2&&R("mat-accordion-multi",n.multi)},inputs:{hideToggle:[2,"hideToggle","hideToggle",w],displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[A([{provide:Oe,useExisting:a}]),K]})}return a})(),Nt=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=q({type:a});static \u0275inj=X({imports:[Dt,vt,ue]})}return a})();var Ne=zt(Ht());var gn=()=>({label:"\u9996\u9801",link:"/home"}),fn=()=>({label:"\u79DF\u8CC3\u7269\u5A92\u5408"}),bn=(a,l)=>[a,l],xn=(a,l)=>["/rental-matching-detail",a,l],vn=(a,l)=>l.displayType+"_"+(l.id||l.Id);function Cn(a,l){if(a&1){let e=Ye();i(0,"div",62)(1,"div",63)(2,"span",11),s(3,"rule"),o(),i(4,"h3",12),s(5,"\u751F\u6D3B\u98A8\u683C"),o()(),i(6,"div",64)(7,"input",65),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("lifeStyle","\u7981\u83F8",n))}),o(),i(8,"label",66),s(9,"\u7981\u83F8"),o()(),i(10,"div",64)(11,"input",67),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("lifeStyle","\u5B89\u975C",n))}),o(),i(12,"label",68),s(13,"\u5B89\u975C"),o()(),i(14,"div",64)(15,"input",69),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("lifeStyle","\u53EF\u990A\u5BF5\u7269",n))}),o(),i(16,"label",70),s(17,"\u53EF\u990A\u5BF5\u7269"),o()()(),i(18,"mat-accordion",71)(19,"mat-expansion-panel",72),h("opened",function(){p(e);let n=d();return g(n.panelOpenState.set(!0))})("closed",function(){p(e);let n=d();return g(n.panelOpenState.set(!1))}),i(20,"mat-expansion-panel-header",73)(21,"mat-panel-title",74),s(22,"\u5C55\u958B\u9032\u968E\u689D\u4EF6\u7BE9\u9078"),o()(),i(23,"div",75)(24,"div",76)(25,"div",63)(26,"span",11),s(27,"home"),o(),i(28,"h3",12),s(29,"\u662F\u5426\u8207\u51FA\u79DF\u4EBA\u540C\u4F4F"),o()(),i(30,"div",77)(31,"div",78)(32,"input",79),h("ngModelChange",function(n){p(e);let r=d();return g(r.setLivingWithLessorFilter(n))}),o(),i(33,"label",80),s(34," \u4E0D\u9650 "),o()(),i(35,"div",78)(36,"input",81),h("ngModelChange",function(n){p(e);let r=d();return g(r.setLivingWithLessorFilter(n))}),o(),i(37,"label",82),s(38," \u8207\u51FA\u79DF\u4EBA\u540C\u4F4F "),o()(),i(39,"div",78)(40,"input",83),h("ngModelChange",function(n){p(e);let r=d();return g(r.setLivingWithLessorFilter(n))}),o(),i(41,"label",84),s(42," \u4E0D\u8207\u51FA\u79DF\u4EBA\u540C\u4F4F "),o()()()()(),f(43,"hr",85),i(44,"div",76)(45,"div",63)(46,"span",11),s(47,"cleaning_services"),o(),i(48,"h3",12),s(49,"\u516C\u5171\u7A7A\u9593\u6574\u6F54\u8981\u6C42"),o()(),i(50,"div",77)(51,"div",78)(52,"input",86),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cleanLevels",1,n))}),o(),i(53,"label",87),s(54,"\u57FA\u672C\u6574\u6F54\u5373\u53EF"),o()(),i(55,"div",78)(56,"input",88),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cleanLevels",2,n))}),o(),i(57,"label",89),s(58,"\u5076\u723E\u6574\u7406"),o()(),i(59,"div",78)(60,"input",90),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cleanLevels",3,n))}),o(),i(61,"label",91),s(62,"\u4E00\u822C\u4E7E\u6DE8"),o()(),i(63,"div",78)(64,"input",92),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cleanLevels",4,n))}),o(),i(65,"label",93),s(66,"\u9700\u4FDD\u6301\u6574\u6F54"),o()(),i(67,"div",78)(68,"input",94),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cleanLevels",5,n))}),o(),i(69,"label",95),s(70,"\u9AD8\u5EA6\u91CD\u8996\u6574\u6F54"),o()()()(),f(71,"hr",85),i(72,"div",76)(73,"div",63)(74,"span",11),s(75,"volume_down"),o(),i(76,"h3",12),s(77,"\u5C45\u4F4F\u5B89\u975C\u8981\u6C42"),o()(),i(78,"div",77)(79,"div",78)(80,"input",96),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("noiseToleranceLevels",1,n))}),o(),i(81,"label",97),s(82,"\u975E\u5E38\u91CD\u8996\u5B89\u975C"),o()(),i(83,"div",78)(84,"input",98),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("noiseToleranceLevels",2,n))}),o(),i(85,"label",99),s(86,"\u504F\u597D\u5B89\u975C"),o()(),i(87,"div",78)(88,"input",100),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("noiseToleranceLevels",3,n))}),o(),i(89,"label",101),s(90,"\u4E00\u822C\u751F\u6D3B\u97F3\u53EF\u63A5\u53D7"),o()(),i(91,"div",78)(92,"input",102),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("noiseToleranceLevels",4,n))}),o(),i(93,"label",103),s(94,"\u53EF\u63A5\u53D7\u5076\u723E\u5435\u96DC"),o()(),i(95,"div",78)(96,"input",104),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("noiseToleranceLevels",5,n))}),o(),i(97,"label",105),s(98,"\u53EF\u63A5\u53D7\u71B1\u9B27\u74B0\u5883"),o()()(),f(99,"hr",85),i(100,"div",76)(101,"div",63)(102,"span",11),s(103,"routine"),o(),i(104,"h3",12),s(105,"\u4F5C\u606F\u578B\u614B"),o()(),i(106,"div",77)(107,"div",78)(108,"input",106),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("routines","\u65E9\u7761\u65E9\u8D77",n))}),o(),i(109,"label",107),s(110,"\u65E9\u7761\u65E9\u8D77"),o()(),i(111,"div",78)(112,"input",108),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("routines","\u6B63\u5E38\u4F5C\u606F",n))}),o(),i(113,"label",109),s(114,"\u6B63\u5E38\u4F5C\u606F"),o()(),i(115,"div",78)(116,"input",110),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("routines","\u591C\u8C93\u5B50",n))}),o(),i(117,"label",111),s(118,"\u591C\u8C93\u5B50"),o()()()(),f(119,"hr",85),i(120,"div",76)(121,"div",63)(122,"span",11),s(123,"do_not_disturb_on"),o(),i(124,"h3",12),s(125,"\u6DF1\u591C\u6D17\u8863/\u6D17\u6FA1\u9650\u5236"),o()(),i(126,"div",77)(127,"div",78)(128,"input",112),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("showerRestrictions","\u7121\u9650\u5236",n))}),o(),i(129,"label",113),s(130,"\u7121\u9650\u5236"),o()(),i(131,"div",78)(132,"input",114),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("showerRestrictions","22:00\u5F8C\u7981\u6B62",n))}),o(),i(133,"label",115),s(134,"22:00\u5F8C\u7981\u6B62"),o()(),i(135,"div",78)(136,"input",116),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("showerRestrictions","23:00\u5F8C\u7981\u6B62",n))}),o(),i(137,"label",117),s(138,"23:00\u5F8C\u7981\u6B62"),o()()()(),f(139,"hr",85),i(140,"div",76)(141,"div",63)(142,"span",11),s(143,"groups"),o(),i(144,"h3",12),s(145,"\u8A2A\u5BA2\u7559\u5BBF\u898F\u7BC4"),o()(),i(146,"div",77)(147,"div",78)(148,"input",118),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("visitorPolicies","\u5B8C\u5168\u8B1D\u7D55\u8A2A\u5BA2",n))}),o(),i(149,"label",119),s(150,"\u5B8C\u5168\u8B1D\u7D55\u8A2A\u5BA2"),o()(),i(151,"div",78)(152,"input",120),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("visitorPolicies","\u50C5\u9650\u767D\u5929\u62DC\u8A2A",n))}),o(),i(153,"label",121),s(154,"\u50C5\u9650\u767D\u5929\u62DC\u8A2A"),o()(),i(155,"div",78)(156,"input",122),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("visitorPolicies","\u53EF\u5E36\u7570\u6027\u6216\u540C\u6027\u904E\u591C",n))}),o(),i(157,"label",123),s(158,"\u53EF\u5E36\u7570\u6027\u6216\u540C\u6027\u904E\u591C"),o()()()(),f(159,"hr",85),i(160,"div",76)(161,"div",63)(162,"span",11),s(163,"chef_hat"),o(),i(164,"h3",12),s(165,"\u5EDA\u623F\u8207\u98F2\u98DF\u6587\u5316"),o()(),i(166,"div",77)(167,"div",78)(168,"input",124),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cookingHabits","\u53EF\u5927\u706B\u5FEB\u7092",n))}),o(),i(169,"label",125),s(170,"\u53EF\u5927\u706B\u5FEB\u7092"),o()(),i(171,"div",78)(172,"input",126),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cookingHabits","\u50C5\u9650\u8F15\u98DF\u5FAE\u6CE2",n))}),o(),i(173,"label",127),s(174,"\u50C5\u9650\u8F15\u98DF\u5FAE\u6CE2"),o()(),i(175,"div",78)(176,"input",128),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("cookingHabits","\u7981\u958B\u4F19",n))}),o(),i(177,"label",129),s(178,"\u7981\u958B\u4F19"),o()()()(),f(179,"hr",85),i(180,"div",76)(181,"div",63)(182,"span",11),s(183,"kitchen"),o(),i(184,"h3",12),s(185,"\u51B0\u7BB1\u4F7F\u7528\u5206\u914D"),o()(),i(186,"div",77)(187,"div",78)(188,"input",130),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("fridgeAllocations","\u5404\u81EA\u7368\u7ACB\u5206\u5C64",n))}),o(),i(189,"label",131),s(190,"\u5404\u81EA\u7368\u7ACB\u5206\u5C64"),o()(),i(191,"div",78)(192,"input",132),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("fridgeAllocations","\u8CBC\u6A19\u7C64\u5373\u53EF",n))}),o(),i(193,"label",133),s(194,"\u8CBC\u6A19\u7C64\u5373\u53EF"),o()(),i(195,"div",78)(196,"input",134),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("fridgeAllocations","\u5171\u540C\u5206\u4EAB",n))}),o(),i(197,"label",135),s(198,"\u5171\u540C\u5206\u4EAB"),o()()()(),f(199,"hr",85),i(200,"div",76)(201,"div",63)(202,"span",11),s(203,"conversation"),o(),i(204,"h3",12),s(205,"\u671F\u671B\u4EA4\u6D41\u983B\u7387"),o()(),i(206,"div",77)(207,"div",78)(208,"input",136),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("interactionFrequencies","\u7D14\u79DF\u5C4B\u4E92\u4E0D\u6253\u64FE",n))}),o(),i(209,"label",137),s(210,"\u7D14\u79DF\u5C4B\u4E92\u4E0D\u6253\u64FE"),o()(),i(211,"div",78)(212,"input",138),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("interactionFrequencies","\u9858\u610F\u6BCF\u9031\u5171\u9910\u804A\u5929",n))}),o(),i(213,"label",139),s(214,"\u9858\u610F\u6BCF\u9031\u5171\u9910\u804A\u5929"),o()(),i(215,"div",78)(216,"input",140),h("change",function(n){p(e);let r=d();return g(r.toggleCheckbox("interactionFrequencies","\u671F\u5F85\u6280\u80FD\u50B3\u627F\u4EA4\u6D41",n))}),o(),i(217,"label",141),s(218,"\u671F\u5F85\u6280\u80FD\u50B3\u627F\u4EA4\u6D41"),o()()()()()()()}if(a&2){let e=d();c(32),C("ngModel",e.filters.livingWithLessor)("value",null),c(4),C("ngModel",e.filters.livingWithLessor)("value",!0),c(4),C("ngModel",e.filters.livingWithLessor)("value",!1)}}function yn(a,l){a&1&&(i(0,"div",142),f(1,"div",143),i(2,"div",144),f(3,"div",145)(4,"div",146)(5,"div",147),i(6,"div",148),f(7,"span")(8,"span"),o(),f(9,"div",149),o()())}function Mn(a,l){if(a&1&&G(0,yn,10,0,"div",142,se),a&2){let e=d();Y(e.loadingCards)}}function En(a,l){if(a&1&&(i(0,"div",61)(1,"p",150),s(2),o()()),a&2){let e=d();c(2),ce(e.rentalLoadError())}}function kn(a,l){if(a&1&&(i(0,"div",152),s(1),o()),a&2){let e=d().$implicit;c(),S(" \u2728 \u5951\u5408\u5EA6 ",e.score,"\u5206 ")}}function wn(a,l){if(a&1&&f(0,"img",153),a&2){let e=d().$implicit;C("src",e.url||"assets/default-house.jpg",Ce)("alt",e.name||e.Name||"\u79DF\u8CC3\u7269\u5716\u7247")}}function Tn(a,l){if(a&1&&f(0,"img",153),a&2){let e=d().$implicit;C("src",e.url||"assets/default-product.jpg",Ce)("alt",e.name||e.Name||"\u79DF\u8CC3\u7269\u5716\u7247")}}function Sn(a,l){if(a&1&&(i(0,"p",155),s(1),Te(2,"number"),i(3,"span",160),s(4," / \u6708"),o()()),a&2){let e=d().$implicit;c(),S(" NT$ ",Se(2,1,e.rentPrice||e.RentPrice)," ")}}function In(a,l){if(a&1&&(i(0,"p",155),s(1),Te(2,"number"),i(3,"span",160),s(4),o()()),a&2){let e=d().$implicit;c(),S(" NT$ ",Se(2,2,e.price||e.Price)," "),c(3),S(" / ",e.priceUnit||e.PriceUnit||"\u6B21"," ")}}function Rn(a,l){if(a&1&&(i(0,"span",161),s(1,"location_on"),o(),i(2,"span",162),s(3),o()),a&2){let e=d().$implicit;c(3),S(" ",e.address||e.Address||"\u7121\u5730\u9EDE\u8CC7\u8A0A"," ")}}function An(a,l){if(a&1&&(i(0,"span",157),s(1),o()),a&2){let e=d().$implicit;c(),S(" ",e.category||e.Category||"\u5171\u4EAB\u9805\u76EE"," ")}}function Pn(a,l){a&1&&(i(0,"span",163),s(1,"\u53EF\u990A\u5BF5\u7269"),o())}function Fn(a,l){a&1&&(i(0,"span",163),s(1,"\u7981\u83F8"),o())}function Dn(a,l){if(a&1&&(x(0,Pn,2,0,"span",163),x(1,Fn,2,0,"span",163)),a&2){let e=d().$implicit;v(e.pet||e.Pet?0:-1),c(),v(e.smoke===!1||e.Smoke===!1?1:-1)}}function Vn(a,l){}function On(a,l){}function Bn(a,l){if(a&1&&(x(0,Vn,0,0),x(1,On,0,0)),a&2){let e=d().$implicit;v(e.ownTool||e.OwnTool?0:-1),c(),v(e.requiredKnowledge||e.RequiredKnowledge?1:-1)}}function Un(a,l){if(a&1&&(i(0,"div",151),x(1,kn,2,1,"div",152),x(2,wn,1,2,"img",153)(3,Tn,1,2,"img",153),i(4,"div",144)(5,"h2",154),s(6),o(),x(7,Sn,5,3,"p",155)(8,In,5,4,"p",155),i(9,"p",156),x(10,Rn,4,1)(11,An,2,1,"span",157),o(),i(12,"div",158),x(13,Dn,2,2),x(14,Bn,2,2),o(),i(15,"a",159),s(16," \u67E5\u770B\u8A73\u60C5 "),o()()()),a&2){let e=l.$implicit,t=d(2);c(),v(t.filters.isSmartMatch&&e.score&&e.score>=80?1:-1),c(),v(e.displayType==="room"?2:3),c(4),S(" ",e.name||e.Name," "),c(),v(e.displayType==="room"?7:8),c(3),v(e.displayType==="room"?10:11),c(3),v(e.displayType==="room"?13:-1),c(),v(e.displayType==="product"?14:-1),c(),C("routerLink",we(8,xn,e.displayType,e.id||e.Id))}}function Nn(a,l){a&1&&(i(0,"div",61)(1,"p",150),s(2,"\u76EE\u524D\u6C92\u6709\u53EF\u7528\u7684\u5171\u5C45\u6216\u6280\u80FD\u5171\u4EAB\u7A7A\u9593\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002"),o()())}function Ln(a,l){if(a&1&&G(0,Un,17,11,"div",151,vn,!1,Nn,3,0,"div",61),a&2){let e=d();Y(e.rentalItems())}}var Lt=class a{constructor(l,e){this.rentalMatchingService=l;this.router=e}isRentalLoading=M(!1);rentalLoadError=M("");loadingCards=Array.from({length:6});rentalSearchRequestId=0;filters={category:"all",city:"",priceMin:0,priceMax:5e4,sortOrder:"newest",isSmartMatch:!1,lifeStyle:[],cleanLevels:[],noiseToleranceLevels:[],livingWithLessor:null,routines:[],showerRestrictions:[],visitorPolicies:[],cookingHabits:[],fridgeAllocations:[],interactionFrequencies:[]};houses=M([]);products=M([]);rentalItems=M([]);rentalItemCount=he(()=>this.rentalItems().length);viewMode="grid";isFilterCollapsed=M(!1);panelOpenState=M(!1);lightboxImage=M(null);ngOnInit(){this.loadRentals(),this.loadProducts(),this.applyFilters()}applyFilters(){let l=localStorage.getItem("userId"),e=l!==null&&l!=="null"&&l!=="undefined"&&l!=="",t=Number(localStorage.getItem("subscriptionTier"))||1;if(this.filters.isSmartMatch){if(!e){setTimeout(()=>{this.filters.isSmartMatch=!1},50),Ne.default.fire({icon:"warning",title:"\u9700\u8981\u767B\u5165",text:"\u8ACB\u5148\u767B\u5165\u6703\u54E1\uFF0C\u624D\u80FD\u4F7F\u7528 AI \u667A\u6167\u5C0B\u5C4B\u529F\u80FD\u5594\uFF01\u{1F916}",confirmButtonColor:"#e07a5f",confirmButtonText:"\u78BA\u5B9A"});return}if(t<3){setTimeout(()=>{this.filters.isSmartMatch=!1},50),Ne.default.fire({icon:"info",title:"VIP \u5C08\u5C6C\u529F\u80FD \u{1F48E}",text:"AI \u667A\u6167\u5C0B\u5C4B\u70BA VIP \u5C08\u5C6C\u529F\u80FD\uFF0C\u8ACB\u5347\u7D1A\u6703\u54E1\u7B49\u7D1A\u5F8C\u518D\u8A66\u5594\uFF01",confirmButtonColor:"#e07a5f",confirmButtonText:"\u6211\u77E5\u9053\u4E86"});return}}console.log("\u6E96\u5099\u50B3\u9001\u7D66\u5F8C\u7AEF\u7684\u689D\u4EF6:",this.filters);let n=++this.rentalSearchRequestId;this.isRentalLoading.set(!0),this.rentalLoadError.set(""),this.rentalMatchingService.searchRentals(this.filters).pipe(He(()=>{n===this.rentalSearchRequestId&&this.isRentalLoading.set(!1)})).subscribe({next:r=>{if(n!==this.rentalSearchRequestId)return;console.log("\u3010\u524D\u7AEF\u6AA2\u67E5\u3011\u5F8C\u7AEF\u6210\u529F\u56DE\u50B3\u8CC7\u6599\uFF1A",r);let u=Array.isArray(r)?r:r?.data||r?.items||[];u=u.filter(b=>Number(b.status??b.Status)===1);let y=u.map(b=>{let D="room";return b.productType==="House"||b.ProductType==="House"?D="room":b.productType==="Product"||b.ProductType==="Product"||b.productType==="Skill"?D="product":D=b.price!==void 0||b.Price!==void 0||b.priceUnit!==void 0?"product":"room",ae(ie({},b),{displayType:D,url:this.getCoverUrl(b),score:b.score?b.score:Math.floor(Math.random()*39)+60})});this.filters.isSmartMatch&&(y=y.filter(b=>b.score>=80),y.sort((b,D)=>D.score-b.score)),this.rentalItems.set(y)},error:r=>{n===this.rentalSearchRequestId&&(console.error("\u641C\u5C0B\u5931\u6557",r),this.rentalItems.set([]),this.rentalLoadError.set("\u8CC7\u6599\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002"))}})}toggleCheckbox(l,e,t){let n=t.target.checked,r=[...this.filters[l]];if(n)r.includes(e)||r.push(e);else{let u=r.indexOf(e);u>-1&&r.splice(u,1)}this.filters=ae(ie({},this.filters),{[l]:r}),this.applyFilters()}loadRentals(){this.rentalMatchingService.getRentals().subscribe({next:l=>{let e=l.filter(t=>t.status===1||t.Status===1);this.houses.set(e),console.log("\u6210\u529F\u5F9E\u8CC7\u6599\u5EAB\u6293\u53D6\u623F\u5C4B\u8CC7\u6599\uFF01",e)},error:l=>console.error("\u6293\u53D6\u623F\u5C4B\u8CC7\u6599\u5931\u6557",l)})}loadProducts(){this.rentalMatchingService.getProducts().subscribe({next:l=>{this.products.set(l),console.log("\u6210\u529F\u5F9E\u8CC7\u6599\u5EAB\u6293\u53D6\u5DE5\u5177/\u6280\u80FD\u8CC7\u6599\uFF01",l)},error:l=>console.error("\u6293\u53D6\u5DE5\u5177/\u6280\u80FD\u8CC7\u6599\u5931\u6557",l)})}getCoverUrl(l){let e="";if(l.coverUrl)e=l.coverUrl;else if(l.CoverUrl)e=l.CoverUrl;else if(l.images&&l.images.length>0){let t=l.images.find(n=>n.isCover===!0||n.IsCover===!0);e=t?t.url||t.Url:l.images[0].url||l.images[0].Url}else if(l.Images&&l.Images.length>0){let t=l.Images.find(n=>n.isCover===!0||n.IsCover===!0);e=t?t.url||t.Url:l.Images[0].url||l.Images[0].Url}else l.imageUrls&&l.imageUrls.length>0?e=l.imageUrls[0]:l.ImageUrls&&l.ImageUrls.length>0?e=l.ImageUrls[0]:l.url?e=l.url:l.Url&&(e=l.Url);return e?e.startsWith("/")?`https://localhost:7215${e}`:e:"https://via.placeholder.com/400x300/EFEFEF/999999?text=No+Image"}openLightbox(l){l&&this.lightboxImage.set(l)}closeLightbox(){this.lightboxImage.set(null)}navigateToDetail(l,e){if(!l){console.warn("\u627E\u4E0D\u5230\u8A72\u9805\u76EE\u7684 ID");return}this.router.navigate(["/rental-matching-detail",e,l])}formatPrice(l){return l==null?"0":l.toLocaleString()}toggleFilterPanel(){this.isFilterCollapsed.set(!this.isFilterCollapsed())}onToggleChange(){console.log("\u667A\u6167\u914D\u5C0D\u72C0\u614B\uFF1A",this.filters.isSmartMatch),this.applyFilters()}changeSortOrder(l){this.filters.sortOrder=l,this.applyFilters()}setLivingWithLessorFilter(l){this.filters=ae(ie({},this.filters),{livingWithLessor:l}),this.applyFilters()}static \u0275fac=function(e){return new(e||a)(ye(kt),ye(it))};static \u0275cmp=U({type:a,selectors:[["app-rental-matching-component"]],decls:121,vars:27,consts:[["eyebrow","Rental Matches","title","\u79DF\u8CC3\u7269\u5A92\u5408",3,"breadcrumbs"],[1,"rental-matching"],[1,"rental-matching__filter-panel"],[1,"rental-matching__filter-topbar"],[1,"rental-matching__filter-heading"],["type","button","aria-controls","rentalFilterBody",1,"rental-matching__filter-toggle",3,"click"],[1,"material-symbols-outlined","rental-matching__filter-toggle-icon"],[1,"rental-matching__filter-toggle-text"],["id","rentalFilterBody",1,"rental-matching__filter-body"],[1,"rental-matching__filter-section","rental-matching__filter-section--categories"],[1,"rental-matching__filter-title"],[1,"material-symbols-outlined","rental-matching__filter-icon"],[1,"rental-matching__filter-title-text"],[1,"rental-matching__option-group","rental-matching__option-group--vertical"],[1,"rental-matching__choice"],["type","radio","name","category","value","all",1,"rental-matching__choice-input",3,"ngModelChange","change","ngModel"],[1,"rental-matching__choice-text"],["type","radio","name","category","value","room",1,"rental-matching__choice-input",3,"ngModelChange","change","ngModel"],["type","radio","name","category","value","product",1,"rental-matching__choice-input",3,"ngModelChange","change","ngModel"],[1,"rental-matching__filter-section","rental-matching__filter-section--location"],["name","city","id","city",1,"rental-matching__select",3,"ngModelChange","change","ngModel"],["value","",1,"rental-matching__select-option"],["value","taipei",1,"rental-matching__select-option"],["value","new-taipei",1,"rental-matching__select-option"],["value","taoyuan",1,"rental-matching__select-option"],["value","taichung",1,"rental-matching__select-option"],["value","tainan",1,"rental-matching__select-option"],["value","kaohsiung",1,"rental-matching__select-option"],["value","keelung",1,"rental-matching__select-option"],["value","hsinchu-city",1,"rental-matching__select-option"],["value","chiayi-city",1,"rental-matching__select-option"],["value","hsinchu-county",1,"rental-matching__select-option"],["value","miaoli",1,"rental-matching__select-option"],["value","changhua",1,"rental-matching__select-option"],["value","nantou",1,"rental-matching__select-option"],["value","yunlin",1,"rental-matching__select-option"],["value","chiayi-county",1,"rental-matching__select-option"],["value","pingtung",1,"rental-matching__select-option"],["value","yilan",1,"rental-matching__select-option"],["value","hualien",1,"rental-matching__select-option"],["value","taitung",1,"rental-matching__select-option"],["value","penghu",1,"rental-matching__select-option"],["value","kinmen",1,"rental-matching__select-option"],["value","lienchiang",1,"rental-matching__select-option"],[1,"rental-matching__filter-section","rental-matching__filter-section--price"],[1,"range-slider","rental-matching__range-slider"],[1,"price-text","min-price","rental-matching__price-text","rental-matching__price-text--min"],["min","0","max","50000","step","1000",1,"rental-matching__mat-slider"],["matSliderStartThumb","",1,"rental-matching__slider-thumb","rental-matching__slider-thumb--start",3,"ngModelChange","change","ngModel"],["matSliderEndThumb","",1,"rental-matching__slider-thumb","rental-matching__slider-thumb--end",3,"ngModelChange","change","ngModel"],[1,"price-text","max-price","rental-matching__price-text","rental-matching__price-text--max"],[1,"rental-matching__divider"],[1,"filter-title","rental-matching__filter-title","rental-matching__filter-title--sort"],[1,"rental-matching__sort-options"],["type","button",1,"rental-matching__sort-button",3,"click"],[1,"rental-matching__room-filter-area"],["color","primary",1,"rental-matching__smart-toggle",3,"ngModelChange","change","ngModel"],[1,"rental-matching__smart-toggle-text"],[1,"rental-matching__line-break"],[1,"rental-matching__content"],[1,"rental-matching__grid"],[1,"empty-state","rental-matching__empty-state"],[1,"life-style","rental-matching__filter-section","rental-matching__filter-section--life-style"],[1,"filter-title","rental-matching__filter-title"],[1,"rental-matching__checkbox-row"],["type","checkbox","name","smoking","id","smoking",1,"rental-matching__checkbox",3,"change"],["for","smoking",1,"rental-matching__checkbox-label"],["type","checkbox","name","quiet","id","quiet",1,"rental-matching__checkbox",3,"change"],["for","quiet",1,"rental-matching__checkbox-label"],["type","checkbox","name","pets","id","pets",1,"rental-matching__checkbox",3,"change"],["for","pets",1,"rental-matching__checkbox-label"],[1,"rental-matching__accordion"],[1,"rental-matching__expansion-panel",3,"opened","closed"],[1,"rental-matching__expansion-header"],[1,"rental-matching__expansion-title"],[1,"advanced-coonditions","rental-matching__advanced-conditions"],[1,"rental-matching__advanced-section"],[1,"rental-matching__advanced-options"],[1,"rental-matching__radio-row"],["type","radio","name","livingWithLessor","id","living_with_lessor_all",1,"rental-matching__checkbox",3,"ngModelChange","ngModel","value"],["for","living_with_lessor_all",1,"rental-matching__radio-label"],["type","radio","name","livingWithLessor","id","living_with_lessor_yes",1,"rental-matching__checkbox",3,"ngModelChange","ngModel","value"],["for","living_with_lessor_yes",1,"rental-matching__radio-label"],["type","radio","name","livingWithLessor","id","living_with_lessor_no",1,"rental-matching__checkbox",3,"ngModelChange","ngModel","value"],["for","living_with_lessor_no",1,"rental-matching__radio-label"],[1,"rental-matching__advanced-divider"],["type","checkbox","id","clean_1",1,"rental-matching__checkbox",3,"change"],["for","clean_1",1,"rental-matching__radio-label"],["type","checkbox","id","clean_2",1,"rental-matching__checkbox",3,"change"],["for","clean_2",1,"rental-matching__radio-label"],["type","checkbox","id","clean_3",1,"rental-matching__checkbox",3,"change"],["for","clean_3",1,"rental-matching__radio-label"],["type","checkbox","id","clean_4",1,"rental-matching__checkbox",3,"change"],["for","clean_4",1,"rental-matching__radio-label"],["type","checkbox","id","clean_5",1,"rental-matching__checkbox",3,"change"],["for","clean_5",1,"rental-matching__radio-label"],["type","checkbox","id","noise_1",1,"rental-matching__checkbox",3,"change"],["for","noise_1",1,"rental-matching__radio-label"],["type","checkbox","id","noise_2",1,"rental-matching__checkbox",3,"change"],["for","noise_2",1,"rental-matching__radio-label"],["type","checkbox","id","noise_3",1,"rental-matching__checkbox",3,"change"],["for","noise_3",1,"rental-matching__radio-label"],["type","checkbox","id","noise_4",1,"rental-matching__checkbox",3,"change"],["for","noise_4",1,"rental-matching__radio-label"],["type","checkbox","id","noise_5",1,"rental-matching__checkbox",3,"change"],["for","noise_5",1,"rental-matching__radio-label"],["type","checkbox","name","routine","id","routine_early",1,"rental-matching__checkbox",3,"change"],["for","routine_early",1,"rental-matching__radio-label"],["type","checkbox","name","routine","id","routine_normal",1,"rental-matching__checkbox",3,"change"],["for","routine_normal",1,"rental-matching__radio-label"],["type","checkbox","name","routine","id","routine_night",1,"rental-matching__checkbox",3,"change"],["for","routine_night",1,"rental-matching__radio-label"],["type","checkbox","name","showerRestriction","id","shower_none",1,"rental-matching__checkbox",3,"change"],["for","shower_none",1,"rental-matching__radio-label"],["type","checkbox","name","showerRestriction","id","shower_22",1,"rental-matching__checkbox",3,"change"],["for","shower_22",1,"rental-matching__radio-label"],["type","checkbox","name","showerRestriction","id","shower_23",1,"rental-matching__checkbox",3,"change"],["for","shower_23",1,"rental-matching__radio-label"],["type","checkbox","name","visitorPolicy","id","visitor_none",1,"rental-matching__checkbox",3,"change"],["for","visitor_none",1,"rental-matching__radio-label"],["type","checkbox","name","visitorPolicy","id","visitor_day",1,"rental-matching__checkbox",3,"change"],["for","visitor_day",1,"rental-matching__radio-label"],["type","checkbox","name","visitorPolicy","id","visitor_overnight",1,"rental-matching__checkbox",3,"change"],["for","visitor_overnight",1,"rental-matching__radio-label"],["type","checkbox","name","cooking","id","cooking_heavy",1,"rental-matching__checkbox",3,"change"],["for","cooking_heavy",1,"rental-matching__radio-label"],["type","checkbox","name","cooking","id","cooking_light",1,"rental-matching__checkbox",3,"change"],["for","cooking_light",1,"rental-matching__radio-label"],["type","checkbox","name","cooking","id","cooking_none",1,"rental-matching__checkbox",3,"change"],["for","cooking_none",1,"rental-matching__radio-label"],["type","checkbox","name","fridge","id","fridge_layer",1,"rental-matching__checkbox",3,"change"],["for","fridge_layer",1,"rental-matching__radio-label"],["type","checkbox","name","fridge","id","fridge_label",1,"rental-matching__checkbox",3,"change"],["for","fridge_label",1,"rental-matching__radio-label"],["type","checkbox","name","fridge","id","fridge_share",1,"rental-matching__checkbox",3,"change"],["for","fridge_share",1,"rental-matching__radio-label"],["type","checkbox","name","interaction","id","interact_none",1,"rental-matching__checkbox",3,"change"],["for","interact_none",1,"rental-matching__radio-label"],["type","checkbox","name","interaction","id","interact_meal",1,"rental-matching__checkbox",3,"change"],["for","interact_meal",1,"rental-matching__radio-label"],["type","checkbox","name","interaction","id","interact_skill",1,"rental-matching__checkbox",3,"change"],["for","interact_skill",1,"rental-matching__radio-label"],["aria-hidden","true",1,"rental-item-card","rental-matching__card","rental-matching__skeleton-card"],[1,"rental-matching__skeleton-image"],[1,"rental-matching__card-body"],[1,"rental-matching__skeleton-line","rental-matching__skeleton-line--title"],[1,"rental-matching__skeleton-line","rental-matching__skeleton-line--price"],[1,"rental-matching__skeleton-line","rental-matching__skeleton-line--short"],[1,"rental-matching__skeleton-tags"],[1,"rental-matching__skeleton-button"],[1,"rental-matching__empty-text"],[1,"rental-item-card","rental-matching__card"],[1,"ai-score-badge"],[1,"rental-item-image","rental-matching__card-image",3,"src","alt"],[1,"rental-matching__card-title"],[1,"rental-matching__card-price"],[1,"rental-matching__card-info"],[1,"rental-matching__category-badge"],[1,"rental-matching__tags"],["target","_blank",1,"rental-matching__detail-button",3,"routerLink"],[1,"rental-matching__price-unit"],[1,"material-symbols-outlined","rental-matching__card-info-icon"],[1,"rental-matching__card-info-text"],[1,"rental-matching__tag"]],template:function(e,t){e&1&&(f(0,"app-page-hero",0),i(1,"main",1)(2,"div",2)(3,"div",3)(4,"h2",4),s(5,"\u7BE9\u9078\u689D\u4EF6"),o(),i(6,"button",5),h("click",function(){return t.toggleFilterPanel()}),i(7,"span",6),s(8),o(),i(9,"span",7),s(10),o()()(),i(11,"div",8)(12,"div",9)(13,"div",10)(14,"span",11),s(15,"category"),o(),i(16,"h3",12),s(17,"\u985E\u5225"),o()(),i(18,"div",13)(19,"label",14)(20,"input",15),W("ngModelChange",function(r){return L(t.filters.category,r)||(t.filters.category=r),r}),h("change",function(){return t.applyFilters()}),o(),i(21,"span",16),s(22,"\u4E0D\u9650"),o()(),i(23,"label",14)(24,"input",17),W("ngModelChange",function(r){return L(t.filters.category,r)||(t.filters.category=r),r}),h("change",function(){return t.applyFilters()}),o(),i(25,"span",16),s(26,"\u623F\u9593\u51FA\u79DF"),o()(),i(27,"label",14)(28,"input",18),W("ngModelChange",function(r){return L(t.filters.category,r)||(t.filters.category=r),r}),h("change",function(){return t.applyFilters()}),o(),i(29,"span",16),s(30,"\u5DE5\u5177 / \u6280\u80FD"),o()()()(),i(31,"div",19)(32,"div",10)(33,"span",11),s(34,"location_on"),o(),i(35,"h3",12),s(36,"\u5730\u9EDE"),o()(),i(37,"select",20),W("ngModelChange",function(r){return L(t.filters.city,r)||(t.filters.city=r),r}),h("change",function(){return t.applyFilters()}),i(38,"option",21),s(39,"\u9078\u64C7\u7E23\u5E02"),o(),i(40,"option",22),s(41,"\u81FA\u5317\u5E02"),o(),i(42,"option",23),s(43,"\u65B0\u5317\u5E02"),o(),i(44,"option",24),s(45,"\u6843\u5712\u5E02"),o(),i(46,"option",25),s(47,"\u81FA\u4E2D\u5E02"),o(),i(48,"option",26),s(49,"\u81FA\u5357\u5E02"),o(),i(50,"option",27),s(51,"\u9AD8\u96C4\u5E02"),o(),i(52,"option",28),s(53,"\u57FA\u9686\u5E02"),o(),i(54,"option",29),s(55,"\u65B0\u7AF9\u5E02"),o(),i(56,"option",30),s(57,"\u5609\u7FA9\u5E02"),o(),i(58,"option",31),s(59,"\u65B0\u7AF9\u7E23"),o(),i(60,"option",32),s(61,"\u82D7\u6817\u7E23"),o(),i(62,"option",33),s(63,"\u5F70\u5316\u7E23"),o(),i(64,"option",34),s(65,"\u5357\u6295\u7E23"),o(),i(66,"option",35),s(67,"\u96F2\u6797\u7E23"),o(),i(68,"option",36),s(69,"\u5609\u7FA9\u7E23"),o(),i(70,"option",37),s(71,"\u5C4F\u6771\u7E23"),o(),i(72,"option",38),s(73,"\u5B9C\u862D\u7E23"),o(),i(74,"option",39),s(75,"\u82B1\u84EE\u7E23"),o(),i(76,"option",40),s(77,"\u81FA\u6771\u7E23"),o(),i(78,"option",41),s(79,"\u6F8E\u6E56\u7E23"),o(),i(80,"option",42),s(81,"\u91D1\u9580\u7E23"),o(),i(82,"option",43),s(83,"\u9023\u6C5F\u7E23"),o()()(),i(84,"div",44)(85,"div",10)(86,"span",11),s(87,"price_change"),o(),i(88,"h3",12),s(89,"\u50F9\u683C\u7BC4\u570D(\u53F0\u5E63)"),o()(),i(90,"div",45)(91,"span",46),s(92),o(),i(93,"mat-slider",47)(94,"input",48),W("ngModelChange",function(r){return L(t.filters.priceMin,r)||(t.filters.priceMin=r),r}),h("change",function(){return t.applyFilters()}),o(),i(95,"input",49),W("ngModelChange",function(r){return L(t.filters.priceMax,r)||(t.filters.priceMax=r),r}),h("change",function(){return t.applyFilters()}),o()(),i(96,"span",50),s(97),o()()(),f(98,"hr",51),i(99,"div",52)(100,"span",11),s(101,"price_change"),o(),i(102,"h3",12),s(103,"\u4E0A\u67B6\u6642\u9593"),o()(),i(104,"div",53)(105,"button",54),h("click",function(){return t.changeSortOrder("oldest")}),s(106,"\u7531\u820A\u81F3\u65B0"),o(),i(107,"button",54),h("click",function(){return t.changeSortOrder("newest")}),s(108,"\u7531\u65B0\u81F3\u820A"),o()(),i(109,"div",55)(110,"mat-slide-toggle",56),W("ngModelChange",function(r){return L(t.filters.isSmartMatch,r)||(t.filters.isSmartMatch=r),r}),h("change",function(){return t.applyFilters()}),i(111,"span",57),s(112,"\u4F9D\u6211\u7684\u500B\u4EBA\u6A94\u6848\u81EA\u52D5\u914D\u5C0D"),f(113,"br",58),s(114,"(\u5951\u5408\u5EA6 > 80%)"),o()(),x(115,Cn,219,6),o()()(),i(116,"div",59)(117,"div",60),x(118,Mn,2,0)(119,En,3,1,"div",61)(120,Ln,3,1),o()()()),e&2&&(C("breadcrumbs",we(24,bn,ke(22,gn),ke(23,fn))),c(2),R("is-collapsed",t.isFilterCollapsed()),c(4),V("aria-expanded",!t.isFilterCollapsed()),c(2),S(" ",t.isFilterCollapsed()?"expand_more":"expand_less"," "),c(2),S(" ",t.isFilterCollapsed()?"\u5C55\u958B\u7BE9\u9078":"\u6536\u5408\u7BE9\u9078"," "),c(),V("aria-hidden",t.isFilterCollapsed()),c(9),N("ngModel",t.filters.category),c(4),N("ngModel",t.filters.category),c(4),N("ngModel",t.filters.category),c(9),N("ngModel",t.filters.city),c(55),S("",t.formatPrice(t.filters.priceMin),"\u5143"),c(2),N("ngModel",t.filters.priceMin),c(),N("ngModel",t.filters.priceMax),c(2),S("",t.formatPrice(t.filters.priceMax),"\u5143"),c(8),R("active",t.filters.sortOrder==="oldest"),c(2),R("active",t.filters.sortOrder==="newest"),c(3),N("ngModel",t.filters.isSmartMatch),c(5),v(t.filters.category==="all"||t.filters.category==="room"?115:-1),c(3),v(t.isRentalLoading()?118:t.rentalLoadError()?119:120))},dependencies:[nt,At,It,De,mt,ct,ht,rt,dt,lt,ot,st,Et,Mt,Nt,Ut,Be,Ue,Bt,at,_t,tt],styles:['@charset "UTF-8";.rental-matching[_ngcontent-%COMP%]{display:grid;grid-template-columns:300px 1fr;gap:2.5rem;align-items:start;width:min(100% - 2rem,1400px);margin:4rem auto 8rem;color:var(--color-text-main)}.rental-matching__filter-panel[_ngcontent-%COMP%]{background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;box-shadow:var(--shadow-base);position:sticky;top:96px;max-height:calc(100vh - 130px);overflow-y:auto;transition:var(--transition-base)}.rental-matching__filter-topbar[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;padding-bottom:.75rem;border-bottom:1px solid var(--color-border)}.rental-matching__filter-body[_ngcontent-%COMP%]{display:block}.rental-matching__filter-heading[_ngcontent-%COMP%]{font-size:1.15rem;font-weight:700;color:var(--color-text-main);margin:0}.rental-matching__filter-toggle[_ngcontent-%COMP%]{display:none;align-items:center;gap:.35rem;background:var(--color-primary-light);border:1px solid var(--color-border);color:var(--color-primary);font-weight:700;font-size:.9rem;padding:.65rem .95rem;border-radius:var(--radius-pill);cursor:pointer}.rental-matching__filter-toggle-icon[_ngcontent-%COMP%]{font-size:1.25rem}.rental-matching__filter-section[_ngcontent-%COMP%]{margin-bottom:1.75rem}.rental-matching__filter-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;color:var(--color-text-main);margin-bottom:1rem}.rental-matching__filter-icon[_ngcontent-%COMP%]{font-size:1.25rem;color:var(--color-primary)}.rental-matching__filter-title-text[_ngcontent-%COMP%]{font-size:.95rem;font-weight:600;margin:0}.rental-matching__option-group--vertical[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem}.rental-matching__choice[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;cursor:pointer;font-size:.95rem;color:var(--color-text-main)}.rental-matching__choice-input[_ngcontent-%COMP%]{accent-color:var(--color-primary);width:16px;height:16px}.rental-matching__select[_ngcontent-%COMP%]{width:100%;padding:.75rem 1rem;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-bg-card);color:var(--color-text-main);font-size:.95rem;outline:none;cursor:pointer;transition:var(--transition-base)}.rental-matching__select[_ngcontent-%COMP%]:focus{border-color:var(--color-primary)}.rental-matching__range-slider[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;margin-top:.5rem}.rental-matching__price-text[_ngcontent-%COMP%]{font-size:.85rem;font-weight:600;color:var(--color-text-muted);white-space:nowrap}.rental-matching__mat-slider[_ngcontent-%COMP%]{flex:1;width:100%}.rental-matching__divider[_ngcontent-%COMP%], .rental-matching__advanced-divider[_ngcontent-%COMP%]{border:none;border-top:1px solid var(--color-border);margin:1.5rem 0}.rental-matching__sort-options[_ngcontent-%COMP%]{display:flex;gap:.5rem;margin-bottom:1.5rem}.rental-matching__sort-button[_ngcontent-%COMP%]{flex:1;background:var(--color-bg-card);border:1px solid var(--color-border);color:var(--color-text-muted);padding:.75rem;font-size:.9rem;font-weight:700;border-radius:var(--radius-md);cursor:pointer;transition:var(--transition-base)}.rental-matching__sort-button[_ngcontent-%COMP%]:hover, .rental-matching__sort-button.active[_ngcontent-%COMP%]{border-color:var(--color-primary);color:var(--color-primary);background:var(--color-primary-light)}.rental-matching__room-filter-area[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.25rem}.rental-matching__smart-toggle-text[_ngcontent-%COMP%]{font-size:.85rem;font-weight:600;color:var(--color-text-main);line-height:1.4;display:inline-block}.rental-matching__checkbox-row[_ngcontent-%COMP%], .rental-matching__radio-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;margin-bottom:.65rem;cursor:pointer}.rental-matching__checkbox[_ngcontent-%COMP%], .rental-matching__radio[_ngcontent-%COMP%]{accent-color:var(--color-primary);width:16px;height:16px}.rental-matching__checkbox-label[_ngcontent-%COMP%], .rental-matching__radio-label[_ngcontent-%COMP%]{font-size:.9rem;color:var(--color-text-main);cursor:pointer}.rental-matching__accordion[_ngcontent-%COMP%]{display:block;margin-top:.5rem}.rental-matching__expansion-panel[_ngcontent-%COMP%]{box-shadow:none!important;background:var(--color-bg-card)!important;border:1px solid var(--color-border);border-radius:var(--radius-md)!important}.rental-matching__expansion-header[_ngcontent-%COMP%]{padding:0 1rem!important;height:48px!important}.rental-matching__expansion-title[_ngcontent-%COMP%]{font-size:.9rem!important;font-weight:700!important;color:var(--color-primary)!important}.rental-matching__advanced-conditions[_ngcontent-%COMP%]{padding:.5rem 0}.rental-matching__advanced-section[_ngcontent-%COMP%]{margin-bottom:1rem}.rental-matching__advanced-options[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25rem;padding-left:.25rem}.rental-matching__content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem}.rental-matching__content-header[_ngcontent-%COMP%]{display:flex;align-items:flex-end;justify-content:space-between;border-bottom:1px solid var(--color-border);padding-bottom:1.25rem}.rental-matching__eyebrow[_ngcontent-%COMP%]{font-size:.85rem;font-weight:700;color:var(--color-primary);text-transform:uppercase;letter-spacing:1px;margin:0 0 .25rem}.rental-matching__page-title[_ngcontent-%COMP%]{font-size:1.75rem;font-weight:800;color:var(--color-text-main);margin:0}.rental-matching__view-toggle[_ngcontent-%COMP%]{display:flex;background:var(--color-bg-card);border:1px solid var(--color-border);padding:.25rem;border-radius:var(--radius-lg);gap:.25rem}.rental-matching__view-button[_ngcontent-%COMP%]{background:none;border:none;padding:.55rem .85rem;border-radius:var(--radius-md);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);transition:var(--transition-base)}.rental-matching__view-button.is-active[_ngcontent-%COMP%], .rental-matching__view-button[_ngcontent-%COMP%]:hover{background:var(--color-primary-light);color:var(--color-primary)}.rental-matching__view-button--grid[_ngcontent-%COMP%]{background:var(--color-bg-card);color:var(--color-primary);box-shadow:var(--shadow-base)}.rental-matching__view-icon[_ngcontent-%COMP%]{font-size:1.25rem}.rental-matching__grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,minmax(280px,1fr));gap:1.75rem;width:100%}.rental-matching__card[_ngcontent-%COMP%]{background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-base);position:relative;display:flex;flex-direction:column;transition:var(--transition-card)}.ai-score-badge[_ngcontent-%COMP%]{position:absolute;top:1rem;right:1rem;background:var(--color-bg-card);color:var(--color-success);padding:.5rem .85rem;border-radius:999px;font-size:.85rem;font-weight:700;border:1px solid var(--color-success);box-shadow:var(--shadow-base);z-index:10;display:inline-flex;align-items:center;gap:.4rem}.rental-matching__card[_ngcontent-%COMP%]:hover{transform:translateY(-5px);box-shadow:var(--shadow-hover)}.rental-matching__card-image[_ngcontent-%COMP%]{width:100%;aspect-ratio:16/11;object-fit:cover;background:var(--color-bg-main)}.rental-matching__card-body[_ngcontent-%COMP%]{padding:1.25rem;display:flex;flex-direction:column;flex:1}.rental-matching__card-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:700;color:var(--color-text-main);margin:0 0 .75rem;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:3rem}.rental-matching__card-price[_ngcontent-%COMP%]{font-size:1.2rem;font-weight:800;color:var(--color-primary);margin:0 0 .75rem;display:flex;align-items:baseline}.rental-matching__price-unit[_ngcontent-%COMP%]{font-size:.8rem;font-weight:500;color:var(--color-text-muted);margin-left:.2rem}.rental-matching__card-info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.35rem;font-size:.85rem;color:var(--color-text-muted);margin:0 0 1rem}.rental-matching__card-info-icon[_ngcontent-%COMP%]{font-size:1rem;color:var(--color-primary)}.rental-matching__card-info-text[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rental-matching__category-badge[_ngcontent-%COMP%]{background:var(--color-primary-light);color:var(--color-primary);padding:.3rem .7rem;border-radius:var(--radius-pill);font-weight:700}.rental-matching__tags[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem;margin-top:auto;min-height:26px}.rental-matching__tag[_ngcontent-%COMP%]{font-size:.75rem;font-weight:600;color:var(--color-primary);background-color:var(--color-primary-light);padding:.25rem .6rem;border-radius:30px}.rental-matching__tag--tool[_ngcontent-%COMP%], .rental-matching__tag--knowledge[_ngcontent-%COMP%]{color:var(--color-primary);background:var(--color-primary-light)}.rental-matching__detail-button[_ngcontent-%COMP%]{width:100%;background:var(--color-primary);color:var(--color-bg-card);border:none;padding:.75rem;font-size:.95rem;font-weight:700;border-radius:var(--radius-md);cursor:pointer;text-align:center;transition:var(--transition-base)}.rental-matching__detail-button[_ngcontent-%COMP%]:hover{background-color:var(--color-primary-hover)}.rental-matching__detail-button[_ngcontent-%COMP%]:active{transform:scale(.98)}.rental-matching__empty-state[_ngcontent-%COMP%]{grid-column:1/-1;text-align:center;padding:5rem 2rem;background-color:var(--color-bg-card);border:1px dashed var(--color-border);border-radius:var(--radius-lg)}.rental-matching__empty-text[_ngcontent-%COMP%]{color:var(--color-text-muted);font-size:.95rem}.rental-matching__skeleton-card[_ngcontent-%COMP%]{pointer-events:none}.rental-matching__skeleton-image[_ngcontent-%COMP%], .rental-matching__skeleton-line[_ngcontent-%COMP%], .rental-matching__skeleton-tags[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .rental-matching__skeleton-button[_ngcontent-%COMP%]{background:linear-gradient(90deg,#f1ece7,#faf7f3 45%,#f1ece7);background-size:220% 100%;animation:_ngcontent-%COMP%_rentalSkeletonLoading 1.15s ease-in-out infinite}.rental-matching__skeleton-image[_ngcontent-%COMP%]{width:100%;aspect-ratio:16/11}.rental-matching__skeleton-line[_ngcontent-%COMP%]{height:.85rem;border-radius:999px;margin-bottom:.85rem}.rental-matching__skeleton-line--title[_ngcontent-%COMP%]{width:72%;height:1rem}.rental-matching__skeleton-line--price[_ngcontent-%COMP%]{width:46%}.rental-matching__skeleton-line--short[_ngcontent-%COMP%]{width:88%}.rental-matching__skeleton-tags[_ngcontent-%COMP%]{display:flex;gap:.5rem;margin-top:auto;margin-bottom:1.25rem}.rental-matching__skeleton-tags[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:4.5rem;height:1.5rem;border-radius:999px}.rental-matching__skeleton-button[_ngcontent-%COMP%]{width:100%;height:2.75rem;border-radius:var(--radius-md)}@keyframes _ngcontent-%COMP%_rentalSkeletonLoading{0%{background-position:120% 0}to{background-position:-120% 0}}@media(prefers-reduced-motion:reduce){.rental-matching__skeleton-image[_ngcontent-%COMP%], .rental-matching__skeleton-line[_ngcontent-%COMP%], .rental-matching__skeleton-tags[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .rental-matching__skeleton-button[_ngcontent-%COMP%]{animation:none}}@media(max-width:992px){.rental-matching[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:1.5rem}.rental-matching__filter-panel[_ngcontent-%COMP%]{position:relative;top:0;max-height:none}.rental-matching__filter-toggle[_ngcontent-%COMP%]{display:flex}.rental-matching__filter-panel.is-collapsed[_ngcontent-%COMP%]   .rental-matching__filter-body[_ngcontent-%COMP%]{display:none}.rental-matching__filter-panel.is-collapsed[_ngcontent-%COMP%]{padding-bottom:.75rem}.rental-matching__filter-topbar[_ngcontent-%COMP%]{margin-bottom:0;border-bottom:none;padding-bottom:0}}@media(max-width:576px){.rental-matching__content-header[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;gap:1rem}.rental-matching__view-toggle[_ngcontent-%COMP%]{width:100%;justify-content:center}}']})};export{Lt as RentalMatchingComponent};
