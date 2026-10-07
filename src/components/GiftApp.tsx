import React, { useState, useEffect } from 'react';
import type { GiftData, SupportedLocale } from '../types/gift';
import { decodeGiftFromHash } from '../utils/codec';
import { CreatorWizard } from './CreatorWizard';
import { RecipientTheater } from './RecipientTheater';

interface GiftAppProps {
  locale: SupportedLocale;
}

export const GiftApp: React.FC<GiftAppProps> = ({ locale }) => {
  const [recipientGift, setRecipientGift] = useState<GiftData | null>(null);
  const [previewGift, setPreviewGift] = useState<GiftData | null>(null);
  const [isCheckingHash, setIsCheckingHash] = useState<boolean>(true);

  // Check URL hash for gift payload on mount and when hash changes
  useEffect(() => {
    const parseHash = () => {
      if (typeof window === 'undefined') return;

      const hash = window.location.hash || window.location.search;
      if (hash && (hash.includes('data=') || hash.length > 5)) {
        const decoded = decodeGiftFromHash(hash);
        if (decoded) {
          setRecipientGift(decoded);
          setIsCheckingHash(false);
          return;
        }
      }

      setRecipientGift(null);
      setIsCheckingHash(false);
    };

    parseHash();

    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Handle exiting preview mode
  const handleExitPreview = () => {
    setPreviewGift(null);
  };

  // If currently testing an unboxing in preview mode
  if (previewGift) {
    return (
      <RecipientTheater
        gift={previewGift}
        locale={locale}
        onReset={handleExitPreview}
        isPreview={true}
      />
    );
  }

  // If a valid #data= payload exists in the URL, render recipient mode
  if (recipientGift) {
    return (
      <RecipientTheater
        gift={recipientGift}
        locale={locale}
        isPreview={false}
      />
    );
  }

  // If no hash or invalid hash, render creator wizard
  return (
    <CreatorWizard
      locale={locale}
      onPreviewGift={(gift) => setPreviewGift(gift)}
    />
  );
};
