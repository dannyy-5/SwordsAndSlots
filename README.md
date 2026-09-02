# Slots & Daggers

**Slots & Daggers** is a self-contained, browser-playable rogue-like slot machine. Spin for coins, take calculated risks, build a loadout, and use dagger charge to fight bosses in the Black Vault.

## Play Online

Once GitHub Pages is enabled for this repository, play at [dannyy-5.github.io/Dagger-](https://dannyy-5.github.io/Dagger-/). The included GitHub Actions workflow publishes the game automatically whenever `main` changes.

## How to Play

1. Open the [live game](https://dannyy-5.github.io/Dagger-/), or open `index.html` locally.
2. Set your wager with the `-` and `+` controls. Wagers range from 1 to 25 coins.
3. Select **SPIN REELS**. The wager is removed immediately, then the three reels resolve.
4. Build your coin balance through matching symbols. Turn on **AUTO** to keep spinning until you run out of coins or unlock a target.
5. Each dagger on a spin adds one point of Dagger Charge. Collect three points to unlock a monster.
6. In the Dagger Den, press **STRIKE** or the `Space` key to damage the boss. **GUARD** gives you coins but does not damage the target.
7. Defeat the boss to collect its bounty, reset your charge, and continue the run.
8. Use **DOUBLE OR NOTHING** to double a winning payout, at the cost of doubling a losing wager.
9. Complete the daily contract, choose a class, buy shop items, equip relics, and forge upgrades between spins.

## Payouts

| Result | Payout |
| --- | ---: |
| Three daggers | +100 coins and a den unlock |
| Three stars | 2x wager |
| Three gems | 3x wager |
| Three crowns | 5x wager |
| Three suns | 8x wager |
| Any pair | Return of your wager |

Risk mode doubles a successful payout. A failed risky spin loses an additional wager.

The three dagger reward takes priority over the regular matching-symbol payout. Every spin also appears in the **Recent Events** field notes.

## Features

- Fully playable slot machine with animated reels and wager controls.
- Five symbol types with distinct payouts and readable result messaging.
- Auto-spin mode that stops when you are broke or combat begins.
- Dagger Den combat loop with four escalating bosses, health bars, strikes, guards, and bounty rewards.
- Three character classes: Assassin, Gambler, and Knight, each with a different advantage.
- Relic loadout, shop items, forge upgrades, wild Lucky Coin events, risk wagering, and daily contracts.
- Persistent run stats for coins, best balance, spins, and enemies defeated.
- Reset Run control, keyboard strike shortcut, sound effects with mute control, toast notifications, and a built-in field manual.
- Fixed one-page command-center layout with no document scrolling, including compact desktop and narrow-screen modes.
- No build tools, package manager, or server required. GitHub Pages serves the three source files directly from this folder.

## Project Files

- `index.html` contains the accessible game structure and help dialog.
- `styles.css` contains the responsive visual system, reel animation, and layout.
- `script.js` contains the slot resolution, payout rules, combat state, and controls.
- `.github/workflows/deploy-pages.yml` publishes the root folder to GitHub Pages on pushes to `main`.