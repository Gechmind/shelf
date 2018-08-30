Page({
	"data":{
		"imgLen":0,
		"temImgArr":[{
			"id":9787544722278,
			"link":"127.0.0.1:8080/image/9787544722278",
		},{
			"id":9787115433145,
			"link":"127.0.0.1:8080/image/9787115433145"
		},{
			"id":9787111532644,
			"link":"127.0.0.1:8080/image/9787111532644"
		}]
	},
	onImageLoad: function (e) {
		let temResImgArr = this.data.temImgArr
		let imgLen = 0
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width;         //图片原始宽度
        let oImgH = e.detail.height;        //图片原始高度
        let imgWidth = (this.data.winWidth - 20) * 0.48;
        let scale = imgWidth / oImgW;        //比例计算
        let imgHeight = scale * oImgH;
        let imgObj = {
            id: imageId,
            width: imgWidth,
            height: imgHeight
        };
        imgLen++;
        for (let i = 0; i < temResImgArr.length; i++) {
            if (temResImgArr[i].id == imageId) {
                temResImgArr[i].width = imgWidth;
                temResImgArr[i].height = imgHeight;
                break;
            }
        }
        if (imgLen == temResImgArr.length) {//图片遍历完
            this.waterFall();
        }

    },
    onImageError: function (e) {
        imgLen++;
    },
    waterFall: function () {
        for (let i = 0; i < temResImgArr.length; i++) {
            if (heightArr.length < 2 && i < 2) {
                heightArr.push(temResImgArr[i].height + 10);
            } else {
                let minH = Math.min.apply(null, heightArr);
                let index = heightArr.indexOf(minH);
                temResImgArr[i].top = `${minH}`;
                temResImgArr[i].left = `${360 * index}rpx`;
                heightArr[index] += (temResImgArr[i].height + 10);
            }
        }
        let maxH = Math.max.apply(null, heightArr);
        let temp = this.data.imgArr;
        temp.push(...temResImgArr);
        this.setData({
            imgArr: temp,
            viewHeight: maxH,
            temImgArr: []
        });
        //重置数据。
        temResImgArr = [];
        imgLen = 0;
        wx.hideToast();
    }
})