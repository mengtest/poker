'use strict';

var Animations = function() {

	this.offsetX = 0;
	this.offsetY = 0;
	this.widthBK = 0;
	this.heightBK = 0;

	this.publicCards = [];
	this.light;
}

Animations.prototype = {

	setPosParam:function(width, height, offsetX, offsetY) {
		this.widthBK = width;
		this.heightBK = height;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	},

	setPublicCard:function(lstPublicCard) {
		this.publicCards = lstPublicCard;
	},

	showPublicCard:function(lstIndex, lstKey, showBK) {
		if(lstIndex.length > this.publicCards.length)
		{
			return;
		}

		var nIndex = 0;
		var animationTime = 100;
		var that = this;
		var showAnimation = function (index, key, showBK) {
			var cardWidth = that.publicCards[index].width;
			if(showBK)
			{
				that.publicCards[index].loadTexture("cardBK", that.publicCards[index].frame);
				var tween = game.add.tween(that.publicCards[index]);
				tween.to({ width:0 }, animationTime, Phaser.Easing.Linear.None, true);
				tween.onComplete.add(function() {
					that.publicCards[index].loadTexture(key, that.publicCards[index].frame);
					var tween2 = game.add.tween(that.publicCards[index]);
					tween2.to({ width:cardWidth }, animationTime, Phaser.Easing.Linear.None, true);
					nIndex++;
					if(nIndex < lstIndex.length)
					{
						tween2.onComplete.add(function() {
							showAnimation(lstIndex[nIndex], lstKey[nIndex], showBK);
						}, that);
					}
				}, that);
			}
			else
			{
				that.publicCards[index].width = 0;
				that.publicCards[index].loadTexture(key, that.publicCards[index].frame);
				var tween = game.add.tween(that.publicCards[index]);
				tween.to({ width:cardWidth }, animationTime, Phaser.Easing.Linear.None, true);
				nIndex++;
				if(nIndex < lstIndex.length)
				{
					tween.onComplete.add(function() {
						showAnimation(lstIndex[nIndex], lstKey[nIndex], showBK);
					}, that);
				}
			}
		};

		showAnimation(lstIndex[nIndex], lstKey[nIndex], showBK);
	},

	setLight:function(light) {
		this.light = light;
	},

	showLight:function(targetX, targetY)
	{
		var animationTime = 500;
		var xOffset = this.offsetX;
		var yOffset = this.offsetY;
		var length = Math.sqrt((this.light.x - targetX) * (this.light.x - targetX) + (this.light.y - targetY) * (this.light.y - targetY));
		var angleFinal = Math.atan2((this.heightBK / 2 - targetY - yOffset), (targetX - this.widthBK / 2 - xOffset)) * 180 / 3.1415926;

		if(!this.light.visible)
		{
			this.light.visible = true;
			this.light.width = length;
			this.light.angle = -angleFinal;
		}
		else
		{
			var tween = game.add.tween(this.light);
			tween.to({ width:length, angle: -angleFinal }, animationTime, Phaser.Easing.Linear.None, true);
		}
	},

	//Demo
	demoShowPublicCard:function() {
		var publicCards = ["SA", "H2", "C3"];
		var lstCardID = [];
		var lstCardImage = [];
		for (var i = 0; i < publicCards.length; i++) {
			this.publicCards[i].visible = true;
			lstCardID.push(i);
			lstCardImage.push(publicCards[i]);
		}
		this.showPublicCard(lstCardID, lstCardImage, true);
	}
}
