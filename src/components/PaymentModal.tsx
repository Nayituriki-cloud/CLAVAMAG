import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Smartphone, CreditCard, Landmark, CheckCircle, Shield, AlertCircle } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { paymentModalData, closePayment, currency, setCurrency, processPaymentSuccess, user } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'MTN Mobile Money' | 'Airtel Money' | 'Visa / Mastercard' | 'Bank Transfer'>('MTN Mobile Money');
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '0788456789');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ussdSimulated, setUssdSimulated] = useState(false);

  if (!paymentModalData) return null;

  const currentAmount = currency === 'RWF' ? paymentModalData.amountRwf : paymentModalData.amountUsd;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'MTN Mobile Money' || paymentMethod === 'Airtel Money') {
      // Simulate USSD prompt on user phone
      setTimeout(() => {
        setUssdSimulated(true);
        setTimeout(() => {
          setIsProcessing(false);
          setUssdSimulated(false);
          processPaymentSuccess(paymentMethod, phoneNumber);
        }, 1800);
      }, 1200);
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        processPaymentSuccess(paymentMethod, cardNumber);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-auto text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div>
            <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
              Secure Gateway
            </div>
            <h2 className="text-lg font-bold text-white">{paymentModalData.title}</h2>
          </div>
          <button
            onClick={closePayment}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency & Total Banner */}
        <div className="px-6 py-4 bg-neutral-950/60 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-400">Total Payable:</div>
            <div className="font-display text-2xl font-bold text-white tabular-nums">
              {currency === 'RWF' ? `${currentAmount.toLocaleString()} RWF` : `$${currentAmount} USD`}
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-800 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCurrency('RWF')}
              className={`px-2.5 py-1 rounded ${currency === 'RWF' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              RWF
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded ${currency === 'USD' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              USD
            </button>
          </div>
        </div>

        {/* Payment Methods Selection */}
        <form onSubmit={handlePay} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300">
              Select Payment Method:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('MTN Mobile Money')}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'MTN Mobile Money'
                    ? 'border-yellow-500 bg-yellow-500/10 text-white'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="w-7 h-7 rounded bg-yellow-500 text-black font-extrabold flex items-center justify-center text-[10px]">
                  MoMo
                </div>
                <div>
                  <div className="font-semibold text-neutral-200">MTN MoMo</div>
                  <div className="text-[10px] text-neutral-400">Dial *182# Prompt</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Airtel Money')}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'Airtel Money'
                    ? 'border-red-500 bg-red-500/10 text-white'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="w-7 h-7 rounded bg-red-600 text-white font-bold flex items-center justify-center text-[10px]">
                  Airtel
                </div>
                <div>
                  <div className="font-semibold text-neutral-200">Airtel Money</div>
                  <div className="text-[10px] text-neutral-400">Dial *500# Prompt</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Visa / Mastercard')}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'Visa / Mastercard'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="font-semibold text-neutral-200">Visa / Mastercard</div>
                  <div className="text-[10px] text-neutral-400">Global Credit & Debit</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'Bank Transfer'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <Landmark className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold text-neutral-200">Bank Transfer</div>
                  <div className="text-[10px] text-neutral-400">BK / I&M / Wire</div>
                </div>
              </button>
            </div>
          </div>

          {/* Dynamic Form Input depending on method */}
          {(paymentMethod === 'MTN Mobile Money' || paymentMethod === 'Airtel Money') && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-neutral-300">
                Registered Mobile Money Phone Number:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="0788 123 456"
                  required
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                />
                <Smartphone className="w-4 h-4 text-neutral-500 absolute right-3 top-3" />
              </div>
              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>You will receive an instant USSD popup on your mobile device to enter your secret PIN.</span>
              </div>
            </div>
          )}

          {paymentMethod === 'Visa / Mastercard' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-300">Card Number:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-mono mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Expiry (MM/YY):</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300">CVC / CVV:</label>
                  <input
                    type="password"
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-mono mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'Bank Transfer' && (
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-xs space-y-1.5 text-neutral-300">
              <div className="font-bold text-white text-sm">Bank of Kigali (BK) Direct</div>
              <div>Account Name: <span className="text-white font-mono">CRAVA MAGA INTERNATIONAL LTD</span></div>
              <div>Account Number: <span className="text-white font-mono">00040-06948210-90</span></div>
              <div>SWIFT Code: <span className="text-white font-mono">BKIGRWRW</span></div>
              <div className="text-[11px] text-neutral-400 mt-2">
                Clicking confirm will generate your official proforma reference and register your booking instantly.
              </div>
            </div>
          )}

          {/* USSD Prompt Live Simulation Banner */}
          {ussdSimulated && (
            <div className="p-3 bg-yellow-950/40 border border-yellow-700/60 rounded-lg text-xs text-yellow-300 flex items-center gap-2 animate-pulse">
              <AlertCircle className="w-4 h-4 shrink-0 text-yellow-400" />
              <span>USSD prompt sent to {phoneNumber}! Confirming biometric PIN...</span>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 text-white font-bold text-sm rounded-lg shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Connecting Secure Gateway...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>
                  Authorize {currency === 'RWF' ? `${currentAmount.toLocaleString()} RWF` : `$${currentAmount} USD`}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
