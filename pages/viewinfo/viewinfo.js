var Util = require("../../common/util.js");

Page({

    data:{
    	address: '',
    	contact: '',
    	latitude: '',
    	longitude: '',
    	message: '',
    	type: 'buy_fish',
        textType: ''
    },

    onLoad: function(params){
        var id = params.id;
        wx.request({
            url: 'https://nuanwan.wekeji.cn/nuanwan/index.php/trade/get_item', 
            method: 'post',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            data:{id: id},
            success: Util.proxy(this.handleGetDataSucc, this)
        })
    },

    handleGetDataSucc: function(response) {
        response = response.data;
        if (response.ret) {
            var data = response.data;
            data.textType = data.type == 'buy_fish' ? "求购" : '转让';
            this.setData(data);
        }
    }

})
