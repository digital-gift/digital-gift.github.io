import type { SupportedLocale, EventType, BoxColor, RibbonColor, ConfettiStyle, SoundTune } from '../types/gift';

export interface TranslationSchema {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    brandName: string;
    support: string;
    themeToggle: string;
    selectLanguage: string;
  };
  wizard: {
    badge: string;
    mainTitle: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    recipientNameLabel: string;
    recipientNamePlaceholder: string;
    senderNameLabel: string;
    senderNamePlaceholder: string;
    eventTypeLabel: string;
    step2Title: string;
    step2Desc: string;
    boxColorLabel: string;
    ribbonColorLabel: string;
    confettiLabel: string;
    soundLabel: string;
    soundToggleOn: string;
    soundToggleOff: string;
    testSound: string;
    step3Title: string;
    step3Desc: string;
    messageLabel: string;
    messagePlaceholder: string;
    photoLabel: string;
    photoHint: string;
    dropPhotoHere: string;
    orClickToUpload: string;
    removePhoto: string;
    step4Title: string;
    step4Desc: string;
    magicLinkReady: string;
    copyLink: string;
    copied: string;
    shareWhatsApp: string;
    previewUnbox: string;
    closePreview: string;
    createNew: string;
    prevStep: string;
    nextStep: string;
    finishAndShare: string;
  };
  unboxing: {
    badge: string;
    tapToOpen: string;
    tapHint: string;
    fromLabel: string;
    toLabel: string;
    replayCelebration: string;
    createYourOwn: string;
    privacyNotice: string;
  };
  events: Record<EventType, string>;
  boxColors: Record<BoxColor, string>;
  ribbonColors: Record<RibbonColor, string>;
  confettiStyles: Record<ConfettiStyle, string>;
  soundTunes: Record<SoundTune, string>;
}

