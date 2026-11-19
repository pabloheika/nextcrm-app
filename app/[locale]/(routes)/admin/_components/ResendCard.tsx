import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getResendKeyStatus } from "@/lib/resend";

import { Input } from "@/components/ui/input";
import { setResendKey } from "@/actions/admin/system/set-resend-key";
import { getTranslations } from "next-intl/server";

const ResendCard = async () => {
  const resend_key = await getResendKeyStatus();
  const t = await getTranslations("AdminPage.services");

  return (
    <Card className="min-w-[350px] max-w-[450px]">
      <CardHeader className="text-lg">
        <CardTitle>{t("resendTitle")}</CardTitle>
        <CardDescription className="text-xs">
          <p>{t("envKey")}</p>
          <p>{resend_key.envKey ?? t("notEnabled")}</p>
          <p>{t("dbKey")}</p>
          <p>{resend_key.dbKey ?? t("notEnabled")}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action={setResendKey}>
          <div>
            <input type="hidden" name="id" value={resend_key.id} />
            <Input type="text" name="serviceKey" placeholder={t("placeholder")} />
          </div>
          <div className="flex justify-end pt-2 gap-2">
            <Button type={"reset"}>{t("reset")}</Button>
            <Button type="submit">{t("setResendKey")}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResendCard;
