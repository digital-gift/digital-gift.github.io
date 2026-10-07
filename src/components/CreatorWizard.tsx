import React, { useState, useRef } from 'react';
import type { GiftData, SupportedLocale, EventType, BoxColor, RibbonColor, ConfettiStyle, SoundTune } from '../types/gift';
import { getTranslations } from '../i18n/translations';
import { GiftBox3D } from './GiftBox3D';
import { compressImageFile } from '../utils/imageCompressor';
import { playCelebrationSound } from '../utils/audio';
import { encodeGiftToHash, generateGiftUrl } from '../utils/codec';
import {
  Gift,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Share2,
  Volume2,
  VolumeX,
  Upload,
  X,
  Eye,
  RefreshCw,
  PartyPopper,
  Music,
  Heart,
  Palette,
  MessageSquare,
} from 'lucide-react';

interface CreatorWizardProps {
  locale: SupportedLocale;
  onPreviewGift?: (gift: GiftData) => void;
}

const EVENT_OPTIONS: EventType[] = ['birthday', 'anniversary', 'appreciation', 'celebration'];
const BOX_OPTIONS: BoxColor[] = ['teal', 'coral', 'gold', 'purple', 'midnight', 'rose', 'emerald'];
const RIBBON_OPTIONS: RibbonColor[] = ['gold', 'silver', 'ruby', 'cyan', 'cream'];
const CONFETTI_OPTIONS: ConfettiStyle[] = ['confetti', 'balloons', 'stars', 'fireworks'];
const SOUND_OPTIONS: SoundTune[] = ['birthday', 'fanfare', 'chime', 'magic'];

const BOX_HEX: Record<BoxColor, string> = {
  teal: '#287A74',
  coral: '#E76F51',
  gold: '#D4AF37',
  purple: '#7B2CBF',
  midnight: '#1D3557',
  rose: '#D85A7F',
  emerald: '#2A9D8F',
};

const RIBBON_HEX: Record<RibbonColor, string> = {
  gold: '#FFD166',
  silver: '#E2E8F0',
  ruby: '#E63946',
  cyan: '#38BDF8',
  cream: '#FFF8B0',
};

