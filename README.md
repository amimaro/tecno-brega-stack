# Remix Tecnobrega Stack

![The Remix Tecnobrega Stack](https://raw.githubusercontent.com/amimaro/files/main/remix-tecno-brega-stack.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix --template amimaro/tecno-brega-stack
```

If you are curious. 
- [What is tecno brega?](https://en.wikipedia.org/wiki/Tecno_brega)
- [What it sounds?](https://www.youtube.com/watch?v=gmQ3Yp2rizM)

## What's in the stack

- Authentication with [Supabase](https://supabase.com) and managed by [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage). Authentication methods available:
  - Email and Password
- End-to-end testing with [Cypress](https://cypress.io)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

- Initial Setup:

Copy `.env.example` file to `.env`.

Create a new [Supabase](https://supabase.com/) project and go to the project API settings to fill the variables below.

```
SERVER_URL=http://localhost:3000 # must have http:// or https://
SESSION_KEY="{SESSION_KEY}"
SESSION_SECRET="{SESSION_SECRET}"
SUPABASE_ANON_KEY="{ANON_KEY}"
SUPABASE_URL="https://{YOUR_INSTANCE_NAME}.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="{SERVICE_ROLE_SECRET}"
```

- Setup Stack Schema

This schema has Supabase common profile settings notes table and policies for this stack example.

1. Go to the "SQL" section.
2. Click "New Query".
3. Copy the [example schema](https://gist.github.com/amimaro/c39df54adea5b2e9cba1693c13877cd9).
4. Paste it and click "Run".

Then go to the "Authentication" panel and click at "Policies" and enable RLS for the notes table.

The starter project should be working now.

Your can run `npm run cy:run` or `yarn cy:run` to check if all tests have passed.

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

### Relevant code:

This is a simple starter template with Supabase authentication and a notes CRUD example.

For now it just have email and password authentication but it is in future plans to integrate with other methods of authentication provided by Supabase.

- creates cookie-based session [./app/session.server.ts](./app/session.server.ts)
- provides supabase clients [./app/supabase.server.ts](./app/supabase.server.ts)
- authentication helpers and validators [./app/auth.server.ts](./app/auth.server.ts)

Other funcionalities can be found at the [routes folder](./app/routes) like:

- create account
- password forgot/reset
- logout

## Deployment

This Remix Stack comes with a script that handles deploying your app to production.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  flyctl auth signup
  ```

- Add the environment variables to your fly app secrets, to do this you can run the following command using `.env` variables:

  ```sh
  flyctl secrets set [COPY .env and paste here]
  ```

- Run the script below to deploy
 
   ```sh
  npm run deploy
  ```

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/integration` directory to test your changes.

To run these tests in development, run `npm run cy:open`

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
