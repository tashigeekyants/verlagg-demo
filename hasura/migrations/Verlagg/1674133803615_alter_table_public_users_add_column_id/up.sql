CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."users" add column "id" uuid
 null default gen_random_uuid();
