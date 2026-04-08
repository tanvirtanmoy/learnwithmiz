# Payment System Documentation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
├─────────────────────────────────────────────────────────────────┤
│  /pricing          → Choose plan, click CTA                     │
│  /checkout/success  → Confirmation page (display only)          │
│  /checkout/cancel   → Retry page                                │
│  /billing           → Student self-service billing lookup        │
│  /admin             → Mizuki's admin dashboard                  │
└────────┬───────────────────────────────┬────────────────────────┘
         │                               │
         ▼                               ▼
┌──────────────────┐          ┌────────────────────┐
│ API Routes       │          │ Stripe Hosted       │
│                  │          │ Checkout            │
│ POST /api/stripe │──────▶   │ (payment/           │
│   /checkout      │          │  subscription mode) │
│ POST /api/stripe │          └─────────┬───────────┘
│   /webhook       │◀─────────────────┘
│ POST /api/stripe │          Stripe Webhooks
│   /portal        │
│ GET  /api/admin  │
│   /students      │
│ GET  /api/billing│
│   /[email]       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ PostgreSQL + Prisma │
│                     │
│ Students            │
│ Enrollments         │
│ BillingProfiles     │
│ PaymentRecords      │
│ LessonBookings      │
│ ProcessedWebhookEvents │
└─────────────────────┘
```

### Key Design Decisions
- **No pre-registration required**: Student records are created from Stripe webhook events
- **Webhook-only activation**: The success page is for display only; actual enrollment happens via verified webhook events
- **Idempotent webhooks**: `ProcessedWebhookEvent` table prevents duplicate processing
- **Fixed installment plan**: Stripe Subscription Schedule auto-cancels after 3 months
- **Bilingual**: Japanese (default) and English, using the existing i18n system

---

## Stripe Dashboard Setup

### 1. Create Products and Prices

Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)

#### Product: Personal Dutch Course (12 Lessons)
- **Name**: パーソナルオランダ語コース (12回) / Personal Dutch Course
- **Description**: 1-on-1 Dutch lessons with Mizuki for Japanese learners

#### Price 1: One-time Payment
- **Amount**: €180.00 (EUR)
- **Type**: One-time
- Copy the Price ID → set as `STRIPE_PRICE_ID_FULL_PAYMENT`

#### Price 2: Monthly Installment
- **Amount**: €60.00 (EUR)
- **Type**: Recurring → Monthly
- Copy the Price ID → set as `STRIPE_PRICE_ID_MONTHLY_INSTALLMENT`

### 2. Customer Portal Configuration

Go to [Stripe Dashboard → Settings → Customer Portal](https://dashboard.stripe.com/settings/billing/portal)

Configure:
- ✅ Allow customers to update payment methods
- ✅ Allow customers to view invoice history
- ❌ Do NOT allow subscription plan changes
- ❌ Do NOT allow subscription cancellation (to prevent accidental cancellation)

Copy the Configuration ID → set as `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID`

### 3. Webhook Endpoint

Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)

#### For Production:
- **Endpoint URL**: `https://yourdomain.com/api/stripe/webhook`
- **Events to listen for**:
  - `checkout.session.completed`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Copy the Signing Secret → set as `STRIPE_WEBHOOK_SECRET`

---

## How the 3-Month Auto-Stop Works

The installment plan uses Stripe's native Subscription Schedule feature:

1. **Checkout**: User completes checkout in `subscription` mode (€60/month)
2. **Webhook receives `checkout.session.completed`**: Our handler:
   - Creates the enrollment and billing profile
   - Calls `attachSubscriptionSchedule(subscriptionId)`
3. **`attachSubscriptionSchedule`**:
   - Creates a `SubscriptionSchedule` from the existing subscription
   - Sets a single phase: start_date → start_date + 3 months
   - Sets `end_behavior: 'cancel'`
4. **Result**: Stripe automatically cancels the subscription after 3 billing cycles

