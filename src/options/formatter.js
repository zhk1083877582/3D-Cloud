const FM = {
   // 物业类型
   propertyType:[
     {key:'1',value:"住宅"},
     {key:'2',value:"别墅"},
     {key:'3',value:"商铺"},
     {key:'4',value:"写字楼"},
     {key:'5',value:"酒店式公寓"},
     {key:'6',value:"车位"},
     {key:'7',value:"动迁房"},
     {key:'8',value:"其他"},
     {key:'9',value:"洋房"},
     {key:'10',value:"公寓"},
   ],
   propertyType2:[
    {key:'1',value:"住宅"},
    {key:'2',value:"别墅"},
    {key:'3',value:"商铺"},
    {key:'4',value:"写字楼"},
    {key:'5',value:"酒店式公寓"},

    {key:'9',value:"洋房"},
    {key:'10',value:"公寓"},
  ],
   salesStatus:[
    {key:'1',value:['待售','#3BD0A0']},
    {key:'2',value:['在售','#FF8353']},
    {key:'3',value:['售罄','#C7CBD3']},
    {key:'4',value:['在租','#F6B638']},
   ],
   decorationStatus:[
    {key:'0',value:"毛坯"},
    {key:'1',value:"简单装修"},
    {key:'2',value:"中等装修"},
    {key:'3',value:"精装修"},
    {key:'4',value:"豪华装修"}
   ],
   decorationStatus2:[
    {key:'0',value:"毛坯"},
    {key:'5',value:"带装修"}
   ],

   oriented:[
    {key:'1',value:"正南"},
    {key:'2',value:"正北"},
    {key:'3',value:"正东"},
    {key:'4',value:"正西"},
    {key:'5',value:"东南"},
    {key:'6',value:"西南"},
    {key:'7',value:"东北"},
    {key:'8',value:"西北"},
   ]
  };
  const Formatter = function () {
    this.cache = FM;
  };
  Formatter.prototype.switchName = function (name, key) { //字段格式化查询
    let formatter = this.cache[name];
    return this.switchFormatter(formatter, key);
  };
  Formatter.prototype.switchFormatter = function (formatter, key) { //字段格式化查询
    if (!formatter) return key;
    if (formatter && formatter.length <= 0) return key;
    //let reg = new RegExp(String(key));
    for (let i = 0; i < formatter.length; i++) {
      if (String(key) === String(formatter[i].key)) {
        return formatter[i].value;
      }
    }
    return key;
  };
  Formatter.prototype.formatArea = function(min,max){ //建面格式化
    if(min==null && max==null){
      return '建面待定'
    }else{
        if(min==null){
            return `建面约${max}㎡`
        }else if(max==null){
            return `建面约${min}㎡`
        }else{
            return `建面${min}-${max}㎡`
        }
    }
  };
  Formatter.prototype.formatTotalPrice = function(min,max){ //总价格式化
    if(min==null && max==null){
      return '总价待定'
    }else{
        if(min==null){
            return `总价约${max}万`
        }else if(max==null){
            return `总价约${min}万`
        }else{
            return `总价${min}-${max}万`
        }
    }
  };
  Formatter.prototype.AveragePrice = function(type,min){ //均价格式化
    if(min==null){
      return '均价待定'
    }else{
        if(type==1){
            return `${min}元/㎡`
        }else {
            return `${min}元/㎡起`
        }
    }
  };
  export default new Formatter();