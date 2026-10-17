# Barangay Legaspi QA demo residents

This private transfer bundle generates up to 100 **fictional** resident profiles for the local-only QA sandbox. Names, contact values, addresses, dates, and household values are synthetic; emails use the reserved `.test` domain and addresses are clearly marked as QA samples.

## Generate the sample

From this repository:

```powershell
npm install
npm run generate
```

By default this writes `demo-residents.json` with 100 synthetic residents. To choose another count (maximum 100) or output path:

```powershell
npm run generate -- --count 25 --out demo-residents.json
```

## Create local QA login accounts

Clone the BarangayLegaspi application repository and follow its local QA instructions. Pass the generated fixture to the local-only launcher:

```powershell
npm run qa -- --demo-data "C:\path\to\barangay-legaspi-qa-demo\demo-residents.json"
```

The application seeds these profiles only into its isolated local QA JSON store. It generates unique random passwords and writes the credentials to `server/data/qa-demo-credentials.csv` in the application workspace. Deliver that file privately to the tester, never commit it, and delete it after transfer. The launcher refuses `DATABASE_URL`; do not use these profiles against production or any shared database.

## Security and use

- This repository contains no passwords, tokens, real resident data, or production database information.
- Keep repository visibility private when transferring the bundle.
- The QA app binds only to `127.0.0.1`; the tester must run it locally.
- Do not publish the generated credential CSV or expose the local service with a public tunnel.
