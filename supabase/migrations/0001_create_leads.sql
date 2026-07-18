-- Contact form / quote request submissions.
-- Insert-only from the server (service_role key, via app/api/contact/route.ts).
-- No client-side reads or writes are permitted — see RLS below.
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  phone text,
  service_of_interest text not null,
  message text not null,
  source_page text
);

-- Enable RLS with no policies for anon/authenticated: default-deny for every
-- client-side operation (select/insert/update/delete). The service_role key
-- used by the API route bypasses RLS entirely, so server-side inserts are
-- unaffected. This is what actually makes "writes only go through the API
-- route" true, rather than just a convention nobody enforces.
alter table leads enable row level security;
