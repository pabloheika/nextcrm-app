"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FunnelTimingSettings } from "@/lib/crm/funnel-timers";
import { updateFunnelSettings } from "../_actions/funnel-settings";

const FIELDS: Array<{ key: keyof FunnelTimingSettings; group: "kill" | "recycle" | "cadence" | "care" }> = [
  { key: "killAfterDays", group: "kill" },
  { key: "recycleAfterDays", group: "recycle" },
  { key: "cadenceTouch1BusinessDays", group: "cadence" },
  { key: "cadenceTouch2OffsetDays", group: "cadence" },
  { key: "cadenceTouch3OffsetDays", group: "cadence" },
  { key: "cadenceTouch4OffsetDays", group: "cadence" },
  { key: "cadenceTouch5OffsetDays", group: "cadence" },
  { key: "careCheckinDays", group: "care" },
  { key: "careReferralDays", group: "care" },
  { key: "careQuarterIntervalDays", group: "care" },
  { key: "careQuarterCount", group: "care" },
  { key: "renewalWindowDays", group: "care" },
];

const FunnelSettingsForm = ({ initial }: { initial: FunnelTimingSettings }) => {
  const [values, setValues] = useState<FunnelTimingSettings>(initial);
  const [saving, setSaving] = useState(false);
  const t = useTranslations("AdminPage.funnelSettings");

  const save = async () => {
    setSaving(true);
    try {
      const res = await updateFunnelSettings(values);
      if (res.error) toast.error(res.error);
      else toast.success(t("saved"));
    } catch {
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  const groups = Array.from(new Set(FIELDS.map((f) => f.group)));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {groups.map((group) => (
          <div key={group} className="space-y-2">
            <h3 className="text-sm font-semibold">{t(`groups.${group}`)}</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {FIELDS.filter((f) => f.group === group).map((f) => (
                <label key={f.key} className="space-y-1 text-sm">
                  <span>{t(`fields.${f.key}`)}</span>
                  <Input
                    type="number"
                    min={0}
                    value={values[f.key]}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [f.key]: Number(e.target.value) }))
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
        <Button onClick={save} disabled={saving}>
          {saving ? t("saving") : t("save")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FunnelSettingsForm;
