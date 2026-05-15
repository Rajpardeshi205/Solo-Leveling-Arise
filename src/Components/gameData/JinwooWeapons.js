export const JinwooWeapons = [
    {
      id: 1,
      element: "Wind",
      weapon: "Blade",
      weaponName: "Demon King's Longsword",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/5ae94ebbeaea4dcd9f4e733c294cd3c1.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/429f6ac9bbc248f5b6e5eb7b696324d8.webp"],
      color: "#32CD32",
      releaseDate: "18 March 2024",
      rarity:"SSR",
       skills: [  
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/6f3d7136c62743c09e91c1ad1d71fe83.webp",
            description: `Jinwoo swings his one-handed sword.

Stage 1 Damage: 93-115.03% of Jinwoo's Attack
Stage 2 Damage: 97-119.98% of Jinwoo's Attack
Stage 3 Damage: 104-128.64% of Jinwoo's Attack
・Deals Wind elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/e6b3293734564f33acb58025d5bd78d9.webp",
            description: `Jinwoo slashes his one-handed sword downward with all his might

Damage: 592-732.26% of Jinwoo's Attack
・Deals Wind elemental damage.`
          },
          {
            skillName: "Lightning",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/760bd428b6c1445f85673b1ccc3d98f9.webp",
            description: `Jinwoo holds out the sword in front of him to counter the enemy's attack, and then slashes the enemy down with the power of lightning.

Damage: 1470-2249.1% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Wind elemental damage.`
          },
        ], 
      advancement:[`When Lightning is used, it applies a [Shield] and the user performs a Counterattack.
A [Stun] effect and [Storm of White Flames] effect are applied upon a successful Counterattack.

[Shield] Shield Effect

Creates a shield equal to 50% of the user's Max HP.
Duration: 3 second(s)

[Stun] Stun Effect

Immobilizes the target.
Duration: 3 second(s)

[Storm of White Flames] Strorm of White Flames Effect

Increases the user's Attack by 12%.
Creates a lightning that deals damage equal to 200% of the user's Attack in a nearby area every 0.75 second.
Duration: 10 second(s)`,`Inflicts the Stroke of Lightning effect to the same target every 5 attack(s).
[Stroke of Lightning]
Deals damage equal to 100% of Attack.
Cooldown: 0.5 second(s)`,`Increases Wind damage by 10%.`,`When the user uses Lightning, it applies the [Storm of the White Flames] effect, regardless of whether or not the user performs a successful Counterattack.
The damage of [Storm of White Flames] increases by 30%.
Wind damage increases by 10% while [Storm of White Flames] is active.`,`Decreases the cooldown of Lightning by 20%.`,`[Stroke of Lightning] is enhanced.
Each time the user hits the same target 3 time(s), it applies the [Stroke of Lightning] effect on the target.
Deals damage equal to 200% of the user's Attack.
Cooldown: 0.3 second(s)
When Lightning hits, it applies the [Benediction of the White Flames] effect and [Final Thunderbolt].
[Final Thunderbolt] effect.
A large lightning bolt falls on the target dealing damage equal to 1600% of the user's Attack to nearby enemies.

[Benediction of the White Flames] Benediction of the White Flames Effect

Creates a [Shield] equal to 10% of the user's Max HP.
When the user is it, it applies the [Stun] effect to the target for 2 second(s) (Activates only once per target).
Cooldown: 10 second(s)`],
    },
    {
      id: 2,
      element: "Water",
      weapon: "Grimoire",
      weaponName: "Thetis' Grimoire",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/0e902f73184446208e8ea59f4032dd68.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/ea7cf3bd70094f24ae6de9436533e70c.webp"],
      color: "#00BFFF",
      releaseDate: "18 March 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/40975780653740879eedd0f81747b152.webp",
            description: `Jinwoo unleashes the power of water.

Stage 1 Damage: 70-86.59% of Jinwoo's Attack
Stage 2 Damage: 73-90.3% of Jinwoo's Attack
Stage 3 Damage: 77-95.24% of Jinwoo's Attack
・Deals Water elemental damage.
・When the final hit lands, it inflicts the [Airborne] effect.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/4f7061218cb54fecb38995d9423888e0.webp",
            description: `Jinwoo causes water to burst from the ground.

Damage: 430-531.88% of Jinwoo's Attack
・Deals Water elemental damage.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
          {
            skillName: "Water Spray",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/40975780653740879eedd0f81747b152.webp",
            description: `Two dragons shoot streams of water.

Damage: 1420-2172.6% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Water elemental damage`
          },
        ], 
      advancement:[`When Water Spray hits, it has a 100% chance to apply the [Cold Ice] effect to target.

[Cold Ice] Frostbite Effect
Applies the [Freeze] effect to the target and Interrupts them.
When this effect ends, it deals additional damage to the target equal to 10% of their damage taken during the duration.
Duration: 4 second(s).`,`Additionally applies [Deep Erosion] to the targets with the [Cold Ice] effect.

[Deep Erosion] Deep Erosion Effect

Increases elemental weakness damage taken by 24%.
Duration: 15 second(s).`,`Increases Water damage by 10%.`,`When the [Cold Ice] effect ends, increases the user's additional damage to 20%.`,`Decreases the cooldown of Water Spray by 20%.`,`Increases damage dealt to [Frozen] targets by 50%.`],
    },
    {
      id: 3,
      element: "Fire",
      weapon: "A Mace",
      weaponName: "Vulcan's Rage",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/4fcd5f2df9c94f9da4e2abfb3ec6e518.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/9f36e07d78e94ab4ac01c41622c1756b.webp"],
      color: "#FF4500",
      releaseDate: "18 March 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/6ed0e925591f4aa79ecb75b9d796672a.webp",
            description: `Jinwoo violently swings a blunt weapon in continuous motions.

Stage 1 Damage: 140-173.17% of Jinwoo's Attack
Stage 2 Damage: 146-180.59% of Jinwoo's Attack
Stage 3 Damage: 155-191.72% of Jinwoo's Attack
・Deals Fire elemental damage.
・When the final hit lands, it [Knocks Down] the target.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/00f81be9f59048dc8afb09e8fac24916.webp",
            description: `Jinwoo spins and strikes the surrounding area with his blunt weapon.

Damage: 867-1072.42% of Jinwoo's Attack
・Deals Fire elemental damage.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
          {
            skillName: "Fire of Destruction",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/00f81be9f59048dc8afb09e8fac24916.webp",
            description: `Jinwoo spins and pulls the enemy into the air and then attacks with a powerful downward slash.

Damage: 1277-1953.81% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Fire elemental damage.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
        ], 
      advancement:[`When the user uses Fire of Destruction it applies the [Vulcan's Blessing] effect.

[Vulcan's Blessing] File:Vulcan's Blessing Effect.png
It creates a [Shield] equal to 10% of the user's Attack and applies the [Concentration] effect for every Basic Attack and Core Attack that hits the enemy.
Duration: 10 second(s).

[Concentration] File:Concentration Effect.png
When the duration ends or the effect is removed, [Vulcan's Blessing] explodes and deals damage equal to 400% of the user's Attack (stacking up to 20 times).
When it explodes, it deals additional 20% damage per instance of [Concentration].
When [Vulcan's Blessing] is at 20 instances, [Vulcan's Blessing] instantly explodes and recreates [Shield] equal to 10% of the user's Attack.
Duration: Infinite`,`When Vulcan's Blessing] explodes, applies [Rage].

[Rage] File:Rage Effect.png
Increases the user's Attack by 12%.
Increases Attack Speed by 6%.
Duration: 15 second(s)`,`Increases Fire damage by 10%.`,`Enhances [Rage]

[Rage] File:Rage Effect.png
Applies even when using Fire of Destruction.
Increases the user's Attack by 20%.
Increases Attack Speed by 10%.
Duration: 15 second(s)`,`Decreases the cooldown of Fire of Destruction by 20%.`,`While [Shield] is in effect, the damage of Fire of Destruction increases by 50%.`],
    },
    {
      id: 4,
      element: "Light",
      weapon: "Gun",
      weaponName: "The Huntsman",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/c3fb0001555b46f0a9bedcd08a53a306.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/260b9e8841f144dba4e1df743a3d19aa.webp"],
      color: "#FFFF00",
      releaseDate: "18 March 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/395368e398c148068083becc968e6ba7.webp",
            description: `Jinwoo spins and fires bullets of light in all directions.

Stage 1 Damage: 164-202.86% of Jinwoo's Attack
Stage 2 Damage: 168-207.8% of Jinwoo's Attack
Stage 3 Damage: 175-216.46% of Jinwoo's Attack
・Deals Light elemental damage.
・Deals weak Break damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/6f4c5901db5742da90744d60aaee636f.webp",
            description: `Jinwoo gathers light energy and expels it as bullets.

Damage: 546-675.36% of Jinwoo's Attack
・Deals Light elemental damage.
・Deals weak Break damage.`
          },
          {
            skillName: "Judgement Time",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/3293a9abc21c4eb19b47e738901c17e5.webp",
            description: `After charging quickly and firing a barrel into the enemy, Jinwoo fires a powerful shot.

Damage: 1108-1695.24% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Light elemental damage.
・Deals weak Break damage.`
          },
        ], 
      advancement:[`When the user uses Judgment Time it activates their Core Attack.
When the user uses Judgment Time, their Core Attack is changed to Time to Hunt for 6 second(s) and increases damage by 100%.
When the user's Basic Attack, Core Attack, or Time to Hunt hits targets within 4m, it increases damage by 50%.`,`When the final hit of Judgment Time lands, inflicts the [Sunder] effect to the target.
If a target is in a [Break] state while the [Sunder] effect is active, inflicts the [Destroy] effect to the target.

[Sunder] Sunder Effect

Increases [Break] effect by 25%.
Duration: 3 second(s)

[Destroy] Destroy Effect

Increases damage taken increases by 8%.
Duration: Infinite`,`Increases Light damage by 10%.`,`When the first hit of Judgment Time lands, it applies the [Halt] effect to the target.

[Halt] Stop Effect

This skill interrupts the target.
Duration: 2 second(s)`,`Decreases the cooldown of Judgment Time by 20%.`,`[Destroy] Effect Change
Increases damage taken by 16% (stacking up to 99 times).
After Judgment Time hits, if a Core Attack is the next attack and it hits, it inflicts [Judgment Overture] to the target.
At 3 instances of [Judgment Overture], it changes to 1 instance of [Destroy] (up to 1 time).`],
    },
    {
      id: 5,
      element: "Dark",
      weapon: "Slender shaft that curves slightly towards the top",
      weaponName: "Shadow Scythe",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/495f30c0c41a4e55b9b4525477b0b49d.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/4bf455d59c8c4c6093914f193180f97f.webp"],
      color: "#9b5de5",
      releaseDate: "18 March 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/f121cea433154ebe8784498c8bb2f7bd.webp",
            description: `Jinwoo cuts down the enemy by swinging a scythe.

Stage 1 Damage: 174-215.23% of Jinwoo's Attack
Stage 2 Damage: 180-222.65% of Jinwoo's Attack
Stage 3 Damage: 187-231.31% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/37665b40fe2f44b59b2f05a63f171b74.webp",
            description: `Jinwoo draws his sword while spinning and strikes the surrounding area.


Damage: 694-858.43% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Essence Harvest",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/9fa2a94465a24ad5bbd2237efebec466.webp",
            description: `Jinwoo slashes his scythe rapidly while the Skill button is held.

Damage: 1454-2224.62% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Dark elemental damage`
          },
        ], 
      advancement:[`When using Essence Harvest, consumes 5% of current HP and increases skill damage by 100%.`,`If the user's current HP is below 70%, the [Edge of Darkness] effect is applied.

[Edge of Darkness] Edge of Darkness Effect

Increases the user's Critical Hit Rate by 25%.`,`Increases Dark damage by 10%.`,`When the user's current HP is 60% or below, they recover 0.4% of their current HP every time the skill hits.`,`Decreases the cooldown of Essence harvet by 20%.`,`Increases damage taken by 15%, but increases Attack by 15%.`],
    },
    {
      id: 6,
      element: "Dark",
      weapon: "Dagger",
      weaponName: "Moonshadow",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/19a1c1ccb36f48cb842505e978e26d32.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/ce83c4c8e8244ee0867c4faa3aa4764b.webp"],
      color: "#9b5de5",
      releaseDate: "17 April 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/343ada6d29614bfcad47125c247c1677.webp",
            description: `Jinwoo swings his daggers quickly and attacks.

Stage 1 Damage: 98-121.22% of Jinwoo's Attack
Stage 2 Damage: 102-126.17% of Jinwoo's Attack
Stage 3 Damage: 108-133.59% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/114477c145cb49fd8c61c3111d011d69.webp",
            description: `Jinwoo spins swiftly and swings his daggers.


Damage: 575-711.24% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Moonglow Shining in the Dark",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/aa6d7bfa99c3435081bb2f0444b9fa14.webp",
            description: `After conjuring a full moon obscured by clouds, Jinwoo swiftly slashes at it, causing it to shatter into an explosion.

Damage: 1446-2212.38% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Dark elemental damage`
          },
        ], 
      advancement:[`When Moonglow Shining in the Dark is used, it applies the [Full Moon] effect to targets on the moon.
When the last attack of Moonglow Shining in the Dark hits, it slows down time for 3 second(s) and applies 1 instance of [Lunar Eclipse] to the target per instance of [Full Moon].

[Full Moon] Full Moon Effect

Duration: Infinite (stacking up to 1 times).

[Lunar Eclipse] Lunar Eclipse Effect

The target's damage taken increases by 10%.
Increases Dark damage by 10%.
Duration: 3 second(s)`,`Enhances the effects of [Full Moon and Lunar Eclipse].

[Full Moon] Full Moon Effect

Duration: Infinite (stacking up to 3 times).

[Lunar Eclipse] Lunar Eclipse Effect

The target's damage taken increases by 15%.
Increases Dark damage by 15%.
Duration: 3 second(s)`,`Increases Dark damage by 10%.`,`When Shadow Step hits, it applies 1 instance of [Lunar Eclipse] per instance of [Full Moon].`,`Decreases the cooldown of Moonglow Shining in the Dark by 20%.`,`Increases the user and their team members' damage by 15% while the time slowing effect is active.`],
    },
    {
      id: 7,
      element: "Dark",
      weapon: "Sword ",
      weaponName: "Demonic Plum Flower Sword",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/a5430ab3b447461d8047a2c73947acc2.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/1f22aef945bc4d38b66d66b7222c3e4e.webp"],
      color: "#9b5de5",
      releaseDate: "17 April 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/125a5e213b2d4eb38713c5d3cbe10741.webp",
            description: `Jinwoo draws his sword with tremendous speed.

Stage 1 Damage: 94-116.27% of Jinwoo's Attack
Stage 2 Damage: 100-123.69% of Jinwoo's Attack
Stage 3 Damage: 106-131.11% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/00f660e961044be9a37675d50a4cf546.webp",
            description: `Jinwoo draws his sword while spinning and strikes the surrounding area.


Damage: 535-661.76% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Plum Flower: Swift Flight",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/25d153b0520142b9b7f8f51469b1ce5d.webp",
            description: `Jinwoo blows plum flowers and slashes forward with incredible speed.

Damage: 1287-1969.11% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Dark elemental damage`
          },
        ], 
      advancement:[`After Plum Flower: Swift Flight is used, the user applies the [Plum Flower] effect.
After successfully performing a Dash followed by Plum Flower: Swift Flight, they apply the [Full Bloom] effect.

[Plum Flower] Plum Flower Effect

Increases Critical Hit damage by 12% (stacking up to 3 times).
Duration: Infinite

[Full Bloom] Full Bloom Effect

Increases the usage speed of Plum Flower: Swift Flight by 20%.
The user's Attack increases by 4%.
The user's Critical Hit Rate increases by 4%.
Duration: 8 second(s)`,`When the user sheathes after using Plum Flower: Swift Flight, applies the [Amplifying Draw] effect.

[Amplifying Draw] Amplifying Draw Effect

Increases the chance of the user landing a Critical Hit on the next attack by 32%.
Increases skill damage by 32%.
Duration: 3 second(s)`,`Increases Dark damage by 10%.`,`When the user uses Dash, [Amplifying Draw] lasts for 5 second(s) and additionally increases Critical Hit damage by 32%.`,`Decreases the cooldown of Plum Flower: Swift Flight by 20%.`,`Adds the [Plum Flower] effect.
Increases the user's Dark damage by 5%.
Applies 2 instances of [Plum Flower] when entering the stage (stacking up to 5 times).`],
    },
    {
      id: 8,
      element: "Water",
      weapon: "Gun",
      weaponName: "Skadi",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/b32dfd073ddb453e82b389a0d6b0584e.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/660833b66b96483c9088517f1e13e0f1.webp"],
      color: "#00BFFF",
      releaseDate: "29 May 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/db89812782ca47a89cae4794bc75ef7d.webp",
            description: `Jinwoo spins and fires bullets of ice in all directions.

Stage 1 Damage: 91-112.56% of Jinwoo's Attack
Stage 2 Damage: 94-116.27% of Jinwoo's Attack
Stage 3 Damage: 100-123.69% of Jinwoo's Attack
・Deals Water elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/237c882efbb84657a80abd75613b2b78.webp",
            description: `Jinwoo gathers ice energy and expels it as bullets.

Damage: 532-658.05% of Jinwoo's Attack
・Deals Water elemental damage.`
          },
          {
            skillName: "Winter Hunting",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/3d50638ae4524ed2907baff430b2f91c.webp",
            description: `Jinwoo fires bullet of ice in all directions.

Damage: 1290-1973.7% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Water elemental damage.`
          },
        ], 
      advancement:[`When Winter Hunting is used, it activates Last Hunt and applies the [Skadi's Blessing] effect for 7 second(s).
When Winter Hunting hits, it applies the [Skadi's Curse] effect to the target.

Last Hunt

Deals damage equal to 100% of the user's Attack to targets with the [Skadi's Curse] effect.
Inflicts the [Freeze] effect.
When the Last Hunt skill hits, it removes the [Skadi's Curse] effect.

[Skadi's Blessing] Skadi's Blessing Effect

Increases the user's Attack by 3%.
Increases the user's Defense Penetration by 3%.
Duration: 10 second(s)

[Skadi's Curse] Skadi's Curse Effect

Duration: 7 second(s)

[Freeze] Freeze Effect

Interrupts the target.
Duration: 2 second(s)`,`When Last Hunt is used, creates [Skadi's Domain] for 7 second(s).

[Skadi's Domain] Skadi's Domain Effect

When any attack lands while in the domain, it deals damage equal to 50% of the attacker's Attack. (Cooldown: 0.5 second(s))
Increases team members' Water elemental damage by 10% when within the domain.`,`Increases Water damage by 10%.`,`Enhances [Skadi's Blessing].

[Skadi's Blessing] Skadi's Blessing Effect

Increases the user's Attack by 3%.
Increases the user's Defense Penetration by 3%.
Duration: Infinite (stacking up to 4 times)`,`Decreases the cooldown of Winter Hunting by 20%.`,`Enhances the Last Hunt skill.
Deals damage equal to 500% of the user's Attack to target with the [Skadi's Curse] effect.
Inflicts the [Freeze] effect.
When the Last Hunt skills hits, it removes the [Skadi's Curse] effect.

[Freeze] Freeze Effect

Interrupts the target.
Duration: 3 second(s)`],
    },
    {
      id: 9,
      element: "Fire",
      weapon: "The Bow",
      weaponName: "Phoenix Soul",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/0d29f5467d4e4d079bf6a03e17cc8617.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/3913ac90b212495d995702d633b0568f.webp"],
      color: "#FF4500",
      releaseDate: "10 July 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/f418ed880e3e4e3bbf40c03a9890e666.webp",
            description: `Jinwoo swings his daggers quickly and attacks.

Stage 1 Damage: 93-115.03% of Jinwoo's Attack
Stage 2 Damage: 97-119.98% of Jinwoo's Attack
Stage 3 Damage: 103-127.4% of Jinwoo's Attack
・Deals Fire elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/bbc4799e1a5b4b59a7f8e8d55fdde420.webp",
            description: `Jinwoo spins swiftly and swings his daggers.

Damage: 595-735.97% of Jinwoo's Attack
・Deals Fire elemental damage.`
          },
          {
            skillName: "Phoenix Rapid Fire",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/94a5a6d143374477b30746ef759d2291.webp",
            description: `After shooting fire arrows, Jinwoo gathers the power of the flame and sends the phoenix flying.

Damage: 1504-2301.12% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Fire elemental damage.
・When the final hit lands, it inflicts the [Airborne] effect.`
          },
        ], 
      advancement:[`When Phoenix Rapid Fire is used, it inflicts the [Firebird Soul] effect every 3rd, 6th, and 9th arrow.
When the weapon's Basic Attack hits 3 times, inflicts the [Firebird Soul] effect.

[Firebird Soul] Firebird Soul Effect

The user's Core Attack changes to Flame Shot.
Increases Flame Shot damage by 80% per Firebird Soul instance (stacking up to 3 times).
When the user uses Flame Shot it consumes all Firebird Soul instances.
Duration: Infinite`,`Fills 34% of the user's Core Gauge every 3rd, 6th, 9th arrow of Phoenix Rapid Fire.
When Flame Shot hits, fills the user's Core Gauge by 50%.`,`Increases Fire damage by 10%.`,`The last arrow of Phoenix Rapid Fire grants 2 instances of the Firebird Soul effect.
Increases the max instance [Firebird Soul] to 4 instances.`,`Decreases the cooldown of Phoenix Rapid Fire by 20%.`,`After obtaining [Firebird Soul] by using Phoenix Rapid Fire or the Basic Attack, the user regains the consumed [Firebird Soul] instances and 100% of their Core Gauge upon using Flame Shot.`],
    },
    {
      id: 10,
      element: "Water",
      weapon: "Surfboard",
      weaponName: "Secured Marlin Surfboard",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/33c95f899afd480ba48f8e28154dfe50.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/38bec5e9cc9e4283b025cfc82c99748f.webp"],
      color: "#00BFFF",
      releaseDate: "31 July 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/a787e957919f47ddad3a2181d08a2614.webp",
            description: `Jinwoo violently swings the marlin in continuous motion.

Stage 1 Damage: 109-134.83% of Jinwoo's Attack
Stage 2 Damage: 116-143.48% of Jinwoo's Attack
Stage 3 Damage: 126-155.85% of Jinwoo's Attack
・Deals Water elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/044fd62390374d1fb8dc44062618f8db.webp",
            description: `Jinwoo spins and jumps to strike the surrounding area with the marlin.

Damage: 617-763.19% of Jinwoo's Attack
・Deals Water elemental damage.`
          },
          {
            skillName: "Marlin's Dream",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/91198619f399497e8dc0616c30fa5a10.webp",
            description: `Jinwoo spins and jumps to strike the surrounding area with the marlin.

Damage: 1080-1652.4% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Water elemental damage`
          },
        ], 
      advancement:[`When Marlin's Dream is used sequence with a Dash, the skill becomes the Flying Marlin skill and increases the user's damage by 30%.
When Marlin's Dream or Flying Marlin hit they grant the [Surfer's Path] effect.
While using Marlin's Dream or Flying Marlin the user gains the [Super Armor] effect.

[Surfer's Path] Surfer's Path Effect

Increases damage to Normal Monsters by 1%.
Duration: Infinite (stacking up to 999 times)`,`When Marlin's Dream is used in sequence with Dash it resets the cooldown of Marlin's Dream and Flying Marlin. (Cooldown: 30 second(s))`,`Increases Water damage by 10%.`,`When the user uses Flying Marlin it charges their Dash 1 time.
Increases the damage of Marlin's Dream and Flying Marlin by 30%.`,`Decreases the cooldown of Marlin's Dream and Flying Marlin by 20%.`,`When the user defeats an enemy using Marlin's Dream or Flying Marlin it grants the [Shaka] effect.

[Shaka] Shaka Effect

Increases the user's Attack by 1%.
Duration: Infinite (stacking up to 20 times)`],
    },
    {
      id: 11,
      element: "Fire",
      weapon: "Skewer",
      weaponName: "Juicy Grilled Skewer",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/f8d4950d6bb4460085286eed383e0f6b.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/77877a573c064675b2d40d9ae43b8e07.webp"],
      color: "#FF4500",
      releaseDate: "22 August 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/3e8c757ff6f643e793df6af5dfb33386.webp",
            description: `Jinwoo strikes threatening with his grilled skewer.

Stage 1 Damage: 73-90.3% of Jinwoo's Attack
Stage 2 Damage: 77-95.24% of Jinwoo's Attack
Stage 3 Damage: 83-102.67% of Jinwoo's Attack
・Deals Fire elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/98a2388b46634be9979d9e76574f4062.webp",
            description: `Jinwoo spins with the grilled skewer and strikes down powerfully.

Damage: 492-608.57% of Jinwoo's Attack
・Deals Fire elemental damage.`
          },
          {
            skillName: "Smoky and Juicy",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/8e7491f94d1f4a3cb59d900bc39c214e.webp",
            description: `Jinwoo lights the grilled skewer and squashes the enemy as if cooking them.

Damage: 1180-1805.4% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Fire elemental damage
・When the final hit lands, it inflicts [Airborne] effect.`
          },
        ], 
      advancement:[`When the user uses Smoky and Juicy it creates a [Sizzling Grill].
When the user uses Smoky and Juicy it creates 3 instances of both Juicy Meat and Smoky Large Green Onion.
Grants additional effects when the user obtains each of the [Juicy Meat] or [Smoky Large Green Onion] instances.

[Sizzling Grill] Sizzling Grill Effect

Increases team members' Fire damage by 5% when within the area.
Increases team members' damage dealt by 5% when within the area.
Duration: 7 second(s)

[Juicy Meat] Juicy Meat Effect

The user recovers 3% of their HP by eating this.
Increases the user's Attack by 1%.
Duration: 10 second(s)

[Smoky Large Green Onion] Smoky Large Green Onion Effect

The user recovers 3% of their MP by eating this.
Increases the user's Defense by 1%.
Duration: 10 second(s)`,`The number [Juicy Meat] and [Smoky Large Green Onion] instances created increases to 4 each.
When the [Juicy Meat] and [Smoky Large Green Onion] instances run out, the grill flares up again to deal damage equal to 50% of the original damage it dealt the first time it flared up.`,`Increases Fire damage by 10%.`,`Enhances the effects of [Juicy Meat and Smoky Large Green Onion].

[Juicy Meat] Juicy Meat Effect 2

The user recovers 5% of their HP by eating this
Increases the user's Attack by 3%.
Duration: 10 second(s)

[Smoky Large Green Onion] Smoky Large Green Onion Effect 2

The user recovers 5% of their MP by eating this.
Increases the user's Defense by 3%.
Duration: 10 second(s)`,`Decreases the cooldown of Smoky and Juicy by 20%.`,`Enhances the effects of [Sizzling Grill].

[Sizzling Grill] Sizzling Grill Effect 2

Increases team members' Fire damage by 10% when within the area.
Increases team members' damage dealt by 10% when within the area.
Duration: 7 second(s)`],
    },
    {
      id: 12,
      element: "Dark",
      weapon: "Spear",
      weaponName: "Zeke's Fragment",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/41b500590e504a68b9c3e5e729d68d00.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/770573684171450eba143a6cff26239e.webp"],
      color: "#9b5de5",
      releaseDate: "22 August 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/3e8c757ff6f643e793df6af5dfb33386.webp",
            description: `Jinwoo swings his spear quickly.

Stage 1 Damage: 186-230.07% of Jinwoo's Attack
Stage 2 Damage: 191-236.25% of Jinwoo's Attack
Stage 3 Damage: 195-241.2% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/03b95a6ba2854dd2acb2bdcb01e19db0.webp",
            description: `Jinwoo performs a powerful upward spear swing.

Damage: 472-583.83% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Zeke's Advent",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/81baa1800fa346208c8dd3fd56da7d30.webp",
            description: `Jinwoo throws this spear and bolt of black lightning strikes the ground where it lands.

Javelin Attack Damage: 630-963.9% of Jinwoo's Attack
Drop Attack Damage: 1260-1927.8% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 70, 70-80, 80
・Deals Dark elemental damage.`
          },
        ], 
      advancement:[`When the user uses Zeke's Advent after using a Javelin Attack, they immediately follow up with a Drop Attack.
When the user uses a Javelin Attack it applies the [Fragment Retrieval] effect.
After using a Drop Attack the user gains [Super Armor] and their damage taken decreases by 50% for 5 second(s).

[Fragment Retrieval] Fragment Retrieval Effect

When the effect ends it applies the [Refined Fragment] effect.
Duration: 3 second(s)

[Refined Fragment] Refined Fragment Effect

Increases the damage of Zeke's Advent and Zeke's Return by 50%.
Duration: 3 second(s)`,`Zeke's Return activates after the user uses a Drop Attack.

Zeke's Return
Damage and Mana Consumption: Same as Drop Attack
The user does a powerful forward-facing slash, creating a black lightning storm.


When Zeke's Return is used in sequence with Drop Attack it increases the attack's damage by 50%.`,`Increases Dark damage by 10%.`,`The user can use Drop Attack more swiftly.
When the user uses a Drop Attack it immediately applies the [Refined Fragment] effect.
When the user uses Drop Attack and Zeke's Return sequentially the cooldown of Zeke's Advent decreases by 2 second(s).`,`Zeke's Advent cooldown decreases by 20%.`,`When the user uses Drop Attack and Zeke's Return sequentially it enhances the [Refined Fragment] effect and applies the [Black Lightning Fragment] effect.

[Black Lightning Fragment] Black Lightning Effect

Increases Zeke's Advent and Zeke's Return damage by 80%.
Increases the Critical Hit Rate of Zeke's Advent and Zeke's Return by 20%.
Duration: 3 second(s)`],
    },
    {
      id: 13,
      element: "Light",
      weapon: "Spear",
      weaponName: "Truth: Demon Knight's Spear",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/434baefcafa44d168ba4d1fd8b7f0ad8.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/fede9d7bf277418999e6b2d5962cad74.webp"],
      color: "#FFFF00",
      releaseDate: "22 August 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/3adcc97321554cd383e7f04c61cc0afc.webp",
            description: `Jinwoo swings his spear quickly.

Stage 1 Damage: 186-230.07% of Jinwoo's Attack
Stage 2 Damage: 191-236.25% of Jinwoo's Attack
Stage 3 Damage: 195-241.2% of Jinwoo's Attack
・Deals Light elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/1639146ea6884cceacca162f70cc710e.webp",
            description: `Jinwoo performs a powerful upward spear swing.

Damage: 472-583.83% of Jinwoo's Attack
・Deals Light elemental damage.`
          },
          {
            skillName: "Holy Knight’s Fury",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/b471a55a9d7344e5bfa109f9f8fddf2c.webp",
            description: `Jinwoo gathers the power of light in his hands and drops Truth: Demon Knights Spear on the five closest targets in front of him.

Damage: 475-726.75% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 40-45
・Deals Light elemental damage`
          },
        ], 
      advancement:[`When Holy Knight's Fury is used, applies the [Corrupted Rules] effect.

[Corrupted Rules] Corrupted Rules Effect

Removes the cooldown of Holy Knight's Fury. (Cooldown: 20 second (s))
Increases Light elemental damage by 10%.
Duration: 4 second(s)`,`Increases the user's Attack Speed by 15% and the damage of Holy Knight's Fury by 15% while the Corrupted Rules effect is active.
When Holy Knight's Fury lands, the user recovers MP by 1%.`,`Increases Light damage by 10%.`,`When Holy Knight's Fury lands, applies the [Corrupted Holy Knight's Rage] effect.

[Corrupted Holy Knight's Rage] Corrupted Holy Knight's Rage Effect

Increases the damage of Holy Knight's Fury by 2% (stacks up to 50 times).
Duration: Infinite`,`Decreases the cooldown of Holy Knight's Fury by 20%.`,`When Holy Knight's Fury lands, inflicts the [Holy Knight's Curse] effect on the target.

[Holy Knight's Curse] Holy Knight's Curse Effect

At 5 stacks, deals additional damage equal to 1000% of the user's Attack.
When the additional damage is taken, the effect is removed.
Duration: 60 second(s)`],
    },
    {
      id: 14,
      element: "Wind",
      weapon: "Daggers",
      weaponName: "Demon King's Daggers",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/edfacd3e81bd4942965a0b80ffcf28e9.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/a9cc986d6d9649c1970e66b1c8a26fb2.webp"],
      color: "#32CD32",
      releaseDate: "10 October 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/b17a1f99722b4ad28f3e583346093373.webp",
            description: `Jinwoo swings his daggers quickly and attacks.

Stage 1 Damage: 177-218.94% of Jinwoo's Attack
Stage 2 Damage: 180-222.65% of Jinwoo's Attack
Stage 3 Damage: 187-231.31% of Jinwoo's Attack
・Deals Wind elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/f44aa60a708c40758a076f83146813e0.webp",
            description: `Jinwoo spins swiftly and swings his daggers.

Damage: 477-590.02% of Jinwoo's Attack
・Deals Wind elemental damage.`
          },
          {
            skillName: "Crackling Thunder",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/65419ee6aa1942e89dfffaa898d66858.webp",
            description: `Jinwoo charges forward, penetrates through the targets and then slashes them.

Damage: 666-1018.98% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Wind elemental damage.
・When the first Crackling Thunder attack hits, it inflicts the [Paralyze] effect on the target.

[Paralyze] Paralyze Effect
Interrupts the target.
Duration: 2 second(s)`
          },
        ], 
      advancement:[`Applies [Two As One] while the Demon King's Daggers are equipped.
The Critical Hit Rate and Critical Hit damage of Crackling Thunder increases by 30%.

[Two As One] Two As One Effect
Increases the damage of Crackling Thunder proportional to Sung Jinwoo's Strength stat.
Increases the damage of Crackling Thunder by 1% every 10 Strength points (up to 50%).
Duration: Infinite`,`After using Crackling Thunder, the user can do a more powerful versino of Crackling Thunder once as a follow-up attack.
When the user uses Crackling Thunder, it applies the [Concentrated Lightning] effect.

[Concentrated Lightning] Concentrated Lightning Effect
A [Concentrated Lightning] effect instance is added to the stack every second.
All of Sung Jinwoo's attacks add a bonus stack of [Concentrated Lightning].
When the maximum number of instances has been reached, the [Lightning Rush] effect is applied, and the [Concentrated Lightning] effect is removed.
Duration: Infinite (stacking up to 40 times)

[Lightning Rush] Lightning Rush Effect
When the user uses Crackling Thunder, it consumes 1 instance(s) of the the [Lightning Rush] effect and increases Skill Damage by 50%.
Duration: Infinite`,`Increases Wind damage by 10%.`,`Enhances [Two As One, Concentrated Lightning, and Lightning Rush].

[Two As One] Two As One Effect
Increases the damage of Crackling Thunder proportional to Sung Jinwoo's Strength stat.
Increases the damage of Crackling Thunder by 5% every 10 Strength points (up to 150%).
Duration: Infinite

[Concentrated Lightning] Concentrated Lightning Effect
A [Concentrated Lightning] effect instance is added to the stack every second.
All of Sung Jinwoo's attacks add a bonus stack of [Concentrated Lightning].
When the maximum number of instances has been reached, the [Lightning Rush] effect is applied, and the [Concentrated Lightning] effect is removed.
Duration: Infinite (stacking up to 20 times)

[Lightning Rush] Lightning Rush Effect
2 instances are gained when applying [Lightning Rush].
When the user uses Crackling Thunder, it consumes 1 instance(s) of the the [Lightning Rush] effect and increases Skill Damage by 150%.
Duration: Infinite`,`Decreases the cooldown of Crackling Thunder by 20%.`,`Crackling Thunder increases Wind damage by 30%.
Crackling Thunder's area of effect increases by 20%.
Crackling Thunder's charging distance increases by 50%.
Crackling Thunder's damage increases by 150%.`],
    },
    {
      id: 15,
      element: "Wind",
      weapon: "Pumpkin",
      weaponName: "Spooky Pumpkin",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/3bd06979854f40edafc3c47f6641b858.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/901eb72d7d7b470bb7e38a3ab822bc51.webp"],
      color: "#32CD32",
      releaseDate: "10 October 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/2b6b64c68bf540bda758c776dc8062d8.webp",
            description: `Jinwoo uses a soul-infused pumpkin to hit the enemy.

Stage 1 Damage: 104-128.64% of Jinwoo's Attack
Stage 2 Damage: 108-133.59% of Jinwoo's Attack
Stage 3 Damage: 116-143.48% of Jinwoo's Attack
・Deals Wind elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/d2dcb805189541f0ae1c9ef39ac0c862.webp",
            description: `Jinwoo grabs a bunch of candy and throws it with all his might.

Damage: 470-581.36% of Jinwoo's Attack
・Deals Wind elemental damage.`
          },
          {
            skillName: "Peek-a-boom",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/2b6b64c68bf540bda758c776dc8062d8.webp",
            description: `Jinwoo places explosive pumpkins in front of himself at a blinding speed, then detonates them.

Damage: 1320-2019.6% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Wind elemental damage`
          },
        ], 
      advancement:[`When the user uses Peek-a-boom it applies between 1 instances and 10 instances of the [Pumpkin Candy] effect.
When the Spooky Pumpkin weapon's Stage 3 Basic Attack lands, it applies 1 instances of the [Pumpkin Candy] effect.
When 10 instances of the [Pumpkin Candy] effect have been applied, it applies the [Trick or Treat!] effect.

[Pumpkin Candy] Pumpkin Candy Effect

Increases Wind damage by 1%.
Duration: Infinite (stacking up to 10 times)

[Trick or Treat!] Trick or Treat! Effect

Removes instances of the [Pumpkin Candy] effect and prevents the target from gaining more.
Increases the user's Wind elemental damage by 10%.
Increases the user's damage dealt by 10%.
Duration: 10 second(s)`,`When the user uses Peek-a-boom it has a 50% chance to activate their Core Attack
When the Core Attack hits, it activates 2 instances of the [Pumpkin Candy] effect.`,`Increases Wind damage by 10%.`,`When the user uses Peek-a-boom, it activates an additional 3 instances of the [Pumpkin Candy] effect.
The [Trick or Treat!] effect is also enhanced.

[Trick or Treat!] Trick or Treat! Effect

Removes instances of the [Pumpkin Candy] effect and prevents the target from gaining more.
Increases the user's Wind elemental damage by 20%.
Increases the user's damage dealt by 20%.
Duration: 10 second(s)`,`Decreases the cooldown of Peek-a-boom by 20%.`,`When the user uses Peek-a-boom there is a 100% chance to activate their Core Attack.
When the Spooky Pumpkin weapon's Stage 3 Basic Attack lands it decreases the cooldown of Peek-a-boom by 2 second(s).
When the Spooky Pumpkin weapon's Core Attack lands, it decreases the cooldown of Peek-a-boom by 2 second(s).`],
    },
    {
      id: 16,
      element: "Light",
      weapon: "Staff",
      weaponName: "Divine Quarterstaff",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/1398710a620e471298065899213e0616.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/637d5f39edf44bf3bad2e9c06e5bff0a.webp"],
      color: "#FFFF00",
      releaseDate: "28 November 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/0b8a7f533bdf45a0a5cd1663a0f00213.webp",
            description: `Jinwoo quickly swings the quarterstaff.

Stage 1 Damage: 198-244.91% of Jinwoo's Attack
Stage 2 Damage: 202-249.86% of Jinwoo's Attack
Stage 3 Damage: 210-259.76% of Jinwoo's Attack
・Deals Light elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/e438fe3dfad34403beeb55349764654d.webp",
            description: `Jinwoo perfoms a powerful upward swing.

Damage: 430-531.88% of Jinwoo's Attack
・Deals Light elemental damage.
・When the final hit lamds, it inflicts the [Airborne] effect on the target.`
          },
          {
            skillName: "Heavenly Order Strike",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/28c27ca2534d461caca3db6b1b119a6a.webp",
            description: `Jinwoo releases concentrated mana power into the Divine Quarterstaff and strikes down powerfully.

Damage: 2178-3332.34% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Light elemental damage`
          },
        ], 
      advancement:[`Heavenly Order Strike can be charged up to Stage 3, and when each stage is charged, it activates the [Mana Power Concetration] effect.
If the user uses Dash while the skill is charging, it decreases the cooldown of Heavenly Order Strike by 18 second(s) and then removes the [Mana Power Concetration] effect.

[Mana Power Concetration] Mana Power Concetration Effect

Increases the damage of Heavenly Order Strike by 100% (stacking up to 3 times).
The effect is removed after attacking with Heavenly Order Strike.`,`When the user uses Heavenly Order Strike while having 3 instances of the Mana Power Concentration effect applied, it activates the [Divine Quarterstaff Drop] effect.

[Divine Quarterstaff Drop] Divine Quarterstaff Drop Effect

Creates a giant Divine Quarterstaff that deals damage equal to 800% of the user's Attack.`,`Increases Light damage by 10%.`,`Heavenly Order Strike can be charged up to Stage 5, and when each stage is charged, it activates an instance of the [Mana Power Concentration] effect.
[Mana Power Concentration] can now stack up to 5 times.
A [Shield] effect becomes active while charging is taking place.
If 5 instances have stacked, the [Mana Power Concentration] effect has activated, and the user is hit while charging, Heavenly Order Strike is activated instantly.

[Shield] Shield Effect

Gain a [Shield] equal to 50% of the user's Max HP.
After Heavenly Order Strike is fnished charging, this effect is removed.`,`Decreases the cooldown of Heavenly Order Strike by 20%.`,`When the Mana Power Concentration effect has stacked 5 times, the damage of the [Divine Quarterstaff Drop] effect increases by 150%
Dimensional Advancement`],
    },
    {
      id: 17,
      element: "Light",
      weapon: "Spear",
      weaponName: "Gold-tailed Fox",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/df4779c7e9694f77940e5d74d3849778.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/aeb46f1cb6464db1b2a031dfbf17c2ab.webp"],
      color: "#FFFF00",
      releaseDate: "19 December 2024",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/0b8a7f533bdf45a0a5cd1663a0f00213.webp",
            description: `Jinwoo swings his spear quickly.

Stage 1 Damage: 184-227.6% of Jinwoo's Attack
Stage 2 Damage: 188-232.54% of Jinwoo's Attack
Stage 3 Damage: 193-238.73% of Jinwoo's Attack
・Deals Light elemental damage.
・When the final hit lands, it inflicts the [Airborne] effect on the target.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/b5e3574e2941401691ce79c88eec1254.webp",
            description: `Jinwoo perfoms a powerful upward spear swing.

Damage: 474-586.31% of Jinwoo's Attack
・Deals Light elemental damage.
・When the final hit lands, it inflicts the [Airborne] effect on the target.`
          },
          {
            skillName: "Prelude",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/1de03d506fe54853822b8774d18c0482.webp",
            description: `Jinwoo attacks by swinging his spear towards the enemy in front of him, then quickly moves back and strikes the enemy once more.

Damage: 1225-1874.25% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Light elemental damage
・When the final hit lands, it inflicts the [Airborne] effect on the target.
・When the final hit lands, it applies [Paralyze] to the target.

[Paralyze] Paralyze Effect

This skill interrupts the target.
Duration: 2 second(s).`
          },
        ], 
      advancement:[`When the user enters the stage, they gain 9 instances of the [Fox Tail] effect.
When the user uses the Prelude skill, they gain 1 instance of the [Fox Tail] effect.
If the user successffuly uses Evasion in the middle of charging this skill, it activates the [Extreme Evasion] effect.

[Fox Tail] Fox Tail Effect

Increases the Critical Hit Rate and Critical Hit Damage of Light Basic Skill by 12.5% (stacking up to 1 times).
This effect is removed when the user uses a Light Basic Skill.
Duration: Infinite (stacking up to 9 times)`,`When Prelude hits it activates the [Golden Wound] effect on the target.

[Golden Wound] Golden Wound Effect

When the user attacks a target with the Golden Wound effect applied it increases the user's Light damage by 110%
When the user attacks a target with the [Golden Wound] effect applied, the user recovers 9.99% of their HP 1 time.
Being hit by a Light attack removes this effect.
Duration 9.9 second(s)`,`Increases Light damage by 10%.`,`When [Extreme Evasion] is activated while the user uses Prelude, gains 1 stack of the [Fox Tail].
When the user uses Prelude, gains 1 additional stack of the [Fox Tail] effect and a [Shield].

[Shield] Shield Effect

Gain a [Shield] equal to 12.25% of the user's Max HP.
Duration: 9.9 second(s)`,`Decreases the cooldown of Prelude by 20%.`,`When the user uses Prelude while there are enemies within a 5m rage, they rush forward.
The user's Light damage increases by 20.24% and their Attack increases by 12.25% when they have only Light weapons are equipped.
The [Fox Tail] effect is enhanced.

[Fox Tail] Fox Tail Effect

Increases the Critical Hit Rate and Critical Hit Damage of Light Basic Skill by 20.24% (stacking up to 1 times).
This effect is removed when the user uses a Light Basic Skill.
Duration: Infinite (stacking up to 9 times)`],
    },
    {
      id: 18,
      element: "Water",
      weapon: "Dagger",
      weaponName: "Truth: Kasaka's Venom Fang",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/cdb588f83442402db5a17ce2aa991578.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/33983cc3514f49c1b8e908351b1cf93b.webp"],
      color: "#00BFFF",
      releaseDate: "16 January 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/86874f5def644ff4a8dd76c84b40d3e4.webp",
            description: `Jinwoo swings his daggers quickly and attacks.

Stage 1 Damage: 158-195.44% of Jinwoo's Attack
Stage 2 Damage: 170-210.28% of Jinwoo's Attack
Stage 3 Damage: 178-220.17% of Jinwoo's Attack
・Deals Water
・When the final hit lands, it inflicts the [Airborne] effect on the target.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/715cceacc92746a399a9b3b92df5a21d.webp",
            description: `Jinwoo spins swiftly and swings his daggers.

Damage: 530-655.57% of Jinwoo's Attack
・Deals Water elemental damage.`
          },
          {
            skillName: "Vanishing Shade",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/9a6789deb7bd4a78b9ecec375fbd699b.webp",
            description: `Jinwoo teleports behind the target, strikes down the enemy with a single hand, then deals truly brutal damage to the targets around him.

Damage: 1210-1851.3% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Water elemental damage`
          },
        ], 
      advancement:[`When the user uses Vanishing Shade it creates a [Veil of Poison] around them.

[Veil of Posion] Veil of Posion Effect

Increases the damage of Kasaka's Deadly Poison and Spasms effects on targets within the poisonous zone. (Cooldown: 1 second(s))
Duration: 7 second(s).

[Kasaka's Deadly Poison] Kasaka's Deadly Poison Effect

Deals damage equal to 100% of the user's Attack every 3 second(s).
Decreases the target's HP Recovery Rate by 70%.
Duration: 20 second(s).

[Spasms] Spasms Effect

When the effect has stacked 5 times it activates the Paralyze effect.
Decreases the target's Attack by 3%.
Duration: 3 second(s) (Stacks up to 5 times).

[Paralyze] Paralyze Effect

Interrupts the target.
Duration: 1 second(s).`,`When the user uses Vanishing Strike they gain a [Shield].
Entering the Instance Dungeon activates the [Dungeon Killer] effect.
When the [Title: Wolf Assassin] Blessing Stone is equipped it activates the [Kasaka's Gaze] effect.

[Shield] Shield Effect

Applies a [Shield] equal to 30% of the user's Max HP.
Duration: 10 second(s)

[Dungeon Killer] Dungeon Killer Effect

Increases Critical Hit Rate and Critical Hit Damage by 20%.
Vanishing Shade always deals Water elemental damage as if it's the target's weakness regardless of the target's weakness.
Duration: Infinite

[Kasaka's Gaze] Kasaka's Gaze Effect

Increases damage dealt to bosses by the same amount dealt to Normal Monsters through the [Title: Wolf Assassin] bonus.
Duration: Infinite`,`Increases Water damage by 10%.`,`When the user uses Vanishing Shade, it activates the [Majestic Kasaka] effect.
The [Kasaka's Deadly Poison] effect is enhanced.

[Majestic Kasaka] Majestic Kasaka Effect

Increases Attack 20%.
Duration: 10 second(s)

[Kasaka's Deadly Posion] Kasaka's Deadly Posion Effect

Deals damage equal to 200% of the user's Attack every 3 second(s).
Decreases the target's HP Recovery Rate by 70%.
Duration: 20 second(s).`,`The cooldown of Vanishing Shade decreases by 20%.`,`The damage of Vanishing Shade increases by 200%.`],
    },
    {
      id: 19,
      element: "Fire",
      weapon: "Fan",
      weaponName: "Fan of the Fire Demon",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/e10d04f73a2b43a897932750043e1461.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/7037588448ea4fe18996b8ecca8ae6e4.webp"],
      color: "#FF4500",
      releaseDate: "23 January 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/d3d0e3b827654448b04a2266af0e7e73.webp",
            description: `Jinwoo swings the fan to unleash the power of fire.

Stage 1 Damage: 155-191.72% of Jinwoo's Attack
Stage 2 Damage: 157-194.2% of Jinwoo's Attack
Stage 3 Damage: 160-197.91% of Jinwoo's Attack
・Deals Fire
・When the final hit lands, it inflicts the [Airborne] effect on the target.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/35944b536d224500a5fee12945fb8c9f.webp",
            description: `Jinwoo uses the fan to raze the ground with a sweeping gust of flame.

Damage: 462-571.46% of Jinwoo's Attack
・Deals Fire elemental damage.
・When the skill hits, it inflicts the [Airborne] effect on the target.`
          },
          {
            skillName: "Fleeting Youth and Beauty",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/a1df884bf5534608915b487a1fbe61c6.webp",
            description: `Jinwoo attacks enemies with an explosion of flowers and butterflies made of fire.

Damage: 1409-2155.77% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Fire elemental damage
・When the final hit lands, it inflicts the [Airborne] effect on the target.`
          },
        ], 
      advancement:[`When the user's Core Gauge is at 100% charge the Fire Flower skill becomes the Fleeting Youth and Beauty skill.
When is used, the user and their team members gain 1 instance of the [Butterflies & Blooms] effect.

[Fleeting Youth and Beauty]
Damage and MP Consumption: Same as Fire Flower.
Core Gauge Consumption: 100%
When this skill hits, time slows down.
Deals Heavy Break damage.
When the user's attack pierces a target, there is a floral explosion of searing flame that damages the target.
[Butterflies & Blooms] Butterflies & Blooms Effect

Increases Fire damage by 3%.
Increases MP Recovery Rate by 5%.
Duration: 60 second(s) (stacking up to 6 times)`,`When the user uses their Fire Break Skill the user and their team members gain 1 additional instance of the [Butterflies & Blooms] effect.
When Fire Flower or Fleeting Youth and Beauty hits they inflict the [High Fever] effect on the target.

[High Fever] High Fever Effect
Jinwoo's Fire damage increases by 70% when he hits a target with the [High Fever] effect.
The user regains 10% of their MP 1 time when they hit a target with the [High Fever] effect applied.
Duration: 8 second(s) (stacking up to 1 times)`,`Increases Fire damage by 10%.`,`When the [Butterflies & Blooms] effect has been stacked 6 times, it activates the [Fire Demon] effect. ([Fire Demon] only activates for Sung Jinwoo)

[Fire Demon] Fire Demon Effect
Removes instances of the [Butterflies & Blooms] effect and prevents the user from gaining more.
Increases the user's Fire damage and MP Recovery Rate by 50%.
Increases Critical Hit Rate of the user's Fire Core Skill by 30%.
Increases the Critical Hit Damage of the user's Fire Core Skill by 120%.
When the user uses their Fire Basic Skill they gain [Super Armor] for 4 second(s).
Consumes 5% of the user's MP every 3 second(s).
If the user currently has 20% or less of their maximum MP, it removes the effect.
Duration: Infinite (stacks up to 1 times)`,`Decreases skill cooldown of Fire Flower and Fleeting Youth and Beauty by 20%.`,`The user's Core Gauge starts out charged to 100% when they enter a stage.
When all user's equipped weapons are Fire weapons, their Fire damage increases by 50%.
When the user uses a Fire attack while the [Fire Demon] effect is active they recover 10% of their MP. (Cooldown: 3 second(s))`],
    },
    {
      id: 20,
      element: "Wind",
      weapon: "Sword",
      weaponName: "Stormbringer",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/1042a648537a42c187fa8429edf12d9d.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/5160d61404c44dd79ca374259a25e8f7.webp"],
      color: "#32CD32",
      releaseDate: "27 March 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/b595038c6b474c24b7bb8ebed47f3c08.webp",
            description: `Jinwoo violently swings his broadsword in continuous motion.

Stage 1 Damage: 174-215.23% of Jinwoo's Attack
Stage 2 Damage: 178-220.17% of Jinwoo's Attack
Stage 3 Damage: 183-226.36% of Jinwoo's Attack
・Deals Wind
・When the final hit lands, it [Knocks Down] the target.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/67c4f9fd2705493da7583fe6f240cd9c.webp",
            description: `Jinwoo spins and strikes the surrounding area with his broadsword.

Damage: 623-770.61% of Jinwoo's Attack
・Deals Wind elemental damage.
・When the skill hits, it inflicts the [Airborne] effect on the target.`
          },
          {
            skillName: "Hailstorm",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/e85ce0cdbbfd497d92cfb738947a8bf7.webp",
            description: `Jinwoo deals damage to the enemy by unleashing the power of wind and creating a massive storm.

Damage: 1615-2470.95% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Wind elemental damage
・When the final hit lands, it inflicts the [Airborne] effect on the target.`
          },
        ], 
      advancement:[`[Sealed Power] activates at the start of the stage.

[Sealed Power] Sealed Power Effect
When Jinwoo uses Hailstorm, it doesn't trigger a Critical Hit, but it increases his damage by 120%.
Sung Jinwoo's Precision decreases by 24%
Jinwoo's Attack and Precision increases by 0.8% per 10 Strength (up to 24%).
If Jinwoo's Strength stat is 300 or more, the effect changes to [Awakened Storm].

[Awakened Storm] Awakened Storm Effect
When Hailstorm hits, the whirlwind that was created triggers an effect that pulls enemies in.
When Jinwoo uses Hailstorm, he gains [Super Armor] for 3 second(s).
When Jinwoo uses Hailstorm, it doesn't trigger a Critical Hit, but increases his damage by 200%.
His Attack increases by 30%.
His Precision increases by 5%.
The attack speed of Stormbringer's Basic Attack, Core Attack, and Hailstorm increase significantly.
Duration: Infinite`,`When Hailstorm hits, it activates [Gathering Storm]

[Gathering Storm] Gathering Storm Effect
When the user's Wind Basic Skill hits, it inflicts the [Storm Strike] effect on the target.
Duration: 4 second(s)

[Storm Strike] Storm Strike Effect
The user deals damage equal to 1600% of Attack (Cooldown: 0.5 second(s))
When this effect is active, it triggers [Tempest Mark] on the target.

[Tempest Mark] Tempest Mark Effect
Increases damage taken by 5%.
Increases Wind damage taken by 5%.
Duration: 10 second(s) (stacking up to 2 times)`,`Increases Wind elemental damage by 10%.`,`Using Hailstorm decreases the user's damage taken by 50% for 3 second(s)
Enhances the [Tempest Mark] effect.

[Tempest Mark] Tempest Mark Effect 2
Increases damage taken by 10%.
Increases Wind damage taken by an additional 15%.
Duration: 20 second(s) (stacks up to 2 times).`,`The cooldown of Hailstorm decreases by 20%.`,`The [Storm Strike] effect is enhanced.

[Storm Strike] Storm Strike Effect
Deals damage equal to 3200% of the user's Attack (Cooldown: 0.5 second(s)).
When this effect activates, it triggers the [Tempest Mark] effect on the target.
When this effect activates, Jinwoo recovers 25 of his MP.

[Tempest Mark] Tempest Mark Effect 2
Increases damage taken by 10%.
Increases Wind damage taken by an additional 15%.
Duration: 20 second(s) (stacks up to 2 times).`],
    },
    {
      id: 21,
      element: "Wind",
      weapon: "The Bow",
      weaponName: "Fores's Wish",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/2d5846bd0705409ab3f0e31e217eb294.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/367f35ee691d4d2f9f8accdae024dd15.webp"],
      color: "#32CD32",
      releaseDate: "8 May 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/d6a70615619b4b109d0848ab42fd43da.webp",
            description: `Jinwoo rapidly fires arrows of wind.

Stage 1 Damage: 145-179.36% of Jinwoo's Attack
Stage 2 Damage: 150-185.54% of Jinwoo's Attack
Stage 3 Damage: 156-192.96% of Jinwoo's Attack
・Deals Wind`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/b6a533304eed40d0875d1d2c19b51440.webp",
            description: `Jinwoo fires an arrow imbued with the power of the tress and the wind, dealing overwhelming damage.

Damage: 475-587.54% of Jinwoo's Attack
・Deals Wind elemental damage.`
          },
          {
            skillName: "Wind Tree's Song",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/c5767ba4471e4b019a0eacb9b83cb649.webp",
            description: `Jinwoo creates a gust of wind centered on the hit target, dealing damage across a wide area with a powerful gust of wind.

Damage: 794-1214.82% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Wind elemental damage
・When the first hit lands, it inflicts the [Airborne] effect
・When the final hit lands, it inflicts the [Knock Down] effect.`
          },
        ], 
      advancement:[`When the user's Core Attack hits, it grants the [Wish] effect on the user.

[Wish] Fores's Wish Wish Effect
Increases damage dealt by 20%
When Wind Tree's Song hits, it removes the [Wish] effect.
Duration: 20 second(s).`,`When the user enters the stage, it recharges their Core Gauge by 100%.
Enhances the [Wish] effect
When Wind Tree's Song hits, it grants the [Detached] effect on the user

[Wish] Fores's Wish Wish Effect
Increases damage dealt by 20%
When Wind Tree's Song hits, it has a 100% chance to activate their Core Attack (Cooldown: 20 second(s))
When Wind Tree's Song hits, it removes the [Wish] effect
Duration: 20 second(s)

[Detached] Detached Effect
When the user's Core Attack hits, it resets the cooldown of Wind Tree's Song (Cooldown: 20 second(s))
When the user's Core Attack hits, it removes the [Detached] effect.
Duration: 20 second(s)`,`Increases Wind elemental damage by 10%.`,`The [Wish] effect is enhanced.
The user's Core Attack deals additional damage equal to 500% of their Attack to the first target

[Wish] Fores's Wish Wish Effect
Increases damage dealt by 40%.
When Wind Tree's Song hits, it activates the [Root Dispersion] effect which deals additional damage equal to 100% of the user's Attack to targets across a wide range.
When [Root Dispersion] activates, it inflicts the [Poison] effect on the hit target.
When Wind Tree's Song hits, it has a 100% chance to activate the user's Core Attack (Cooldown: 20 second(s))
When Wind Tree's Song hits, it removes the [Wish] effect.
Duration: 20 second(s)

[Poison] Poison Effect
Deals damage equal to 50% of the user's Attack every 3 second(s).
Decreaes the target's Recovery Rate by 70%.
Duration: 30 second(s)`,`The cooldown of Wind Tree's Song decreases by 20%.`,`Wind Tree's Song damage increases by 50%.
The damage of [Root Dispersion] increases by 150%`],
    },
    {
      id: 22,
      element: "Water",
      weapon: "Slender Shaft",
      weaponName: "Winter Fang",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/8981ed4e4b514b94a0639cca0625433e.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/422e0b682a884b8499cf46f0d61644da.webp"],
      color: "#00BFFF",
      releaseDate: "22 May 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/b692c9a707ea4b35803e34646b8ea455.webp",
            description: `Jinwoo cuts down the enemy by swinging a scythe.

Stage 1 Damage: 160-197.91% of Jinwoo's Attack
Stage 2 Damage: 163-201.62% of Jinwoo's Attack
Stage 3 Damage: 168-207.8% of Jinwoo's Attack
・Deals Water
・When this skill hits, it inflicts the [Airborne] effect`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/78c9c0fa1e59465b9c130e51d660482a.webp",
            description: `Like a wolf's claws raking upward, Jinwoo tears the enemy apart.

Damage: 475-587.54% of Jinwoo's Attack
・Deals Water elemental damage.
・When this skill hits, it inflicts the [Airborne] effect`
          },
          {
            skillName: "Wolf's Shadow",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/c40506cf770a4359a45dd85e09ea0688.webp",
            description: `The mere outline of a wolf's silhouette strikes fear. Jinwoo vanishes in a flash to strike his enemy as if with a wolf's claws.

Damage: 1208-1848.24% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Water elemental damage
・When this skill hits, it inflicts the [Airborne] effect
・The user gains [Super Armor] while using this skill`
          },
        ], 
      advancement:[`When the user equips the [Title: Wolf Assassin] Blessing Stone, it activates the Isolation] effect.
When the user's current Power Gauge is at 10% or higher while using Wolf's Shadow, Wolf's Shadow becomes Wolf's Echo for 7 second(s)

Wolf's Echo
Damage: Same as the Wolf's Shadow
Power Gauge Consumption: 10%
The user gains [Super Armor] while using this skill
The user swings the scythe powerfully, leaving echo wolves on the battlefield

[Isolation] Winter Fang Isolation Effect
Increases damage dealt by 30%
Increases Critical Hit damage by 30%
Duration: Infinite`,`When the user uses Wolf's Echo, the Wolf's Echo skill becomes White Wolf's Night for 7 second(s)
When the user uses a Water elemental skill, their Power Gauge rechargers by 10% (Cooldown: 1 second(s))
When Wolf's Shadow or Wolf's Echo hits, it activates the [Silver Mark] effect on the target (Cooldown: 0.5 second(s))
When the uuser is hit in the air while using White Wolf's Night, it activates Extreme Evasion

White Wolf's Night
Damage: Same as Wolf's Shadow
The user appears to strike the enemy within a moment so still that not even a breath could escape.

[Silver Mark] Winter Fang Silver Mark Effect
Increases the damage of White Wolf's Night by 55%
The user gains [Super Armor] while using this skill
Duration: 10 second(s)`,`Increases Water elemental damage by 10%.`,`When the user enters the stage, their Power Gauge is charged by 50%
Using Wolf's Shadow or Wolf's Echo activates the [Dusk] effect

[Dusk] Winter Fang Dusk Effect
Increases the Critical Hit Rate of Wolf's Shadow, Wolf's Echo, and White Wolf's Night by 15%
Increases the Critical Hit damage of Wolf's Shadow, Wolf's Echo, and White Wolf's Night by 40%
Duration: 10 second(s)`,`The cooldown of Wolf's Shadow decreases by 20%.`,`The Dusk and Silver Mark effects are enhanced

[Dusk] Winter Fang Dusk Effect
Increases the Critical Hit Rate of Wolf's Shadow, Wolf's Echo, and White Wolf's Night by 25%
Increases the Critical Hit damage of Wolf's Shadow, Wolf's Echo, and White Wolf's Night by 80%
Increases Water damage of Wolf's Shadow, Wolf's Echo, and White Wolf's Night by 80%
Duration: 10 second(s)

[Silver Mark] Winter Fang Silver Mark Effect
Increases the damage of White Wolf's Night by 70%
Duration: 10 second(s) (stacking up to 2 times)`],
    },
    {
      id: 23,
      element: "Water",
      weapon: "Orb",
      weaponName: "Allon's Orb",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/48eb641c4f1e4b8185a82fc7304cd4df.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/7847c057b52e44cfaecca884bf8c3e50.webp"],
      color: "#00BFFF",
      releaseDate: "14 August 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/ea73ad5e077e4ccabf8b6fc50ba620fc.webp",
            description: `Jinwoo unleashes the power of water.

Stage 1 Damage: 150-185.4% of Jinwoo's Attack
Stage 2 Damage: 157-194.2% of Jinwoo's Attack
Stage 3 Damage: 167-206.57% of Jinwoo's Attack
・Deals Water elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/77ba13a80af94067814a9c3aef68216e.webp",
            description: `Jinwoo hurls an explosive spear of water.

Damage: 565-698.87% of Jinwoo's Attack
・Deals Water elemental damage.`
          },
          {
            skillName: "Lightning",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/0c46829fec194074b01d5728e56acebf.webp",
            description: `Jinwoo releases the power of the wave sealed within Allon's Orb to create a massive tidal wave.

Damage: 1250-1912% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Water elemental damage.`
          },
        ], 
      advancement:[`Jinwoo's Precision increases by 0.5% (up to 5%) for every 20 Intelligence point(s) he has
Using Dominion Storm grants the user a [Shield] and activates the [Rolling Tide] effect
When Dominion Storm hits it inflicts the [Maelstrom] effect on the target.

[Shield] Shield Effect
Grants the user a shield equal to 10 of the user's Max HP.
Duration: 10 seconds

[Rolling Tide] Allon's Orb Rolling Tide Effect
Increases damage dealt by 10%.
Increases Water damage by 10%
Duration: Infinite

[Maelstrom] Allon's Orb Maelstrom Effect
Increases Water damage taken by 8%.
Duration: 20 seconds`,`For every 10 Intelligence point(s) Sung Jinwoo has, increases Water damage by 1% (up to 20%).
If Sung Jinwoo's Intelligence stat is 200 or higher, activates the [Lunar Drift] effect.

[Lunar Drift] Allon's Orb Lunar Drift Effect
If the user's MP is 41% or higher, increases Water damage by 20%.
If the user's MP is 41% or higher, increases the damage of Water weapon skills by 30%.
Duration: Infinite`,`The user's Water damage increases by 10%`,`The [Rolling Tide] effect is enhanced.
The [Maelstrom] effect is enhanced.

[Rolling Tide] Allon's Orb Rolling Tide Effect
Increases the user's damage dealt by 20%.
Increases the user's Water damage by 20%
When a Water weapon skill hits it, inflicts the [Maelstrom] effect on the target
Duration: 20 seconds

[Maelstrom] Allon's Orb Maelstrom Effect
Increases the target's Water damage taken by 8%.
Duration: 20 seconds (stacking up to 4 times)`,`The cooldown of Dominion Storm decreases by 20%`,`Changes to [Lunar Drift] to [Rising Ride].
When all the user's equipped weapons are Water weapons, it increases their Critical Hit Rate by 10%

Rising Tide Allon's Orb Rising Tide Effect
Increases the user's Water damage by 15%.
Increases the damage of Water weapon skills by 60%
Duration: Infinite`],
    },
    {
      id: 24,
      element: "Fire",
      weapon: "Spear",
      weaponName: "Radiru Clan's Double-edged Spear",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/82a9ac14b3914afd9d3f98a0d520dfcf.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/6eae0dd4a2aa4f0995a00c4c80ba1ee9.webp"],
      color: "#FF4500",
      releaseDate: "9 October 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/240601b552e64688ade70c00435cf046.webp",
            description: `The user swings the double-edged spear.

Stage 1 Damage: 150%-187.54% of Jinwoo's Attack
Stage 2 Damage: 160%-197.91% of Jinwoo's Attack
Stage 3 Damage: 178%-220.17% of Jinwoo's Attack
・Deals Fire elemental damage.
・Deals weak Break damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/f3c90ceb727e44cb97233556bef75e53.webp",
            description: `The user leaps into the air then spins their body to perform consecutive attacks.

Damage: 596%-737.21% of Jinwoo's Attack
・Deals Fire elemental damage.
・Deals weak Break damage.
・When the final hit lands, it inflicts the [Airborne] effect.`
          },
          {
            skillName: "Radiru Clan's Support",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/0ffb7c2cc3804b2fbb8d048ea9147280.webp",
            description: `Jinwoo throws the spear into the air to call for a supporting attack.

Damage: 1238%-1894.14% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Fire elemental damage.
・Deals weak Break damage.
・With the supporting attacks a damaging area of effect activates for 7 second(s) within the zone.
・When the first hit lands, it inflicts the [Airborne] effect.`
          },
        ], 
      advancement:[`Using the Radish Clan's Support skill applies the [Morale] effect on the user 10 times.

[Morale] Radiru Clan's Double-edged Spear Morale Effect
Increases damage dealt by 0.5%.
Duration: Infinite (stacks up to 30 times)`,`When the user hits with a Fire attack it applies 1 [Morale] effect. (It activates only 1 time when the skill hits)
When the user hits with a Fire attack while having 30 instances of the [Morale] effect applied, it activates a small [Support Fire] zone around the target. (Cooldown: 10 second(s))

[Support Fire]
Deals Fire elemental damage equal to 600% of Sung Jinwoo's Attack.
Counts as a Basic Skill.
Deals weak Break damage.`,`The user's Fire damage increases by 10%.`,`When the user's attacks hit a target with the [Burn] effect, they activate the [Burning Will] effect on the user. (Cooldown: 2 second(s))

[Burning Will] Radiru Clan's Double-edged Spear Burning Will Effect
Increases Fire damage by 6%.
Increases Critical Hit damage by 12%.
Duration: 15 seconds (stacks up to 5 times)`,`Decreases Radish Clan's Support cooldown by 20%`,`The attack range of Support Fire increases by 50%, and its cooldown becomes 5 second(s).
When the user's Fire attack hits after equipping all Fire weapons, it activates an additional instance of [Morale]. (When this skill hits, it only activates 1 time)
Enhances the [Morale] effect.

[Morale] Radiru Clan's Double-edged Spear Morale Effect
Increases damage dealt by 1.2%.
Increases Fire Basic Skill damage by 0.5% and Weapon Skills damage by 1%, when all equipped weapons are Fire
Duration: Infinite (stacks up to 30 times)`],
    },
    {
      id: 25,
      element: "Fire",
      weapon: "Sword",
      weaponName: "Ennio's Roar",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/e586c0320d1f4e549b62c11c7c592f20.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/ff3663db0641414faface5e2bb66a938.webp"],
      color: "#FF4500",
      releaseDate: "25 September 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/66026f9445424097950f24281b5cd075.webp",
            description: `Jinwoo swings a sword imbued with Ennio's power.

Stage 1 Damage: 180%-222.65% of Jinwoo's Attack
Stage 2 Damage: 200%-247.39% of Jinwoo's Attack
Stage 3 Damage: 209%-258.52% of Jinwoo's Attack
・Deals Fire elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/e203fc099e6d4b9283a2f0693062adef.webp",
            description: `When the user raises the sword to strike Ennio's power is released.

Damage: 616%-761.95% of Jinwoo's Attack
・Deals Fire elemental damage.`
          },
          {
            skillName: "Pitch-Black Rage",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/de8924a4126649c58ef844bd28abf8e4.webp",
            description: `After gathering Ennio's strength, Jinwoo jumps towards the enemy and strikes down powerfully.

Damage: 2977%-4554.81% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Fire elemental damage`
          },
        ], 
      advancement:[`When the Pitch-black Rage hits and the [Burn] effect is active on the target, the effect increases the damage by 10%
When the user uses Pitch-black Rage it activates the [Burning Grudge] effect

Burning Grudge Ennio's Roar Burning Grudge Effect
Increases damage taken by 5%.
Increases Fire damage by 15%.
Increases damage dealt to boss by 10%.
Increases Pitch-black damage by 100%.
Duration: Infinite`,`Increases Defense Penetration by 16% when equipping all Fire weapons.
Using Pitch-black Rage activates the [Brand of the Adversary] effect on the boss and Elite monsters that are within a 20m range.
When Pitch-black Rage hits while [Brand of the Adversary] is active on the target, it activates the Ennio's Rage] effect.

[Ennio's Rage]
Summons a meteor from the sky to attack the target.
Damage: 1000% of Attack

[Brand of the Adversary] Ennio's Roar Brand of the Adversary Effect
Increases Pitch-black Rage damage by 50%.
Removes the effect when Pitch-black Rage hits.
Duration: 3 second(s)`,`The user's Fire damage increases by 10%`,`When Pitch-black Rage hits and the [Burn] effect is active on the target it increases damage by an additional 25%.
Enhances the [Burning Grudge] effect.

[Burning Grudge] Ennio's Roar Burning Grudge Effect
Increases damage taken by 5%.
Increases Fire damage by 15%.
Increases damage dealt to boss by 10%.
Increases Pitch-black Rage damage by 100%.
Duration: Infinite`,`Decreases Pitch-black Rage cooldown by 20%`,`Using a Fire weapon skill increases the user's Fire weapon skill damage by 50% for 2.5 second(s) to targets with the [Burn] effect
Increases Ennio's Rage damage
Enhances the [Brand of Adversary] effect

[Ennio's Rage]
Summons a meteor from the sky to attack the target.
Damage: 2000% of Attack

[Brand of the Adversary] Ennio's Roar Brand of the Adversary Effect
Increases Pitch-black Rage damage by 100%.
Removes the effect when Pitch-black Rage hits.
Duration: 3 second(s)`],
    },
    {
      id: 26,
      element: "Light",
      weapon: "Sword",
      weaponName: "Hero's Sword",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/ce91aa4cf74a4c8db22c80c4b9f5daa4.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/d8d61688a28f41ce829ea7947e351d77.webp"],
      color: "#FFFF00",
      releaseDate: "23 October 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/5b7a20aff09f4279af4ed8b686805d7a.webp",
            description: `Jinwoo swings his one-handed sword.

Stage 1 Damage: 154-190.49% of Jinwoo's Attack
Stage 2 Damage: 190-235.02% of Jinwoo's Attack
Stage 3 Damage: 217-268.41% of Jinwoo's Attack
・Deals Light elemental damage.
・When the final hit lands, it [Knocks Down] the target.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/20ee884b544647ebaa8b70dad30386f7.webp",
            description: `Jinwoo focuses his power into the one-handed sword and slashes horizontally.

Damage: 550-680.31% of Jinwoo's Attack
・Deals Light elemental damage.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
          {
            skillName: "Peacebringer Sword",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/06069d7384b7403e9fe977370bd4fa99.webp",
            description: `Jinwoo slashes the target multiple times at blinding speed.

Damage: 2098-3209.94% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Light elemental damage.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
        ], 
      advancement:[`The [Undying Resolve] effect activates when the user enters a stage.
When Peacebringer Sword hits, the damage of Light Weapon Skills increases by 45% for 15 second(s).

[Undying Resolve] Hero's Sword Undying Resolve Effect
Increases Light damage by 25%
Decreases Skill Mana Consumption by 20%
Duration: Infinite`,`When the user enters the stage, activates the [Outstanding Perception] effect.

[Outstanding Perception] Hero's Sword Outstanding Perception Effect
Increases Precision by 5%
Increases Critical Hit Rate by 5%
Increases Critical Hit damage by 5%
Duration: Infinite`,`The user's Light damage increases by 10%`,`The [Hero's Will] effect activates when the user enters a stage.
When Peacebringer Sword hits a target with a [Shield], its damage dealt increases by 20% for 15 second(s).

[Hero's Will] Hero's Sword Hero's Will Effect
When Peacebringer Sword hits, it deals Heavy Break damage
The user gains [Super Armor] while using Peacebringer Sword
Duration: Infinite`,`Peacebringer Sword cooldown decreases by 20%`,`Using the Peacebringer Sword slows down time for 2 second(s) and activates the [Demon King-slaying Sword] effect

[Demon King-slaying Sword] Hero's Sword Demon King-slaying Sword Effect
Increases damage dealt to bosses by 50%
Increases Light damage dealt by 35%
Increases Ultimate Skill damage dealt by 50%
Duration: 8 second(s)`],
    },
    {
      id: 27,
      element: "Light",
      weapon: "Sword",
      weaponName: "Phantomblade",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/d5bd3be4b2d2427585c73818957d03f3.png"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/d902218ab4954ddda7bc318e8e726fb2.webp"],
      color: "#FFFF00",
      releaseDate: "18 December 2025",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/225433ff576d4dc6921d0dedad0bc576.png",
            description: `Jinwoo draws his sword with tremendous
speed.
Stage 1 Damage: 190.49% of Jinwoo's Attack
Stage 2 Damage: 235.02% of Jinwoo's Attack
Stage 3 Damage: 268.41% of Jinwoo's Attack
· Deals Light elemental damage.
. When this skill hits, it inflicts the [Airborne]
effect.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/92b9ebdaf138443c8df9e86d15596524.png",
            description: `Jinwoo draws his blade, slashes through the
enemy, and creates phantom blades that
attack nearby enemies.
Damage: 405.71% of Jinwoo's Attack
· Deals Light elemental damage
. When this skill hits, it inflicts the [Airborne]
effect on the target`
          },
          {
            skillName: "Phantom Spirit Slash",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/81a476c07e494c0aba6909e0d41883b4.png",
            description: `In a split second, Jinwoo swiftly slashes
through the enemy and ends the move with a
finishing sheath technique.
Damage: 628.83% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 57
· Deals Light elemental damage
. When this skill hits, it inflicts the [Airborne]
effect on the target`
          },
        ], 
      advancement:[`The [Projection] effect is activated when the
user enters a stage
The [Lumina] effect activates when all the
user's equipped weapons are Light weapons
After using Phantom Spirit Slash, it changes
to Phantom Chain Slash

[Phantom Chain Slash]
Launches a swift blade of energy at the
enemy.
Damage and MP Consumption: Same as
Phantom Spirit Slash
Can be used up to 3 times
After the skill is used, it will transform back to
Phantom Spirit Slash after a certain amount of time or after being used the max number
of times

[Projection]
Increases Attack by 5%
Increases Speed by 5%
Duration: Infinite
[Lumina]
Increases Light damage by 5%
Increases Critical Hit damage by 10%
Duration: Infinite`,`When Phantom Spirit Slash lands as a Critical
Hit it increases the usage count of Phantom
Chain Slash by 2 (Phantom Chain Slash can be
used up to 5 times)
Using Phantom Spirit Slash activates [Echoing
Light]
The user gains [Super Armor] while using
Phantom Chain Slash
[Echoing Light]
Increases Critical Hit Rate by 5%
Increases Critical Hit damage by 10%
Duration: 7 second(s)`,`Increases Light damage by 10%`,`Using Phantom Spirit Slash activates the
[Phantom] effect
The [Projection] effect is enhanced

[Phantom]
Increases Phantom Chain Slash damage
by 100%
When the damage taken is 5% or more
of the user's Max HP. the Camouflage When the damage taken is 5% or more
of the user's Max HP, the Camouflage
effect is activated for 4.5 second(s)
Duration: 4.5 second(s)

[Projection]
Increases Attack by 10%
Increases Speed by 10%
Duration: Infinite`,`The Phantom Spirit Slash cooldown decreases
by 20%`,`If the user has 50% of their MP or less, their
MP Consumption decreases by 25%
The [Echoing Light] effect is enhanced
Each time Phantom Spirit Slash is used, the
damage of Phantom Chain Slash increases by
25% (stacks up to 10 times)
[Echoing Light]
Increases Critical Hit Rate by 10%
Increases Critical Hit damage by 20%
Increases damage dealt by 10%
Duration: 7 second(s)`],
    },
    {
      id: 28,
      element: "Dark",
      weapon: "Shotgun",
      weaponName: "Winchester Roke",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/40ea7b5fb48a4dbe956db422799c60bd.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/d69f471ff9be49b395760ad5c873a6ec.webp"],
      color: "#9b5de5",
      releaseDate: "19 February 2026",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/3d229100c9064d37bed980359b9b9d96.webp",
            description: `Jinwoo fires consecutive shots.

Stage 1 Damage: 187-231.31% of Jinwoo's Attack
Stage 2 Damage: 214-264.7% of Jinwoo's Attack
Stage 3 Damage: 264-326.55% of Jinwoo's Attack
・Deals Dark elemental damage.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/e5a427c27f224624996a3985ebf27b30.webp",
            description: `Jinwoo fires a shot imbued with special power.

Damage: 884-1093.45% of Jinwoo's Attack
・Deals Dark elemental damage.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
          {
            skillName: "Doomsday",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/b29c629d67cd49abb1b5af4a1778e97c.webp",
            description: `Jinwoo reloads and fires special rounds that explode in succession.

Damage: 1638-2506.14% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Dark elemental damage.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
        ], 
      advancement:[`Using [Doomsday] activates [Rotary Reload]

[Rotary Reload] Winchester Roke Rotary Reload Effect
Activates the user's Core Attack
Changes the Winchester Roke's Core Attack to Condemn and increases its damage by 20%
Condemn can be used up to 2 times while the [Rotary Reload] effect is active
Duration: 4 second(s)`,`The users [Doomsday] damage dealt to targets within a 5m range increases by 100%
Enhances [Rotary Reload]

[Rotary Reload] Winchester Roke Rotary Reload Effect
Activates the user's Core Attack
Changes the Winchester Roke's Core Attack to Condemn and increases its damage by 40%
Condemn can be used up to 3 times while the [Rotary Reload] effect is active
Duration: 5 second(s)`,`The user's Dark damage increases by 10%`,`Using [Doomsday] activates [Ready or Not]

[Ready or Not] Winchester Roke Ready or Not Effect
Increases Condemn's Dark damage by 15%
Increases Condemn's Critical Hit damage by 30%
The user gains [Super Armor]
Duration: 6 second(s)`,`[Doomsday] skill cooldown decreases by 20%`,`The [Rotary Reload and Ready or Not] skills are enhanced

[Rotary Reload] Winchester Roke Rotary Reload Effect
Activates the user's Core Attack
Changes the Winchester Roke's Core Attack to Condemn and increases its damage by 80%
Increases Condemn's Overload damage by 70%
Condemn can be used up to 4 times while the [Rotary Reload] effect is active
Duration: 6 second(s)

[Ready or Not] Winchester Roke Ready or Not Effect
Increases Condemn's Dark damage by 30%
Increases Condemn's Critical Hit damage by 60%
The user gains [Super Armor]
Duration: 6 second(s)`],
    },
    {
      id: 29,
      element: "Dark",
      weapon: "Key",
      weaponName: "Transfiguration Key",
      weaponImg:["https://resources.vortexgaming.io/upload/post/2026/05/15/34e10dcea956429c86d42a4b39dbf7cc.webp"],
      weaponImg2:["https://resources.vortexgaming.io/upload/post/2026/05/15/896aa0511ca94528832dd48aa09e7ebb.webp"],
      color: "#9b5de5",
      releaseDate: "19 February 2026",
      rarity:"SSR",
       skills: [
      
          {
            skillName: "Basic Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/41f3fc34ba7b49349b5469787ff468ad.webp",
            description: `Jinwoo attacks the enemy by summoning the Morphbeast's fist.

Stage 1 Damage: 170-210.28% of Jinwoo's Attack
Stage 2 Damage: 186-230.07% of Jinwoo's Attack
Stage 3 Damage: 230-284.49% of Jinwoo's Attack
・Deals Dark elemental damage.
・Applies a Weak Elemental Accumulation effect.
・When the final hit lands, it [Knocks Down] the target.`
          },
          {
            skillName: "Core Attack",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/de65f5e13f1c405594b044397b6a4824.webp",
            description: `Jinwoo warps the area to pull enemies in, then triggers an explosion.

Damage: 636-786.69% of Jinwoo's Attack
・Deals Dark elemental damage.
・Applies a Weak Elemental Accumulation effect.
・When this skill hits, it inflicts the [Airborne] effect.`
          },
          {
            skillName: "Morphbeast Strike",
            skillImg: "https://resources.vortexgaming.io/upload/post/2026/05/15/64f3508a42854c779f6f259a2776fc9f.webp",
            description: `The Morphbeast rampages, wiping out enemies.

Damage: 1142-1747.26% of Jinwoo's Attack
Cooldown: 25 sec
MP Consumption: 200-229
・Deals Dark elemental damage.
・Applies a Heavy Elemental Accumulation effect.
・When the final hit lands, it [Knocks Down] the target.`
          },
        ], 
      advancement:[`Using Morphbeast Strike restores 100% of the user's Core Gauge and activates the [Morphbeast Gaze] effect

[Morphbeast's Erratic Flux]
Deals Dark elemental damage equal to 900% of Jinwoo's attack
Count's as a Core Attack

[Morphbeast's Gaze] Transfiguration Key Morphbeast's Gaze Effect
Using a Dark Core Attack activates [Morphbeast's Erratic Flux] in front of the user (Cooldown: 2 second(s))
Duration: 15 second(s)`,`When all the user's equipped weapons are Dark-element weapons, the [Morphbeast's Essence] effect activates

[Morphbeast's Essence] Transfiguration Key Morphbeast's Essence Effect
Increases Dark Overload Damage by 10%
Increases the [Dark] [Elemental Accumulation] by 20%
Duration: Infinite`,`The user's Dark damage increases by 10%`,`Activating [Morphbeast's Erratic Flux] activates [Energy of Transfiguration]

[Energy of Transfiguration] Transfiguration Key Energy of Transfiguration Effect
Increases Dark Core Attack and Weapon Skill damage by 15%
Increases the Critical Hit Rate of Dark Core Attack and Weapon Skill by 3%
Increases the Critical Hit damage of Dark Core Attack and Weapon Skill by 10%
Duration: 10 second(s) (stacks up to 2 times)`,`Morphbeast's Strike's cooldown decreases by 20%`,`The [Morphbeast's Essence and Energy of Transfiguration] effects are enhanced

[Morphbeast's Essence] Transfiguration Key Morphbeast's Essence Effect
Increases Dark Overlord damage by 20%
Increases the [Dark] [Elemental Accumulation] effect by 40%
When the [Dark] [Overlord] effect is activated, Dark Weapon Skill damage increases by 100% for 3 second(s) and the number of times the [Energy of Transfiguration] has stacked becomes 5 (Cooldown: 15 second(s))
Duration: Infinite

[Energy of Transfiguration] Transfiguration Key Energy of Transfiguration Effect
Increases Dark Core Attack and Weapon Skill damage by 15%
Increases the Critical Hit Rate of Dark Core Attack and Weapon Skill by 3%
Increases the Critical Hit damage of Dark Core Attack and Weapon Skill by 10%
Duration: 15 second(s) (stacks up to 5 times)`],
    },
   
]