window.onload=function(){
    imgLocation("container", "box");
    var imgData={"imgData":[{"src":"img/timg444.jpg"},{"src":"img/timg7867.jpg"},{"src":"img/timg8989.jpg"},{"src":"img/timg99.jpg"},{"src":"img/timg4545.jpg"},{"src":"img/timg6545.jpg"},{"src":"img/timg6565.jpg"},{"src":"img/timg787.jpg"}]}
    window.onscroll=function(){
       if (checkScroll()) {
          var cparent=document.getElementById("container");
          for (var i = 0; i < imgData.imgData.length; i++) {
              var newDiv=document.createElement("div");
              newDiv.className="box"
              cparent.appendChild(newDiv);
              var imgEle=document.createElement("img");
              imgEle.src=imgData.imgData[i].src;
              newDiv.appendChild(imgEle);
          }
          imgLocation("container", "box");
       } 
    }
}

function imgLocation(parentId,content){
    var parent=document.getElementById(parentId);
    var contentArray=getChildArr(parent, content);
    var imgWidth=contentArray[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/imgWidth);
    parent.style.cssText="width:"+cols*imgWidth+"px; margin:0px auto;";

    //完成瀑布流效果
    var boxHeight=[];
    for (var i = 0; i < contentArray.length; i++) {
        if (i<cols) {
            boxHeight[i]=contentArray[i].offsetHeight;
        }else{
            var minHeight=Math.min.apply(null, boxHeight);
            var minIndex=getIndex(minHeight, boxHeight);
            //这里一定要把定位设置为absolute,这样才能准确定位,因为每一个后面的元素位置都是计算得到的
            contentArray[i].style.position="absolute";
            contentArray[i].style.top=minHeight+"px";
            contentArray[i].style.left=contentArray[minIndex].offsetLeft+"px";
            boxHeight[minIndex]=boxHeight[minIndex]+contentArray[i].offsetHeight;
        }
    }
}

//得到符合条件的元素下标
function getIndex(height,array){
    for (var variable in array) {
        if (array[variable]==height) {
           return variable; 
        }
    }
}

//得到某一元素下的指定元素集合
function getChildArr(parentNode,content){
    var contentArray=new Array;
    var childArray=parentNode.getElementsByTagName("*");
    for (var i = 0; i < childArray.length; i++) {
       if (childArray[i].className==content) {
          contentArray.push(childArray[i]); 
       } 
    }
    return contentArray;
}

//检查滚动条是否到达了页面底部
function checkScroll(){
    var parent=document.getElementById("container");
    var childNodes=getChildArr(parent, "box");
    var lastNodeHeight=childNodes[childNodes.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    if (lastNodeHeight<scrollTop+pageHeight) {
       return true; 
    }
}