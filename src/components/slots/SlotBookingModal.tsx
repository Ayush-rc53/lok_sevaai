import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  Calendar,
  Clock,
  MapPin,
  X,
  QrCode
} from 'lucide-react';

export const SlotBookingModal: React.FC = () => {
  const {
    slotBookingData,
    setSlotBookingData,
    userProfile,
    triggerCelebration,
    addNotification,
    addAuditLog
  } = useLokSeva();

  const [selectedDate, setSelectedDate] = useState('15 October 2026');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [selectedCenter, setSelectedCenter] = useState('Patna Service Centre (Collectorate Campus)');
  const [isBooked, setIsBooked] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('');

  if (!slotBookingData) return null;

  const dates = ['15 October 2026', '16 October 2026', '17 October 2026', '19 October 2026'];
  const times = ['09:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'];
  const centers = [
    'Patna Service Centre (Collectorate Campus, Sadar)',
    'RTPS Block Kendra (Kankarbagh Circle, Patna)',
    'Common Service Centre (CSC Danapur)'
  ];

  const handleConfirmBooking = () => {
    const generatedToken = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTokenNumber(generatedToken);
    setIsBooked(true);
    triggerCelebration();

    addAuditLog({
      agentName: 'Smart Slot Booking Agent',
      action: 'Appointment Slot Reserved',
      details: `Booked token ${generatedToken} for ${selectedDate} at ${selectedTime} (${selectedCenter}).`,
      badge: 'user_consented'
    });

    addNotification({
      title: 'Appointment Booked Successfully',
      message: `Token #${generatedToken} reserved for ${selectedDate} at ${selectedTime}.`,
      type: 'success'
    });

    if (slotBookingData.onSuccess) {
      slotBookingData.onSuccess({
        date: selectedDate,
        time: selectedTime,
        center: selectedCenter,
        tokenNo: generatedToken
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 relative">
        
        <button
          onClick={() => setSlotBookingData(null)}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Sandbox Appointment Scheduling
        </span>

        <h2 className="text-xl font-bold text-white font-heading mt-2">
          {isBooked ? 'Appointment Confirmed' : 'Schedule Verification Appointment'}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {slotBookingData.applicationTitle}
        </p>

        {!isBooked ? (
          <div className="mt-4 space-y-4">
            
            {/* Center Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Service Centre</span>
              </label>
              <select
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {centers.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Date Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Available Dates</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dates.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d)}
                    className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                      selectedDate === d
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Time Slots</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {times.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(t)}
                    className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                      selectedTime === t
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Required carry-along documents */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-amber-400 block">Required Carry-Along Documents:</span>
              <p>• Original Aadhaar Card</p>
              <p>• College Identity Card & Bonafide Letter</p>
              <p>• 2 Passport Size Photographs</p>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors"
            >
              Confirm Appointment Booking
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4 text-center">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="inline-flex p-3 rounded-xl bg-white text-slate-950 shadow">
                <QrCode className="w-20 h-20" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Priority Token Number
                </span>
                <span className="text-2xl font-black text-emerald-400 font-heading">
                  #{tokenNumber}
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1 text-left pt-2 border-t border-slate-900">
                <p><strong>Citizen:</strong> {userProfile.name}</p>
                <p><strong>Scheduled:</strong> {selectedDate} at {selectedTime}</p>
                <p><strong>Location:</strong> {selectedCenter}</p>
              </div>
            </div>

            <button
              onClick={() => setSlotBookingData(null)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs"
            >
              Done / Return to Applications
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
