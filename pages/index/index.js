var Util = require("../../common/util.js"),
    App = getApp(),
    deviceInfo = App.globalData.deviceInfo;

Page({

    data: {
        latitude: '39.90403',
        longitude: '116.407526',
        controls: [{
            iconPath: '/resources/pin.png',
            position: {
                left: deviceInfo.windowWidth / 2 - 10,
                top: (deviceInfo.windowHeight - 44) / 2 - 28,
                width: 20,
                height: 28
            }
        }, {
            id: 1,
            iconPath: '/resources/center.png',
            position: {
                left: 30,
                top: deviceInfo.windowHeight - 60,
                width: 30,
                height: 30
            },
            clickable: true
        }],
        markers: []
    },

    points: [],
    mapCtx: null,

    onLoad: function() {
        wx.getLocation({
            type: 'gcj02',
            success: Util.proxy(this.handleLocationSucc, this),
            fail: function(){}
        });
        this.mapCtx = wx.createMapContext('map');
    },

    handleLocationSucc: function(response) {
        this.setData({
            latitude: response.latitude,
            longitude: response.longitude,
        });
    },

    handleControlTap: function(event) {
        if (event.controlId == 1) {
            this.mapCtx.moveToLocation();
        }
    },

    handlePostBtnClick: function() {
        wx.navigateTo({
            url: "/pages/postinfo/postinfo"
        });
    },

    onShow: function() {
        wx.request({
            url: 'https://nuanwan.wekeji.cn/nuanwan/index.php/trade/get_list', 
            header: {'content-type': 'application/json'},
            success: Util.proxy(this.handleGetDataSucc, this)
        })
    },

    handleGetDataSucc: function(res) {
        var data = res.data,
            markers = [];
        
        this.points = data;

        for (var i = 0; i < data.length; i++) {
            var item = data[i],
                imgName = item.type == "sell_fish" ? "sell_fish_icon" : "buy_fish_icon";
            markers.push({
                id: i,
                iconPath: "/resources/" + imgName + ".png",
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
                width: 30,
                height: 30
            });
        }

        this.setData({markers: markers});
    },

    handleMarkerTap: function(event) {
        var markerId = event.markerId,
            pointInfo = this.points[markerId];

        wx.navigateTo({
            url: "/pages/viewinfo/viewinfo?id=" + pointInfo.id
        }); 
    },

    onShareAppMessage: function () {
        return {
            title: '暖湾鱼友圈，三湖鱼友交易利器',
            path: '/pages/index/index',
            success: function(res) {},
            fail: function(res) {}
        }
    }

})
