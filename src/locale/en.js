export default {
  common: {
    select: "Please select",
  },
  lang: {
    title: "uView UI",
    intro: "UI Farmework",
  },
  tabber: {
    home: "home",
    marketList: "markeList",
    partners: "Partners",
    safe: "Safe",
    order: "order",
  },
  toast: {
    noAuth: "No access permission",
    noLogin: "Failed to log in or failed to log in",
    disableAcc: "The account has been disabled.",
    fast: "Too fast requent operation",
    area: "Access is restricted in this area",
    error: "Error response",
    verification: {
      emailExsit: "mailbox already exists",
      serviceUnhold:
        "The customer service system is being maintained and upgraded.",
      title: "Verification failed, Check your input",
      codeTimeOut: "CAPTCHA has expired",
      codeError: "incorrect CAPTCHA",
      pwdErrorMax: "the number of password errors has reached the limit",
      pwdErrorCount: "password errors N times",
      loginFrozening: "please try again later",
      usernameIsEmpty: "user name cannot be empty",
      usernameSizeError: "user name length is 5-16",
      usernameFormatError: "user name must be alphanumeric",
      passwordIsEmpty: "password cannot be empty",
      passwordSizeError: "password length is 6-16",
      towPasswordError: "make sure the password cannot be empty",
      codeIsEmpty: "CAPTCHA cannot be empty",
      verifyKeyIsEmpty: "CAPTCHA key cannot be empty",
      nameExists: "account already exists",
      passwordDiff: "two incorrect passwords",
      invitationCodeIsEmpty: "invitation code must be entered",
      invitationCodeError: "incorrect invitation code",
      originIsEmpty: "the original password cannot be empty",
      originError: "incorrect original password",
      newpwdIsEmpty: "New password cannot be empty",
      confirmedIsEmpty: "confirm that the password cannot be empty",
      confirmedError: "two passwords do not match",
      updateFailed: "password modification failed",
      gameIdIsNull: "Game ID cannot be empty",
      oddsIdIsNull: "odds ID cannot be empty",
      moneyIsNull: "trade amount cannot be empty",
      moneyError: "incorrect format of trade amount",
      gameNotFound: "the event does not exist",
      oddsNotFound: "odds do not exist",
      balanceNotEnough: "insufficient account balance",
      gameClosed: "the event has been closed",
      gameStarted: "the event has begun",
      gameFinished: "the race is over",
      orderCatUnbet: "unable to withdraw order",
      orderNotFound: "order does not exist",
      bankCardExists: "Bank card has been bound",
      cardNumberTwiceDiff: "two card numbers do not match",
      payPwdError: "incorrect payment password",
      bindCardFailed: "failed to bind bank card",
      addrExists: "Virtual currency address has been used",
      saveFailed: "add failed",
      delFailed: "deletion failed",
      ltMinMoney:
        "the withdrawal amount is lower than the minimum withdrawal amount",
      gtMinMoney: "the withdrawal amount exceeds the maximum withdrawal amount",
      dayMaxTimes: "Daily extraction limit has been reached",
      cumulativeNotEnough: "insufficient amount of code",
      rechargeUrlError: "failed to get top-up address",
      phoneIsEmpty: "Mobile number cannot be empty",
      phoneCodeTimeout: "CAPTCHA has expired",
      phoneCodeError: "incorrect CAPTCHA",
      phoneBindError: "failed to bind mobile phone number",
      phoneChangePwdError: "failed to reset password",
      smsCodeIsEmpty: "CAPTCHA cannot be empty",
      phoneNotBind: "not yet bound with a mobile phone",
      originNotSet: "payment password is not set",
      areaCodeIsEmpty: "Mobile area code cannot be empty",
      betMoneyTooLittle: "the trade amount is too small",
      betMoneyTooMuch: "the trading amount is too large",
      betTotalExceed: "exceeds the current total trading limit",
      payMoneyTooMinOrMax: "the amount paid is too small or too large",
      provinceTooLong: "the province is too long",
      cityTooLong: "the city is too long",
      subBranchTooLong: "Branch is too long",
      cardNameTooLong: "cardholders are too long",
      cardNumberTooLong: "Card number is too long",
      betGlobalTotalExceed: "exceeding the overall trading limit",
      bankNotSet: "No bank card set up",
      virtualCurrencyEditError: "failed to modify USDT",
      editCardFailed: "failed to modify bank card",
      userNotMatchPhone: "account number and mobile phone do not match",
      usernameNotExist: "account error",
      maxDaySms: "the verification code has reached the daily limit",
      smsUnhold: "SMS Channel maintenance",
      payTypeDisabled: "payment Channel maintenance",
      payUnhold: "this pay is unhold",
      unholdMsg: "Wei Guard prompt message",
      testerCantBind: "the test number cannot be bound to a mobile phone",
      phoneExsit: "Mobile phone number has been registered",
      simExists: "sim number already exists",
      simCurrencyEditError: "failed to modify sim number",
      simNotSet: "unbound sim number",
      simAlreadyBind: "sim number has been bound",
      justMinsWi: "the frequency of withdrawal is too fast. Try again later",
      emailNotMatchPhone: "the email account do not match",
      usernameNotExist: "username Not Exist",
      userNotMatchEmail: "user Not Match Email",
      maxDaySms: "max day sms",
    },
    maintenance: "Short message system maintenance",

    forgetSendCode: "Please enter your username and phone number",
    sendCodeSuccess: "Send SMS success, check your sms.",
    changePwdSuccess: "Change your password success, Please relogin",
    changePhoneSuccess: "Change your phone number success",
  },
  bar: {
    title: "Universal",
    balance: "Available Balance",
    btnleft: "Deposit",
    btnright: "Withdraw",
    home: "Home",
    tournaments: "Tournaments",
    market: "Market list",
    result: "Result",
    order: "My Order",
    partners: "Partners",
    hall: "Activity Hall",
    account: "My account",
    history: "Hostory",
    trading: "Trading",
    info: "Personal Information",
    card: "Card Management",
    help: "Help",
    invite: "Invite",
    about: "About",
    online: "Online Service",
    down: "Download",
    logout: "Logout",
  },
  game: {
    hall: "hall",
    live: "Live",
    chess: "Chess",
    sport: "Sport Game",
    slots: "Slots",
    bet: "Live Trading",
    player: "Players",
    profits: "Profits",
  },
  order: {
    wave: {
      title: "Anti-Wave",
      betting: "Trading",
      profit: "Profit",
      done: "Done",
      progress: "In Progress",

      gameid: "GameID",
      gameType: {
        title: "Type",
        first: "Firsh half",
        full: "full",
      },
      statusOpen: {
        title: "Status",
        noPrize: "No Prize",
        win: "Win",
        loss: "Loss",
      },
      even: {
        title: "Even",
        capital: "Capital Preservation",
        forfeit: "Forfeit insurance",
      },

      betMoney: "Money",
      winAmount: "WinAmount",

      betScore: "Score",
      betOdds: "Odds",

      startTime: "Start",
      settlementTime: "Settlement",
    },
    sport: {
      title: "Rebate",
      playerId: "PlayerId",
      money: "Money",
      type: {
        header: "Type",
        text: "Bet rebate",
      },
      date: "Date",
      total: {
        total: "Total",
        today: "Today",
        week: "Week",
        last: "Last Week",
      },
      tableMsg: "no data",
    },
    game: {
      title: "Report",
      date: "Date",
      recharge: "Recharge",
      withdrawal: "Withdrawal",
      bet: "Trade",
      bingo: "Bingo",
      rebate: "Rebate",
      activity: "Activity",
    },
    time: {
      today: "Today",
      yesterday: "Yesterday",
      week: "Week",
      ten: "Last Ten days",
      month: "Month",
    },
    type: {
      all: "All",
    },
  },
  partners: {
    hello: "Hello",
    leader: "Team Leader",
    agreements: "Agreements",
    total: {
      title: "Total Data Summary",
      recharge: "Recharge",
      withdrawal: "Withdrawal",
      cumulative: "Winning",
      balance: "Balance",
      player: "Trade User",
      profit: "Net Profit",
    },
    statis: {
      title: "Team Report",
      aim: "Team Motivation Achievement",
      unaim: "Team incentives not up to par",
      offline: "Team incentives not up to par",
      player: "Player",
    },
    sub: {
      title: "Team list",
      id: "ID",
      username: "Name",
      time: "Login Time",
    },
    NotUp: "Not up to standard",
    all: "View All",
  },
  rebate: {
    title: "Data Summary",
    count: "Player Count",
    new: "New Player",

    balance: "Total Balance",
    recharge: "Total Recharge",
    withdrawal: "Total Withdrawal",

    activity: "Cumulative Activity",
    win: "Cumulative Winning",
    discount: "Cumulative Discount",
    betBalance: "Total Trade Balance",
    betPlayer: "Total Trade Player",
    profit: "Net Profit",
    aim: "Month Aim",
    unaim: "Month Unaim",
    offline: "Player Offline",
  },
  team: {
    title: "Team Report",
    account: "account",
    bet: "trade",
    balnace: "balance",
  },
  commission: {
    sub: {
      title: "Team list",
      id: "ID",
      username: "Username",
      betDay: "TradeDays",
      lv1: "level 1",
      lv2: "level 2",
      lv3: "level 3",
      username: "username",
      lastLogin: "last login",
    },
    unaim: {
      title: "Unaim Player",
      id: "PlayerID",
      name: "Name",
      step: "Step",
      aims: "Aims",
      ymd: "Date",
    },
    offline: {
      title: "Offline Player",
      username: "Username",
      balance: "Balance",
      betday: "Trade Days",
      time: "Created Time",
    },
  },
  info: {
    title: "Personal Information",
    login: {
      title: "login password",
      new: "New login password",
      newplace: "Please enter your new password",
      confirm: "Confirm new login password",
      confirmplace: "Please enter your new password again",
      code: "Phone verifiCode",
      emailcode: "Email verifiCode",
      codeplace: "Please enter phoneCode",
      emailplace: "Please enter emailCode",
      rulesMsgP: "Please enter code",
      sendSuccess: "success",
      codebtn: "Send",
      btn: "Confirm",
    },
    withdrawal: {
      title: "Withdrawal password",
      old: "Old Pay Password",
      oldplace: "Please enter your old pay password",
      new: "New Pay password",
      newplace: "Please enter your new pay password",
      confirm: "Confirm New Pay Password",
      confirmplace: "Please enter your new pay password again",
      btn: "Confirm",
    },
    real: {
      title: "Phone Number",
      phoneplace: "Please enter your phone number",
      code: "Phone verifiCode",
      codeplace: "Please enter phoneCode",
      codebtn: "Send",
      btn: "Confirm",
    },
    email: {
      title: "Email address",
      email: "Email address",
      emailplace: "Please enter your email address",
      code: "Email verification code",
      success: "success",
      codeplace: "Please enter the email verification code",
      codesuccess: "Send successfully",
      fomatemail: "Please enter the correct email address",
    },
  },
  hall: {
    title: "Activity Hall",
  },
  vip: {
    title: "Recommend courteous",
    link: {
      text: "Promotional Link：",
      btn: "Copy link",
    },
    copyMsg: "copy success",
    code: {
      text: "Invitation Code：",
      btn: "Copy code",
    },
  },
  invite: {
    title: "Share QR code or link",
    link: {
      text: "Promotional Link：",
      btn: "Copy link",
    },
    copyMsg: "copy success",
    code: {
      text: "Invitation Code：",
      btn: "Copy code",
    },
  },
  help: {
    title: "Help",
  },
  about: {
    title: "About",
    companyIntroduction: "<p>company introduction</p>",
    userAgreement: "user agreement",
    userAgreementContext: "<p>user agreement1</p>",
    termsOfService: "Terms of Service",
    termsOfServiceContext: "Terms of Service1",
  },
  login: {
    title: "Welcome to",
    titleInfo: "Create an account to explore amazing feature",
    noAccount: "Not have an account?",
    register: "Register now",
    btnSubmit: "login",
    user: {
      lable: "User",
      placeholder: "Please enter user name",
    },
    password: {
      lable: "Password",
      placeholder: "Please enter the password",
    },
    verifiCode: {
      lable: "Verification code",
      placeholder: "Verification code",
    },
    remember: "Remember me",
    forget: {
      title: "Forget password",
      namePlaceholder: "Please enther a your username",
      pwdPlaceholder: "Please enther a new login password",
      confirmPlaceholder: "Please confirm the new login password",
      passworddifferent: "The passwords entered do not match",
      phonePlaceholder: "Please enther your mobile phone number",
      emailplace: "Please enther your  email address",
      verifiCodePlh: "Please enther  Verification code",
      phoneTest: "Please enter the correct phone",
      emailTest: "Please enter the correct email address",
      send: "Send",
      tip: "Phone not working?",
      btnText: "Change the password",
      updateInfo: "successful",
    },
    online: "Online Service",
  },
  register: {
    btnSubmit: "Register",
    user: {
      label: "User",
      placeholder:
        "6-16 Digits and letter combination, beginning with the letter",
    },
    email: "email address",
    emailplace: "please enther your email address",
    password: {
      label: "Password",
      placeholder: "6-16 Digits password, letter are case sensitive",
    },
    referral: { label: "Referral code", placeholder: "Refernal code" },
    phone: { label: "Mobile phone number", placeholder: "Mobile Phone number" },
    code: {
      label: "Picture verification code",
      placeholder: "Verification code",
    },
    tip: "I am over 18 years old and agree to Trading related regulations and",
    dialog: {
      title: "Terms of Service",
      btn: "Confirm",
      license: "Terms of Service",
    },
    successTip: "Register Success, Please Login",
  },
  home: {
    notice:
      "Due to delays in the arrival of funds in the banking system, this has had an impact on user recharge and withdrawals. For a better investment experience for investors, we recommend that all users, whose recharge and withdrawal amounts are above 1000 INR, use USDT to do so.",
    Upcoming: "Upcoming",
    topEvents: "Top events",
    safe: "Safe",
    moreEvents: "More events",
    more: "More",
    allEvents: "All Events",
    quickFollowUp: "Quick Follow Up",
    match: "Match",
    amount: "Amount",
    companyName: "Universal",
    companyRegistrationNumber: "Company Registration Number:14427296",
    companyProfile:
      "The (Universal) gaming platform is a wholly owned company of Universal Technology Games Limited, registered in the UK, and holds a legal government license, digital currency trading license, gaming license, and financial investment license.",
    feedback: "Feedback",
    topBtn: "TOP",
    about: "About",
    contactUs: "Contact Us",
    termsOfService: "Terms of Service",
    copyright: "Copyright ",
  },
  eventDetails: {
    title: "Event Details",
    lossPerCent: "Score / Odds",
    project: "Project",
    profits: "profits",
    eventType: "Event Type",
    bet: "Trade",
    first: "First",
    second: "All",
  },
  eventPopup: {
    title: "event Details",
    amount: "Amount",
    profit: "profit",
    vipfit: "vip profit",
    profits: "Profits",
    serviceFee: "Service Fee",
    btnAll: "all",
    balance: "Balance",
    btnConfirm: "Confirm",
    setAmountTitle: "Set the amount",
    firstVal: "First set value",
    secondVal: "Second setting value",
    thirdVal: "Third setting value",
    btnCancel: "Cancel",
    setBtnConfirm: "Confirm",
    pleaseEnter: "please enter",
    msg: "successs",
    erorMsg: "Please enter the amount",
  },
  marketList: {
    btnAll: "All",
    btnToday: "today",
    btnTomorrow: "tomorrow",
    msg: "over",
    searchPlacholden: "enter",
  },
  result: {
    title: "Result",
    tournamentList: "Tournament List",
    selectDataOne: "today",
    selectDataTwo: "yesterday",
    selectDataThree: "Nearly seven days",
    searchMsg: "enter",
  },
  cardManage: {
    index: {
      title: "Card Management",
      bankTitle: "BANK",
      bankName: "bank name",
      bankEncod: "Encoding",
      bankNum: "Number",
      usdtTitle: "USDT",
      usdtAddr: "address",
      usdtProtocol: "protocol",
      editBtn: "edit",
      addBankUsdtBtn: "Add USDT or Bank Address",
      showModelTitle: "delete",
      showModelContent: "Confirm the deletion ?",
      showModelConfirmText: "confirm",
      showModelCancelText: "cancel",
      walletType: "type",
    },
    bankCard: {
      title: "Add bank",
      bankName: "bank name",
      comboxPlaceholder: "Please select bank",
      comboxEmptyTips: "no data",
      country: "country",
      placeholderCountry: "country",
      province: "province",
      placeholderProvince: "province",
      city: "city",
      placeholderCity: "city",
      subBranch: "Branch",
      placeholderSubBranch: "Branch",
      cardName: "name",
      placeholderCardName: "name",
      cardNumber: "Bank card number",
      placeholderCardNumber: "Bank card number",
      comfirmCardNum: "Confirm the card number",
      placeholderComfirmCardNum: "Confirm the card number",
      backCode: "Bank code",
      placeholderBackCode: "Bank code",
      payPwd: "Payment password",
      placeholderPayPwd: "Payment password",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtn: "code",
      addBtn: "confirm",
      showToastMsg: "success",
      addSuccessMsg: "success",
    },
    updateBank: {
      title: "Edit bank",
      bankName: "bank name",
      comboxPlaceholder: "Please select bank",
      comboxEmptyTips: "no data",
      country: "country",
      placeholderCountry: "country",
      province: "province",
      placeholderProvince: "province",
      city: "city",
      placeholderCity: "city",
      subBranch: "Branch",
      placeholderSubBranch: "Branch",
      cardName: "name",
      placeholderCardName: "name",
      cardNumber: "Bank card number",
      placeholderCardNumber: "Bank card number",
      comfirmCardNum: "Confirm the card number",
      placeholderComfirmCardNum: "Confirm the card number",
      backCode: "Bank code",
      placeholderBackCode: "Bank code",
      payPwd: "Payment password",
      placeholderPayPwd: "Payment password",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtn: "code",
      editBtn: "confirm",
      showToastMsg: "success",
      editSuccessMsg: "success",
    },
    addUsdt: {
      title: "Add Usdt",
      type: "type",
      placeholderType: "type",
      smallType: "small type",
      placeholderSmallType: "small type",
      address: "address",
      placeholderAddr: "address",
      payPwd: "Payment password",
      placeholderPayPwd: "Payment password",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtu: "code",
      addBtn: "Confirm",
      addSuccessMsg: "success",
      showToastMsg: "success",
    },
    updateUsdt: {
      title: "Edit Usdt",
      address: "address",
      placeholderAddr: "address",
      payPwd: "Payment password",
      placeholderPayPwd: "Payment password",
      phoneCode: "Captcha",
      placeholderPhoneCode: "Captcha",
      getCodeBtu: "code",
      editBtn: "Confirm",
      addSuccessMsg: "success",
      showToastMsg: "success",
    },
    addWallet: {
      title: "add wallet",
      type: "type",
      account: "Real Name",
      address: "Wallet ID",
    },
    updateWallet: {
      title: "update wallet",
      type: "type",
      account: "Real Name",
      address: "Wallet ID",
    },
  },
  deposit: {
    title: "Deposit",
    bankBtn: "Bank Crad",
    usdtBtn: "USDT",
    recharge: "Recharge",
    selectPlaceholder: "Please select",
    deposit: "Deposit",
    placeholderDeposit: "amount",
    confirmBtn: "Comfirm",
    rulesMsg: "Please enter the amount",
    illustrate:
      "Online recharge reminder: choose the channel - enter the amount -generate" +
      "the order - get the receiving account - pay to the obtainedaccount - pay the same" +
      "amount as the order, and finish the payment within 30 minutes, the system will confirm" +
      "automatically. 1: Must pay the same amount as the order. 2: It is not allowed to save" +
      "the account for secondary use, and you need to get the receiving account again" +
      "for each recharge. 3: Do not ask strangers for the recharge account to avoid being scammed.",
  },
  withdraw: {
    title: "withdraw",
    withdrawalType: "withdrawal type",
    amount: "amount",
    placeholderAmount: "amoutn",
    allAmountBtn: "All",
    payPassword: "payment password",
    placeholderPayPwd: "payment password",
    placeholderPhoneCode: "code",
    captcha: "captcha",
    getCodeBtu: "code",
    confirmBtn: "confirm",
    confirmSuccessMsg: "success",
    showToastMsg: "success",
    everydayWithdrawTimes: "Maximum number of payouts",
    everydayWithdrawFree: "No commission for the number of times",
    withdrawalToday: "Number of withdrawals today",
    withdrawalRate: "premium",
    withdrawMax: "Maximum withdrawal amount",
    withdrawMin: "Minimum withdrawal amount",
    withdrawalRateMax: "Maximum withdrawal fee",
    withdrawalRateMin: "Minimum withdrawal fee",
    noMoneyMsg: "no money",
    formRuls: "Form validation failed",
  },
  history: {
    title: "History",
    depositBtn: "Deposit",
    withdrawBtn: "Withdraw",
    balanceBtn: "Balance",
    deposit: {
      selectAll: "all",
      selectToday: "today",
      selectYesterday: "yesterday",
      selectSeven: "7 days",
      selectTen: "10 days",
      selectThiry: "30 days",
      typeTimeHd: "Type/Time",
      AmountHd: "Amount",
      StatusHd: "Status",
      typeOnline: "Online",
      typeOffline: "Offline",
      statusPending: "Pending payments",
      statusArrived: "Arrived",
      statusScored: "Scored",
      statusTimeout: "Timeout",
      seeMoreBtn: "Click to see more",
      objectionText: "Have an objection?",
      serviceBtn: "Online Service",
      moneyReal: "money real",
      orderNo: "orderNo",
      moneySys: "money system",
      moneyDiscount: "money discount",
      Remarks: "Remarks",
      copeMsg: "success",
    },
    withdraw: {
      selectAll: "all",
      selectToday: "today",
      selectYesterday: "yesterday",
      selectSeven: "7 days",
      selectTen: "10 days",
      selectThiry: "30 days",
      typeTimeHd: "Type/Time",
      AmountHd: "Amount",
      StatusHd: "Status",
      typeBank: "bank",
      typeUstd: "ustd",
      seeMoreBtn: "Click to see more",
      objectionText: "Have an objection?",
      serviceBtn: "Online Service",
      usdtRate: "usdt rate",
      orderNo: "orderNo",
      usdtMoney: "usdt money",
      commission: "commission",
      Remarks: "Remarks",
      statusToBeReviewed: "Wait",
      statusAudited: "Audited",
      statusFail: "fail",
      statusSuccess: "success",
      statusPayment: "Payment",
      copeMsg: "success",
    },
    balance: {
      selectAll: "all",
      selectToday: "today",
      selectYesterday: "yesterday",
      selectSeven: "7 days",
      typeTimeHd: "Type/Time",
      beforeHd: "Detail",
      afterHd: "Balance",
      typeOutlay: "outlay",
      typeRevenue: "Revenue",
      userName: "user name",
      initMoney: "init money",
      changeType: "type",
      type: {
        1: "Online recharge",
        2: "Withdraw",
        3: "Trade",
        4: "Trade profit",
        5: "Sub - profit rebate",
        7: "Trade withdrawal",
        6: "Manual additions",
        8: "Manual reduction",
        9: "Trade rebate deduction",
        10: "Recharge withdrawal",
        11: "offline recharge",
        12: "Withdrawal Refund",
        13: "Trade Return",
        14: "Trade Rollback",
        15: "Registration Bonus",
        16: "Bonus",
        17: "VIP Bonus",
        18: "Event Bonus",
        19: "Recharge and give",
        20: "Handling fee",
        21: "Sub - recharge rebate",
        22: "Sub - rebate trade",
        23: "Invitation Bonus",
        24: "First Deposit Bonus",
        25: "Events",
        26: "Charge Bonus",
        27: "Fixed Days",
        28: "Invitation First Deposit Rewards",
        29: "Wheel of Fortune Draw",
        30: "Wheel of Fortune Prizes",
        31: "Offline activities",
        32: "Explosive orders are divided into",
        33: "punches and",
        34: "transfers",
        35: "Team Incentives",
        36: "Recharge Compensation",
        37: "Burst Compensation",
      },
    },
  },
  messageCenter: {
    title: "Message Center",
    systemBtn: "System Notice",
    personalBtn: "Personal Notice",
  },
  payPwdSet: {
    labelPayPwd: "Payment password",
    placeholderPayPwd: "Payment password",
    labelPayAgain: "Enter the Payment password again",
    placeholderAgain: "Enter the Payment password again",
    addBtn: "Confirm",
  },
  strongBox: {
    title: "Safe",
    bill: "Details",
    balance: "balance",
    todayAmount: "Today's amount",
    grandTotalAmount: "Cumulative amount",
    transfer: "transfer",
    transferIllustrate: "Recharge the subordinate",
    huaZhuan: "transfer",
    huaZhuanSm: "Funds transferred to account",
    recharge: "recharge",
    rechargeSm: "recharge USDT",
    illustrate: "illustrate",
    illustrateSm: "A note about safes",
    rechargePopup: {
      amount: "please enter the amount",
      rate: "Current exchang rate",
      arAmount: "Actual received amount",
      bottonLabel: "Confirm",
      amountMsg: "Please enter the amount",
      payMoneyTooMinOrMax: "Payout too small or too large",
      payTypeDisabled: "Payment channel maintenance",
      payFrequently: "Pay too often",
      rechargeUrlError: "Failed to obtain recharge address",
      unknownMsg: "unknown exception",
    },
  },
  transfer: {
    title: "transfer",
    username: "username",
    usernamePlaceholder: "please enter username",
    amount: "amount",
    amountPlaceholder: "please enter amount",
    paymentPassword: "payment password",
    payPasswordPlaceholder: "please enter payment password",
    blance: "balance",
    buttonlabel: "Confirm",
    successMsg: "success",
    errorMsg: {
      usernameNotExist: "No corresponding user found",
      payNotExist: "transfer not available",
      transferTooFast: "repeated submit",
      transferFail: "transfer failed",
      onlyToSub: "Can only transfer money to subordinates",
      unknownMsg: "unknown exception",
    },
  },
  toBalance: {
    title: "transfer",
    amount: "amount",
    amountPlaceholder: "please enter amount",
    payPwd: "payment password",
    payPwdPlaceholder: "please enter payment password",
    form: "from",
    to: "to",
    prompt: "safe box",
    toProm: "football balance",
    balanceSpan: "Balance",
    setBalanceBtn: "ALL",
    bottonLabel: "Confirm",
    sussessMsg: "sussess",
    errorMsg: {
      toBalanceTooFast: "repeated submit",
      toBalanceFail: "transfer failed",
      unknownMsg: "unknown exception",
    },
  },
  receipt: {
    title: "Receipt",
    rangData: {
      recharge: "Recharge",
      transfer: "Transfer",
      discount: "Discount",
      relocate: "Relocate",
    },
    tableHead: {
      date: "Date",
      categories: "Ctegories",
      amount: "Amount",
      details: "Details",
    },
    popup: {
      orderNo: "odd number",
      creationDate: "creation date",
      confirmationDate: "confirmation date",
      state: "state",
      transferPerson: "transfer person",
      amount: "amount",
      payee: "payee",
      unknown: "unknown",
    },
  },
  illustrate: {
    title: "illustrate",
    illustrateList: {
      one: "1. The safe is independent of the football account, and the balance of the football account cannot be transferred to the safe",
      two: "2. Transfer function: transfer the money in the safe to the football account",
      three: "3. Get the latest payment account for each recharge.",
      Four: "4. The transfer function is that you can enter the player's username to transfer money to it",
    },
  },
  lottery: {
    congratulation: "congratulation",
    get: "get",
    click: "Click to draw",
    lotteryRules: "lottery rules",
    lotteryIll:
      "A lottery can be drawn when the consumption reaches 100, and the amount of the lottery is 2-10000",
    leaderboard: "leaderboard",
    ranking: "ranking",
    user: "user",
    amount: "amount",
    tips: "Congratulations on winning",
    errorMsg: "The number of prize draws has reached the limit",
    unknown: "unknown exception",
    balanceNotEnough: "Insufficient balance",
    unLotteryDraw: "raffle unavailable",
    testerCatnotDraw: "Test accounts cannot draw prizes",
  },
};
