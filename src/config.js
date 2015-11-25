var Config = {
	PlayerSpeed: 300/2,
	PlayerRadius: 300,
	PlayerFireInterval: 300,
	PlayerHitInterval: 1000,
	Ammo: 6,
	ReloadTime: 1000,
	
	CameraElasticity: .01,
	CameraFriction: .21,
	CameraShake: 7,
	CameraShakeDuration: 800,

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
	BaddieSpeed: 300/4,
	BaddieMinMoveTime: 500,
	BaddieMaxMoveTime: 2000,
	BaddieChangeInterval: 1000,
	BaddieFireInterval: 100,
	BaddieClusterNumber: 3,
	BaddieTargetRadius: 200/4,

	BulletSize: 10,
	BulletSpeed: 550/4,
	BulletLifetime: 20000,
	PlayerBulletSpeed: 800/4
}