App({

    globalData: {},

    onLaunch: function() {
    	var deviceInfo = wx.getSystemInfoSync();
        
        // var deviceInfo = wx.getStorageSync('deviceInfo');
        // if (!deviceInfo) {
        //     deviceInfo = wx.getSystemInfoSync();
        //     wx.setStorageSync('deviceInfo', deviceInfo);
        // }
        this.globalData.deviceInfo = deviceInfo;
    }

})
