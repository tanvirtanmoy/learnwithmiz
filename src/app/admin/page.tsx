'use client';

import { useEffect, useState } from 'react';

interface StudentData {
  id: string;
  name: string;
  email: string;
  locale: string;
  createdAt: string;
  enrollments: {
    id: string;
    paymentOption: string;
    status: string;
    courseStartDate: string;
    courseExpiryDate: string;
    totalLessons: number;
    lessonsUsed: number;
  }[];
  billingProfile: {
    paymentStatus: string;
    installmentsPaidCount: number;
    installmentLimit: number;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
  } | null;
  paymentRecords: {
    id: string;
    amount: number;
    currency: string;
    type: string;
    status: string;
    paidAt: string | null;
  }[];
}

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/students?secret=${encodeURIComponent(secret)}`);
      if (res.status === 401) {
        setError('Invalid admin secret');
        return;
      }
      if (!res.ok) {
        setError('Failed to load data');
        return;
      }
      const data = await res.json();
      setStudents(data.students);
      setAuthenticated(true);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (!secret) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/students?secret=${encodeURIComponent(secret)}`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ja-JP', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'payment_issue': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-border-light text-brown-secondary';
      case 'canceled': return 'bg-border-light text-brown-secondary';
      default: return 'bg-border-light text-brown-secondary';
    }
  };

  const paymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid_in_full': return 'bg-green-100 text-green-800';
      case 'installment_active': return 'bg-blue-100 text-blue-800';
      case 'payment_failed':
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'canceled': return 'bg-border-light text-brown-secondary';
      default: return 'bg-border-light text-brown-secondary';
    }
  };

  if (!authenticated) {
    return (
      <section className="py-16 md:py-24 bg-bg-warm min-h-[60vh]">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-2xl font-semibold text-brown-primary text-center mb-8">
            Admin Dashboard
          </h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-brown-secondary mb-1">
                Admin Secret
              </label>
              <input
                id="secret"
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-border-soft bg-bg-white text-brown-primary focus:outline-none focus:ring-2 focus:ring-brown-accent/40"
                placeholder="Enter admin secret"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-full bg-brown-button text-brown-primary font-heading font-medium hover:bg-brown-button-hover disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-bg-warm min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-brown-primary">
            Admin Dashboard — Students
          </h1>
          <button
            onClick={refresh}
            disabled={loading}
            className="px-4 py-2 rounded-full border border-brown-button text-brown-primary text-sm font-medium hover:bg-brown-accent/30 disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {students.length === 0 ? (
          <div className="bg-bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-brown-secondary/70">No students found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {students.map((student) => {
              const enrollment = student.enrollments[0];
              const billing = student.billingProfile;
              const hasPaymentIssue =
                billing?.paymentStatus === 'payment_failed' ||
                billing?.paymentStatus === 'past_due' ||
                enrollment?.status === 'payment_issue';

              return (
                <div
                  key={student.id}
                  className={`bg-bg-white rounded-2xl p-6 shadow-sm border ${
                    hasPaymentIssue ? 'border-red-300 bg-red-50/30' : 'border-border-light'
                  }`}
                >
                  {hasPaymentIssue && (
                    <div className="flex items-center gap-2 mb-4 text-red-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold">⚠️ Payment Issue — Manual review needed</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Student Info */}
                    <div>
                      <h3 className="font-semibold text-brown-primary text-sm mb-1">{student.name}</h3>
                      <p className="text-brown-secondary/70 text-xs">{student.email}</p>
                      <p className="text-brown-secondary/50 text-xs mt-1">Locale: {student.locale}</p>
                      <p className="text-brown-secondary/50 text-xs">Joined: {formatDate(student.createdAt)}</p>
                    </div>

                    {/* Enrollment Info */}
                    <div>
                      {enrollment ? (
                        <>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColor(enrollment.status)}`}>
                            {enrollment.status}
                          </span>
                          <p className="text-brown-secondary text-xs mt-2">
                            Plan: {enrollment.paymentOption === 'full_payment' ? 'One-time €180' : 'Monthly €60×3'}
                          </p>
                          <p className="text-brown-secondary text-xs">
                            Lessons: {enrollment.lessonsUsed}/{enrollment.totalLessons}
                          </p>
                          <p className="text-brown-secondary/50 text-xs">
                            Remaining: {enrollment.totalLessons - enrollment.lessonsUsed}
                          </p>
                        </>
                      ) : (
                        <p className="text-brown-secondary/50 text-xs">No enrollment</p>
                      )}
                    </div>

                    {/* Billing Info */}
                    <div>
                      {billing ? (
                        <>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${paymentStatusColor(billing.paymentStatus)}`}>
                            {billing.paymentStatus}
                          </span>
                          <p className="text-brown-secondary text-xs mt-2">
                            Installments: {billing.installmentsPaidCount}/{billing.installmentLimit}
                          </p>
                          {billing.stripeCustomerId && (
                            <p className="text-brown-secondary/50 text-xs mt-1 truncate" title={billing.stripeCustomerId}>
                              Stripe: {billing.stripeCustomerId.slice(0, 18)}...
                            </p>
                          )}
                          {billing.stripeSubscriptionId && (
                            <p className="text-brown-secondary/50 text-xs truncate" title={billing.stripeSubscriptionId}>
                              Sub: {billing.stripeSubscriptionId.slice(0, 18)}...
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-brown-secondary/50 text-xs">No billing profile</p>
                      )}
                    </div>

                    {/* Dates */}
                    <div>
                      {enrollment && (
                        <>
                          <p className="text-brown-secondary text-xs">
                            Start: {formatDate(enrollment.courseStartDate)}
                          </p>
                          <p className="text-brown-secondary text-xs mt-1">
                            Expiry: {formatDate(enrollment.courseExpiryDate)}
                          </p>
                          {new Date(enrollment.courseExpiryDate) < new Date() && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-border-light text-brown-secondary mt-2">
                              Expired
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Payment Records */}
                  {student.paymentRecords.length > 0 && (
                    <details className="mt-4">
                      <summary className="text-xs text-brown-button cursor-pointer hover:text-brown-button-hover">
                        Payment Records ({student.paymentRecords.length})
                      </summary>
                      <div className="mt-2 overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-border-light">
                              <th className="text-left py-1 text-brown-secondary/70">Date</th>
                              <th className="text-left py-1 text-brown-secondary/70">Amount</th>
                              <th className="text-left py-1 text-brown-secondary/70">Type</th>
                              <th className="text-left py-1 text-brown-secondary/70">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {student.paymentRecords.map((p) => (
                              <tr key={p.id} className="border-b border-border-light/50">
                                <td className="py-1 text-brown-secondary">{p.paidAt ? formatDate(p.paidAt) : '-'}</td>
                                <td className="py-1 text-brown-secondary">€{(p.amount / 100).toFixed(2)}</td>
                                <td className="py-1 text-brown-secondary">{p.type}</td>
                                <td className="py-1">
                                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs ${
                                    p.status === 'paid' ? 'bg-green-100 text-green-700' :
                                    p.status === 'failed' ? 'bg-red-100 text-red-700' :
                                    'bg-border-light text-brown-secondary'
                                  }`}>
                                    {p.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
