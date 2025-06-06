import BaseModal from "@/modals/baseModal";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { CardData } from "@/types/templates/types";
import memoryChatbot from "../../../../assets/temp-pat-1.png";
import vectorRag from "../../../../assets/temp-pat-2.png";
import multiAgent from "../../../../assets/temp-pat-3.png";
import memoryChatbotHorizontal from "../../../../assets/temp-pat-m-1.png";
import vectorRagHorizontal from "../../../../assets/temp-pat-m-2.png";
import multiAgentHorizontal from "../../../../assets/temp-pat-m-3.png";

import { useTranslation } from "react-i18next";
import TemplateGetStartedCardComponent from "../TemplateGetStartedCardComponent";

export default function GetStartedComponent() {
  const examples = useFlowsManagerStore((state) => state.examples);
  const { t } = useTranslation();

  // Define the card data
  const cardData: CardData[] = [
    {
      bgImage: memoryChatbot,
      bgHorizontalImage: memoryChatbotHorizontal,
      icon: "MessagesSquare",
      category: "prompting",
      categoryDisplayName: "TemplatesModal.Prompting",
      flow: examples.find((example) => example.name === "Basic Prompting"),
      displayName: "Basic Prompting",
    },
    {
      bgImage: vectorRag,
      bgHorizontalImage: vectorRagHorizontal,
      icon: "Database",
      category: "RAG",
      categoryDisplayName: undefined,
      flow: examples.find((example) => example.name === "Vector Store RAG"),
      displayName: "Vector Store RAG",
    },
    {
      bgImage: multiAgent,
      bgHorizontalImage: multiAgentHorizontal,
      icon: "Bot",
      category: "Agents",
      categoryDisplayName: "TemplatesModal.Agents",
      flow: examples.find((example) => example.name === "Simple Agent"),
      displayName: "Simple Agent",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <BaseModal.Header description={t("Start with templates showcasing Langflow's Prompting, RAG, and Agent use cases")}>
        {t('TemplatesModal.Get started')}
      </BaseModal.Header>
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {cardData.map((card, index) => (
          <TemplateGetStartedCardComponent key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
