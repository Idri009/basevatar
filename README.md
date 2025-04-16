# Basevatar

Basevatar is a collaborative Web3 art platform where users collectively create, vote, and mint unique pixel art NFTs on the BASE network.

## Features

-   **Collaborative Drawing:**

    -   Each day, up to 100 users can contribute their own pixel art to a shared canvas using a web-based, mobile-friendly drawing interface.
    -   The drawing grid and available color palette are determined by the previous day's community vote, ensuring a fresh creative challenge daily.
    -   Each user is limited to one submission per day, and all submissions are combined into a single collective artwork at the end of the day.

-   **Voting System:**

    -   Users can vote (using ETH) for the next day's theme (e.g., "Space", "Nature", "Cyberpunk") and the color palette.
    -   Voting is open for a set period each day, and the results directly determine the creative constraints for the following day.
    -   The voting process is transparent, and the cost to vote is configurable by the platform admin.

-   **Minting:**

    -   At the end of each day, all submitted pixel art is programmatically merged into a single, unique artwork.
    -   This collective piece is automatically minted as an NFT on the BASE network.
    -   Users can view, collect, and purchase these NFTs directly from the platform, with full on-chain provenance.

-   **Slack Integration:**
    -   The platform includes a Slack bot for admins and contributors.
    -   The bot sends notifications about daily themes, voting results, and minting status.
    -   Admins can use Slack commands to manage settings, review submissions, and trigger manual actions if needed.

## Tech Stack

-   **Monorepo Management:** Turborepo
-   **Frontend:** Next.js, React, Tailwind CSS, ConnectKit, Wagmi, Web3
-   **Backend:** Node.js, Prisma, PostgreSQL
-   **Blockchain:** BASE network, Ethereum smart contracts
-   **Other:** Slack Bolt, AWS S3 for image storage, Cron jobs for daily automation

## Getting Started

This project uses [Turborepo](https://turbo.build/) for monorepo management. To get started, follow these steps:

1. **Install dependencies for all apps and packages:**

```bash
npm install
```

2. **Set up environment variables:**

-   Copy the example `.env.example` files in each app (`apps/web`, `apps/cronjob`, `apps/slack`) to `.env` and fill in the required values.

3. **Run all apps in development mode:**

```bash
npx turbo run dev
```

-   This will start the web frontend, cronjob, and Slack bot (if configured) concurrently.
-   You can also run a specific app with:
    -   `npx turbo run dev --filter=web`
    -   `npx turbo run dev --filter=cronjob`
    -   `npx turbo run dev --filter=slack`

4. **Access the web app:**

-   Open [http://localhost:3000](http://localhost:3000) in your browser to view the frontend.

5. **Project structure:**

-   `apps/web`: Next.js frontend
-   `apps/cronjob`: Scheduled jobs and automation
-   `apps/slack`: Slack bot and integrations
-   `packages/database`: Shared database client and Prisma schema

## Project Structure

-   `apps/web`: Next.js frontend application
-   `apps/cronjob`: Scheduled jobs for daily image processing and Slack notifications
-   `apps/slack`: Slack bot commands and integrations
-   `packages/database`: Prisma ORM and database client

## Environment Variables

### apps/web

-   `NEXTAUTH_SECRET`: Secret for NextAuth.js session encryption.
-   `NEXT_PUBLIC_PROJECT_ID`: WalletConnect project ID for Web3 wallet integration.
-   `ADMIN_WALLET_ADDRESS`: Admin wallet address for privileged actions.
-   `NEXT_PUBLIC_CONTRACT_ADDRESS`: Deployed NFT contract address on BASE network.
-   `NEXT_PUBLIC_VOTE_PRICE`: ETH price for voting.
-   `NEXT_PUBLIC_LOCALSTORAGE_KEY`: Key for client-side local storage.
-   `LOCALSTORAGE_KEY`: Key for server-side local storage or session.
-   `SLACK_BOT_TOKEN`: Slack bot token for notifications or integrations.
-   `NEXT_PUBLIC_BASE_URL`: Public base URL of the web app.
-   `UPLOAD_OUTPUT_API_KEY`: API key for uploading output files.
-   `AWS_BUCKET_NAME`: AWS S3 bucket name for image uploads.
-   `AWS_REGION`: AWS region for S3 bucket.
-   `AWS_ACCESS_KEY_ID`: AWS access key for S3.
-   `AWS_SECRET_ACCESS_KEY`: AWS secret access key for S3.
-   `AWS_S3_URL`: S3 bucket URL for image uploads.

### apps/cronjob

-   `SLACK_BOT_TOKEN`: Slack bot token for sending notifications or messages.
-   `SERVER_URL`: Base URL of the web server (used for API calls or callbacks).
-   `UPLOAD_OUTPUT_API_KEY`: API key for uploading output files.
-   `AWS_S3_URL`: AWS S3 bucket URL for storing images or outputs.
-   `TIMEZONE`: Timezone setting for scheduling cron jobs (e.g., Etc/UTC).

### apps/slack

For a full list of available Slack bot commands, see the [Slack Commands Documentation](https://github.com/enesyukselx/basevatar/blob/main/apps/slack/commands.md).

-   `PORT`: Port number for the Slack bot server.
-   `SLACK_BOT_TOKEN`: Slack bot token for command handling and notifications.
-   `SLACK_APP_TOKEN`: Slack app-level token for real-time messaging and events.
-   `SLACK_SIGNING_SECRET`: Slack signing secret for request verification.
-   `AWS_S3_URL`: AWS S3 bucket URL for storing images or outputs.
-   `TIMEZONE`: Timezone setting for scheduling or logging (e.g., Etc/UTC).

### packages/database

-   `DATABASE_URL`: Database connection string for Prisma.

> Each app/package may require additional environment variables depending on custom features or integrations. Refer to the respective app's documentation or code for further details.

## License

MIT
