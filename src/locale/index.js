import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "./zh";
import en from "./en";
import ins from "./in";
import de from "./de";
import fr from "./fr";
import es from "./es";

Vue.use(VueI18n);

const messages = {
  en,
  zh,
  ins,
  de,
  fr,
  es,
};

const i18n = new VueI18n({
  locale: "en",
  messages,
});

export default i18n;
