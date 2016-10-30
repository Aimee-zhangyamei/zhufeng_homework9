function Girl(){
    this._events={};
};
Girl.prototype.on=function(eventName,callBack){
    if(this._events[eventName]){
        this._events[eventName].push(callBack);
    }else{
        this._events[eventName]=[callBack];
    }
};
Girl.prototype.emit=function(eventName){
    if(this._events[eventName]){
        var newAry=Array.from(arguments).slice(1);
        this._events[eventName].forEach((item)=>{
            item.apply(this,newAry);
        });
    }
};
Girl.prototype.removeListener=function(eventName,callBack){
    if(this._events[eventName]){
        this._events[eventName]=this._events[eventName].filter(function(item){
            return item!=callBack;
        });
    }
};
Girl.prototype.once=function(eventName,callBack){
    var that=true;
    if(this._events[eventName]){
        this._events[eventName].forEach(function(item){
            if(item==callBack){
                that=false;
            }
        });
        if(!that){
            return;
        }
        this._events[eventName].push(callBack);
    }else{
        this._events[eventName]=[callBack];
    }
    if(callBack){
        callBack();
    }
};
var girl=new Girl();
function buyPack(who,other){console.log("buyPack");}
function buyCar(who,other){console.log("buyCar");}
girl.once("有钱",buyPack);
girl.once("有钱",buyPack);
girl.once("有钱",buyPack);
girl.once("有钱",buyPack);



