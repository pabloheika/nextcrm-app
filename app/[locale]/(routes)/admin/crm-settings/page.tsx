import { getConfigValues } from "./_actions/crm-settings";
import { CrmSettingsTabs } from "./_components/CrmSettingsTabs";
import { getTranslations } from "next-intl/server";

export default async function CrmSettingsPage() {
  const t = await getTranslations("AdminPage.crmSettings");
  const [
    industries,
    contactTypes,
    leadSources,
    leadStatuses,
    leadTypes,
    opportunityTypes,
    salesStages,
  ] = await Promise.all([
    getConfigValues("industry"),
    getConfigValues("contactType"),
    getConfigValues("leadSource"),
    getConfigValues("leadStatus"),
    getConfigValues("leadType"),
    getConfigValues("opportunityType"),
    getConfigValues("salesStage"),
  ]);

  const tabs = [
    { key: "industry" as const,        label: t("industries"),       values: industries },
    { key: "contactType" as const,     label: t("contactTypes"),     values: contactTypes },
    { key: "leadSource" as const,      label: t("leadSources"),      values: leadSources },
    { key: "leadStatus" as const,      label: t("leadStatuses"),     values: leadStatuses },
    { key: "leadType" as const,        label: t("leadTypes"),        values: leadTypes },
    { key: "opportunityType" as const, label: t("opportunityTypes"), values: opportunityTypes },
    { key: "salesStage" as const,      label: t("salesStages"),      values: salesStages },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {t("description")}
        </p>
      </div>
      <CrmSettingsTabs tabs={tabs} />
    </div>
  );
}
