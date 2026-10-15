Admin panel & Supabase integration

Overview

This repo now includes serverless endpoint templates and a React admin UI scaffold which integrate with a Supabase/Postgres backend.

What was added (scaffold):
- /api/admin-register.js        (serverless function template to create initial admin)
- /api/auth-login.js            (serverless function template to login admin)
- /scripts/supabase-schema.sql  (DDL to create required tables)
- /src/admin/AdminPanel.tsx     (React scaffold for admin UI and CRUD)

Important notes

- I cannot create the Supabase project or provide credentials. Please create a Supabase project and run the migrations (see below).
- For production, use proper JWT auth and secure hashing (bcrypt). The templates use a simple HMAC-based hash for scaffolding only.

Supabase setup (quick):
1. Create a Supabase project at https://app.supabase.com/.
2. Create a Postgres DB (default).
3. Go to Project Settings -> API and copy: SUPABASE_URL and SERVICE_ROLE key.
4. Run the SQL in supabase-schema.sql (repo root) in Supabase SQL editor to create tables.
5. In Vercel project settings, add env vars:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - HASH_SECRET (a long random string)
6. Deploy to Vercel. The /api/* functions will run as serverless endpoints.

Local dev

- To test locally, use the Supabase project details and set env vars in a .env file for the dev server.

Security

- This scaffold is a starting point. Before going to production swap to secure JWT signing, bcrypt password hashing, role checks and use Row Level Security in Supabase.

If you confirm, I will wire client-side AdminPanel routes and add basic CRUD calls to the new endpoints next.