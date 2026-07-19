# Supabase schema

This folder is the version-controlled source of truth for the project's database schema — every table this app touches should have a corresponding numbered file in `migrations/`, in the order it needs to run.

No Supabase CLI project is linked here yet (no `supabase/config.toml`), so the workflow for now is manual:

## How to apply a migration

1. Open your Supabase project → **SQL Editor**.
2. Open the migration file (e.g. `migrations/0001_create_leads.sql`), copy its contents, paste into a new query, and run it.
3. Migrations use `create table if not exists` so they're safe to re-run — running one against a database that already has the table is a no-op for the table itself, but statements like `alter table ... enable row level security` will still apply (also safe to re-run).

## Current migrations

| File | What it does |
|---|---|
| `0001_create_leads.sql` | Creates the `leads` table (contact form / quote request submissions) and enables RLS with no client-facing policies — the table is only reachable via the `service_role` key from `app/api/contact/route.ts`. |
| `0002_add_replied_to_leads.sql` | Adds a `replied boolean not null default false` column so an admin can tick it off in the Table Editor once a lead's been followed up on. App code never writes to it — new rows just get the default. |
| `0003_create_job_applications.sql` | Creates the `job_applications` table (Careers page resume submissions) with RLS enabled and no client-facing policies — same posture as `leads`, only reachable via `service_role` from `app/api/careers/apply/route.ts`. Includes a `reviewed` boolean for the same manual-triage workflow as `leads.replied`. |
| `0004_create_resumes_bucket.sql` | Creates the private (`public = false`) `resumes` Storage bucket. No object in it is ever reachable via a public URL — uploads happen server-side only. |

## If you want real CLI-managed migrations later

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db pull        # sync this folder with the current remote schema
npx supabase db push        # apply local migration files to the remote database
```

`npx supabase` works here without a global install (verified: resolves to v2.109.1). This path requires a Supabase personal access token — optional, not required for the manual SQL Editor workflow above.

## Adding a new table

1. Create `migrations/000N_<description>.sql`, one migration per logical change.
2. Include RLS: every table here should get `alter table <name> enable row level security;`. If the app only ever reads/writes it via the server (service-role key), that's the entire RLS story — no policies needed. If a table ever needs anon/authenticated client access, add explicit `create policy` statements and re-read the RLS section of the `supabase` skill first (`.claude/skills/supabase`) — there are several silent-failure traps (missing `WITH CHECK` on UPDATE policies, `auth.role()` being deprecated, etc.).
3. Update the table above.
