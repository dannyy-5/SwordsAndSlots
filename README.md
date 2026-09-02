# Slots & Daggers

**Slots & Daggers** is a self-contained, browser-playable rogue-like slot machine. Spin for coins, hunt for dagger symbols, and use your charge to fight monsters in the Dagger Den.

## Play Online

Once GitHub Pages is enabled for this repository, play at [dannyy-5.github.io/Dagger-](https://dannyy-5.github.io/Dagger-/). The included GitHub Actions workflow publishes the game automatically whenever `main` changes.

## How to Play

1. Open the [live game](https://dannyy-5.github.io/Dagger-/), or open `index.html` locally.
2. Set your wager with the `-` and `+` controls. Wagers range from 1 to 25 coins.
3. Select **SPIN REELS**. The wager is removed immediately, then the three reels resolve.
4. Build your coin balance through matching symbols. Turn on **AUTO-SPIN** to keep spinning until you run out of coins or unlock a target.
5. Each dagger on a spin adds one point of Dagger Charge. Collect three points to unlock a monster.
6. In the Dagger Den, press **STRIKE** or the `Space` key to damage the monster. **GUARD** gives you 10 coins but does not damage the target.
7. Defeat the monster to collect its bounty, reset your charge, and continue the run.

## Payouts

| Result | Payout |
| --- | ---: |
| Three daggers | +100 coins and a den unlock |
| Three stars | 2x wager |
| Three gems | 3x wager |
| Three crowns | 5x wager |
| Three suns | 8x wager |
| Any pair | Return of your wager |

The three dagger reward takes priority over the regular matching-symbol payout. Every spin also appears in the **Recent Events** field notes.

## Features

- Fully playable slot machine with animated reels and wager controls.
- Five symbol types with distinct payouts and readable result messaging.
- Auto-spin mode that stops when you are broke or combat begins.
- Dagger Den combat loop with three escalating enemies, health bars, strikes, guards, and bounty rewards.
- Persistent run stats for coins, best balance, spins, and enemies defeated.
- Reset Run control, keyboard strike shortcut, live event log, toast notifications, and a built-in field manual.
- Responsive layout that works on desktop and mobile.
- No build tools, package manager, or server required. GitHub Pages serves the three source files directly from this folder.

## Project Files

- `index.html` contains the accessible game structure and help dialog.
- `styles.css` contains the responsive visual system, reel animation, and layout.
- `script.js` contains the slot resolution, payout rules, combat state, and controls.
- `.github/workflows/deploy-pages.yml` publishes the root folder to GitHub Pages on pushes to `main`.