# AnemiaSense — Build Instructions

## Pinned versions

| Component | Version |
|-----------|---------|
| Node.js | 20 LTS (tested with 24.17.0) |
| npm | 10+ (tested with 11.13.0) |
| JDK | 17 (required by Capacitor 6 / Gradle) |
| Capacitor | 6.2.0 |
| Android minSdk | 24 |
| Android targetSdk | 34 |
| Vite | 5.4.x |
| React | 18.3.x |

---

## Local build

### Prerequisites

- **Node.js 20+** and **npm**  
- **JDK 17** — run `java -version` to confirm  
- **Android Studio** (includes Android SDK 34 and Gradle) **or** Android command-line tools with SDK 34

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Build the web app
npm run build

# 3. Sync to the Android project
npx cap sync android

# 4. Build a debug APK
cd android
./gradlew assembleDebug          # Mac / Linux
gradlew.bat assembleDebug        # Windows

# 5. The APK ends up at:
#    android/app/build/outputs/apk/debug/app-debug.apk
```

### Copy to dist-apk (optional convenience)

```bash
mkdir -p dist-apk
cp android/app/build/outputs/apk/debug/app-debug.apk dist-apk/AnemiaSense-demo.apk
```

> **Note:** The APK is debug-signed — fine for demo and testing.  
> Never claim an APK exists in `dist-apk/` unless it was actually built.

---

## Dev server (browser preview)

```bash
npm run dev
```

Open `http://localhost:5173` and set your browser window to **360 × 800** (mobile viewport) for the intended look.

---

## Cloud build (GitHub Actions)

1. Push the project to a GitHub repository.
2. The workflow at `.github/workflows/build-apk.yml` runs automatically on push to `main` or `master`, and can also be triggered manually from the **Actions** tab → **Build AnemiaSense APK** → **Run workflow**.
3. After the job completes, download the APK from the **Artifacts** section of the workflow run (retained for 30 days, named **AnemiaSense-demo**).

> This lets you build the APK without installing Android Studio locally.

---

## Install APK on a phone

1. **Enable Developer Options**: Settings → About phone → tap **Build number** 7 times.
2. **Allow unknown apps**: Settings → Apps → Special app access → Install unknown apps → allow your file manager or browser.
3. Transfer `AnemiaSense-demo.apk` to the phone (USB, cloud drive, ADB, etc.).
4. Open the file on the phone and tap **Install**.
5. Launch **AnemiaSense** from the home screen.

---

## Capacitor Android project (first time only)

If the `android/` folder is not present (e.g. fresh clone), run:

```bash
npm install
npm run build
npx cap add android
npx cap sync android
```

Then apply any `AndroidManifest.xml` customisations listed in `src-android-patches/` (portrait lock, camera permission, etc.) before building.
