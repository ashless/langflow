import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { track } from "@/customization/utils/analytics";
import useAddFlow from "@/hooks/flows/use-add-flow";
import { Category } from "@/types/templates/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { newFlowModalPropsType } from "../../types/components";
import BaseModal from "../baseModal";
import GetStartedComponent from "./components/GetStartedComponent";
import TemplateContentComponent from "./components/TemplateContentComponent";
import { Nav } from "./components/navComponent";
import { useTranslation } from "react-i18next";

export default function TemplatesModal({
  open,
  setOpen,
}: newFlowModalPropsType): JSX.Element {
  const [currentTab, setCurrentTab] = useState("get-started");
  const addFlow = useAddFlow();
  const navigate = useCustomNavigate();
  const { folderId } = useParams();
  const { t } = useTranslation();

  // Define categories and their items
  const categories: Category[] = [
    {
      title: "TemplatesModal.Templates",
      items: [
        { title: "TemplatesModal.Get started", icon: "SquarePlay", id: "get-started" },
        { title: "TemplatesModal.All templates", icon: "LayoutPanelTop", id: "all-templates" },
      ],
    },
    {
      title: "TemplatesModal.Use Cases",
      items: [
        { title: "TemplatesModal.Assistants", icon: "BotMessageSquare", id: "assistants" },
        { title: "TemplatesModal.Classification", icon: "Tags", id: "classification" },
        { title: "TemplatesModal.Coding", icon: "TerminalIcon", id: "coding" },
        {
          title: "TemplatesModal.Content Generation",
          icon: "Newspaper",
          id: "content-generation",
        },
        { title: "TemplatesModal.Q&A", icon: "Database", id: "q-a" },
        // { title: "Summarization", icon: "Bot", id: "summarization" },
        // { title: "Web Scraping", icon: "CodeXml", id: "web-scraping" },
      ],
    },
    {
      title: "TemplatesModal.Methodology",
      items: [
        { title: "TemplatesModal.Prompting", icon: "MessagesSquare", id: "chatbots" },
        { title: "TemplatesModal.RAG", icon: "Database", id: "rag" },
        { title: "TemplatesModal.Agents", icon: "Bot", id: "agents" },
      ],
    },
  ];

  return (
    <BaseModal size="templates" open={open} setOpen={setOpen} className="p-0">
      <BaseModal.Content overflowHidden className="flex flex-col p-0">
        <div className="flex h-full">
          <SidebarProvider width="15rem" defaultOpen={false}>
            <Nav
              categories={categories}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <main className="flex flex-1 flex-col gap-4 overflow-hidden p-6 md:gap-8">
              {currentTab === "get-started" ? (
                <GetStartedComponent />
              ) : (
                <TemplateContentComponent
                  currentTab={currentTab}
                  categories={categories.flatMap((category) => category.items)}
                />
              )}
              <BaseModal.Footer>
                <div className="flex w-full flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col items-start justify-center">
                    <div className="font-semibold">{t('Start from scratch')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('Begin with a fresh flow to build from scratch')}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      addFlow().then((id) => {
                        navigate(
                          `/flow/${id}${folderId ? `/folder/${folderId}` : ""}`,
                        );
                      });
                      track("New Flow Created", { template: "Blank Flow" });
                    }}
                    size="sm"
                    data-testid="blank-flow"
                    className="shrink-0"
                  >
                    <ForwardedIconComponent
                      name="Plus"
                      className="h-4 w-4 shrink-0"
                    />
                    {t("Blank Flow")}
                  </Button>
                </div>
              </BaseModal.Footer>
            </main>
          </SidebarProvider>
        </div>
      </BaseModal.Content>
    </BaseModal>
  );
}
