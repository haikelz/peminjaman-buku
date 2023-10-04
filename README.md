<div align="center">
  <h1>peminjaman-buku</h1>
  <p>peminjaman-buku is a simple book lending system.</p>
</div>

## Features

- Multirole auth login guest and admin (with github, google, or credentials).
- Book recommendations(random pick).
- CRUD operations.
- Search the books that user want.
- Save the user data who lend a/the book to Supabase and display it into a table in `/list-users` page(only admin who can access this page).
- Show the user profile.
- Export the users list to CSV format and only admin who can download it.

## Getting Started

- Clone this project, install all dependencies with `pnpm install`.
- First, you will need to setup your OAuth Github App. Go to create one, and grab your Github Id and Github Secret, fill it in `NEXT_PUBLIC_GITHUB_ID` and `NEXT_PUBLIC_GITHUB_SECRET`.
- Setup your Google Cloud Project. Grab your Google Id and Google Secret, fill it in `NEXT_PUBLIC_GOOGLE_ID` and `NEXT_PUBLIC_GOOGLE_SECRET`.
- Setup your new Supabase Project and grab the Supabase Url and Supabase Key, fill it in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_KEY`.
- After that, fill the remaining variables.

```
- CREDENTIAL_ADMIN_USERNAME=<your_admin_username>
- CREDENTIAL_ADMIN_PASSWORD=<your_admin_password>
- DEVELOPMENT_URL=<your_development_url>
- PRODUCTION_URL=<your_production_url>
- ADMIN_ID=<your_admin_id>
- ADMIN_EMAIL=<your_used_email_for_admin>
```

- After you fill all the needed env variables, run the project by typing `pnpm run dev`.
- Go to `http://localhost:3000` and see the result.
- By the way, the default username and password for admin role is: **username = pak_dengklek**, **password = 102938**

## Tech Stack

- Next JS 13
- Tailwind CSS with [Tail Dashboard](https://github.com/TailAdmin/free-nextjs-admin-dashboard)
- Jotai

## Screenshots

![ss 1](/public/images/docs/ss-1.png)

![ss 2](/public/images/docs/ss-2.png)

![ss 3](/public/images/docs/ss-3.png)

![ss 4](/public/images/docs/ss-4.png)

![ss 5](/public/images/docs/ss-5.png)

![ss 6](/public/images/docs/ss-6.png)

![ss 7](/public/images/docs/ss-7.png)

![ss 8](/public/images/docs/ss-8.png)

## Supports

- [Github Sponsor](https://github.com/sponsors/haikelz)
- [Trakteer](https://trakteer.id/haikelz/tip)

## License

MIT
