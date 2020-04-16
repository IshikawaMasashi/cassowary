!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ReactContexify=e():t.ReactContexify=e()}(window,(function(){return function(t){var e={};function r(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=5)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(3),n=r(4),o=function(){function t(){var t=s(arguments);this._terms=t.terms,this._constant=t.constant}return t.prototype.terms=function(){return this._terms},t.prototype.constant=function(){return this._constant},t.prototype.value=function(){for(var t=this._constant,e=0,r=this._terms.size();e<r;e++){var i=this._terms.itemAt(e);t+=i.first.value()*i.second}return t},t.prototype.plus=function(e){return new t(this,e)},t.prototype.minus=function(e){return new t(this,"number"==typeof e?-e:[-1,e])},t.prototype.multiply=function(e){return new t([e,this])},t.prototype.divide=function(e){return new t([1/e,this])},t.prototype.isConstant=function(){return 0==this._terms.size()},t.prototype.toString=function(){var t=this._terms.array.map((function(t){return t.second+"*"+t.first.toString()})).join(" + ");return this.isConstant()||0===this._constant||(t+=" + "),t+=this._constant},t}();function s(t){for(var e=0,r=function(){return 0},s=i.createMap(),a=0,c=t.length;a<c;++a){var u=t[a];if("number"==typeof u)e+=u;else if(u instanceof n.Variable)s.setDefault(u,r).second+=1;else if(u instanceof o){e+=u.constant();for(var p=0,f=(v=u.terms()).size();p<f;p++){var h=v.itemAt(p);s.setDefault(h.first,r).second+=h.second}}else{if(!(u instanceof Array))throw new Error("invalid Expression argument: "+u);if(2!==u.length)throw new Error("array must have length 2");var l=u[0],d=u[1];if("number"!=typeof l)throw new Error("array item 0 must be a number");if(d instanceof n.Variable)s.setDefault(d,r).second+=l;else{if(!(d instanceof o))throw new Error("array item 1 must be a variable or expression");e+=d.constant()*l;var v;for(p=0,f=(v=d.terms()).size();p<f;p++){h=v.itemAt(p);s.setDefault(h.first,r).second+=h.second*l}}}}return{terms:s,constant:e}}e.Expression=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){}return t.create=function(t,e,r,i){void 0===i&&(i=1);var n=0;return n+=1e6*Math.max(0,Math.min(1e3,t*i)),n+=1e3*Math.max(0,Math.min(1e3,e*i)),n+=Math.max(0,Math.min(1e3,r*i))},t.clip=function(e){return Math.max(0,Math.min(t.required,e))},t.required=t.create(1e3,1e3,1e3),t.strong=t.create(1,0,0),t.medium=t.create(0,1,0),t.weak=t.create(0,0,1),t}();e.Strength=i},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=r(1);!function(t){t[t.Le=0]="Le",t[t.Ge=1]="Ge",t[t.Eq=2]="Eq"}(e.Operator||(e.Operator={}));var o=function(){function t(t,e,r,o){void 0===o&&(o=n.Strength.required),this._id=s++,this._operator=e,this._strength=n.Strength.clip(o),void 0===r&&t instanceof i.Expression?this._expression=t:this._expression=t.minus(r)}return t.prototype.id=function(){return this._id},t.prototype.expression=function(){return this._expression},t.prototype.op=function(){return this._operator},t.prototype.strength=function(){return this._strength},t.prototype.toString=function(){return this._expression.toString()+" "+["<=",">=","="][this._operator]+" 0 ("+this._strength.toString()+")"},t}();e.Constraint=o;var s=0},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createMap=function(){return new i};var i=function(){function t(){this.index={},this.array=[]}return t.prototype.size=function(){return this.array.length},t.prototype.empty=function(){return 0===this.array.length},t.prototype.itemAt=function(t){return this.array[t]},t.prototype.contains=function(t){return void 0!==this.index[t.id()]},t.prototype.find=function(t){var e=this.index[t.id()];return void 0===e?void 0:this.array[e]},t.prototype.setDefault=function(t,e){var r=this.index[t.id()];if(void 0===r){var i=new n(t,e());return this.index[t.id()]=this.array.length,this.array.push(i),i}return this.array[r]},t.prototype.insert=function(t,e){var r=new n(t,e),i=this.index[t.id()];return void 0===i?(this.index[t.id()]=this.array.length,this.array.push(r)):this.array[i]=r,r},t.prototype.erase=function(t){var e=this.index[t.id()];if(void 0!==e){this.index[t.id()]=void 0;var r=this.array[e],i=this.array.pop();return r!==i&&(this.array[e]=i,this.index[i.first.id()]=e),r}},t.prototype.copy=function(){for(var e=new t,r=0;r<this.array.length;r++){var i=this.array[r].copy();e.array[r]=i,e.index[i.first.id()]=r}return e},t}(),n=function(){function t(t,e){this.first=t,this.second=e}return t.prototype.copy=function(){return new t(this.first,this.second)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=function(){function t(t){void 0===t&&(t=""),this._value=0,this._context=null,this._id=o++,this._name=t}return t.prototype.id=function(){return this._id},t.prototype.name=function(){return this._name},t.prototype.setName=function(t){this._name=t},t.prototype.context=function(){return this._context},t.prototype.setContext=function(t){this._context=t},t.prototype.value=function(){return this._value},t.prototype.setValue=function(t){this._value=t},t.prototype.plus=function(t){return new i.Expression(this,t)},t.prototype.minus=function(t){return new i.Expression(this,"number"==typeof t?-t:[-1,t])},t.prototype.multiply=function(t){return new i.Expression([t,this])},t.prototype.divide=function(t){return new i.Expression([1/t,this])},t.prototype.toJSON=function(){return{name:this._name,value:this._value}},t.prototype.toString=function(){return this._context+"["+this._name+":"+this._value+"]"},t}();e.Variable=n;var o=0},function(t,e,r){"use strict";function i(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}Object.defineProperty(e,"__esModule",{value:!0}),i(r(2)),i(r(0)),i(r(6)),i(r(1)),i(r(4))},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=r(2),o=r(0),s=r(3),a=r(1),c=function(){function t(){this._cnMap=s.createMap(),this._rowMap=s.createMap(),this._varMap=s.createMap(),this._editMap=s.createMap(),this._infeasibleRows=[],this._objective=new h,this._artificial=null,this._idTick=0}return t.prototype.createConstraint=function(t,e,r,i){void 0===i&&(i=a.Strength.required);var o=new n.Constraint(t,e,r,i);return this.addConstraint(o),o},t.prototype.addConstraint=function(t){if(void 0!==this._cnMap.find(t))throw new Error("duplicate constraint");var e=this._createRow(t),r=e.row,n=e.tag,o=this._chooseSubject(r,n);if(o.type()===i.Invalid&&r.allDummies()){if(!u(r.constant()))throw new Error("unsatisfiable constraint");o=n.marker}if(o.type()===i.Invalid){if(!this._addWithArtificialVariable(r))throw new Error("unsatisfiable constraint")}else r.solveFor(o),this._substitute(o,r),this._rowMap.insert(o,r);this._cnMap.insert(t,n),this._optimize(this._objective)},t.prototype.removeConstraint=function(t){var e=this._cnMap.erase(t);if(void 0===e)throw new Error("unknown constraint");this._removeConstraintEffects(t,e.second);var r=e.second.marker,n=this._rowMap.erase(r);if(void 0===n){var o=this._getMarkerLeavingSymbol(r);if(o.type()===i.Invalid)throw new Error("failed to find leaving row");(n=this._rowMap.erase(o)).second.solveForEx(o,r),this._substitute(r,n.second)}this._optimize(this._objective)},t.prototype.hasConstraint=function(t){return this._cnMap.contains(t)},t.prototype.addEditVariable=function(t,e){if(void 0!==this._editMap.find(t))throw new Error("duplicate edit variable");if((e=a.Strength.clip(e))===a.Strength.required)throw new Error("bad required strength");var r=new o.Expression(t),i=new n.Constraint(r,n.Operator.Eq,void 0,e);this.addConstraint(i);var s={tag:this._cnMap.find(i).second,constraint:i,constant:0};this._editMap.insert(t,s)},t.prototype.removeEditVariable=function(t){var e=this._editMap.erase(t);if(void 0===e)throw new Error("unknown edit variable");this.removeConstraint(e.second.constraint)},t.prototype.hasEditVariable=function(t){return this._editMap.contains(t)},t.prototype.suggestValue=function(t,e){var r=this._editMap.find(t);if(void 0===r)throw new Error("unknown edit variable");var n=this._rowMap,o=r.second,s=e-o.constant;o.constant=e;var a=o.tag.marker,c=n.find(a);if(void 0!==c)return c.second.add(-s)<0&&this._infeasibleRows.push(a),void this._dualOptimize();var u=o.tag.other;if(void 0!==(c=n.find(u)))return c.second.add(s)<0&&this._infeasibleRows.push(u),void this._dualOptimize();for(var p=0,f=n.size();p<f;++p){var h=n.itemAt(p),l=h.second,d=l.coefficientFor(a);0!==d&&l.add(s*d)<0&&h.first.type()!==i.External&&this._infeasibleRows.push(h.first)}this._dualOptimize()},t.prototype.updateVariables=function(){for(var t=this._varMap,e=this._rowMap,r=0,i=t.size();r<i;++r){var n=t.itemAt(r),o=e.find(n.second);void 0!==o?n.first.setValue(o.second.constant()):n.first.setValue(0)}},t.prototype._getVarSymbol=function(t){var e=this;return this._varMap.setDefault(t,(function(){return e._makeSymbol(i.External)})).second},t.prototype._createRow=function(t){for(var e=t.expression(),r=new h(e.constant()),o=e.terms(),s=0,c=o.size();s<c;++s){var p=o.itemAt(s);if(!u(p.second)){var l=this._getVarSymbol(p.first),d=this._rowMap.find(l);void 0!==d?r.insertRow(d.second,p.second):r.insertSymbol(l,p.second)}}var v=this._objective,y=t.strength(),_={marker:f,other:f};switch(t.op()){case n.Operator.Le:case n.Operator.Ge:var m=t.op()===n.Operator.Le?1:-1,b=this._makeSymbol(i.Slack);if(_.marker=b,r.insertSymbol(b,m),y<a.Strength.required){var w=this._makeSymbol(i.Error);_.other=w,r.insertSymbol(w,-m),v.insertSymbol(w,y)}break;case n.Operator.Eq:if(y<a.Strength.required){var M=this._makeSymbol(i.Error),S=this._makeSymbol(i.Error);_.marker=M,_.other=S,r.insertSymbol(M,-1),r.insertSymbol(S,1),v.insertSymbol(M,y),v.insertSymbol(S,y)}else{var g=this._makeSymbol(i.Dummy);_.marker=g,r.insertSymbol(g)}}return r.constant()<0&&r.reverseSign(),{row:r,tag:_}},t.prototype._chooseSubject=function(t,e){for(var r=t.cells(),n=0,o=r.size();n<o;++n){var s=r.itemAt(n);if(s.first.type()===i.External)return s.first}var a=e.marker.type();return(a===i.Slack||a===i.Error)&&t.coefficientFor(e.marker)<0?e.marker:((a=e.other.type())===i.Slack||a===i.Error)&&t.coefficientFor(e.other)<0?e.other:f},t.prototype._addWithArtificialVariable=function(t){var e=this._makeSymbol(i.Slack);this._rowMap.insert(e,t.copy()),this._artificial=t.copy(),this._optimize(this._artificial);var r=u(this._artificial.constant());this._artificial=null;var n=this._rowMap.erase(e);if(void 0!==n){var o=n.second;if(o.isConstant())return r;var s=this._anyPivotableSymbol(o);if(s.type()===i.Invalid)return!1;o.solveForEx(e,s),this._substitute(s,o),this._rowMap.insert(s,o)}for(var a=this._rowMap,c=0,p=a.size();c<p;++c)a.itemAt(c).second.removeSymbol(e);return this._objective.removeSymbol(e),r},t.prototype._substitute=function(t,e){for(var r=this._rowMap,n=0,o=r.size();n<o;++n){var s=r.itemAt(n);s.second.substitute(t,e),s.second.constant()<0&&s.first.type()!==i.External&&this._infeasibleRows.push(s.first)}this._objective.substitute(t,e),this._artificial&&this._artificial.substitute(t,e)},t.prototype._optimize=function(t){for(;;){var e=this._getEnteringSymbol(t);if(e.type()===i.Invalid)return;var r=this._getLeavingSymbol(e);if(r.type()===i.Invalid)throw new Error("the objective is unbounded");var n=this._rowMap.erase(r).second;n.solveForEx(r,e),this._substitute(e,n),this._rowMap.insert(e,n)}},t.prototype._dualOptimize=function(){for(var t=this._rowMap,e=this._infeasibleRows;0!==e.length;){var r=e.pop(),n=t.find(r);if(void 0!==n&&n.second.constant()<0){var o=this._getDualEnteringSymbol(n.second);if(o.type()===i.Invalid)throw new Error("dual optimize failed");var s=n.second;t.erase(r),s.solveForEx(r,o),this._substitute(o,s),t.insert(o,s)}}},t.prototype._getEnteringSymbol=function(t){for(var e=t.cells(),r=0,n=e.size();r<n;++r){var o=e.itemAt(r),s=o.first;if(o.second<0&&s.type()!==i.Dummy)return s}return f},t.prototype._getDualEnteringSymbol=function(t){for(var e=Number.MAX_VALUE,r=f,n=t.cells(),o=0,s=n.size();o<s;++o){var a=n.itemAt(o),c=a.first,u=a.second;if(u>0&&c.type()!==i.Dummy){var p=this._objective.coefficientFor(c)/u;p<e&&(e=p,r=c)}}return r},t.prototype._getLeavingSymbol=function(t){for(var e=Number.MAX_VALUE,r=f,n=this._rowMap,o=0,s=n.size();o<s;++o){var a=n.itemAt(o),c=a.first;if(c.type()!==i.External){var u=a.second,p=u.coefficientFor(t);if(p<0){var h=-u.constant()/p;h<e&&(e=h,r=c)}}}return r},t.prototype._getMarkerLeavingSymbol=function(t){for(var e=Number.MAX_VALUE,r=e,n=e,o=f,s=o,a=o,c=o,u=this._rowMap,p=0,h=u.size();p<h;++p){var l=u.itemAt(p),d=l.second,v=d.coefficientFor(t);if(0!==v){var y=l.first;if(y.type()===i.External)c=y;else if(v<0){(_=-d.constant()/v)<r&&(r=_,s=y)}else{var _;(_=d.constant()/v)<n&&(n=_,a=y)}}}return s!==o?s:a!==o?a:c},t.prototype._removeConstraintEffects=function(t,e){e.marker.type()===i.Error&&this._removeMarkerEffects(e.marker,t.strength()),e.other.type()===i.Error&&this._removeMarkerEffects(e.other,t.strength())},t.prototype._removeMarkerEffects=function(t,e){var r=this._rowMap.find(t);void 0!==r?this._objective.insertRow(r.second,-e):this._objective.insertSymbol(t,-e)},t.prototype._anyPivotableSymbol=function(t){for(var e=t.cells(),r=0,n=e.size();r<n;++r){var o=e.itemAt(r),s=o.first.type();if(s===i.Slack||s===i.Error)return o.first}return f},t.prototype._makeSymbol=function(t){return new p(t,this._idTick++)},t}();function u(t){return t<0?-t<1e-8:t<1e-8}e.Solver=c,function(t){t[t.Invalid=0]="Invalid",t[t.External=1]="External",t[t.Slack=2]="Slack",t[t.Error=3]="Error",t[t.Dummy=4]="Dummy"}(i||(i={}));var p=function(){function t(t,e){this._id=e,this._type=t}return t.prototype.id=function(){return this._id},t.prototype.type=function(){return this._type},t}(),f=new p(i.Invalid,-1),h=function(){function t(t){void 0===t&&(t=0),this._cellMap=s.createMap(),this._constant=t}return t.prototype.cells=function(){return this._cellMap},t.prototype.constant=function(){return this._constant},t.prototype.isConstant=function(){return this._cellMap.empty()},t.prototype.allDummies=function(){for(var t=this._cellMap,e=0,r=t.size();e<r;++e){if(t.itemAt(e).first.type()!==i.Dummy)return!1}return!0},t.prototype.copy=function(){var e=new t(this._constant);return e._cellMap=this._cellMap.copy(),e},t.prototype.add=function(t){return this._constant+=t},t.prototype.insertSymbol=function(t,e){void 0===e&&(e=1),u(this._cellMap.setDefault(t,(function(){return 0})).second+=e)&&this._cellMap.erase(t)},t.prototype.insertRow=function(t,e){void 0===e&&(e=1),this._constant+=t._constant*e;for(var r=t._cellMap,i=0,n=r.size();i<n;++i){var o=r.itemAt(i);this.insertSymbol(o.first,o.second*e)}},t.prototype.removeSymbol=function(t){this._cellMap.erase(t)},t.prototype.reverseSign=function(){this._constant=-this._constant;for(var t=this._cellMap,e=0,r=t.size();e<r;++e){var i=t.itemAt(e);i.second=-i.second}},t.prototype.solveFor=function(t){var e=this._cellMap,r=-1/e.erase(t).second;this._constant*=r;for(var i=0,n=e.size();i<n;++i)e.itemAt(i).second*=r},t.prototype.solveForEx=function(t,e){this.insertSymbol(t,-1),this.solveFor(e)},t.prototype.coefficientFor=function(t){var e=this._cellMap.find(t);return void 0!==e?e.second:0},t.prototype.substitute=function(t,e){var r=this._cellMap.erase(t);void 0!==r&&this.insertRow(e,r.second)},t}()}])}));
//# sourceMappingURL=ReactContexify.js.map