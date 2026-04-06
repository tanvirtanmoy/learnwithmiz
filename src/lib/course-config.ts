/**
 * Course configuration — single source of truth for pricing, policies, and content.
 * Edit this file to update course details across the entire application.
 */

export const COURSE_CONFIG = {
  code: 'personal_dutch_12_lessons',
  instructor: 'Mizuki',
  totalLessons: 12,
  validityMonths: 6,
  currency: 'eur' as const,
  refundPolicyVersion: 'v1',

  pricing: {
    fullPayment: {
      amount: 18000, // cents
      displayAmount: '€180',
    },
    installment: {
      amountPerMonth: 6000, // cents
      displayAmountPerMonth: '€60',
      months: 3,
      totalAmount: 18000, // cents
      displayTotalAmount: '€180',
    },
  },

  /** Rescheduling / cancellation rules */
  rescheduleHoursAdvance: 24,
  lateChangeFreeAllowance: 1,
} as const;

// ─── Policy content (bilingual, easy to edit) ─────────────────────────────────

export const POLICY_CONTENT = {
  ja: {
    lessonPolicy: {
      title: '受講ポリシー',
      sections: [
        {
          icon: '🌿',
          heading: '受講期間',
          items: [
            '本コースは全12回のレッスンです',
            'ご都合に合わせて無理のないペースで進めていただけます',
            'ただし開始日から6ヶ月以内にすべてのレッスンをご受講ください',
          ],
        },
        {
          icon: '💳',
          heading: 'お支払い',
          items: [
            '月額 €60 × 3ヶ月（合計 €180）',
            'お支払いはお申込み日を基準に毎月自動で決済されます',
            '例：4月10日にお申込み → 5月10日・6月10日に決済',
            '3ヶ月で自動的にお支払いは終了します',
            '3ヶ月終了後も未受講のレッスンがある場合は、開始日から6ヶ月以内であればご受講いただけます',
          ],
        },
        {
          icon: '🔁',
          heading: '日程変更',
          items: [
            'レッスンの変更は24時間前までにご連絡をお願いいたします',
          ],
        },
        {
          icon: '⚠️',
          heading: 'キャンセル',
          items: [
            '24時間を切ってのご連絡はレッスン1回分の消化とさせていただきます',
          ],
        },
        {
          icon: '💡',
          heading: '当日変更について',
          items: [
            '当日変更は1回まで可能です',
            'それ以降の直前変更は1回分消化となります',
          ],
        },
      ],
    },
    refundPolicy: {
      title: '返金ポリシー',
      items: [
        '本コースはお申込み後にレッスン枠と準備時間を確保するため、ご購入後の全額返金は原則として行っておりません',
        '一括払いの場合、初回レッスン開始前かつ購入後7日以内であれば、80%の返金を申請できます',
        '月額プランの場合、初回レッスン開始前であれば今後の請求は停止できますが、すでにお支払いいただいた金額は、特別な事情がある場合を除き返金対象外です',
        '初回レッスン実施後の返金はできません',
        'やむを得ない事情がある場合は、個別にご相談ください',
      ],
    },
  },
  en: {
    lessonPolicy: {
      title: 'Lesson Policy',
      sections: [
        {
          icon: '🌿',
          heading: 'Flexibility',
          items: [
            'The course includes 12 lessons',
            'You can take longer if you get busy',
            'Please complete all lessons within 6 months',
          ],
        },
        {
          icon: '💳',
          heading: 'Subscription',
          items: [
            '€60 per month for 3 months',
            'Payments will stop automatically after 3 months',
            'Payments are charged monthly from the date of registration',
            'Example: if you join on April 10, you will be charged on May 10 and June 10',
            'If you still have remaining lessons, you can continue taking them within the 6-month period',
          ],
        },
        {
          icon: '🔁',
          heading: 'Rescheduling',
          items: [
            'Please reschedule at least 24 hours in advance',
          ],
        },
        {
          icon: '⚠️',
          heading: 'Cancellation',
          items: [
            'Less than 24 hours notice = 1 lesson will be counted',
          ],
        },
        {
          icon: '💡',
          heading: 'Instant Reschedule',
          items: [
            'You can reschedule last minute once',
            'After that, late changes will count as 1 lesson',
          ],
        },
      ],
    },
    refundPolicy: {
      title: 'Refund Policy',
      items: [
        'Full refunds are not available after purchase because the course reserves lesson capacity and preparation time',
        'If you paid in full and cancel before your first lesson, you may request a partial refund of 80% within 7 days of purchase',
        'If you chose the monthly plan and cancel before your first lesson, future payments will be stopped, but payments already made are non-refundable except in exceptional cases at Mizuki\'s discretion',
        'After the first lesson has taken place, payments are non-refundable',
        'If there is a serious issue, please contact us and we will review the case individually',
      ],
    },
  },
} as const;

export type PolicyLocale = keyof typeof POLICY_CONTENT;
