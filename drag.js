// JavaScript Document

   var _$ = function(id){
    return document.getElementById(id);
   }
   function bindEvent(node,eventType,callback){
    if(node.attachEvent){
     if(eventType.indexOf('on')){eventType = 'on' + eventType}
     node.attachEvent(eventType,callback);
    }
    else{
     if(!eventType.indexOf('on')){
       eventType = eventType.substring(2,eventType.length)
      }
      node.addEventListener(eventType,callback,false);
    }
    return callback;
   }
   function removeEvent(node,eventType,callback){
    if(node.detachEvent){
     if(eventType.indexOf('on')){eventType = 'on' + eventType}
     node.detachEvent(eventType,callback);
    }
    else{
      if(!eventType.indexOf('on')){
       eventType = eventType.substring(2,eventType.length);
      }
      node.removeEventListener(eventType,callback,false);
    }
   }
   
   //创建接口
   function __drag(dragger){
    var drag = bindEvent(dragger,'onmousedown',function(e){
    e = e || event;
    var mouseX = e.clientX || e.pageX;
    var mouseY = e.clientY || e.pageY;
    var objStyle = dragger.currentStyle || window.getComputedStyle(dragger,null);
    var objX = parseInt(objStyle.left) || 0;
    var objY = parseInt(objStyle.top) || 0;
    var limitX = mouseX - objX ;
    var limitY = mouseY - objY ;
    var screenbodyw = document.body.clientWidth - 920;
    var screenbodyh = document.body.clientHeight - 281.11;

    if(!dragger.onDrag){
     dragger.onDrag = bindEvent(document,'onmousemove',function(e){
      
      e = e || event;
      dragger.style.left = (e.clientX || e.pageX) - limitX + 'px';
      dragger.style.top = (e.clientY || e.pageY) - limitY + 'px';
      if(parseInt(dragger.style.left)<0){
                  dragger.style.left=0+"px";     
            }
            if(parseInt(dragger.style.left)>screenbodyw){
                  dragger.style.left=screenbodyw+"px";
            }
            if(parseInt(dragger.style.top)>screenbodyh){
                  dragger.style.top=screenbodyh+"px";                 
            }
            if(parseInt(dragger.style.top)<0){
                  dragger.style.top=0+"px";                    
            }      
     });
     dragger.onDragEnd = bindEvent(document,'onmouseup',function(){
    
      removeEvent(document,'onmousemove',dragger.onDrag);
      removeEvent(document,'onmouseup',dragger.onDragEnd);
      try{
       delete dragger.onDrag;
       delete dragger.onDragEnd;
      }catch(e){
       dragger.removeAttribute('onDrag');
       dragger.removeAttribute('onDragEnd');
      }
      
     })
    }
    })
   }
   
    