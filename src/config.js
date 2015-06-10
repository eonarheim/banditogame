var Config = {
	PlayerSpeed: 300,
	PlayerRadius: 300,
	PlayerFireInterval: 300,
	PlayerHitInterval: 1000,
	Ammo: 6,
	ReloadTime: 1000,

    CactusWidth: 100,
    CactusHeight: 100,
	Cactii: [
		{
			width: 38*2,
			height: 64*3,
			anchory: .80
		},
		{
			width: 48*2,
			height: 64*3,
			anchory: .75
		},
		{
			width: 48*2,
			height: 32*2,
			anchory: .50
		}
	],
	
	BaddieWidth: 100,
    BaddieHeight: 100,
	BaddieSpeed: 300,
	BaddieChangeInterval: 1000,
	BaddieFireInterval: 100,
	BaddieClusterNumber: 3,
	BaddieTargetRadius: 200,

	BulletSize: 20,
	BulletSpeed: 550,
	PlayerBulletSpeed: 800
}