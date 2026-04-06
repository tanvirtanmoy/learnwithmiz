-- CreateEnum
CREATE TYPE "PaymentOption" AS ENUM ('full_payment', 'installment_3_month');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('active', 'expired', 'completed', 'payment_issue', 'canceled');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid_in_full', 'installment_active', 'payment_failed', 'past_due', 'canceled');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('one_time', 'installment');

-- CreateEnum
CREATE TYPE "PaymentRecordStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded', 'partially_refunded');

-- CreateEnum
CREATE TYPE "LessonBookingStatus" AS ENUM ('scheduled', 'completed', 'canceled_early', 'canceled_late', 'rescheduled');

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'ja',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "course_code" TEXT NOT NULL DEFAULT 'personal_dutch_12_lessons',
    "instructor_name" TEXT NOT NULL DEFAULT 'Mizuki',
    "payment_option" "PaymentOption" NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'active',
    "course_start_date" TIMESTAMP(3) NOT NULL,
    "course_expiry_date" TIMESTAMP(3) NOT NULL,
    "total_lessons" INTEGER NOT NULL DEFAULT 12,
    "lessons_used" INTEGER NOT NULL DEFAULT 0,
    "late_change_free_used" BOOLEAN NOT NULL DEFAULT false,
    "late_cancellation_count" INTEGER NOT NULL DEFAULT 0,
    "refund_policy_version" TEXT NOT NULL DEFAULT 'v1',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_profiles" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_subscription_schedule_id" TEXT,
    "stripe_checkout_session_id" TEXT,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "installments_paid_count" INTEGER NOT NULL DEFAULT 0,
    "installment_limit" INTEGER NOT NULL DEFAULT 3,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billing_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_records" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "stripe_event_id" TEXT NOT NULL,
    "stripe_invoice_id" TEXT,
    "stripe_payment_intent_id" TEXT,
    "stripe_charge_id" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "type" "PaymentType" NOT NULL,
    "status" "PaymentRecordStatus" NOT NULL DEFAULT 'pending',
    "paid_at" TIMESTAMP(3),
    "raw_metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_bookings" (
    "id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "scheduled_start" TIMESTAMP(3) NOT NULL,
    "scheduled_end" TIMESTAMP(3) NOT NULL,
    "status" "LessonBookingStatus" NOT NULL DEFAULT 'scheduled',
    "counted_as_used" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processed_webhook_events" (
    "id" TEXT NOT NULL,
    "stripe_event_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "processed_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "billing_profiles_student_id_key" ON "billing_profiles"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "billing_profiles_stripe_customer_id_key" ON "billing_profiles"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "billing_profiles_stripe_subscription_id_key" ON "billing_profiles"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_records_stripe_event_id_key" ON "payment_records"("stripe_event_id");

-- CreateIndex
CREATE UNIQUE INDEX "processed_webhook_events_stripe_event_id_key" ON "processed_webhook_events"("stripe_event_id");

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_profiles" ADD CONSTRAINT "billing_profiles_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_bookings" ADD CONSTRAINT "lesson_bookings_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
