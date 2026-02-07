import { FeatureData } from "../interfaces/feature-card.interface";

export const CARDS: Record<string, FeatureData> = {
  "planning": {color: "sky", icon: "calendar_month", title: "Planning", details: "Aujourd'hui"},
  "active-employees": {color: "sky", icon: "productivity", title: "Membres actifs", details: "Aujourd'hui"},
  "vacations": {color: "orange", icon: "beach_access", title: "Congés"},
  "approbations": {color: "orange", icon: "pending_actions", title: "Approbations"},
  "salaries": {color: "green", icon: "account_balance", title: "Fiches de paie", labelPath: "Voir mes paies", path: "salaries"},
  "human-resources": {color: "indigo", icon: "sensor_occupied", title: "RH", labelPath: "Mon Dossier", path: "hr"},
  "formations": {color: "rose", icon: "cognition", title: "Formations", labelPath: "Mes formations", path: "formations"},
  "activities-stats": {color: "orange", icon: "query_stats", title: "Activités", labelPath: "Derniers rapports", path: "activities"},
  "parameters": {color: "gray", icon: "settings", title: "Paramètres", labelPath: "Mes paramètres", path: "settings"},
}
