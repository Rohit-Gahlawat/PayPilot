# bank-server

A **dummy bank** for local development. There is no real bank to talk to, so this stands in for one: it takes a request, waits a **random amount of time**, and then answers back with a **random Success / Failed** result — just like a real bank that takes a while to make up its mind.

It is a stateless Express service (no database). It only forwards results back to `bank-webhook`, which owns all the actual money logic.

---

## What it does

It exposes two endpoints that the rest of the system calls:

| Endpoint | Called by | It calls back |
|----------|-----------|---------------|
| `POST /onramp` | `user-app` (`addMoney`) | `bank-webhook` → `/hdfcwebhook` |
| `POST /payout` | `bank-sweeper` | `bank-webhook` → `/user/withdrawal` or `/merchant/withdrawal` |

For both, the flow is the same:

1. It replies `202 processing` **immediately** (so nobody is left waiting on a slow bank).
2. After a random delay it picks a random `Success` / `Failed` and **calls `bank-webhook` back** with that result.

`bank-webhook` then credits/settles or refunds the money. So this service never touches the database — it just plays the role of the bank.

`/payout` uses a `kind` field (`"user"` or `"merchant"`) to know which withdrawal webhook to call back.

---

## Why respond immediately instead of waiting?

If the dummy bank held the connection open for the whole delay, `addMoney` would turn into a slow synchronous wait and the sweeper would stall on every withdrawal. Instead it answers right away and notifies later — the same "reserve now, settle later" idea the rest of the app is built on.

## Project structure

```
src/index.ts   # the two endpoints: /onramp and /payout
```

## Running it

```bash
cd apps/bank-server
npm run dev     # builds with esbuild, then runs on port 3004
```

## Environment variables

Create `apps/bank-server/.env` with:

- `BANK_WEBHOOK_URL` — where to call back (defaults to `http://localhost:3003`)
- `BANK_MIN_DELAY_MS` — smallest random delay before answering (default `3000`)
- `BANK_MAX_DELAY_MS` — largest random delay before answering (default `10000`)
- `BANK_FAILURE_RATE` — chance a request fails, `0`–`1` (default `0.15`)

Turn `BANK_FAILURE_RATE` up to test the refund path, or the delays down to make testing faster.
