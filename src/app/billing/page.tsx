'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n';

interface BillingData {
  student: { name: string; email: string; locale: string };
  enrollment: {
    id: string;
    paymentOption: string;
    status: string;
    courseStartDate: string;
    courseExpiryDate: string;
    totalLessons: number;
    lessonsUsed: number;
    lessonsRemaining: number;
  } | null;
  billing: {
    paymentStatus: string;
    installmentsPaidCount: number;
    installmentLimit: number;
    hasStripeCustomer: boolean;
  } | null;
  payments: {
    id: string;
    amount: number;
    currency: string;
    type: string;
    status: string;
    paidAt: string | null;
  }[];
}

export default function BillingPage() {
  const { dictionary: d } = useLanguage();
  const [email, setEmail] = useState('');
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`/api/billing/${encodeURIComponent(email)}`);
      if (res.status === 404) {
        setError(d.billing.notFound);
      } else if (!res.ok) {
        setError('Error fetching billing data.');
      } else {
        setData(await res.json());
      }
    } catch {
      setError('Error fetching billing data.');
    } finally {
      setLoading(false);
    }
  };

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (result.url) {
        window.location.href = result.url;
      }
    } catch {
      console.error('Portal error');
    } finally {
      setPortalLoading(false);
    }
  };

  const statusLabel = (key: string) => {
    const labels = d.billing.statusLabels as Record<string, string>;
    return labels[key] || key;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ja-JP', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <section className="py-16 md:py-24 bg-warmWhite min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-warmGray-800 text-center mb-8">
          {d.billing.title}
        </h1>

        {/* Email Lookup Form */}
        <form onSubmit={handleLookup} className="flex gap-3 mb-10">
          <div className="flex-grow">
            <label htmlFor="email" className="sr-only">{d.billing.emailLabel}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={d.billing.emailPlaceholder}
              required
              className="w-full px-4 py-3 rounded-lg border border-cafe-200 bg-white text-warmGray-800 focus:outline-none focus:ring-2 focus:ring-cafe-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-cafe-600 text-white font-medium hover:bg-cafe-700 transition-colors disabled:opacity-50"
          >
            {loading ? d.billing.loading : d.billing.lookupButton}
          </button>
        </form>

        {error && (
          <div className="bg-cafe-50 text-cafe-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Student Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-warmGray-800 mb-4">{d.billing.studentInfo}</h2>
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4">
                <dt className="text-warmGray-500 text-sm">{d.billing.name}</dt>
                <dd className="text-warmGray-800 text-sm font-medium">{data.student.name}</dd>
                <dt className="text-warmGray-500 text-sm">{d.billing.email}</dt>
                <dd className="text-warmGray-800 text-sm font-medium">{data.student.email}</dd>
              </dl>
            </div>

            {/* Enrollment Info */}
            {data.enrollment && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-warmGray-800 mb-4">{d.billing.enrollmentInfo}</h2>
                <dl className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <dt className="text-warmGray-500 text-sm">{d.billing.paymentOption}</dt>
                  <dd className="text-warmGray-800 text-sm font-medium">{statusLabel(data.enrollment.paymentOption)}</dd>
                  <dt className="text-warmGray-500 text-sm">{d.billing.enrollmentStatus}</dt>
                  <dd>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      data.enrollment.status === 'active' ? 'bg-sage-100 text-sage-700' :
                      data.enrollment.status === 'payment_issue' ? 'bg-red-100 text-red-700' :
                      data.enrollment.status === 'completed' ? 'bg-cafe-100 text-cafe-700' :
                      'bg-warmGray-100 text-warmGray-600'
                    }`}>
                      {statusLabel(data.enrollment.status)}
                    </span>
                  </dd>
                  <dt className="text-warmGray-500 text-sm">{d.billing.courseStart}</dt>
                  <dd className="text-warmGray-800 text-sm font-medium">{formatDate(data.enrollment.courseStartDate)}</dd>
                  <dt className="text-warmGray-500 text-sm">{d.billing.courseExpiry}</dt>
                  <dd className="text-warmGray-800 text-sm font-medium">{formatDate(data.enrollment.courseExpiryDate)}</dd>
                  <dt className="text-warmGray-500 text-sm">{d.billing.lessonsUsed}</dt>
                  <dd className="text-warmGray-800 text-sm font-medium">{data.enrollment.lessonsUsed} / {data.enrollment.totalLessons}</dd>
                  <dt className="text-warmGray-500 text-sm">{d.billing.lessonsRemaining}</dt>
                  <dd className="text-warmGray-800 text-sm font-medium text-sage-700">{data.enrollment.lessonsRemaining}</dd>
                </dl>
              </div>
            )}

            {/* Billing Info */}
            {data.billing && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-warmGray-800 mb-4">{d.billing.billingInfo}</h2>
                <dl className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
                  <dt className="text-warmGray-500 text-sm">{d.billing.paymentStatus}</dt>
                  <dd>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      data.billing.paymentStatus === 'paid_in_full' ? 'bg-sage-100 text-sage-700' :
                      data.billing.paymentStatus === 'installment_active' ? 'bg-blue-100 text-blue-700' :
                      data.billing.paymentStatus === 'payment_failed' || data.billing.paymentStatus === 'past_due' ? 'bg-red-100 text-red-700' :
                      'bg-warmGray-100 text-warmGray-600'
                    }`}>
                      {statusLabel(data.billing.paymentStatus)}
                    </span>
                  </dd>
                  <dt className="text-warmGray-500 text-sm">{d.billing.installmentsPaid}</dt>
                  <dd className="text-warmGray-800 text-sm font-medium">
                    {data.billing.installmentsPaidCount} / {data.billing.installmentLimit}
                  </dd>
                </dl>
                {data.billing.hasStripeCustomer && (
                  <button
                    onClick={handlePortal}
                    disabled={portalLoading}
                    className="w-full py-2.5 px-4 rounded-lg border border-cafe-300 text-cafe-700 font-medium hover:bg-cafe-50 transition-colors disabled:opacity-50 text-sm"
                  >
                    {d.billing.manageBilling}
                  </button>
                )}
              </div>
            )}

            {/* Payment History */}
            {data.payments.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-warmGray-800 mb-4">{d.billing.paymentHistory}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-cafe-100">
                        <th className="text-left py-2 text-warmGray-500 font-medium">{d.billing.date}</th>
                        <th className="text-left py-2 text-warmGray-500 font-medium">{d.billing.amount}</th>
                        <th className="text-left py-2 text-warmGray-500 font-medium">{d.billing.type}</th>
                        <th className="text-left py-2 text-warmGray-500 font-medium">{d.billing.status}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.payments.map((p) => (
                        <tr key={p.id} className="border-b border-cafe-50">
                          <td className="py-2 text-warmGray-700">
                            {p.paidAt ? formatDate(p.paidAt) : '-'}
                          </td>
                          <td className="py-2 text-warmGray-700">{formatAmount(p.amount, p.currency)}</td>
                          <td className="py-2 text-warmGray-700">{statusLabel(p.type)}</td>
                          <td className="py-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              p.status === 'paid' ? 'bg-sage-100 text-sage-700' :
                              p.status === 'failed' ? 'bg-red-100 text-red-700' :
                              'bg-warmGray-100 text-warmGray-600'
                            }`}>
                              {statusLabel(p.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
