import React, { useState, useEffect } from 'react';
import type { GiftData, SupportedLocale } from '../types/gift';
import { getTranslations } from '../i18n/translations';
import { GiftBox3D } from './GiftBox3D';
import { launchConfetti } from '../utils/confettiLauncher';
import { playCelebrationSound } from '../utils/audio';
import { Sparkles, Volume2, VolumeX, RotateCcw, Heart, Gift, Calendar } from 'lucide-react';

interface RecipientTheaterProps {
  gift: GiftData;
  locale: SupportedLocale;
  onReset?: () => void;
  isPreview?: boolean;
}

export const RecipientTheater: React.FC<RecipientTheaterProps> = ({
  gift,
  locale,
  onReset,
  isPreview = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(gift.soundEnabled);
  const t = getTranslations(locale);

  // Occasion label
  const occasionTitle = t.events[gift.eventType] || t.events.birthday;

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Trigger confetti explosion
    launchConfetti(gift.confettiStyle);

    // Trigger audio chime/melody
    if (soundEnabled) {
      playCelebrationSound(gift.soundTune, true);
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    launchConfetti(gift.confettiStyle);
    if (soundEnabled) {
      playCelebrationSound(gift.soundTune, true);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Background ambient decorative glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10">
        <div className="w-[500px] h-[500px] rounded-full bg-brand-yellow/30 dark:bg-brand-mint/10 blur-3xl opacity-70 animate-pulseGlow" />
        <div className="w-[350px] h-[350px] rounded-full bg-brand-mint/30 dark:bg-brand-deep/20 blur-2xl opacity-60" />
      </div>

      {/* Top Banner / Floating Preview Indicator */}
      {isPreview && (
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow text-brand-deep text-xs font-semibold shadow-sm border border-brand-yellow/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Preview Mode</span>
          {onReset && (
            <button
              onClick={onReset}
              className="ml-2 underline hover:text-black font-bold focus:outline-none"
            >
              Exit Preview
            </button>
          )}
        </div>
      )}

      {/* Sound Controller Floating Pill */}
      <div className="absolute top-2 right-4 z-20 flex items-center gap-2">
        <button
          onClick={toggleSound}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          className="p-2.5 rounded-full bg-white/80 dark:bg-brand-darkSurface/90 border border-brand-muted/30 dark:border-brand-darkBorder text-brand-deep dark:text-brand-mint shadow-md hover:scale-105 active:scale-95 transition-all backdrop-blur-sm"
          title={soundEnabled ? 'Sound is ON' : 'Sound is MUTED'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      </div>

      {/* BEFORE OPENING: Wobbling Gift Box & Call To Action */}
      {!isOpen ? (
        <div className="flex flex-col items-center text-center space-y-6 w-full max-w-md animate-floatUp">
          {/* Pulsing Invitation Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-yellow dark:bg-brand-darkSurface border border-brand-yellow dark:border-brand-darkBorder text-brand-deep dark:text-brand-yellow shadow-md animate-gentlePulse">
            <Sparkles className="w-4 h-4 text-brand-deep dark:text-brand-yellow" />
            <span className="text-sm sm:text-base font-semibold tracking-wide">
              {t.unboxing.tapToOpen}
            </span>
          </div>

          {/* Interactive 3D Gift Box */}
          <div className="py-2 cursor-pointer" onClick={handleOpen}>
            <GiftBox3D
              boxColor={gift.boxColor}
              ribbonColor={gift.ribbonColor}
              isOpen={false}
              onOpen={handleOpen}
              interactive={true}
              size="lg"
            />
          </div>

          {/* Helper tap prompt */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
            {t.unboxing.tapHint}
          </p>

          <button
            onClick={handleOpen}
            className="px-8 py-3.5 rounded-2xl bg-brand-deep text-white font-semibold text-base sm:text-lg shadow-lg shadow-brand-deep/25 hover:bg-brand-deep/90 active:scale-95 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-brand-mint/50 flex items-center gap-2.5"
          >
            <Gift className="w-5 h-5" />
            <span>Open Surprise</span>
          </button>
        </div>
      ) : (
        /* AFTER OPENING: Revealed Card and Confetti Stage */
        <div className="w-full max-w-xl flex flex-col items-center space-y-6 animate-cardReveal">
          {/* Card Presentation */}
          <div className="w-full bg-white dark:bg-brand-darkSurface rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-brand-mint/40 dark:border-brand-darkBorder relative overflow-hidden backdrop-blur-md">
            {/* Top festive ribbon bar */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-brand-deep via-brand-muted to-brand-mint" />

            {/* Occasion Header */}
            <div className="text-center space-y-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-brand-yellow dark:bg-brand-darkCard text-brand-deep dark:text-brand-yellow text-xs sm:text-sm font-bold border border-brand-yellow/60 dark:border-brand-darkBorder">
                <Calendar className="w-3.5 h-3.5" />
                {occasionTitle}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {t.unboxing.toLabel} <span className="text-brand-deep dark:text-brand-mint">{gift.recipientName}</span>!
              </h2>
            </div>

            {/* Attached Photo if present */}
            {gift.photoUrl && (
              <div className="my-5 flex justify-center">
                <div className="p-2 bg-white dark:bg-brand-darkCard rounded-2xl shadow-md border border-gray-100 dark:border-brand-darkBorder rotate-[-1deg] hover:rotate-0 transition-transform">
                  <img
                    src={gift.photoUrl}
                    alt={`Celebration photo for ${gift.recipientName}`}
                    width="176"
                    height="176"
                    decoding="async"
                    className="w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Heartfelt Message Body */}
            {gift.message ? (
              <div className="my-6 p-5 sm:p-6 bg-brand-yellow/30 dark:bg-brand-darkCard/80 rounded-2xl border border-brand-yellow/50 dark:border-brand-darkBorder text-gray-800 dark:text-gray-100">
                <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-medium">
                  {gift.message}
                </p>
              </div>
            ) : null}

            {/* Sender attribution */}
            {gift.senderName && (
              <div className="flex items-center justify-end gap-1.5 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mt-4 pr-1">
                <Heart className="w-4 h-4 text-brand-deep dark:text-brand-mint fill-current" />
                <span>{t.unboxing.fromLabel}</span>
                <span className="text-brand-deep dark:text-brand-mint font-bold">{gift.senderName}</span>
              </div>
            )}

            {/* Replay Confetti Action Bar */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-brand-darkBorder flex items-center justify-between">
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-deep dark:text-brand-mint hover:underline p-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.unboxing.replayCelebration}</span>
              </button>

              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                🎁 DigitalGift
              </span>
            </div>
          </div>

          {/* VIRAL SHARE LOOP: Create Your Own Surprise */}
          <div className="w-full flex flex-col items-center text-center space-y-3 pt-2">
            <a
              href={`/${locale !== 'en' ? `${locale}/` : ''}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-deep text-white font-bold text-base sm:text-lg shadow-xl shadow-brand-deep/20 hover:bg-brand-deep/90 active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 focus:outline-none focus:ring-4 focus:ring-brand-mint/50"
            >
              <Gift className="w-5 h-5 text-brand-mint" />
              <span>{t.unboxing.createYourOwn}</span>
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t.unboxing.privacyNotice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
