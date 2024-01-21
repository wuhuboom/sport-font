export default {
  common: {
    select: "Veuillez sélectionner",
  },
  lang: {
    title: "interface utilisateur uView",
    intro: "Cadre d'interface utilisateur",
  },
  tabber: {
    home: "maison",
    marketList: "Liste de marques",
    partners: "Les partenaires",
    safe: "Sûr",
    order: "commande",
  },
  toast: {
    noAuth: "Aucune autorisation d'accès",
    noLogin: "Échec de la connexion ou échec de la connexion",
    disableAcc: "Le compte a été désactivé.",
    fast: "Opérations répétées trop rapides",
    area: "L'accès est restreint dans cette zone",
    error: "Réponse d'erreur",
    verification: {
      emailExsit: "la boîte aux lettres existe déjà",
      serviceUnhold: "Le système de service client est maintenu et amélioré.",
      title: "La vérification a échoué, vérifiez votre saisie",
      codeTimeOut: "Le CAPTCHA a expiré",
      codeError: "Captcha incorrecte",
      pwdErrorMax: "le nombre d'erreurs de mot de passe a atteint la limite",
      pwdErrorCount: "Erreurs de mot de passe N fois",
      loginFrozening: "Veuillez réessayer plus tard",
      usernameIsEmpty: "le nom d'utilisateur ne peut pas être vide",
      usernameSizeError:
        "La longueur du nom d'utilisateur est comprise entre 5 et 16",
      usernameFormatError: "le nom d'utilisateur doit être alphanumérique",
      passwordIsEmpty: "le mot de passe ne peut pas être vide",
      passwordSizeError:
        "la longueur du mot de passe est comprise entre 6 et 16",
      towPasswordError:
        "assurez-vous que le mot de passe ne peut pas être vide",
      codeIsEmpty: "Le CAPTCHA ne peut pas être vide",
      verifyKeyIsEmpty: "La clé CAPTCHA ne peut pas être vide",
      nameExists: "Le compte existe déjà",
      passwordDiff: "deux mots de passe incorrects",
      invitationCodeIsEmpty: "le code d'invitation doit être saisi",
      invitationCodeError: "code d'invitation incorrect",
      originIsEmpty: "le mot de passe d'origine ne peut pas être vide",
      originError: "mot de passe d'origine incorrect",
      newpwdIsEmpty: "Le nouveau mot de passe ne peut pas être vide",
      confirmedIsEmpty: "confirmez que le mot de passe ne peut pas être vide",
      confirmedError: "deux mots de passe ne correspondent pas",
      updateFailed: "La modification du mot de passe a échoué",
      gameIdIsNull: "L'ID du jeu ne peut pas être vide",
      oddsIdIsNull: "L'ID des cotes ne peut pas être vide",
      moneyIsNull: "le montant du pari ne peut pas être vide",
      moneyError: "format incorrect du montant du pari",
      gameNotFound: "l'événement n'existe pas",
      oddsNotFound: "les chances n'existent pas",
      balanceNotEnough: "solde de compte insuffisant",
      gameClosed: "l'événement a été clôturé",
      gameStarted: "l'événement a commencé",
      gameFinished: "la course est terminée",
      orderCatUnbet: "impossible de retirer la commande",
      orderNotFound: "la commande n'existe pas",
      bankCardExists: "La carte bancaire a été liée",
      cardNumberTwiceDiff: "deux numéros de carte ne correspondent pas",
      payPwdError: "mot de passe de paiement incorrect",
      bindCardFailed: "Échec de la liaison de la carte bancaire",
      addrExists: "L'adresse de la monnaie virtuelle a été utilisée",
      saveFailed: "l'ajout a échoué",
      delFailed: "la suppression a échoué",
      ltMinMoney:
        "le montant du retrait est inférieur au montant minimum de retrait",
      gtMinMoney: "le montant du retrait dépasse le montant maximum du retrait",
      dayMaxTimes: "La limite d'extraction quotidienne a été atteinte",
      cumulativeNotEnough: "quantité de code insuffisante",
      rechargeUrlError: "Impossible d'obtenir l'adresse de recharge",
      phoneIsEmpty: "Le numéro de portable ne peut pas être vide",
      phoneCodeTimeout: "Le CAPTCHA a expiré",
      phoneCodeError: "Captcha incorrecte",
      phoneBindError: "Échec de la liaison du numéro de téléphone mobile",
      phoneChangePwdError: "échec de la réinitialisation du mot de passe",
      smsCodeIsEmpty: "Le CAPTCHA ne peut pas être vide",
      phoneNotBind: "pas encore connecté à un téléphone portable",
      originNotSet: "le mot de passe de paiement n'est pas défini",
      areaCodeIsEmpty: "L'indicatif régional mobile ne peut pas être vide",
      betMoneyTooLittle: "le montant de la mise est trop petit",
      betMoneyTooMuch: "le montant du pari est trop important",
      betTotalExceed: "dépasse la limite totale de mise actuelle",
      payMoneyTooMinOrMax: "le montant payé est trop petit ou trop important",
      provinceTooLong: "la province est trop longue",
      cityTooLong: "la ville est trop longue",
      subBranchTooLong: "La branche est trop longue",
      cardNameTooLong: "les titulaires de cartes sont trop longs",
      cardNumberTooLong: "Le numéro de carte est trop long",
      betGlobalTotalExceed: "dépasser la limite globale des paris",
      bankNotSet: "Aucune carte bancaire paramétrée",
      virtualCurrencyEditError: "Impossible de modifier l'USDT",
      editCardFailed: "échec de la modification de la carte bancaire",
      userNotMatchPhone:
        "Le numéro de compte et le téléphone portable ne correspondent pas",
      usernameNotExist: "Erreur de compte",
      maxDaySms: "le code de vérification a atteint la limite quotidienne",
      smsUnhold: "Maintenance du canal SMS",
      payTypeDisabled: "Maintenance du canal de paiement",
      payUnhold: "ce salaire n'est pas retenu",
      unholdMsg: "Message d'invite de la garde Wei",
      testerCantBind:
        "le numéro de test ne peut pas être lié à un téléphone portable",
      phoneExsit: "Le numéro de téléphone portable a été enregistré",
      simExists: "Le numéro de carte SIM existe déjà",
      simCurrencyEditError: "Impossible de modifier le numéro de carte SIM",
      simNotSet: "numéro SIM non lié",
      simAlreadyBind: "Le numéro de carte SIM a été lié",
      justMinsWi:
        "la fréquence de retrait est trop rapide. Réessayez plus tard",
      emailNotMatchPhone: "le compte email ne correspond pas",
      usernameNotExist: "Le nom d'utilisateur n'existe pas",
      userNotMatchEmail: "L'utilisateur ne correspond pas à l'adresse e-mail",
      maxDaySms: "sms jour max",
    },
    maintenance: "Maintenance du système de messages courts",

    forgetSendCode:
      "Veuillez entrer votre nom d'utilisateur et votre numéro de téléphone",
    sendCodeSuccess: "Envoyez un SMS avec succès, vérifiez vos SMS.",
    changePwdSuccess:
      "Changez votre mot de passe avec succès, veuillez vous reconnecter",
    changePhoneSuccess: "Changez votre numéro de téléphone avec succès",
  },
  bar: {
    title: "Universel",
    balance: "Solde disponible",
    btnleft: "Dépôt",
    btnright: "Retirer",
    home: "Maison",
    tournaments: "Tournois",
    market: "Liste des marchés",
    result: "Résultat",
    order: "Ma commande",
    partners: "Les partenaires",
    hall: "Salle d'activités",
    account: "Mon compte",
    history: "Hôte",
    trading: "Commerce",
    info: "Informations personnelles",
    card: "Gestion des cartes",
    help: "Aide",
    invite: "Inviter",
    about: "À propos de",
    online: "Un service en ligne",
    down: "Télécharger",
    logout: "Se déconnecter",
  },
  game: {
    hall: "salle",
    live: "En direct",
    chess: "Échecs",
    sport: "Jeu sportif",
    slots: "Machines à sous",
    bet: "Paris en direct",
    player: "Joueurs",
    profits: "Bénéfices",
  },
  order: {
    wave: {
      title: "Anti-Vague",
      betting: "Pari",
      profit: "Profit",
      done: "Fait",
      progress: "En cours",

      gameid: "Identifiant de jeu",
      gameType: {
        title: "Taper",
        first: "Première moitié",
        full: "complet",
      },
      statusOpen: {
        title: "Statut",
        noPrize: "Pas de prix",
        win: "Gagner",
        loss: "Perte",
      },
      even: {
        title: "Même",
        capital: "Préservation du capital",
        forfeit: "Renonciation à l'assurance",
      },

      betMoney: "Parier de l'argent",
      winAmount: "Montant gagnant",

      betScore: "BetScore",
      betOdds: "PariCotes",

      startTime: "Commencer",
      settlementTime: "Règlement",
    },
    sport: {
      title: "Rabais",
      playerId: "ID du joueur",
      money: "Argent",
      type: {
        header: "Taper",
        text: "Pariez sur la remise",
      },
      date: "Date",
      total: {
        total: "Total",
        today: "Aujourd'hui",
        week: "Semaine",
        last: "La semaine dernière",
      },
      tableMsg: "pas de données",
    },
    game: {
      title: "Rapport",
      date: "Date",
      recharge: "Recharger",
      withdrawal: "Retrait",
      bet: "Pari",
      bingo: "Bingo",
      rebate: "Rabais",
      activity: "Activité",
    },
    time: {
      today: "Aujourd'hui",
      yesterday: "Hier",
      week: "Semaine",
      ten: "Dix derniers jours",
      month: "Mois",
    },
    type: {
      all: "Tout",
    },
  },
  partners: {
    hello: "Bonjour",
    leader: "Chef d'équipe",
    agreements: "Les accords",
    total: {
      title: "Résumé des données totales",
      recharge: "Recharger",
      withdrawal: "Retrait",
      cumulative: "Gagnant",
      balance: "Équilibre",
      player: "Parier sur le joueur",
      profit: "Bénéfice net",
    },
    statis: {
      title: "Rapport d'équipe",
      aim: "Motivation de l'équipe",
      unaim: "Les incitations des équipes ne sont pas à la hauteur",
      offline: "Les incitations des équipes ne sont pas à la hauteur",
      player: "Joueur",
    },
    sub: {
      title: "Sous-statistiques",
      id: "IDENTIFIANT",
      username: "Nom",
      time: "Heure de connexion",
    },
    NotUp: "Pas aux normes",
    all: "Voir tout",
  },
  rebate: {
    title: "Résumé des données",
    count: "Nombre de joueurs",
    new: "Nouveau joueur",

    balance: "Solde total",
    recharge: "Recharge totale",
    withdrawal: "Retrait total",

    activity: "Activité cumulée",
    win: "Gains cumulés",
    discount: "Remise cumulée",
    betBalance: "Solde total du pari",
    betPlayer: "Joueur à pari total",
    profit: "Bénéfice net",
    aim: "Objectif du mois",
    unaim: "Mois Unaim",
    offline: "Joueur hors ligne",
  },
  team: {
    title: "Rapport d'équipe",
  },
  commission: {
    sub: {
      title: "Sous-joueur",
      id: "IDENTIFIANT",
      username: "Nom d'utilisateur",
      betDay: "BetDays",
      lv1: "niveau 1",
      lv2: "niveau 2",
      lv3: "niveau 3",
      username: "nom d'utilisateur",
      lastLogin: "Dernière connexion",
    },
    unaim: {
      title: "Joueur non visé",
      id: "ID du joueur",
      name: "Nom",
      step: "Étape",
      aims: "Objectifs",
      ymd: "Date",
    },
    offline: {
      title: "Joueur hors ligne",
      username: "Nom d'utilisateur",
      balance: "Équilibre",
      betday: "Journées de pari",
      time: "Temps créé",
    },
  },
  info: {
    title: "Informations personnelles",
    login: {
      title: "mot de passe",
      new: "Nouveau mot de passe de connexion",
      newplace: "Veuillez entrer votre nouveau mot de passe",
      confirm: "Confirmer le nouveau mot de passe de connexion",
      confirmplace: "Veuillez saisir à nouveau votre nouveau mot de passe",
      code: "Code de vérification du téléphone",
      emailcode: "Code de vérification par e-mail",
      codeplace: "Veuillez saisir le code de téléphone",
      emailplace: "Veuillez saisir le code email",
      rulesMsgP: "Veuillez entrer le code",
      sendSuccess: "succès",
      codebtn: "Envoyer",
      btn: "Confirmer",
    },
    withdrawal: {
      title: "Mot de passe de retrait",
      old: "Ancien mot de passe de paiement",
      oldplace: "Veuillez saisir votre ancien mot de passe de paiement",
      new: "Nouveau mot de passe Pay",
      newplace: "Veuillez saisir votre nouveau mot de passe de paiement",
      confirm: "Confirmer le nouveau mot de passe de paiement",
      confirmplace:
        "Veuillez saisir à nouveau votre nouveau mot de passe de paiement",
      btn: "Confirmer",
    },
    real: {
      title: "Numéro de téléphone",
      phoneplace: "Veuillez entrer votre numéro de téléphone",
      code: "Code de vérification du téléphone",
      codeplace: "Veuillez saisir le code de téléphone",
      codebtn: "Envoyer",
      btn: "Confirmer",
    },
    email: {
      title: "Adresse e-mail",
      email: "Adresse e-mail",
      emailplace: "Veuillez entrer votre adresse e-mail",
      code: "Code de vérification de l'e-mail",
      success: "succès",
      codeplace: "Veuillez saisir le code de vérification de l'e-mail",
      codesuccess: "Envoyer avec succès",
      fomatemail: "Veuillez saisir la bonne adresse e-mail",
    },
  },
  hall: {
    title: "Salle d'activités",
  },
  vip: {
    title: "Recommande courtois",
    link: {
      text: "Lien promotionnel：",
      btn: "Copier le lien",
    },
    copyMsg: "copie réussie",
    code: {
      text: "Code d'invitation:",
      btn: "Copier le code",
    },
  },
  invite: {
    title: "Recommande courtois",
    link: {
      text: "Lien promotionnel：",
      btn: "Copier le lien",
    },
    copyMsg: "copie réussie",
    code: {
      text: "Code d'invitation:",
      btn: "Copier le code",
    },
  },
  help: {
    title: "Aide",
  },
  about: {
    title: "À propos de",
    companyIntroduction: "<p>Présentation De L'Entreprise</p>",
    userAgreement: "Accord de l'utilisateur",
    userAgreementContext: "<p>accord d'utilisation1</p>",
    termsOfService: "Conditions d'utilisation",
    termsOfServiceContext: "Conditions d'utilisation1",
  },
  login: {
    title: "Bienvenue",
    titleInfo: "Créez un compte pour explorer des fonctionnalités étonnantes",
    noAccount: "Vous n'avez pas de compte ?",
    register: "Inscrivez-vous maintenant",
    btnSubmit: "connexion",
    user: {
      lable: "Utilisateur",
      placeholder: "Veuillez entrer le nom d'utilisateur",
    },
    password: {
      lable: "Mot de passe",
      placeholder: "S'il vous plaît entrer le mot de passe",
    },
    verifiCode: {
      lable: "Le code de vérification",
      placeholder: "Le code de vérification",
    },
    remember: "Souviens-toi de moi",
    forget: {
      title: "Mot de passe oublié",
      namePlaceholder: "Veuillez saisir votre nom d'utilisateur",
      pwdPlaceholder: "Veuillez saisir un nouveau mot de passe de connexion",
      confirmPlaceholder:
        "Veuillez confirmer le nouveau mot de passe de connexion",
      passworddifferent: "Les mots de passe saisis ne correspondent pas",
      phonePlaceholder: "Veuillez saisir votre numéro de téléphone portable",
      emailplace: "Veuillez saisir votre adresse e-mail",
      verifiCodePlh: "Veuillez saisir le code de vérification",
      phoneTest: "Veuillez entrer le bon téléphone",
      emailTest: "Veuillez saisir la bonne adresse e-mail",
      send: "Envoyer",
      tip: "Le téléphone ne fonctionne pas ?",
      btnText: "Changer le mot de passe",
      updateInfo: "réussi",
    },
    online: "Un service en ligne",
  },
  register: {
    btnSubmit: "registre",
    user: {
      label: "Utilisateur",
      placeholder:
        "Combinaison de 6 à 16 chiffres et lettres, commençant par la lettre",
    },
    email: "adresse e-mail",
    emailplace: "veuillez saisir votre adresse e-mail",
    password: {
      label: "Mot de passe",
      placeholder:
        "Mot de passe de 6 à 16 chiffres, les lettres sont sensibles à la casse",
    },
    referral: { label: "Code de Parrainage", placeholder: "Code de référence" },
    phone: {
      label: "Numéro de téléphone portable",
      placeholder: "Numéro de téléphone portable",
    },
    code: {
      label: "Code de vérification de l'image",
      placeholder: "Le code de vérification",
    },
    tip: "J'ai plus de 18 ans et j'accepte les réglementations relatives aux paris et",
    dialog: {
      title: "Conditions d'utilisation",
      btn: "Confirmer",
      license: "Conditions d'utilisation",
    },
    successTip: "Enregistrez-vous avec succès, veuillez vous connecter",
  },
  home: {
    notice:
      "En raison des retards dans l'arrivée des fonds dans le système bancaire, cela a eu un impact sur la recharge et les retraits des utilisateurs. Pour une meilleure expérience d'investissement pour les investisseurs, nous recommandons à tous les utilisateurs dont les montants de recharge et de retrait sont supérieurs à 1 000 INR, d'utiliser USDT pour le faire.",
    Upcoming: "A venir",
    topEvents: "Meilleurs événements",
    safe: "Sûr",
    moreEvents: "Plus d'événements",
    more: "Plus",
    allEvents: "Tous les évènements",
    quickFollowUp: "Suivi rapide",
    match: "Correspondre",
    amount: "Montant",
    companyName: "Universel",
    companyRegistrationNumber:
      "Numéro d'enregistrement de la société: 14427296",
    companyProfile:
      "La plate-forme de jeu (Universal) est une société en propriété exclusive d'Universal Technology Games Limited, enregistrée au Royaume-Uni, et détient une licence gouvernementale légale, une licence de commerce de devises numériques, une licence de jeu et une licence d'investissement financier.",
    feedback: "Retour",
    topBtn: "HAUT",
    about: "À propos de",
    contactUs: "Contactez-nous",
    termsOfService: "Conditions d'utilisation",
    copyright: "Droits d'auteur ",
  },
  eventDetails: {
    title: "Détails de l'évènement",
    lossPerCent: "pertePourcentage",
    project: "Projet",
    profits: "bénéfices",
    eventType: "Type d'événement",
    bet: "Pari",
    first: "D'abord",
    second: "Tous",
  },
  eventPopup: {
    title: "Détails de l'évènement",
    amount: "Montant",
    profit: "profit",
    vipfit: "bénéfice vip",
    profits: "Bénéfices",
    serviceFee: "Frais de service",
    btnAll: "tous",
    balance: "Équilibre",
    btnConfirm: "Confirmer",
    setAmountTitle: "Définir le montant",
    firstVal: "Première valeur définie",
    secondVal: "Deuxième valeur de réglage",
    thirdVal: "Troisième valeur de réglage",
    btnCancel: "Annuler",
    setBtnConfirm: "Confirmer",
    pleaseEnter: "Entrez s'il vous plait",
    msg: "succès",
    erorMsg: "Veuillez saisir le montant",
  },
  marketList: {
    btnAll: "Tous",
    btnToday: "aujourd'hui",
    btnTomorrow: "demain",
    msg: "sur",
    searchPlacholden: "entrer",
  },
  result: {
    title: "Résultat",
    tournamentList: "Liste des tournois",
    selectDataOne: "aujourd'hui",
    selectDataTwo: "hier",
    selectDataThree: "Près de sept jours",
    searchMsg: "entrer",
  },
  cardManage: {
    index: {
      title: "Gestion des cartes",
      bankTitle: "BANQUE",
      bankName: "Nom de banque",
      bankEncod: "Codage",
      bankNum: "Nombre",
      usdtTitle: "USDT",
      usdtAddr: "adresse",
      usdtProtocol: "protocole",
      editBtn: "modifier",
      addBankUsdtBtn: "Ajouter USDT ou adresse bancaire",
      showModelTitle: "supprimer",
      showModelContent: "Confirmer la suppression ?",
      showModelConfirmText: "confirmer",
      showModelCancelText: "Annuler",
      walletType: "taper",
    },
    bankCard: {
      title: "Ajouter une banque",
      bankName: "Nom de banque",
      comboxPlaceholder: "Veuillez sélectionner une banque",
      comboxEmptyTips: "pas de données",
      country: "pays",
      placeholderCountry: "pays",
      province: "province",
      placeholderProvince: "province",
      city: "ville",
      placeholderCity: "ville",
      subBranch: "Bifurquer",
      placeholderSubBranch: "Bifurquer",
      cardName: "nom",
      placeholderCardName: "nom",
      cardNumber: "Numéro de carte bancaire",
      placeholderCardNumber: "Numéro de carte bancaire",
      comfirmCardNum: "Confirmez le numéro de carte",
      placeholderComfirmCardNum: "Confirmez le numéro de carte",
      backCode: "Code bancaire",
      placeholderBackCode: "Code bancaire",
      payPwd: "Mot de passe de paiement",
      placeholderPayPwd: "Mot de passe de paiement",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtn: "code",
      addBtn: "confirmer",
      showToastMsg: "succès",
      addSuccessMsg: "succès",
    },
    updateBank: {
      title: "Modifier la banque",
      bankName: "Nom de banque",
      comboxPlaceholder: "Veuillez sélectionner une banque",
      comboxEmptyTips: "pas de données",
      country: "pays",
      placeholderCountry: "pays",
      province: "province",
      placeholderProvince: "province",
      city: "ville",
      placeholderCity: "ville",
      subBranch: "Bifurquer",
      placeholderSubBranch: "Bifurquer",
      cardName: "nom",
      placeholderCardName: "nom",
      cardNumber: "Numéro de carte bancaire",
      placeholderCardNumber: "Numéro de carte bancaire",
      comfirmCardNum: "Confirmez le numéro de carte",
      placeholderComfirmCardNum: "Confirmez le numéro de carte",
      backCode: "Code bancaire",
      placeholderBackCode: "Code bancaire",
      payPwd: "Mot de passe de paiement",
      placeholderPayPwd: "Mot de passe de paiement",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtn: "code",
      editBtn: "confirmer",
      showToastMsg: "succès",
      editSuccessMsg: "succès",
    },
    addUsdt: {
      title: "Ajouter un USD",
      type: "taper",
      placeholderType: "taper",
      smallType: "petits caractères",
      placeholderSmallType: "petits caractères",
      address: "adresse",
      placeholderAddr: "adresse",
      payPwd: "Mot de passe de paiement",
      placeholderPayPwd: "Mot de passe de paiement",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtu: "code",
      addBtn: "Confirmer",
      addSuccessMsg: "succès",
      showToastMsg: "succès",
    },
    updateUsdt: {
      title: "Modifier Usdt",
      address: "adresse",
      placeholderAddr: "adresse",
      payPwd: "Mot de passe de paiement",
      placeholderPayPwd: "Mot de passe de paiement",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtu: "code",
      editBtn: "Confirmer",
      addSuccessMsg: "succès",
      showToastMsg: "succès",
    },
    addWallet: {
      title: "ajouter un portefeuille",
      type: "taper",
      account: "Vrai nom",
      address: "Identifiant du portefeuille",
    },
    updateWallet: {
      title: "mettre à jour le portefeuille",
      type: "taper",
      account: "Vrai nom",
      address: "Identifiant du portefeuille",
    },
  },
  deposit: {
    title: "Dépôt",
    bankBtn: "Carte bancaire",
    usdtBtn: "USDT",
    recharge: "Recharger",
    selectPlaceholder: "Veuillez sélectionner",
    deposit: "Dépôt",
    placeholderDeposit: "montant",
    confirmBtn: "Confirmer",
    rulesMsg: "Veuillez saisir le montant",
    illustrate:
      "Rappel de recharge en ligne : choisissez le canal - saisissez le montant -générez" +
      "la commande - obtenir le compte destinataire - payer sur le compte obtenu - payer la même chose" +
      "montant correspondant à la commande et finalisez le paiement dans les 30 minutes, le système confirmera" +
      "automatiquement. 1: Il faut payer le même montant que la commande. 2: Il n'est pas permis d'économiser" +
      "le compte pour une utilisation secondaire, et vous devez à nouveau récupérer le compte récepteur" +
      "pour chaque recharge. 3 : Ne demandez pas le compte de recharge à des inconnus pour éviter de vous faire arnaquer.",
  },
  withdraw: {
    title: "retirer",
    withdrawalType: "type de retrait",
    amount: "montant",
    placeholderAmount: "amout",
    allAmountBtn: "Tous",
    payPassword: "mot de passe de paiement",
    placeholderPayPwd: "mot de passe de paiement",
    placeholderPhoneCode: "code",
    captcha: "captcha",
    getCodeBtu: "code",
    confirmBtn: "confirmer",
    confirmSuccessMsg: "succès",
    showToastMsg: "succès",
    everydayWithdrawTimes: "Nombre maximum de paiements",
    everydayWithdrawFree: "Aucune commission pour le nombre de fois",
    withdrawalToday: "Nombre de retraits aujourd'hui",
    withdrawalRate: "prime",
    withdrawMax: "Montant maximum de retrait",
    withdrawMin: "Montant minimum de retrait",
    withdrawalRateMax: "Frais de retrait maximum",
    withdrawalRateMin: "Frais de retrait minimum",
    noMoneyMsg: "pas d'argent",
    formRuls: "La validation du formulaire a échoué",
  },
  history: {
    title: "Histoire",
    depositBtn: "Dépôt",
    withdrawBtn: "Retirer",
    balanceBtn: "Équilibre",
    deposit: {
      selectAll: "tous",
      selectToday: "aujourd'hui",
      selectYesterday: "hier",
      selectSeven: "7 jours",
      selectTen: "10 jours",
      selectThiry: "30 jours",
      typeTimeHd: "Type/Heure",
      AmountHd: "Montant",
      StatusHd: "Statut",
      typeOnline: "En ligne",
      typeOffline: "Hors ligne",
      statusPending: "Paiements en attente",
      statusArrived: "Arrivé",
      statusScored: "Marqué",
      statusTimeout: "Temps mort",
      seeMoreBtn: "Cliquez pour en voir plus",
      objectionText: "Vous avez une objection ?",
      serviceBtn: "Un service en ligne",
      moneyReal: "de l'argent réel",
      orderNo: "n de commande",
      moneySys: "système monétaire",
      moneyDiscount: "remise d'argent",
      Remarks: "Remarques",
      copeMsg: "succès",
    },
    withdraw: {
      selectAll: "tous",
      selectToday: "aujourd'hui",
      selectYesterday: "hier",
      selectSeven: "7 jours",
      selectTen: "10 jours",
      selectThiry: "30 jours",
      typeTimeHd: "Type/Heure",
      AmountHd: "Montant",
      StatusHd: "Statut",
      typeBank: "banque",
      typeUstd: "ustd",
      seeMoreBtn: "Cliquez pour en voir plus",
      objectionText: "Vous avez une objection ?",
      serviceBtn: "Un service en ligne",
      usdtRate: "taux usdt",
      orderNo: "n de commande",
      usdtMoney: "argent usd",
      commission: "commission",
      Remarks: "Remarques",
      statusToBeReviewed: "Attendez",
      statusAudited: "Vérifié",
      statusFail: "échouer",
      statusSuccess: "succès",
      statusPayment: "Paiement",
      copeMsg: "succès",
    },
    balance: {
      selectAll: "tous",
      selectToday: "aujourd'hui",
      selectYesterday: "hier",
      selectSeven: "7 jours",
      typeTimeHd: "Type/Heure",
      beforeHd: "Avant",
      afterHd: "Après",
      typeOutlay: "dépenses",
      typeRevenue: "Revenu",
      userName: "nom d'utilisateur",
      initMoney: "initialiser l'argent",
      changeType: "changer le type",
      type: {
        1: "Recharge en ligne",
        2: "Retirer",
        3: "Pari",
        4: "Parier profit",
        5: "Remise de sous-bénéfice",
        7: "Retrait du pari",
        6: "Ajouts manuels",
        8: "Réduction manuelle",
        9: "Déduction de la remise sur les paris",
        10: "Recharger le retrait",
        11: "recharge hors ligne",
        12: "Remboursement de retrait",
        13: "Retour du pari",
        14: "Retour du pari",
        15: "Bonus d'inscription",
        16: "Prime",
        17: "Prime VIP",
        18: "Bonus d'événement",
        19: "Recharger et donner",
        20: "Frais de gestion",
        21: "Remise de sous-recharge",
        22: "Sous-pari de remise",
        23: "Bonus d'invitation",
        24: "Bonus de premier dépôt",
        25: "Événements",
        26: "Bonus de recharge",
        27: "Jours fixes",
        28: "Récompenses de premier dépôt sur invitation",
      },
    },
  },
  messageCenter: {
    title: "Centre de messagerie",
    systemBtn: "Notifications système",
    personalBtn: "Notifications personnelles",
  },
  payPwdSet: {
    labelPayPwd: "Mot de passe de paiement",
    placeholderPayPwd: "Mot de passe de paiement",
    labelPayAgain: "Entrez à nouveau le mot de passe de paiement",
    placeholderAgain: "Entrez à nouveau le mot de passe de paiement",
    addBtn: "Confirmer",
  },
  strongBox: {
    title: "Sûr",
    bill: "Détails",
    balance: "équilibre",
    todayAmount: "Montant du jour",
    grandTotalAmount: "Montant cumulé",
    transfer: "transfert",
    transferIllustrate: "Rechargez le subordonné",
    huaZhuan: "transfert",
    huaZhuanSm: "Fonds transférés sur le compte",
    recharge: "recharger",
    rechargeSm: "recharge USDT",
    illustrate: "illustrer",
    illustrateSm: "Une note sur les coffres-forts",
    rechargePopup: {
      amount: "Veuillez entrer le montant",
      rate: "Taux de change actuel",
      arAmount: "Montant réel reçu",
      bottonLabel: "Confirmer",
      amountMsg: "Veuillez saisir le montant",
      payMoneyTooMinOrMax: "Paiement trop petit ou trop important",
      payTypeDisabled: "Maintenance du canal de paiement",
      payFrequently: "Payer trop souvent",
      rechargeUrlError: "Échec de l'obtention de l'adresse de recharge",
      unknownMsg: "exception inconnue",
    },
  },
  transfer: {
    title: "transfert",
    username: "nom d'utilisateur",
    usernamePlaceholder: "Veuillez entrer votre nom d'utilisateur",
    amount: "montant",
    amountPlaceholder: "Veuillez entrer le montant",
    paymentPassword: "mot de passe de paiement",
    payPasswordPlaceholder: "veuillez saisir le mot de passe de paiement",
    blance: "blanc",
    buttonlabel: "Confirmer",
    successMsg: "succès",
    errorMsg: {
      usernameNotExist: "Aucun utilisateur correspondant trouvé",
      payNotExist: "transfert non disponible",
      transferTooFast: "soumission répétée",
      transferFail: "Le transfert a échoué",
      onlyToSub: "Ne peut transférer de l'argent qu'à des subordonnés",
      unknownMsg: "exception inconnue",
    },
  },
  toBalance: {
    title: "transfert",
    amount: "montant",
    amountPlaceholder: "Veuillez entrer le montant",
    payPwd: "mot de passe de paiement",
    payPwdPlaceholder: "veuillez saisir le mot de passe de paiement",
    form: "formulaire",
    to: "à",
    prompt: "coffre-fort",
    toProm: "pied blanc",
    balanceSpan: "Équilibre",
    setBalanceBtn: "TOUS",
    bottonLabel: "Confirmer",
    sussessMsg: "susses",
    errorMsg: {
      toBalanceTooFast: "soumission répétée",
      toBalanceFail: "Le transfert a échoué",
      unknownMsg: "exception inconnue",
    },
  },
  receipt: {
    title: "Reçu",
    rangData: {
      recharge: "Recharger",
      transfer: "Transfert",
      discount: "Rabais",
      relocate: "Déménager",
    },
    tableHead: {
      date: "Date",
      categories: "Catégories",
      amount: "Montant",
      details: "Détails",
    },
    popup: {
      orderNo: "nombre impair",
      creationDate: "date de création",
      confirmationDate: "date de confirmation",
      state: "État",
      transferPerson: "personne transférée",
      amount: "montant",
      payee: "bénéficiaire",
      unknown: "inconnu",
    },
  },
  illustrate: {
    title: "illustrer",
    illustrateList: {
      one: "1. Le coffre-fort est indépendant du compte football, et le solde du compte football ne peut pas être transféré vers le coffre-fort",
      two: "2. Fonction de transfert: transférez l'argent du coffre-fort vers le compte football",
      three:
        "3. Chaque fois que vous rechargez, vous pouvez obtenir (3%) un revenu, et il sera crédité immédiatement",
      Four: "4. La fonction de transfert est que vous pouvez saisir le nom d'utilisateur du joueur pour lui transférer de l'argent",
    },
  },
  lottery: {
    congratulation: "félicitations",
    get: "obtenir",
    click: "Cliquez pour dessiner",
    lotteryRules: "règles de loterie",
    lotteryIll:
      "Une loterie peut être tirée lorsque la consommation atteint 100 et le montant de la loterie est de 2 à 10 000",
    leaderboard: "classement",
    ranking: "classement",
    user: "utilisateur",
    amount: "montant",
    tips: "Félicitations pour votre victoire",
    errorMsg: "Le nombre de tirages au sort a atteint la limite",
    unknown: "exception inconnue",
    balanceNotEnough: "Solde insuffisant",
    unLotteryDraw: "tirage au sort indisponible",
    testerCatnotDraw: "Les comptes tests ne peuvent pas tirer de prix",
  },
};