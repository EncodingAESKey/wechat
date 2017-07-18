var Util = require("../../common/util.js");

Page({

    sending: false,

    data: {
        success: false,
        address: "点击选择，要勾选哦～",
        message: "",
        contact: "",
        type: "sell_fish",
        longitude: '',
        latitude: '',
        items: [
            { name: '求购', value: 'buy_fish' },
            { name: '转让', value: 'sell_fish', checked: true },
        ]
    },

    handleGetPosition: function() {
        var this_ = this;
        wx.chooseLocation({
            success: Util.proxy(this.handleGetLocationSucc, this)
        })
    },

    handleGetLocationSucc: function(res) {
        for (var i in res) {
            console.log(i);
            console.log(res[i]);
        }


        if (res.longitude) {
            res.longitude = (+res.longitude).toFixed(4);
            res.latitude = (+res.latitude).toFixed(4);

            this.locationInfo_ = {
                address: res.name || "已获取到您的定位坐标",
                longitude: res.longitude,
                latitude: res.latitude
            };

            wx.request({
                url: 'https://nuanwan.wekeji.cn/nuanwan/index.php/trade/check_location_valid', 
                method: 'post',
                data: {
                    longitude: res.longitude,
                    latitude: res.latitude
                },
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success: Util.proxy(this.handleGetValidSuccess, this)
            });
        }
    },

    handleGetValidSuccess: function(response) {
        if (response.data && response.data.ret) {
            this.setData(this.locationInfo_);
        }else {
            wx.showModal({
              title: '提示',
              content: '您选择的位置已被他人占用，请选择一个临近的位置作为替代。',
              success: function(res) {}
            })
        }
    },

    handleRadioChange: function(event) {
        this.setData({type: event.detail.value})
    },

    handleMessageChange: function(event) {
        this.setData({message: event.detail.value})
    },

    handleContactChange: function(event) {
        this.setData({contact: event.detail.value})
    },

    handlePostTap: function(){;
        if (this.data.address == "点击选择，要勾选哦～") {
            wx.showToast({title: "请选择您的地址"});
            return;
        }
        if (!this.data.message) {
            wx.showToast({title: "请填写说明信息"});
            return;
        }
        if (!this.data.contact) {
            wx.showToast({title: "请填写联系信息"});
            return;
        }
        this.sendAddItemRequset();
    },

    sendAddItemRequset: function() {
        if (this.sending) {
            return;
        }

        this.sending = true;

        var postData = {
            address: (this.data.address == "已获取到您的定位坐标") ? "": this.data.address,
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            message: this.data.message,
            contact: this.data.contact,
            type: this.data.type
        };

        wx.request({
            url: 'https://nuanwan.wekeji.cn/nuanwan/index.php/trade/add_item', 
            method: 'post',
            data: postData,
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: Util.proxy(this.handleAddItemSucc, this)
        })
    },

    handleAddItemSucc: function(res) {
        this.sending = false;
        this.setData({success: true});
    },

    handleBackHome: function() {
       wx.navigateBack({delta: 1})
    }

})