The student **never** needs to manually cancel. After 3 payments:
- Subscription ends automatically
- Billing profile status updates to `paid_in_full`
- Enrollment remains active until the 6-month course expiry date

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/learnwithmiz?schema=public"

# Stripe Keys (from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Webhook Secret (from Stripe CLI or Dashboard)
STRIPE_WEBHOOK_SECRET="whsec_..."

# Price IDs (from Stripe Dashboard → Products)
STRIPE_PRICE_ID_FULL_PAYMENT="price_..."
STRIPE_PRICE_ID_MONTHLY_INSTALLMENT="price_..."

# Customer Portal (optional)
STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID=""

# App
APP_BASE_URL="http://localhost:3000"

# Admin
ADMIN_SECRET="change-me-in-production"
```

---

## Database Schema

See `prisma/schema.prisma` for the full schema. Key models:

| Model | Purpose |
|-------|---------|
| `Student` | Name, email, locale |
| `Enrollment` | Course access, lessons used/remaining, expiry |
| `BillingProfile` | Stripe IDs, payment status, installments count |
| `PaymentRecord` | Individual payment events, linked to Stripe events |
| `LessonBooking` | Lesson scheduling (future use) |
| `ProcessedWebhookEvent` | Idempotency tracking |

### Run migrations:
```bash
npx prisma migrate dev --name init
```

---

## API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/stripe/checkout` | Create Stripe Checkout Session |
| POST | `/api/stripe/webhook` | Handle Stripe webhook events |
| POST | `/api/stripe/portal` | Create Customer Portal session |
| GET | `/api/admin/students` | List all students (admin) |
| GET | `/api/billing/[email]` | Get billing summary for student |

---

## Pages

| Route | Purpose |
|-------|---------|
| `/pricing` | Pricing page with plan selection, policies, and CTAs |
| `/checkout/success` | Post-payment confirmation page |
| `/checkout/cancel` | Checkout abandonment page |
| `/billing` | Student self-service billing lookup |
| `/admin` | Mizuki's admin dashboard |

---

## Local Testing Instructions

### 1. Set up PostgreSQL

```bash
# Using Docker:
docker run --name learnwithmiz-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=learnwithmiz -p 5432:5432 -d postgres:16

# Or use any local PostgreSQL instance
```

### 2. Install dependencies and set up database

```bash
npm install
cp .env.example .env
# Edit .env with your Stripe API keys and database URL

npx prisma migrate dev --name init
npx prisma generate
```

### 3. Set up Stripe CLI for local webhooks

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
# Login:
stripe login

# Forward webhooks to local server:
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copy the webhook signing secret (whsec_...) and add to .env as STRIPE_WEBHOOK_SECRET
```

### 4. Create Stripe test products

```bash
# Create one-time price
stripe prices create \
  --currency eur \
  --unit-amount 18000 \
  -d "product_data[name]=Personal Dutch Course (One-time)"

# Create recurring price
stripe prices create \
  --currency eur \
  --unit-amount 6000 \
  --recurring-interval month \
  -d "product_data[name]=Personal Dutch Course (Monthly)"

# Copy the price IDs to .env
```

### 5. Run the development server

```bash
npm run dev
```

### 6. Test the flow

1. Go to `http://localhost:3000/pricing`
2. Click a checkout button
3. Use a test card (see below)
4. Check the success page
5. Check the admin page at `http://localhost:3000/admin`

---

## Test Cards

| Scenario | Card Number | CVC | Expiry |
|----------|-------------|-----|--------|
| Successful payment | 4242 4242 4242 4242 | Any 3 digits | Any future date |
| Requires authentication | 4000 0025 0000 3155 | Any 3 digits | Any future date |
| Payment declined | 4000 0000 0000 0002 | Any 3 digits | Any future date |
| Insufficient funds | 4000 0000 0000 9995 | Any 3 digits | Any future date |
| iDEAL (Netherlands) | Use test bank "Simulated" in Stripe Checkout | | |

### Test Scenarios

