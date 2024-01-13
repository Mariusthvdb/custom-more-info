!function(){"use strict";function t(t,e,n,o){return new(n||(n=Promise))((function(i,r){function s(t){try{l(o.next(t))}catch(t){r(t)}}function a(t){try{l(o.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}l((o=o.apply(t,e||[])).next())}))}function e(t,e){var n,o,i,r,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,a[0]&&(s=0)),s;)try{if(n=1,o&&(i=2&a[0]?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,o=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){s.label=a[1];break}if(6===a[0]&&s.label<i[1]){s.label=i[1],i=a;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(a);break}i[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],o=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}"function"==typeof SuppressedError&&SuppressedError;var n=function(){return n=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},n.apply(this,arguments)};function o(t,e,n,o){return new(n||(n=Promise))((function(i,r){function s(t){try{l(o.next(t))}catch(t){r(t)}}function a(t){try{l(o.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}l((o=o.apply(t,e||[])).next())}))}function i(t,e){var n,o,i,r,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,a[0]&&(s=0)),s;)try{if(n=1,o&&(i=2&a[0]?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,o=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){s.label=a[1];break}if(6===a[0]&&s.label<i[1]){s.label=i[1],i=a;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(a);break}i[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],o=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}"function"==typeof SuppressedError&&SuppressedError;var r="$",s=":host",a="invalid selector",l=10,c=10,u=function(t){var e,n=t[0],o=t[1];return(e=n)&&(e instanceof Document||e instanceof Element||e instanceof ShadowRoot)&&"string"==typeof o};function _(t,e){return function(t){return t.split(",").map((function(t){return t.trim()}))}(t).map((function(t){var n=function(t){return t.split(r).map((function(t){return t.trim()}))}(t);return e(n)}))}var h=function(t,e,n,o){return new Promise((function(i){var r=0,s=function(){var a=t();e(a)?i(a):++r<n?setTimeout(s,o):i(a)};s()}))};function d(t,e){var n=e?" If you want to select a shadowRoot, use ".concat(e," instead."):"";return"".concat(t," cannot be used with a selector ending in a shadowRoot (").concat(r,").").concat(n)}function f(t){return t instanceof Promise?t:Promise.resolve(t)}function O(){return"You can not select a shadowRoot (".concat(r,") of the document.")}function v(){return"You can not select a shadowRoot (".concat(r,") of a shadowRoot.")}function y(t,e){for(var n,o,i=null,r=t.length,a=0;a<r;a++){if(0===a)if(t[a].length)i=e.querySelector(t[a]);else{if(e instanceof Document)throw new SyntaxError(O());if(e instanceof ShadowRoot)throw new SyntaxError(v());i=(null===(n=e.shadowRoot)||void 0===n?void 0:n.querySelector(t[++a]))||null}else i=(null===(o=i.shadowRoot)||void 0===o?void 0:o.querySelector("".concat(s," ").concat(t[a])))||null;if(null===i)return null}return i}function E(t,e){var n,o=function(t,e,n){if(n||2===arguments.length)for(var o,i=0,r=e.length;i<r;i++)!o&&i in e||(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))}([],t,!0),i=o.pop();if(!o.length)return e.querySelectorAll(i);var r=y(o,e);return(null===(n=null==r?void 0:r.shadowRoot)||void 0===n?void 0:n.querySelectorAll("".concat(s," ").concat(i)))||null}function A(t,e){if(1===t.length&&!t[0].length){if(e instanceof Document)throw new SyntaxError(O());if(e instanceof ShadowRoot)throw new SyntaxError(v());return e.shadowRoot}var n=y(t,e);return(null==n?void 0:n.shadowRoot)||null}function b(t,e,n,r){return o(this,void 0,void 0,(function(){return i(this,(function(o){return[2,h((function(){return function(t,e,n,o){void 0===n&&(n="querySelector"),void 0===o&&(o="shadowRootQuerySelector");for(var i=_(t,(function(t){if(!t[t.length-1].length)throw new SyntaxError(d(n,o));return t})),r=i.length,s=0;s<r;s++){var a=y(i[s],e);if(a)return a}return null}(t,e,"asyncQuerySelector","asyncShadowRootQuerySelector")}),(function(t){return!!t}),n,r)]}))}))}function p(t,e,n,r){return o(this,void 0,void 0,(function(){return i(this,(function(o){return[2,h((function(){return function(t,e,n){void 0===n&&(n="querySelectorAll");for(var o=_(t,(function(t){if(!t[t.length-1].length)throw new SyntaxError(d(n));return t})),i=o.length,r=0;r<i;r++){var s=E(o[r],e);if(null==s?void 0:s.length)return s}return document.querySelectorAll(a)}(t,e,"asyncQuerySelectorAll")}),(function(t){return!!t.length}),n,r)]}))}))}function g(t,e,n,s){return o(this,void 0,void 0,(function(){return i(this,(function(o){return[2,h((function(){return function(t,e,n,o){void 0===n&&(n="shadowRootQuerySelector"),void 0===o&&(o="querySelector");for(var i=_(t,(function(t){if(t.pop().length)throw new SyntaxError(function(t,e){return"".concat(t," must be used with a selector ending in a shadowRoot (").concat(r,"). If you don't want to select a shadowRoot, use ").concat(e," instead.")}(n,o));return t})),s=i.length,a=0;a<s;a++){var l=A(i[a],e);if(l)return l}return null}(t,e,"asyncShadowRootQuerySelector","asyncQuerySelector")}),(function(t){return!!t}),n,s)]}))}))}var I=function(t,e){var n=t.querySelectorAll(e);if(n.length)return n;if(t instanceof Element&&t.shadowRoot){var o=I(t.shadowRoot,e);if(o.length)return o}for(var i=0,r=Array.from(t.querySelectorAll("*"));i<r.length;i++){var s=r[i],l=I(s,e);if(l.length)return l}return document.querySelectorAll(a)},N=function(t,e,n,o){return h((function(){return I(t,e)}),(function(t){return!!t.length}),n,o)};function S(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return o(this,void 0,void 0,(function(){var e,n,o,r,s;return i(this,(function(i){switch(i.label){case 0:return u(t)?(e=t[0],n=t[1],o=t[2],[4,b(n,e,(null==o?void 0:o.retries)||l,(null==o?void 0:o.delay)||c)]):[3,2];case 1:case 3:return[2,i.sent()];case 2:return r=t[0],s=t[1],[4,b(r,document,(null==s?void 0:s.retries)||l,(null==s?void 0:s.delay)||c)]}}))}))}function m(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return o(this,void 0,void 0,(function(){var e,n,o,r,s;return i(this,(function(i){switch(i.label){case 0:return u(t)?(e=t[0],n=t[1],o=t[2],[4,p(n,e,(null==o?void 0:o.retries)||l,(null==o?void 0:o.delay)||c)]):[3,2];case 1:return[2,i.sent()];case 2:return r=t[0],s=t[1],[2,p(r,document,(null==s?void 0:s.retries)||l,(null==s?void 0:s.delay)||c)]}}))}))}function R(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return o(this,void 0,void 0,(function(){var e,n,o,r,s;return i(this,(function(i){switch(i.label){case 0:return u(t)?(e=t[0],n=t[1],o=t[2],[4,g(n,e,(null==o?void 0:o.retries)||l,(null==o?void 0:o.delay)||c)]):[3,2];case 1:return[2,i.sent()];case 2:return r=t[0],s=t[1],[2,g(r,document,(null==s?void 0:s.retries)||l,(null==s?void 0:s.delay)||c)]}}))}))}var L=function(){function t(t,e){t instanceof Node||t instanceof Promise?(this._element=t,this._asyncParams=n({retries:l,delay:c},e||{})):(this._element=document,this._asyncParams=n({retries:l,delay:c},t||{}))}return Object.defineProperty(t.prototype,"element",{get:function(){return f(this._element).then((function(t){return t instanceof NodeList?t[0]||null:t}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,r,{get:function(){var e=this;return new t(f(this._element).then((function(t){return t instanceof Document||t instanceof ShadowRoot||null===t||t instanceof NodeList&&0===t.length?null:t instanceof NodeList?R(t[0],r,e._asyncParams):R(t,r,e._asyncParams)})),this._asyncParams)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"all",{get:function(){return f(this._element).then((function(t){return t instanceof NodeList?t:document.querySelectorAll(a)}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"asyncParams",{get:function(){return this._asyncParams},enumerable:!1,configurable:!0}),t.prototype.eq=function(t){return o(this,void 0,void 0,(function(){return i(this,(function(e){return[2,f(this._element).then((function(e){return e instanceof NodeList&&e[t]||null}))]}))}))},t.prototype.query=function(e){var n=this;return new t(f(this._element).then((function(t){return null===t||t instanceof NodeList&&0===t.length?null:t instanceof NodeList?m(t[0],e,n._asyncParams):m(t,e,n._asyncParams)})),this._asyncParams)},t.prototype.deepQuery=function(e){var n=this;return new t(f(this._element).then((function(t){return null===t||t instanceof NodeList&&0===t.length?null:t instanceof NodeList?Promise.race(Array.from(t).map((function(t){return N(t,e,n._asyncParams.retries,n._asyncParams.delay)}))):N(t,e,n._asyncParams.retries,n._asyncParams.delay)})),this._asyncParams)},t}(),D=function(t,e){return D=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},D(t,e)},H=function(){return H=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},H.apply(this,arguments)};"function"==typeof SuppressedError&&SuppressedError;var T,w,G,M,P,F,k,C,V,j,B,q,x,U,Y,K,$="$",W={retries:100,delay:50};!function(t){t.HOME_ASSISTANT="HOME_ASSISTANT",t.HOME_ASSISTANT_MAIN="HOME_ASSISTANT_MAIN",t.HA_DRAWER="HA_DRAWER",t.HA_SIDEBAR="HA_SIDEBAR",t.PARTIAL_PANEL_RESOLVER="PARTIAL_PANEL_RESOLVER"}(T||(T={})),function(t){t.HA_PANEL_LOVELACE="HA_PANEL_LOVELACE",t.HUI_ROOT="HUI_ROOT",t.HEADER="HEADER",t.HUI_VIEW="HUI_VIEW"}(w||(w={})),function(t){t.HA_MORE_INFO_DIALOG="HA_MORE_INFO_DIALOG",t.HA_DIALOG="HA_DIALOG",t.HA_DIALOG_CONTENT="HA_DIALOG_CONTENT",t.HA_MORE_INFO_DIALOG_INFO="HA_MORE_INFO_DIALOG_INFO",t.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK="HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK",t.HA_DIALOG_MORE_INFO_SETTINGS="HA_DIALOG_MORE_INFO_SETTINGS"}(G||(G={})),function(t){t.ON_LISTEN="onListen",t.ON_PANEL_LOAD="onPanelLoad",t.ON_LOVELACE_PANEL_LOAD="onLovelacePanelLoad",t.ON_MORE_INFO_DIALOG_OPEN="onMoreInfoDialogOpen",t.ON_HISTORY_AND_LOGBOOK_DIALOG_OPEN="onHistoryAndLogBookDialogOpen",t.ON_SETTINGS_DIALOG_OPEN="onSettingsDialogOpen"}(M||(M={})),function(t){t.HOME_ASSISTANT="home-assistant",t.HOME_ASSISTANT_MAIN="home-assistant-main",t.HA_DRAWER="ha-drawer",t.HA_SIDEBAR="ha-sidebar",t.PARTIAL_PANEL_RESOLVER="partial-panel-resolver",t.HA_PANEL_LOVELACE="ha-panel-lovelace",t.HUI_ROOT="hui-root",t.HEADER=".header",t.HUI_VIEW="hui-view",t.HA_MORE_INFO_DIALOG="ha-more-info-dialog",t.HA_DIALOG="ha-dialog",t.HA_DIALOG_CONTENT=".content",t.HA_MORE_INFO_DIALOG_INFO="ha-more-info-info",t.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK="ha-more-info-history-and-logbook",t.HA_DIALOG_MORE_INFO_SETTINGS="ha-more-info-settings"}(K||(K={}));var Q,z,J,X=((P={})[T.HOME_ASSISTANT]={selector:K.HOME_ASSISTANT,children:{shadowRoot:{selector:$,children:(F={},F[T.HOME_ASSISTANT_MAIN]={selector:K.HOME_ASSISTANT_MAIN,children:{shadowRoot:{selector:$,children:(k={},k[T.HA_DRAWER]={selector:K.HA_DRAWER,children:(C={},C[T.HA_SIDEBAR]={selector:K.HA_SIDEBAR,children:{shadowRoot:{selector:$}}},C[T.PARTIAL_PANEL_RESOLVER]={selector:K.PARTIAL_PANEL_RESOLVER},C)},k)}}},F)}}},P),Z=((V={})[w.HA_PANEL_LOVELACE]={selector:K.HA_PANEL_LOVELACE,children:{shadowRoot:{selector:$,children:(j={},j[w.HUI_ROOT]={selector:K.HUI_ROOT,children:{shadowRoot:{selector:$,children:(B={},B[w.HEADER]={selector:K.HEADER},B[w.HUI_VIEW]={selector:K.HUI_VIEW},B)}}},j)}}},V),tt={shadowRoot:{selector:$,children:(q={},q[G.HA_MORE_INFO_DIALOG]={selector:K.HA_MORE_INFO_DIALOG,children:{shadowRoot:{selector:$,children:(x={},x[G.HA_DIALOG]={selector:K.HA_DIALOG,children:(U={},U[G.HA_DIALOG_CONTENT]={selector:K.HA_DIALOG_CONTENT,children:(Y={},Y[G.HA_MORE_INFO_DIALOG_INFO]={selector:K.HA_MORE_INFO_DIALOG_INFO},Y[G.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK]={selector:K.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK},Y[G.HA_DIALOG_MORE_INFO_SETTINGS]={selector:K.HA_DIALOG_MORE_INFO_SETTINGS},Y)},U)},x)}}},q)}},et=function(t,e,n,o){return void 0===n&&(n=null),void 0===o&&(o=!1),Object.entries(e||{}).reduce((function(e,i){var r=i[0],s=i[1];if(s.selector===$&&n)return s.children?H(H({},e),et(t,s.children,n,!0)):e;var a=n?n.then((function(e){return S(e,(n=s.selector,o?"$ "+n:n),t);var n})):S(s.selector,t);return e[r]={element:a,children:et(t,s.children,a),selector:new L(a,t)},e}),{})},nt=function(t,e){for(var n=0,o=Object.entries(e);n<o.length;n++){var i=o[n];if(i[0]===t)return i[1];var r=nt(t,i[1].children);if(r)return r}},ot=function(t,e){return Object.keys(t).reduce((function(t,n){var o=nt(n,e);o.children;var i=function(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(o=Object.getOwnPropertySymbols(t);i<o.length;i++)e.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(t,o[i])&&(n[o[i]]=t[o[i]])}return n}(o,["children"]);return t[n]=H({},i),t}),{})},it=function(){function t(){this.delegate=document.createDocumentFragment()}return t.prototype.addEventListener=function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];(t=this.delegate).addEventListener.apply(t,e)},t.prototype.dispatchEvent=function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return(t=this.delegate).dispatchEvent.apply(t,e)},t.prototype.removeEventListener=function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return(t=this.delegate).removeEventListener.apply(t,e)},t}(),rt=function(t){function e(e){void 0===e&&(e={});var n=t.call(this)||this;return n._config=H(H({},W),e),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}D(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype._dispatchEvent=function(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e}))},e.prototype._updateDialogElements=function(t){var e,n=this;void 0===t&&(t=G.HA_MORE_INFO_DIALOG_INFO),this._dialogTree=et(this._config,tt,this._haRootElements.HOME_ASSISTANT.element);var o=ot(G,this._dialogTree);o.HA_DIALOG_CONTENT.element.then((function(t){n._dialogsContentObserver.disconnect(),n._dialogsContentObserver.observe(t,{childList:!0})})),this._haDialogElements=function(t,e){return[G.HA_MORE_INFO_DIALOG,G.HA_DIALOG,G.HA_DIALOG_CONTENT,e].reduce((function(e,n){return e[n]=t[n],e}),{})}(o,t);var i=((e={})[G.HA_MORE_INFO_DIALOG_INFO]=M.ON_MORE_INFO_DIALOG_OPEN,e[G.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK]=M.ON_HISTORY_AND_LOGBOOK_DIALOG_OPEN,e[G.HA_DIALOG_MORE_INFO_SETTINGS]=M.ON_SETTINGS_DIALOG_OPEN,e);this._dispatchEvent(i[t],this._haDialogElements)},e.prototype._updateRootElements=function(){var t=this;this._homeAssistantRootTree=et(this._config,X),this._haRootElements=ot(T,this._homeAssistantRootTree),this._haRootElements[T.HOME_ASSISTANT].selector.$.element.then((function(e){t._dialogsObserver.disconnect(),t._dialogsObserver.observe(e,{childList:!0})})),this._haRootElements[T.PARTIAL_PANEL_RESOLVER].element.then((function(e){t._panelResolverObserver.disconnect(),e&&t._panelResolverObserver.observe(e,{childList:!0})})),this._dispatchEvent(M.ON_LISTEN,this._haRootElements),this._dispatchEvent(M.ON_PANEL_LOAD,this._haRootElements)},e.prototype._updateLovelaceElements=function(){var t=this,e=Date.now();e-this._timestap<500||(this._timestap=e,this._homeAssistantResolverTree=et(this._config,Z,this._haRootElements[T.HA_DRAWER].element),this._haResolverElements=ot(w,this._homeAssistantResolverTree),this._haResolverElements[w.HA_PANEL_LOVELACE].selector.$.element.then((function(e){t._lovelaceObserver.disconnect(),e&&(t._lovelaceObserver.observe(e,{childList:!0}),t._dispatchEvent(M.ON_LOVELACE_PANEL_LOAD,H(H({},t._haRootElements),t._haResolverElements)))})))},e.prototype._watchDialogs=function(t){var e=this;t.forEach((function(t){t.addedNodes.forEach((function(t){t.localName===K.HA_MORE_INFO_DIALOG&&e._updateDialogElements()}))}))},e.prototype._watchDialogsContent=function(t){var e=this;t.forEach((function(t){t.addedNodes.forEach((function(t){var n,o=((n={})[K.HA_MORE_INFO_DIALOG_INFO]=G.HA_MORE_INFO_DIALOG_INFO,n[K.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK]=G.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK,n[K.HA_DIALOG_MORE_INFO_SETTINGS]=G.HA_DIALOG_MORE_INFO_SETTINGS,n);if(t.localName&&t.localName in o){var i=t.localName;e._updateDialogElements(o[i])}}))}))},e.prototype._watchDashboards=function(t){var e=this;t.forEach((function(t){t.addedNodes.forEach((function(t){e._dispatchEvent(M.ON_PANEL_LOAD,e._haRootElements),t.localName===K.HA_PANEL_LOVELACE&&e._updateLovelaceElements()}))}))},e.prototype._watchLovelace=function(t){var e=this;t.forEach((function(t){t.addedNodes.forEach((function(t){t.localName===K.HUI_ROOT&&e._updateLovelaceElements()}))}))},e.prototype.listen=function(){this._watchDialogsBinded=this._watchDialogs.bind(this),this._watchDialogsContentBinded=this._watchDialogsContent.bind(this),this._watchDashboardsBinded=this._watchDashboards.bind(this),this._watchLovelaceBinded=this._watchLovelace.bind(this),this._dialogsObserver=new MutationObserver(this._watchDialogsBinded),this._dialogsContentObserver=new MutationObserver(this._watchDialogsContentBinded),this._panelResolverObserver=new MutationObserver(this._watchDashboardsBinded),this._lovelaceObserver=new MutationObserver(this._watchLovelaceBinded),this._updateRootElements(),this._updateLovelaceElements()},e.prototype.addEventListener=function(e,n,o){t.prototype.addEventListener.call(this,e,n,o)},e}(it),st="custom_more_info";!function(t){t.HUI_VIEW="hui-view",t.MORE_INFO_CONTENT="more-info-content",t.MORE_INFO_HISTORY="ha-more-info-history",t.MORE_INFO_LOGBOOK="ha-more-info-logbook",t.HA_ATTRIBUTES="ha-attributes",t.MENU_ITEM="ha-icon-button",t.MENU_ITEM_ICON="mwc-icon-button",t.MORE_INFO_HEADER="ha-dialog-header",t.MORE_INFO_HEADER_HISTORY_ICON='ha-icon-button[data-custom-selector="DIALOG_HISTORY"]'}(z||(z={})),function(t){t.SEARCH="SEARCH",t.ASSIST="ASSIST",t.REFRESH="REFRESH",t.UNUSED_ENTITIES="UNUSED_ENTITIES",t.RELOAD_RESOURCES="RELOAD_RESOURCES",t.EDIT_DASHBOARD="EDIT_DASHBOARD",t.DIALOG_DISMISS="DIALOG_DISMISS",t.DIALOG_HISTORY="DIALOG_HISTORY",t.DIALOG_SETTINGS="DIALOG_SETTINGS"}(J||(J={}));var at="".concat("ui",".dialogs.more_info_control"),lt=Object.freeze(((Q={})[J.DIALOG_HISTORY]="".concat(at,".history"),Q[J.DIALOG_SETTINGS]="".concat(at,".settings"),Q[J.DIALOG_DISMISS]="".concat(at,".dismiss"),Q)),ct=/[.?+^$[\]\\(){}|-]/g,ut=["assumed_state","attribution","custom_ui_more_info","custom_ui_state_card","device_class","editable","emulated_hue_name","emulated_hue","entity_id","entity_picture","event_types","friendly_name","haaska_hidden","haaska_name","icon","initial_state","last_reset","restored","state_class","supported_features","unit_of_measurement"],_t=function(t){return t instanceof ShadowRoot?t.host.localName:t.localName},ht=function(t){var e=_t(t);return t.querySelector("#".concat(st,"_").concat(e))},dt=function(t,e){var n=_t(t),o=ht(t);o||((o=document.createElement("style")).setAttribute("id","".concat(st,"_").concat(n)),t.appendChild(o)),o.innerHTML=e},ft=function(t){var e=_t(t);ht(t)&&t.querySelector("#".concat(st,"_").concat(e)).remove()},Ot=function(t){return"".concat(t," {\n        display: none !important;\n    }")},vt=function(t){var e=0,n=Object.values(lt);return new Promise((function(o,i){var r=function(){var s,a=null===(s=null==t?void 0:t.hass)||void 0===s?void 0:s.resources,l=!1;if(a){var c=t.hass.language;n.find((function(t){return!a[c][t]}))||(l=!0)}l?o(a):++e<500?setTimeout(r,50):i()};r()}))},yt=function(){function n(){var t=this;this._selector=new rt({retries:5,delay:500}),this._selector.addEventListener(M.ON_LOVELACE_PANEL_LOAD,(function(e){t.storeConfig(e.detail)})),this._selector.addEventListener(M.ON_MORE_INFO_DIALOG_OPEN,(function(e){t._debug("a more info dialog has been opened so applying customizations"),t.queryAttributes(e.detail),t.queryHistoryAndLogbook(e.detail)})),this._selector.addEventListener(M.ON_HISTORY_AND_LOGBOOK_DIALOG_OPEN,(function(e){t._debug("a history and logbook dialog has been opened so applying customizations"),t.queryHistoryAndLogbook(e.detail)})),this._selector.listen()}return n.prototype._insertAttributesGlobs=function(t,e,n,o,i){this._addSetValues(o,this._getFiltersByGlob(t,e)),this._addSetValues(i,this._getFiltersByGlob(t,n))},n.prototype._insertParameters=function(t,e,n,o){this._addSetValues(n,t),this._addSetValues(o,e)},n.prototype._getEntityIdRegExp=function(t){var e=t.replace(ct,"\\$&").replace(/\*/g,".*");return new RegExp("^".concat(e,"$"))},n.prototype._addSetValues=function(t,e){void 0===e&&(e=[]),e.forEach((function(e){t.add(e)}))},n.prototype._anyVisbilityMatch=function(t,e,n,o){var i,r,s;return this._anyGlobMatch(e,null==t?void 0:t.by_glob)||(null===(i=null==t?void 0:t.by_device_class)||void 0===i?void 0:i.includes(n))||(null===(r=null==t?void 0:t.by_domain)||void 0===r?void 0:r.includes(o))||(null===(s=null==t?void 0:t.by_entity_id)||void 0===s?void 0:s.includes(e))},n.prototype._debug=function(t){var e;(null===(e=this._config)||void 0===e?void 0:e.debug)&&("object"!=typeof t||t instanceof Node?console.debug(t):console.debug(JSON.stringify(t,null,4)))},n.prototype._globMatch=function(t,e){return this._getEntityIdRegExp(e).test(t)},n.prototype._anyGlobMatch=function(t,e){var n=this;return void 0===e&&(e=[]),!!e.find((function(e){return n._globMatch(t,e)}))},n.prototype._getFiltersByGlob=function(t,e){var n=this;void 0===e&&(e={});var o=[];return Object.entries(e).forEach((function(e){var i=e[0],r=e[1];n._globMatch(t,i)&&o.push.apply(o,r)})),o},n.prototype.storeConfig=function(n){var o=this;n.HA_PANEL_LOVELACE.element.then((function(t){var e,n,i=null===(n=null===(e=null==t?void 0:t.lovelace)||void 0===e?void 0:e.config)||void 0===n?void 0:n.custom_more_info;i?(o._config=i,o._debug("the config has been loaded, printing the config...")):o._config&&Object.keys(o._config).length?o._debug("this dashboard doesn‘t contain a config but there is a previous one in memory..."):(o._debug("no config has been found so initiating an empty config..."),o._config={}),o._filters={},o._visibility={},o._debug(o._config)})).finally((function(){n.HOME_ASSISTANT.element.then((function(n){(function(n){return t(void 0,void 0,void 0,(function(){var t,o,i,r,s;return e(this,(function(e){switch(e.label){case 0:return[4,vt(n)];case 1:return t=e.sent(),o=n.hass.language,i=t[o],r=Object.entries(lt),s=r.map((function(t){var e=t[0],n=t[1];return[i[n],e]})),[2,Object.fromEntries(s)]}}))}))})(n).then((function(t){o._translations=t,o._debug("translations have been retrieved. printing the translations"),o._debug(o._translations)})).catch((function(){o._debug("error getting the translations")}))}))}))},n.prototype.queryAttributes=function(n){return t(this,void 0,void 0,(function(){var t=this;return e(this,(function(e){return n.HA_MORE_INFO_DIALOG_INFO.selector.$.query(z.MORE_INFO_CONTENT).deepQuery(z.HA_ATTRIBUTES).element.then((function(e){t._debug("finished the task of querying attributes, the result is"),e?(t._debug("attributes have been found"),t._debug(e),t.filterAttributes(e)):t._debug("this dialog doesn‘t have attributes or the attributes have not been found")})),[2]}))}))},n.prototype.queryHistoryAndLogbook=function(n){var o;return t(this,void 0,void 0,(function(){var t,i,r,s,a,l,c,u,_=this;return e(this,(function(e){switch(e.label){case 0:return t=n.HA_DIALOG,i=n.HA_MORE_INFO_DIALOG,r=n.HA_DIALOG_CONTENT,[4,i.element];case 1:return s=e.sent(),[4,(h=function(){var t;return(null===(t=s.___entry)||void 0===t?void 0:t.entity_id)||s.___entityId},d=function(t){return!!t},new Promise((function(t){var e=0,n=function(){var o=h();o&&d(o)?t(o):++e<500?setTimeout(n,50):t(o)};n()})))];case 2:return a=e.sent(),l=a.replace(/^(.+)\..+$/,"$1"),c=(null===(o=s.___entry)||void 0===o?void 0:o.original_device_class)||"",u=this.getVisibility(a,l,c),t.selector.query(z.MORE_INFO_HEADER).element.then((function(t){t?(_._debug("finished the task of querying the header, the result is"),_._debug(t),_.addDataSelectors(t),_.hideHeaderElements(t,u)):_._debug("this dialog doesn‘t have a header or it has not been found")})),r.selector.deepQuery([z.MORE_INFO_HISTORY,z.MORE_INFO_LOGBOOK].join(",")).element.then((function(t){if(_._debug("finished the task of querying the history or logbook of the dialog, the result is"),t){var e=t.parentElement||t.getRootNode();_._debug("history or logbook have been found"),_._debug(t),_.hideContentElements(e,u)}else _._debug("this dialog doesn‘t have history or logbook or they have not been found.")})),[2]}var h,d}))}))},n.prototype.filterAttributes=function(t){var e=this.getFilters(t),n=e.filter_attributes.filter((function(t){return!e.unfilter_attributes.includes(t)})),o=t.extraFilters||"",i=o.length?",":"";t.extraFilters=o+i+n.join(","),e.unfilter_attributes.length&&e.unfilter_attributes.forEach((function(e){ut.includes(e)&&e in t.__stateObj.attributes&&(t.__stateObj.attributes["".concat(e," ")]=t.__stateObj.attributes[e])}))},n.prototype.hideContentElements=function(t,e){var n=[e.hide_history?Ot(z.MORE_INFO_HISTORY):"",e.hide_logbook?Ot(z.MORE_INFO_LOGBOOK):""];e.hide_history||e.hide_logbook?dt(t,n.join("")):ft(t)},n.prototype.addDataSelectors=function(t){var e,n;e=t.querySelectorAll(z.MENU_ITEM),n=this._translations,e.forEach((function(t){if(t&&t.dataset&&!t.dataset.customSelector){var e=t.shadowRoot.querySelector(z.MENU_ITEM_ICON);t.dataset.customSelector=n[e.title]}}))},n.prototype.hideHeaderElements=function(t,e){this._translations?e.hide_header_history_icon?dt(t,Ot(z.MORE_INFO_HEADER_HISTORY_ICON)):ft(t):this._debug("skiping the header history task, because translations don‘t exist")},n.prototype.getFilters=function(t){var e,n,o,i,r,s,a,l,c,u,_,h,d,f,O,v,y,E,A,b,p,g,I,N,S=t.__stateObj.entity_id,m=t.__stateObj.attributes.device_class,R=S.replace(/^(.+)\..+$/,"$1");if(this._debug("getting the filters for ".concat(S)),this._filters[S])return this._debug("the filters for this entity have been found in memory, recovering filters..."),this._debug(this._filters[S]),this._filters[S];var L=new Set,D=new Set;return this._insertAttributesGlobs(S,null===(n=null===(e=this._config)||void 0===e?void 0:e.filter_attributes)||void 0===n?void 0:n.by_glob,null===(i=null===(o=this._config)||void 0===o?void 0:o.unfilter_attributes)||void 0===i?void 0:i.by_glob,L,D),this._insertParameters(null===(a=null===(s=null===(r=this._config)||void 0===r?void 0:r.filter_attributes)||void 0===s?void 0:s.by_device_class)||void 0===a?void 0:a[m],null===(u=null===(c=null===(l=this._config)||void 0===l?void 0:l.unfilter_attributes)||void 0===c?void 0:c.by_device_class)||void 0===u?void 0:u[m],L,D),this._insertParameters(null===(d=null===(h=null===(_=this._config)||void 0===_?void 0:_.filter_attributes)||void 0===h?void 0:h.by_domain)||void 0===d?void 0:d[R],null===(v=null===(O=null===(f=this._config)||void 0===f?void 0:f.unfilter_attributes)||void 0===O?void 0:O.by_domain)||void 0===v?void 0:v[R],L,D),this._insertParameters(null===(A=null===(E=null===(y=this._config)||void 0===y?void 0:y.filter_attributes)||void 0===E?void 0:E.by_entity_id)||void 0===A?void 0:A[S],null===(g=null===(p=null===(b=this._config)||void 0===b?void 0:b.unfilter_attributes)||void 0===p?void 0:p.by_entity_id)||void 0===g?void 0:g[S],L,D),((null===(I=this._config)||void 0===I?void 0:I.filter_all)||L.has("all"))&&this._addSetValues(L,Object.keys(t.__stateObj.attributes)),((null===(N=this._config)||void 0===N?void 0:N.unfilter_all)||D.has("all"))&&this._addSetValues(D,Object.keys(t.__stateObj.attributes)),this._filters[S]={filter_attributes:Array.from(L.values()),unfilter_attributes:Array.from(D.values())},this._debug("finished the filters retrieval, printing the filters..."),this._debug(this._filters[S]),this._filters[S]},n.prototype.getVisibility=function(t,e,n){var o,i,r,s,a,l,c,u,_;if(this._debug("getting the visibility for ".concat(t)),this._visibility[t])return this._debug("the visibility for this entity have been found in memory, recovering visibility..."),this._debug(this._visibility[t]),this._visibility[t];var h={history:!1,logbook:!1,header_history_icon:!1};return this._anyVisbilityMatch(null===(o=this._config)||void 0===o?void 0:o.hide_history,t,n,e)&&(h.history=!0),this._anyVisbilityMatch(null===(i=this._config)||void 0===i?void 0:i.unhide_history,t,n,e)&&(h.history=!1),this._anyVisbilityMatch(null===(r=this._config)||void 0===r?void 0:r.hide_logbook,t,n,e)&&(h.logbook=!0),this._anyVisbilityMatch(null===(s=this._config)||void 0===s?void 0:s.unhide_logbook,t,n,e)&&(h.logbook=!1),this._anyVisbilityMatch(null===(a=this._config)||void 0===a?void 0:a.hide_header_history_icon,t,n,e)&&(h.header_history_icon=!0),this._anyVisbilityMatch(null===(l=this._config)||void 0===l?void 0:l.unhide_header_history_icon,t,n,e)&&(h.header_history_icon=!1),this._anyVisbilityMatch(null===(c=this._config)||void 0===c?void 0:c.hide_history_logbook,t,n,e)&&(h.history=!0,h.logbook=!0),this._anyVisbilityMatch(null===(u=this._config)||void 0===u?void 0:u.unhide_history_logbook,t,n,e)&&(h.history=!1,h.logbook=!1),this._visibility[t]={hide_history:h.history,hide_logbook:h.logbook,hide_header_history_icon:h.header_history_icon||!!(null===(_=this._config)||void 0===_?void 0:_.auto_hide_header_history_icon)&&h.history&&h.logbook},this._debug("finished the visibility retrieval, printing the visibility..."),this._debug(this._visibility[t]),this._visibility[t]},n}();window.customMoreInfo||(console.info("%c  ".concat("Custom-more-info","  \n%c  Version ").concat("1.0.0"," ").concat("Custom more-info for Home Assistant"),"color: gold; font-weight: bold; background: black","color: white; font-weight: bold; background: steelblue"),window.customMoreInfo=new yt)}();