export const CreatorWizard: React.FC<CreatorWizardProps> = ({ locale, onPreviewGift }) => {
  const t = getTranslations(locale);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [giftData, setGiftData] = useState<GiftData>({
    recipientName: '',
    senderName: '',
    eventType: 'birthday',
    boxColor: 'teal',
    ribbonColor: 'gold',
    confettiStyle: 'confetti',
    soundEnabled: true,
    soundTune: 'birthday',
    message: '',
    photoUrl: undefined,
  });

  const handleNext = () => {
    if (currentStep === 1 && !giftData.recipientName.trim()) {
      alert('Please enter a recipient name');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const result = await compressImageFile(file);
      setGiftData((prev) => ({ ...prev, photoUrl: result.dataUrl }));
      setImageSize(result.sizeBytes);
    } catch (err) {
      console.error(err);
      alert('Could not process this image. Please try another one.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemovePhoto = () => {
    setGiftData((prev) => ({ ...prev, photoUrl: undefined }));
    setImageSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTestSound = (tune: SoundTune) => {
    playCelebrationSound(tune, true);
  };

  const shareUrl = typeof window !== 'undefined'
    ? generateGiftUrl(giftData, window.location.origin + window.location.pathname)
    : `https://digital-gift.github.io/${encodeGiftToHash(giftData)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      prompt('Copy this link:', shareUrl);
    }
  };

  const handleWhatsAppShare = async () => {
    const text = `🎁 ${giftData.recipientName}, someone sent you a special virtual surprise gift! Open it here: ${shareUrl}`;

    // On mobile devices with native share capabilities, use Web Share API
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Special Gift for ${giftData.recipientName}`,
          text: `🎁 ${giftData.recipientName}, you received a special virtual surprise gift!`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to direct URL if user dismissed native share
      }
    }

    // Direct WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    setGiftData({
      recipientName: '',
      senderName: '',
      eventType: 'birthday',
      boxColor: 'teal',
      ribbonColor: 'gold',
      confettiStyle: 'confetti',
      soundEnabled: true,
      soundTune: 'birthday',
      message: '',
      photoUrl: undefined,
    });
    setCurrentStep(1);
    setImageSize(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header Introduction */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-yellow/60 dark:bg-brand-darkSurface border border-brand-yellow dark:border-brand-darkBorder text-brand-deep dark:text-brand-yellow text-xs sm:text-sm font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-deep dark:text-brand-yellow" />
          <span>{t.wizard.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {t.wizard.mainTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t.wizard.subtitle}
        </p>
      </div>

      {/* Wizard Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-lg mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-brand-darkBorder -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-brand-deep dark:bg-brand-mint -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[1, 2, 3, 4].map((step) => {
            const isCompleted = currentStep > step;
            const isCurrent = currentStep === step;
            return (
              <button
                key={step}
                onClick={() => {
                  if (step < currentStep || giftData.recipientName) {
                    setCurrentStep(step);
                  }
                }}
                disabled={step > currentStep && !giftData.recipientName}
                className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                  isCurrent
                    ? 'bg-brand-deep text-white ring-4 ring-brand-mint/60 scale-110 shadow-lg'
                    : isCompleted
                    ? 'bg-brand-muted text-white'
                    : 'bg-white dark:bg-brand-darkSurface text-gray-400 border-2 border-gray-300 dark:border-brand-darkBorder'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between max-w-lg mx-auto mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium px-1">
          <span>{t.wizard.step1Title}</span>
          <span>{t.wizard.step2Title}</span>
          <span>{t.wizard.step3Title}</span>
          <span>{t.wizard.step4Title}</span>
        </div>
      </div>

      {/* Main Grid: Live Preview & Step Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Real-time Box Preview (Sticky on desktop only, static on mobile & tablet) */}
        <div className="lg:col-span-5 flex flex-col items-center bg-white dark:bg-brand-darkSurface rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-brand-darkBorder static lg:sticky lg:top-24 z-0 lg:z-10">
          <div className="flex items-center justify-between w-full mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Live Gift Box Preview
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-yellow/60 dark:bg-brand-darkCard text-brand-deep dark:text-brand-yellow text-xs font-semibold">
              {t.events[giftData.eventType]}
            </span>
          </div>

          <div className="py-4">
            <GiftBox3D
              boxColor={giftData.boxColor}
              ribbonColor={giftData.ribbonColor}
              isOpen={false}
              interactive={false}
              size="md"
            />
          </div>

          <div className="mt-4 text-center">
            <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {giftData.recipientName ? `For: ${giftData.recipientName}` : 'For: Someone Special'}
            </div>
            {giftData.senderName && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                From: {giftData.senderName}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Step-by-Step Forms */}
        <div className="lg:col-span-7 bg-white dark:bg-brand-darkSurface rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-brand-darkBorder">
          {/* STEP 1: Recipient Name & Event */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-floatUp">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-brand-deep dark:text-brand-mint" />
                  <span>{t.wizard.step1Title}</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t.wizard.step1Desc}
                </p>
              </div>

              {/* Recipient Name */}
              <div className="space-y-2">
                <label htmlFor="recipient-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t.wizard.recipientNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="recipient-name"
                  type="text"
                  required
                  aria-required="true"
                  autoComplete="name"
                  value={giftData.recipientName}
                  onChange={(e) => setGiftData({ ...giftData, recipientName: e.target.value })}
                  placeholder={t.wizard.recipientNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-brand-darkBorder bg-gray-50 dark:bg-brand-darkCard text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-deep focus:bg-white dark:focus:bg-brand-darkBg transition-all"
                />
              </div>

              {/* Sender Name */}
              <div className="space-y-2">
                <label htmlFor="sender-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t.wizard.senderNameLabel}
                </label>
                <input
                  id="sender-name"
                  type="text"
                  autoComplete="name"
                  value={giftData.senderName || ''}
                  onChange={(e) => setGiftData({ ...giftData, senderName: e.target.value })}
                  placeholder={t.wizard.senderNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-brand-darkBorder bg-gray-50 dark:bg-brand-darkCard text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-deep focus:bg-white dark:focus:bg-brand-darkBg transition-all"
                />
              </div>

              {/* Event Occasion */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t.wizard.eventTypeLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EVENT_OPTIONS.map((event) => {
                    const isSelected = giftData.eventType === event;
                    return (
                      <button
                        type="button"
                        key={event}
                        onClick={() => setGiftData({ ...giftData, eventType: event })}
                        className={`p-3 rounded-xl border text-left font-medium text-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-brand-deep bg-brand-yellow/30 dark:bg-brand-darkCard text-brand-deep dark:text-brand-mint ring-2 ring-brand-deep'
                            : 'border-gray-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard text-gray-700 dark:text-gray-300 hover:border-brand-muted'
                        }`}
                      >
                        <span>{t.events[event]}</span>
                        {isSelected && <Check className="w-4 h-4 text-brand-deep dark:text-brand-mint" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Box Style & Effects */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-floatUp">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-brand-deep dark:text-brand-mint" />
                  <span>{t.wizard.step2Title}</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t.wizard.step2Desc}
                </p>
              </div>

              {/* Box Color Swatches */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t.wizard.boxColorLabel}: <span className="text-brand-deep dark:text-brand-mint font-bold">{t.boxColors[giftData.boxColor]}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {BOX_OPTIONS.map((color) => {
                    const isSelected = giftData.boxColor === color;
                    return (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setGiftData({ ...giftData, boxColor: color })}
                        title={t.boxColors[color]}
                        className={`w-10 h-10 rounded-full transition-all flex items-center justify-center shadow-md ${
                          isSelected
                            ? 'ring-4 ring-offset-2 ring-brand-deep dark:ring-offset-brand-darkSurface scale-110'
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: BOX_HEX[color] }}
                      >
                        {isSelected && <Check className="w-5 h-5 text-white drop-shadow" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ribbon Color Swatches */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t.wizard.ribbonColorLabel}: <span className="text-brand-deep dark:text-brand-mint font-bold">{t.ribbonColors[giftData.ribbonColor]}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {RIBBON_OPTIONS.map((ribbon) => {
                    const isSelected = giftData.ribbonColor === ribbon;
                    return (
                      <button
                        type="button"
                        key={ribbon}
                        onClick={() => setGiftData({ ...giftData, ribbonColor: ribbon })}
                        title={t.ribbonColors[ribbon]}
                        className={`w-10 h-10 rounded-full transition-all flex items-center justify-center shadow-md border border-gray-300 dark:border-gray-600 ${
                          isSelected
                            ? 'ring-4 ring-offset-2 ring-brand-deep dark:ring-offset-brand-darkSurface scale-110'
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: RIBBON_HEX[ribbon] }}
                      >
                        {isSelected && <Check className="w-5 h-5 text-gray-900 drop-shadow" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confetti Explosion Style */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                  <PartyPopper className="w-4 h-4 text-brand-deep dark:text-brand-mint" />
                  <span>{t.wizard.confettiLabel}</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {CONFETTI_OPTIONS.map((style) => {
                    const isSelected = giftData.confettiStyle === style;
                    return (
                      <button
                        type="button"
                        key={style}
                        onClick={() => setGiftData({ ...giftData, confettiStyle: style })}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? 'border-brand-deep bg-brand-yellow/30 dark:bg-brand-darkCard text-brand-deep dark:text-brand-mint ring-2 ring-brand-deep'
                            : 'border-gray-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard text-gray-700 dark:text-gray-300 hover:border-brand-muted'
                        }`}
                      >
                        <span>{t.confettiStyles[style]}</span>
                        {isSelected && <Check className="w-4 h-4 text-brand-deep dark:text-brand-mint" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Audio Melody & Sound Toggle */}
              <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-brand-darkBorder">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                    <Music className="w-4 h-4 text-brand-deep dark:text-brand-mint" />
                    <span>{t.wizard.soundLabel}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setGiftData({ ...giftData, soundEnabled: !giftData.soundEnabled })}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                      giftData.soundEnabled
                        ? 'bg-brand-mint text-brand-deep dark:bg-brand-deep dark:text-brand-mint'
                        : 'bg-gray-200 dark:bg-brand-darkCard text-gray-500'
                    }`}
                  >
                    {giftData.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{giftData.soundEnabled ? t.wizard.soundToggleOn : t.wizard.soundToggleOff}</span>
                  </button>
                </div>

                {giftData.soundEnabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SOUND_OPTIONS.map((tune) => {
                      const isSelected = giftData.soundTune === tune;
                      return (
                        <div
                          key={tune}
                          onClick={() => setGiftData({ ...giftData, soundTune: tune })}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-brand-deep bg-brand-yellow/30 dark:bg-brand-darkCard text-brand-deep dark:text-brand-mint ring-2 ring-brand-deep'
                              : 'border-gray-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard text-gray-700 dark:text-gray-300 hover:border-brand-muted'
                          }`}
                        >
                          <span>{t.soundTunes[tune]}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTestSound(tune);
                            }}
                            className="p-1 rounded-lg bg-brand-mint/40 hover:bg-brand-mint text-brand-deep dark:text-brand-mint dark:hover:bg-brand-deep transition-all"
                            title={t.wizard.testSound}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Message & Photo */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-floatUp">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-deep dark:text-brand-mint" />
                  <span>{t.wizard.step3Title}</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t.wizard.step3Desc}
                </p>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="personal-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {t.wizard.messageLabel}
                  </label>
                  <span className="text-xs text-gray-400">
                    {giftData.message.length} chars
                  </span>
                </div>
                <textarea
                  id="personal-message"
                  rows={4}
                  value={giftData.message}
                  onChange={(e) => setGiftData({ ...giftData, message: e.target.value })}
                  placeholder={t.wizard.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-brand-darkBorder bg-gray-50 dark:bg-brand-darkCard text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-deep focus:bg-white dark:focus:bg-brand-darkBg transition-all resize-none"
                />
              </div>

              {/* Photo Upload with Canvas Downscaling */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="photo-file-upload" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {t.wizard.photoLabel}
                  </label>
                  <span className="text-xs text-brand-deep dark:text-brand-mint font-medium">
                    {t.wizard.photoHint}
                  </span>
                </div>

                {!giftData.photoUrl ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-brand-darkBorder rounded-2xl p-6 text-center hover:border-brand-deep dark:hover:border-brand-mint cursor-pointer transition-all bg-gray-50 dark:bg-brand-darkCard/50"
                  >
                    <input
                      id="photo-file-upload"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      aria-label={t.wizard.photoLabel}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {isCompressing ? 'Compressing photo...' : t.wizard.dropPhotoHere}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {t.wizard.orClickToUpload} (JPG, PNG, WebP)
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-brand-darkBorder">
                    <img
                      src={giftData.photoUrl}
                      alt="Uploaded preview"
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200 dark:border-brand-darkBorder"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Photo attached & ultra-compressed
                      </p>
                      {imageSize && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Approx size: {(imageSize / 1024).toFixed(2)} KB (100% WhatsApp Safe)
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                      title={t.wizard.removePhoto}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Generate & Share Link */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-floatUp">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-brand-mint/40 dark:bg-brand-mint/20 text-brand-deep dark:text-brand-mint">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {t.wizard.magicLinkReady}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  {t.wizard.step4Desc}
                </p>
              </div>

              {/* Copyable Magic Link Box */}
              <div className="p-4 bg-gray-50 dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-brand-darkBorder space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Direct Magic Link
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>WhatsApp Ready ({shareUrl.length} chars)</span>
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-brand-darkBg rounded-xl border border-gray-200 dark:border-brand-darkBorder text-xs text-gray-600 dark:text-gray-300 font-mono break-all line-clamp-3 select-all">
                  {shareUrl}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex-1 py-3 px-4 rounded-xl bg-brand-deep text-white font-semibold text-sm shadow-md hover:bg-brand-deep/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-brand-mint" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? t.wizard.copied : t.wizard.copyLink}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow-md hover:bg-[#20BE5B] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{t.wizard.shareWhatsApp}</span>
                  </button>
                </div>
              </div>

              {/* Preview Button & New Gift Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100 dark:border-brand-darkBorder">
                {onPreviewGift && (
                  <button
                    type="button"
                    onClick={() => onPreviewGift(giftData)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-brand-deep dark:border-brand-mint text-brand-deep dark:text-brand-mint font-semibold text-sm hover:bg-brand-deep/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.wizard.previewUnbox}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-brand-darkCard transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t.wizard.createNew}</span>
                </button>
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-brand-darkBorder">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-brand-darkBorder text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-brand-darkCard active:scale-95 transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.wizard.prevStep}</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-brand-deep text-white font-semibold text-sm shadow-md hover:bg-brand-deep/90 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{currentStep === 3 ? t.wizard.finishAndShare : t.wizard.nextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
