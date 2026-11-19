import { getCalendlySettings } from "@/lib/crm/calendar/calendly-settings";
import { CalendlyForm } from "./_components/CalendlyForm";
import { getTranslations } from "next-intl/server";

export default async function CalendarSettingsPage() {
  const settings = await getCalendlySettings();
  const t = await getTranslations("AdminPage.calendarSettings");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <CalendlyForm
        hasToken={Boolean(settings.apiToken)}
        hasSigningKey={Boolean(settings.signingKey)}
        webhookUri={settings.webhookUri}
      />
    </div>
  );
}
