# AnemiaSense Demo Guide

> Use this guide when presenting AnemiaSense at a pitch or recording a demo video.

---

## Before you start

1. Open the app (web: `npm run dev` at 360 × 800; or install the APK on a phone).
2. The app starts with a 1.5 s splash screen and goes to **Login**.
3. All data resets cleanly with **Reset demo data** in any role's Profile tab.

---

## Scenario 1: Clear + Possible (standard workflow)

Shows the full end-to-end flow from screening to follow-up.

| Step | What to do |
|------|-----------|
| 1 | **Sign in** as **School staff**. |
| 2 | Tap **Start screening** → select **AS-2026-00125** (Grade 4). |
| 3 | **Before you start**: tap **Continue**. |
| 4 | **Demo setup**: leave defaults (**Clear**, **Possible**) → **Continue to camera**. |
| 5 | Point the camera and tap the **shutter**. Quality check passes. Tap **Analyze**. |
| 6 | Result: **Possible anemia risk** → **Done** → **Saved**. |
| 7 | Go to **Sync** tab → switch **Simulate connection** to **Online** → **Sync now**. |
| 8 | **Sign out** → log in as **Health worker**. |
| 9 | AS-2026-00125 is at the top of the **Possible** tab with **Pending review**. |
| 10 | Tap the row → **Refer to health partner** → fill details → **Submit referral** → **Send**. |
| 11 | Referral ID shown: **REF-2026-0031**. Tap **View tracker**. |
| 12 | Tap the referral → select **Anemia confirmed** → **Record result** → **Mark followed up**. |

---

## Scenario 2: Blurry + Higher (retake demo)

Shows the quality-fail / retake path and the priority Higher result.

| Step | What to do |
|------|-----------|
| 1 | **Sign in** as **School staff** (or tap **Screen next pupil** if still logged in). |
| 2 | **Start screening** → select any unscreened pupil → **Continue**. |
| 3 | **Demo setup**: choose **Blurry** + **Higher** → **Continue to camera**. |
| 4 | Tap the **shutter**. Quality check **fails** — blurred thumbnail, fail message. |
| 5 | Tap **Retake photo**. Brackets turn **green** on the retake. Tap the shutter again. Quality check **passes**. |
| 6 | Result: **Higher screening risk** → **Done** → Sync → Health worker: appears first in the **Higher** tab. |

---

## Scenario 3: Clear + Low (no health worker action)

Shows that Low results do not appear in the health worker's queue.

| Step | What to do |
|------|-----------|
| 1 | **Sign in** as **School staff** → **Start screening** → pick a pupil → **Continue**. |
| 2 | **Demo setup**: choose **Clear** + **Low** → **Continue to camera** → shutter → **Analyze**. |
| 3 | Result: **Low screening risk**, status **No review needed**. |
| 4 | Sync. Sign in as **Health worker** — this pupil does **not** appear in any tab. |

---

## Profile switches

| Switch / Button | Where | Default | Effect |
|-----------------|-------|---------|--------|
| **Demo setup screen** | Staff → Profile | **On** | When **Off**, the Demo setup screen is skipped and defaults (Clear, Possible) are used automatically |
| **Reset demo data** | Any role → Profile | — | Restores all seed pupils, screenings, and referrals; clears the sync queue |

---

## Seed data at a glance

**Staff — pupils to screen:** AS-2026-00125 (Gr 4), AS-2026-00134 (Gr 3), AS-2026-00135 (Gr 5), AS-2026-00136 (Gr 2).

**Health worker — pre-loaded records (visible immediately):**

| Pupil | Grade | Risk | Status |
|-------|-------|------|--------|
| AS-2026-00131 | 4 | Higher | Pending review |
| AS-2026-00118 | 3 | Higher | Referred (REF-2026-0027) |
| AS-2026-00122 | 4 | Possible | Reviewed, no action |
| AS-2026-00109 | 2 | Possible | Referred (REF-2026-0028) |
| AS-2026-00104 | 5 | Higher | Confirmed (REF-2026-0025) |
| AS-2026-00098 | 6 | Possible | Followed up (REF-2026-0022) |

---

## Disclaimers (always visible in the app)

> AnemiaSense is a **screening aid, not a diagnosis**. Only a health professional can confirm anemia.

> This is a **prototype demo**. The AI result is simulated. No photos are saved or uploaded.
