import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import { useTranslation } from "react-i18next";

export const CustomStoreSidebar = () => {
  const { t } = useTranslation()

  return [
    {
      title: t('Langflow API Keys'),
      href: "/settings/api-keys",
      icon: (
        <ForwardedIconComponent
          name="Key"
          className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
        />
      ),
    },
    {
      title: t("Langflow Store"),
      href: "/settings/store",
      icon: (
        <ForwardedIconComponent
          name="Store"
          className="w-4 flex-shrink-0 justify-start stroke-[1.5]"
        />
      ),
    },
  ];
};
