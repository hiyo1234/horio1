phina.globalize();

//判定部マーカ
phina.define('UnitIcon', {
  superClass: 'phina.display.CircleShape',

  init: function() {
    this.superInit({
      radius: MARKER_RADIUS,
      strokeWidth: MARKER_STROKE_WIDTH,
      stroke: "red",
      fill: false,
    });
    this.setInteractive(true);
  },

  //エフェクト発火関数
  fireEffect: function() {
    EffectWave().addChildTo(this);
  },
});


//判定エフェクト
phina.define('EffectWave', {
  superClass: 'phina.display.CircleShape',

  init: function() {
    this.superInit({
      radius: MARKER_RADIUS,
      stroke: false,
      fill: "white",
    });

    this.tweener
    .to({scaleX:1.7, scaleY:1.7, alpha:0}, 250)
    .call(function() {
      this.remove();
    }, this);
  },
});


//ノーツ
phina.define('TargetMarker', {

  init: function(targetTime, scene, direction) {
    this.group = DisplayElement().addChildTo(scene);
    this.marker = CircleShape({
      radius: MARKER_RADIUS,
      strokeWidth: MARKER_STROKE_WIDTH,
      stroke: "red",
      fill: "white",
    }).addChildTo(this.group);
    this.arrow = Arrow(direction).group.addChildTo(this.group);

    this.group.visible = false;
    this.group.scaleX = this.scaleY = 0;
    this.group.isAwake = true;
    this.group.targetTime = targetTime;
    this.group.vector = phina.geom.Vector2(0, 1);
  },
});


//矢印オブジェクト
phina.define("Arrow", {
  //direction 0:上向き, 1:下向き
  init: function(direction) {
    if(direction !== 1 && direction !== 0) direction = 1;
    this.group = DisplayElement();
    this.triangle = TriangleShape({
        fill: 'red',
        strokeWidth: 0,
        radius: 45
    }).addChildTo(this.group).setPosition(0, 0);
    this.rectangle = RectangleShape({
      width: 25,
      height: 70,
      fill: 'red',
      strokeWidth: 0,
    }).addChildTo(this.group).setPosition(0,30);
    this.group.setRotation(180 * direction);
    if(direction)
      this.group.setPosition(0, 12);
    else
      this.group.setPosition(0, -12);
  },
});


//文字エフェクト
phina.define('RateLabel', {
  superClass: 'phina.display.Label',

  init: function(textParam) {
    this.superInit({
      text: textParam.text,
      fontSize: 60,
      strokeWidth: 8,
      fill: "pink",
      stroke: "white",
    });

    this.tweener
    .set({scaleX: 0.2, scaleY: 0.2, alpha: 0})
    .to({scaleX:1, scaleY:1, alpha:1}, 130, "easeOutCirc")
    .wait(250)
    .to({alpha:0}, 100)
    .call(function() {
      this.remove();
    }, this);
  },
});

//スコア詳細
phina.define('ScoreView', {

  init: function(title, score) {
    this.group = DisplayElement();
    this.label1 = Label({
      text: title,
      // text: params.perfect_times,
      fontSize: 40,
      fill: 'cyan',
    }).addChildTo(this.group).setPosition(0, 0);
    this.label2 = Label({
      text: score,
      // text: params.perfect_times,
      fontSize: 40,
      fill: 'white',
    }).addChildTo(this.group).setPosition(150, 0);
    // Label({
    //   text: score,
    //   // text: params.perfect_times,
    //   fontSize: 60,
    //   fill: 'red',
    // }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  },
});