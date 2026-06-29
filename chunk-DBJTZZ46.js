import{a as Ri}from"./chunk-XLZSZZBP.js";import{b as Si,c as ki}from"./chunk-ODDX5WCR.js";import{a as ti,b as ii,c as Je,d as Ze,e as Pe,f as ri,g as hi,h as pi,i as fi,j as gi,k as ze,l as wi,m as Di}from"./chunk-DQPHQ2DS.js";import{a as si,b as li,c as ci,d as di,e as Ae}from"./chunk-G7ISUN3Y.js";import{c as Fe,d as Zt,e as Ee,f as ei}from"./chunk-MQPWRJDA.js";import"./chunk-4S3FSMG7.js";import{a as ai,c as oi}from"./chunk-ORYQ2MHD.js";import{a as Yt,b as Ie,c as Xt,d as Jt}from"./chunk-ZENUVJPE.js";import{d as _i,e as yi,f as Le,g as Ci,h as bi,i as et,k as vi}from"./chunk-PQV62USL.js";import{a as mi,b as ui}from"./chunk-E7JPBFL7.js";import"./chunk-23HMX5JL.js";import"./chunk-I3ZNLDCE.js";import"./chunk-7UYVL5WT.js";import{j as ni}from"./chunk-3AJZFOUU.js";import{d as Wt,e as Ut,h as Qt,q as Kt,r as qt,s as Me,t as Gt,v as Oe,w as $t,x as Xe}from"./chunk-2ZYXAZLY.js";import{a as Te,b as fe}from"./chunk-5NNRVGIZ.js";import"./chunk-2SA6672Q.js";import{c as At,e as Lt,f as zt,g as Nt,i as Bt,j as Vt,o as Ht,w as jt}from"./chunk-DBU2D5KL.js";import"./chunk-NZXWVCGV.js";import{Ab as M,C as te,Cb as xt,D as Qe,Db as Mt,Dc as xe,E as bt,Eb as Ot,Fb as _,Gb as d,Hb as m,I as vt,Ib as P,Jc as he,Kc as pe,Mb as ne,Mc as y,Nb as ae,Nc as Z,Ob as I,Pb as J,R as Ke,Rb as R,S as qe,T as E,Tb as k,Ub as ue,Vb as N,Wb as ye,Xb as Ce,Ya as u,Yb as b,Z as wt,Zb as v,_ as H,a as Ue,aa as G,bb as _e,bc as oe,bd as Pt,ca as s,cb as $,dc as re,eb as kt,ec as Tt,fc as f,gc as be,ha as j,hb as me,hc as B,i as O,ia as W,j as le,ja as ie,k as ft,ka as Dt,kc as Ge,l as gt,la as ke,lb as T,lc as $e,m as _t,ma as St,mb as Q,mc as Ye,nb as p,ob as S,p as ce,pa as X,pb as K,pc as A,qc as It,r as yt,t as ee,tc as Ft,u as Y,ua as Re,vc as Et,wa as de,xa as z,xb as Rt,y as Ct,yb as q,za as U,zb as x}from"./chunk-QSTXYQNA.js";var on=["trigger"],rn=["panel"],sn=[[["mat-select-trigger"]],"*"],ln=["mat-select-trigger","*"];function cn(n,o){if(n&1&&(d(0,"span",4),f(1),m()),n&2){let e=k();u(),be(e.placeholder)}}function dn(n,o){n&1&&N(0)}function mn(n,o){if(n&1&&(d(0,"span",11),f(1),m()),n&2){let e=k(2);u(),be(e.triggerValue)}}function un(n,o){if(n&1&&(d(0,"span",5),x(1,dn,1,0)(2,mn,2,1,"span",11),m()),n&2){let e=k();u(),M(e.customTrigger?1:2)}}function hn(n,o){if(n&1){let e=J();d(0,"div",12,1),R("keydown",function(i){j(e);let a=k();return W(a._handleKeydown(i))}),N(2,1),m()}if(n&2){let e=k();Tt(e.panelClass),re("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),q("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var pn=new G("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let n=s(ke);return()=>ti(n)}}),fn=new G("MAT_SELECT_CONFIG"),gn=new G("MatSelectTrigger"),tt=class{source;value;constructor(o,e){this.source=o,this.value=e}},Ii=(()=>{class n{_viewportRuler=s(Fe);_changeDetectorRef=s(he);_elementRef=s(U);_dir=s(Te,{optional:!0});_idGenerator=s(Oe);_renderer=s(kt);_parentFormField=s(di,{optional:!0});ngControl=s(zt,{self:!0,optional:!0});_liveAnnouncer=s(Kt);_defaultOptions=s(fn,{optional:!0});_animationsDisabled=ni();_popoverLocation;_initialized=new O;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,a=Ci(e,this.options,this.optionGroups),r=t._getHostElement();e===0&&a===1?i.scrollTop=0:i.scrollTop=bi(r.offsetTop,r.offsetHeight,i.scrollTop,i.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new tt(this,e)}_scrollStrategyFactory=s(pn);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new O;_errorStateTracker;stateChanges=new O;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=Re(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Lt.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=Ct(()=>{let e=this.options;return e?e.changes.pipe(Ke(e),qe(()=>te(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(qe(()=>this.optionSelectionChanges))});openedChange=new X;_openedStream=this.openedChange.pipe(Qe(e=>e),ee(()=>{}));_closedStream=this.openedChange.pipe(Qe(e=>!e),ee(()=>{}));selectionChange=new X;valueChange=new X;constructor(){let e=s(mi),t=s(Bt,{optional:!0}),i=s(Ht,{optional:!0}),a=s(new xe("tabindex"),{optional:!0}),r=s(ii,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new ui(e,this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=r?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new Si(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(E(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(E(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(Ke(null),E(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute("aria-labelledby",e):i.removeAttribute("aria-labelledby")}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(vt(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let t=`${this.id}-panel`;this._trackedModal&&Xe(this._trackedModal,"aria-owns",t),$t(e,"aria-owns",t),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;Xe(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(i),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,"animationend",a=>{a.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),i=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,a=t===13||t===32,r=this._keyManager;if(!r.isTyping()&&a&&!Me(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let l=this.selected;r.onKeydown(e);let c=this.selected;c&&l!==c&&this._liveAnnouncer.announce(c.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,a=i===40||i===38,r=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!r&&(i===13||i===32)&&t.activeItem&&!Me(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!r&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let l=this.options.some(c=>!c.disabled&&!c.selected);this.options.forEach(c=>{c.disabled||(l?c.select():c.deselect())})}else{let l=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==l&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!Me(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return!1;try{return(i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof Je?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Gt(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=te(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(E(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),te(...this.options.map(t=>t._stateChanges)).pipe(E(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby")}onContainerClick(e){let t=Wt(e);t&&(t.tagName==="MAT-OPTION"||t.classList.contains("cdk-overlay-backdrop")||t.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=T({type:n,selectors:[["mat-select"]],contentQueries:function(t,i,a){if(t&1&&ye(a,gn,5)(a,Le,5)(a,yi,5),t&2){let r;b(r=v())&&(i.customTrigger=r.first),b(r=v())&&(i.options=r),b(r=v())&&(i.optionGroups=r)}},viewQuery:function(t,i){if(t&1&&Ce(on,5)(rn,5)(Ze,5),t&2){let a;b(a=v())&&(i.trigger=a.first),b(a=v())&&(i.panel=a.first),b(a=v())&&(i._overlayDir=a.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(t,i){t&1&&R("keydown",function(r){return i._handleKeydown(r)})("focus",function(){return i._onFocus()})("blur",function(){return i._onBlur()}),t&2&&(q("id",i.id)("tabindex",i.disabled?-1:i.tabIndex)("aria-controls",i.panelOpen?i.id+"-panel":null)("aria-expanded",i.panelOpen)("aria-label",i.ariaLabel||null)("aria-required",i.required.toString())("aria-disabled",i.disabled.toString())("aria-invalid",i.errorState)("aria-activedescendant",i._getAriaActiveDescendant()),re("mat-mdc-select-disabled",i.disabled)("mat-mdc-select-invalid",i.errorState)("mat-mdc-select-required",i.required)("mat-mdc-select-empty",i.empty)("mat-mdc-select-multiple",i.multiple)("mat-select-open",i.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",y],disableRipple:[2,"disableRipple","disableRipple",y],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Z(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",y],placeholder:"placeholder",required:[2,"required","required",y],multiple:[2,"multiple","multiple",y],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",y],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",Z],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",y]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[A([{provide:ci,useExisting:n},{provide:_i,useExisting:n}]),de],ngContentSelectors:ln,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(t,i){if(t&1&&(ue(sn),d(0,"div",2,0),R("click",function(){return i.open()}),d(3,"div",3),x(4,cn,2,1,"span",4)(5,un,3,1,"span",5),m(),d(6,"div",6)(7,"div",7),ie(),d(8,"svg",8),P(9,"path",9),m()()()(),K(10,hn,3,16,"ng-template",10),R("detach",function(){return i.close()})("backdropClick",function(){return i.close()})("overlayKeydown",function(r){return i._handleOverlayKeydown(r)})),t&2){let a=oe(1);u(3),q("id",i._valueId),u(),M(i.empty?4:5),u(6),_("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",i._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",i._scrollStrategy)("cdkConnectedOverlayOrigin",i._preferredOverlayOrigin||a)("cdkConnectedOverlayPositions",i._positions)("cdkConnectedOverlayWidth",i._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",i._popoverLocation)}},dependencies:[Je,Ze],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return n})();var Fi=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Q({type:n});static \u0275inj=H({imports:[Pe,et,fe,Ee,ze,et]})}return n})();var Ei=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Q({type:n});static \u0275inj=H({imports:[qt,Pe,fe,Ee]})}return n})();function _n(n,o){if(n&1&&(d(0,"mat-option",17),f(1),m()),n&2){let e=o.$implicit;_("value",e),u(),B(" ",e," ")}}function yn(n,o){if(n&1){let e=J();d(0,"mat-form-field",14)(1,"mat-select",16,0),R("selectionChange",function(i){j(e);let a=k(2);return W(a._changePageSize(i.value))}),Mt(3,_n,2,2,"mat-option",17,xt),m(),d(5,"div",18),R("click",function(){j(e);let i=oe(2);return W(i.open())}),m()()}if(n&2){let e=k(2);_("appearance",e._formFieldAppearance)("color",e.color),u(),_("value",e.pageSize)("disabled",e.disabled),Rt("aria-labelledby",e._pageSizeLabelId),_("panelClass",e.selectConfig.panelClass||"")("disableOptionCentering",e.selectConfig.disableOptionCentering),u(2),Ot(e._displayedPageSizeOptions)}}function Cn(n,o){if(n&1&&(d(0,"div",15),f(1),m()),n&2){let e=k(2);u(),be(e.pageSize)}}function bn(n,o){if(n&1&&(d(0,"div",3)(1,"div",13),f(2),m(),x(3,yn,6,7,"mat-form-field",14),x(4,Cn,2,1,"div",15),m()),n&2){let e=k();u(),q("id",e._pageSizeLabelId),u(),B(" ",e._intl.itemsPerPageLabel," "),u(),M(e._displayedPageSizeOptions.length>1?3:-1),u(),M(e._displayedPageSizeOptions.length<=1?4:-1)}}function vn(n,o){if(n&1){let e=J();d(0,"button",19),R("click",function(){j(e);let i=k();return W(i._buttonClicked(0,i._previousButtonsDisabled()))}),ie(),d(1,"svg",8),P(2,"path",20),m()()}if(n&2){let e=k();_("matTooltip",e._intl.firstPageLabel)("matTooltipDisabled",e._previousButtonsDisabled())("disabled",e._previousButtonsDisabled())("tabindex",e._previousButtonsDisabled()?-1:null),q("aria-label",e._intl.firstPageLabel)}}function wn(n,o){if(n&1){let e=J();d(0,"button",21),R("click",function(){j(e);let i=k();return W(i._buttonClicked(i.getNumberOfPages()-1,i._nextButtonsDisabled()))}),ie(),d(1,"svg",8),P(2,"path",22),m()()}if(n&2){let e=k();_("matTooltip",e._intl.lastPageLabel)("matTooltipDisabled",e._nextButtonsDisabled())("disabled",e._nextButtonsDisabled())("tabindex",e._nextButtonsDisabled()?-1:null),q("aria-label",e._intl.lastPageLabel)}}var Dn=(()=>{class n{changes=new O;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(e,t,i)=>{if(i==0||t==0)return`0 of ${i}`;i=Math.max(i,0);let a=e*t,r=a<i?Math.min(a+t,i):a+t;return`${a+1} \u2013 ${r} of ${i}`};static \u0275fac=function(t){return new(t||n)};static \u0275prov=wt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Sn=50;var kn=new G("MAT_PAGINATOR_DEFAULT_OPTIONS"),we=(()=>{class n{_intl=s(Dn);_changeDetectorRef=s(he);_formFieldAppearance;_pageSizeLabelId=s(Oe).getId("mat-paginator-page-size-label-");_intlChanges;_isInitialized=!1;_initializedStream=new ft(1);color;get pageIndex(){return this._pageIndex}set pageIndex(e){this._pageIndex=Math.max(e||0,0),this._changeDetectorRef.markForCheck()}_pageIndex=0;get length(){return this._length}set length(e){this._length=e||0,this._changeDetectorRef.markForCheck()}_length=0;get pageSize(){return this._pageSize}set pageSize(e){this._pageSize=Math.max(e||0,0),this._updateDisplayedPageSizeOptions()}_pageSize;get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(e){this._pageSizeOptions=(e||[]).map(t=>Z(t,0)),this._updateDisplayedPageSizeOptions()}_pageSizeOptions=[];hidePageSize=!1;showFirstLastButtons=!1;selectConfig={};disabled=!1;page=new X;_displayedPageSizeOptions;initialized=this._initializedStream;constructor(){let e=this._intl,t=s(kn,{optional:!0});if(this._intlChanges=e.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),t){let{pageSize:i,pageSizeOptions:a,hidePageSize:r,showFirstLastButtons:l}=t;i!=null&&(this._pageSize=i),a!=null&&(this._pageSizeOptions=a),r!=null&&(this.hidePageSize=r),l!=null&&(this.showFirstLastButtons=l)}this._formFieldAppearance=t?.formFieldAppearance||"outline"}ngOnInit(){this._isInitialized=!0,this._updateDisplayedPageSizeOptions(),this._initializedStream.next()}ngOnDestroy(){this._initializedStream.complete(),this._intlChanges.unsubscribe()}nextPage(){this.hasNextPage()&&this._navigate(this.pageIndex+1)}previousPage(){this.hasPreviousPage()&&this._navigate(this.pageIndex-1)}firstPage(){this.hasPreviousPage()&&this._navigate(0)}lastPage(){this.hasNextPage()&&this._navigate(this.getNumberOfPages()-1)}hasPreviousPage(){return this.pageIndex>=1&&this.pageSize!=0}hasNextPage(){let e=this.getNumberOfPages()-1;return this.pageIndex<e&&this.pageSize!=0}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(e){let t=this.pageIndex*this.pageSize,i=this.pageIndex;this.pageIndex=Math.floor(t/e)||0,this.pageSize=e,this._emitPageEvent(i)}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._isInitialized&&(this.pageSize||(this._pageSize=this.pageSizeOptions.length!=0?this.pageSizeOptions[0]:Sn),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),this._displayedPageSizeOptions.indexOf(this.pageSize)===-1&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((e,t)=>e-t),this._changeDetectorRef.markForCheck())}_emitPageEvent(e){this.page.emit({previousPageIndex:e,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length})}_navigate(e){let t=this.pageIndex;e!==t&&(this.pageIndex=e,this._emitPageEvent(t))}_buttonClicked(e,t){t||this._navigate(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=T({type:n,selectors:[["mat-paginator"]],hostAttrs:["role","group",1,"mat-mdc-paginator"],inputs:{color:"color",pageIndex:[2,"pageIndex","pageIndex",Z],length:[2,"length","length",Z],pageSize:[2,"pageSize","pageSize",Z],pageSizeOptions:"pageSizeOptions",hidePageSize:[2,"hidePageSize","hidePageSize",y],showFirstLastButtons:[2,"showFirstLastButtons","showFirstLastButtons",y],selectConfig:"selectConfig",disabled:[2,"disabled","disabled",y]},outputs:{page:"page"},exportAs:["matPaginator"],decls:14,vars:14,consts:[["selectRef",""],[1,"mat-mdc-paginator-outer-container"],[1,"mat-mdc-paginator-container"],[1,"mat-mdc-paginator-page-size"],[1,"mat-mdc-paginator-range-actions"],["aria-atomic","true","aria-live","polite","role","status",1,"mat-mdc-paginator-range-label"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-previous",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true",1,"mat-mdc-paginator-icon"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-next",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["aria-hidden","true",1,"mat-mdc-paginator-page-size-label"],[1,"mat-mdc-paginator-page-size-select",3,"appearance","color"],[1,"mat-mdc-paginator-page-size-value"],["hideSingleSelectionIndicator","",3,"selectionChange","value","disabled","aria-labelledby","panelClass","disableOptionCentering"],[3,"value"],[1,"mat-mdc-paginator-touch-target",3,"click"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],template:function(t,i){t&1&&(d(0,"div",1)(1,"div",2),x(2,bn,5,4,"div",3),d(3,"div",4)(4,"div",5),f(5),m(),x(6,vn,3,5,"button",6),d(7,"button",7),R("click",function(){return i._buttonClicked(i.pageIndex-1,i._previousButtonsDisabled())}),ie(),d(8,"svg",8),P(9,"path",9),m()(),Dt(),d(10,"button",10),R("click",function(){return i._buttonClicked(i.pageIndex+1,i._nextButtonsDisabled())}),ie(),d(11,"svg",8),P(12,"path",11),m()(),x(13,wn,3,5,"button",12),m()()()),t&2&&(u(2),M(i.hidePageSize?-1:2),u(3),B(" ",i._intl.getRangeLabel(i.pageIndex,i.pageSize,i.length)," "),u(),M(i.showFirstLastButtons?6:-1),u(),_("matTooltip",i._intl.previousPageLabel)("matTooltipDisabled",i._previousButtonsDisabled())("disabled",i._previousButtonsDisabled())("tabindex",i._previousButtonsDisabled()?-1:null),q("aria-label",i._intl.previousPageLabel),u(3),_("matTooltip",i._intl.nextPageLabel)("matTooltipDisabled",i._nextButtonsDisabled())("disabled",i._nextButtonsDisabled())("tabindex",i._nextButtonsDisabled()?-1:null),q("aria-label",i._intl.nextPageLabel),u(3),M(i.showFirstLastButtons?13:-1))},dependencies:[Ae,Ii,Le,ai,ri],styles:[`.mat-mdc-paginator {
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-paginator-container-background-color, var(--mat-sys-surface));
  font-family: var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));
  letter-spacing: var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));
  --mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);
  --mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px);
}
.mat-mdc-paginator .mat-mdc-select-value {
  font-size: var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size));
}
.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {
  display: none;
}
.mat-mdc-paginator .mat-mdc-select {
  line-height: 1.5;
}

.mat-mdc-paginator-outer-container {
  display: flex;
}

.mat-mdc-paginator-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  flex-wrap: wrap;
  width: 100%;
  min-height: var(--mat-paginator-container-size, 56px);
}

.mat-mdc-paginator-page-size {
  display: flex;
  align-items: baseline;
  margin-right: 8px;
}
[dir=rtl] .mat-mdc-paginator-page-size {
  margin-right: 0;
  margin-left: 8px;
}

.mat-mdc-paginator-page-size-label {
  margin: 0 4px;
}

.mat-mdc-paginator-page-size-select {
  margin: 0 4px;
  width: var(--mat-paginator-page-size-select-width, 84px);
}

.mat-mdc-paginator-range-label {
  margin: 0 32px 0 24px;
}

.mat-mdc-paginator-range-actions {
  display: flex;
  align-items: center;
}

.mat-mdc-paginator-icon {
  display: inline-block;
  width: 28px;
  fill: var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {
  fill: var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
[dir=rtl] .mat-mdc-paginator-icon {
  transform: rotate(180deg);
}

@media (forced-colors: active) {
  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,
  .mat-mdc-paginator-icon {
    fill: currentColor;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {
    outline: solid 1px;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {
    color: GrayText;
  }
}
.mat-mdc-paginator-touch-target {
  display: var(--mat-paginator-touch-target-display, block);
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--mat-paginator-page-size-select-width, 84px);
  height: var(--mat-paginator-page-size-select-touch-target-height, 48px);
  background-color: transparent;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
`],encapsulation:2,changeDetection:0})}return n})(),Pi=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Q({type:n});static \u0275inj=H({imports:[oi,Fi,Ei,we]})}return n})();var Mn=[[["caption"]],[["colgroup"],["col"]],"*"],On=["caption","colgroup, col","*"];function Tn(n,o){n&1&&N(0,2)}function In(n,o){n&1&&(d(0,"thead",0),I(1,1),m(),d(2,"tbody",0),I(3,2)(4,3),m(),d(5,"tfoot",0),I(6,4),m())}function Fn(n,o){n&1&&I(0,1)(1,2)(2,3)(3,4)}var V=new G("CDK_TABLE");var Ve=(()=>{class n{template=s($);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkCellDef",""]]})}return n})(),He=(()=>{class n{template=s($);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkHeaderCellDef",""]]})}return n})(),zi=(()=>{class n{template=s($);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkFooterCellDef",""]]})}return n})(),ge=(()=>{class n{_table=s(V,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;constructor(){}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,"-"),this._updateColumnCssClassName())}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkColumnDef",""]],contentQueries:function(t,i,a){if(t&1&&ye(a,Ve,5)(a,He,5)(a,zi,5),t&2){let r;b(r=v())&&(i.cell=r.first),b(r=v())&&(i.headerCell=r.first),b(r=v())&&(i.footerCell=r.first)}},inputs:{name:[0,"cdkColumnDef","name"],sticky:[2,"sticky","sticky",y],stickyEnd:[2,"stickyEnd","stickyEnd",y]}})}return n})(),Be=class{constructor(o,e){e.nativeElement.classList.add(...o._columnCssClassName)}},Ni=(()=>{class n extends Be{constructor(){super(s(ge),s(U))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["cdk-header-cell"],["th","cdk-header-cell",""]],hostAttrs:["role","columnheader",1,"cdk-header-cell"],features:[S]})}return n})();var Bi=(()=>{class n extends Be{constructor(){let e=s(ge),t=s(U);super(e,t);let i=e._table?._getCellRole();i&&t.nativeElement.setAttribute("role",i)}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["cdk-cell"],["td","cdk-cell",""]],hostAttrs:[1,"cdk-cell"],features:[S]})}return n})();var nt=(()=>{class n{template=s($);_differs=s(pe);columns;_columnsDiffer;constructor(){}ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof Se?e.headerCell.template:this instanceof at?e.footerCell.template:e.cell.template}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,features:[de]})}return n})(),Se=(()=>{class n extends nt{_table=s(V,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(s($),s(pe))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkHeaderRowDef",""]],inputs:{columns:[0,"cdkHeaderRowDef","columns"],sticky:[2,"cdkHeaderRowDefSticky","sticky",y]},features:[S,de]})}return n})(),at=(()=>{class n extends nt{_table=s(V,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(s($),s(pe))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkFooterRowDef",""]],inputs:{columns:[0,"cdkFooterRowDef","columns"],sticky:[2,"cdkFooterRowDefSticky","sticky",y]},features:[S,de]})}return n})(),je=(()=>{class n extends nt{_table=s(V,{optional:!0});when;constructor(){super(s($),s(pe))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkRowDef",""]],inputs:{columns:[0,"cdkRowDefColumns","columns"],when:[0,"cdkRowDefWhen","when"]},features:[S]})}return n})(),se=(()=>{class n{_viewContainer=s(me);cells;context;static mostRecentCellOutlet=null;constructor(){n.mostRecentCellOutlet=this}ngOnDestroy(){n.mostRecentCellOutlet===this&&(n.mostRecentCellOutlet=null)}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","cdkCellOutlet",""]]})}return n})(),ot=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=T({type:n,selectors:[["cdk-header-row"],["tr","cdk-header-row",""]],hostAttrs:["role","row",1,"cdk-header-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&I(0,0)},dependencies:[se],encapsulation:2})}return n})();var rt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=T({type:n,selectors:[["cdk-row"],["tr","cdk-row",""]],hostAttrs:["role","row",1,"cdk-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&I(0,0)},dependencies:[se],encapsulation:2})}return n})(),Vi=(()=>{class n{templateRef=s($);_contentClassNames=["cdk-no-data-row","cdk-row"];_cellClassNames=["cdk-cell","cdk-no-data-cell"];_cellSelector="td, cdk-cell, [cdk-cell], .cdk-cell";constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["ng-template","cdkNoDataRow",""]]})}return n})(),Ai=["top","bottom","left","right"],it=class{_isNativeHtmlTable;_stickCellCss;_isBrowser;_needsPositionStickyOnElement;direction;_positionListener;_tableInjector;_elemSizeCache=new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(o=>this._updateCachedSizes(o)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(o,e,t=!0,i=!0,a,r,l){this._isNativeHtmlTable=o,this._stickCellCss=e,this._isBrowser=t,this._needsPositionStickyOnElement=i,this.direction=a,this._positionListener=r,this._tableInjector=l,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(o,e){(e.includes("left")||e.includes("right"))&&this._removeFromStickyColumnReplayQueue(o);let t=[];for(let i of o)i.nodeType===i.ELEMENT_NODE&&t.push(i,...Array.from(i.children));_e({write:()=>{for(let i of t)this._removeStickyStyle(i,e)}},{injector:this._tableInjector})}updateStickyColumns(o,e,t,i=!0,a=!0){if(!o.length||!this._isBrowser||!(e.some(L=>L)||t.some(L=>L))){this._positionListener?.stickyColumnsUpdated({sizes:[]}),this._positionListener?.stickyEndColumnsUpdated({sizes:[]});return}let r=o[0],l=r.children.length,c=this.direction==="rtl",h=c?"right":"left",g=c?"left":"right",C=e.lastIndexOf(!0),w=t.indexOf(!0),D,ut,ht;a&&this._updateStickyColumnReplayQueue({rows:[...o],stickyStartStates:[...e],stickyEndStates:[...t]}),_e({earlyRead:()=>{D=this._getCellWidths(r,i),ut=this._getStickyStartColumnPositions(D,e),ht=this._getStickyEndColumnPositions(D,t)},write:()=>{for(let L of o)for(let F=0;F<l;F++){let pt=L.children[F];e[F]&&this._addStickyStyle(pt,h,ut[F],F===C),t[F]&&this._addStickyStyle(pt,g,ht[F],F===w)}this._positionListener&&D.some(L=>!!L)&&(this._positionListener.stickyColumnsUpdated({sizes:C===-1?[]:D.slice(0,C+1).map((L,F)=>e[F]?L:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:w===-1?[]:D.slice(w).map((L,F)=>t[F+w]?L:null).reverse()}))}},{injector:this._tableInjector})}stickRows(o,e,t){if(!this._isBrowser)return;let i=t==="bottom"?o.slice().reverse():o,a=t==="bottom"?e.slice().reverse():e,r=[],l=[],c=[];_e({earlyRead:()=>{for(let h=0,g=0;h<i.length;h++){if(!a[h])continue;r[h]=g;let C=i[h];c[h]=this._isNativeHtmlTable?Array.from(C.children):[C];let w=this._retrieveElementSize(C).height;g+=w,l[h]=w}},write:()=>{let h=a.lastIndexOf(!0);for(let g=0;g<i.length;g++){if(!a[g])continue;let C=r[g],w=g===h;for(let D of c[g])this._addStickyStyle(D,t,C,w)}t==="top"?this._positionListener?.stickyHeaderRowsUpdated({sizes:l,offsets:r,elements:c}):this._positionListener?.stickyFooterRowsUpdated({sizes:l,offsets:r,elements:c})}},{injector:this._tableInjector})}updateStickyFooterContainer(o,e){this._isNativeHtmlTable&&_e({write:()=>{let t=o.querySelector("tfoot");t&&(e.some(i=>!i)?this._removeStickyStyle(t,["bottom"]):this._addStickyStyle(t,"bottom",0,!1))}},{injector:this._tableInjector})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._resizeObserver?.disconnect(),this._destroyed=!0}_removeStickyStyle(o,e){if(!o.classList.contains(this._stickCellCss))return;for(let i of e)o.style[i]="",o.classList.remove(this._borderCellCss[i]);Ai.some(i=>e.indexOf(i)===-1&&o.style[i])?o.style.zIndex=this._getCalculatedZIndex(o):(o.style.zIndex="",this._needsPositionStickyOnElement&&(o.style.position=""),o.classList.remove(this._stickCellCss))}_addStickyStyle(o,e,t,i){o.classList.add(this._stickCellCss),i&&o.classList.add(this._borderCellCss[e]),o.style[e]=`${t}px`,o.style.zIndex=this._getCalculatedZIndex(o),this._needsPositionStickyOnElement&&(o.style.cssText+="position: -webkit-sticky; position: sticky; ")}_getCalculatedZIndex(o){let e={top:100,bottom:10,left:1,right:1},t=0;for(let i of Ai)o.style[i]&&(t+=e[i]);return t?`${t}`:""}_getCellWidths(o,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],i=o.children;for(let a=0;a<i.length;a++){let r=i[a];t.push(this._retrieveElementSize(r).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(o,e){let t=[],i=0;for(let a=0;a<o.length;a++)e[a]&&(t[a]=i,i+=o[a]);return t}_getStickyEndColumnPositions(o,e){let t=[],i=0;for(let a=o.length;a>0;a--)e[a]&&(t[a]=i,i+=o[a]);return t}_retrieveElementSize(o){let e=this._elemSizeCache.get(o);if(e)return e;let t=o.getBoundingClientRect(),i={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(o,i),this._resizeObserver.observe(o,{box:"border-box"})),i}_updateStickyColumnReplayQueue(o){this._removeFromStickyColumnReplayQueue(o.rows),this._stickyColumnsReplayTimeout||this._updatedStickyColumnsParamsToReplay.push(o)}_removeFromStickyColumnReplayQueue(o){let e=new Set(o);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(i=>!e.has(i));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(o){let e=!1;for(let t of o){let i=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};i.width!==this._elemSizeCache.get(t.target)?.width&&En(t.target)&&(e=!0),this._elemSizeCache.set(t.target,i)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}};function En(n){return["cdk-cell","cdk-header-cell","cdk-footer-cell"].some(o=>n.classList.contains(o))}var De=new G("STICKY_POSITIONING_LISTENER");var st=(()=>{class n{viewContainer=s(me);elementRef=s(U);constructor(){let e=s(V);e._rowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","rowOutlet",""]]})}return n})(),lt=(()=>{class n{viewContainer=s(me);elementRef=s(U);constructor(){let e=s(V);e._headerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","headerRowOutlet",""]]})}return n})(),ct=(()=>{class n{viewContainer=s(me);elementRef=s(U);constructor(){let e=s(V);e._footerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","footerRowOutlet",""]]})}return n})(),dt=(()=>{class n{viewContainer=s(me);elementRef=s(U);constructor(){let e=s(V);e._noDataRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=p({type:n,selectors:[["","noDataRowOutlet",""]]})}return n})(),mt=(()=>{class n{_differs=s(pe);_changeDetectorRef=s(he);_elementRef=s(U);_dir=s(Te,{optional:!0});_platform=s(Ut);_viewRepeater;_viewportRuler=s(Fe);_injector=s(ke);_virtualScrollViewport=s(Zt,{optional:!0,host:!0});_positionListener=s(De,{optional:!0})||s(De,{optional:!0,skipSelf:!0});_document=s(St);_data;_renderedRange;_onDestroy=new O;_renderRows;_renderChangeSubscription=null;_columnDefsByName=new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef=null;_customColumnDefs=new Set;_customRowDefs=new Set;_customHeaderRowDefs=new Set;_customFooterRowDefs=new Set;_customNoDataRow=null;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=new Map;_isNativeHtmlTable;_stickyStyler;stickyCssClass="cdk-table-sticky";needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_headerRowStickyUpdates=new O;_footerRowStickyUpdates=new O;_disableVirtualScrolling=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute("role");return e==="grid"||e==="treegrid"?"gridcell":"cell"}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&(this._switchDataSource(e),this._changeDetectorRef.markForCheck())}_dataSource;_dataSourceChanges=new O;_dataStream=new O;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._virtualScrollEnabled()?!0:this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;recycleRows=!1;contentChanged=new X;viewChange=new le({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;constructor(){s(new xe("role"),{optional:!0})||this._elementRef.nativeElement.setAttribute("role","table"),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName==="TABLE",this._dataDiffer=this._differs.find([]).create((t,i)=>this.trackBy?this.trackBy(i.dataIndex,i.data):i)}ngOnInit(){this._setupStickyStyler(),this._viewportRuler.change().pipe(E(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._viewRepeater=this.recycleRows||this._virtualScrollEnabled()?new Jt:new ki,this._virtualScrollEnabled()&&this._setupVirtualScrolling(this._virtualScrollViewport),this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._headerRowStickyUpdates.complete(),this._footerRowStickyUpdates.complete(),this._onDestroy.next(),this._onDestroy.complete(),Ie(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(i,a,r)=>this._getEmbeddedViewArgs(i.item,r),i=>i.item.data,i=>{i.operation===Xt.INSERTED&&i.context&&this._renderCellTemplateForItem(i.record.item.rowDef,i.context)}),this._updateRowIndexContext(),e.forEachIdentityChange(i=>{let a=t.get(i.currentIndex);a.context.$implicit=i.item.data}),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let i=Li(this._headerRowOutlet,"thead");i&&(i.style.display=e.length?"":"none")}let t=this._headerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,["top"]),this._stickyStyler.stickRows(e,t,"top"),this._headerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let i=Li(this._footerRowOutlet,"tfoot");i&&(i.style.display=e.length?"":"none")}let t=this._footerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,["bottom"]),this._stickyStyler.stickRows(e,t,"bottom"),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),i=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this.fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...i],["left","right"]),this._stickyColumnStylesNeedReset=!1),e.forEach((a,r)=>{this._addStickyColumnStyles([a],this._headerRowDefs[r])}),this._rowDefs.forEach(a=>{let r=[];for(let l=0;l<t.length;l++)this._renderRows[l].rowDef===a&&r.push(t[l]);this._addStickyColumnStyles(r,a)}),i.forEach((a,r)=>{this._addStickyColumnStyles([a],this._footerRowDefs[r])}),Array.from(this._columnDefsByName.values()).forEach(a=>a.resetStickyChanged())}stickyColumnsUpdated(e){this._positionListener?.stickyColumnsUpdated(e)}stickyEndColumnsUpdated(e){this._positionListener?.stickyEndColumnsUpdated(e)}stickyHeaderRowsUpdated(e){this._headerRowStickyUpdates.next(e),this._positionListener?.stickyHeaderRowsUpdated(e)}stickyFooterRowsUpdated(e){this._footerRowStickyUpdates.next(e),this._positionListener?.stickyFooterRowsUpdated(e)}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){if(!Array.isArray(this._data)||!this._renderedRange)return[];let e=[],t=Math.min(this._data.length,this._renderedRange.end),i=this._cachedRenderRowsMap;this._cachedRenderRowsMap=new Map;for(let a=this._renderedRange.start;a<t;a++){let r=this._data[a],l=this._getRenderRowsForData(r,a,i.get(r));this._cachedRenderRowsMap.has(r)||this._cachedRenderRowsMap.set(r,new WeakMap);for(let c=0;c<l.length;c++){let h=l[c],g=this._cachedRenderRowsMap.get(h.data);g.has(h.rowDef)?g.get(h.rowDef).push(h):g.set(h.rowDef,[h]),e.push(h)}}return e}_getRenderRowsForData(e,t,i){return this._getRowDefs(e,t).map(r=>{let l=i&&i.has(r)?i.get(r):[];if(l.length){let c=l.shift();return c.dataIndex=t,c}else return{data:e,rowDef:r,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),Ne(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=Ne(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=Ne(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=Ne(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(r,l)=>{let c=!!l.getColumnsDiff();return r||c},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let i=this._headerRowDefs.reduce(e,!1);i&&this._forceRenderHeaderRows();let a=this._footerRowDefs.reduce(e,!1);return a&&this._forceRenderFooterRows(),t||i||a}_switchDataSource(e){this._data=[],Ie(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;Ie(this.dataSource)?e=this.dataSource.connect(this):yt(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=ce(this.dataSource)),this._renderChangeSubscription=Y([e,this.viewChange]).pipe(E(this._onDestroy)).subscribe(([t,i])=>{this._data=t||[],this._renderedRange=i,this._dataStream.next(t),this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let i=Array.from(t?.columns||[]).map(l=>{let c=this._columnDefsByName.get(l);return c}),a=i.map(l=>l.sticky),r=i.map(l=>l.stickyEnd);this._stickyStyler.updateStickyColumns(e,a,r,!this.fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let i=0;i<e.viewContainer.length;i++){let a=e.viewContainer.get(i);t.push(a.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length===1)return[this._rowDefs[0]];let i=[];if(this.multiTemplateDataRows)i=this._rowDefs.filter(a=>!a.when||a.when(t,e));else{let a=this._rowDefs.find(r=>r.when&&r.when(t,e))||this._defaultRowDef;a&&i.push(a)}return i.length,i}_getEmbeddedViewArgs(e,t){let i=e.rowDef,a={$implicit:e.data};return{templateRef:i.template,context:a,index:t}}_renderRow(e,t,i,a={}){let r=e.viewContainer.createEmbeddedView(t.template,a,i);return this._renderCellTemplateForItem(t,a),r}_renderCellTemplateForItem(e,t){for(let i of this._getCellTemplates(e))se.mostRecentCellOutlet&&se.mostRecentCellOutlet._viewContainer.createEmbeddedView(i,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,i=e.length;t<i;t++){let r=e.get(t).context;r.count=i,r.first=t===0,r.last=t===i-1,r.even=t%2===0,r.odd=!r.even,this.multiTemplateDataRows?(r.dataIndex=this._renderRows[t].dataIndex,r.renderIndex=t):r.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let i=this._columnDefsByName.get(t);return e.extractCellTemplate(i)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,i)=>t||i.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:"ltr",t=this._injector;this._stickyStyler=new it(this._isNativeHtmlTable,this.stickyCssClass,this._platform.isBrowser,this.needsPositionStickyOnElement,e,this,t),(this._dir?this._dir.change:ce()).pipe(E(this._onDestroy)).subscribe(i=>{this._stickyStyler.direction=i,this.updateStickyColumnStyles()})}_setupVirtualScrolling(e){let t=typeof requestAnimationFrame<"u"?_t:gt;this.viewChange.next({start:0,end:0}),e.renderedRangeStream.pipe(bt(0,t),E(this._onDestroy)).subscribe(this.viewChange),e.attach({dataStream:this._dataStream,measureRangeSize:(i,a)=>this._measureRangeSize(i,a)}),Y([e.renderedContentOffset,this._headerRowStickyUpdates]).pipe(E(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let l=a.elements[r];if(l){let c=a.offsets[r],h=i!==0?Math.max(i-c,c):-c;for(let g of l)g.style.top=`${-h}px`}}}),Y([e.renderedContentOffset,this._footerRowStickyUpdates]).pipe(E(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let l=a.elements[r];if(l)for(let c of l)c.style.bottom=`${i+a.offsets[r]}px`}})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let i=this._noDataRowOutlet.viewContainer;if(t){let a=i.createEmbeddedView(e.templateRef),r=a.rootNodes[0];if(a.rootNodes.length===1&&r?.nodeType===this._document.ELEMENT_NODE){r.setAttribute("role","row"),r.classList.add(...e._contentClassNames);let l=r.querySelectorAll(e._cellSelector);for(let c=0;c<l.length;c++)l[c].classList.add(...e._cellClassNames)}}else i.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}_measureRangeSize(e,t){if(e.start>=e.end||t!=="vertical")return 0;let i=this.viewChange.value,a=this._rowOutlet.viewContainer;e.start<i.start||e.end>i.end;let r=e.start-i.start,l=e.end-e.start,c,h;for(let w=0;w<l;w++){let D=a.get(w+r);if(D&&D.rootNodes.length){c=h=D.rootNodes[0];break}}for(let w=l-1;w>-1;w--){let D=a.get(w+r);if(D&&D.rootNodes.length){h=D.rootNodes[D.rootNodes.length-1];break}}let g=c?.getBoundingClientRect?.(),C=h?.getBoundingClientRect?.();return g&&C?C.bottom-g.top:0}_virtualScrollEnabled(){return!this._disableVirtualScrolling&&this._virtualScrollViewport!=null}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=T({type:n,selectors:[["cdk-table"],["table","cdk-table",""]],contentQueries:function(t,i,a){if(t&1&&ye(a,Vi,5)(a,ge,5)(a,je,5)(a,Se,5)(a,at,5),t&2){let r;b(r=v())&&(i._noDataRow=r.first),b(r=v())&&(i._contentColumnDefs=r),b(r=v())&&(i._contentRowDefs=r),b(r=v())&&(i._contentHeaderRowDefs=r),b(r=v())&&(i._contentFooterRowDefs=r)}},hostAttrs:[1,"cdk-table"],hostVars:2,hostBindings:function(t,i){t&2&&re("cdk-table-fixed-layout",i.fixedLayout)},inputs:{trackBy:"trackBy",dataSource:"dataSource",multiTemplateDataRows:[2,"multiTemplateDataRows","multiTemplateDataRows",y],fixedLayout:[2,"fixedLayout","fixedLayout",y],recycleRows:[2,"recycleRows","recycleRows",y]},outputs:{contentChanged:"contentChanged"},exportAs:["cdkTable"],features:[A([{provide:V,useExisting:n},{provide:De,useValue:null}])],ngContentSelectors:On,decls:5,vars:2,consts:[["role","rowgroup"],["headerRowOutlet",""],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,i){t&1&&(ue(Mn),N(0),N(1,1),x(2,Tn,1,0),x(3,In,7,0)(4,Fn,4,0)),t&2&&(u(2),M(i._isServer?2:-1),u(),M(i._isNativeHtmlTable?3:4))},dependencies:[lt,st,dt,ct],styles:[`.cdk-table-fixed-layout {
  table-layout: fixed;
}
`],encapsulation:2})}return n})();function Ne(n,o){return n.concat(Array.from(o))}function Li(n,o){let e=o.toUpperCase(),t=n.viewContainer.element.nativeElement;for(;t;){let i=t.nodeType===1?t.nodeName:null;if(i===e)return t;if(i==="TABLE")break;t=t.parentNode}return null}var Hi=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Q({type:n});static \u0275inj=H({imports:[ei]})}return n})();var Pn=[[["caption"]],[["colgroup"],["col"]],"*"],An=["caption","colgroup, col","*"];function Ln(n,o){n&1&&N(0,2)}function zn(n,o){n&1&&(d(0,"thead",0),I(1,1),m(),d(2,"tbody",2),I(3,3)(4,4),m(),d(5,"tfoot",0),I(6,5),m())}function Nn(n,o){n&1&&I(0,1)(1,3)(2,4)(3,5)}var ji=(()=>{class n extends mt{stickyCssClass="mat-mdc-table-sticky";needsPositionStickyOnElement=!1;static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275cmp=T({type:n,selectors:[["mat-table"],["table","mat-table",""]],hostAttrs:[1,"mat-mdc-table","mdc-data-table__table"],hostVars:2,hostBindings:function(t,i){t&2&&re("mat-table-fixed-layout",i.fixedLayout)},exportAs:["matTable"],features:[A([{provide:mt,useExisting:n},{provide:V,useExisting:n},{provide:De,useValue:null}]),S],ngContentSelectors:An,decls:5,vars:2,consts:[["role","rowgroup"],["headerRowOutlet",""],["role","rowgroup",1,"mdc-data-table__content"],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,i){t&1&&(ue(Pn),N(0),N(1,1),x(2,Ln,1,0),x(3,zn,7,0)(4,Nn,4,0)),t&2&&(u(2),M(i._isServer?2:-1),u(),M(i._isNativeHtmlTable?3:4))},dependencies:[lt,st,dt,ct],styles:[`.mat-mdc-table-sticky {
  position: sticky !important;
}

mat-table {
  display: block;
}

mat-header-row {
  min-height: var(--mat-table-header-container-height, 56px);
}

mat-row {
  min-height: var(--mat-table-row-item-container-height, 52px);
}

mat-footer-row {
  min-height: var(--mat-table-footer-container-height, 52px);
}

mat-row, mat-header-row, mat-footer-row {
  display: flex;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  align-items: center;
  box-sizing: border-box;
}

mat-cell:first-of-type, mat-header-cell:first-of-type, mat-footer-cell:first-of-type {
  padding-left: 24px;
}
[dir=rtl] mat-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type) {
  padding-left: 0;
  padding-right: 24px;
}
mat-cell:last-of-type, mat-header-cell:last-of-type, mat-footer-cell:last-of-type {
  padding-right: 24px;
}
[dir=rtl] mat-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type) {
  padding-right: 0;
  padding-left: 24px;
}

mat-cell, mat-header-cell, mat-footer-cell {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-wrap: break-word;
  min-height: inherit;
}

.mat-mdc-table {
  min-width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;
  white-space: normal;
  background-color: var(--mat-table-background-color, var(--mat-sys-surface));
}

.mat-table-fixed-layout {
  table-layout: fixed;
}

.mdc-data-table__cell {
  box-sizing: border-box;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
}

.mdc-data-table__cell,
.mdc-data-table__header-cell {
  padding: 0 16px;
}

.mat-mdc-header-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--mat-table-header-container-height, 56px);
  color: var(--mat-table-header-headline-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-table-header-headline-font, var(--mat-sys-title-small-font, Roboto, sans-serif));
  line-height: var(--mat-table-header-headline-line-height, var(--mat-sys-title-small-line-height));
  font-size: var(--mat-table-header-headline-size, var(--mat-sys-title-small-size, 14px));
  font-weight: var(--mat-table-header-headline-weight, var(--mat-sys-title-small-weight, 500));
}

.mat-mdc-row {
  height: var(--mat-table-row-item-container-height, 52px);
  color: var(--mat-table-row-item-label-text-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
}

.mat-mdc-row,
.mdc-data-table__content {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-table-row-item-label-text-font, var(--mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--mat-table-row-item-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-table-row-item-label-text-size, var(--mat-sys-body-medium-size, 14px));
  font-weight: var(--mat-table-row-item-label-text-weight, var(--mat-sys-body-medium-weight));
}

.mat-mdc-footer-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--mat-table-footer-container-height, 52px);
  color: var(--mat-table-row-item-label-text-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-table-footer-supporting-text-font, var(--mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--mat-table-footer-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-table-footer-supporting-text-size, var(--mat-sys-body-medium-size, 14px));
  font-weight: var(--mat-table-footer-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-table-footer-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}

.mat-mdc-header-cell {
  border-bottom-color: var(--mat-table-row-item-outline-color, var(--mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--mat-table-header-headline-tracking, var(--mat-sys-title-small-tracking));
  font-weight: inherit;
  line-height: inherit;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  text-align: start;
}
.mdc-data-table__row:last-child > .mat-mdc-header-cell {
  border-bottom: none;
}

.mat-mdc-cell {
  border-bottom-color: var(--mat-table-row-item-outline-color, var(--mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--mat-table-row-item-label-text-tracking, var(--mat-sys-body-medium-tracking));
  line-height: inherit;
}
.mdc-data-table__row:last-child > .mat-mdc-cell {
  border-bottom: none;
}

.mat-mdc-footer-cell {
  letter-spacing: var(--mat-table-row-item-label-text-tracking, var(--mat-sys-body-medium-tracking));
}

mat-row.mat-mdc-row,
mat-header-row.mat-mdc-header-row,
mat-footer-row.mat-mdc-footer-row {
  border-bottom: none;
}

.mat-mdc-table tbody,
.mat-mdc-table tfoot,
.mat-mdc-table thead,
.mat-mdc-cell,
.mat-mdc-footer-cell,
.mat-mdc-header-row,
.mat-mdc-row,
.mat-mdc-footer-row,
.mat-mdc-table .mat-mdc-header-cell {
  background: inherit;
}

.mat-mdc-table mat-header-row.mat-mdc-header-row,
.mat-mdc-table mat-row.mat-mdc-row,
.mat-mdc-table mat-footer-row.mat-mdc-footer-cell {
  height: unset;
}

mat-header-cell.mat-mdc-header-cell,
mat-cell.mat-mdc-cell,
mat-footer-cell.mat-mdc-footer-cell {
  align-self: stretch;
}
`],encapsulation:2})}return n})(),Wi=(()=>{class n extends Ve{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275dir=p({type:n,selectors:[["","matCellDef",""]],features:[A([{provide:Ve,useExisting:n}]),S]})}return n})(),Ui=(()=>{class n extends He{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275dir=p({type:n,selectors:[["","matHeaderCellDef",""]],features:[A([{provide:He,useExisting:n}]),S]})}return n})();var Qi=(()=>{class n extends ge{get name(){return this._name}set name(e){this._setNameInput(e)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275dir=p({type:n,selectors:[["","matColumnDef",""]],inputs:{name:[0,"matColumnDef","name"]},features:[A([{provide:ge,useExisting:n}]),S]})}return n})(),Ki=(()=>{class n extends Ni{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275dir=p({type:n,selectors:[["mat-header-cell"],["th","mat-header-cell",""]],hostAttrs:["role","columnheader",1,"mat-mdc-header-cell","mdc-data-table__header-cell"],features:[S]})}return n})();var qi=(()=>{class n extends Bi{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275dir=p({type:n,selectors:[["mat-cell"],["td","mat-cell",""]],hostAttrs:[1,"mat-mdc-cell","mdc-data-table__cell"],features:[S]})}return n})();var Gi=(()=>{class n extends Se{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275dir=p({type:n,selectors:[["","matHeaderRowDef",""]],inputs:{columns:[0,"matHeaderRowDef","columns"],sticky:[2,"matHeaderRowDefSticky","sticky",y]},features:[A([{provide:Se,useExisting:n}]),S]})}return n})();var $i=(()=>{class n extends je{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275dir=p({type:n,selectors:[["","matRowDef",""]],inputs:{columns:[0,"matRowDefColumns","columns"],when:[0,"matRowDefWhen","when"]},features:[A([{provide:je,useExisting:n}]),S]})}return n})(),Yi=(()=>{class n extends ot{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275cmp=T({type:n,selectors:[["mat-header-row"],["tr","mat-header-row",""]],hostAttrs:["role","row",1,"mat-mdc-header-row","mdc-data-table__header-row"],exportAs:["matHeaderRow"],features:[A([{provide:ot,useExisting:n}]),S],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&I(0,0)},dependencies:[se],encapsulation:2})}return n})();var Xi=(()=>{class n extends rt{static \u0275fac=(()=>{let e;return function(i){return(e||(e=z(n)))(i||n)}})();static \u0275cmp=T({type:n,selectors:[["mat-row"],["tr","mat-row",""]],hostAttrs:["role","row",1,"mat-mdc-row","mdc-data-table__row"],exportAs:["matRow"],features:[A([{provide:rt,useExisting:n}]),S],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&I(0,0)},dependencies:[se],encapsulation:2})}return n})();var Ji=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Q({type:n});static \u0275inj=H({imports:[Hi,fe]})}return n})(),Bn=9007199254740991,We=class extends Yt{_data;_renderData=new le([]);_filter=new le("");_internalPageChanges=new O;_renderChangesSubscription=null;filteredData;get data(){return this._data.value}set data(o){o=Array.isArray(o)?o:[],this._data.next(o),this._renderChangesSubscription||this._filterData(o)}get filter(){return this._filter.value}set filter(o){this._filter.next(o),this._renderChangesSubscription||this._filterData(this.data)}get sort(){return this._sort}set sort(o){this._sort=o,this._updateChangeSubscription()}_sort;get paginator(){return this._paginator}set paginator(o){this._paginator=o,this._updateChangeSubscription()}_paginator;sortingDataAccessor=(o,e)=>{let t=o[e];if(Qt(t)){let i=Number(t);return i<Bn?i:t}return t};sortData=(o,e)=>{let t=e.active,i=e.direction;return!t||i==""?o:o.sort((a,r)=>{let l=this.sortingDataAccessor(a,t),c=this.sortingDataAccessor(r,t),h=typeof l,g=typeof c;h!==g&&(h==="number"&&(l+=""),g==="number"&&(c+=""));let C=0;return l!=null&&c!=null?l>c?C=1:l<c&&(C=-1):l!=null?C=1:c!=null&&(C=-1),C*(i=="asc"?1:-1)})};filterPredicate=(o,e)=>{let t=e.trim().toLowerCase();return Object.values(o).some(i=>`${i}`.toLowerCase().includes(t))};constructor(o=[]){super(),this._data=new le(o),this._updateChangeSubscription()}_updateChangeSubscription(){let o=this._sort?te(this._sort.sortChange,this._sort.initialized):ce(null),e=this._paginator?te(this._paginator.page,this._internalPageChanges,this._paginator.initialized):ce(null),t=this._data,i=Y([t,this._filter]).pipe(ee(([l])=>this._filterData(l))),a=Y([i,o]).pipe(ee(([l])=>this._orderData(l))),r=Y([a,e]).pipe(ee(([l])=>this._pageData(l)));this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=r.subscribe(l=>this._renderData.next(l))}_filterData(o){return this.filteredData=this.filter==null||this.filter===""?o:o.filter(e=>this.filterPredicate(e,this.filter)),this.paginator&&this._updatePaginator(this.filteredData.length),this.filteredData}_orderData(o){return this.sort?this.sortData(o.slice(),this.sort):o}_pageData(o){if(!this.paginator)return o;let e=this.paginator.pageIndex*this.paginator.pageSize;return o.slice(e,e+this.paginator.pageSize)}_updatePaginator(o){Promise.resolve().then(()=>{let e=this.paginator;if(e&&(e.length=o,e.pageIndex>0)){let t=Math.ceil(e.length/e.pageSize)-1||0,i=Math.min(e.pageIndex,t);i!==e.pageIndex&&(e.pageIndex=i,this._internalPageChanges.next())}})}connect(){return this._renderChangesSubscription||this._updateChangeSubscription(),this._renderData}disconnect(){this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=null}};var Hn=()=>[10,20,50];function jn(n,o){n&1&&(d(0,"th",25),f(1,"\u7BA1\u7406\u54E1\u59D3\u540D"),m())}function Wn(n,o){if(n&1&&(d(0,"td",26)(1,"span",27),f(2),m()()),n&2){let e=o.$implicit;u(2),B(" ",e.name||"\u672A\u547D\u540D\u7BA1\u7406\u54E1"," ")}}function Un(n,o){n&1&&(d(0,"th",25),f(1,"\u884C\u52D5"),m())}function Qn(n,o){if(n&1&&(d(0,"td",26)(1,"span",28),f(2),m()()),n&2){let e=o.$implicit;u(2),B(" ",e.action," ")}}function Kn(n,o){n&1&&(d(0,"th",25),f(1,"IP \u4F4D\u7F6E"),m())}function qn(n,o){if(n&1&&(d(0,"td",26)(1,"code",29),f(2),m()()),n&2){let e=o.$implicit;u(2),B(" ",e.ipAddress," ")}}function Gn(n,o){n&1&&(d(0,"th",25),f(1,"\u5275\u5EFA\u6642\u9593"),m())}function $n(n,o){if(n&1&&(d(0,"td",30),f(1),Ft(2,"date"),m()),n&2){let e=o.$implicit;u(),B(" ",Et(2,1,e.createdAt,"yyyy-MM-dd HH:mm:ss")," ")}}function Yn(n,o){n&1&&P(0,"tr",31)}function Xn(n,o){n&1&&P(0,"tr",32)}var Zi=class n{logsev=s(Ri);LogData=Re([]);dataSource=new We([]);startDate=null;endDate=null;filterValue="";today=new Date;constructor(){this.logsev.getLogs().subscribe(o=>{console.log(o),this.LogData.set(o),this.dataSource.data=o})}displayedColumns=["name","action","ipAddress","createdAt"];paginator;ngAfterViewInit(){this.dataSource.paginator=this.paginator}ngOnInit(){this.loadData(),this.dataSource.filterPredicate=(o,e)=>{let t=JSON.parse(e),a=(o.name+o.action+o.ipAddress).toLowerCase().includes((t.keyword||"").toLowerCase()),r=new Date(o.createdAt),l=!t.startDate||r>=new Date(t.startDate),c=!t.endDate||r<=new Date(t.endDate);return a&&l&&c}}loadData(){this.logsev.getLogs().subscribe(o=>{this.dataSource.data=o.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()),console.log(o)})}applyFilter(o){let e=o.target.value;this.updateFilter({keyword:e})}applyDateFilter(){this.updateFilter({startDate:this.startDate,endDate:this.endDate})}updateFilter(o){let e=this.filterValue?JSON.parse(this.filterValue):{},t=Ue(Ue({},e),o);this.filterValue=JSON.stringify(t),this.dataSource.filter=this.filterValue}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=T({type:n,selectors:[["app-logs-component"]],viewQuery:function(e,t){if(e&1&&Ce(we,5),e&2){let i;b(i=v())&&(t.paginator=i.first)}},decls:47,vars:13,consts:[["startPicker",""],["endPicker",""],[1,"logs-page"],[1,"logs-card"],[1,"logs-header"],[1,"eyebrow"],[1,"logs-toolbar"],["appearance","outline",1,"search-field"],["matInput","","placeholder","\u8F38\u5165\u95DC\u9375\u5B57...",3,"keyup"],[1,"date-filter"],["appearance","outline"],["matInput","",3,"dateChange","ngModelChange","matDatepicker","ngModel","max"],["matSuffix","",3,"for"],[1,"table-scroll"],["mat-table","",1,"logs-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","action"],["matColumnDef","ipAddress"],["matColumnDef","createdAt"],["mat-cell","","class","created-time",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",1,"logs-paginator",3,"pageSizeOptions"],["mat-header-cell",""],["mat-cell",""],[1,"log-badge","user"],[1,"log-badge","action"],[1,"ip-code"],["mat-cell","",1,"created-time"],["mat-header-row",""],["mat-row",""]],template:function(e,t){if(e&1){let i=J();d(0,"section",2)(1,"div",3)(2,"div",4)(3,"div")(4,"p",5),f(5,"\u7CFB\u7D71\u7D00\u9304"),m(),d(6,"h2"),f(7,"\u7CFB\u7D71\u64CD\u4F5C\u7D00\u9304"),m(),d(8,"p"),f(9,"\u67E5\u770B\u7BA1\u7406\u54E1\u64CD\u4F5C\u3001\u4F86\u6E90 IP \u8207\u5EFA\u7ACB\u6642\u9593\u3002"),m()()(),d(10,"div",6)(11,"mat-form-field",7)(12,"mat-label"),f(13,"\u641C\u5C0B ID / Action / IP"),m(),d(14,"input",8),R("keyup",function(r){return t.applyFilter(r)}),m()(),d(15,"div",9)(16,"mat-form-field",10)(17,"mat-label"),f(18,"\u958B\u59CB\u65E5\u671F"),m(),d(19,"input",11),R("dateChange",function(){return t.applyDateFilter()}),Ye("ngModelChange",function(r){return j(i),$e(t.startDate,r)||(t.startDate=r),W(r)}),m(),P(20,"mat-datepicker-toggle",12)(21,"mat-datepicker",null,0),m(),d(23,"mat-form-field",10)(24,"mat-label"),f(25,"\u7D50\u675F\u65E5\u671F"),m(),d(26,"input",11),R("dateChange",function(){return t.applyDateFilter()}),Ye("ngModelChange",function(r){return j(i),$e(t.endDate,r)||(t.endDate=r),W(r)}),m(),P(27,"mat-datepicker-toggle",12)(28,"mat-datepicker",null,1),m()()(),d(30,"div",13)(31,"table",14),ne(32,15),K(33,jn,2,0,"th",16)(34,Wn,3,1,"td",17),ae(),ne(35,18),K(36,Un,2,0,"th",16)(37,Qn,3,1,"td",17),ae(),ne(38,19),K(39,Kn,2,0,"th",16)(40,qn,3,1,"td",17),ae(),ne(41,20),K(42,Gn,2,0,"th",16)(43,$n,3,4,"td",21),ae(),K(44,Yn,1,0,"tr",22)(45,Xn,1,0,"tr",23),m()(),P(46,"mat-paginator",24),m()()}if(e&2){let i=oe(22),a=oe(29);u(19),_("matDatepicker",i),Ge("ngModel",t.startDate),_("max",t.today),u(),_("for",i),u(6),_("matDatepicker",a),Ge("ngModel",t.endDate),_("max",t.today),u(),_("for",a),u(4),_("dataSource",t.dataSource),u(13),_("matHeaderRowDef",t.displayedColumns),u(),_("matRowDefColumns",t.displayedColumns),u(),_("pageSizeOptions",It(12,Hn))}},dependencies:[Ji,ji,Ui,Gi,Qi,Wi,$i,Ki,qi,Yi,Xi,Pi,we,ze,Ae,si,li,Di,wi,gi,hi,pi,fi,vi,jt,At,Nt,Vt,Pt],styles:[".logs-card[_ngcontent-%COMP%]{overflow:hidden;border:1px solid rgba(230,111,67,.12);border-radius:16px;background:#fff;box-shadow:0 12px 32px #402d240f}.logs-header[_ngcontent-%COMP%]{padding:1.5rem 1.5rem 1rem;border-bottom:1px solid rgba(230,111,67,.1)}.logs-header[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%]{margin-bottom:.35rem;color:var(--color-primary, #e66f43);font-size:.85rem;font-weight:800}.logs-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 .35rem;color:#2f2926;font-size:1.6rem;font-weight:800}.logs-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#8a817c}.logs-toolbar[_ngcontent-%COMP%]{padding:1.25rem 1.5rem 0;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1rem;align-items:start}.search-field[_ngcontent-%COMP%]{width:100%}.date-filter[_ngcontent-%COMP%]{display:flex;gap:.75rem}.date-filter[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.table-scroll[_ngcontent-%COMP%]{width:100%;overflow-x:auto;padding:0 1.5rem 1rem}.logs-table[_ngcontent-%COMP%]{width:100%;min-width:760px;background:transparent}.logs-table[_ngcontent-%COMP%]   .mat-mdc-header-row[_ngcontent-%COMP%], .logs-table[_ngcontent-%COMP%]   .mat-header-row[_ngcontent-%COMP%]{background:#fffaf7}.logs-table[_ngcontent-%COMP%]   .mat-mdc-header-cell[_ngcontent-%COMP%], .logs-table[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%]{border-bottom:1px solid rgba(230,111,67,.14);color:#2f2926;font-size:.88rem;font-weight:800}.logs-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%], .logs-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]{border-bottom:1px solid rgba(64,45,36,.08);color:#5f5650;font-size:.92rem}.logs-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%], .logs-table[_ngcontent-%COMP%]   .mat-row[_ngcontent-%COMP%]{transition:background .18s ease}.logs-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]:hover, .logs-table[_ngcontent-%COMP%]   .mat-row[_ngcontent-%COMP%]:hover{background:#fffaf7}.log-badge[_ngcontent-%COMP%]{padding:.35rem .75rem;border-radius:999px;display:inline-flex;align-items:center;font-size:.8rem;font-weight:800;white-space:nowrap}.log-badge.user[_ngcontent-%COMP%]{background:var(--color-primary-light, #fff2ee);color:var(--color-primary, #e66f43)}.log-badge.action[_ngcontent-%COMP%]{background:#e8f7ed;color:#2f8a4d}.ip-code[_ngcontent-%COMP%]{padding:.3rem .55rem;border-radius:8px;background:#f5f2ef;color:#5f5650;font-size:.82rem}.created-time[_ngcontent-%COMP%]{color:#7a6f69;white-space:nowrap}.logs-paginator[_ngcontent-%COMP%]{border-top:1px solid rgba(230,111,67,.1);background:#fff}  .logs-card .mat-mdc-form-field{--mdc-outlined-text-field-outline-color: rgba(230, 111, 67, .18);--mdc-outlined-text-field-hover-outline-color: rgba(230, 111, 67, .42);--mdc-outlined-text-field-focus-outline-color: var(--color-primary, #e66f43);--mdc-outlined-text-field-label-text-color: #8a817c;--mdc-outlined-text-field-input-text-color: #2f2926}  .logs-card .mat-mdc-text-field-wrapper{background:#fffaf7;border-radius:12px}@media(max-width:900px){.logs-toolbar[_ngcontent-%COMP%]{grid-template-columns:1fr}.date-filter[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr}.date-filter[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}}@media(max-width:768px){.logs-page[_ngcontent-%COMP%]{padding:1.5rem 1rem 3rem}.logs-header[_ngcontent-%COMP%], .logs-toolbar[_ngcontent-%COMP%], .table-scroll[_ngcontent-%COMP%]{padding-inline:1rem}.date-filter[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};export{Zi as LogsComponent};
