'use client';

import { useState, useEffect } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import { useAuth } from '@kindercare/core';
import { invoiceService } from '@/services/Invoice/InvoiceService';

export function useBillingBadge(): number {
  const { isAuthenticated } = useAuth();
  const { activeStudent } = useStudent();
  const [unpaidCount, setUnpaidCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !activeStudent?.studentId) {
      setUnpaidCount(0);
      return;
    }

    const id = activeStudent.studentId;
    invoiceService
      .getInvoices(id)
      .then(async (list) => {
        const enriched = await Promise.all(
          list.map(async (inv) => {
            if (inv.invoiceType === 'EXTRACURRICULAR' && inv.paymentStatus === 'Partial') {
              try {
                const detail = await invoiceService.getInvoiceDetail(inv.invoiceId);
                if (detail.extracurricularItems) {
                  const activeItems = detail.extracurricularItems.filter(
                    item => item.status === 'Active' || item.status === 'Pending'
                  );
                  if (activeItems.length > 0) {
                    const allPending = activeItems.every(item => item.status === 'Pending');
                    if (allPending) {
                      return { ...inv, paymentStatus: 'Unpaid' as const };
                    }
                    const allActive = activeItems.every(item => item.status === 'Active');
                    if (allActive) {
                      return { ...inv, paymentStatus: 'Paid' as const };
                    }
                  }
                }
              } catch (err) {
                console.error(err);
              }
            }
            return inv;
          })
        );
        const count = enriched.filter(inv => inv.paymentStatus !== 'Paid').length;
        setUnpaidCount(count);
      })
      .catch((err) => {
        console.error('Failed to get invoices badge:', err);
      });
  }, [isAuthenticated, activeStudent?.studentId]);

  return unpaidCount;
}