export const translations: Record<SupportedLocale, TranslationSchema> = {
  en: {
    meta: {
      title: 'DigitalGift | 100% Client-Side Interactive Virtual Gift Maker',
      description: 'Craft customized, animated virtual birthday gift boxes with confetti, music, and personal messages. 100% zero-server, privacy-first, compressed directly into shareable links.',
      keywords: 'free online birthday gift box, virtual surprise box link, interactive digital greeting card, custom digital gift generator, lz-string gift link',
    },
    nav: {
      brandName: 'DigitalGift',
      support: 'Support the Developer',
      themeToggle: 'Toggle Theme',
      selectLanguage: 'Language',
    },
    wizard: {
      badge: '100% Free & Privacy-First',
      mainTitle: 'Craft a Magical Virtual Gift Box',
      subtitle: 'Create a personal 3D animated unboxing experience with music, confetti, and photos. No signups, zero servers, instant magic link.',
      step1Title: 'Who is this for?',
      step1Desc: 'Enter recipient details and select the celebration occasion.',
      recipientNameLabel: "Recipient's Name",
      recipientNamePlaceholder: 'e.g. Sarah, Alex, Mom',
      senderNameLabel: 'Your Name (Optional)',
      senderNamePlaceholder: 'e.g. David',
      eventTypeLabel: 'Occasion Type',
      step2Title: 'Box Style & Effects',
      step2Desc: 'Choose luxury colors, ribbon wraps, confetti bursts, and celebratory tunes.',
      boxColorLabel: 'Gift Box Color',
      ribbonColorLabel: 'Ribbon & Bow Accent',
      confettiLabel: 'Confetti Explosion Style',
      soundLabel: 'Celebration Audio (Web Audio API)',
      soundToggleOn: 'Sound Enabled',
      soundToggleOff: 'Muted',
      testSound: 'Play Preview',
      step3Title: 'Personal Message & Photo',
      step3Desc: 'Add your heartfelt wishes and an optional memorable picture.',
      messageLabel: 'Personal Message',
      messagePlaceholder: 'Write your heartfelt wishes here...',
      photoLabel: 'Attach a Photo (Optional)',
      photoHint: 'Automatically compressed to <10KB WebP client-side.',
      dropPhotoHere: 'Drag & drop image here',
      orClickToUpload: 'or click to browse',
      removePhoto: 'Remove photo',
      step4Title: 'Share Your Surprise',
      step4Desc: 'Your virtual gift box is packed and sealed! Copy your magic link or share via WhatsApp.',
      magicLinkReady: 'Your Magic Gift Link is Ready!',
      copyLink: 'Copy Magic Link',
      copied: 'Link Copied to Clipboard!',
      shareWhatsApp: 'Share on WhatsApp',
      previewUnbox: 'Test Unboxing Preview',
      closePreview: 'Back to Editor',
      createNew: 'Create Another Gift',
      prevStep: 'Back',
      nextStep: 'Continue',
      finishAndShare: 'Seal & Generate Link',
    },
    unboxing: {
      badge: 'A Special Gift For You',
      tapToOpen: 'A Special Surprise Awaits! Tap to Open',
      tapHint: 'Tap anywhere on the gift box to unwrap your surprise',
      fromLabel: 'Sent with love from',
      toLabel: 'Special gift for',
      replayCelebration: 'Replay Confetti & Music',
      createYourOwn: 'Create Your Own Free Surprise Gift',
      privacyNotice: '100% Client-Side • Privacy-First • Zero Servers & Zero Tracking',
    },
    events: {
      birthday: '🎂 Happy Birthday',
      anniversary: '💍 Happy Anniversary',
      appreciation: '🙏 With Gratitude & Appreciation',
      celebration: '🎉 Huge Congratulations',
    },
    boxColors: {
      teal: 'Deep Teal',
      coral: 'Sunset Coral',
      gold: 'Royal Gold',
      purple: 'Velvet Purple',
      midnight: 'Midnight Blue',
      rose: 'Blush Rose',
      emerald: 'Emerald Green',
    },
    ribbonColors: {
      gold: 'Gilded Gold',
      silver: 'Shimmering Silver',
      ruby: 'Ruby Red',
      cyan: 'Electric Cyan',
      cream: 'Soft Cream',
    },
    confettiStyles: {
      confetti: 'Multicolor Confetti',
      balloons: 'Festive Balloons',
      stars: 'Golden Stars',
      fireworks: 'Sparkling Fireworks',
    },
    soundTunes: {
      birthday: 'Happy Birthday Tune',
      fanfare: 'Triumphant Fanfare',
      chime: 'Sparkling Chimes',
      magic: 'Enchanted Magic Sparkle',
    },
  },
  es: {
    meta: {
      title: 'DigitalGift | Creador de Regalos Virtuales Interactivos 100% en el Navegador',
      description: 'Crea cajas de regalo virtuales animadas con confeti, música y mensajes personales. 100% sin servidores, privacidad total, comprimido en enlaces mágicos.',
      keywords: 'caja de regalo de cumpleaños online gratis, enlace de caja sorpresa virtual, tarjeta de felicitación digital interactiva',
    },
    nav: {
      brandName: 'DigitalGift',
      support: 'Apoyar al Desarrollador',
      themeToggle: 'Cambiar Tema',
      selectLanguage: 'Idioma',
    },
    wizard: {
      badge: '100% Gratis y Privado',
      mainTitle: 'Crea una Caja de Regalo Mágica',
      subtitle: 'Diseña una experiencia de apertura 3D con música, confeti y fotos. Sin registros, sin servidores, enlace inmediato.',
      step1Title: '¿Para quién es?',
      step1Desc: 'Introduce los datos del destinatario y la ocasión especial.',
      recipientNameLabel: 'Nombre del Destinatario',
      recipientNamePlaceholder: 'ej. María, Carlos, Mamá',
      senderNameLabel: 'Tu Nombre (Opcional)',
      senderNamePlaceholder: 'ej. David',
      eventTypeLabel: 'Tipo de Celebración',
      step2Title: 'Estilo de Caja y Efectos',
      step2Desc: 'Elige colores, lazos, estilo de confeti y melodías festivas.',
      boxColorLabel: 'Color de la Caja',
      ribbonColorLabel: 'Color del Lazo',
      confettiLabel: 'Efecto de Confeti',
      soundLabel: 'Música de Celebración',
      soundToggleOn: 'Sonido Activado',
      soundToggleOff: 'Silenciado',
      testSound: 'Escuchar Melodía',
      step3Title: 'Mensaje Personal y Foto',
      step3Desc: 'Escribe tus mejores deseos y añade una foto especial.',
      messageLabel: 'Mensaje Personal',
      messagePlaceholder: 'Escribe tus cálidas palabras aquí...',
      photoLabel: 'Adjuntar Foto (Opcional)',
      photoHint: 'Se comprime automáticamente en tu navegador (<10KB).',
      dropPhotoHere: 'Arrastra y suelta tu foto aquí',
      orClickToUpload: 'o haz clic para buscar',
      removePhoto: 'Eliminar foto',
      step4Title: 'Comparte tu Sorpresa',
      step4Desc: '¡Tu caja de regalo está lista! Copia el enlace o envíalo por WhatsApp.',
      magicLinkReady: '¡Tu Enlace Mágico está Listo!',
      copyLink: 'Copiar Enlace Mágico',
      copied: '¡Enlace Copiado al Portapapeles!',
      shareWhatsApp: 'Compartir por WhatsApp',
      previewUnbox: 'Probar Apertura de Caja',
      closePreview: 'Volver a Editar',
      createNew: 'Crear Otro Regalo',
      prevStep: 'Atrás',
      nextStep: 'Continuar',
      finishAndShare: 'Sellar y Crear Enlace',
    },
    unboxing: {
      badge: 'Un Regalo Especial Para Ti',
      tapToOpen: '¡Una Sorpresa Especial te Espera! Toca para Abrir',
      tapHint: 'Toca en la caja de regalo para descubrir la sorpresa',
      fromLabel: 'Enviado con cariño por',
      toLabel: 'Regalo especial para',
      replayCelebration: 'Repetir Confeti y Música',
      createYourOwn: 'Crea tu Propio Regalo Sorpresa Gratis',
      privacyNotice: '100% en tu navegador • Sin servidores • Privacidad total',
    },
    events: {
      birthday: '🎂 ¡Feliz Cumpleaños!',
      anniversary: '💍 ¡Feliz Aniversario!',
      appreciation: '🙏 Con Mucho Agradecimiento',
      celebration: '🎉 ¡Muchas Felicidades!',
    },
    boxColors: {
      teal: 'Turquesa Intenso',
      coral: 'Coral Atardecer',
      gold: 'Oro Real',
      purple: 'Púrpura Terciopelo',
      midnight: 'Azul Medianoche',
      rose: 'Rosa Delicado',
      emerald: 'Verde Esmeralda',
    },
    ribbonColors: {
      gold: 'Dorado Brillante',
      silver: 'Plateado Radiante',
      ruby: 'Rojo Rubí',
      cyan: 'Cian Vibrante',
      cream: 'Crema Suave',
    },
    confettiStyles: {
      confetti: 'Confeti Multicolor',
      balloons: 'Globos Festivos',
      stars: 'Estrellas Doradas',
      fireworks: 'Fuegos Artificiales',
    },
    soundTunes: {
      birthday: 'Canción de Cumpleaños',
      fanfare: 'Fanfarria Triunfal',
      chime: 'Campanillas Mágicas',
      magic: 'Destello Encantado',
    },
  },
  fr: {
    meta: {
      title: 'DigitalGift | Créateur de Cadeaux Virtuels Interactifs 100% Client',
      description: 'Créez des boîtes cadeaux virtuelles animées avec confettis, musique et messages personnalisés. 100% sans serveur, respect total de la vie privée.',
      keywords: 'boîte cadeau anniversaire en ligne gratuit, lien boîte surprise virtuelle, carte de voeux interactive',
    },
    nav: {
      brandName: 'DigitalGift',
      support: 'Soutenir le Développeur',
      themeToggle: 'Changer de Thème',
      selectLanguage: 'Langue',
    },
    wizard: {
      badge: '100% Gratuit & Privé',
      mainTitle: 'Créez une Boîte Cadeau Magique',
      subtitle: 'Concevez une ouverture animée en 3D avec musique, confettis et photo. Zéro inscription, zéro serveur, lien magique instantané.',
      step1Title: 'Pour qui est ce cadeau ?',
      step1Desc: 'Renseignez le destinataire et le type d’occasion.',
      recipientNameLabel: 'Nom du Destinataire',
      recipientNamePlaceholder: 'ex. Sophie, Thomas, Maman',
      senderNameLabel: 'Votre Nom (Optionnel)',
      senderNamePlaceholder: 'ex. Alexandre',
      eventTypeLabel: 'Type d’Événement',
      step2Title: 'Style du Paquet & Effets',
      step2Desc: 'Sélectionnez les couleurs, rubans, feux de confettis et mélodies.',
      boxColorLabel: 'Couleur de la Boîte',
      ribbonColorLabel: 'Couleur du Ruban',
      confettiLabel: 'Style de Confettis',
      soundLabel: 'Musique Célébration',
      soundToggleOn: 'Son Activé',
      soundToggleOff: 'Muet',
      testSound: 'Écouter l’Aperçu',
      step3Title: 'Message Personnel & Photo',
      step3Desc: 'Écrivez un message chaleureux et insérez un souvenir en photo.',
      messageLabel: 'Message Personnel',
      messagePlaceholder: 'Écrivez votre message chaleureux ici...',
      photoLabel: 'Ajouter une Photo (Optionnel)',
      photoHint: 'Compressée automatiquement en WebP (<10KB).',
      dropPhotoHere: 'Glissez-déposez une image ici',
      orClickToUpload: 'ou cliquez pour parcourir',
      removePhoto: 'Supprimer la photo',
      step4Title: 'Partagez votre Surprise',
      step4Desc: 'Votre boîte cadeau est scellée ! Copiez le lien ou partagez sur WhatsApp.',
      magicLinkReady: 'Votre Lien Cadeau Magique est Prêt !',
      copyLink: 'Copier le Lien Magique',
      copied: 'Lien Copié dans le Presse-papier !',
      shareWhatsApp: 'Partager sur WhatsApp',
      previewUnbox: 'Tester l’Ouverture',
      closePreview: 'Retour à l’Éditeur',
      createNew: 'Créer un Autre Cadeau',
      prevStep: 'Retour',
      nextStep: 'Continuer',
      finishAndShare: 'Sceller & Créer le Lien',
    },
    unboxing: {
      badge: 'Un Cadeau Spécial Pour Vous',
      tapToOpen: 'Une Surprise Spéciale Vous Attend ! Touchez pour Ouvrir',
      tapHint: 'Touchez le paquet cadeau pour découvrir la surprise',
      fromLabel: 'Envoyé avec tendresse par',
      toLabel: 'Cadeau spécial pour',
      replayCelebration: 'Rejouer Confettis & Musique',
      createYourOwn: 'Créez Votre Propre Cadeau Surprise Gratuit',
      privacyNotice: '100% dans votre navigateur • Zéro serveur • Confidentialité absolue',
    },
    events: {
      birthday: '🎂 Joyeux Anniversaire',
      anniversary: '💍 Joyeux Anniversaire de Mariage',
      appreciation: '🙏 Avec Toute Ma Gratitude',
      celebration: '🎉 Toutes Mes Félicitations',
    },
    boxColors: {
      teal: 'Sarcelle Profond',
      coral: 'Corail Couchant',
      gold: 'Or Impérial',
      purple: 'Pourpre Velours',
      midnight: 'Bleu Minuit',
      rose: 'Rose Poudré',
      emerald: 'Vert Émeraude',
    },
    ribbonColors: {
      gold: 'Or Scintillant',
      silver: 'Argent Éclatant',
      ruby: 'Rouge Rubis',
      cyan: 'Cyan Électrique',
      cream: 'Crème Soyeuse',
    },
    confettiStyles: {
      confetti: 'Confettis Multicolores',
      balloons: 'Ballons Festifs',
      stars: 'Étoiles Dorées',
      fireworks: 'Feux d’Artifice',
    },
    soundTunes: {
      birthday: 'Mélodie Joyeux Anniversaire',
      fanfare: 'Fanfare Triomphale',
      chime: 'Carillon Scintillant',
      magic: 'Étoile Magique',
    },
  },
  pt: {
    meta: {
      title: 'DigitalGift | Criador de Presentes Virtuais Interativos 100% no Navegador',
      description: 'Crie caixas de presente virtuais animadas com confetes, música e mensagens personalizadas. 100% sem servidor, privacidade total.',
      keywords: 'caixa presente aniversario virtual gratis, link caixa surpresa, cartao virtual interativo',
    },
    nav: {
      brandName: 'DigitalGift',
      support: 'Apoiar o Desenvolvedor',
      themeToggle: 'Alternar Tema',
      selectLanguage: 'Idioma',
    },
    wizard: {
      badge: '100% Grátis & Seguro',
      mainTitle: 'Crie uma Caixa de Presente Mágica',
      subtitle: 'Projete uma experiência de abertura 3D com música, confetes e fotos. Sem cadastros, sem servidores, link imediato.',
      step1Title: 'Para quem é o presente?',
      step1Desc: 'Informe o destinatário e a ocasião especial.',
      recipientNameLabel: 'Nome do Destinatário',
      recipientNamePlaceholder: 'ex. Juliana, Lucas, Mãe',
      senderNameLabel: 'Seu Nome (Opcional)',
      senderNamePlaceholder: 'ex. Gabriel',
      eventTypeLabel: 'Tipo de Celebração',
      step2Title: 'Estilo da Caixa & Efeitos',
      step2Desc: 'Escolha cores vibrantes, laços, efeitos de confete e melodias.',
      boxColorLabel: 'Cor da Caixa',
      ribbonColorLabel: 'Cor do Laço',
      confettiLabel: 'Estilo de Confetes',
      soundLabel: 'Música de Celebração',
      soundToggleOn: 'Som Ativado',
      soundToggleOff: 'Mudo',
      testSound: 'Ouvir Prévia',
      step3Title: 'Mensagem Pessoal & Foto',
      step3Desc: 'Escreva seus votos carinhosos e adicione uma foto memorável.',
      messageLabel: 'Mensagem Pessoal',
      messagePlaceholder: 'Escreva suas palavras especiais aqui...',
      photoLabel: 'Anexar Foto (Opcional)',
      photoHint: 'Comprimida automaticamente para WebP (<10KB).',
      dropPhotoHere: 'Arraste e solte uma imagem aqui',
      orClickToUpload: 'ou clique para selecionar',
      removePhoto: 'Remover foto',
      step4Title: 'Compartilhe sua Surpresa',
      step4Desc: 'Sua caixa de presente está pronta! Copie o link ou compartilhe no WhatsApp.',
      magicLinkReady: 'Seu Link Mágico Está Pronto!',
      copyLink: 'Copiar Link Mágico',
      copied: 'Link Copiado para a Área de Transferência!',
      shareWhatsApp: 'Compartilhar no WhatsApp',
      previewUnbox: 'Testar Abertura',
      closePreview: 'Voltar ao Editor',
      createNew: 'Criar Outro Presente',
      prevStep: 'Voltar',
      nextStep: 'Avançar',
      finishAndShare: 'Selar & Gerar Link',
    },
    unboxing: {
      badge: 'Um Presente Especial Para Você',
      tapToOpen: 'Uma Surpresa Especial Espera por Você! Toque para Abrir',
      tapHint: 'Toque na caixa de presente para revelar o conteúdo',
      fromLabel: 'Enviado com carinho por',
      toLabel: 'Presente especial para',
      replayCelebration: 'Repetir Confetes & Música',
      createYourOwn: 'Crie Seu Próprio Presente Surpresa Grátis',
      privacyNotice: '100% no seu navegador • Sem servidores • Privacidade total',
    },
    events: {
      birthday: '🎂 Feliz Aniversário',
      anniversary: '💍 Feliz Aniversário de Casamento',
      appreciation: '🙏 Com Muita Gratidão',
      celebration: '🎉 Parabéns & Sucesso',
    },
    boxColors: {
      teal: 'Turquesa Intenso',
      coral: 'Coral Pôr do Sol',
      gold: 'Ouro Real',
      purple: 'Púrpura Aveludado',
      midnight: 'Azul Meia-Noite',
      rose: 'Rosa Delicado',
      emerald: 'Verde Esmeralda',
    },
    ribbonColors: {
      gold: 'Dourado Brilhante',
      silver: 'Prateado Radiante',
      ruby: 'Vermelho Rubi',
      cyan: 'Ciano Elétrico',
      cream: 'Creme Macio',
    },
    confettiStyles: {
      confetti: 'Confetes Coloridos',
      balloons: 'Balões Festivos',
      stars: 'Estrelas Douradas',
      fireworks: 'Fogos de Artifício',
    },
    soundTunes: {
      birthday: 'Parabéns pra Você',
      fanfare: 'Fanfarra Triunfal',
      chime: 'Sinos Cintilantes',
      magic: 'Brilho Encantado',
    },
  },
  ja: {
    meta: {
      title: 'DigitalGift | 100%クライアント動作のインタラクティブ仮想ギフトメーカー',
      description: '紙吹雪、音楽、写真、メッセージが入った動く3Dギフトボックスを作成。サーバー不要、完全プライバシー保護、URLハッシュ圧縮で即時共有。',
      keywords: '無料オンライン誕生日ギフトボックス, バーチャルサプライズボックス, デジタルメッセージカード, ギフトジェネレーター',
    },
    nav: {
      brandName: 'DigitalGift',
      support: '開発者をサポート',
      themeToggle: 'テーマ切替',
      selectLanguage: '言語',
    },
    wizard: {
      badge: '完全無料 & プライバシー保護',
      mainTitle: '魔法のバーチャルギフトボックスを作ろう',
      subtitle: '音楽、紙吹雪、写真がついた3D開封アニメーション体験。会員登録不要・サーバー通信ゼロ・URLだけで贈れます。',
      step1Title: '誰に贈りますか？',
      step1Desc: 'お相手のお名前とお祝いの種類を選択してください。',
      recipientNameLabel: 'お相手のお名前',
      recipientNamePlaceholder: '例: さくら、お母さん、健太',
      senderNameLabel: 'あなたのお名前（任意）',
      senderNamePlaceholder: '例: たかし',
      eventTypeLabel: 'お祝いのイベント',
      step2Title: 'ボックスデザインと演出',
      step2Desc: 'ギフトボックスの色、リボン、紙吹雪、お祝いのメロディを選びます。',
      boxColorLabel: 'ボックスカラー',
      ribbonColorLabel: 'リボンの色',
      confettiLabel: 'クラッカー・紙吹雪の演出',
      soundLabel: 'お祝いのサウンド (Web Audio)',
      soundToggleOn: 'サウンドON',
      soundToggleOff: '消音',
      testSound: '試聴する',
      step3Title: 'メッセージと写真',
      step3Desc: '温かいメッセージとお気に入りの写真を添えましょう。',
      messageLabel: 'お祝いメッセージ',
      messagePlaceholder: 'ここに心温まるメッセージを入力...',
      photoLabel: '写真を追加（任意）',
      photoHint: '端末内で自動的に軽量WebPに最適化（10KB未満）。',
      dropPhotoHere: 'ここに画像をドロップ',
      orClickToUpload: 'またはクリックして選択',
      removePhoto: '写真を削除',
      step4Title: 'サプライズを贈る',
      step4Desc: 'ギフトボックスが完成しました！リンクをコピーするかWhatsAppで直接贈りましょう。',
      magicLinkReady: 'マジックリンクが完成しました！',
      copyLink: 'リンクをコピー',
      copied: 'クリップボードにコピーしました！',
      shareWhatsApp: 'WhatsAppでシェア',
      previewUnbox: '開封プレビューを試す',
      closePreview: '作成画面に戻る',
      createNew: '新しいギフトを作る',
      prevStep: '戻る',
      nextStep: '次へ進む',
      finishAndShare: 'ギフトを封入してリンク生成',
    },
    unboxing: {
      badge: '特別なあなたへ',
      tapToOpen: 'サプライズが届いています！タップして開封',
      tapHint: 'プレゼントボックスをタップして開けてみましょう',
      fromLabel: '贈り主',
      toLabel: '特別なあなたへ',
      replayCelebration: 'もう一度演出を再生',
      createYourOwn: 'あなたも無料でサプライズギフトを作る',
      privacyNotice: '100%端末内で動作 • サーバー通信なし • 完全プライバシー保護',
    },
    events: {
      birthday: '🎂 お誕生日おめでとう！',
      anniversary: '💍 記念日おめでとう！',
      appreciation: '🙏 心からの感謝を込めて',
      celebration: '🎉 おめでとうございます！',
    },
    boxColors: {
      teal: 'ディープティール',
      coral: 'サンセットコーラル',
      gold: 'ロイヤルゴールド',
      purple: 'ベルベットパープル',
      midnight: 'ミッドナイトブルー',
      rose: 'ブラッシュローズ',
      emerald: 'エメラルドグリーン',
    },
    ribbonColors: {
      gold: 'ゴールデンイエロー',
      silver: 'スパークリングシルバー',
      ruby: 'ルビーレッド',
      cyan: 'エレキトリックシアン',
      cream: 'ソフトクリーム',
    },
    confettiStyles: {
      confetti: 'マルチカラー紙吹雪',
      balloons: 'フェスティバルバルーン',
      stars: 'ゴールドスター',
      fireworks: 'きらめく花火',
    },
    soundTunes: {
      birthday: 'ハッピーバースデートゥーユー',
      fanfare: '栄光のファンファーレ',
      chime: 'きらめくチャイム音',
      magic: '魔法のスパークル',
    },
  },
};

export function getTranslations(locale: string = 'en'): TranslationSchema {
  const normalized = (locale in translations ? locale : 'en') as SupportedLocale;
  return translations[normalized];
}
