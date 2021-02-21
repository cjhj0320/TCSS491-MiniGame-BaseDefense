var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/background.png");
ASSET_MANAGER.queueDownload("./img/base.png");
ASSET_MANAGER.queueDownload("./img/gameTitle.png");
ASSET_MANAGER.queueDownload("./img/backgroundTitle.png");
ASSET_MANAGER.queueDownload("./img/wonGame.png");
ASSET_MANAGER.queueDownload("./img/lostGame.png");

ASSET_MANAGER.queueDownload("./img/ui/bar_bg.png");
ASSET_MANAGER.queueDownload("./img/ui/bar_border.png");
ASSET_MANAGER.queueDownload("./img/ui/bar_red.png");
ASSET_MANAGER.queueDownload("./img/ui/bar_yellow.png");
ASSET_MANAGER.queueDownload("./img/ui/bar_green.png");
ASSET_MANAGER.queueDownload("./img/ui/beige_bg.png");
ASSET_MANAGER.queueDownload("./img/ui/star_yellow.png");

ASSET_MANAGER.queueDownload("./img/ui/ui01.png");
ASSET_MANAGER.queueDownload("./img/ui/ui02.png");
ASSET_MANAGER.queueDownload("./img/ui/ui03.png");
ASSET_MANAGER.queueDownload("./img/ui/ui04.png");
ASSET_MANAGER.queueDownload("./img/ui/ui05.png");
ASSET_MANAGER.queueDownload("./img/ui/ui06.png");
ASSET_MANAGER.queueDownload("./img/ui/ui07.png");

ASSET_MANAGER.queueDownload("./img/unit/unit01.png");
ASSET_MANAGER.queueDownload("./img/unit/unit02.png");
ASSET_MANAGER.queueDownload("./img/unit/unit03.png");
ASSET_MANAGER.queueDownload("./img/unit/unit04.png");
ASSET_MANAGER.queueDownload("./img/unit/unit05.png");
ASSET_MANAGER.queueDownload("./img/unit/unit06.png");
ASSET_MANAGER.queueDownload("./img/unit/unit07.png");

ASSET_MANAGER.queueDownload("./music/backgroundMusic.mp3");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.start();
});
