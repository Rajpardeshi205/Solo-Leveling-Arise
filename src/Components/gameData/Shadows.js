export const ShadowArmy = {
  Blades: {
    id: 1,
    name: "Blades",
    nickname: "Cold-Blooded Figher",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/d1484593cb8c4a958038959f7fc6d991.webp",
    weaponName: "Baruka's Dagger : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/b0d28b028e0d44348c8328cdb5f30803.webp",
    weaponEffect: "The Shadow's Attack Increases by 5% And Their Defense Penetration Increases by 5%.",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/bdf782753dc24dfaba204c8b0a79e2a5.webp", description: `The user attacks by performing two large left and right swings with a dagger.

Damage: 150-300.12% of the user's Attack`},
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/20dfbb8aff0b49748c168c9720580543.webp", description: `The user gathers energy into the daggers in both hands and attacks by performing a large slash to the front.

Damage: 164.35-328.83% of the user's Attack`},
        { name: "Moonlight Dancing", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/235d9ed7580e4dd695a7c566af7d45f8.webp", description: `After gathering their power, the user attacks by performing a zigzag circular spinning slash towards the front.

Damage: 316.01-632.27% of the user's Attack` },
        { name: "Frost Gazer", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/7a011fd51b2248faa993f54a47e56c92.webp", description: `The user gathers the power of coldness into a sword, plunges it into the ground, and then attacks by unleashing a blast of coldness to where the enemy is located.

Damage: 353.75-707.78% of the user's Attack` },
        { name: "Spinning Strike", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/3b5df30b223642758d1995eec622debb.webp", description: `The user gathers their power and creates a circle of sword energy around themselves, then propels it forward in a straight line to attack enemies within the range of the effect.

Damage: 293.75-587.74% of the user's Attack
・When using this skill, applies the [Attack Increase] effect.

[Attack Increase] 
Increases the user's Attack by 100%.
Duration: 10 second(s).`},
        { name: "Silent Slash", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/efb0c2e637214c30bdbfa52cd17c40a1.webp", description: `The user hides in the fog and disappears before reappearing above the enemy and slashing down.

Damage: 392.5-785.31% of the user's Attack

・When using this skill, applies the [Critical Hit Rate Increase] effect.

[Critical Hit Rate Increase] 

Increases the user's Critical Hit Rate by 50%.
Duration: 10 second(s).`}
      ],
      special: { name: "Silent Strike", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/a97c822b4a7d40f48f0b286c766e3490.webp", description: `The user hides and throws a dagger into the air. The user then teleports behind the enemy to strike them down.

Damage: 444.44-889.24% of the user's Attack
・When the final hit lands, it [Stuns] the target.

[Stun] 
This skill immobilizes the target.
Duration: 1 second(s)`}
    },
    authority: "All team members' Attack increases by 7%",
    rank:"General",
  },

  Kaisel: {
    id: 2,
    name: "Kaisel",
    nickname: "Wyvern",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/386d89bf8c724405a699242cd665634f.webp",
    weaponName: "Skadi : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/9ca890f0cb124c0fba47c5ce7644d2df.webp",
    weaponEffect: "The Shadow's Critical Hit Damage Increases by 16% And Their Damage To Bosses Increases by 20%.",
    skills: {
      basic: [
        { name: "Breath Of The White Flames", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/6283dfb4897141488915d39e70a16748.webp", description: `The user exhales a powerful jet of flame toward the front.

Damage: 657-1314.53% of the user's Attack` },
        { name: "Rage Of The White Flames", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/1f3a1df84591452fa911b07e4e189662.webp", description: `The user exhales heat towards the sky to change the weather, causing lightning to strike nearby.

Damage: 600-1200.48% of the user's Attack`},
        { name: "Wave Of The White Flames", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/ab89a384a2394719aadc1dfab2f4d970.webp", description: `The user flies into the air and exhales globs of fire towards the ground.

Damage: 825-1650.66% of the user's Attack` },
        { name: "Roar Of The Heavens", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/ffd924d112db4095968fe3882f5a9f34.webp", description: `The user flies into the air, moves near enemies, and then slams them with its body.

Damage: 782.25-1565.13% of the user's Attack` },
        { name: "Flight Of The Wyvern", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/e561b8ed95c042d49d76e535dab19d4c.webp", description: `The user flies gracefully forward, exhaling fire and hurtling meteors towards the ground.

Damage: 665.25-1331.03% of the user's Attack
・When the user uses this skill, it activates the [Speed Increase] effect.

[Speed Increase] 
Increases Speed by 10%.
Duration: 20 second(s)` },
        { name: "Wrath Of The Wyvern", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/461bba6b1c4440e4b566855b522ccfd8.webp", description: `After gathering energy, the user releases a roar and attacks enemies within range.

Damage: 665.25-1331.03% of the user's Attack
・When the user uses this skill, it activates the [Speed Increase] effect.

[Attack Increase] 
Increases the user's Attack by 100%.
Duration: 10 second(s)` }
      ],
      special: { name: "Rage Of The Wyvern", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/9a1fd79d2b2c425ebb209d63d6a9f103.webp", description: `The user soars into the air and launches a damage-dealing meteor at nearby enemies.

Damage: 854.18-1709.04% of the user's Attack`}
    },
    authority: "All team members' Ultomate Skill Damage increases by 9%",
    rank:"General",
  },

  Cerbie: {
    id: 3,
    name: "Cerberus (Cerbie)",
    nickname: "The Gatekeeper",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/833ef2bf606a41138808c286b6343541.webp",
    weaponName: "Lycan Slayer : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/5a2772041e8e4a7b95176ac42673357b.webp",
    weaponEffect: "When Cerbie Hits A Target With The [Combustion] Effect Applied His Skill Damage Increases by 40% for 10 second(s).",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/7b7efceca6b544ae977e6d7f0438d233.webp", description: `The user attacks by clawing once with their right paw.

Damage: 259.5-519.21% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/ef8db2517b1a4509bb4581cb8f51a331.webp", description: `The user attacks by firing fireballs from their three mouths

Damage: 375-750.3% of the user's Attack
・When this skill hits, it applies the [Combustion] effect.

[Combustion] 
Deals damage equal to 50% of the user's Attack every 3 second(s).
Increases damage taken by 5%.
Duration: Infinite.` },
        { name: "Infernal Heat", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/0d500b417a3f4231b81f958c0adbc953.webp", description: `The user attacks by clawing once with their right paw and once with their left paw.

Damage: 414.75-829.83% of the user's Attack` },
        { name: "Concentrated Flame", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b0d6211d17ab427494b552add6bb7c66.webp", description: `The user lifts both of their front paws and strikes downward to attack the surrounding area.

Damage: 400.21-800.74% of the user's Attack
・When this skill hits, it applies the [Combustion] effect.

[Combustion] 
Deals damage equal to 50% of the user's Attack every 3 second(s).
Increases damage taken by 5%.
Duration: Infinite.` },
        { name: "Accelerate", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/cace33ad014a44ce843e0a4f20886c59.webp", description: `After gathering their strength, the user charges forward and attacks.

Damage: 287.25-574.73% of the user's Attack` },
        { name: "Internal Flame Wave", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/f0e84fcaa2b6405aa21a563faddc9b1d.webp", description: `After creating distance, the user attacks by sending a blast of fire towards the enemy.

Damage: 720-1440.58% of the user's Attack
・When this skill hits, it applies the [Combustion] effect.

[Combustion] 
Deals damage equal to 50% of the user's Attack every 3 second(s).
Increases damage taken by 5%.
Duration: Infinite.`}
      ],
      special: { name: "Hellfire Meteorite", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/93587dd5166c4aa4b5ba3cc94578811a.webp", description: `A meteor appears midair and launches itself at nearby targets.

Damage: 562-1124.45% of the user's Attack
・When this skill hits, it applies the [Combustion] effect.

[Combustion] 
Deals damage equal to 50% of the user's Attack every 3 second(s).
Increases damage taken by 5%.
Duration: Infinite` }
    },
    authority: "All team members' Critical Hit Damage increases by 8%",
    rank:"General",
  },

  Iron: {
    id: 4,
    name: "Iron",
    nickname: "Musclebound Menace",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/2d58cbeec5734b3b818ccf8bd9a6f266.webp",
    weaponName: "A Guardian's Will : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/332ea96b4abb430ea65771bcae6f30f1.webp",
    weaponEffect: "The Shadow's HP increases by 24%. The Shadow's Shield Acquisition Chance increases by 36%.",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/f462380a9f304a8b8bc49d88b0479b5f.webp", description: `The user attacks by swinging the battle hammer left and right two times.

Damage: 82.29-164.65% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/ba1d0c38afb74ad795617518a4b36958.webp", description:`The user attacks by pushing the target with a shield and then striking down powerfully with a battle hammer.

Damage: 92.86-185.79% of the user's Attack` },
        { name: "Iron Hammer!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b41126e240a942d680dda80a2b0a6bcd.webp", description: `The user raises a hammer and slams it down to attack, distorting the terrain.

Damage: 185.93-372.01% of the user's Attack` },
        { name: "Charge, Iron!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/464c12a1fba84f3aafb0fcedc7d96f88.webp", description: `The user jumps towards the front and attacks by slamming down with a hammer.

Damage: 143.75-287.62% of the user's Attack
・When this skill hits, applies the [Defense Decrease] effect.

[Defense Decrease] 
Decreases Defense by 12%.
Duration: 10 second(s).` },
        { name: "Iron, Angry!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b7a7fb6b01ff40ebb5f4a39687c3899b.webp", description: `After attacking the enemy with a loud shout, the user strikes down powerfully with a shield and attacks the surrounding area.

Damage: 432.26-864.87% of the user's Attack
・When this skill is used, it applies a [Shield] effect.

[Shield] 
The [Shield] us equal to 10% of the user's Max HP and is granted to all Shadows.
Duration: 10 second(s).` },
        { name: "The Iron Special", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/5aa25f48879c4226bd247871bd8bcdc9.webp", description: `A special technique invented by Iron. Iron combines techniques and attacks enemies with a battle hammer and shield.

Damage: 327.29-654.84% of the user's Attack` }
      ],
      special: { name: "Shield of Protection", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/807ad877345e4279bc6035170807ba9a.webp", description:`An array of shields appear around the Shadow to protect and enhance them.

Damage: 465-930.37% of the user's Attack
・When the user uses this skill, it creates a [Shield of Protection] effect.
・When this skill hits, it activates the [Defense Increase] effect

[Shield of Protection] 
Shadow's damage taken within the area decreases by 30% and [Super Armor] is activated.
The Skill Damage of Shadows within the area increases by 10%.
Duration: 15 second(s)
[Defense Decrease] 
Decreases the enemy's Defense by 12%.
Duration: 10 second(s)`}
    },
    authority: "All team members' Max HP increases by 12%",
    rank:"General",
  },

  Bigrock: {
    id: 5,
    name: "Bigrock",
    nickname: "The Blue Spirit",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/b7449ea0e0424b179f04cf6280e16976.webp",
    weaponName: "Rock Golem Hammer : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/6881a0bd35234ff9a42414caa2dc8836.webp",
    weaponEffect: "When the Shadow is hit the target's Attack decreases by 15% for 5 second(s). When the Shadow is hit the attacker's Defense is decreased by 5% for 5 second(s).",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/e0301717b15a41679cc3f2c265e64099.webp", description: `Attack by striking the ground with its fist, then swings its other hand inward to attack.

Damage: 348-696.78% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/81833f53e5bb483d9cf30e7cda2c47b8.webp", description: `Attacks by swinging both hands powerfully inward,

Damage: 222.75-445.76% of the user's Attack`},
        { name: "Sunder", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/49fd0e83834049259ea06d729e1f6ff5.webp", description: `Attacks by striking the ground twice with its fist and then throws rock fragments towards the front.

Damage: 516.75-1034.39% of the user's Attack` },
        { name: "Tectonic Shift", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/767c6781477f441a9115737fb4583805.webp", description: `Attacks by channeling mana into the ground with both hands to create spike-like rocks.

Damage: 349.5-699.28% of the user's Attack` },
        { name: "Pulverize", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/787c74b1e2df48d58cad6513b38d65a7.webp", description: `Attacks by striking the ground with its fist and releasing mana.

Damage: 571.5-1143.26% of the user's Attack` },
        { name: "Mana Discharge", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/963cc2071161407bb313f1ff794441d2.webp", description: `It roars towards the front and releases mana to deal damage.

Damage: 359.25-718.61% of the user's Attack` }
      ],
      special: { name: "Bigrock Rush", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/ad5a3b34de314869a9badde7e752a38b.webp", description: `The user quickly dashes forward and attacks the target.

Damage: 389.62-779.55% of the user's Attack` }
    },
    authority: "Increases entire team members' Basic Skill damage by 12%",
    rank:"General",
  },

  Tank: {
    id: 6,
    name: "Tank",
    nickname: "Leader of the Snowy Mountain",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/3206c4874ba8489f9382c498ce5d7ed9.webp",
    weaponName: "Frostbite Falchion : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/046c59c6f8084dd8af350e1a8ccab027.webp",
    weaponEffect: "The Shadow's Defense Penetration increases by 15%. The Shadow's damage dealt to Normal monsters increases by 50%.",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/da2de77cf789459ba79029e690d2fe2c.webp", description: `The user attacks by quickly slashing the target from side to side with its front claws.

Damage: 135-270.11% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/e031d50249d5442fa9cc0d15bdf746e6.webp", description: `The user attacks by quickly slashing both sides with its front claws, and then performs a powerful upward strike.

Damage: 220.1-440.38% of the user's Attack` },
        { name: "Tank Crash", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/7a7e1521fa2940fcb013400eee897458.webp", description: `The user attacks the target with a powerful lunge.

Damage: 365.36-731.01% of the user's Attack`},
        { name: "Tank Press", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/71152279deeb4c60984690ac2a6c049e.webp", description: `The user gathers their power, leaps high into the air, and attacks the enemy by slashing downward toward them.

Damage: 382.92-766.15% of the user's Attack
・When this final hit lands, [Stun] the target.

[Stun] 
Immobilizes the target.
Duration: 1 second(s).` },
        { name: "Tank Overkill", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/64d934b93c4e4943b3ad659b75bdc6f2.webp", description: `The user raises its front claws to attack by quickly and powerfully slashing the target, and then performs a powerful downward strike.

Damage: 517.56-1035.53% of the user's Attack
・When using this skill, applies the [Defense Increase] to all shadows.

[Defense Increase] 
Increases the Defense by 40%.
Duration: 10 second(s).`},
        { name: "Tank Roar", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/5b0bc000e64f4c98b3ad726508db337c.webp", description: `The user roars loudly and attacks nearby enemies within a circular range.

Damage: 432.5-865.35% of the user's Attack` }
      ],
      special: { name: "Tank's Rage", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/44a9c06e322148b6b492cb54b7b7ab6e.webp", description:`The user charges forward and slashes the enemy with its claws.

Damage: 507.24-1014.89% of the user's Attack` }
    },
    authority: "All team members' Defense increases by 12%",
    rank:"General",
  },

  Skull: {
    id: 7,
    name: "Skull",
    nickname: "The King Of The Dead",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/803bce8181ac4927a1a2043bab199c38.webp",
    weaponName: "Grave Keeper's Scythe : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/b8b1b097bade413d93d82955c8cb66b9.webp",
    weaponEffect: "When Attacking A Target With Skull's [Death Flame], The User's Damage Dealt Increases By 24% For 10 second(s).",
    skills: {
      basic: [
        { name: "Skeletal Thorns", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/793fa28bceb74ff3973bfc1499573f64.jpg", description:`The user projects an osseus spike to wound the enemy.

Damage: 422.14% of the user's Attack When this skill hits it activates the [HP Recovery Rate Decrease] effect

[HP Recovery Rate Decrease]

Decreases the target's HP Recovery Rate by 20%

Duration: 20 second(s)` },
        { name: "Phantasm", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/698d215e12e242adb18fa0a803409159.jpg", description:`The user attacks enemies by releasing the power of a cursed spirit.

Damage: 555.01% of the user's Attack` },
        { name: "Spur Of Agony", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/24a4f9c1e359466bac5c7e17e76ec5e4.jpg", description: `The user hurls fires osseus spikes in all directions to wound enemies around them.

Damage: 555.01% of the user's Attack

When this skill hits it activates the [HP Recovery Rate Decrease] effect

[HP Recovery Rate Decrease]

Decreases the target's HP Recovery

Rate by 20%

Duration: 20 second(s)`},
        { name: "Deathfire", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/7457e89b616d4c35a69203aebac1cd7e.jpg", description: `The user unleashes deadly flames to incinerate enemies.

Damage: 496.41% of the user's Attack

When this skill hits it applies the [Death Flame] effect

[Death Flame]

Deals damage equal to 50% of the user's Attack every 3 second(s) Decreases Defense by 5% Duration: 20 second(s)`},
        { name: "Ethereal Gracestone", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/e5d1a8de1222478eb1573d67ee1546f6.jpg", description: `The user summons a massive soul-imbued pillar to attack enemies.

Damage: 571.92% of the user's Attack` },
        { name: "Suffering Ground", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/780d3c4973964e56b1b1a7c10775da71.jpg", description: `Sharp bones burst from the earth around the user, inflicting damage on enemies.

Damage: 700.26% of the user's Attack

When this skill hits it activates the [HP Recovery Rate Decrease] effect

[HP Recovery Rate Decrease]

Decreases the target's HP Recovery Rate by 20%

Duration: 20 second(s)` }
      ],
      special: { name: "Death's Comet", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/35db78aaef7e47939935e26448beb34a.jpg", description: `A deadly meteor falls from the sky, burning enemies within its range.

Damage: 888% of the user's Attack

When this skill hits it applies the [Death Flame] effect

[Death Flame]

Deals damage equal to 50% of the user's Attack every 3 second(s)

Decreases Defense by 5% Duration: 20 second(s)` }
    },
    authority: "The entire team's MP increases by 12%. The entire team's Skill Mana Consumption decreases by 5%.",
    rank:"General",
  },

  Jima: {
    id: 8,
    name: "Jima",
    nickname: "Recluse Of The Deep Sea",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/3dcdaeee510d428bbb0ff993f4b18c46.webp",
    weaponName: "Naga Guardian Dragon's Trident : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/8fcf193fb420408fbe7ebf75e133321e.webp",
    weaponEffect: "When a [Shield] Is Activated It Triggers The [Attack Increase] Effect    [Attack Increase] Increases Attack By 20%   Duration: 15 second(s).",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/3db97995c77c43f1a5e185ea5f4aa8af.jpg", description: `The user attacks by performing two large left and right swings with a spear.

Damage: 357.1% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/fe5587c94ac8494aae48012a964efcaf.jpg", description: `The user attacks by swinging the spears in both hands widely.

Damage: 346.6% of the user's Attack` },
        { name: "Tail Whip", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/e0a56cdccfbe481cace534782b88c436.jpg", description: `The user swings their tail forward in a wide arc to attack enemies in the front.

Damage: 680.36% of the user's Attack`},
        { name: "Jima's Frenzy", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/26c443104f6641d4b8710b297beebaa7.jpg", description: `The user quickly slashes forward, then attack enemies with a powerful strike.

Damage: 434.48% of the user's Attack` },
        { name: "Charging Stab", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/a5f01780bec54c3995ecaae630d94f09.jpg", description: `The user charges toward the target, then stabs with the spears in both their hands.

Damage: 516.51% of the user's Attack` },
        { name: "Deep Sea Raid", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/37f4c060ef6a43709efcc86e924bd86d.jpg", description: `The user dives into the ground, then bursts upward toward the target to attack the enemy.

Damage: 832.07% of the user's Attack` }
      ],
      special: { name: "Jima's Rage", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b6fa5ca9b7ec41e28e215bfb6703b196.jpg", description: `The user releases a breath toward the ground to create a massive wave and attack.

Damage: 723.07% of the user's Attack

Using skill it grants the user [Shield] to the entire team

[Shield]

+

Gain a [Shield] equal to 5000

Duration: 20 second(s)` }
    },
    authority: "Increases the entire team's Attack by 5% and Shield Acquisition Chance by 13%.",
    rank:"General",
  },

  Igris: {
    id: 9,
    name: "Igris",
    nickname: "His First Shadow",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/908d24739d1343ef8775c87bde7ec33e.webp",
    weaponName: "Demon King's Longsword : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/77a263caa6ec4feaa5039a365645d2e5.webp",
    weaponEffect: "The Shadow's Critical Hit Rate and Critical Hit damage increases by 15%.",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/5d2e019aa6a147d4b6fffbc7258bc708.webp", description: `The user attacks by slashing with a longsword twice diagonally from bottom to top.

Damage: 139.24-278.59% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/48fa59a1741841619273b7c69cfc0f5b.webp", description: `The user attacks by performing 4 quick and powerful consecutive slashes with a longsword.

Damage: 266.24-532.69% of the user's Attack` },
        { name: "Quadruple Wave", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b659c77b9f3743c2a41d808a818583e1.webp", description: `The user gathers their power and fires sword energy 4 times to attack the enemy from a distance.

Damage: 381.15-762.6% of the user's Attack` },
        { name: "Earth Slash", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/78b0e5bc39a04e06a9b6a8f25ead78b3.webp", description: `The user gathers their power and jumps to attack the enemy by powerfully striking downward with their sword.

Damage: 321.25-642.76% of the user's Attack
・When this skill hits it inflicts the [Bleed] effect on the target.

[Bleed] 
Deals damage equal to 0.6% of the current HP every 3 second(s).
Duration: 30 second(s).` },
        { name: "Blade Axle", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/3ed1a46490244cbd90f22fa372ef0ea4.webp", description: `The user gathers their power and charges forward while slashing quickly, attacking enemies in their path with sword energy.

Damage: 415.52-831.37% of the user's Attack
・When using this skill, applies the [Attack Increase] effect.

[Attack Increase] 
Increases the user's Attack by 100%.
Duration: 10 second(s).` },
        { name: "The Commander's Touch", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/55b0eeff56df46ea83ba433676e2d0e3.webp", description: `After pulling the enemies in front, the user attacks by striking down powerfully with a sword.

Damage: 377.5-755.3% of the user's Attack
・When this skill hits it inflicts the [Bleed] effect on the target.

[Bleed] 
Deals damage equal to 0.6% of the current HP every 3 second(s).
Duration: 30 second(s).` }
      ],
      special: { name: "Lightning Crash", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/c46c07c97659405d9900691a03738c8f.webp", description: `The user builds a massive electric charge and strikes down powerfully, releasing lightning waves to strike nearby enemies.

Damage: 296.31-592.86% of the user's Attack
・When this skill hits, it activates the [Paralyze] effect.

[Paralyze] 
This skill interrupts the target.
Duration: 1 second(s)` }
    },
    authority: "All team members' Critical Hit Rate increases by 8%.",
    rank:"General",
  },

  Beste: {
    id: 10,
    name: "Beste",
    nickname: "Ice Witch",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/31ec825686b6409bbd64bfb46cb69ac2.webp",
    weaponName: "Thetis' Grimoire : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/50405ebe4f3e4ad28f9610af87ac01b8.webp",
    weaponEffect: "The Shadow's Attack increases by 24%. The Shadow's Basic Skill damage increases by 15%.",
    skills: {
      basic: [
        { name: "Icicle Spike", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/1e3a371741774c909c611845af33ee97.webp", description: `The user attacks by expelling spikes made of ice in the direction they're facing.

Damage: 216.37-432.91% of the user's Attack`},
        { name: "Rage", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/6276473611ca46608355b6104ad613bb.webp", description: `The user summons a piercing ice pillar to attack

Damage: 270.74-541.7% of the user's Attack`},
        { name: "Permafrost", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/00f09f27f7e143f59d5a8f8dc8f45588.webp", description: `The user forms sharp frost thorns on the ground to attack enemies as they move forward.

Damage: 399.79-799.9% of the user's Attack` },
        { name: "Ice Predator", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/aa1fe224ff3d4e1a9ed0758b0d182885.webp", description: `The user summons a giant ice fox to attack

Damage: 341.84-683.95% of the user's Attack
・When this skill hits, it activates the [Defense Penetration Increase] effect on the entire team.

[Defense Penetration Increase] 
Increases the user's Defense Penetration by 10%.
Duration: 20 second(s)` },
        { name: "Glacialbreak", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/5be6007fc93243f9841fd7ecf0f3f987.webp", description: `A giant ice pillar tears through the earth, moving forward to strike the enemy.

Damage: 364.2-728.69% of the user's Attack
・When this skill hits, it triggers the [Freeze] effect.

[Freeze] 
Interrupts the target.
Duration: 2 second(s)`},
        { name: "Queen's Authority", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b9e3bda4d43f48689d3b6221add44580.webp", description: `The user summons an exploding ice flower to attack the enemy.

Damage: 516.92-1034.25% of the user's Attack` }
      ],
      special: { name: "Frozen Reckoning", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/3989639faa384c4289c03f0fe5b012b1.webp", description: `The user attacks the enemy by unleashing a storm of razor-sharp ice shards.

Damage: 339.98-680.23% of the user's Attack` }
    },
    authority: "The Defense Penetration of the entire team increases by 8%.",
    rank:"General",
  },

  Tusk: {
    id: 11,
    name: "Tusk",
    nickname: "Almighty Shaman",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/973f06629e2246d8b58d9916fb01d487.webp",
    weaponName: "Orb of Avarice : Replic",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/7e65d336737d4a8abf6fbaa45de559ee.webp",
    weaponEffect: "Enemies with 50% or less HP take 50% more damage when they are hit by the Shadow.",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/9badb2f39c634a1da0fa7c3326b3c8b8.webp", description: `The user attacks by throwing mana power towards the ground, creating a small explosive area.

Damage: 220.18-440.54% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/5e1e3819e8e94f7b9d229ebc361f5c4c.webp", description: `The user attacks by throwing forward-facing fiery blades.

Damage: 146.25-292.62% of the user's Attack` },
        { name: "Tracking Fire Bombs", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/c9dcc634da9a426e8aae7062fa75174c.webp", description: `The user creates a divination circle to the front and fires 6 tracking fire orbs at the enemy.

Damage: 417.79-835.91% of the user's Attack` },
        { name: "Erupting Flames", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/ff4a5c7f883d4ac5891b15ddbff77884.webp", description: `The user attacks by causing flames to erupt from the ground beneath their target 5 times.

Damage: 370.96-742.22% of the user's Attack` },
        { name: "Concentrated Heat", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/d1c42fac216346289356e97bfa410454.webp", description: `The user gathers heat above their head to create a giant fire orb before throwing it to attack the enemy.

Damage: 468.75-937.88% of the user's Attack
・Using this skill applies the [Attack Increase] effect to all shadows.

[Attack Increase] 
Increases the user's Attack by 20%.
Duration: 10 second(s).` },
        { name: "Claws of the Rampaging Fire Dragon", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/1896eb7fd40e4be9a6a983c03a7badad.webp", description:`The user throws forward-facing fiery blades of vengeance three times.

Damage: 551.67-1103.78% of the user's Attack`}
      ],
      special: { name: "Breath of the Fire Dragon", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/dc7bcb63cbb741879c25ecbfd464d0e0.webp", description: `he user unleashes a forward-facing blast of fire dragon power.

Damage: 508.21-1016.83% of the user's Attack
・When this skill hits, it activates the [Burn] effect.

[Burn] 
Deals damage equal to 30% of Attack every 3 second(s).
Duration: 30 second(s)` }
    },
    authority: "All team members' Core Attack Damage increases by 40%.",
    rank:"General",
  },

  Beru: {
    id: 12,
    name: "Beru",
    nickname: "Ant King",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/a6e8f20c816c4dcc8474050dda4d8849.webp",
    weaponName: "Shadow Scythe : Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2025/10/01/505a5c7b2704420db9b4dc94d81d44d2.webp",
    weaponEffect: "The Shadow's Healing Given increases by 90% and their Defense Penetration increases by 15%.",
    skills: {
      basic: [
        { name: "My King!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b63ed08b97ee437cabcba9fbb680583e.webp", description:`The user appears in the air above and body-slams the ground.

Damage: 324.75-649.76% of the user's Attack
・When the user uses this skill, it activates the [Gluttony Recovery] effect on the entire team.

[Gluttony Recovery] 
10% of the target's HP is restored.` },
        { name: "SCREECH!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/88acd2e4532646b9a847d483d9ae903a.webp", description: `The user emits waves of energy in a circular formation around themself.

Damage: 386.75-773.81% of the user's Attack`},
        { name: "Let Us Crush Them!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/78d3a53470274835ae217085c797ad41.webp", description: `The user moves at blinding speed to accurately stab the target's vital points.

Damage: 369.75-739.8% of the user's Attack` },
        { name: "I Shall Devour You!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/355136866bb442d39e90858891355d2f.webp", description: `The user strikes the enemy with a spinning kick.

Damage: 461.59-923.57% of the user's Attack
・When this skill hits, it activates the [Punishment] effect.

[Punishment] 
Increases damage taken by 5%.
Duration: 20 second(s)`},
        { name: "Rip!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/9421175f68904243acedc70ab8b3cca1.webp", description: `The user attacks the enemy by scratching them with their sharp appendages.

Damage: 464.2-928.77% of the user's Attack` },
        { name: "Make Way for His Highness!", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/af5c9077d00b478c82634f0ba828b88b.webp", description:`The user fires a forward-facing beam to melt enemies.

Damage: 529.8-1060.22% of the user's Attack`}
      ],
      special: { name: "His Highness Approaches", img: "https://resources.vortexgaming.io/upload/post/2025/10/01/b7bff4c452c047cab1d547f5cae57557.webp", description: `The user leaps into the air and slams the ground to cause an explosion.

Damage: 401.43-803.18% of the user's Attack
・When this skill hits, it activates the [Punishment] effect.

[Punishment] 
Increases damage taken by 5%.
Duration: 20 second(s)` }
    },
    authority: "The entire team's Attack and Critical Hit Damage increases by 5%." ,
    rank:"General",
  }, 

  	Uros: {
    id: 13,
    name: "Uros",
    nickname: "Doomed Berserker",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/a7cd011daa2c4a4882276cff6ee0f749.webp",
    weaponName: "Zeke's Fragment: Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2026/05/09/67f7d85e2f5e4193b4b438c7d67ce572.webp",
    weaponEffect: "The user's Defense Penetration increases by 24%",
    skills: {
      basic: [
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/8693166e160a48a2a244fd24301859ec.webp", description:`The user swings the axe twice, slams it down, then spins to strike.

Damage: 533.86-1068.15% of the user's Attack` },
        { name: "Basic Attack", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/2bc2d01e67464ba38d98b91c6d44598a.webp", description: `The user throws a returning axe forward to attack.

Damage: 338.58-677.43% of the user's Attack`},
        { name: "Decisive Strike", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/318621d5b71247fe996626826d2a84c7.webp", description: `The user leaps forward and attacks with a powerful downward strike.

Damage: 380.91-762.12% of the user's Attack
・When this skill hits, it activates the [Defense Decrease] effect.

[Defense Decrease] Defense Decrease Effect
Decreases Defense by 20%
Duration: 15 second(s)` },
        { name: "Thunder Strike", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/e94b28e693fe47c29b127359584d9d74.webp", description: `The user lifts their front foot and attacks with a powerful stomp.

Damage: 396.75-793.82% of the user's Attack`},
        { name: "Echoing Earth", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/0d5df97219ad4868bd967c0faaa6f4d7.webp", description: `The user attacks by striking the earth with an axe, unleashing electricity that moves along the ground.

Damage: 332.4-665.07% of the user's Attack` },
        { name: "Wild Roar", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/4fcb305a4d7b437c9823f9e386df2619.webp", description:`The user roars loudly and emits electricity in all directions to attack.

Damage: 302.7-605.64% of the user's Attack
・When this skill hits, it activates the [Paralyze] effect.

[Paralyze] Paralyze Effect
This skill interrupts the target.
Duration: 2 second(s)`}
      ],
      special: { name: "Armament Skill ", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/a359d536da434425a8ead874694a86f7.webp", description: `The user rushes forward and performs a downward slam, releasing a shockwave to attack.

Damage: 476.94-954.26% of the user's Attack
・When this skill hits, it activates the [Defense Decrease] effect.

[Defense Decrease] Defense Decrease Effect
Decreases Defense by 20%
Duration: 15 second(s)` }
    },
    authority: "	Increase Dark damage of all team members" ,
    rank:"General",
  }, 
  	Brute: {
    id: 14,
    name: "Brute",
    nickname: "The Butcher",
    img: "https://resources.vortexgaming.io/upload/post/2026/05/09/297eaafbcbae4c859cfe3055344417a8.webp",
    weaponName: "Orc's Broadsword: Replica",
    weaponImg: "https://resources.vortexgaming.io/upload/post/2026/05/09/e5c44efd08654c0e8498ec4a65265294.webp",
    weaponEffect: "The user's Critical Hit Rate and Critical Hit damage increases by 18%",
    skills: {
      basic: [
        { name: "Basic Attack ", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/471b914d19584f53bdca3b4d9be0a0bf.webp", description:`The user leaps backward while swinging their broadsword horizontally

Damage: 390.81-781.93% of the user's Attack` },
        { name: "Basic Attack ", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/99724d8d57d14a7f8d1898aa5ca397b5.webp", description: `The user delivers a downward strike in front of themself with their broadsword.

Damage: 319.04-638.34% of the user's Attack`},
        { name: "Decisive Strike", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/b81212b5aa66477d97868a0b82809cd3.webp", description: `The user delivers a diagonal downward strike, following by upward diagonal slash.

Damage: 380.91-762.12% of the user's Attack` },
        { name: "Thunder Strike", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/67033b41ace849ddabac3c5e88d22405.webp", description: `After leaping, the user slams their broadsword into the ground.

Damage: 282.41-565.05% of the user's Attack`},
        { name: "Echoing Earth", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/1ecbcc9c5fe9470f91bd78cf72532fcc.webp", description: `The user strikes the ground with their broadsword, releasing a shockwave across it.

Damage: 388.58-777.47% of the user's Attack` },
        { name: "Raging Incursion", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/08e8a9e6303d4448b8acb5d34ea9587e.webp", description:`The user spins to slash nearby enemies, then slams their broadsword down to release a powerful shockwave.

Damage: 551.69-1103.82% of the user's Attack`}
      ],
      special: { name: "Armament Skill", img: "https://resources.vortexgaming.io/upload/post/2026/05/09/4dfef6ad0c974ca5b9cb26d4df1fb5a9.webp", description: `The user gives a mighty roar, releasing a powerful shockwave.

Damage: 439.57-879.49% of the user's Attack
・The [Attack Increase] effect is applied to the entire team while this skill is used.

[Attack Increase] Attack Increase Effect
Increases Attack by 20%
Duration: 10 second(s)` }
    },
    authority: "Increase Water damage of all team members" ,
    rank:"General",
  }, 
  
};