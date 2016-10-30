   /*
   * 发布订阅模式:
   *    绑定事件 on
   *    移除事件 removeListener
   *    触发事件 emit
   *  ->一对多的关系,当一个事情发生时可以让所有绑定的方法同时触发
   * */


function Girl(){
    //var flag=true;
    this._events={};//创建一个存放对应关系的盒子
}
Girl.prototype.on= function (eventName, callback) {
    //制作一对多的对应关系
    //{"有钱":["buyCar","buyPack"]}
    //1.第一次获取对象时没有对应的函数数组,创建数组将函数放入
    //2.如果有数组,将此次方法放到数组中
    if(this._events[eventName]){
        //找到同名的将方法push对应的盒子中
        this._events[eventName].push(callback);
    }else{
        //第一次创建一个盒子,用来存放一一对应的关系
        this._events[eventName]=[callback];
    }

};
Girl.prototype.emit= function (eventName) {
    //拿到对应的方法的数组依次执行
    //除了第一项的eventName都是需要传进来后执行的函数,获取参数列表,不包括第一个
    //var newA=[].slice.call(arguments,1);
    var newA=Array.from(arguments).slice(1);//转化成数组在截取第一项后面的所有参数
    //var that=this;
    this._events[eventName].forEach((item)=>{
        item.apply(this,newA);//箭头函数中是没有this指向，所以this指代的是上级this
});

};
Girl.prototype.removeListener= function (eventName, callback) {
  //filter方法
    if(this._events[eventName]){
        this._events[eventName]= this._events[eventName].filter(function(item,index){
            //console.log(arguments);
            return item!=callback;
        })
    }
    //console.log(this._events);
};

Girl.prototype.once=function(eventName, callback){
    var flag=true;
    if(this._events[eventName]){
        this._events[eventName].forEach(function (item,index) {
            if(item==callback){
                flag=false;
            }
            if(!flag){
                return;
            }
        })
    }else{
        this._events[eventName]=[callback];
    }
};
var girl=new Girl;
function buyPack(who,other){ console.log(who+"买包"+other);}
function buyCar(who,other){ console.log(who+"买v"+other);}
  //girl.on("有钱",buyPack);
  girl.once("有钱",buyPack);//先绑定,绑定后执行,执行后删除这个事件,再次执行则不会被触发
  girl.once("有钱",buyPack);//先绑定,绑定后执行,执行后删除这个事件,再次执行则不会被触发
  girl.once("有钱",buyPack);//先绑定,绑定后执行,执行后删除这个事件,再次执行则不会被触发
  girl.once("有钱",buyPack);//先绑定,绑定后执行,执行后删除这个事件,再次执行则不会被触发
  //girl.on("有钱",buyCar);
  girl.removeListener("有钱",buyCar);
  girl.emit("有钱","123","给别人");
  //girl.emit("有钱","123","给别人");




/*
* var a= function (c, d) {
 return c+d
 };
 let a=(c,d)=>c+d;//这里没有{}.可以不写return.要是有{}必须学return
*
* */






