CodeMirror.multiplexingMode=function(b){var d=Array.prototype.slice.call(arguments,1);
var a=d.length;
function c(f,g,h){if(typeof g=="string"){return f.indexOf(g,h)
}var e=g.exec(h?f.slice(h):f);
return e?e.index+h:-1
}return{startState:function(){return{outer:CodeMirror.startState(b),innerActive:null,inner:null}
},copyState:function(e){return{outer:CodeMirror.copyState(b,e.outer),innerActive:e.innerActive,inner:e.innerActive&&CodeMirror.copyState(e.innerActive.mode,e.inner)}
},token:function(o,e){if(!e.innerActive){var g=Infinity,l=o.string;
for(var h=0;
h<a;
++h){var k=d[h];
var p=c(l,k.open,o.pos);
if(p==o.pos){o.match(k.open);
e.innerActive=k;
e.inner=CodeMirror.startState(k.mode,b.indent?b.indent(e.outer,""):0);
return k.delimStyle
}else{if(p!=-1&&p<g){g=p
}}}if(g!=Infinity){o.string=l.slice(0,g)
}var f=b.token(o,e.outer);
if(g!=Infinity){o.string=l
}return f
}else{var j=e.innerActive,l=o.string;
var p=c(l,j.close,o.pos);
if(p==o.pos){o.match(j.close);
e.innerActive=e.inner=null;
return j.delimStyle
}if(p>-1){o.string=l.slice(0,p)
}var n=j.mode.token(o,e.inner);
if(p>-1){o.string=l
}var m=o.current(),p=m.indexOf(j.close);
if(p>-1){o.backUp(m.length-p)
}return n
}},indent:function(f,e){var g=f.innerActive?f.innerActive.mode:b;
if(!g.indent){return CodeMirror.Pass
}return g.indent(f.innerActive?f.inner:f.outer,e)
},electricChars:b.electricChars,innerMode:function(e){return e.inner?{state:e.inner,mode:e.innerActive.mode}:{state:e.outer,mode:b}
}}
};