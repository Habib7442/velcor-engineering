-- Resume / job application submissions from the Careers page.
-- Insert-only from the server (service_role key, via
-- app/api/careers/apply/route.ts). No client-side reads or writes --
-- same posture as `leads`. resume_path points into the private
-- `resumes` Storage bucket (see 0004_create_resumes_bucket.sql).
create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  role_of_interest text,
  message text,
  resume_path text not null,
  resume_filename text not null,
  reviewed boolean not null default false
);

-- Enable RLS with no client-facing policies: default-deny for anon/
-- authenticated. The service_role key bypasses RLS entirely, so the
-- API route is unaffected.
alter table job_applications enable row level security;