1. **One-time payment success**: Use 4242... → should create student + enrollment + billing profile (paid_in_full)
2. **Installment payment success**: Use 4242... → should create subscription, schedule, first installment
3. **Checkout abandonment**: Start checkout, click back → should show cancel page, no records created
4. **Duplicate checkout**: Same email, second checkout → should detect existing enrollment, skip duplicate
5. **Payment failure (installment)**: 
   - Trigger with `stripe trigger invoice.payment_failed`
   - Should mark enrollment as payment_issue, visible in admin
6. **Subscription auto-cancel**: After 3 payments, subscription should auto-cancel via schedule
7. **Customer updates payment method**: Via Customer Portal link on billing page

---

## Edge Cases Handled

| # | Edge Case | How It's Handled |
|---|-----------|-----------------|
| 1 | User opens checkout but never pays | No webhook → no records created |
| 2 | User retries checkout | Duplicate enrollment check in webhook handler |
| 3 | Duplicate webhook deliveries | `ProcessedWebhookEvent` table tracks event IDs |
| 4 | Month-2 payment fails | Marks `payment_issue`, visible in admin, no auto-revoke |
| 5 | Month-3 payment fails | Same as #4 |
| 6 | Customer updates payment method | Handled via Stripe Customer Portal |
| 7 | All 3 installments paid, lessons remaining | Access continues until 6-month expiry |
| 8 | All 12 lessons completed early | Enrollment can be marked `completed` by admin |
| 9 | 6-month expiry with unused lessons | Enrollment expires naturally |
| 10 | Duplicate course purchase attempt | Existing active enrollment check prevents duplicates |
| 11 | Refund needed | Manual process — admin handles via Stripe Dashboard |

---

## File Structure

```
src/
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   ├── stripe.ts              # Stripe SDK instance
│   ├── course-config.ts       # Course config, pricing, policies (bilingual)
│   ├── stripe-checkout.ts     # Checkout session creation, subscription schedule
│   └── webhook-handlers.ts    # All webhook event processors
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts   # POST: Create checkout session
│   │   │   ├── webhook/route.ts    # POST: Stripe webhook handler
│   │   │   └── portal/route.ts     # POST: Customer portal session
│   │   ├── admin/
│   │   │   └── students/route.ts   # GET: Admin student list
│   │   └── billing/
│   │       └── [email]/route.ts    # GET: Student billing lookup
│   ├── pricing/page.tsx            # Pricing page with policies
│   ├── checkout/
│   │   ├── success/page.tsx        # Post-payment confirmation
│   │   └── cancel/page.tsx         # Checkout abandonment
│   ├── billing/page.tsx            # Student billing self-service
│   └── admin/page.tsx              # Mizuki's admin dashboard
├── i18n/dictionaries/
│   ├── ja.ts                       # Japanese translations (updated)
│   └── en.ts                       # English translations (updated)
├── generated/prisma/               # Prisma generated client
prisma/
└── schema.prisma                   # Database schema
```

---

## Production Deployment (Vercel + Neon)

### Infrastructure
- **Hosting**: Vercel (auto-deploys from Git push)
- **Database**: Neon Serverless Postgres (Frankfurt, EU region — Free tier)
- **Payments**: Stripe (test mode with `sbx_` / sandbox keys)
- **Domain**: `learnwithmiz.nl`

### Vercel Environment Variables Required

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Auto-set by Neon integration |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | From Stripe Dashboard → API Keys |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Dashboard → Webhooks → endpoint signing secret |
| `STRIPE_PRICE_ID_FULL_PAYMENT` | Price ID for one-time €180 payment |
| `STRIPE_PRICE_ID_MONTHLY_INSTALLMENT` | Price ID for recurring €60/month |
| `STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID` | From Stripe Dashboard → Customer Portal settings |
| `APP_BASE_URL` | `https://learnwithmiz.nl` |
| `ADMIN_SECRET` | Password for admin dashboard access |

