"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  FileText,
  FolderOpen,
  LayoutGrid,
  PanelRight,
  Plus,
  CuboidIcon as Cube,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Document {
  id: string;
  name: string;
  content?: string;
  createdAt?: string;
  userId: string;
}

export function MinimalIntegrationSidebar({ documents = [] as Document[] }) {
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="icon"
        className="relative flex flex-col bg-background border-r border-border text-foreground transition-all duration-300 ease-in-out"
      >
        {/* Header with Text0 Logo */}
        <SidebarHeader className="flex flex-row group-data-[collapsible=icon]:flex-col justify-between w-full">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2",
                "group-data-[collapsible=icon]:flex-col"
              )}
              aria-label="Text0 Home"
            >
              <Cube className="ml-1 w-6 h-6" />
              <span className="group-data-[collapsible=icon]:hidden font-semibold text-foreground">
                Blography
              </span>
            </Link>
          </div>
          <SidebarMenuButton
            tooltip="Toggle Sidebar"
            className="flex justify-center items-center w-8 h-8"
            asChild
          >
            <SidebarTrigger>
              <PanelRight className="w-4 h-4" />
            </SidebarTrigger>
          </SidebarMenuButton>
        </SidebarHeader>

        <SidebarContent className="flex-1 gap-0">
          {/* Main Navigation */}
          <SidebarGroup className="flex-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Home"
                  className="flex justify-start group-data-[collapsible=icon]:justify-center items-center gap-2 px-2 py-1.5 w-full text-sm"
                >
                  <Link
                    href="/home"
                    data-active={pathname === "/home"}
                    className="flex group-data-[collapsible=icon]:justify-center items-center gap-2 w-full text-muted-foreground"
                  >
                    <LayoutGrid className="w-4 h-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden truncate">
                      Home
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Documents Section */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={true} className="w-full">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="My Documents"
                      className="flex group-data-[collapsible=icon]:justify-center items-center gap-2 hover:bg-accent px-2 py-1.5 w-full text-muted-foreground hover:text-foreground text-sm"
                    >
                      <FolderOpen className="w-4 h-4 shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden font-medium truncate tracking-wide">
                        My Documents
                      </span>
                      <ChevronDown className="group-data-[collapsible=icon]:hidden ml-auto w-4 h-4 group-data-[state=open]/collapsible:rotate-180 transition-transform shrink-0" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ScrollArea className="h-auto max-h-70">
                      <div className="space-y-1">
                        <div className="top-0 sticky ml-4 group-data-[collapsible=icon]:ml-0 px-2 group-data-[collapsible=icon]:px-0 border-border border-l border-dashed">
                          {isCreatingDoc ? (
                            <form className="group-data-[collapsible=icon]:hidden flex items-center gap-1">
                              <Input
                                name="name"
                                placeholder="Document name"
                                value={newDocName}
                                onChange={(e) => setNewDocName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Escape") {
                                    e.preventDefault();
                                    setIsCreatingDoc(false);
                                    setNewDocName("");
                                  }
                                }}
                                className="dark:bg-muted h-8 text-sm"
                                autoFocus
                              />
                              <div className="flex gap-1">
                                <SidebarMenuButton
                                  size="sm"
                                  tooltip="Create document"
                                  className="w-8 h-8"
                                  disabled={!newDocName.trim()}
                                >
                                  <Check className="w-4 h-4" />
                                </SidebarMenuButton>
                                <SidebarMenuButton
                                  type="button"
                                  size="sm"
                                  tooltip="Cancel"
                                  className="w-8 h-8"
                                  onClick={() => {
                                    setIsCreatingDoc(false);
                                    setNewDocName("");
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                </SidebarMenuButton>
                              </div>
                            </form>
                          ) : (
                            <SidebarMenuButton
                              variant="outline"
                              size="sm"
                              tooltip="New Document"
                              className="flex justify-start group-data-[collapsible=icon]:justify-center items-center gap-2 bg-background dark:bg-muted group-data-[collapsible=icon]:pr-0 pl-2 group-data-[collapsible=icon]:pl-0 border border-border w-full h-8 group-data-[collapsible=icon]:size-8 text-sm"
                              onClick={() => setIsCreatingDoc(true)}
                              data-new-doc-trigger
                            >
                              <Plus className="w-4 h-4 shrink-0" />
                              <span className="group-data-[collapsible=icon]:hidden">
                                New Document
                              </span>
                            </SidebarMenuButton>
                          )}
                        </div>
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="ml-4 group-data-[collapsible=icon]:ml-0 px-2 group-data-[collapsible=icon]:px-0 border-border border-l border-dashed"
                          >
                            <SidebarMenuButton
                              asChild
                              tooltip={doc.name}
                              data-active={
                                pathname.split("/").at(-1) === doc.id
                              }
                              className="flex group-data-[collapsible=icon]:justify-center items-center gap-2 hover:bg-accent px-2 py-1.5 rounded-lg w-full text-muted-foreground text-sm hover:text-accent-foreground"
                            >
                              <Link href={`/docs/${doc.id}`}>
                                <FileText className="w-4 h-4 shrink-0" />
                                <span className="group-data-[collapsible=icon]:hidden truncate">
                                  {doc.name}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
