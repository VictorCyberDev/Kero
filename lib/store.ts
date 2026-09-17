"use client";

import { create } from "zustand";

export type RailId = "bank" | "momo" | "agent";

export interface RailOption {
  id: RailId;
  title: string;
  subtitle: string;
}

/** The only fee rate the design specifies (Review.dc.html: "1.2% fee") — applied uniformly since no rail-specific rate exists in the source material. */
export const KERO_FEE_RATE = 0.012;

export const RAILS: Record<RailId, RailOption> = {
  bank: {
    id: "bank",
    title: "Bank transfer",
    subtitle: "1 business day · GTBank, Access, Zenith + more",
  },
  momo: {
    id: "momo",
    title: "Mobile money",
    subtitle: "Instant · MTN, Airtel, OPay",
  },
  agent: {
    id: "agent",
    title: "Cash pickup",
    subtitle: "Same day · Partner agent locations",
  },
};

/**
 * The payout destination shown on Review/Status/TransferFailed. Only the
 * bank scenario has a concrete account number in the source design; momo
 * and agent reuse their rail's own network copy rather than inventing
 * account/phone numbers that were never specified.
 */
export const RAIL_DESTINATIONS: Record<RailId, { label: string; value: string }> = {
  bank: { label: "Account", value: "GTBank •••• 4821" },
  momo: { label: "Provider", value: "MTN Mobile Money" },
  agent: { label: "Pickup", value: "Partner agent location" },
};

export interface Recipient {
  name: string;
}

export type SubmissionOutcome = "processing" | "failed";

export interface Submission {
  amount: string;
  rail: RailId;
  recipient: Recipient;
  reference: string;
  outcome: SubmissionOutcome;
  submittedAt: number;
}

export function computeFee(amount: number) {
  const fee = amount * KERO_FEE_RATE;
  return { fee, recipientGets: amount - fee };
}

interface KeroState {
  balance: number;

  cashOutAmount: string;
  setCashOutAmount: (amount: string) => void;

  availableRails: RailOption[];
  selectedRail: RailId | null;
  setSelectedRail: (rail: RailId) => void;

  recipient: Recipient;

  lastSubmission: Submission | null;
  submitCashOut: () => Submission;
}

export const useKeroStore = create<KeroState>((set, get) => ({
  balance: 1240,

  cashOutAmount: "0",
  setCashOutAmount: (amount) => set({ cashOutAmount: amount }),

  availableRails: [RAILS.bank, RAILS.momo, RAILS.agent],
  selectedRail: null,
  setSelectedRail: (rail) => set({ selectedRail: rail }),

  recipient: { name: "Chidinma Umeh" },

  lastSubmission: null,
  submitCashOut: () => {
    const state = get();
    const rail = state.selectedRail ?? "bank";
    // No live payments backend exists yet — Status.dc.html's own copy already
    // discloses that payouts are "simulated ... for the hackathon demo". Roll
    // a mostly-success outcome so both the delivered and failed paths stay
    // reachable to review, rather than hardcoding one or the other.
    const outcome: SubmissionOutcome = Math.random() < 0.85 ? "processing" : "failed";
    const submission: Submission = {
      amount: state.cashOutAmount,
      rail,
      recipient: state.recipient,
      reference: `KR-${Math.floor(10000 + Math.random() * 89999)}`,
      outcome,
      submittedAt: Date.now(),
    };
    set({ lastSubmission: submission });
    return submission;
  },
}));
