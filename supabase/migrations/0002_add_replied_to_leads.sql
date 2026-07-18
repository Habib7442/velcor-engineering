-- Lets an admin mark a lead as followed up on, directly in the Supabase
-- Table Editor (renders as a checkbox for a boolean column). Not written
-- to by app code — app/api/contact/route.ts only inserts new leads, so
-- every new row starts at the default (false / not replied).
alter table leads add column if not exists replied boolean not null default false;