### Production Webhook
- **Endpoint**: `https://learnwithmiz.nl/api/stripe/webhook`
- **Events**: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`

### Database Migration (Production)
After first deploy, run against the Neon database:
```bash
DATABASE_URL="your-neon-connection-string" npx prisma migrate deploy
```

### Switching to Live Payments
1. Create live prices in Stripe Dashboard (switch out of test mode)
2. Update Vercel env vars with live Stripe keys + new price IDs
3. Create a new webhook endpoint pointing to production URL with live signing secret
4. Redeploy

---

## Technical Notes (Stripe v22 + Prisma v7)

### Stripe SDK v22 ("dahlia" API)
- API version: `2026-03-25.dahlia`
- **Breaking change**: `invoice.subscription` moved to `invoice.parent?.subscription_details?.subscription`
- **Breaking change**: `invoice.payment_intent` no longer directly on Invoice object
- Helper function `getSubscriptionIdFromInvoice()` in `webhook-handlers.ts` handles the new path

### Prisma v7
- `PrismaClient` must be initialized with either `adapter` or `accelerateUrl` — no default driver
- We use `@prisma/adapter-pg` with the `PrismaPg` adapter class
- Import path: `@/generated/prisma/client` (not `@/generated/prisma`)
- The `prisma generate` step runs in both `postinstall` and `build` scripts
- `prisma.config.ts` at project root configures schema path and datasource

### Sandbox Keys (sbx_ prefix)
- Stripe's newer naming for test-mode keys (replaces `sk_test_` / `pk_test_`)
- Functionally identical to `sk_test_` keys — fully supports test payments, webhooks, etc.

---

## Validation Checklist (TODO)

After deployment, run through these steps to verify the payment system works end-to-end:

### Pre-checks
- [ ] Vercel deployment shows green checkmark (Ready)
- [ ] `https://learnwithmiz.nl/pricing` loads with two pricing cards (€180 one-time, €60/month)

### Payment Flow Test
- [ ] Click the €60/month button → redirected to Stripe Checkout
- [ ] Complete payment with test card `4242 4242 4242 4242` (expiry: `12/29`, CVC: `123`)
- [ ] Redirected to `/checkout/success` after payment

### Webhook Verification
- [ ] Check Stripe Dashboard → Developers → Webhooks → your endpoint
- [ ] `checkout.session.completed` event shows green checkmark (200 response)
- [ ] If error: click the event to see response body / error message

### Admin Dashboard
- [ ] Visit `https://learnwithmiz.nl/admin?secret=YOUR_ADMIN_SECRET`
- [ ] Test student appears with enrollment and payment details

### Billing Page
- [ ] Visit `https://learnwithmiz.nl/billing`
- [ ] Enter the test email used during checkout
- [ ] Student data, enrollment status, and payment history display correctly
- [ ] "Manage Payment Methods" button opens Stripe Customer Portal

### Debug: If webhook fails
1. Check Stripe Dashboard → Webhooks → endpoint → event attempts for error codes
2. Check Vercel → project → Function Logs for server-side errors
3. Verify `STRIPE_WEBHOOK_SECRET` in Vercel env vars matches the endpoint signing secret
4. Verify `DATABASE_URL` in Vercel env vars points to Neon (not localhost)
5. Try re-sending the event from Stripe Dashboard (click "Resend" on the failed event)

---

## Future Extensibility

### Authentication
- Replace `ADMIN_SECRET` with proper authentication (e.g., NextAuth.js)
- Add student login for persistent billing access

### Lesson Management
- Build out `LessonBooking` CRUD flows
- Integrate with calendar APIs (Google Calendar, Calendly)
- Automated lesson reminders

### Advanced Billing
- VAT / tax automation with Stripe Tax
- Custom invoice templates
- Automated refund processing

### Analytics
- Track enrollment conversion rates
- Lesson completion analytics
- Revenue dashboards

### Notifications
- Email confirmations via SendGrid/Resend
- Payment failure alerts to Mizuki
- Lesson reminders to students
