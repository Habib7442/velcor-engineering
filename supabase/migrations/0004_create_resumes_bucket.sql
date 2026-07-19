-- Private Storage bucket for resume uploads from the Careers page.
-- public = false: no object in this bucket is reachable via a public
-- URL. Uploads happen server-side only (service_role key, via
-- app/api/careers/apply/route.ts) -- storage.objects is RLS-governed
-- like any other table, and the service_role key bypasses it, so no
-- storage policies are needed here (same "zero client-facing
-- policies" posture as `leads` and `job_applications`).
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;
